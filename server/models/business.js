export default (sequelize, DataTypes) => {
    const Business = sequelize.define('Business', {
      businessName: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      description: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      categories: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      productsOrServices: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      location: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      address: {
          type: DataTypes.STRING,
          allowNull: false,
      },    
    });
  
    Business.associate = function(models) {
        Business.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
        });  	
    };
  
    return Business;
  };
  