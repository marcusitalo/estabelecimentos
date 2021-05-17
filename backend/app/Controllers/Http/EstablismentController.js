'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */

const Establisment = use('App/Models/Establisment')

class EstablismentController {
  async index () {
    const establisment = await Establisment.query().with('categoryEstablisment').with('user', (user) => { user.select(['id','username']) }).orderBy('name').fetch()
    return establisment
  }
  async store ({ request, auth }) {
    const data = request.only(['name','zipcode','address','number','district','city','state','opening_hours','has_accessibility','main_products','category_establisment_id'])
    const establisment = await Establisment.create({user_id:auth.user.id, uuid: (Math.random().toString(36).substring(2)),...data})
    return establisment  
  }
  async show ({ params }) {
    const establisment = await Establisment.findByOrFail('uuid',params.id);
    return establisment
  }
  async update ({ params, request }) {
    const establisment = await Establisment.findByOrFail('uuid',params.id);
    const data = request.only(['name','zipcode','address','number','district','city','state','opening_hours','has_accessibility','main_products','category_establisment_id'])
    
    establisment.merge({ ...data });
    await establisment.save();       

    return establisment
  }  
  async searchByAddress ({ request }) {
    if(request._qs.search != "")
      this.index()
    const establisment = await Establisment.query().where('address', 'LIKE', '%'+request._qs.search+'%').orderBy('name').fetch();
    return establisment
  }
  async destroy ({ params, auth, response }) {
    const establisment = await Establisment.findByOrFail('uuid',params.id);
    if(establisment.user_id !== auth.user.id)
      return response.status(401)
    return establisment.delete()
  }
}

module.exports = EstablismentController
