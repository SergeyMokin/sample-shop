const PORT = process.env.PORT || 3000;
const app = require('./app');
const adminCreator = require('./helpers/admin-creator');

app.listen(PORT, adminCreator);