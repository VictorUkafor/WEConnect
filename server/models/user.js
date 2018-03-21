export default (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	    password: {
			type: DataTypes.STRING,
			allowNull: false,
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