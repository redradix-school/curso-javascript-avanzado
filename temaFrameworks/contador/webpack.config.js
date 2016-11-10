var path = require('path'),
    webpack = require('webpack');

var outPath = path.join(__dirname, 'dist');
var IS_DEV = (process.env.NODE_ENV === 'development');
console.log('Webpack config. Environment: ', (IS_DEV ? 'dev' : 'production'));

var devConfig = {
  entry: [
    './src/app.js'
  ],
  output: {
    path: outPath,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js*/,
        include: path.join(__dirname, 'src'),
        loaders: ['react-hot', 'babel']
      }
    ]
  },
  devServer: {
    contentBase: outPath
  }
};

var prodConfig = {
  entry: [
    './src/app.js'
  ],
  output: {
    path: outPath,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js*/,
        include: path.join(__dirname, 'src'),
        //REMOVE react-hot for production build
        loaders: ['babel']
      }
    ]
  }
}

module.exports = IS_DEV ? devConfig : prodConfig;