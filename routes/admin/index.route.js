const dashboardRoutes = require('./dashboard.route.js');
const productRoutes = require('./product.route.js')
const productCategoryRoutes = require('./product-category.route.js');
const roleRoutes = require('./role.route.js');
const accountRoutes = require('./account.route.js');
const authRoutes = require('./auth.route.js');

const authMiddleware = require('../../middlewares/admin/auth.middleware.js');

module.exports = (app) => {
  app.use('/admin/dashboard', authMiddleware.requireAuth, dashboardRoutes)
  app.use('/admin/products', authMiddleware.requireAuth, productRoutes);
  app.use('/admin/products-category', authMiddleware.requireAuth, productCategoryRoutes);
  app.use('/admin/roles', authMiddleware.requireAuth, roleRoutes);
  app.use('/admin/accounts', authMiddleware.requireAuth, accountRoutes);
  app.use('/admin/auth', authRoutes);
}