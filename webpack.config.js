const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: './src/index.tsx', // Ponto de entrada da aplicação
  output: {
    path: path.resolve(__dirname, 'dist'), // Diretório de saída para os bundles
    filename: '[name].bundle.js', // Nome dos arquivos de saída
    publicPath: '/', // Base para todos os assets
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'], // Extensões que o Webpack resolverá automaticamente
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Arquivos TypeScript e TSX
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Usando Babel para transpilar TypeScript
        },
      },
      {
        test: /\.css$/i, // Arquivos CSS
        use: ['style-loader', 'css-loader'], // Carregadores para gerenciar CSS
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/i, // Suporte para arquivos de imagem e ícones
        type: 'asset/resource', // Usando asset modules do Webpack 5 para arquivos estáticos
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // Limpa a pasta de saída antes de cada build
    new HtmlWebpackPlugin({
      template: './public/index.html', // Modelo de arquivo HTML, agora referenciado da pasta public
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser', // Injeta o objeto process no navegador
    }),
    new Dotenv(), // Carrega variáveis de ambiente
    new ForkTsCheckerWebpackPlugin(), // Verificação de tipos TypeScript em paralelo
    new webpack.DefinePlugin({
      'process.env.PUBLIC_URL': JSON.stringify('/'), // Define PUBLIC_URL como a raiz
    }),
  ],
  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'dist'), // Diretório para servir arquivos de build
      },
      {
        directory: path.join(__dirname, 'public'), // Diretório para servir arquivos estáticos da pasta public
        publicPath: '/', // Define o caminho para acessar arquivos da pasta public
        watch: true, // Habilita watch para mudanças na pasta public
      },
    ],
    compress: true, // Habilita a compressão para arquivos servidos
    port: 9000, // Porta do servidor de desenvolvimento
    historyApiFallback: true, // Suporte para SPA, redirecionando requisições para o index.html
  },
  cache: {
    type: 'filesystem', // Cache baseado em sistema de arquivos para acelerar builds subsequentes
  },
  optimization: {
    splitChunks: {
      chunks: 'all', // Divide os chunks para otimização de carregamento
    },
  },
};
  