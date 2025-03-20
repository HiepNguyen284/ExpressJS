const Product = require('../../models/product.model.js');

// Lọc sản phẩm
const filterStatusHelper = require('../../helpers/filterStatus.js');

// Tìm kiếm sản phẩm
const searchProductHelper = require('../../helpers/search.js');

// Phân trang sản phẩm
const paginationHelper = require('../../helpers/pagination.js');

module.exports.index = async (req, res) => {
  // Điều kiện để hiển thị sản phẩm
  const query = {deleted: false};

  // Xử lý lọc sản phẩm
  const filterStatusProduct = filterStatusHelper(req);
  if(req.query.status !== undefined) {
    query.status = req.query.status;
  }

  // Xử lý tìm kiếm sản phẩm
  const objectResult = searchProductHelper(req);
  if(req.query.title !== undefined) {
    query.title = objectResult.querySearch;
  }

  // Phân trang sản phẩm
  const conutProduct = await Product.countDocuments(query);
  const objectPagination = paginationHelper(
    {
    limitProduct: 5,
    currentPage: 1,
    totalProduct: conutProduct,
    totalPage: Math.ceil(conutProduct / 5)
    },
    req
  )

  // Lấy ra danh sách sản phẩm đã được lọc theo yêu cầu
  const products = await Product.find(query).limit(objectPagination.limitProduct).skip(objectPagination.limitProduct * (objectPagination.currentPage - 1)).sort({position: 'desc'});

  res.render('admin/pages/products/index.pug', {
    title: 'Products',
    products: products,
    filterProduct: filterStatusProduct,
    nameProductSearch: objectResult.titleProduct, // Truyền giá trị tìm kiếm vào view
    pagination: objectPagination
  })
};

module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({_id: id}, {status: status});
  req.flash('success', 'Thay đổi trạng thái thành công');
  res.redirect('back');
}

module.exports.changeMultiStatus = async (req, res) => {
  const statusIsChoosed = req.body.statusIsChoosed;
  const listIdIsChoosed = req.body.idIsChoosed.split(', ');

  switch (statusIsChoosed) {
    case 'active':
      await Product.updateMany({_id: {$in: listIdIsChoosed}}, {status: 'active'});
      req.flash('success', `Đã thay đổi trạng thái của ${listIdIsChoosed.length} sản phẩm`);
      break
    case 'inactive':
      await Product.updateMany({_id: {$in: listIdIsChoosed}}, {status: 'inactive'});
      req.flash('success', `Đã thay đổi trạng thái của ${listIdIsChoosed.length} sản phẩm`);
      break
    case 'delete-all':
      await Product.updateMany({_id: {$in: listIdIsChoosed}}, {
        deleted: true, deletedAt: new Date()
      });
      req.flash('success', `Đã xóa ${listIdIsChoosed.length} sản phẩm`);
      break
    case 'change-position':
      listIdIsChoosed.forEach(async (item)=> {
        const [id, position] = item.split('-');
        await Product.updateOne({_id: id}, {position: position})
      })
      req.flash('success', `Đã thay đổi vị trí của ${listIdIsChoosed.length} sản phẩm`);
      break
  }

  res.redirect('back');
}

module.exports.deleteProduct = async (req, res) => {
  const idProductDelete = req.params.id;
  
  // Xóa vĩnh viên sản phẩm (xóa trong database)
  // await Product.deleteOne({_id: idProductDelete})

  // Xóa tạm thời 1 sản phẩm (thay đổi trường deleted: true)
  await Product.updateOne({_id: idProductDelete}, {deleted: true, deletedAt: new Date()})
  req.flash('success', 'Đã xóa thành công');
  res.redirect('back');
}

module.exports.create = async (req, res) => {
  res.render('admin/pages/products/create.pug', {
    title: 'Thêm sản phẩm'
  });
}

module.exports.createProduct = async (req, res) => {
  if(req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }
  const newProduct = new Product(req.body);
  newProduct.save();
  res.redirect('/admin/products');
}

module.exports.edit = async (req, res) => {
  const idProduct = req.params.id;
  console.log(idProduct);

  const product = await Product.findOne({_id: idProduct, deleted: false});
  console.log(product);

  res.render('admin/pages/products/edit.pug', {
    title: 'Chỉnh sửa sản phẩm',
    product: product
  });
}

module.exports.editProduct = async (req, res) => {
  if(req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }
  const idProduct = req.params.id;

  await Product.updateOne({_id: idProduct}, req.body);
  req.flash('success', 'Đã cập nhật thành công');

  res.redirect('back');
}

module.exports.detail = async (req, res) => {
  const idProduct = req.params.id;
  const product = await Product.findOne({_id: idProduct, status: 'active', deleted: false});

  res.render('admin/pages/products/detail.pug', {
    title: product.title,
    product: product
  })
}