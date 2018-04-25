module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    businessName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      },
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      },
    },
    categories: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      validate: {
        notEmpty: true
      },
    },
    productsOrServices: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      },
    },
    address: {
      type: DataTypes.STRING,
    },
  });

  Business.associate = (models) => {
    Business.hasMany(models.Review, {
      foreignKey: 'businessId',
      as: 'reviews',
    });

    Business.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Business;
};
