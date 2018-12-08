    const urlService = require("./urlDownloader.js");
    const htmlParser = require("./htmlParser.js");

    const appleMapsRegex = "=(-?\\d+\\.\\d+),(-?\\d+\\.\\d+)"
    const googleMapsRegex = "(-?\\d+\\.\\d+),(-?\\d+\\.\\d+)"
    const hereMapsRegex = "=(-?\\d+\\.\\d+)%2C(-?\\d+\\.\\d+)"

    var exports = module.exports = {};

    exports.parseURLString = function(urlString) {
        //Apple maps
        if (urlString.includes("maps.apple")) {
            return parseAppleMapsCoordinates(urlString);
        }

        //Google
        if (urlString.includes("goo.gl")) {
            return
        }

        if (urlString.includes("google.com")) {
            //var unshortedURL = urlService.requestUnshortURL(urlString);
            let parsedURL = htmlParser.parseGoogleMapsDOM(urlString);
            parsedURL.then(function(result) {
                console.log(result)
            }, function(err) {
                console.log(err);
            })
        }

        //Here maps
        if (urlString.includes("wego.here.com")) {
            return parseHereMapsCoordinates(urlString);
        }

        if (urlString.includes("her.is")) {
            var unshortedURL = urlService.requestUnshortURL(urlString);

        }
    }

    function parseAppleMapsCoordinates(urlString) {
        var regexResult = urlString.match(appleMapsRegex);
        let latitude = regexResult[1];
        let longitude = regexResult[2];
        if ((typeof latitude === 'undefined') || (typeof longitude === 'undefined')) {
            var noResultError = new Error("Could not get the coordinates values from URL");
            return JSON.stringify(noResultError)
        }
        return coordinatesToJSONObject(latitude, longitude);
    }

    function parseHereMapsCoordinates(urlString) {
        var regexResult = urlString.match(hereMapsRegex);
        let latitude = regexResult[1];
        let longitude = regexResult[2];
        if ((typeof latitude === 'undefined') || (typeof longitude === 'undefined')) {
            var noResultError = new Error("Could not get the coordinates values from URL");
            return JSON.stringify(noResultError)
        }
        return coordinatesToJSONObject(latitude, longitude);
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