import { pool } from '../config/db.js'; // Importa el objeto pool desde db.js

export const SCOAssets = {

  // Obtener todos los registros
  async getAll(idSCO) {
    try {
      const query = 'SELECT * FROM SCOAssets WHERE sco_id = $1';
      const values = [idSCO];
      const result = await pool.query(query,values); // Utiliza db.pool.query en lugar de pool.query
      return result.rows;
    } catch (error) {
      throw new Error('Error al obtener los registros de SCOAssets');
    }
  },

  // Agregar un nuevo registro
  async create(idSCO, idAsset) {
    try {
      const query =
        'INSERT INTO SCOAssets (sco_id, assets_id) VALUES ($1, $2) RETURNING *';
      const values = [idSCO, idAsset];
      const result = await pool.query(query, values); // Utiliza db.pool.query en lugar de pool.query
      return result.rows[0];
    } catch (error) {
      throw new Error('Error al crear un registro de SCOAsssets');
    }
  },

  //Eliminar un elemento por id del asset, tomando como base el id del SCO
  async deleteByIdAsset(idSCO, idAsset) {
    try {
      const query = 'DELETE FROM SCOAssets WHERE sco_id = $1 AND assets_id = $2 RETURNING *';
      const values = [idSCO, idAsset];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error('Error al eliminar el registro de SCOAssets');
    }
  },

};