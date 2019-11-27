#!/usr/bin/env docker-node

const { query, dbDisconnect } = require('./db');
const { CCSApiClient } = require('./ccs-api-client');

const check_interval = '5 minutes';

const client = new CCSApiClient({
    url: 'http://dclvccsapp.guo.local:8008/api/v1/',
    auth: 'uyLH5PA0MngNyRaPQvr386SOSUiXU8'
});

(async () => {
    const sql = `select * from monitor_numbers where (now() - check_time) > interval '${check_interval}'`;
    const { rows } = await query(sql);
    for (const { number, settings: settingsJSON, check_time } of rows) {
        const { trunk } = JSON.parse(settingsJSON);
        console.log(number, trunk, check_time);

        let result = await client.callOriginate(
            {
                type: 'number',
                number,
                callerid: number,
                trunk
            },
            {
                type: 'dialplan',
                context: 'monitoring',
                extension: number
            }
        );
        console.log(result);
    }

    process.exit();

})();

