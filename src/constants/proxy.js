import { createProxyMiddleware } from "http-proxy-middleware";
module.exports = app=> {
    app.use(
        createProxyMiddleware(
        {target:"http://pstest.puresight.com",
        changeOrigin: true
        }
        )
    )
}