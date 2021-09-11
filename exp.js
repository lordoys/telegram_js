const fs = require('fs');

fs.readFile('237016451.txt', 'utf8' , (err, data) => {

    if (err) {
        fs.writeFile(
            "237016451.txt",
            '{}',
            function(err) {
                if (err) throw err;
            });
    }
});
