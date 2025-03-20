const Product = require('../../models/product.model.js');

module.exports.index = async (req, res) => {
  // Lấy data products từ bên database
  const products = await Product.find({
    status: 'active', 
    deleted: false
  }).sort({position: 'desc'});
  products.forEach(product => {
    product.priceNew = (product.price - (product.price*product.discountPercentage)/100).toFixed(0);
  })

  res.render('client/pages/products/index.pug', {
    title: 'Trang sản phẩm',
    products: products
  })
}

module.exports.detail = async (req, res) => {
  const slug = req.params.slug;
  const product = await Product.findOne({slug: slug, deleted: false, status: 'active'});
  if(product) {
    res.render('client/pages/products/detail.pug', {
      title: product.title,
      product: product
    })
  }
  else {
    res.redirect('back');
  }
}