// models/company.js
module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define("company", {
        company_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        company_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        company_address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        contact_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'contacts',  // Refers to table name in the database
                key: 'id'
            },
            onDelete: 'CASCADE'  // Cascade deletion if a contact is deleted
        }
    });

    return Company;
};
