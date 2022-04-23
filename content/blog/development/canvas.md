---
title: '<canvas> 개념 간단 정리'
date: 2022-04-16 21:04:83
category: development
thumbnail: { thumbnailSrc }
draft: false
img: false
---

![vampire_survivors_lede](https://user-images.githubusercontent.com/85833148/164764092-52d71789-e6de-4cc9-80c3-26ae187b9194.png)

> HTML의 `canvas` 엘리먼트와 `Javascript`를 이용해서 만든 한때 흥했던 인디 게임.

[Elastic Collision](https://en.wikipedia.org/wiki/Elastic_collision)을 적용한 공튀기기를 만들기 위해 HTML의 <**canvas**> 요소를 활용해야 했는데 이전에는 배운 적이 없던 것이었다. 공부하고자 관련 내용을 찾아보니, 몇달 전 게임 플랫폼 `Steam` 에서 대박이 난 1인 개발 인디게임 ["Vampire Survivors"](https://store.steampowered.com/app/1794680/Vampire_Survivors/)가 <**canvas**>를 사용해서 만든 게임이라는 사실을 알았다.

해당 게임의 총매출은 무려 **30억 원**에 달한다고 한다. 스팀 수수료나 세금 등을 제외하더라도 어마어마한 금액이다.. 이러한 자극적인 사실은 나로 하여금 `JS` 만 잘 다뤄도 부자가 될 수 있겠다는 상상<sup>망상</sup>에 빠져들게 했고, 덕분에 동기부여가 잘 되서 기본 개념만큼은 즐겁게 공부했던 것 같다 😄

기본개념에 대한 공부는 **MDN**에 작성된 다음 레퍼런스를 참고했다.

- [캔버스(Canvas) 기본 사용법](https://developer.mozilla.org/ko/docs/Web/API/Canvas_API/Tutorial/Basic_usage)
- [순수한 자바스크립트를 이용한 2D 벽돌깨기](https://developer.mozilla.org/ko/docs/games/tutorials/2d_breakout_game_pure_javascript)

## 캔버스 기본 개념

> <**canvas**>는 HTML 요소 중 하나로서, 스크립트(보통은 자바스크립트)를 사용하여 <u>**그림**을 그리는 데에 사용</u>됩니다. 예를 들면, 그래프를 그리거나 사진을 합성하거나, 간단한(혹은 복잡할 수도 있는) <u>**애니메이션**을 만드는 데에 사용</u>될 수 있습니다.

MDN에선 canvas를 위와 같이 설명하고 있다. 한마디로 <u>(자바)스크립트를 사용해서 그림을 그릴 때 사용하는 HTML 요소</u>이다. 긴말없이 빠르게 특징들을 훑어보자.

### Canvas 간단 특징

- property는 width, height 2가지만 존재. default 값은 width=300, height=150
  - CSS로 width, height을 조정하게 될 경우, 렌더링 왜곡 가능성 존재. HTML, JS로 조정할 것
- closing tag 필수

### 렌더링 컨텍스트

> <**canvas**> 엘리먼트는 고정 크기의 드로잉 영역을 생성하고 <u>하나 이상의 **렌더링 컨텍스(rendering contexts)**</u>를 노출하여, 출력할 컨텐츠를 생성하고 다루게 됩니다.

최초 빈 도화지 상태인 캔버스에서 무언가 작업을 하기 위해서는, 자바스크립트가 렌더링 컨텍스트에 접근하여 조작을 할 수 있게 해 주어야 한다.
이때 `getContext(contextType)` 메서드를 사용할 수 있다. 2D 그래픽을 구현할 것이기에 `'2d'`를 전달인자로 보낸다.

```js
const canvas = document.getElementById('canvas') // HTMLCanvasElement
const ctx = canvas.getContext('2d') // CanvasRenderingContext2D
```

이제 `ctx`는 렌더링 컨텍스트 `CanvasRenderingContext2D`의 그리기 메서드를 사용할 수 있다. 위의 2줄의 코드는 캔버스를 사용하려면 템플릿처럼 사용해야 할 것이다.

### 브라우저가 canvas 지원하는 지 확인하는 법

대부분의 브라우저는 canvas를 지원하지만, 지원하지 않는 일부 구식 브라우저의 경우, 아래와 같이 조건문으로 분기해주면 된다.

```js
const canvas = document.getElementById('canvas')
let ctx

if (canvas.getContext) {
  ctx = canvas.getContext('2d')
  // ctx에 렌더링 컨텍스트 할당 후 캔버스 작업을 위한 코드작성
} else {
  // 대체 컨텐츠를 위한 코드 작성
}
```

## canvas로 공튀기기 애니메이션 만들기

![bouncing ball](https://user-images.githubusercontent.com/85833148/164896669-91dd82f6-56b2-423a-b9ee-29375518693c.gif)

> 직접 구현해본 공튀기기 애니메이션

### 간단한 rendering context 메서드

캔버스에 단일 대상을 그리려 한다면, 그 내용은 `beginPath()`, `closePath()` 사이에 작성되어야 한다.

예제 코드처럼 **사각형 2개**와 **원 1개**를 canvas 위에 그려보았다. <u>총 3개의 요소가 canvas 위에 존재하므로 `beginPath()`와 `closePath()`는 각각 3회 호출</u>되어야 한다.

#### 1. 사각형(rect)

```js
ctx.beginPath() //
ctx.rect(20, 40, 50, 50)
// 직사각형(rectangle)을,
// 캔버스 좌측 모서리로부터 20px, 상단 모서리로부터 40px 떨어졌고,
// 너비 50px, 높이 50px의 형태로 그려라.
ctx.fillStyle = 'red'
// 색은 '빨간색'이다.
ctx.fill()
// fillStyle에서 정의한 색상을 칠해라.
ctx.closePath()
```

#### 2. 원(arc)

```js
ctx.beginPath()
ctx.arc(240, 160, 20, 0, Math.PI * 2, false)
// 호(arc)를,
// 중심이 캔버스 좌측 모서리로부터 240px, 상단 모서리로부터 160px 떨어졌고,
// 반지름은 20이며,
// 시작 각도는 0, 끝 각도는 PI^2(= 원)이며,
// 시계방향으로 그려라. (optional property)
ctx.fillStyle = 'green'
// 색은 '초록색'이다.
ctx.fill()
// fillStyle에서 정의한 색상을 칠해라.
ctx.closePath()
```

#### 3. 외곽선이 반투명한 사각형

```js
// 3. 반투명한 border를 가진 사각형 그리기
ctx.beginPath()
ctx.rect(160, 10, 100, 40)
ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)'
// 외곽선은 50%의 투명도를 가진다.
ctx.stroke()
// strokeStyle에서 정의한 색상을 칠해라.
ctx.closePath()
```

완성된 canvas는 다음 사진과 같다.

![rendering](https://user-images.githubusercontent.com/85833148/164904512-7efa5152-5e85-48fc-a2ff-7e33d79fcfb5.png)

### 공 움직이기

한번 그려진 공이 남아서 계속 움직이는 것이 아닌, <u>매 프레임마다 공을 그렸다가 지우는 것을 반복</u>하는 것이다. 매번 새롭게 그려질 때마다 공의 위치를 일정한 거리만큼 바꿔주면 자연스럽게 움직이는 것처럼 보이는 것이다. 이를 위해서 **드로잉(프레임) 루프(loop)**를 구현해야 햔다.

#### 1. 프레임 루프 정의

매번 공을 지우고 새로 그리기 위해서는, 계속 그러한 과정을 반복하게 해주는 함수가 필요하다. 이 경우 크게 `setInterval()`과 `requestAnimationFrame()`라는 타이머 함수를 사용할 수 있는데, 여러가지 이유료 `requestAnimationFrame()`이 권장되므로, MDN에선 `setInverval()`로 구현했음에도 나는 rFA로 구현해보았다.

#### 2. 공 움직이게 하기

`closePath()`가 호출되면 이후 `dx`, `dy`의 값을 변경한다.

#### 3. 다음 프레임 전에 캔버스 지우기

`draw()` 함수 최상단 혹은 최하단에 `clearRect(x1, y1, x2, y2)`를 호출한다. 해당 좌표로 구현되는 사각형 내에 존재하는 것들을 전부 지워준다.

#### 4. 충돌 감지

벽을 만날 때마다 `dx` 또는 `dy` 를 반전시킨다. 또한 공이 벽에 파고드는 현상을 반지름을 고려하지 않고 코드를 작성했기 때문으로, 이부분을 처리하는 코드 또한 처리해준다.
여기서의 충돌감지는 정말 간단하게 구현된 것이며, 원과 원의 충돌을 구현할 때는 저렇게 할 수 없다.

# 마치며

canvas의 기본개념을 직접 공튀기기를 만들면서 구현해보니까 이해도 쉽고 재미있었던 것 같다. 하지만 원과 직선의 충돌만 이렇게 간단하게 구현할 수 있고, 원과 원의 충돌은 훨씬 복잡한 개념을 사용한다. 이제부터가 시작이다.. 🥲
