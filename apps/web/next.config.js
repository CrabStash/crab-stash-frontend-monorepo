const withTM = require("next-transpile-modules")(["@crab-stash/ui"]);

module.exports = withTM({
  reactStrictMode: true,
});
