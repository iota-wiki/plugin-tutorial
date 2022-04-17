const path = require("path");

module.exports = {
  plugins: [
    [
      path.resolve(__dirname, "../../../lib/index.js"),
      {
        title: "EVM Tutorial",
        description:
          "In this tutorial, you will learn how to use the EVM in IOTA.",
        preview: "evm-tutorial.png",
        route: "evm-tutorial/intro",
        source: "https://github.com/dr-electron/tutorial-template",
        tags: ["text"],
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "evm-tutorial",
        path: path.resolve(__dirname, "./docs"),
        routeBasePath: "evm-tutorial",
        sidebarPath: path.resolve(__dirname, "./sidebars.js"),
        editUrl: "https://github.com/Dr-Electron/tutorial-template/edit/main/",
      },
    ],
  ],
  staticDirectories: [path.resolve(__dirname, "./images")],
};
