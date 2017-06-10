module.exports = {
  entry: './js/app.js',
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
          test:/\.js$/,
          loader: 'babel',
          exclude: '/node_modules/'
      }
    ]
  }
}
