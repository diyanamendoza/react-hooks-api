const pool = require('../utils/pool')

module.exports = class Hook {
  id
  title
  explanation
  source

  constructor(row) {
    this.id = row.id
    this.title = row.title
    this.explanation = row.explanation
    this.source = row.source
  }

  static async insert({ title, explanation, source }) {
    const { rows } = await pool.query(
      'INSERT INTO hooks(title, explanation, source) VALUES ($1, $2, $3) RETURNING *;',
      [title, explanation, source]
    )
    const hook = new Hook(rows[0])
    return hook
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM hooks;')
    const hooks = rows.map((row) => new Hook(row))

    return hooks
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM hooks WHERE id=$1;', [id])

    if (!rows[0]) return null
    const hook = new Hook(rows[0])

    return hook
  }

  static async updateById(id, { title, explanation, source }) {
    const { rows } = await pool.query(
      'UPDATE hooks SET title=$2, explanation=$3, source=$4 WHERE id=$1 RETURNING *;',
      [id, title, explanation, source]
    )
    const hook = new Hook(rows[0])

    return hook
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM hooks WHERE id=$1 RETURNING *;',
      [id]
    )

    if (!rows[0]) return null
    const hook = new Hook(rows[0])

    return hook
  }
}
