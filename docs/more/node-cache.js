const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')

const PORT = 8400
const mini = {
  default: 'text/plain',
  json: 'application/json',
  jpg: 'image/jpeg'
}

const expires = {
  maxAge: 60 * 60 * 24 * 365,
  fileMatch: /^(gif|png|jpg|jpeg|js|css)$/ig
}

const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname
  const realpath = `performanceOptimization${pathname}`
  let ext = path.extname(pathname)
  ext = ext ? ext.slice(1) : 'unknown'
  const contentType = mini[ext] || mini.default
  console.log(pathname, realpath)
  
  if (ext.match(expires.fileMatch)) {
    const date = new Date()
    date.setTime(date.getTime() + expires.maxAge * 1000)
    res.setHeader('Expires', date.toUTCString())
    res.setHeader('Cache-control', `max-age=${expires.maxAge}`)
  }

  try {
    const stat = fs.statSync(realpath)
    const lastModified = stat.mtime.toUTCString()
    res.setHeader('Last-Modified', lastModified)
    const ifModifiedSince = req.headers['if-modified-since']
    console.log(req.headers)
    if (ifModifiedSince && ifModifiedSince === lastModified) {
      res.writeHead(304, 'Not Modified')
      res.end()
      return
    }
    console.log(111)

    if (fs.existsSync(realpath)) {
      try {
        const file = fs.readFileSync(realpath, 'binary')
        res.writeHead(200, {
          'Content-Type': contentType
        })
        res.write(file, 'binary')
        res.end()
      } catch (err) {
        res.writeHead(500, {
          'Content-Type': mini.default
        })
        res.end()
      }
    } else {
      res.writeHead(404, {
        'Content-Type': mini.default
      })
      res.write(`This request URL ${pathname} was not found`)
      res.end()
    }
  } catch (err) {
    console.log(err.code, err.errno)
  }
})

server.listen(PORT)

console.log(`server is running at ${PORT}`)