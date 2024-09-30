module.exports = (sequelize, Sequelize) => {
    const Phone = sequelize.define("phone", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        phone_type: {
            type: Sequelize.STRING,  // Change name to phone_type
            allowNull: false  
        },
        phone_number: {
            type: Sequelize.STRING,  // Update number to phone_number 
            allowNull: false  
        },
        contactId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'contacts',  // Ensure this references the contacts table correctly
                key: 'id',
            },
            onDelete: 'CASCADE'  
        }
    });
  
    return Phone;
};
