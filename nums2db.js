#!/usr/bin/env docker-node

const { map } = require('lodash');

const { query, dbDisconnect } = require('./db');

const nums2mon = {
    '78312681022': {
        interval: '5 minutes',
        trunk: 'nn-88312681022'
    },
};

(async () => {
    const sqls = map(nums2mon, (value, key) => {
        const settings = JSON.stringify(value);
        return `insert into monitor_numbers(number, settings) values('${key}', '${settings}')`;
    });

    sqls.unshift('delete from monitor_numbers');

    for(const sql of sqls) {
        console.log(sql);
        const result = await query(sql);
        // console.log(result);
    }
    await dbDisconnect();
})();
