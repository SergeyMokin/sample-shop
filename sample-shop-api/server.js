const PORT = process.env.PORT || 63027;
const app = require('./app');
const adminCreator = require('./helpers/admin-creator');

app.listen(PORT, adminCreator);