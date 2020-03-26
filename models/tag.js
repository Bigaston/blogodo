'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: {
		type: DataTypes.STRING,
		primaryKey: true
	}
  }, {
	timestamps: false
  });
  Tag.associate = function(models) {
	models.Tag.belongsToMany(models.Article, { through: 'AssociationTag' })
  };
  return Tag;
};