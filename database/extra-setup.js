function applyExtraSetup(sequelize) {
    const { departments , knowledge, titles } = sequelize.models;

    knowledge.hasMany(titles, {foreignKey: "knowledge_id"});
    titles.belongsTo(knowledge, {foreignKey: "knowledge_id"});

    departments.hasMany(titles, {foreignKey: "department_id"});
    titles.belongsTo(departments, {foreignKey: "department_id"});

}

module.exports = { applyExtraSetup };
