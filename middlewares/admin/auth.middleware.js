const Account = require('../../models/account.model');
const Role = require('../../models/role.model');

module.exports.requireAuth = async (req, res, next) => {
  const token = req.cookies.token
  console.log(token);
  if(!token) {
    res.redirect('/admin/auth/login');
  } else {
    const account = await Account.findOne({token: token, deleted: false, status: 'active'}).select("-password");
    const role = await Role.findOne({_id: account.role_id}).select("title permissions");
    if(account) {
      res.locals.user = account; // Khởi tạo biến user là biến toàn cục
      res.locals.role = role;
      next();
    } else {
      res.redirect('/admin/auth/login');
    }
  }
}