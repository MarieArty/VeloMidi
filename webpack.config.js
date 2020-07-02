module.exports = {
    entry: './js/velomidi.js',
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js']
    },
    output: {
      path: __dirname + '/dist',
      publicPath: '/dist',
      filename: 'velomidi.js'
    },
    devServer: {
      contentBase: './'
    }
};
