const dashboardRoutes = require('./dashboard.route.js');
const productRoutes = require('./product.route.js')

module.exports = (app) => {
  app.use('/admin/dashboard', dashboardRoutes)
  app.use('/admin/products', productRoutes);
}