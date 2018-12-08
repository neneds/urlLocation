const parser = require("./parser/mapsURLParser");

let testApple = "https://maps.apple.com/?address=CNA%201,%20Lote%2013,%20Taguatinga,%20Bras%C3%ADlia%20-%20DF,%2072110-015,%20Brasil&auid=9630044778662256017&ll=-15.827261,-48.058121&lsp=9902&q=Varej%C3%A3o%20das%20Verduras%20DI&_ext=ChgKBAgEEBkKBAgFEAMKBAgGEA4KBAgKEAASJCnWC9YxUKkvwDGCMRqsDghIwDnetT7BtqQvwEF2kOm23AZIwA%3D%3D&t=m";

let testHere = "https://wego.here.com/p/s-Yz1mb29kLWRyaW5rO2lkPTA3Nmp4N3BzLTFkZWJlMzFmYmE4ZDA5NmFjODgyZDE4ZmNmMGIwZGNkO2xhdD0tMTUuODA4OTg7bG9uPS00OC4wNjI2NDtuPVZhcmVqJUMzJUEzbytkYStGYXJ0dXJhO25sYXQ9LTE1LjgwODk4O25sb249LTQ4LjA2MjY0O2g9N2U2MTI0?map=-15.80898%2C-48.06264%2C15%2Cnormal&ref=iOS";

let testGoogle = "https://www.google.com/maps?q=Lote+13/14,+St.+A+Norte+CNA+1+Varej%C3%A3o+DI+-+Taguatinga,+Bras%C3%ADlia+-+DF,+72110-015&ftid=0x935a32e6e1d605b9:0x24748e1fc1112047&hl=pt-BR&gl=br&shorturl=1";

var exports = module.exports = {};

exports.coordinatesFromURL = function(originalURL) {
    return parser.parseURLString(originalURL);
}

let result = parser.parseURLString(testGoogle);
result.then(function(jsonCoordinates) {
    console.log(jsonCoordinates);
}, function(err) {
    console.log(err);
})