#!/usr/bin/env docker-node

//const fs = require('fs');
const { forOwn } = require('lodash');
const { Pool } = require('pg')

const pool = new Pool({
  user: 'aster',
  password: '12Fcnthbcr34',
  host: '10.222.0.28',
  database: 'ccs',
  port: 5432,
})

//const dbConnect = (pool => async () => await pool.connect())(pool);
const dbDisconnect = (pool => async() => await pool.end())(pool);
const dbQuery = ( pool => async query => await pool.query(query))(pool);

const nums2mon = {
    '78312681022': {
        interval: '5 minutes',
        trunk: 'nn-88312681022'
    },
    '78312681023': {
        interval: '5 minutes',
        trunk: 'nn-88312681022'
    },
};

//function run() {
    console.log('delete from monitor_numbers');
    dbQuery('delete from monitor_numbers');
    forOwn(nums2mon, (value, key) => {
        const settings = JSON.stringify(value);
        const sql = `insert into monitor_numbers(number, settings) values('${key}', '${settings}')`;
        console.log(sql);
        dbQuery(sql);
    });
    dbDisconnect();
//}

//run();

/*
fs.writeFile("test.txt", "Hey there!", function(err) {

    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
*/