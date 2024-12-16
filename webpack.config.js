const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  /* Режим: development или production*/
  mode: 'development',

  /* Точка входа */
  entry: path.resolve(__dirname, 'src', 'index.js'),

  /* Выходной файл */
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true, // Очищает папку dist перед сборкой
  },

  /* Настройки для dev-server */
  devServer: {
    port: 3000,
    open: true,
    hot: true,
  },

  /* Плагины webpack */
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'), // шаблон html
      filename: 'index.html', // Имя выходного файла html
      // minify: {
      //   collapseWhitespace: true, // Удаляет пробелы и пустые строки
      //   removeComments: true, // Удаляет комментарии
      // },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css', // Имя выходного файла css
    }),
  ],

  /* Загрузчики (loaders) */
  module: {
    rules: [
      {
        test: /\.html$/i, // Обработка HTML файлов
        loader: 'html-loader',
      },
      {
        /* Загрузка CSS, SCSS файлов */
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        /* Загрузка изображений */
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext]', // Путь для изображений
        },
      },
      {
        /* Загрузка шрифтов */
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]', // Путь для шрифтов
        },
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            targets: 'defaults',
            presets: [['@babel/preset-env']],
          },
        },
      },
    ],
  },
};
