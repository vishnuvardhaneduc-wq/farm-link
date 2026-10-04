import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { saveStoredFpoProfile } from '../data/fpoProfileData'

const AuthContext = createContext({
  session: null,
  user: null,
  fpoProfile: null,
  buyerProfile: null,
  isLoading: true,
  signOut: async () => {},
  loadFpoProfile: async () => {},
  loadBuyerProfile: async () => {},
})

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [fpoProfile, setFpoProfile] = useState(null)
  const [buyerProfile, setBuyerProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Helper to load user profile from fpo_profiles table
  const loadFpoProfile = async (userId, userEmail) => {
    if (!userId) {
      setFpoProfile(null)
      return null
    }

    try {
      const { data, error } = await supabase
        .from('fpo_profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle()

      if (error) {
        console.error('Error loading FPO profile:', error)
        return null
      }

      if (data) {
        setFpoProfile(data)
        saveStoredFpoProfile({
          fpoName: data.fpo_name,
          registrationId: data.fpo_reg_id,
          contactPerson: data.contact_person,
          phoneNumber: data.phone,
          emailAddress: data.email || userEmail,
          state: data.state,
          district: data.district,
          primaryOperatingArea: data.operating_area,
        })
        return data
      } else {
        setFpoProfile(null)
        return null
      }
    } catch (err) {
      console.error('Unexpected error fetching FPO profile:', err)
      return null
    }
  }

  // Helper to load buyer profile from buyer_profiles table
  const loadBuyerProfile = async (userId, userEmail) => {
    if (!userId) {
      setBuyerProfile(null)
      return null
    }

    try {
      const { data, error } = await supabase
        .from('buyer_profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle()

      if (error) {
        console.error('Error loading Buyer profile:', error)
        return null
      }

      if (data) {
        setBuyerProfile(data)
        return data
      } else {
        setBuyerProfile(null)
        return null
      }
    } catch (err) {
      console.error('Unexpected error fetching Buyer profile:', err)
      return null
    }
  }

  useEffect(() => {
    let isMounted = true

    // 1. Initial session check on app startup
    const initSession = async () => {
      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession()
        if (error) {
          console.error('Error getting initial Supabase session:', error)
        }

        if (isMounted) {
          setSession(initialSession)
          setUser(initialSession?.user ?? null)
          if (initialSession?.user) {
            await Promise.allSettled([
              loadFpoProfile(initialSession.user.id, initialSession.user.email),
              loadBuyerProfile(initialSession.user.id, initialSession.user.email),
            ])
          }
        }
      } catch (err) {
        console.error('Unexpected error during session initialization:', err)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    initSession()

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        if (!isMounted) return

        setSession(currentSession)
        setUser(currentSession?.user ?? null)

        if (currentSession?.user) {
          await Promise.allSettled([
            loadFpoProfile(currentSession.user.id, currentSession.user.email),
            loadBuyerProfile(currentSession.user.id, currentSession.user.email),
          ])
        } else {
          setFpoProfile(null)
          setBuyerProfile(null)
        }

        setIsLoading(false)
      }
    )

    return () => {
      isMounted = false
      subscription?.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Error signing out from Supabase:', error)
        throw error
      }
      setSession(null)
      setUser(null)
      setFpoProfile(null)
      setBuyerProfile(null)
    } catch (err) {
      console.error('SignOut error:', err)
      throw err
    }
  }

  return (
    <AuthContext.Provider value={{ session, user, fpoProfile, buyerProfile, isLoading, signOut, loadFpoProfile, loadBuyerProfile }}>
      {isLoading ? (
        <div className="min-h-screen bg-[#f1efdf] flex flex-col items-center justify-center font-sans text-[#1b6e53]">
          <div className="w-10 h-10 border-3 border-[#1b6e53] border-t-transparent rounded-full animate-spin mb-3"></div>
          <span className="text-xs font-mono font-medium tracking-wider uppercase text-[#00372a]">
            Loading FarmLink Session...
          </span>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

