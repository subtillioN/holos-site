module.exports = function meta(H) {

    var moment = require('moment');
    var jsonfile = require('jsonfile');
    jsonfile.spaces = 2;

    var M = {id: H.id + ".meta"};

    M.logTitle = function (verbose) {
        console.log(M.data.title_alt);
        console.log(M.data.tagline);
        console.log("Version " + H.version.v);
        var t = M.data.title_alt + '\r' + M.data.tagline;
        return t;
    };

    M.parseMeta = function parseMeta(path, callback) {

        console.log("path is ... ", path);
        jsonfile.readFile(path, function (err, meta) {
            if (err) {
                console.log('META: READ ERROR');
            }
            else {
                //console.log('META WRITE');
                meta.modified = M.now(meta.time_stamp_fmt);
                meta.version = H.version.v+"";
                M.data = meta;
                jsonfile.writeFile(path, meta, function (error, result) {
                    if (error) {
                        console.log('META: WRITE ERROR');
                    }
                    else {
                        callback(error, meta);
                    }
                });
            }

        });
    };

    M.now = function now(fmt) {
        return moment().format(fmt ? fmt : "YYYY");
    };

    // Please add to tags as you see fit ...
    // ... any content author of posts, or any author quoted or cited herein.  Please add ones I miss...
    // Anyone who helps with the website and would like recognition... you, editing anything right now, automatically add yourself.

    M.parse = function parse(callback) {
        M.parseMeta(H.root_path + H.paths.meta, callback);
    };

    H.meta = M;

    return H;
};