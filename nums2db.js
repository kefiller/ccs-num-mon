#!/usr/bin/env docker-node

const { forOwn, map } = require('lodash');
const { Pool } = require('pg')

const pool = new Pool({
    user: 'aster',
    password: '12Fcnthbcr34',
    host: '10.222.0.28',
    database: 'ccs',
    port: 5432,
})

const dbDisconnect = (pool => () => pool.end())(pool);
const dbQuery = (pool => query => pool.query(query))(pool);
const myQuery = (async sql => {
    let result = null;
    try {
        result = await dbQuery(sql);
    } catch (error) {
        result = error;
    }
    return result;
});

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

(async () => {
    console.log('delete from monitor_numbers');
    await myQuery('delete from monitor_numberz');
    const promises = map(nums2mon, (value, key) => {
        const settings = JSON.stringify(value);
        const sql = `insert into monitor_numbers(number, settings) values('${key}', '${settings}')`;
        console.log(sql);
        return myQuery(sql);
    });
    
    await Promise.all(promises);
    await dbDisconnect();
    console.log('disconnected');
})();
