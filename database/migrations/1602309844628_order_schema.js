'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      //table.integer('product_id').unsigned()
      //table.integer('stock_id').unsigned()
      table.integer('address_id').unsigned()
      table.string('payment_mode').notNullable()
      table.string('payment_status').notNullable()
      table.integer('status_id').unsigned()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      //table.foreign('product_id').references('products.id').onDelete('cascade')
      //table.foreign('stock_id').references('stocks.id').onDelete('cascade')
      table.foreign('address_id').references('addresses.id').onDelete('cascade')
      table.foreign('status_id').references('order_statuses.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
