module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    reviewBody: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      },
    },
  });

  Review.associate = (models) => {
    Review.belongsTo(models.Business, {
      foreignKey: 'businessId',
      onDelete: 'CASCADE',
    });
  };

  return Review;
};
