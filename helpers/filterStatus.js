module.exports = (req) => {
  const filterStatusProduct = [
    {
      title: 'Tất cả',
      value: 'all',
      active: ''
    },
    {
      title: 'Hoạt động',
      value: 'active',
      active: ''
    },
    {
      title: 'Dừng hoạt động',
      value: 'inactive',
      active: ''
    }
  ];

  const statusProduct = req.query.status;

  // Xử lý lọc sản phẩm 
  if(statusProduct !== undefined) {
    filterStatusProduct.forEach(item => {
      if(item.value === statusProduct) {
        item.active = 'active';
      }
      else {
        item.active = '';
      }
    })
  }
  else {
    filterStatusProduct[0].active = 'active';
    filterStatusProduct[1].active = '';
    filterStatusProduct[2].active = '';
  }

  return filterStatusProduct;
}