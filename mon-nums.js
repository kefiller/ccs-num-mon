#!/usr/bin/env docker-node

const { query, dbDisconnect } = require('./db');
const { CCSApiClient } = require('./ccs-api-client');

const client = new CCSApiClient({
    url: 'http://dclvccsapp.guo.local:8008/api/v1/',
    auth: 'uyLH5PA0MngNyRaPQvr386SOSUiXU8'
});

(async () => {
    const sql = 'select * from monitor_numbers';
    const { rows } = await query(sql);
    for (const {number, settings: settingsJSON, check_time} of rows) {
        const settings = JSON.parse(settingsJSON);
        console.log(number, settings, check_time);
    }
    
    process.exit();

    let result = await client.callOriginate(
        {
            type: 'number',
            number: '89201911686',
            callerid: '79190690417',
            trunk: 'bee-mob-carousel'
        },
        {
            type: 'dialplan',
            context: 'test',
            extension: '123'
        }
    );
    console.log(result);
})();

