'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cart extends Model {

	user() {
		return this.belongsTo('App/Models/User')
	}

	product() {
		return this.belongsTo('App/Models/Product')
	}

	stock() {
		return this.belongsTo('App/Models/Stock')
	}

}

module.exports = Cart
