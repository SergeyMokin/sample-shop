const PORT = process.env.PORT || 3000;
const App = require('./app');

App.listen(PORT, function () {
  console.log('Express server listening on port ' + PORT);
});