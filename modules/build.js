module.exports = function (H) {


    var gulp=require("gulp"),
        gsmith=require("gulpsmith");

    H.build = build;

    function build(env, options) {
        env = H.env[env];
        H.version.bump(options[0]);
        console.log("building " + env.id +
            " version " + H.version.v +
            " at " + env.dir);

        var dir = env.dir+ H.id + "_" + H.version.v;

        if (!makePaths(env.dir)) {
            makePaths(H.path.normalize(env.dir+".."));
            makePaths(env.dir);
            if(!makePaths(dir)){
                rm('-rf', dir);
                makePaths(dir);
            }
        }

    }

    function makePaths(dir) {
        if (mkdir(dir)) {
            return true;
        } else {
            return false;
        }
    }


    return H;
};