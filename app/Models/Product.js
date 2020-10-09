'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {

	size() {
		return this.belongsToMany('App/Models/Size');
	}

	stock() {
		//return this.belongsToMany('App/Models/Stock');
		return this.hasMany('App/Models/Stock');
	}

	image() {
		return this.hasMany('App/Models/Image');
	}

}

module.exports = Product
