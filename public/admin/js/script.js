// Lọc sản phẩm theo trạng thái
const filterProduct = document.querySelectorAll('.filter');
let url = new URL(window.location.href);
if (filterProduct) {
  filterProduct.forEach(item => {
    item.addEventListener('click', () => {
      if (item.value === 'all') {
        url.searchParams.delete('status');
      } else {
        url.searchParams.set('status', item.value);
      }
      url.searchParams.set('page', 1);
      window.location.href = url;
    });
  });
}

// Tìm kiếm sản phẩm theo tên
const searchProduct = document.querySelector('.search');
const nameProductSearch = document.querySelector('.name-product');
if (searchProduct && nameProductSearch) {
  searchProduct.addEventListener('submit', (e) => {
    e.preventDefault();
    if (nameProductSearch.value.trim() === '') {
      url.searchParams.delete('title');
    } else {
      url.searchParams.set('title', nameProductSearch.value);
    }
    url.searchParams.set('page', 1);
    window.location.href = url;
  });
}

// Xử lý phân trang
const paginationButton = document.querySelectorAll('[button-pagination]');
if (paginationButton) {
  paginationButton.forEach(button => {
    button.addEventListener("click", () => {
      const page = button.getAttribute('button-pagination');
      url.searchParams.set('page', page);
      window.location.href = url;
    });
  });
}

// Thay đổi trạng thái sản phẩm
const changeStatusProduct = document.querySelectorAll('.change-status');
const formChangeStatusProduct = document.querySelector('#form-change-status');
if (changeStatusProduct && formChangeStatusProduct) {
  changeStatusProduct.forEach(button => {
    button.addEventListener('click', () => {
      const productID = button.getAttribute('product-id');
      const productStatus = button.getAttribute('product-status');
      const changeStatus = productStatus === 'active' ? 'inactive' : 'active';
      const path = formChangeStatusProduct.getAttribute('data-path') + `/${changeStatus}/${productID}?_method=PATCH`;
      formChangeStatusProduct.setAttribute('action', path);
      formChangeStatusProduct.submit();
    });
  });
}

// Xử lý thay đổi trạng thái nhiều sản phẩm cùng lúc
const chooseAllProduct = document.querySelector('.choose-all-product');
const chooseOneProduct = document.querySelectorAll('.choose-one-product');
if (chooseAllProduct && chooseOneProduct) {
  chooseAllProduct.addEventListener('click', () => {
    chooseOneProduct.forEach(checkbox => {
      checkbox.checked = chooseAllProduct.checked;
    });
  });

  chooseOneProduct.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
      chooseAllProduct.checked = document.querySelectorAll('.choose-one-product:checked').length === chooseOneProduct.length;
    });
  });

  const formChangeMultiStatus = document.querySelector('#form-change-multi-status');
  const idProductsIsChoosed = document.querySelector('#id-products-isChoosed');
  if (formChangeMultiStatus && idProductsIsChoosed) {
    formChangeMultiStatus.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.querySelector("select[name='statusIsChoosed']").value;
      const listProductIsChoosed = document.querySelectorAll('.choose-one-product:checked');
      if (listProductIsChoosed.length === 0) {
        alert('Vui lòng chọn ít nhất 1 sản phẩm');
        return;
      }

      const listIdProductsIsChoosed = [];
      listProductIsChoosed.forEach(item => {
        if (status === 'change-position') {
          const position = document.querySelector(`.product-position-${item.value}`);
          if (position) {
            listIdProductsIsChoosed.push(`${item.value}-${position.value}`);
          }
        } else {
          listIdProductsIsChoosed.push(item.value);
        }
      });

      if (listIdProductsIsChoosed.length > 0) {
        idProductsIsChoosed.value = listIdProductsIsChoosed.join(', ');
        formChangeMultiStatus.submit();
      }
    });
  }
}

// Xóa sản phẩm
const buttonsDeleteProduct = document.querySelectorAll('[button-delete-product]');
const formDeleteProduct = document.querySelector('#form-delete-product');
if (buttonsDeleteProduct && formDeleteProduct) {
  buttonsDeleteProduct.forEach(button => {
    button.addEventListener('click', () => {
      if (confirm('Bạn có muốn xóa sản phẩm không?')) {
        const idProductDelete = button.getAttribute('product-id');
        const path = formDeleteProduct.getAttribute('data-path');
        formDeleteProduct.setAttribute('action', `${path}/${idProductDelete}?_method=DELETE`);
        formDeleteProduct.submit();
      }
    });
  });
}

// Xử lý thông báo (Hiện 5 giây)
const alertCustom = document.querySelector('.alert-custom');
if (alertCustom) {
  setTimeout(() => {
    alertCustom.style.display = 'none';
  }, 2000);
}

