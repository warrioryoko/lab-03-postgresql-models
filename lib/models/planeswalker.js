const pool = require('../utils/pool');

class Planeswalker {
    id;
    walker_name;
    birthplace;
    mana_color;
    lifespan;

    constructor(row) {
      this.id;
      this.walker_name;
      this.birthplace;
      this.mana_color;
      this.lifespan;
    }

    static async insert(planeswalker) {
      const { rows } = await pool.query(
        'INSERT INTO planeswalkers (walker_name, birthplace, mana_color, lifespan) VALUES ($1, $2, $3, $4) RETURNING *', [planeswalker.walker_name, planeswalker.birthplace, planeswalker.mana_color, planeswalker.lifespan]
      );

      return new Planeswalker(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM planeswalkers WHERE id = $1', [id]
      );

      if(!rows[0]) return null;
      return new Planeswalker(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM planeswalkers'
      );

      return rows.map(row => new Planeswalker(row));
    }

    static async update(id, updatedPlaneswalker) {
      const { rows } = await pool.query(
        `UPDATE planeswalkers
        SET walker_name=$1,
            birthplace=$2,
            mana_color=$3,
            lifespan=$4
        WHERE id = $5
        RETURNING *
        `,
        [updatedPlaneswalker.walker_name, updatedPlaneswalker.birthplace, updatedPlaneswalker.mana_color, updatedPlaneswalker.lifespan, id]
      );

      return new Planeswalker(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM planeswalkers WHERE id = $1 RETURNING *',
        [id]
      );

      return new Planeswalker(rows[0]);
    }
}

module.exports = Planeswalker;
