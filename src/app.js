//Import the necessary dependencies
const http = require('http')
// Define a prot at which the server will run
const PORT = process.env.PORT || 5000

const productsService = require("./productsService");
const getRequestData = require('./utils');

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('X-Powered-By', 'NodeJS')
  // Get all products
  if (req.url === '/api/v1/products' && req.method === 'GET') {
    const anu = productsService.getProducts((anu, ono)=> JSON.stringify(ono))
    res.writeHead(200)
    res.end(anu)
  }

  // Get a product with specified id
  if (req.url.match(/\/api\/v1\/products\/[0-9]/) && req.method === 'GET') {
    const id = req.url.split('/')[4]
    const anu = productsService.getProductsById(parseInt(id), (anu, ono) => {
      if (anu) {
        res.statusCode = 404
        res.end(anu)
      }
      res.statusCode = 200
      res.end(ono)
    })
    
  }

  // Create a new product
  if (req.url === '/api/v1/products/save' && req.method === 'POST') {
    let reqBody = await getRequestData(req)
    const dd = JSON.parse(reqBody)
    const anu = productsService.saveProduct(dd, (anu, ono) => {
      if (anu) {
        res.statusCode = 302
        res.end(anu)
      }
      res.statusCode = 201
      res.end(ono)
    })
  }

  // Update a specific product
  if (req.url.match(/\/api\/v1\/products\/[0-9]/) && req.method === 'PUT') {
    const id = req.url.split('/')[4]
    let reqBody = await getRequestData(req)
    const dd = JSON.parse(reqBody)
    const anu = productsService.updateProduct(parseInt(id), dd, (anu, ono) => {
      if (anu) {
        res.statusCode = 404
        res.end(anu)
      }
      res.statusCode = 200
      res.end(anu)
    })
  }
  // Delete a specific Product
  if (req.url.match(/\/api\/v1\/products\/[0-9]/) && req.method === 'DELETE') {
    const id = req.url.split('/')[4]
    productsService.deleteProduct(parseInt(id), (anu, ono) => {
      if (anu) {
        res.statusCode = 404
        res.end(anu)
      }
      res.statusCode = 200
      res.end(ono)
    })
  }
});

// listen for client requests
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
})