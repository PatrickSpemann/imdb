var imdb = require('../index');

imdb.search('martian', function (err, data) {
    if (err)
        console.log(err.stack);

    if (data)
        console.log(data);
});