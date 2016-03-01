#!/usr/bin/env node


module.exports = function () {

    require('shelljs/global');

    var H = require('./holos-site')
    ({
        id: 'anpheon',
        root_process: process,
        js: "./js",
        env:{
            ENV: "E",
            PROD: "P",
            STAGE: "S",
            DEV: "D",
            LOC: "L"
        },
        paths : {
            root_path: '.',
            dir: '',
            js: './js/',
            file: '',
            shellRoot: '',
            meta:'test/holos-meta.json'
        }
    });


// ROUTES

    function init(arg1, arg2, arg3) {
        logRoute('init', arg1);
        setupEnv();
    }

    function build(param) {
        logRoute('build', param);
        var _ = require('lodash');
        console.log("building from");


    }

    function deploy(param) {
        logRoute('deploy', param);
        var _ = require('lodash');
    }

    function clean(params) {
        logRoute("cleanModules");
        goHome();
        echo(exec('pwd').output);
    }

    function page(id) {
        logRoute('building a page with id = ', H.id);
        goHome();
        exec('pwd');

    }


// HELPER FUNCTIONS

    function setupEnv() {
        //TODO: not working
        //exec("alias a='gulp'");
        //exec("alias a='gulp'");
        //exec("alias watch='gulp watch'");
        //exec("alias build='gulp build'");
        //exec("alias deploy='gulp deploy'");
        echo("env setup complete");
    }

    function goHome(path) {
        exec('cd ' + H.paths.shellRoot);
    }

    function logRoute(route, params) {
        //H.meta.logTitle();
        echo('___ ' + route + ' ___ ');
    }

    function onRouteComplete(route) {
        logRoute(route + ' complete');
    }

}
();