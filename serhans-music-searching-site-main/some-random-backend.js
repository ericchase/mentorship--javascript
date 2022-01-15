allProducts = await allProducts;

const perPage = 8;
const page = req.params.page || 1;

products = await products
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec(function (err, products) {
        Product.count().exec(function (err, count) {
            if (err) return next(err);
            res.render('index', {
                products: products,
                current: page,
                perPage: perPage,
                pages: Math.ceil(count / perPage),
            });
        });
    });
