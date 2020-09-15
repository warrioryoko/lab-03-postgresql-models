const pool = require('../utils/pool');

class Superhero {
    id;
    hero_name;
    alter_ego;
    occupation;
    publisher;

    constructor(row) {
      this.id;
      this.hero_name;
      this.alter_ego;
      this.occupation;
      this.publisher;
    }

    static async insert(superhero) {
      const { rows } = await pool.query(
        'INSERT INTO superheroes (hero_name, alter_ego, occupation, publisher) VALUES ($1, $2, $3, $4) RETURNING *', [superhero.hero_name, superhero.alter_ego, superhero.occupation, superhero.publisher]
      );

      return new Superhero(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM superheroes WHERE id = $1', [id]
      );

      if(!rows[0]) return null;
      return new Superhero(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM superheroes'
      );

      return rows.map(row => new Superhero(row));
    }

    static async update(id, updatedSuperhero) {
      const { rows } = await pool.query(
        `UPDATE superheroes
        SET hero_name=$1,
            alter_ego=$2,
            occupation=$3,
            publisher=$4
        WHERE id = $5
        RETURNING *
        `,
        [updatedSuperhero.hero_name, updatedSuperhero.alter_ego, updatedSuperhero.occupation, updatedSuperhero.publisher, id]
      );

      return new Superhero(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM superheroes WHERE id = $1 RETURNING *',
        [id]
      );

      return new Superhero(rows[0]);
    }
}

module.exports = Superhero;
