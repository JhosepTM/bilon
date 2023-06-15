import { pool } from '../config/db.js'; // Importa el objeto pool desde db.js

export const Assets = {

  // Obtener datos por id
  async getIdByFileName(name) {
    try {
      const query = 'SELECT * FROM assets WHERE path = $1';
      const values = [name];
      const result = await pool.query(query, values); // Utiliza db.pool.query en lugar de pool.query
      return result.rows[0];
    } catch (error) {
      throw new Error('Error al obtener el registro de asset');
    }
  },

  async getAssetIds() {
    try {
      const query = 'SELECT id, path FROM assets';
      const result = await pool.query(query); // Utiliza db.pool.query en lugar de pool.query
      return result.rows;
    } catch (error) {
      throw new Error('Error al obtener el registro de asset');
    }
  },

};