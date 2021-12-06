const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/*",
    createProxyMiddleware({
      target: "https://ecommerceapi101.herokuapp.com",
      secure: false,
      changeOrigin: true,
      headers: {
        Connection: "keep-alive",
      },
    })
  );
};
