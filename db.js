const { Pool } = require('pg')

const pool = new Pool();

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
