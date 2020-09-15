const pool = require('../utils/pool');

class ReadingList {
    id;
    title;
    author;
    isbn;
    publish_date;

    constructor(row) {
      this.id;
      this.title;
      this.author;
      this.isbn;
      this.publish_date;
    }

    static async insert(readinglist) {
      const { rows } = await pool.query(
        'INSERT INTO reading_list (title, author, isbn, publish_date) VALUES ($1, $2, $3, $4) RETURNING *', [readinglist.title, readinglist.author, readinglist.isbn, readinglist.publish_date]
      );

      return new ReadingList(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM reading_list WHERE id = $1', [id]
      );

      if(!rows[0]) return null;
      return new ReadingList(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM reading_list'
      );

      return rows.map(row => new ReadingList(row));
    }

    static async update(id, updatedReadingList) {
      const { rows } = await pool.query(
        `UPDATE reading_list
        SET title=$1,
            author=$2,
            isbn=$3,
            publish_date=$4
        WHERE id = $5
        RETURNING *
        `,
        [updatedReadingList.title, updatedReadingList.author, updatedReadingList.isbn, updatedReadingList.publish_date, id]
      );

      return new ReadingList(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM reading_list WHERE id = $1 RETURNING *',
        [id]
      );

      return new ReadingList(rows[0]);
    }
}

module.exports = ReadingList;
