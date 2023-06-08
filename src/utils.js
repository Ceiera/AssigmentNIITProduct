const getRequestData = (req) => new Promise((resolve, reject) => {
 // Write logic here to read the request body data
 try {
    let body = ''
    req.on('data', (chunk) => {
        body += chunk.toString()
    })
    req.on('end', () => {
        resolve (body)
    })
 } catch (error) {
    reject(error)
 }
})

module.exports = getRequestData