import http from 'http'

const routes = [
  '/fpo/profile',
  '/fpo/profile/edit',
  '/fpo/profile/verification',
  '/fpo/products',
  '/fpo/products/add',
  '/fpo/products/prod-tomato',
  '/fpo/products/prod-tomato/edit',
]

function checkRoute(route) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:5173${route}`, (res) => {
      let data = ''
      res.on('data', chunk => { data += chunk })
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(`✓ Route http://localhost:5173${route} returned 200 OK (${data.length} bytes)`)
          resolve(true)
        } else {
          console.error(`✗ Route ${route} returned status ${res.statusCode}`)
          reject(new Error(`Status ${res.statusCode}`))
        }
      })
    }).on('error', err => reject(err))
  })
}

async function run() {
  for (const r of routes) {
    await checkRoute(r)
  }
  console.log('\nAll FPO Profile & Product portal routes verified successfully on Vite server!')
}

run().catch(console.error)
