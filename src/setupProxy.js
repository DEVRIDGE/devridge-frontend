const { createProxyMiddleware } = require("http-proxy-middleware");
const BASE_PATH =
  "http://ec2-3-34-60-62.ap-northeast-2.compute.amazonaws.com:8081/";

module.exports = function (app) {
  app.use(
    "/api", //proxy가 필요한 path parameter
    createProxyMiddleware({
      target: BASE_PATH, //타겟이 되는 api url
      pathRewrite: {
        "^/api": "",
      },
      changeOrigin: true, // 서버 구성에 따른 호스트 헤더 변경 여부 설정
    })
  );
};