// Show ảnh khi thêm sản phẩm ra ngoài giao diện
const uploadImageInput = document.querySelector('#thumbnail');
if (uploadImageInput) {
  uploadImageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = document.getElementById('preview-thumbnail');
        if (img) {
          img.src = e.target.result;
          img.classList.remove('hidden');
          img.style.maxWidth = '200px'; // Điều chỉnh kích thước ảnh nếu cần
        }
      };
      reader.readAsDataURL(file);
    }
  });
}

// Edit product
const buttonEditProduct = document.querySelectorAll('[button-edit-product]');
if(buttonEditProduct) {
  buttonEditProduct.forEach(button => {
    button.addEventListener('click', (e) => {
      const idProduct = e.target.getAttribute('product-id');
      const formEditProduct = document.querySelector('#form-edit-product');
      if(formEditProduct) {
        const path = formEditProduct.getAttribute('data-path');
        const action = `${path}/${idProduct}`;
        formEditProduct.setAttribute('action', action);
        formEditProduct.submit();
      }
    });
  })
};

// Detail product
const buttonDetailProduct = document.querySelectorAll('[button-detail-product]')
if(buttonDetailProduct) {
  buttonDetailProduct.forEach(button => {
    button.addEventListener('click', (e) => {
      const idProduct = e.target.getAttribute('product-id');
      const formDetailProduct = document.querySelector('#form-detail-product');
      if(formDetailProduct) {
        const path = formDetailProduct.getAttribute('data-path');
        const action = `${path}/${idProduct}`;
        formDetailProduct.setAttribute('action', action);
        formDetailProduct.submit();
      }
    })
  })
}

// Sort product
const sortProduct = document.querySelector('[sort-product]');
if(sortProduct) {
  sortProduct.addEventListener('change', (e) => {
    if(e.target.value) {
      const [key, value] = e.target.value.split('-');
      url.searchParams.set('sortKey', key);
      url.searchParams.set('sortValue', value);
      window.location.href = url;
    }
  })
}
const clearSort = document.querySelector('[clear-sort]');
if(clearSort) {
  clearSort.addEventListener('click', (e) => {
    url.searchParams.delete('sortKey');
    url.searchParams.delete('sortValue');
    window.location.href = url;
  })
}

// Thay đổi trạng thái category
const buttonChange = document.querySelectorAll('.change-status-category');
if(buttonChange) {
  buttonChange.forEach(button => {
    button.addEventListener('click', (e) => {
      const status = e.target.getAttribute('record-status');
      const id = e.target.getAttribute('record-id');
      const formChangeStatus = document.querySelector('[form-change-status-category]');
      const path = formChangeStatus.getAttribute('data-path');
      const action = `${path}/${status}/${id}?_method=PATCH`;
      console.log(action);
      formChangeStatus.action = action;
      formChangeStatus.submit();
    });
  });
};

// Remove thumbnail
const buttonRemoveThumnail = document.querySelector('.remove-thumbnail');
if(buttonRemoveThumnail) {
  buttonRemoveThumnail.addEventListener('click', (e) => {
    const inputThumbnail = document.querySelector('#thumbnail');
    const imgThumbnail = document.querySelector('#preview-thumbnail');

    inputThumbnail.value = ''
    imgThumbnail.src = ''
    buttonRemoveThumnail.classList.add('hidden');
    imgThumbnail.classList.add('hidden');
  })
}

const inputThumbnail = document.querySelector('#thumbnail');
if(inputThumbnail) {
  inputThumbnail.addEventListener('change', (e) => {
    if(inputThumbnail.value !== '' && inputThumbnail.value) {
      buttonRemoveThumnail.classList.remove('hidden');
    }
  })
}

// Phân quyền
const tablePermissions = document.querySelector('[table-permissions]');
if(tablePermissions) {
  const buttonSubmit = document.querySelector('[button-submit]');
  buttonSubmit.addEventListener('click', (e) => {
    const permisstions = [];
    const rows = document.querySelectorAll('[data-name]');
    rows.forEach(row => {
      const data_name = row.getAttribute('data-name');
      const inputs = row.querySelectorAll('input');
      if(data_name === 'id') {
        inputs.forEach(input => {
          permisstions.push({id: input.value, permissions: []});
        })
      } else {
        inputs.forEach((input, index) => {
          if(input.checked) {
            permisstions[index].permissions.push(data_name);
          }
        })
      }
    })
    const formChangePermissions = document.querySelector('[form-change-permissions]');
    const inputForm = formChangePermissions.querySelector('input');
    inputForm.value = JSON.stringify(permisstions);
    formChangePermissions.submit();
  })
}

// Show ảnh khi thêm sản phẩm ra ngoài giao diện
const uploadAvatarInput = document.querySelector('#avatar');
if (uploadAvatarInput) {
  uploadAvatarInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = document.getElementById('preview-avatar');
        if (img) {
          img.src = e.target.result;
          img.classList.remove('hidden');
          img.style.maxWidth = '200px'; // Điều chỉnh kích thước ảnh nếu cần
        }
      };
      reader.readAsDataURL(file);
    }
  });
}
