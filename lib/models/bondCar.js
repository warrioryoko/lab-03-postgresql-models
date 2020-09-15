const pool = require('../utils/pool');

class BondCar {
    id;
    manufacturer;
    model;
    doors;
    class;
    engine;
    horsepower_max;

    constructor(row) {
      this.id;
      this.manufacturer;
      this.model;
      this.doors;
      this.class;
      this.engine;
      this.horsepower_max;
    }

    static async insert(bondcar) {
      const { rows } = await pool.query(
        'INSERT INTO bond_cars (manufacturer, model, doors, class, engine, horsepower_max) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [bondcar.manufacturer, bondcar.model, bondcar.doors, bondcar.class, bondcar.engine, bondcar.horsepower_max]
      );

      return new BondCar(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM bond_cars WHERE id = $1', [id]
      );

      if(!rows[0]) return null;
      return new BondCar(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM bond_cars'
      );

      return rows.map(row => new BondCar(row));
    }

    static async update(id, updatedBondCar) {
      const { rows } = await pool.query(
        `UPDATE bond_cars
        SET manufacturer=$1,
            model=$2,
            doors=$3,
            class=$4,
            engine=$5,
            horsepower_max=$6
        WHERE id = $7
        RETURNING *
        `,
        [updatedBondCar.manufacturer, updatedBondCar.model, updatedBondCar.doors, updatedBondCar.class, updatedBondCar.engine, updatedBondCar.horsepower_max, id]
      );

      return new BondCar(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM BondCar WHERE id = $1 RETURNING *',
        [id]
      );

      return new BondCar(rows[0]);
    }
}

module.exports = BondCar;
