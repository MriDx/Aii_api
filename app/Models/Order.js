'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {

	user() {
		return this.belongsTo('App/Models/User')
	}

	products() {
		return this.hasMany('App/Models/Product')
	}

	stocks() {
		return this.hasMany('App/Models/Stock')
	}

	address() {
		return this.hasOne('App/Models/Address')
	}

	status() {
		return this.hasOne('App/Models/OrderStatus')
	}

	orderitems() {
		return this.hasMany('App/Models/OrderItem')
	}

}

module.exports = Order
