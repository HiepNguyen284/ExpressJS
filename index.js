require('dotenv').config() // Để sử dụng file .env

const express = require('express')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const flash = require('express-flash') // Hiển thị thông báo
const cookieParser = require('cookie-parser')
const session = require('express-session')
const app = express()
const port = process.env.PORT

const routeClient = require('./routes/client/index.route')
const routeAdmin = require('./routes/admin/index.route')

const database = require('./config/database') // Kết nối database
const { route } = require('./routes/admin/dashboard.route')
database.connect() // Gọi hàm để kết nối

app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')

app.use(express.static(`${__dirname}/public`)) // Định nghĩa thư mục chứa file tĩnh như CSS, Image, JS
app.use(methodOverride('_method')) // Cho phép ghi đè method bằng `_method`
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/uploads', express.static('uploads'));

app.use(cookieParser('ACBDE'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

routeClient(app)
routeAdmin(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})