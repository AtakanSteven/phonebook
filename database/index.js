const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');

const sequelize = new Sequelize(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`, {logging: false});

const modelDefiners = [
    require('./models/users.model'),
    require('./models/departments.model'),
    require('./models/knowledge.model'),
    require('./models/loyalties.model'),
    require('./models/titles.model'),
    // Add more models here...
];

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

applyExtraSetup(sequelize);


module.exports = sequelize;