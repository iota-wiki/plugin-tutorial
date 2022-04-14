// eslint-disable-next-line @typescript-eslint/no-var-requires
var requireGlob = require("require-glob");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var path = require("path");

const reducer = function (_options, result, fileObject) {
  if (fileObject && fileObject.exports) {
    const { tutorial, plugins, staticDirectories } = fileObject.exports;

    if (Object.keys(result).length === 0) {
      result = {
        tutorials: [tutorial],
        plugins,
        staticDirectories,
      };
    } else {
      result.tutorials.push(tutorial);

      if (!result.plugins) result.plugins = plugins;
      else result.plugins = result.plugins.concat(plugins);
      if (!result.staticDirectories)
        result.staticDirectories = staticDirectories;
      else
        result.staticDirectories =
          result.staticDirectories.concat(staticDirectories);
    }
  }

  return result;
};

const config = requireGlob.sync(
  ["tutorials/*/docusaurus.config.js", "!node_modules"],
  {
    reducer,
  }
);

module.exports = {
  plugins: [
    [
      path.resolve(__dirname, "../lib/page.js"),
      {
        route: "/",
      },
    ],
    "@docusaurus/plugin-ideal-image",
    ...config.plugins,
  ],
  staticDirectories: [...config.staticDirectories],
};
