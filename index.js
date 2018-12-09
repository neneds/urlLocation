const parser = require("./parser/mapsURLParser");

var exports = module.exports = {};

exports.coordinatesFromURL = function(originalURL) {
    return parser.parseURLString(originalURL);
}