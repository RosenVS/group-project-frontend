
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api/projects',
        createProxyMiddleware({
            // target: 'http://localhost:8080',
            target: 'https://sentry-service-hlfxsphkja-ew.a.run.app/',
            // target: 'https://foodmotion-api-gateway-6xxrfy77.ew.gateway.dev',
            changeOrigin: true,
        })
    );

    app.use(
        '/api/organizations',
        createProxyMiddleware({
            // target: 'http://localhost:8080',
            target: 'https://sentry-service-hlfxsphkja-ew.a.run.app/',
            // target: 'https://foodmotion-api-gateway-6xxrfy77.ew.gateway.dev',
            changeOrigin: true,
        })
    );
    app.use(
        '/login',
        createProxyMiddleware({
            // target: 'http://localhost:8080',
            target: 'https://user-service-hlfxsphkja-ew.a.run.app/',
            // target: 'https://foodmotion-api-gateway-6xxrfy77.ew.gateway.dev',
            changeOrigin: true,
        })
    );
    app.use(
        '/register',
        createProxyMiddleware({
            // target: 'http://localhost:8080',
            target: 'https://user-service-hlfxsphkja-ew.a.run.app/',
            // target: 'https://foodmotion-api-gateway-6xxrfy77.ew.gateway.dev',
            changeOrigin: true,
        })
    );

};