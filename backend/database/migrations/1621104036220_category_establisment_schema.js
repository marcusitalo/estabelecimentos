'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoryEstablismentSchema extends Schema {
  up () {
    this.create('category_establisments', (table) => {
      table.increments()
      table.string('name', 255).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('category_establisments')
  }  
}

module.exports = CategoryEstablismentSchema
