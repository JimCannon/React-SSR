const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
//do not include node to the server?
const webpackNodeExternals = require('webpack-node-externals');

const config = {
  //Inform webpack that w're builiding a bundle for nodeJS, rather than for the browser
  target: 'node',
  
  // Tell webpack the root file of our Server Application.
  entry: './src/index.js',

  // Tell Webpack where to put the output file that is generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  
  externals: [webpackNodeExternals()]
};

//Overwrite default config with this config server config
module.exports = merge(baseConfig, config);
