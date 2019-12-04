#!/usr/bin/env docker-node

const { map } = require('lodash');

const { query, dbDisconnect } = require('./db');

const nums2mon = {
    // 011

    // NN
    '88312681022': {
        real_trunk: 'nn-88312681022',
       dial_trunk: 'sp-84965419020',
        callerid: '"monitoring" <84965419020>',
        incoming_exten: '88312681022',
    },
    '88312681000': {
        real_trunk: 'nn-88312681000',
        dial_trunk: 'sp-84965419020',
        callerid: '"monitoring" <84965419020>',
        incoming_exten: '78312681000',
    },
    '88312681007': {
        real_trunk: 'nn-88312681007',
        dial_trunk: 'sp-84965419020',
        callerid: '"monitoring" <84965419020>',
        incoming_exten: '88312681007',
    },
    '88312813000': {
        real_trunk: 'cc-nn-78312813000',
        dial_trunk: 'sp-84965419020',
        callerid: '"monitoring" <84965419020>',
        incoming_exten: '78312813000',
    },
    '88312140022': {
        real_trunk: 'cc-nn-78312140022',
        dial_trunk: 'sp-84965419020',
        callerid: '"monitoring" <84965419020>',
        incoming_exten: '78312140022',
    },

    // 000

    // Кстово
    '88314539600': {
        real_trunk: 'kst-88314539600',
        dial_trunk: 'nn-88312681000',
        callerid: '"monitoring" <88312681000>',
        incoming_exten: '39600',
    },
    '88314543977': {
        real_trunk: 'cc-kst-88314543977',
        dial_trunk: 'nn-88312681000',
        callerid: '"monitoring" <88312681000>',
        incoming_exten: '78314543977',
    },

    // Сергиев Посад
    '84965419020': {
        real_trunk: 'sp-84965419020',
        dial_trunk: 'nn-88312681000',
        callerid: '"monitoring" <88312681000>',
        incoming_exten: '84965419020',
    },

    // Пенза
    '88412980100': {
        real_trunk: 'pnz-88412980100',
        dial_trunk: 'nn-88312681000',
        callerid: '"monitoring" <88312681000>',
        incoming_exten: '78412980100',
    },

    // Киров
    '88332713317': {
        real_trunk: 'kir-88332713317',
        dial_trunk: 'nn-88312681000',
        callerid: '"monitoring" <88312681000>',
        incoming_exten: '78332713317',
    },

    // Кемерово
    '83842780118': {
        real_trunk: 'cc-kem-73842780118',
        dial_trunk: 'nn-88312681000',
        callerid: '"monitoring" <88312681000>',
        incoming_exten: '73842780118',
    },

    // Самара
    '88463004000': {
        real_trunk: 'smr-88463004000',
        dial_trunk: 'nn-88312681000',
        callerid: '"monitoring" <88312681000>',
        incoming_exten: '3004000',
    },
    '88463004004': {
        real_trunk: 'smr-88463004004',
        dial_trunk: 'nn-88312681000',
        callerid: '"monitoring" <88312681000>',
        incoming_exten: '3004004',
    },
    '88463004006': {
        real_trunk: 'smr-88463004006',
        dial_trunk: 'nn-88312681000',
        callerid: '"monitoring" <88312681000>',
        incoming_exten: '3004006',
    },
    '88463004008': {
        real_trunk: 'smr-88463004008',
        dial_trunk: 'nn-88312681000',
        callerid: '"monitoring" <88312681000>',
        incoming_exten: '3004008',
    },
    '88462500045': {
        real_trunk: 'cc-smr-78462500045',
        dial_trunk: 'nn-88312681000',
        callerid: '"monitoring" <88312681000>',
        incoming_exten: '78462500045',
    },

    // Набережные Челны
    '88552917722': {
        real_trunk: 'nch-88552917722',
        dial_trunk: 'nn-88312681000',
        callerid: '"monitoring" <88312681000>',
        incoming_exten: '88552917722',
    },

    // Волгоград
    '88442999998': {
        real_trunk: 'ars-vgg-78442999998',
        dial_trunk: 'nn-88312681000',
        callerid: '"monitoring" <88312681000>',
        incoming_exten: '999998',
    },

    // Волжский
    '88443201058': {
        real_trunk: 'cc-vlz-78443201058',
        dial_trunk: 'nn-88312681000',
        callerid: '"monitoring" <88312681000>',
        incoming_exten: '78443201058',
    },


    // '88412458934': {
    //     trunk: 'pnz-78412458934'
    // },
    // '88312681006': {
    //     trunk: 'nn-88312681006'
    // },
    // '88314524040': {
    //     trunk: 'kst-88314524040'
    // },
    // '88552928988': {
    //     trunk: 'nch-78552928988'
    // },
    // '84965419022': {
    //     trunk: 'sp-74965419022'
    // },
    // '83512689520': {
    //     trunk: 'cc-chl-73512689520'
    // },
    // '83517298887': {
    //     trunk: 'cc-chl-73517298887'
    // },
    // '83517298483': {
    //     trunk: 'cc-chl-73517298483'
    // },
    // '83512171061': {
    //     trunk: 'chl-73512171061'
    // },
    // '88312681019': {
    //     trunk: 'debt-nn-78312681019'
    // },
    // '88312140042': {
    //     trunk: 'debt-nn-78312140042'
    // },
    // '88462010083': {
    //     trunk: 'debt-smr-78462010083'
    // },
    // '84965510668': {
    //     trunk: 'debt-sp-74965510668'
    // },
    // '88412234776': {
    //     trunk: 'debt-pnz-78412234776'
    // },
    // '83452215254': {
    //     trunk: 'debt-tym-73452215254'
    // },
    // '88442435039': {
    //     trunk: 'debt-vgg-78442435039'
    // },
    // '88552450008': {
    //     trunk: 'debt-nch-78552450008'
    // },
    // '83842780205': {
    //     trunk: 'debt-kem-73842780205'
    // },
    // '83517715110': {
    //     trunk: 'debt-chl-73517715110'
    // },
    // '88332222893': {
    //     trunk: 'debt-kir-78332222893'
    // },
    // '88443445001': {
    //     trunk: 'debt-vlz-78443445001'
    // },
    // '88462541630': {
    //     trunk: 'debt-smr-78462541630'
    // },

    // // НН СБК передача показаний, пока не мониторим
    // '88312621910': {
    //     trunk: 'sp-84965419020',
    //     callerid: '"monitoring" <84965419020>',
    // },

    // // Кстово СБК передача показаний, пока не мониторим
    // '88314536890': {
    //     real_trunk: 'kst-88314539600'
    //     trunk: 'nn-88312681000'
    // },
};

(async () => {
    const sqls = map(nums2mon, (value, key) => {
        const settings = JSON.stringify(value);
        return `insert into monitor_numbers(number, settings) values('${key}', '${settings}')`;
    });

    sqls.unshift('delete from monitor_numbers');

    for (const sql of sqls) {
        console.log(sql);
        const result = await query(sql);
        // console.log(result);
    }
    await dbDisconnect();
})();
