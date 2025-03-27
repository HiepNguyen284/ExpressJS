const Role = require('../../models/role.model');
const Account = require('../../models/account.model');

const md5 = require('md5'); // Mã hóa mật khẩu

module.exports.index = async (req, res) => {
  const accounts = await Account.find({deleted: false}).select("-token -password");
  const roles = await Role.find({deleted: false});

  accounts.forEach(account => {
    roles.forEach(role => {
      if(account.role_id === role.id) {
        account.role_title = role.title
      }
    })
  })

  res.render('admin/pages/accounts/index.pug', {
    title: 'Danh sách tài khoản',
    records: accounts
  })
}

module.exports.create = async (req, res) => {
  const roles = await Role.find({deleted: false});

  res.render('admin/pages/accounts/create.pug', {
    title: 'Thêm mới tài khoản',
    roles: roles
  })
}

module.exports.createAccount = async (req, res) => {
  const emailExits = await Account.findOne({email: req.body.email, deleted: false});

  if(emailExits) {
    req.flash('error', 'Email đã tồn tại');
    res.redirect('back');
    return ;
  }

  if(req.file) {
    req.body.avatar = `/uploads/${req.file.filename}`;
  }
  req.body.password = md5(req.body.password); // Mã hóa mật khẩu

  const account = new Account(req.body);
  try {
    await account.save();
    req.flash('success', 'Thêm tài khoản thành công');
  } catch {
    req.flash('error', 'Thêm tài khoản thất bại');
  }

  res.redirect('/admin/accounts');
}

module.exports.edit = async(req, res) => {
  const id = req.params.id;

  const account = await Account.findOne({_id: id, deleted: false}).select("-token -password");

  const roles = await Role.find({deleted: false});

  res.render('admin/pages/accounts/edit.pug', {
    title: 'Chỉnh sửa tài khoản',
    account: account,
    roles: roles
  })
}

module.exports.editAccount = async(req, res) => {
  const id = req.params.id;

  const emailExits = await Account.findOne({_id: {$ne: id}, email: req.body.email, deleted: false});

  if(emailExits) {
    req.flash('error', 'Email đã tồn tại');
    res.redirect('back');
    return ;
  }

  if(req.file) {
    req.body.avatar = `/uploads/${req.file.filename}`;
  }

  if(req.body.password === '') {
    delete req.body.password
  } else {
    req.body.password = md5(req.body.password)
  }

  try {
    await Account.updateOne({_id: id}, req.body);
    req.flash('success', 'Cập nhật thành công');
  } catch {
    req.flash('erorr', 'Cập nhật thất bại');
  }

  res.redirect('back');
}