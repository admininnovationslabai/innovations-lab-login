const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://13.126.51.117:5000',
      changeOrigin: true,
    })
  );
}; 