'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CartSchema extends Schema {
  up () {
    this.table('carts', (table) => {
      // alter table
      table.integer('stock_id').unsigned()
      table.foreign('stock_id').references('stocks.id').onDelete('cascade')
    })
  }

  down () {
    this.table('carts', (table) => {
      // reverse alternations
    })
  }
}

module.exports = CartSchema
