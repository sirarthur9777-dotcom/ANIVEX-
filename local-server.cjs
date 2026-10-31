'use strict';

// Local preview for the pre-built, static Anivex Solution website.
// Dependencies: Node.js only (no npm packages necessary).
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = __dirname;
const HOST = process.env.HOST || '127.0.0.1';
const PORT = Number(process.env.PORT) || 3000;

const redirects = new Map([
  ['/about-founder', '/aboutfounder'],
  ['/founder', '/aboutfounder'],
  ['/privacy', '/privacy-policy'],
  ['/terms', '/terms-and-conditions'],
  ['/about', '/#about'],
  ['/services', '/#services'],
  ['/products', '/#products'],
  ['/projects', '/#projects'],
  ['/why-anivex', '/#why-anivex'],
  ['/testimonials', '/#testimonials'],
  ['/pricing', '/#pricing'],
  ['/faq', '/#faq'],
  ['/contact', '/#contact']
]);

const pages = new Set([
  'aboutfounder',
  'web-development',
  'web-design',
  'software-development',
  'web-application-development',
  'erp-development',
  'custom-software',
  'privacy-policy',
  'terms-and-conditions',
  'admin'
]);
const topLevelStatic = new Set([
  'index.html', '404.html', 'robots.txt', 'sitemap.xml',
  'deployment-version.json',
  'google2cd35dfb90c69002.html', 'google2ecd35dfb90c69002.html'
]);

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    res.end();
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    res.writeHead(400);
    res.end('Bad request');
    return;
  }

  // Reject encoded traversal and Windows path separators before file lookup.
  if (pathname.includes("\\") || pathname.split("/").some(p => p === ".." || p === ".") || pathname.includes("\0")) {
    res.writeHead(400);
    res.end("Bad path");
    return;
  }

  // A clean pathname URL should be served by the same route on Netlify and locally.
  const redirect = redirects.get(pathname);
  if (redirect) {
    res.writeHead(301, { Location: redirect });
    res.end();
    return;
  }

  let relativeFile;
  let status = 200;
  if (pathname === '/') {
    relativeFile = 'index.html';
  } else if (/^\/admin\/.*$/.test(pathname)) {
    relativeFile = 'admin.html';
  } else if (pathname.startsWith('/assets/') || pathname.startsWith('/images/')) {
    relativeFile = pathname.slice(1);
  } else if (pathname.startsWith('/') && pages.has(pathname.slice(1))) {
    relativeFile = `${pathname.slice(1)}.html`;
  } else if (pathname.endsWith('.html') && pages.has(pathname.slice(1, -5))) {
    relativeFile = pathname.slice(1);
  } else if (topLevelStatic.has(pathname.slice(1))) {
    relativeFile = pathname.slice(1);
  } else {
    relativeFile = '404.html';
    status = 404;
  }

  const filePath = path.resolve(ROOT, relativeFile);
  // Do not leak local server code/package files (or traverse outside this directory).
  const servedBase = relativeFile.startsWith("assets/") ? path.join(ROOT, "assets")
    : relativeFile.startsWith("images/") ? path.join(ROOT, "images") : ROOT;
  if (!filePath.startsWith(ROOT + path.sep) ||
      (servedBase !== ROOT && !filePath.startsWith(servedBase + path.sep))) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const headers = {
      'Content-Type': mime[ext] || 'application/octet-stream',
      'Content-Length': stat.size,
      'Cache-Control': ext === '.html' ? 'no-store' : 'public, max-age=3600'
    };
    if (pathname.startsWith('/assets/')) headers['Cache-Control'] = 'public, max-age=31536000, immutable';
    if (pathname.startsWith('/images/')) headers['Cache-Control'] = 'public, max-age=86400';
    if (pathname === '/admin' || pathname.startsWith('/admin/')) headers['X-Robots-Tag'] = 'noindex, nofollow';
    res.writeHead(status, headers);
    if (req.method === 'HEAD') return res.end();
    const stream = fs.createReadStream(filePath);
    stream.on('error', (streamError) => {
      console.error(`Failed to serve ${relativeFile}:`, streamError.message);
      res.destroy(streamError);
    });
    stream.pipe(res);
  });
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} already in use. Close the other server or set a new PORT.`);
  } else {
    console.error(error);
  }
  process.exitCode = 1;
});

server.listen(PORT, HOST, () => {
  console.log(`\n  Anivex Solution localhost server ready`);
  console.log(`  Website: http://localhost:${PORT}/`);
  console.log(`  Admin:   http://localhost:${PORT}/admin`);
  console.log('  Stop:    Ctrl+C\n');
});
