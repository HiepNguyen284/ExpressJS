const Account = require('../../models/account.model');

const md5 = require('md5'); // Mã hóa mật khẩu

module.exports.login = async (req, res) => {
  res.render('admin/pages/auth/login.pug', {
    title: 'Đăng nhập'
  })
}

module.exports.loginAccount = async (req, res) => {
  const email = req.body.email;
  const password = md5(req.body.password);

  const user = await Account.findOne({email: email, deleted: false});

  if(user === null) {
    req.flash('error', 'Email không tồn tại');
    res.redirect('back');
    return ;
  }
  if(password !== user.password) {
    req.flash('error', 'Mật khẩu không chính xác');
    res.redirect('back');
    return ;
  } else if(user.status === 'inactive') {
    req.flash('error', 'Tài khoản đã bị khóa');
    res.redirect('back');
    return ;
  }

  res.cookie('token', user.token);

  res.redirect('/admin/dashboard');
}

module.exports.logout = async (req, res) => {
  res.clearCookie('token');

  res.redirect('/admin/auth/login');
}