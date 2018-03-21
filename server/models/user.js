export default (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		firstName: {
			type: DataTypes.STRING,
			validate: {
				isAlpha: true,
				notEmpty: true
			},
		},

		lastName: {
			type: DataTypes.STRING,
			validate: {
				isAlpha: true,
				notEmpty: true
			},
		},
		email: {
			type: DataTypes.STRING,
			validate: {
				isEmail: true,
				notEmpty: true
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

  User.associate = (models) => {
  	User.hasMany(models.Business, {
  		foreignKey: 'userId',
  		onDelete: 'CASCADE',
  	});
  };
  return User;
};