const util = require('node:util');
if (util.styleText) {
  const orig = util.styleText;
  util.styleText = function(format, text) {
    if (Array.isArray(format)) {
      return format.reduce((acc, f) => orig(f, acc), text);
    }
    return orig(format, text);
  };
}
