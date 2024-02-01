import Sequelize from "sequelize"
import { db } from "../database/db"

const Restaurant = db.define("restaurant", {
  id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cuisineType: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  rating: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  openingHours: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  hasDelivery: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
})

export default Restaurant
