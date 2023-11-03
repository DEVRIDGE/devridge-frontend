require("babel-register")({
  presets: ["es2015", "react"],
});

const router = require("./src/sitemapRouter.tsx").default;
const Sitemap = require("react-router-sitemap").default;

function generatesSitemap() {
  return new Sitemap(router)
    .build("https://devridge.dev")
    .save("./public/sitemap.xml");
}

generatesSitemap();
