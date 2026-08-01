const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const IS_PROD = process.env.NODE_ENV === 'production';

// Security and HTTP headers (compliant with mandatory-secure-web-skills)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Content Security Policy permitting Google Cloud CES SDK, reCAPTCHA, Token Broker, Google Fonts, and gstatic
  const cspPolicy = [
    "default-src 'self' https: http: data: blob: 'unsafe-inline' 'unsafe-eval';",
    "script-src 'self' https: http: data: blob: 'unsafe-inline' 'unsafe-eval';",
    "style-src 'self' https: http: 'unsafe-inline';",
    "font-src 'self' https: http: data:;",
    "img-src 'self' https: http: data: blob:;",
    "connect-src 'self' https: http: wss: ws:;",
    "frame-src 'self' https: http:;",
    "media-src 'self' https: http: blob:;"
  ].join(' ');

  res.setHeader('Content-Security-Policy', cspPolicy);
  next();
});

// Serve static web application files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public'), {
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// Fallback route for SPA / clean URLs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Bind server to 0.0.0.0 in Cloud Run / production or local development
const host = '0.0.0.0'; // Using 0.0.0.0 for seamless container/Cloud Run portability

const server = app.listen(PORT, host, () => {
  console.log(`[Telistra] Server operational on http://localhost:${PORT}`);
  console.log(`[Telistra] Environment: ${IS_PROD ? 'production' : 'development'}`);
  console.log(`[Telistra] CES Chat Messenger Widget Ready`);
});

// Graceful shutdown handling for Cloud Run containers
process.on('SIGTERM', () => {
  console.log('[Telistra] SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('[Telistra] HTTP server closed');
  });
});
