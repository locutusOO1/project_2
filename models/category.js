// Creating our category model
module.exports = function(sequelize, DataTypes) {
  const Category = sequelize.define(
    "Category",
    {
      //giving category name , total answered questions, correct answers 
      categoryName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      totalAnswered: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      totalCorrect: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["UserId", "categoryName"]
        }
      ]
    }
  );
 //associate Category with the user 
  Category.associate = function(models) {
    Category.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      },
      //when user is deleted, delete associated category 
      onDelete: "cascade"
    });
  };

  return Category;
};