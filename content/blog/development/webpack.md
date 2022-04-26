---
title: Webpack 번들러 간단 정리
date: 2022-04-19 16:04:27
category: development
thumbnail: { thumbnailSrc }
draft: true
img: false
---

`Typescript`에서 `Import`, `Export`를 사용하려니까 브라우저에서 정상적으로 동작하지 않았다.
이전에는 `CRA(create-react-app)`, `CNA(create-next-app)`등을 사용해서 번들러 설정 고민없이 브라우저에서 바로 사용할 수 있었는데, 이번 과제는 순수 Typescript를 통해서 구현해야 하기에 번들러에 대한 깊은 이해를 필요로 했다. 따라서 글을 적는다.

여기서는 많은 번들러 중 가장 많이 사용되는 `webpack`을 중점으로 정리해볼 것이다.

## 번들러란?

![bundler](https://user-images.githubusercontent.com/85833148/163962767-56c2f130-42dc-481b-a804-5945ef61d708.png)

웹에서는 기본적으로 `HTML`, `CSS`, `JS`가 동작을 한다. 근데 저렇게 VanilaJS만 사용하는 경우는 적다. (비효율적) 따라서 왼쪽에 보이는 다양한 기능들 (`React`, `Pug`, `Sass` 등)을 사용해서 코딩을 하게 되고,
이러한 기능들이 기본적으론 웹에서 직접적으로 동작하지 않기 때문에, 이것을 VanilaJS로 변환하는 과정이 필요하다.

이러한 것을 돕는 것이 **번들러**이다.
참고로 <u>번들러 자체가 이 모든것들을 바닐라JS로 바꿔주는 것은 아니다</u>.
위 사진처럼 Sass를 CSS로 변환할 때, 사진에 있는 것처럼 sass라는 외부 패키지를 설치해야 한다. 즉, <u>Sass 문법을 번들러 자체가 이해해서 CSS로 변환하는 것이 아닌, 각각 외부 패키지의 도움을 받아 변환</u>을 해 줄수 있다. 그렇기에 <u>실질적인 변환은 ‘sass’라는 외부 패키지가 하는 것</u>이다.

그래서 React, Vue, Sass 등을 변환하기 위해서는 각각에 대응되는 외부 패키지의 설치를 필요로 한다.

## webpack과 parcel

![parcel-webpack](https://user-images.githubusercontent.com/85833148/163963470-bee127fb-45ac-4c1e-ac0a-7ed6ff56183f.png)

- `parcel`
  - 특별하게 어떤 세팅값 필요 X (자동 번들링)
  - 세부적인 설정 불가
  - 소규모 프로젝트에 적합
- `webpack`
  - 복잡한 세팅을 요구함
  - 세부적인 설정 가능
  - 중, 대규모 프로젝트에 적합

## webpack으로 프로젝트 생성

### 필요한 패키지 다운

먼저 해당 프로젝트 폴더에서 필요한 패키지를 다운로드 받는다.

```bash
npm i -D webpack webpack-cli webpack-dev-server@next
```

`webpack-dev-server`는 `webpack-cli`와 메이저 버젼을 일치시켜야 하기 때문에, 뒤에 `@next`를 붙여서 최신버전으로 설치한다.
이후 `package.json`으로 이동한다.

### package.json 설정

```json
// package.json
"scripts: {
  "dev": "webpack-dev-server --mode development",
  "build": "webpack --mode production"
}
```

개발 서버를 오픈할 때는 `webpack-dev-server`라는 명령어를 사용해야 하며 뒤에 `--mode`를 붙히고 옵션값으로 `development`를 줘서 현재 **개발 모드**임을 명시해 주어야 한다.

제품 환경에서는 단순히 `webpack`이라는 명령어를 통해서 동작시킬 수 있고, 개발 모드일 때와 비슷하게 뒤에 `--mode production`를 붙여서 **제품 환경**임을 명시해주면 된다.

여기 명시된 `webpack-dev-server`, `webpack` 명령어는 전부 `webpack-cli` 패키지가 설치되어야만 동작한다.

```json
  "devDependencies": {
    "webpack": "^5.72.0",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^4.0.0-rc.1"
  }
```

- `webpack` : 번들러가 동작하기 위해 필요한 핵심 패키지
- `webpack-cli` : 터미널에서 webpack 관련 명령어를 사용할 수 있게 해주는 패키지
- `webpack-dev-server` : `webpack` 자체만으로 개발서버는 오픈가능하지만, 이 경우 `nodemon`과 같은 <u>자동 새로고침은 안 되기 때문</u>에, 이를 극복하게 해주는 패키지

## webpack.config.js

루트 디렉토리에 `index.html`, `js/main.js`를 만든다.

`webpack-dev-server`를 통해서 개발 서버를 오픈하려면 루트 디렉토리에 `webpack.config.js`라는 파일을 만들어야 한다. 이 파일에서 webpack의 기본적인 구성요소를 설정한다. 이렇게 구성요소를 세세히 명시해줘야 한다는 점이 `parcel`과의 가장 큰 차이점이다.

<u>`webpack.config.js`는 브라우저에서 동작하는 것이 아닌, **node.js** 환경에서 동작</u>한다.
JS에서 어떠한 데이터를 밖으로 내보낼 때, `export`라는 키워드를 사용하지만, `node.js` 환경에서는 `module.exports`라는 키워드를 사용하기에, 여기서도 똑같이 작성한다.

```js
// webpack.config.js
module.exports = {}
```

### entry, output

`webpack-dev-server`에서 사용할 수 있는 옵션으로는 먼저 `entry`, `output`이 있다.

- `entry`
  - 파일을 읽어들이기 시작하는 진입점 파일 설정
  - 기본적으로 js 파일을 진입점으로 설정 (parcel은 html 파일)
- `output` :
  - 빌드된 파일을 어떻게 처리할 지 설정
  - 객체 형식으로 작성하여 내부에 `path`, `filename` 등의 옵션 작성.
  - `path` : 빌드된 파일을 저장할 경로 명시. **절대 경로**로 작성. default 값은 루트의 dist폴더
  - `filename` : 빌드된 파일의 이름, default 값은 entry에 명시된 파일명이다.
  - `clean` : 매 빌드시 기존에 빌드된 결과물은 제거

```js
// webpack.config.js
const path = require('path')
// output의 속성인 path는 node.js에서 요구하는 절대경로로 작성해야 함
// 따라서, 내장 모듈인 path를 require 키워드로 불러와야 함
// path.resolve(_, _)는 첫번째 인수와 두번째 인수의 경로를 합쳐주는 역할을 한다.

module.exports = {
  // 파일을 읽어들이기 시작하는 진입점 설정 (번들을 어디서부터 시작할 지)
  entry: './js/main.js',
  //
  output: {
    path: path.resolve(__dirname, 'dist'),
    // path = '/Users/kitty/Desktop/webpack/dist'
    filename: 'main.js',
  },
}
```

`entry`에서 명시된 파일을 진입점으로, 연결된 모든 파일을 번들로 만든 후 `path`에 명시된 경로에 `filename`에 명시된 파일명으로 저장된다.

따라서 터미널에 `npm run build`를 입력하면 위의 로직이 동작하며, `dist`라는 폴더 내에 `main.js`라는 파일이 저장된다.

<img width="211" alt="build" src="https://user-images.githubusercontent.com/85833148/163977782-95756ee7-7adb-4083-b91a-dfdc267d88e0.png">

이번에는 아래와 같이 <u>**같은 경로**에 **다른 이름**으로 빌드된 파일을 저장</u>해보자.

```js
path: path.resolve(__dirname, 'dist'),
filename: 'app.js',
```

그렇다면 기존의 `main.js`는 그대로인 채, 새롭게 `app.js`가 `dist` 폴더에 생성된다.

<img width="203" alt="build2" src="https://user-images.githubusercontent.com/85833148/163979111-bde22ac7-050e-43b3-8cb5-bbaf855cf3f1.png">

<u>매 빌드시 기존 파일은 지우고 새로 빌드된 파일만 남기고 싶다</u>면 `clean` 옵션을 `true`로 설정한다.

```js
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    clean: true
  }
```

위에도 설명했다시피 `path`, `filename`을 명시하지 않을 경우, 각각의 default값으로 설정된다.
아래의 경우 <u>루트 디렉토리의 dist라는 폴더에 `main.js`라는 이름으로 빌드된 파일을 저장</u>한다.

```js
entry: './js/main.js',
output: {
  // path: path.resolve(__dirname, 'dist'),
  // filename: 'main.js',
  clean: true
}
```

## plugins

이번에는 실제로 <u>index.html을 이용해서 개발서버를 오픈해서 **브라우저에서 내용을 확인**</u>할 수 있게 만들어보자. 현재 `dist`폴더에는 `main.js`밖에 없는데 여기에 `index.html`을 삽입해서 개발 서버를 오픈할 수 있다.

우선 터미널에서 개발의존성 모듈로 `html-webpack-plugin` 패키지를 다운한다.

```bash
npm i -D html-webpack-plugin
```

이후 `webpack.config.js`로 이동한다.

```js
// webpack.config.js
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
// 이렇게 가져온 plugin을 어디에서 실행할 것인지 plugins라는 옵션에서 명시해야 함
// output과 달리 []를 값으로 가지며, 내부에 new 키워드로 plugin을 명시한다.
// 생성자 함수는 객체 데이터로 된 option을 인자로 넘길 수 있다.

module.exports = {
  entry: './js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html', // 상대 경로로 작성
    }),
  ],
}
```

webpack은 `entry`에 명시된 파일을 진입점으로 연결된 모든 파일을 번들링해서, `output`에 명시된 속성을 참고해서 빌드파일을 만들어내게 되는데, 빌드하는 과정 속에서 `plugins`에 명시된 여러가지 플러그인들을 활용하게 된다.

여기서는 `HtmlPlugin`을 통해서 `template`으로 루트에 있는 `index.html`을 명시해서, 빌드된 결과물인 `main.js`와 index.html을 dist 폴더에 각각 만들어주게 된다.

이렇게 작성하고 터미널에 `npm run build`를 입력할 시 디렉토리 구성은 아래 사진과 같다.

<img width="202" alt="build3" src="https://user-images.githubusercontent.com/85833148/163989425-d94b76f7-e890-4eff-8a15-5340241f2e81.png">

이제 개발 서버를 열기 위해 터미널에 `npm run dev`를 입력하면 아래 사진처럼 터미널에 출력된다.  
그런데 이렇게 서버를 열면 `localhost`로 여는 것이 아닌 실제 나의 ip 주소로 서버를 열게 된다.

<img width="971" alt="dev" src="https://user-images.githubusercontent.com/85833148/163989830-8f3b8a95-71c2-4ab7-8073-ba83b4cbc648.png">

임의의 host로 서버를 열려면 `devServer`라는 옵션에서 `host`를 명시해주어야 한다.

```js
module.exports = {
  entry: './js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html', // 상대 경로로 작성
    }),
  ],
  devServer: {
    host: 'localhost',
  },
}
```

이렇게 작성하고 다시 터미널에 `npm run dev`를 입력해서 개발 서버를 열면 다음처럼 출력된다.

<img width="974" alt="dev2" src="https://user-images.githubusercontent.com/85833148/163994083-ff088b95-18d3-4b49-8d86-019e554e2bff.png">

이후 터미널에 명시된 주소인 `http://localhost:8080/`또는 `http://127.0.0.1:8080/` 들어가면 다음처럼 나오게 된다.

![result](https://user-images.githubusercontent.com/85833148/163994402-5e73075b-c568-44ce-9f5f-6008ed57dab9.png)

참고로 `http://127.0.0.1:8080/`로 접속하면 다음과 같은 에러메세지가 나온다.  
이는 루트 디렉토리에 `favicon.ico`가 없어서 발생하는 지극히 당연한 에러이다.

![error](https://user-images.githubusercontent.com/85833148/163998856-6d76982a-a255-46de-b2ce-ed70da00216e.png)

## 정적 파일 연결

우선 `logo.png`와 `favicon.ico`를 준비한다. 이후 루트 디렉토리에 `static`이라는 폴더를 만들어서 `favicon.ico`를 넣고, `static` 폴더 내에 `images`라는 폴더를 만들어서 `logo.png` 파일을 넣는다.

<img width="198" alt="static" src="https://user-images.githubusercontent.com/85833148/164001244-fd489241-f090-4d6d-b77e-c1eb6b4d4660.png">

이후 index.html로 가서 다음과 같이 작성한다.

```html
<body>
  <h1>Hello Webpack!</h1>
  <img src="./images/logo.png" alt="logo" />
</body>
```

그런데 루트에 있는 `index.html` 주변에는 `images` 폴더는 없다. `images` 폴더는 `static` 폴더 안에 있다.
왜 이렇게 작성하나면, `npm run build`를 하면 `index.html`은 최종 번들 결과로 `dist`라는 폴더에 저장되는데, 거기 있는 `index.html`의 주변에서는`images`라는 폴더를 찾을 수 있기 때문이다.

물론 그냥 되는 것은 아니고, `copy-webpack-plugin`이라는 플러그인을 설치해야 하면 이를 가능케 한다.
다음 명령어를 터미널에 입력해서 해당 패키지를 다운받도록 하자.

```bash
npm i -D copy-webpack-plugin
```

이후 다시 `webpack.config.js`로 가서 다음과 같이 작성한다.

```js
// webpack.config.js
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  plugins: [
    new HtmlPlugin({
      template: './index.html', // 상대 경로로 작성
    }),
    new CopyPlugin({
      patterns: [{ from: 'static' }],
    }),
  ],
}
```

`CopyPlugin`의 역할은 `from`에 명시된 `static` 폴더의 내용물을 `copy`해서 `dist` 폴더에 만드는 역할이다.

터미널에 `npm run dev`를 입력해서 개발 서버를 오픈하면 정상적으로 `logo.png`, `favicon` 이미지가 출력되는 것을 확인할 수 있다.

![favicon](https://user-images.githubusercontent.com/85833148/164007421-61817dd2-7594-4db5-af05-404ecb5fbbee.png)

> favicon이 보이지 않는 경우 Cmd + Shift + R 로 강력 새로고침을 해서 캐시를 비우면 정상 출력된다.

> index.html에서 favicon.ico가 명시되지 않은경우, 브라우저는 index.html 주변에서 favicon.ico를 자동으로 찾아서 icon으로 사용한다.

이번에는 터미널에 `npm run build`를 입력해서 빌드된 결과물이 어떻게 나오는 지 확인해보자.  
사진처럼 <u>**static 폴더 자체를 제외한 그 내용물**이 copy되서 dist 폴더에 생성</u>된 것을 알 수 있다. 여기서는 `index.html` 주변에 `images` 폴더가 있기 때문에 `<img src="./images/logo.png" alt="logo" />`로 작성한 것이다.

<img width="202" alt="result" src="https://user-images.githubusercontent.com/85833148/164008248-7e2ab759-a4f6-4003-9526-336e3c834144.png">

## module

이번에는 프로젝트에 style을 적용해보자.

<u>루트 디렉토리의 `index.html`에 직접 link 태그를 명시하는 방법</u>과, <u>`webpack.config.js`에서 `module` 속성을 명시해서 빌드 시 index.html에 style 태그를 자동으로 넣어주는 방법</u>이 있다.

### 직접 link 태그 명시

`static` 폴더 내부에 `css` 폴더를 만들고, 그 안에 `style.css` 파일을 만든다.

<img width="198" alt="link" src="https://user-images.githubusercontent.com/85833148/164049164-5df31614-f9ea-49c9-93d0-9d1ae66e801a.png">

이후 루트 디렉토리의 index.html을 다음과 같이 작성한다.

css파일 경로를 `./static/css/style.css`로 작성하지 않는 이유는, `plugin` 속성에 명시된 `new HtmlPlugin`의 `template` 속성에 명시된 `index.html` 파일 내에서 경로를 설정하는 경우는, `root`에 있는 `index.html`이 아닌, `output`속성의 `path`에 명시된 경로에 있는 `index.html`을 기준으로 상대 경로를 작성해야 하기 때문이다.

```html
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hello Webpack!</title>
  <link rel="stylesheet" href="./css/style.css" />
</head>
```

터미널에 `npm run dev` 입력 후 페이지를 확인하면 정상적으로 `css`가 적용된 것을 확인할 수 있다.

### module 속성을 사용해서 style 태그 적용

우선 `static` 폴더에 넣었던 `css` 폴더를 root로 이동시킨다.

<img width="198" alt="style" src="https://user-images.githubusercontent.com/85833148/164051168-890c57d9-f8e2-4aeb-98ea-493344441532.png">

그리고 entry 속성에 명시된 main.js은 다음과 같이 css 파일을 import 해준다.

```js
// main.js
import '../css/style.css'
// index.html과는 달리 dist의 main.js가 아닌, entry 속성의 경로를 기준으로 상대 경로를 작성

console.log('Webpack!')
```

webpack 자체로는 css 파일을 읽을 수 없다. 단지 그것을 합쳐서 dist 폴더로 보내는 역할만 수행한다.

그렇기에 css파일을 읽을 수 있는 외부 패키지, `css-loader`, `style-loader`를 설치해야 한다.

```bash
npm i -D css-loader style-loader
```

- `css-loader` : JS에서 css 파일을 해석하게 해주는 패키지
- `style-loader` : 해석된 css를 html 파일에 style 태그로 삽입해주는 패키지

이후 `webpack.config.js`로 가서 다음과 같이 작성한다.

```js
// webpack.config.js
// 생략
module: {
  rules: [
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'], // 순서 중요
    },
  ]
}
// 후략
```

- `module.rules.test` : loader를 적용시킬 파일들을 정규식으로 명시
- `module.rules.use` : 사용할 loader 명시, <u>**오른쪽에서 왼쪽** 순으로 실행</u>됨

터미널에 `npm run dev` 입력 후 페이지를 확인하면 정상적으로 `css`가 적용된 것을 확인할 수 있다.

## SCSS

이번엔 프로젝트에 `SCSS`를 적용해보자.

우선 root에 있는 `css` 폴더와 `style.css` 파일을 각각 `scss`, `style.scss`로 바꾸자.

<img width="199" alt="scss" src="https://user-images.githubusercontent.com/85833148/164056600-f7e6698a-c505-4e62-8324-6bcbde834bcc.png">

그리고 `/js/main.js`를 다음과 같이 수정한다.

```js
// main.js
import '../scss/style.scss'

console.log('Webpack!')
```

필요한 패키지인 `sass-loader`, `sass`를 터미널로 설치한다.

```bash
npm i -D sass-loader sass
```

- `sass-loader` : test에 명시된 scss 파일을 해석하게 해주는 패키지
- `sass` : scss 문법을 해석할 때 실제 사용하는 패키지

이후 `webpack.config.js`로 가서 `css` 파일뿐 아니라 `scss`도 `loader`가 적용되도록 해야 한다.

`sass-loader`, `css-loader`, `style-loader` 순으로 적용되야 한다.

```js
// webpack.config.js
// 생략
module: {
  rules: [
    {
      test: /\.s?css$/,
      use: ['style-loader', 'css-loader', 'sass-loader'], // 순서 중요
    },
  ]
}
// 후략
```

터미널에 `npm run dev` 입력 후 페이지를 확인하면 정상적으로 `scss`가 적용된 것을 확인할 수 있다.

## Babel

우선 `babel`을 동작하기 위해 필요한 `@babel/core`, `@babel/preset-env`, `@babel/plugin-transform-runtime`을 설치한다.

또한 babel을 webpack이 해석할 수 있게 해주는 `babel-loader`도 설치한다.

```bash
npm i -D @babel/core @babel/preset-env @babel/plugin-transform-runtime babel-loader
```

이후 root에 `.babelrc.js` 파일을 생성하여 다음과 같이 작성한다.

```js
module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [['@babel/plugin-transform-runtime']],
}
```

- `@babel/preset-env` : 따로따로 명시해야 하는 JS의 기능을 한꺼번에 지원하는 패키지
- `@babel/plugin-transform-runtime` : 비동기 처리를 위한 패키지

이후 `.babelrc.js`이 제대로 동작할 수 있도록 `webpack.config.js`에 명시해 주면 끝이다.

```js
// webpack.config.js
// 생략
 module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        use: ["babel-loader"]
      }
    ],
  },
// 후략
```
