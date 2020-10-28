'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})


Route.post('size', 'SizeController.store')


//Products
Route.group(() => {

  Route.post('add/product', 'ProductController.store')

  Route.get('products', 'ProductController.index')

  //Route.get('product/:id', 'StockController.show')

  Route.get('product/:id', 'ProductController.show')

  Route.get('product/:product_id/:size_id', 'StockController.checkStock')

  Route.post('addStock', 'StockController.store')

  Route.post('product/addImage', 'ImageController.store')

}).prefix('api/v1/')


Route.post('updateStock/:product_id/:size_id', 'StockController.updateStock')

Route.post('upload', 'FileController.upload');

Route.post('uploadMultiple', 'FileController.uploadMultiple');

Route.get('download/:fileName', 'FileController.download');

Route.post('addImage', 'ImageController.store')

Route.group(() => {
  Route.get('content/:dir/:file', 'FileController.file')
})


Route.group(function(){
  Route.post('addToCart', 'CartController.add')
  Route.get('cartItems', 'CartController.cartItems')
  Route.get('cart/remove/:itemId', 'CartController.removeCart')
  Route.post('order', 'OrderController.store')
  //Route.get('orders', 'OrderController.index')
  Route.post('address', 'AddressController.store')
  Route.get('addresses', 'AddressController.index')
  Route.get('search/:query', 'ProductController.search')
  Route.get('orders', 'OrderController.orders')
  Route.get('order/:id', 'OrderController.orderData')
}).middleware('auth').prefix('api/v1/')

Route.post("register", "AuthController.register").prefix("/api/v1")
Route.post("login", "AuthController.login").prefix("/api/v1")
Route.group(() => {
  Route.get("me", "AuthController.me")
  Route.get('logout', 'AuthController.logout')
}).middleware('auth').prefix("/api/v1")



//Route.get('login/facebook', 'LoginController.redirect')
//Route.get('facebook/callback', 'LoginController.callback')


/* Route.post('address', 'AddressController.store').middleware('auth')

Route.post('addToCart', 'CartController.add').middleware('auth').prefix('api/v1')

Route.get('cartItems', 'CartController.cartItems')

Route.post('order', 'OrderController.store').middleware('auth')

Route.get('orders', 'OrderController.index').middleware('auth') */

Route.group(function() {
  Route.post('category/add', 'CategoryController.store').middleware('auth')
  Route.get('categories', 'CategoryController.index')
  Route.post('category/:id', 'CategoryController.update')
}).prefix('api/v1/')

Route.get('home', 'HomeController.index').middleware('auth').prefix('api/v1')


Route.get('featured', 'FeaturedController.index').middleware('auth').prefix('api/v1')
Route.post('featured/add', 'FeaturedController.store').middleware('auth').prefix('api/v1')

Route.get('category/products/:id', 'ProductController.bycategory').prefix('api/v1')

