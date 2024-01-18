const express = require('express');
const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const faker = require('faker');
const mysql = require('mysql');
const util = require('util');

let connection;

const createConnection = () => {
    connection = mysql.createConnection(config);
    connection.query = util.promisify(connection.query).bind(connection);
};

const closeConnection = () => {
    if (connection) {
        connection.end();
    }
};

app.get('/', async (req, res) => {
    try {
        createConnection(); // Criar conexão se não existir

        await createPeopleTable(); // Verifica se a tabela existe, e a cria se não existir

        const newNames = generateRandomNames(); // Gera um novo array de nomes aleatórios
        await insertPeople(newNames);
        
        const results = await getNames();
        const tableRows = results.map(
            (person) => `
            <tr>
              <td>${person.id}</td>
              <td>${person.name}</td>
            </tr>`
        ).join('');

        const table = `
          <table>
            <tr>
              <th>#</th>
              <th>Name</th>
            </tr>${tableRows}
          </table>`;

        res.send(`
          <h1>Full Cycle Rocks!</h1>
          ${table}`
        );
    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).send('Erro interno no servidor');
    } finally {
        closeConnection(); // Fechar a conexão após a conclusão da operação
    }
});

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
});

async function createPeopleTable() {
    const tableExistsSql = "SHOW TABLES LIKE 'people'";
    const tableExists = await connection.query(tableExistsSql);

    if (tableExists.length === 0) {
        const createTableSql = `
            CREATE TABLE people (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL
            )`;
        await connection.query(createTableSql);
    }
}

function generateRandomNames() {
    const newNames = [];
    for (let i = 0; i < 6; i++) {
        newNames.push(faker.name.firstName());
    }
    return newNames;
}

async function insertPeople(names) {
    for (const name of names) {
        const insertNameSql = `INSERT INTO people(name) VALUES ('${name}')`;
        await connection.query(insertNameSql);
    }
}

async function getNames() {
    const getNamesSql = `SELECT id, name FROM people`;
    return await connection.query(getNamesSql);
}