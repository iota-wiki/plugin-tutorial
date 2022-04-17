const path = require("path");

module.exports = {
  plugins: [
    [
      path.resolve(__dirname, "../../../lib/index.js"),
      {
        title: "IOTA Client WASM Tutorial",
        description: "This tutorial shows you how to use the WASM IOTA client",
        preview: "/iota_client.png",
        source:
          "https://github.com/Dr-Electron/identity-iota-svelte-example/tree/gitpod-integration",
        route: "/wasm-client-tutorial/tutorial",
        tags: ["text", "gettingstarted", "wasm", "client"],
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "wasm-client-tutorial",
        path: path.resolve(__dirname, "./docs"),
        routeBasePath: "wasm-client-tutorial",
        sidebarPath: path.resolve(__dirname, "./sidebars.js"),
        editUrl:
          "https://github.com/Dr-Electron/identity-iota-svelte-example/edit/gitpod-integration/",
      },
    ],
  ],
  staticDirectories: [path.resolve(__dirname, "./images")],
};
