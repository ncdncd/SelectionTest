'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employee_details.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    birth_date: DataTypes.DATE,
    join_date: DataTypes.DATE,
    user_id: DataTypes.INTEGER,
    salary_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Employee_details',
  });
  return Employee_details;
};