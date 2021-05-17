'use strict'

/*
|--------------------------------------------------------------------------
| CategoryEstablismentSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const CategoryEstablisment = use('App/Models/CategoryEstablisment')

class CategoryEstablismentSeeder {
  async run () {
    await CategoryEstablisment.createMany([
       {"name" : "Mercantil"}, 
       {"name" : "Restaurante"}, 
       {"name" : "Padaria"},        
       {"name" : "Confeiteria"}, 
    ] )
  }
}

module.exports = CategoryEstablismentSeeder
