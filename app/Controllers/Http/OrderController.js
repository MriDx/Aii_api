'use strict'

const { query } = require('../../Models/User')

//const OrderItem = require('../../Models/OrderItem')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const OrderItem = use('App/Models/OrderItem')
const Cart = use('App/Models/Cart')

/**
 * Resourceful controller for interacting with orders
 */
class OrderController {
  /**
   * Show a list of all orders.
   * GET orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, auth, response, view }) {
    try {
      const user = await auth.getUser()
      const data = await user.with('orders')
      return data
    } catch (error) {
      return response.status('404').json({
        status: 'failed',
        error
      })
    }
  }

  /**
   * Render a form to be used for creating a new order.
   * GET orders/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new order.
   * POST orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth, response }) {

    let {address_id, payment_mode, payment_status, items} = request.all()
    try {
      const user = await auth.getUser()

      //return user

      const order = await user.orders().create({
        'address_id': address_id,
        'payment_mode':payment_mode,
        'payment_status':payment_status,
        'status_id': 1
      })

      let orders = await order.orderitems().createMany(items)
      await Cart.query().where('user_id', user.id).delete()
      //return orders

      //let o = await OrtherItem.query().where('order_item', order.id).with('product').with('size').fetch()

      let d = {items: orders}

      return response.json({
        status: 'success',
        data: Object.assign(order, d)
      })
    } catch (error) {
      return response.status(403).json({status: 'failed', error})
    }

  }

  /**
   * Display a single order
   * GET orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing order.
   * GET orders/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update order details.
   * PUT or PATCH orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a order with id.
   * DELETE orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = OrderController
