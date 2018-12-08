    const unshortURLService = require("./urlUnshortFetch.js")

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
            return unshortURLService.requestUnshortURL(urlString);
        }

        //Here maps
        if (urlString.includes("wego.here.com")) {
            return parseHereMapsCoordinates(urlString);
        }

        if (urlString.includes("her.is")) {

        }
    }

    function parseAppleMapsCoordinates(urlString) {
        var regexResult = urlString.match(appleMapsRegex);
        //console.log(regexResult);
        let latitude = regexResult[1];
        let longitude = regexResult[2];
        return coordinatesToJSONObject(latitude, longitude);
    }

    function parseHereMapsCoordinates(urlString) {
        var regexResult = urlString.match(hereMapsRegex);
        //console.log(regexResult);
        let latitude = regexResult[1];
        let longitude = regexResult[2];
        console.log(latitude);
        console.log(longitude);
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