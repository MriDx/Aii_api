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

Route.post('create', 'ProductController.store')

Route.post('size', 'SizeController.store')

Route.post('addStock', 'StockController.store')

Route.get('list', 'ProductController.index')

Route.get('products', 'ProductController.index').prefix('/api/v1')

Route.get('product/:id', 'StockController.show')

Route.get('product/:product_id/:size_id', 'StockController.checkStock')

Route.post('updateStock/:product_id/:size_id', 'StockController.updateStock')

Route.post('upload', 'FileController.upload');

Route.post('uploadMultiple', 'FileController.uploadMultiple');

Route.get('download/:fileName', 'FileController.download');

Route.post('addImage', 'ImageController.store')

Route.group(() => {
  Route.get('content/:dir/:file', 'FileController.file')
})


Route.post("register", "AuthController.register").prefix("/api/v1");
Route.post("login", "AuthController.login").prefix("/api/v1");
Route.get("me", "AuthController.me").prefix("/api/v1");

//Route.get('login/facebook', 'LoginController.redirect')
//Route.get('facebook/callback', 'LoginController.callback')


Route.post('address', 'AddressController.store').middleware('auth')

Route.post('addToCart', 'CartController.add')

Route.get('cartItems', 'CartController.cartItems')

Route.post('order', 'OrderController.store').middleware('auth')

Route.get('orders', 'OrderController.index').middleware('auth')

Route.group(function() {
  Route.post('category/add', 'CategoryController.store').middleware('auth')
  Route.get('categories', 'CategoryController.index')
  Route.post('category/:id', 'CategoryController.update')
}).prefix('api/v1/')

Route.get('home', 'HomeController.index').middleware('auth').prefix('api/v1')

