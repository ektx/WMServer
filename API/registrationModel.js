const mongoose = require('mongoose')
const Schema = mongoose.Schema;

module.exports = function (name, obj) {
    let db = {}

    if (mongoose.modelNames().includes(name)) {
        db = mongoose.models[name]
    } else {
        db = new Schema(obj, {collection: name, versionKey: false})
        db = mongoose.model(name, db)
    }

    return db
}