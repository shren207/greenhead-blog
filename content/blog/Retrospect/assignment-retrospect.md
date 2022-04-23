---
title: 'HTML5 <canvas> 요소로 공튀기기 구현'
date: 2022-04-23 00:04:80
category: retrospect
thumbnail: { thumbnailSrc }
draft: false
img: false
---

![Hnet-image](https://user-images.githubusercontent.com/85833148/164751471-7a53e003-2dc6-4c79-a1d2-a092709a9424.gif)

장장 일주일에 거친 **공튀기기** 구현이 드디어 끝이 났다. 이를 위해 배운 내용을 나열하면 아래와 같다.

```
- Setting up a development environment for TS with Webpack
  - Webpack
  - Babel
- HTMLCanvasElement
  - CanvasRenderingContext2D
  - requestAnimationFrame
- Elastic Collision
  - Delta Time
  - Two-dimensional collision with two moving objects
```

어느정도 알고 있는 TS 문법을 제외하고는 다소 생소한 개념이라서 관련 내용 이해한다고 고생이 많았다.
그만큼 배운 것도 정말 많았기 때문에 처음부터 끝까지 어떻게 진행했는지 과정을 적어보고자 한다.

## 순수 Typescript 개발환경 구성

React, Vue 등의 외부 라이브러리 사용없이 순수 Typescript로만 구현해야 했기에, 만들어둔 프로젝트 폴더에서 `npm init -y`입력 후 `tsc --init`으로
`package.json`과 `tsconfig.js`을 생성했다. 이후 코드 작성하면서 `import` 문을 사용해서 모듈화를 할 때, 아래와 같은 에러가 발생했다.

> "Uncaught ReferenceError: exports is not defined"

브라우저는 `es6` 버젼 이상의 문법으로 작성된 스크립트를 그대로 해석할 수 없으니, `tsconfig.js`의 `target` 속성을 `es5`로 바꿔주어서 컴파일시 es5 문법으로 작성되도록 설정해 주었음에도 계속 위의 에러를 마주했다.

그래서 에러 문구를 키워드로 관련 내용을 검색하니 [stackoverflow](https://stackoverflow.com/questions/43472778/typescript-exports-is-not-defined)에서 해결 방법을 찾을 수 있었다.

![stackoverflow](https://user-images.githubusercontent.com/85833148/164759381-bd6338a8-465b-4a4d-b2ac-d4260adafa82.png)

> **방법 1** : `Webpack`, `Parcel`, `browserify` 등의 번들러를 사용해라.  
> **방법 2** : es6 문법인 import, export를 사용하지 않고 <u>require만 사용</u>할 것이라면, `tsconfig.js`의 `compilerOptions.module` 속성을 `none`으로 설정하면 된다. 이 경우, import, export는 사용할 수 없음을 명심해라.

해당 답변 바로 아래 답변도 내게 도움이 많이 되었다.

![stackoverflow2](https://user-images.githubusercontent.com/85833148/164762297-ba224683-f05e-4822-94a8-4c9242a0d262.png)

결국 `import`, `export` 문법을 사용하기 위해서는 번들러를 사용해야 했고, 따라서 webpack, babel을 사용해서 최신 문법을 정상적으로 사용할 수 있었다.
공부하면서 배운 내용은 아래에 정리해 두었다.

- [Webpack 번들러 간단 정리](https://greenhead.netlify.app/development/webpack/)
- [Webpack + TS + Babel 세팅](https://greenhead.netlify.app/development/webpack-typescript-babel/)

## HTMLCanvasElement

![vampire_survivors_lede](https://user-images.githubusercontent.com/85833148/164764092-52d71789-e6de-4cc9-80c3-26ae187b9194.png)

> HTML의 `canvas` 엘리먼트와 `Javascript`를 이용해서 만든 한때 흥했던 인디 게임.

canvas에 대한 MDN의 설명은 다음과 같다.

> <**canvas**>는 HTML 요소 중 하나로서, 스크립트(보통은 자바스크립트)를 사용하여 <u>**그림**을 그리는 데에 사용</u>됩니다. 예를 들면, 그래프를 그리거나 사진을 합성하거나, 간단한(혹은 복잡할 수도 있는) <u>**애니메이션**을 만드는 데에 사용</u>될 수 있습니다.

한마디로 <u>(자바)스크립트를 사용해서 그림을 그릴 때 사용하는 HTML 요소</u>이다.

`canvas`에 대한 기초 지식을 공부하기 위해서 MDN의 [캔버스(Canvas) 사용법](https://developer.mozilla.org/ko/docs/Web/API/Canvas_API/Tutorial/Basic_usage)을 먼저 공부한 뒤, [순수한 자바스크립트를 이용한 2D 벽돌깨기 게임](https://developer.mozilla.org/ko/docs/games/tutorials/2d_breakout_game_pure_javascript)로 간단히 실습해 보았다. 해당 벽돌깨기 강의는 총 10 개의 강의가 있었는데, 그 중 처음 3개의 강의만이 내가 만드려는 공튀기기와 밀접한 연관이 있었으므로, 그 부분만 공부하였다.

<!-- canvas는 width: 300, height:150이 default 값
렌더링 과정에서 canvas가 왜곡될 수 있기 때문에 CSS가 아닌 canvas.width, canvas.height 과 같이 HTML 또는 JS에서 직접 속성으로 명시한다.
canvas는 자식 엘리먼트를 가지지 않지만, <**img** /> 엘리먼트와는 달리 <**canvas**></**canvas**> 와 같이 닫는 태그를 명시해야 한다. -->

## requestAnimationFrame

- [setInterval vs requestAnimationFrame](https://guiyomi.tistory.com/100)
- [setIntervsl과 RAF의 차이](https://velog.io/@younghwanjoe/requestAnimationFrame%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-%EC%83%81)
- [setInterval보다 requestAnimationFrame이 더 좋은 이유](https://simsimjae.tistory.com/402)
- [requestAnimationFrame 상세 설명](https://darrengwon.tistory.com/641)

## Elastic Collision

## Delta Time

## Two-dimensional collision with two moving objects
