import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'library_db',
    username: 'library_user',
    password: 'library_pass',
})

export default sequelize;