import sequelize from "../db.js";
import Product from "./Product.js";
import Categories from "./Categories.js";

// Định nghĩa quan hệ một-một
Category.hasMany(Product, { foreignKey: 'category_id', onDelete: 'CASCADE' });
Product.belongsTo(Category, { foreignKey: 'category_id', onDelete: 'CASCADE' });

export { sequelize, Categories, Product };
