const {from} = require('rxjs');
let Product = require('../models/product');
class ProductService {
    constructor() {

    }

    add(productObj) {        
        let newProduct = new Product(productObj);
        console.log(newProduct)
        return newProduct.save();

    }

    getOne(queryObj) {
        return from(Product.findOne(queryObj));
    }

    getAll(queryObj) {
        return from(Product.find(queryObj));
    }

    update(queryObj,updateObj) {
        return from(Product.updateOne(queryObj,updateObj));
    }   

    delete(queryObj) {
      return from(Product.findByIdAndDelete(queryObj))

    }
}

module.exports = ProductService;