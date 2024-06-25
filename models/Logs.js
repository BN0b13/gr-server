'use strict';
import {
  Model,
  DataTypes,
  Sequelize
} from 'sequelize';
import { sequelize } from '../db.js';

class Logs extends Model {
  
  static associate(models) {
    
  }
}
Logs.init({
  type: DataTypes.STRING,
  duration: DataTypes.STRING,
  notes: DataTypes.JSONB
}, {
  sequelize,
  schema: process.env.PG_SCHEMA_NAME,
  modelName: 'Logs',
});

export default Logs;