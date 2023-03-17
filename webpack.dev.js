
module.exports = () => {
  return {
    mode: 'development',
    devtool: 'inline-source-map',
    target: 'web',
    devServer: {
      watchFiles: [
        './src/views/**'
      ]
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [[require('autoprefixer')]]
                }
              }
            },
            'sass-loader'
          ]
        }
      ]
    }
  }
}
