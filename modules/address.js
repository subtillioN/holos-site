/**
 *
 * @param opt
 * @returns {{setRoutes: setRoutes, emit: (*|noop), tick: tick, shellPath: shellPath, path_utils: *, process_utils: *}|*}
 */


module.exports = function (opt) {
    //console.log('adress.opt is ... ', opt);
    var H;
    var process_utils;
    var func_utils = opt.func;
    var path_utils = opt.path;
    var _self = this;

    process_utils = path_utils.process_utils;

    _self.routes = [];

    H = {
        setRoutes: setRoutes,
        tick: tick,
        shellPath: shellPath,
        path_utils: path_utils,
        process_utils: process_utils
    };

    function setRoutes(index, routes) {
        _self.routes[index] = routes;
    }

    function tick(index, complete) {
        var param = process_utils.args(index);
        var fn = _self.routes[index][param],
            arg1 = process_utils.args(index + 1),
            arg2 = process_utils.args(index + 2),
            arg3 = process_utils.args(index + 3);
        func_utils.runFunc(fn, arg1, arg2, arg3);
        func_utils.runFunc(complete(param));
    }

    function shellPath() {
        return path_utils.shellPath(process_utils.getRootPath());
    }

    return H;
};