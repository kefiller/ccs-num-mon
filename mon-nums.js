#!/usr/bin/env docker-node

//const dnsPromises = require('dns').promises; // const addr = await dnsPromises.lookup('dclvccsapp.guo.local');

const { get } = require('lodash');
const { query, dbDisconnect } = require('./db');
const { CCSApiClient } = require('./ccs-api-client');

const check_interval = get(process.env, 'CHECK_INTERVAL', '5 minutes');

const client = new CCSApiClient({
    url: process.env.API_URL,
    auth: process.env.API_TOKEN,
});

(async () => {
    let sql = `select * from monitor_numbers where (now() - check_time) > interval '${check_interval}'`;
    const { rows } = await query(sql);
    for (const { number, settings: settingsJSON, check_time } of rows) {
        const { dial_trunk:trunk, callerid } = JSON.parse(settingsJSON);
        console.log(number, trunk, check_time);

        try {
            let result = await client.callOriginate(
                {
                    type: 'number',
                    number,
                    callerid,
                    trunk
                },
                {
                    type: 'dialplan',
                    context: 'monitoring',
                    extension: number
                }
            );

            console.log(result);
        } catch (error) {
            console.log(error);
        }

        sql = `update monitor_numbers set check_time=now() where number = '${number}'`;
        result = await query(sql);
    }

    dbDisconnect();
})();
