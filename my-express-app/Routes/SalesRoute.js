const router = require('express').Router()
const ProductService = require('../Service/salesproduct');
const productService = new ProductService();
const ProductSale = require('../Service/sales');
const productSale = new ProductSale();
const CategoryService = require('../Service/category');
const categoryService = new CategoryService();

//usrls for geting and updating products
router.post('/', function (req, res, next) {
    productService.add(req.body)
      .then(() => res.status(200).json({
        success: true
      }))
      .catch((err) => next(err));
  });

  router.get('/', function (req, res, next) {
    const queryObj = {};
    productService.getAll(queryObj).subscribe(
        (users) => res.status(200).json(users),
        (err) => next(err),
        null
      );
    
    });
    router.get('/catagory/:type', function (req, res, next) {
        const queryObj = {"type":req.params.type};
        productService.getAll(queryObj).subscribe(
            (users) => res.status(200).json(users),
            (err) => next(err),
            null
          );
        
        });
        router.get('/name/:name', function (req, res, next) {
            const queryObj = {"name":req.params.name};
            productService.getAll(queryObj).subscribe(
                (users) => res.status(200).json(users),
                (err) => next(err),
                null
              );
            
            });


            //usrls for sale
            router.get('/sale', function (req, res, next) {
                const queryObj = {};
                productSale.getAll(queryObj).subscribe(
                (users) => res.status(200).json(users),
                (err) => next(err),
                null
                );
    
                });
                router.post('/sale', function (req, res, next) {
                    console.log("worrking");
                   //console.log(req.body)
                    let quantity=0;
                    
                    productService.getOne({"_id":req.body._id})
                    .subscribe((product)=>
                    {
                      quantity=product.quantity
                      console.log("worrking22222");
                      console.log(quantity);
                    },(err)=>console.log(err))
                   
                    
                    const updateObj = {"quantity":quantity-req.body.quantity};
                    const queryObj={"_id":req.body._id}
                    productService.update(queryObj,updateObj)
                    .subscribe(()=>console.log("succes"),()=>console.log("cant update"))
                    

                    productSale.add(req.body)
                      .then(() => res.status(200).json({
                        success: true
                      }))
                      .catch((err) => next(err));
                  });
//getting all categories
                  router.get('/category/category', (req, res, next) => {
                    const query ={};
                    categoryService.getAll(query).subscribe(
                        (data)=>res.status(200).json(data),
                        (err)=>next(err),null);
                                    
                });
module.exports = router