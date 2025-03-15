import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('myapp', 'root', 'thanh02594', {
    host: 'localhost',
    dialect: 'mysql',
});

(async () => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.log(error);
    }
})();

export default sequelize;
