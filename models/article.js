'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    slug: {
		type: DataTypes.STRING,
		primaryKey: true
	},
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    text: DataTypes.TEXT,
    pubDate: DataTypes.DATEONLY
  }, {
	timestamps: false
  });
  Article.associate = function(models) {
    models.Article.belongsToMany (models.Tag, { through: 'AssociationTag' })
  };
  return Article;
};