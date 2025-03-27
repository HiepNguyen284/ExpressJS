const ProductCategory = require('../../models/product-category.model');
const paginationHelper = require('../../helpers/pagination');
const filterStatusHelper = require('../../helpers/filterStatus');
const searchHelper = require('../../helpers/search');
const findChilrenHelper = require('../../helpers/findChildren');

module.exports.index = async (req, res) => {
  // Điều kiện lọc bản ghi
  const query = {deleted: false};

  // Phân trang bản ghi
  const count = await ProductCategory.countDocuments(query);
  const objectPagination = paginationHelper(
    {
    limit: 100,
    currentPage: 1,
    total: count,
    totalPage: Math.ceil(count / 100)
    },
    req
  );

  // Lọc trạng thái bản ghi
  const filterRecord = filterStatusHelper(req);
  if(req.query.status !== undefined) {
    query.status = req.query.status;
  }

  // Tìm kiếm bản ghi theo tên
  const objectResult = searchHelper(req);
    if(req.query.title !== undefined) {
      query.title = objectResult.querySearch;
    }

  const records = await ProductCategory.find(query).limit(objectPagination.limit).skip((objectPagination.currentPage - 1)*objectPagination.limit);

  const newRecords = findChilrenHelper(records, '');

  res.render('admin/pages/products-category/index.pug', {
    title: 'Danh mục sản phẩm',
    records: newRecords,
    pagination: objectPagination,
    filterRecord: filterRecord,
    nameRecordSearch: objectResult.titleSearch,
    index: 1
  })
}

module.exports.create = async (req, res) => {
  const records = await ProductCategory.find({deleted: false, status: 'active'});

  const newRecords = findChilrenHelper(records, '');

  res.render('admin/pages/products-category/create.pug', {
    title: 'Thêm danh mục sản phẩm',
    records: newRecords
  })
}

module.exports.createCategory = async (req, res) => {
  if(req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }
  if(req.body.position === '') {
    const countProductCategory = await ProductCategory.countDocuments({});
    req.body.position = countProductCategory + 1;
  }

  const productCategory = new ProductCategory(req.body);
  await productCategory.save();

  res.redirect('/admin/products-category');
}

module.exports.changeStatus = async (req, res) => {
  const id = req.params.id;
  const status = req.params.status === 'active' ? 'inactive' : 'active';

  await ProductCategory.updateOne({_id: id}, {status: status});

  req.flash('success', 'Thay đổi trạng thái thành công');

  res.redirect('back');
}

module.exports.edit = async (req, res) => {
  const id = req.params.id;

  const record = await ProductCategory.findOne({_id: id});

  const records = await ProductCategory.find({deleted: false, status: 'active'})
  const newRecords = findChilrenHelper(records, '');

  res.render('admin/pages/products-category/edit.pug', {
    title: 'Chỉnh sửa danh mục',
    record: record,
    records: newRecords
  })
}

module.exports.editProductCategory = async (req, res) => {
  const id = req.params.id;
  if(req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  await ProductCategory.updateOne({_id: id}, req.body);
  req.flash('success', 'Cập nhật thành công');

  res.redirect('back');
}