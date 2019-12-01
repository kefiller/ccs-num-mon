#!/usr/bin/env docker-node


const { isEmpty } = require('lodash');

const { query, dbDisconnect } = require('./db');

const myArgs = process.argv.slice(2);

if( isEmpty(myArgs) ) {
    console.log("Invalid arguments");
    process.exit(1);
}

console.log(myArgs);
