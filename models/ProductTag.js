const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false, 
      primaryKey: true
    },
    product_id:{
      type: DataTypes.INTEGER,
      reference:{model: 'product', key:'id'}
    },
    tag_id:{
      type: DataTypes.INTEGER,
      reference:{model: 'tag', key:'id'}
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
