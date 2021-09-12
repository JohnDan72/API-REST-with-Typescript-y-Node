import { Sequelize } from "sequelize";

const db = new Sequelize( 'titanes_db' , 'root' , '' , {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false
} );


export default db;
