'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employee_detail.belongsTo(models.User,
        {foreignKey: "user_id"});
      Employee_detail.belongsTo(models.Salary,
        {foreignKey: "salary_id"})
    }
  }
  Employee_detail.init({
    full_name: DataTypes.STRING,
    birth_date: DataTypes.DATE,
    join_date: DataTypes.DATE,
    user_id: DataTypes.INTEGER,
    salary_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Employee_detail',
  });
  return Employee_detail;
};