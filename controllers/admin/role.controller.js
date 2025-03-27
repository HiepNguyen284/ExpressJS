const Role = require('../../models/role.model');

module.exports.index = async (req, res) => {
  const query = {deleted: false};

  const records = await Role.find(query);

  res.render('admin/pages/roles/index.pug', {
    title: 'Trang nhóm quyền',
    records: records
  })
}

module.exports.create = async (req, res) => {
  res.render('admin/pages/roles/create.pug', {
    title: 'Thêm nhóm quyền'
  })
}

module.exports.createRole = async (req, res) => {
  // Thêm bản ghi vào database
  const record = new Role(req.body);
  await record.save();

  res.redirect('/admin/roles');
}

module.exports.edit = async (req, res) => {
  const id = req.params.id;

  const record = await Role.findOne({_id: id});

  res.render('admin/pages/roles/edit.pug', {
    title: 'Chỉnh sửa nhóm quyền',
    record: record
  })
}

module.exports.editRole = async (req, res) => {
  const id = req.params.id;
  // Update role
  await Role.updateOne({_id: id}, req.body);

  res.redirect('back');
}

module.exports.permissions = async (req, res) => {
  const records = await Role.find({deleted: false});

  res.render('admin/pages/roles/permissions', {
    title: 'Trang phân quyền',
    records: records
  });
}

module.exports.permissionsEdit = async (req, res) => {
  const permissions = JSON.parse(req.body.permissions);

  for(const item of permissions) {
    await Role.updateOne({_id: item.id}, {permissions: item.permissions});
  }

  req.flash('success', 'Cập nhật thành công');

  res.redirect('back');
}