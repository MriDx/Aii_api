'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Product = use('App/Models/Product')
const Helpers = use('Helpers')
const Drive = use('Drive')

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response }) {
    try {
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
      return response.json({
        data: {
          products: products
        }
      });
    } catch (error) {
      return response.json({
        status: 'Failed',
        error
      })
    }

  }

  /**
   * Render a form to be used for creating a new product.
   * GET products/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      const product = await Product.create(request.all());
      return response.json({
        status: 'success',
        product
      })
    } catch (error) {
      return response.json({
        status: 'Failed',
        error
      })
    }

  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing product.
   * GET products/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }

  async bycategory ({ params: {id}, request, response}) {
    //return 'hello'
    try {
      //return "hello"
      //const user = await auth.getUser()
      let items = await Product.query().where('category_id', id)
      .where('stock', '1')
      .with('image', function(builder) {
        builder.select('images.id', 'images.product_id', 'images.url')
      })
      .with('stock', function(builder) {
        builder.with('size')
      })
      .fetch()
      return response.json({
        status: 'success',
        items: items
      })
    } catch (error) {
      return response.status(403).json({
        status: 'failed',
        error
      })
    }
  }

  async search({request, params: {query},auth, response}) {
    try {
      let products = await Product.query()
      .where('name', 'LIKE', '%'+query+'%')
      .where('stock', '1')
      .with('image', function(builder) {
        builder.select('images.id', 'images.product_id', 'images.url')
      })
      .with('stock', function(builder) {
        builder.with('size')
      })
      .with('category')
      .fetch()
      return products
    } catch (error) {

    }
  }

}

module.exports = ProductController
