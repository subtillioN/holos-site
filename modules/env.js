module.exports = function (H) {

    var eve = {
        _root: H.root_path,
        //root_process: H.root_process,
        env: H.env ? H.env : {
            PROD: "P",
            TEST: "T",
            DEV: "D",
            LOC: "L"
        },
        //set default(id){
        //    "use strict";
        //
        //},
        //get default(){ return eve.def;},
        getEnv:getEnv

    };



    function init() {
        index();
        //eve.default =
    }

    function getEnv(id) {
        var env = false;
        try {
            env = eve[id];
        }
        catch (ex) {
        }
        if(!env){
            //echo('env.js error :: Could not find the environment for ' + id);
            env = eve.default;
        }
        return env;
    }

    function index() {
        for (var prop in eve.env) {
            var key = eve.env[prop];
            eve[key] = {
                id: prop,
                key: key,
                dir: eve._root + "deploy/" + prop.toLowerCase() + '/'
            };
            eve[prop] = key;
        }

        //eve.def = eve.D;
    }


    //TODO:: prepend "HOLOS_" to ID and export to environment
    function exportENV(opt){

    }

    init();
    H.env = eve;
    return H;

}
;

