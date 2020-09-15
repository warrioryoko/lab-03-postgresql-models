const pool = require('../utils/pool');

class Pokemon {
    id;
    pokemon_name;
    pokemon_type;
    attack;
    defense;
    speed;

    constructor(row) {
      this.id;
      this.pokemon_name;
      this.pokemon_type;
      this.attack;
      this.defense;
      this.speed;
    }

    static async insert(pokemon) {
      const { rows } = await pool.query(
        'INSERT INTO pokemon (pokemon_name, pokemon_type, attack, defense, speed) VALUES ($1, $2, $3, $4, $5) RETURNING *', [pokemon.pokemon_name, pokemon.pokemon_type, pokemon.attack, pokemon.defense, pokemon.speed]
      );

      return new Pokemon(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM characters WHERE id = $1', [id]
      );

      if(!rows[0]) return null;
      return new Pokemon(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM pokemon'
      );

      return rows.map(row => new Pokemon(row));
    }

    static async update(id, updatedPokemon) {
      const { rows } = await pool.query(
        `UPDATE pokemon
        SET pokemon_name=$1,
            pokemon_type=$2,
            attack=$3,
            defense=$4,
            speed=$5
        WHERE id = $6
        RETURNING *
        `,
        [updatedPokemon.pokemon_name, updatedPokemon.pokemon_type, updatedPokemon.attack, updatedPokemon.defense, updatedPokemon.speed, id]
      );

      return new Pokemon(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM pokemon WHERE id = $1 RETURNING *',
        [id]
      );

      return new Pokemon(rows[0]);
    }
}

module.exports = Pokemon;
