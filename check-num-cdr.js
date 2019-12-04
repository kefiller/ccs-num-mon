#!/usr/bin/env docker-node

const { isEmpty } = require('lodash');

const { query, dbDisconnect } = require('./db');

const check_interval = '5 minutes';

const myArgs = process.argv.slice(2);

if (isEmpty(myArgs)) {
    console.log("Invalid arguments");
    process.exit(255);
}

const number = myArgs[0];

(async () => {
    //let sql = `select * from cdr where calldate > now()::date and (now() - calldate) < interval '${check_interval}' and dst = '${number}' order by calldate desc limit 1`;
    let sql = `select * from cdr where 
                    calldate > now()::date 
                    and (now() - calldate) < interval '${check_interval}' 
                    and dst = (select settings::json->>'incoming_exten' from monitor_numbers where number='${number}')
                    and clid not like '"monitoring"%'
                    order by calldate desc limit 1`;
    // console.log(sql);
    const { rows } = await query(sql);
    dbDisconnect();
    if (rows.length > 0) {
        console.log(`${number} OK`);
        process.exit(0);
    }
    console.log(`${number} BAD!`);
    process.exit(1);
})();

