/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js',
    clean: true,
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash',
    }),
    new HtmlWebpackPlugin({
      title: 'SoundComputer',
      filename: 'index.html',
      inject: 'body',
      template: './src/templates/index.ejs',
    }),
  ],
  devServer: {
    static: './public',
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        include: `${__dirname}/src`,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      // {
      //   test: /\.ejs$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: {
      //     loader: 'raw-loader',
      //   }
      // },
      // {
      //   test: /\.ejs$/,
      //   loader: 'ejs-loader',
      //   exclude: /(node_modules|bower_components)/,
      //   options: {
      //     variable: 'data',
      //     interpolate: '\\{\\{(.+?)\\}\\}',
      //     evaluate: '\\[\\[(.+?)\\]\\]'
      //   }
      // },
      {
        test: /\.ejs$/i,
        use: ['html-loader',
          {
            loader: 'template-ejs-loader',
            options: {
              data: {
                title: 'HULLO HULLO HULLO HULLO',
              },
            },
          },
        ],
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-inline-loader',
            // options: {
            //   limit: 10000,
            // },
          },
        ],
      },
      {
        test: /\.png$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
      fs: false,
    },
  },
  // optimization: {
  //   runtimeChunk: 'single'
  // }
  // node: {
  //   fs: 'empty' // avoids error messages
  // }
};
