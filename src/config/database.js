import { Sequelize } from "sequelize";
const sequelize = new Sequelize(  {
    dialect: 'mysql',
  host: 'b8ry7fuohq84apwsfcmw-mysql.services.clever-cloud.com',
  username: 'uznowatthibcs2ie',
  password: 'kZnLDDDe5XhOElX9I36b',
  database: 'b8ry7fuohq84apwsfcmw',
  port: 3306
});
const  connect_db = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
export default  connect_db