import { pool } from '../config/db.js'; // Importa el objeto pool desde db.js

export const Card = {

  // Obtener todos los registros
  async getAll() { //pensar en quitar
    try {
      const query = 'SELECT * FROM card';
      const result = await pool.query(query); // Utiliza db.pool.query en lugar de pool.query
      return result.rows;
    } catch (error) {
      throw new Error('Error al obtener los registros de Metadata');
    }
  },

  // Obtener datos por id sco
  async getAllByIdSCO(idSCO) {
    try {
      const query = 'SELECT * FROM card WHERE sco_id = $1';
      const values = [idSCO];
      const result = await pool.query(query, values); // Utiliza db.pool.query en lugar de pool.query
      return result.rows;
    } catch (error) {
      throw new Error('Error al obtener los registros de card');
    }
  },

  // Obtener datos por id
  async getById(id) {
    try {
      const query = 'SELECT * FROM card WHERE id = $1';
      const values = [id];
      const result = await pool.query(query, values); // Utiliza db.pool.query en lugar de pool.query
      return result.rows[0];
    } catch (error) {
      throw new Error('Error al obtener el registro de card');
    }
  },

  // Agregar un nuevo registro
  async create(title, track, description, posOrden, metadata_id, sco_id, assets_id) {
    try {
      const query = 'INSERT INTO card (title, track, description, posOrden, metadata_id, sco_id, assets_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
      const values = [title, track, description, posOrden, metadata_id, sco_id, assets_id];

      const result = await pool.query(query, values); // Utiliza db.pool.query en lugar de pool.query
      return result.rows[0];
    } catch (error) {
      throw new Error('Error al crear un registro de la card');
    }
  },

  //Eliminar un elemento por id
  async deleteById(id) {
    try {
      const query = 'DELETE FROM card WHERE id = $1 RETURNING *';
      const values = [id];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw new Error('Error al eliminar el registro de card');
    }
  },

};