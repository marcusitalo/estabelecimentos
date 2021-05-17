'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Establisment extends Model {
    
    categoryEstablisment() {
        return this.belongsTo('App/Models/CategoryEstablisment');
    }
    user() {
        return this.belongsTo('App/Models/User');
    }
    static get hidden () {
        return ['created_at','updated_at']
    } 
}

module.exports = Establisment
