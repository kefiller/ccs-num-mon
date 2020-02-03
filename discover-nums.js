#!/usr/bin/env docker-node

const { isEmpty, get } = require('lodash');

const { query, dbDisconnect } = require('./db');

(async () => {
    try {
        let sql = `select number, settings from monitor_numbers`;

        const { rows = [] } = await query(sql);
        dbDisconnect();

        const numbers = [];

        for (const { number, settings: settingsJSON } of rows) {
            const { desc = '' } = JSON.parse(settingsJSON);
            numbers.push({
                number,
                desc
            });
        }
        const outData = {
            data: numbers
        };

        //, null, 2)
        const outDataStr = JSON.stringify(outData)
            .replace(/number/g,'{#CCS_NUMBER}')
            .replace(/desc/g,'{#CCS_NUMBER_DESC}');

        console.log(outDataStr);
    } catch (error) {
        console.log(error);
    }
})();

//let sql = `select * from cdr where calldate > now()::date and (now() - calldate) < interval '${check_interval}' and dst = '${number}' order by calldate desc limit 1`;
