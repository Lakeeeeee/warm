const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')
const querystring = require('querystring')
const clientService = require('./service/clientService.js')

const server = http.createServer((req, res) => {
    const urll = req.url
    if (req.method == 'POST') {
        const parsedUrl = url.parse(req.url)
        if (parsedUrl.pathname === '/api/saveOptions') {
            let postData = ''
            let parsedObj = {}
            req.on('data', (data) => {
                postData += data
                parsedObj = querystring.parse(postData)
            })

            req.on('end', async () => {
                clientService.setBasicUrlOptions(parsedObj)
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(parsedObj))
            })
        }
    }

    let filePath
    if (urll === '/') {
        filePath = path.join(__dirname, 'Views', 'index.html')
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' })
                res.end('<h1>404 Not Found</h1>')
            } else {
                console.log(filePath)
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.end(data)
            }
        })
    }

    if (urll === '/favicon.ico') {
        fs.readFile('./public/images/1710468966.ico', (e, data) => {
            if (e) {
                console.error(e)
                res.writeHead(404)
                res.end()
                return
            }
            res.writeHead(200, { 'Content-Type': 'image/x-icon' })
            res.end(data)
        })
    }
})

module.exports = server