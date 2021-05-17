'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EstablismentsSchema extends Schema {
  up () {
    this.create('establisments', (table) => {
      table.increments()
      table.string('name', 255).notNullable()
      table.string('uuid').unique()
      table.string('zipcode')
      table.string('address')
      table.string('number')      
      table.string('district')
      table.string('city')
      table.string('state')    
      table.string('opening_hours')
      table.boolean('has_accessibility')
      table.string('main_products')      
      table.integer('category_establisment_id').unsigned().references('id').inTable('category_establisments')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('establisments')
  }
}

module.exports = EstablismentsSchema
