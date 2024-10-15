const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    // Ponto de entrada da aplicação
    entry: './src/index.tsx',

    // Configurações de saída
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      publicPath: '/',
    },

    // Resolução de módulos
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      fallback: {
        process: require.resolve('process/browser'),
        // Se necessário, adicione outros polyfills aqui
      },
    },

    // Regras para processamento de diferentes tipos de arquivos
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.m?js$/,
          resolve: {
            fullySpecified: false, // Permite importar sem especificar a extensão
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|ico)$/i,
          type: 'asset/resource',
        },
      ],
    },

    // Plugins utilizados no processo de build
    plugins: [
      new CleanWebpackPlugin(), // Limpa a pasta dist antes de cada build
      new HtmlWebpackPlugin({
        template: './public/index.html', // Template HTML
      }),
      new webpack.ProvidePlugin({
        process: 'process/browser', // Polyfill para process
      }),
      new Dotenv(), // Carrega variáveis de ambiente do arquivo .env
      new ForkTsCheckerWebpackPlugin(), // Verificação de tipos TypeScript em paralelo
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'), // Define NODE_ENV
      }),
    ],

    // Configurações do servidor de desenvolvimento
    devServer: {
      static: [
        {
          directory: path.join(__dirname, 'dist'), // Diretório para conteúdo estático
        },
        {
          directory: path.join(__dirname, 'public'), // Outro diretório para conteúdo estático
          publicPath: '/',
          watch: true, // Observa mudanças nos arquivos
        },
      ],
      compress: true, // Habilita compressão gzip
      port: 9000, // Porta do servidor
      historyApiFallback: true, // Suporte a roteamento com history API
      hot: true, // Habilita Hot Module Replacement
      open: true, // Abre o navegador automaticamente
    },

    // Configurações de cache
    cache: {
      type: 'filesystem', // Utiliza cache no sistema de arquivos
      buildDependencies: {
        config: [__filename], // Adiciona o próprio arquivo de configuração como dependência
      },
    },

    // Otimização de bundles
    optimization: {
      splitChunks: {
        chunks: 'all', // Divide chunks para otimização
      },
      runtimeChunk: 'single', // Cria um runtime separado
    },

    // Configurações de performance
    performance: {
      hints: isProduction ? 'warning' : false, // Habilita avisos de performance em produção
    },

    // Modo de desenvolvimento ou produção
    mode: isProduction ? 'production' : 'development',

    // Geração de source maps
    devtool: isProduction ? 'source-map' : 'inline-source-map',
  };
};
