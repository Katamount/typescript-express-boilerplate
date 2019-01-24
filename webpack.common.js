const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    // entry is where, say, your app starts - it can be called main.ts, index.ts, app.ts, whatever
    entry: {
        app: './src/server.ts',
    },
    // This forces webpack not to compile TypeScript for one time, but to stay running, watch for file changes in project directory and re-compile if needed
    target: 'node',
    // Prevents warnings from TypeScript compiler. Also prevents adding node modules to bundle?
   externals: [
      nodeExternals({
        whitelist: ['webpack/hot/poll?100'],
      }),
    ],
    module: {
      rules: [
        {
          test: /.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].bundle.js',
    },
  };