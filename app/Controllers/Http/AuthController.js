'use strict'

const User = use('App/Models/User')

class AuthController {

	async register({ request, auth, response }) {
		try {
		  const user = await User.create(request.all());
		  let token = await auth.generate(user);
		  Object.assign(user, token);
		  return response.json({
			status: "success",
			message: "user registered",
			user: user
		  });
		} catch (error) {
		  return response.status(401).json({
			status: "error",
			message: "failed to create account"
		  });
		}
	}

	async login({request, auth, response}) {
		let {email, password} = request.all()
		try {
			if (await auth.attempt(email, password)) {
				let user = await User.findBy("email", email);
        		let token = await auth.generate(user);
				return token
			}
		} catch (error) {
			return response.status(403).json({
				status: 'failed',
				error
			})
		}
	}

}

module.exports = AuthController
