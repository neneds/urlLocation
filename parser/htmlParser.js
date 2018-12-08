const urlService = require("./urlDownloader.js");
const googleWindowRegex = ";window.APP_INITIALIZATION_STATE=\\[\\[\\[(.*?)\\]";
const googleCoordinatesRegex = "(-?\\d+\\.\\d+),(-?\\d+\\.\\d+),(-?\\d+\\.\\d+)"

var exports = module.exports = {};

exports.parseGoogleMapsHTML = function fetchGoogleMapsCoordinates(unshortedURL) {
    return new Promise((resolve, reject) => {
        let htmlRequest = urlService.requestHTMLBody(unshortedURL);
        htmlRequest.then(function(result) {
            var text = result.toString();
            var regexResult = text.match(googleWindowRegex);
            var coordinatesRegex = regexResult[0].match(googleCoordinatesRegex);
            resolve({ "latitude": coordinatesRegex[2], "longitude": coordinatesRegex[3] });
        }, function(err) {
            reject(err)
        })
    });
}