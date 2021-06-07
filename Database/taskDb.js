
const sql = require('mssql/msnodesqlv8');

const sqlConfig = {
    database: 'ToDoStuff',
    server: '.\\sqlexpress',
    driver: 'msnodesqlv8',
    options: {
        trustServerCertificate: true,
        trustedConnection: true
    }
}

const getTasks = async () => {
    await sql.connect(sqlConfig);
    const { recordset } = await sql.query(`SELECT tdi.*, c.Name as CategoryName FROM Categories c
    JOIN Items tdi
    ON c.Id = tdi.CategoryId
    WHERE tdi.CompletedDate IS NULL`);
    return recordset;
}

const getCategories = async () => {
    await sql.connect(sqlConfig);
    const { recordset } = await sql.query(`SELECT * FROM Categories`);
    return recordset;
}


const addTask = async ({ title, dueDate, categoryId }) => {
    await sql.connect(sqlConfig);
    await sql.query`INSERT INTO Items (Title, CategoryId, DueDate) 
    VALUES (${title}, ${categoryId}, ${dueDate})`;
}

const markTaskCompleted = async ({ id }) => {
    await sql.connect(sqlConfig);
    await sql.query`UPDATE Items SET CompletedDate = GETDATE() WHERE Id = ${id}`;
}

const addCategory = async ({ name }) => {
    await sql.connect(sqlConfig);
    await sql.query`INSERT INTO Categories (Name) 
    VALUES (${name})`;
}

const getCompleted = async () => {
    await sql.connect(sqlConfig);
    const { recordset } = await sql.query(`SELECT tdi.*, c.Name as CategoryName FROM Categories c
    JOIN Items tdi
    ON c.Id = tdi.CategoryId
    WHERE tdi.CompletedDate IS NOT Null`);
    return recordset;
}

const getCategoryById = async (id) => {
    await sql.connect(sqlConfig);
    const { recordset } = await sql.query`SELECT * from Categories WHERE Id=${id}`;
    return recordset[0];
}

const updateCategory = async ({name, id}) => {
    await sql.connect(sqlConfig);
    const { recordset } = await sql.query`UPDATE Categories SET Name = ${name} WHERE Id=${id}`
}

module.exports = {
    getTasks,
    addTask,
    getCategories,
    getCompleted,
    addCategory,
    markTaskCompleted,
    getCategoryById,
    updateCategory
}