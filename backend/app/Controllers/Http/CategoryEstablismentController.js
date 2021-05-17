'use strict'

const CategoryEstablisment = use('App/Models/CategoryEstablisment')

class CategoryEstablismentController {
   async index () {
      const categories = await CategoryEstablisment.query().orderBy('name').fetch()
      return categories
  }
}

module.exports = CategoryEstablismentController
