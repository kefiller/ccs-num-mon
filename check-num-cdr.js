#!/usr/bin/env docker-node

const { isEmpty, get } = require('lodash');

const { query, dbDisconnect } = require('./db');

const check_interval = get(process.env, 'CHECK_INTERVAL', '5 minutes');

const myArgs = process.argv.slice(2);

if (isEmpty(myArgs)) {
    console.log("Invalid arguments");
    process.exit(255);
}

const number = myArgs[0];

(async () => {
    try {
        let sql = `select * from cdr where 
                    calldate > now()::date 
                    and (now() - calldate) < interval '${check_interval}' 
                    and dst = (select settings::json->>'incoming_exten' from monitor_numbers where number='${number}')
                    and clid not like '"monitoring"%'
                    order by calldate desc`;

        const { rows = [] } = await query(sql);
        dbDisconnect();

        console.log(`${rows.length}`);
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
})();
