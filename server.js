const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url'); // Import URL module for decoding

const port = 3000;

// MIME types for different file extensions
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml'
};

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  console.log('--- Handling request --- ');
  console.log(`Request for ${req.url}`);
  
  // Properly decode the URL path
  let decodedPath;
  try {
    // Construct a dummy base URL because URL constructor needs it
    const requestUrl = new URL(req.url, 'http://localhost');
    decodedPath = decodeURIComponent(requestUrl.pathname);
  } catch (e) {
    console.error("Error decoding URL path:", e);
    res.writeHead(400);
    res.end("Bad Request: Invalid URL path");
    return;
  }
  
  // Determine the relative file path (relative to project root)
  // Remove leading '/' before joining
  let relativeFilePath = decodedPath === '/' ? 'index.html' : decodedPath.substring(1);
  
  // Construct the absolute file path using the current working directory
  const absoluteFilePath = path.join(process.cwd(), relativeFilePath);

  // Log the absolute path we are trying to read
  console.log('Attempting to read file:', absoluteFilePath); 

  // Get the file extension
  const extname = path.extname(absoluteFilePath);
  let contentType = mimeTypes[extname] || 'application/octet-stream';
  
  // Read the file using the absolute path
  fs.readFile(absoluteFilePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.log(`File ${absoluteFilePath} not found (ENOENT)`);
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1><p>The page you requested does not exist.</p>');
      } else {
        // Server error
        console.error(`Server error: ${err.code}`);
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success - serve the file
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Press Ctrl+C to stop the server`);
}); 