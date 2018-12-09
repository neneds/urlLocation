    const urlService = require("./urlDownloader.js");
    const htmlParser = require("./htmlParser.js");

    const appleMapsRegex = "=(-?\\d+\\.\\d+),(-?\\d+\\.\\d+)"
    const hereMapsRegex = "=(-?\\d+\\.\\d+)%2C(-?\\d+\\.\\d+)"

    var exports = module.exports = {};

    exports.parseURLString = function(urlString) {
        //Apple maps
        if (urlString.includes("maps.apple")) {
            return parseAppleMapsCoordinates(urlString);
        }

        //Google
        if (urlString.includes("goo.gl")) {
            return parseShortGoogleMapsCoordinates(urlString);
        }

        if (urlString.includes("google.com")) {
            return parseGoogleMapsURL(urlString);
        }

        //Here maps
        if (urlString.includes("wego.here.com")) {
            return parseHereMapsCoordinates(urlString);
        }

        if (urlString.includes("her.is")) {
            return parseHereMapsShortURL(urlString);
        }
    }

    function parseAppleMapsCoordinates(urlString) {
        let parsedApple = new Promise((resolve, reject) => {
            var regexResult = urlString.match(appleMapsRegex);
            let latitude = regexResult[1];
            let longitude = regexResult[2];
            if ((typeof latitude === 'undefined') || (typeof longitude === 'undefined')) {
                var noResultError = new Error("Could not get the coordinates values from URL");
                return JSON.stringify(noResultError)
            }
            resolve([latitude, longitude]);
        }).then(resultCoordinates => {
            return coordinatesToJSONObject(resultCoordinates[0], resultCoordinates[1]);
        });

        return parsedApple;
    }

    function parseShortGoogleMapsCoordinates(urlString) {
        return urlService.requestUnshortURL(urlString)
            .then(resultURL => {
                return parseGoogleMapsURL(resultURL);
            });
    }

    function parseGoogleMapsURL(urlString) {
        return htmlParser.parseGoogleMapsHTML(urlString)
            .then(resultCoordinates => {
                return coordinatesToJSONObject(resultCoordinates.latitude, resultCoordinates.longitude);
            });
    }

    function parseHereMapsShortURL(urlString) {
        return urlService.requestUnshortURL(urlString)
            .then(resultURL => {
                return parseHereMapsCoordinates(resultURL);
            });
    }

    function parseHereMapsCoordinates(urlString) {
        let parsedHere = new Promise((resolve, reject) => {
            var regexResult = urlString.match(hereMapsRegex);
            let latitude = regexResult[1];
            let longitude = regexResult[2];
            if ((typeof latitude === 'undefined') || (typeof longitude === 'undefined')) {
                var noResultError = new Error("Could not get the coordinates values from URL");
                reject(JSON.stringify(noResultError));
            }
            resolve([latitude, longitude]);

        }).then(parsedCoordinates => {
            return coordinatesToJSONObject(parsedCoordinates[0], parsedCoordinates[1]);
        });
        return parsedHere;
    }

    function coordinatesToJSONObject(latitude, longitude) {
        return new Promise((resolve, reject) => {
            let latitudeDouble = parseFloat(latitude);
            let longitudeDouble = parseFloat(longitude);

            if (isNaN(latitudeDouble) || isNaN(longitudeDouble)) {
                var noResultError = new Error("Could not get the values as coordinates");
                reject(JSON.stringify(noResultError));
            }
            var obj = new Object();
            obj.latitude = latitudeDouble;
            obj.longitude = longitudeDouble;
            var jsonString = JSON.stringify(obj);
            resolve(jsonString);
        });
    }