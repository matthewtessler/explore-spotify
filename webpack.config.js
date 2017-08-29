const path = require('path');

console.log(path.resolve(__dirname, "public", "js"));

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './public', './js')
  }
}
