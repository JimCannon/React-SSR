const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const config = {
  //Inform webpack that w're builiding a bundle for nodeJS, rather than for the browser  
  // Tell webpack the root file of our Server Application.
  entry: './src/client/client.js',

  // Tell Webpack where to put the output file that is generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  }
};

//Overwrite default config with this config client config
module.exports= merge(baseConfig, config);