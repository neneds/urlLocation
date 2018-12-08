    const https = require('https');
    let appleMapsRegex = "=(-?\\d+\\.\\d+),(-?\\d+\\.\\d+)"
    let googleMapsRegex = "(-?\\d+\\.\\d+),(-?\\d+\\.\\d+)"
    let hereMapsRegex = "=(-?\\d+\\.\\d+)%2C(-?\\d+\\.\\d+)"
    let unshortnerProvider = "https://unshorten.me/json/"


    let testApple = "https://maps.apple.com/?address=CNA%201,%20Lote%2013,%20Taguatinga,%20Bras%C3%ADlia%20-%20DF,%2072110-015,%20Brasil&auid=9630044778662256017&ll=-15.827261,-48.058121&lsp=9902&q=Varej%C3%A3o%20das%20Verduras%20DI&_ext=ChgKBAgEEBkKBAgFEAMKBAgGEA4KBAgKEAASJCnWC9YxUKkvwDGCMRqsDghIwDnetT7BtqQvwEF2kOm23AZIwA%3D%3D&t=m";

    let testHere = "https://wego.here.com/p/s-Yz1mb29kLWRyaW5rO2lkPTA3Nmp4N3BzLTFkZWJlMzFmYmE4ZDA5NmFjODgyZDE4ZmNmMGIwZGNkO2xhdD0tMTUuODA4OTg7bG9uPS00OC4wNjI2NDtuPVZhcmVqJUMzJUEzbytkYStGYXJ0dXJhO25sYXQ9LTE1LjgwODk4O25sb249LTQ4LjA2MjY0O2g9N2U2MTI0?map=-15.80898%2C-48.06264%2C15%2Cnormal&ref=iOS";

    let testGoogle = "https://www.google.com/maps?q=Lote+13/14,+St.+A+Norte+CNA+1+Varej%C3%A3o+DI+-+Taguatinga,+Bras%C3%ADlia+-+DF,+72110-015&ftid=0x935a32e6e1d605b9:0x24748e1fc1112047&hl=pt-BR&gl=br&shorturl=1";
    parseURLString(testGoogle);

    function parseURLString(urlString) {
        //Apple maps
        if (urlString.includes("maps.apple")) {
            return parseAppleMapsCoordinates(urlString);
        }

        //Google
        if (urlString.includes("goo.gl")) {
            return
        }

        if (urlString.includes("google.com")) {
            return unshortURL(urlString);
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
        console.log(latitude);
        console.log(longitude);
    }

    function parseHereMapsCoordinates(urlString) {
        var regexResult = urlString.match(hereMapsRegex);
        //console.log(regexResult);
        let latitude = regexResult[1];
        let longitude = regexResult[2];
        console.log(latitude);
        console.log(longitude);
    }

    function unshortURL(shortURL) {
        https.get(shortURL, (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                // console.log(JSON.parse(data));
                // console.log("RESPONSE");
                console.log(resp);
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }