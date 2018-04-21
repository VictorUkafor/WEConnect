module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      },
    },
    lastName: {
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
	    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        min: 5,
      },
    },
  });

  return User;
};
