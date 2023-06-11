import { pool } from '../config/db.js'; // Importa el objeto pool desde db.js

export const Metadata = {

  // Obtener todos los registros
  async getAll() {
    try {
      const query = 'SELECT * FROM metadata';
      const result = await pool.query(query); // Utiliza db.pool.query en lugar de pool.query
      return result.rows;
    } catch (error) {
      throw new Error('Error al obtener los registros de Metadata');
    }
  },

  // Obtener datos por id
  async getById(id) {
    try {
      const query = 'SELECT * FROM metadata WHERE id = $1';
      const values = [id];
      const result = await pool.query(query, values); // Utiliza db.pool.query en lugar de pool.query
      return result.rows[0];
    } catch (error) {
      throw new Error('Error al obtener el registro de Metadata');
    }
  },

  // Agregar un nuevo registro
  async create(formatArch) {
    try {
      const query =
        'INSERT INTO metadata (formatarch) VALUES ($1) RETURNING *';
      const values = [formatArch];
      const result = await pool.query(query, values); // Utiliza db.pool.query en lugar de pool.query
      return result.rows[0];
    } catch (error) {
      throw new Error('Error al crear un registro de Metadata');
    }
  },

  //Eliminar un elemento por id
  async deleteById(id) {
    try {
      const query = 'DELETE FROM metadata WHERE id = $1 RETURNING *';
      const values = [id];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error('Error al eliminar el registro de Metadata');
    }
  },

};

