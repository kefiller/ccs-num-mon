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
const query = (async sql => {
    let result = null;
    try {
        result = await dbQuery(sql);
    } catch (error) {
        result = error;
    }
    return result;
});


module.exports = {
    query,
    dbDisconnect
}
