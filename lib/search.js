var request = require('request')
var cheerio = require('cheerio')
module.exports = function (searchString, cb) {
    searchString = encodeURI(searchString);
    request('http://www.imdb.com/find?s=tt&q=' + searchString + '/', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            body = body.replace(/(\r\n|\n|\r)/gm, '').replace(/ +(?= )/g, '')
            $ = cheerio.load(body)

            var id = "N/A";
            var $td = $('table.findList td').first();
            var link = $td.find('a').attr("href");
            if (link && typeof link === "string") {
                var parts = link.split("/");
                if (parts.length > 3)
                    id = parts[2];
            }
            cb(null, {
                id: id
            })
        } else {
            cb(new Error('IMDB Failed to respond, or responded with error code'), null);
        }
    })
}