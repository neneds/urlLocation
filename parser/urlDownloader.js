const request = require('request');
const unshortnerProvider = "https://unshorten.me/json/";

var exports = module.exports = {};

exports.requestUnshortURL = function(shortURL) {
    return new Promise((resolve, reject) => {
        let requestURL = unshortnerProvider + shortURL;
        console.log(requestURL);
        request(requestURL, { json: true }, (err, res, body) => {
            if (err) {
                reject(err);
            }
            let unshortedURL = String(body.resolved_url);
            resolve(unshortedURL);
        });
    });
}

exports.requestHTMLBody = function(url) {
    return new Promise((resolve, reject) => {
        request(url, (err, res, body) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(body);
        });
    });
}