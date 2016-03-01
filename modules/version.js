module.exports = function (H) {
    var Q = require('q');
    var ver;

    var version = {
        bump: bump,
        now: now,
        v: null
    };

    /**
     *
     * @param m: H ::
     *
     *      -1  = 'prerelease'
     *      0 or undefined = 'patch',
     *      1   = 'minor',
     *      2   = 'major',
     *      0.9 = 'prepatch',
     *      0.9 = 'preminor',
     *      1.9 = 'premajor'
     *
     * @returns {String}
     */
    function bump(m) {
        //TODO:
        //var v = m || "patch";
        //
        //switch (m) {
        //    case -1:
        //        v = 'prerelease';
        //        break;
        //    case 0.9:
        //        v = 'preminor';
        //        break;
        //    case 1:
        //        v = 'minor';
        //        break;
        //    case 1.9:
        //        v = 'premajor';
        //        break;
        //    case 2:
        //        v = 'major';
        //        break;
        //    case 0:
        //        console.log('0 or default');
        //    default:
        //        console.log('default');
        //}

        return _bump(m);
    }

    /**
     *
     * @param v
     * @returns {String}
     * @private
     *
     */
    function _bump(v) {
        if (v != "" && v != undefined && v != null) {
            version.v = exec("npm version " + v ).output.substring(1);
            version.v = version.v.replace(/\r?\n|\r/g, "");
        }

        return version.v;
    }

    //TODO:: ASYNC: return version promise

    /**
     *

     ex:

     H.version.now().then(function (data){
        console.log('then:: H.version.now().then(data) is ... ', data);
        //console.log('then:: vdef is ... ', vdef);
     });

     * @param opt
     * @returns {*|promise}
     */
    function now() {
        var v = require('version');
        var deferred = Q.defer();
        v.fetch(function (error, v) {
            if (error) deferred.reject(error);
            else deferred.resolve(function () {
                version.v = v;
                return v;
            }());
        });
        return deferred.promise;
    }

    H.version = version;

    return H;
};

