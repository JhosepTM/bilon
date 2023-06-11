import { pool } from '../config/db.js'; // Importa el objeto pool desde db.js

export const SCO = {

  // Obtener todos los registros
  async getAll() {
    try {
      const query = 'SELECT * FROM SCO';
      const result = await pool.query(query); // Utiliza db.pool.query en lugar de pool.query
      return result.rows;
    } catch (error) {
      throw new Error('Error al obtener los registros de SCO');
    }
  },

  // Obtener datos por id
  async getById(id) {
    try {
      const query = 'SELECT * FROM SCO WHERE id = $1';
      const values = [id];
      const result = await pool.query(query, values); // Utiliza db.pool.query en lugar de pool.query
      return result.rows[0];
    } catch (error) {
      throw new Error('Error al obtener el registro de SCO');
    }
  },

  // Agregar un nuevo registro
  async create(title, instruction, historiaPrevia, metadata_id) {
    try {
      const query =
        'INSERT INTO SCO (title, instruction, historiaPrevia, metadata_id) VALUES ($1, $2, $3, $4) RETURNING *';
      const values = [title, instruction, historiaPrevia, metadata_id];
      const result = await pool.query(query, values); // Utiliza db.pool.query en lugar de pool.query
      return result.rows[0];
    } catch (error) {
      throw new Error('Error al crear un registro de SCO');
    }
  },

  //Eliminar un elemento por id
  async deleteById(id) {
    try {
      const query = 'DELETE FROM SCO WHERE id = $1 RETURNING *';
      const values = [id];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error('Error al eliminar el registro de SCO');
    }
  },

};