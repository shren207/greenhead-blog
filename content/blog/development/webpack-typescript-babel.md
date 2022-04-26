---
title: Webpack + TS + Babel 세팅
date: 2022-04-20 13:04:81
category: development
thumbnail: { thumbnailSrc }
draft: true
img: false
---

Webpack + Typescript + Babel 템플릿을 만들어 보면서 배운 구조를 기록하고자 한다.

따로 output 생성 없이 서버만 열 수 있도록 구현하였다.

## 파일 구조

`CSS`는 쓸 일이 없을 것 같아서 여기서는 제외했다.

<img width="192" alt="structure" src="https://user-images.githubusercontent.com/85833148/164161343-1251d0c6-5ddd-400f-bc53-c364f2dca1fd.png">

## 필요 패키지

아래 패키지들은 전부 **의존성 모듈**로 설치한다.

    `@babel/cli`
    `@babel/core`
    `@babel/plugin-proposal-class-properties`
    `@babel/plugin-proposal-decorators`
    `@babel/plugin-transform-runtime`
    `@babel/preset-env`
    `@babel/preset-typescript`
    `babel-loader`
    `style-loader`
    `css-loader`
    `html-webpack-plugin`
    `tsconfig-paths-webpack-plugin`
    `typescript`
    `webpack`
    `webpack-cli`
    `webpack-dev-server`

## package.json

`scripts` 부분만 수정한다.

```json
 "scripts": {
    "dev": "webpack-dev-server --mode development",
    // "start": "webpack --mode production"
  }
```

## tsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "target": "es5",
    "module": "commonjs",
    "lib": ["dom", "esnext"],
    "jsx": "react",
    "allowJs": true,
    "strict": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "resolveJsonModule": true
  },
  "exclude": ["node_modules"]
}
```

## .babelrc.js

`webpack.config.js`에서 직접 babel 설정을 명시할 수도 있지만, root에서 직접 `.babelrc.js`를 만들어서 설정을 다루도록 하겠다.

```js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          ie: '10',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-transform-runtime'],
  ],
}
```

## webpack.config.js

```js
const path = require('path')
const root = process.cwd()
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  entry: path.resolve(root, './src/index.ts'),
  // 딱히 build할 일은 없을 것 같아 아래는 주석 처리
  // output: {
  //   path: path.resolve(__dirname, 'dist'),
  //   filename: 'app.js',
  // },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ts$/,
        exclude: [/node_modules|bower_components/],
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(root, './index.html'),
    }),
  ],
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(root, './tsconfig.json'),
      }),
    ],
    extensions: ['.ts', '.js'],
  },
  devServer: {
    host: 'localhost',
  },
}
```
