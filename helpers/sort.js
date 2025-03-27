module.exports = (req) => {
  const conditionSort = [
    {
      title: 'Vị trí giảm dần',
      value: 'position-desc',
      selected: true
    },
    {
      title: 'Vị trí tăng dần',
      value: 'position-asc',
      selected: false
    },
    {
      title: 'Giá giảm dần',
      value: 'price-desc',
      selected: false
    },
    {
      title: 'Giá tăng dần',
      value: 'price-asc',
      selected: false
    },
    {
      title: 'Tiêu đề A - Z',
      value: 'title-desc',
      selected: false
    },
    {
      title: 'Tiêu đề Z - A',
      value: 'title-asc',
      selected: false
    }
  ];
  const querySort = {};
  if(req.query.sortKey && req.query.sortValue) {
    querySort[req.query.sortKey] = req.query.sortValue;
    conditionSort.forEach(item => {
      if(item.value === `${req.query.sortKey}-${req.query.sortValue}`) {
        item.selected = true;
      } else {
        item.selected = false;
      }
    })
  } else {
    querySort.position = 'desc';
  }

  return {
    condition: conditionSort,
    query: querySort
  }
}