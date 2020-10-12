'use strict'

const Category = use('App/Models/Category')

const Product = use('App/Models/Product')

class HomeController {

	async index({request, auth, response}) {
		try {
			const user = await auth.getUser()
			let category = await Category.query().withCount('products').fetch()
			const products = await Product.query()
				.where('stock', '1')
				.with('image', function(builder) {
					builder.select('images.id', 'images.product_id', 'images.url')
				})
				.with('stock', function(builder) {
					builder.with('size')
				})
				.with('category')
				.fetch();
			let data = {categories : category, products: products}
			return response.json({
				status: 'success',
				data : data
			})
		} catch (error) {
			return response.status(403).json({status: 'failed', error})
		}
	}

}

module.exports = HomeController
