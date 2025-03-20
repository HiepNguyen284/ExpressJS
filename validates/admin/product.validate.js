module.exports.createProduct = async (req, res, next) => {
  if(!req.body.title) {
    req.flash('error', 'Vui lòng nhập tiêu đề cho sản phẩm');
    res.redirect('back');
    return ;
  }

  next() // Thực hiện đến các hàm tiếp theo trong Route createProduct
}

module.exports.editProduct = async (req, res, next) => {
  if(!req.body.title) {
    req.flash('error', 'Vui lòng nhập tiêu đề cho sản phẩm');
    res.redirect('back');
    return ;
  }

  next() // Thực hiện đến các hàm tiếp theo trong Route editProduct
}