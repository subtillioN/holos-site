module.exports = function (opt) {
    var _ = require("lodash");
    var Q = require('q');
    var async = require('async');
    var path = require('path');


    console.log("opt.paths.root_path is ... ", opt.paths.root_path);

//TODO: Move setDefaults to a module so that the format could be :: H = require(defaults)({val:"blah"},opt);

    var setDefaults = _.partialRight(
        _.assign,
        function (value, other) {
            return _.isUndefined(value) ? other : value;
        });


    var H = setDefaults({
        id: "holos",
        setDefaults: setDefaults,
        toRequire: [
            "version",
            "env",
            "meta",
            "build"
        ].concat(opt.require || []),
        require: _r,
        root_path: path.normalize(opt.paths.root_path) + "/" || "./",
        modules_root: "./",
        module_paths: {
            env: "modules/",
            version: "modules/",
            meta: "modules/",
            build: "modules/"
        },
        events: {
            ON_INIT: "holos:init"
        },
        promises: {
            onInit: null
        },
        path: path,
        async: async,
        path: path,
        toString: function () {
            return "Holos"
        }
    }, opt);


    function getModulePath(id) {
        return H.modules_root + H.module_paths[id] + id;
    }

    function getRConfig(id) {
        return {path: getModulePath(id)};
    }

    function loadHolos() {

        for (var prop in H.toRequire) {
            var id = H.toRequire[prop];
            var config = getRConfig(id);
            H.require(config.path, id);
        }
        if (H.env) {
            H.getEnv = H.env.getEnv;
        }
    }

    function _r(path, id) {
        require(path)(H);
    }

    loadHolos();

    //TODO:: ADD parseMeta to the parrallel async here...
    H.onInit = Q.all([
        H.version.now()
    ]);



//TODO:: modify to use async.auto ...
//    H.onInit = async.auto([
//        H.version.now(),
//        H.meta.parse("0.0.1", function (error, meta) {
//            console.log('H.meta.data is ... ', H.meta.data);
//        })
//    ], function onComplete(args) {
//        console.log('args is ... ', args);
//    });

    H.onInit.then(function (version) {
        H.meta.parse(function (error, meta) {
            H.meta.logTitle();
        });
    });

    return H;

};