module.exports = (req) => {
  const objectResult = {}

  objectResult.titleProduct = req.query.title;


  // Xử lý tìm kiếm sản phẩm theo tên
  if(objectResult.titleProduct !== undefined && objectResult.titleProduct !== '') {
    const regex = new RegExp(objectResult.titleProduct, 'i');
    objectResult.querySearch = regex;
  }

  return objectResult;
}