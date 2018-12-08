const request = require('request');
const unshortnerProvider = "https://unshorten.me/json/";

var exports = module.exports = {};

exports.requestUnshortURL = function(shortURL) {
    return new Promise((resolve, reject) => {
        request(unshortnerProvider + shortURL, { json: true }, (err, res, body) => {
            if (err) {
                reject(err);
                return;
            }
            let json = JSON.parse(body);
            let unshortedURL = json.resolved_url;
            if (typeof unshortedURL === 'undefined') {
                var noResultError = new Error("Could not get the unshorted URL");
                reject(noResultError);
            } else {
                resolve(unshortedURL);
            }
        });
    });
}