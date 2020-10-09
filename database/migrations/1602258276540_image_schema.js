'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImageSchema extends Schema {
  up () {
    this.table('images', (table) => {
      // alter table
      table.integer('product_id').unsigned()
      table.foreign('product_id').references("products.id").onDelete('cascade');
      table.string('url').notNullable()
    })
  }

  down () {
    this.table('images', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ImageSchema
