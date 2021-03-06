---
title: 4월 26일 면접 후기
date: 2022-04-27 20:04:82
category: retrospect
thumbnail: { thumbnailSrc }
draft: false
img: false
---

# 과제 피드백

- " `Vector Class` 구현 잘 하였으나 `dx`, `dy`를 굳이 `class`의 `property`로 정의할 필요는 없었다. OOP적으로 좋은 코드는 아니다. 참고로 관련 수식은 Vector에 넣는 경우가 convention이다."

```ts
export default class Vector {
  x: number
  y: number
  // dx, dy는 따로 그때그떄 벡터로 만들면 되기에 굳이 명시할 필요가 없다.
  dx: number
  dy: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y

    // 위와 같은 이유로 아래 코드도 제거해야 한다.
    this.dx = Math.cos(Math.PI * 2 * Math.random()) * 400
    this.dy = Math.sin(Math.PI * 2 * Math.random()) * 400
  }
}
```

- (당시 TS의 **어선셜 연산자(!)**의 뜻을 몰라 내가 주석처리하신 부분을 보시면서) "`canvas.getContext()`의 반환값은 `CanvasRenderingContext | null` 이다. 이경우 `!`를 쓰면 throw할 수 있다."

  - `tsconfig.json`의 속성인 `strictNullChecks`가 `true`이면 모든 타입에 자동으로 포함된 `null`과 `undefined`를 제거한다. 따라서 임의의 타입이 `null` 또는 `undefined`일 가능성이 있는 경우에는 에러를 내놓게 된다. 어선셜 연산자(!)는 피연산자가 `null`이 아니라고 컴파일러에게 전달하므로 해당 에러를 피할수 있게 되는 것이다.

```ts
this.ctx = this.canvas.getContext('2d')! // 어선셜 연산자
```

[[TypeScript]타입스크립트 느낌표(!) 사용](https://developer-talk.tistory.com/191)

- "공과 벽이 부딪히는 경우, 지금처럼 벽과 벽이 수직이 아니라 <u>**사선**</u>이라고 가정할 경우, 지금과 같은 코드로는 정상적으로 동작하지 않는다. <u>사선의 경우는 사선의 법선 벡터의 방향 등을 고려</u>할 필요가 있다"
  - 단순히 벡터값을 반전시키는 것은 정말 이 경우에서만 통하는 방식.

```ts
wallCollision = (ball: Ball) => {
  // update()가 호출되기 전에 실행되야 함
  // 1. 좌우 모서리에 부딪히는 경우
  if (
    ball.x - ball.radius + ball.dx < 0 ||
    ball.x + ball.radius + ball.dx > this.canvas.width
  ) {
    ball.dx *= -1
  }
  // 2. 위아래 모서리에 부딪히는 경우
  if (
    ball.y - ball.radius + ball.dy < 0 ||
    ball.y + ball.radius + ball.dy > this.canvas.height
  ) {
    ball.dy *= -1
  }
  // 3. 공이 캔버스 위로 튀어나온 경우
  if (ball.y + ball.radius > this.canvas.height) {
    ball.y = this.canvas.height - ball.radius
  }
  // 4. 공이 캔버스 밑으로 튀어나온 경우
  if (ball.y - ball.radius < 0) {
    ball.y = ball.radius
  }
  // 5. 공이 캔버스 오른쪽으로 튀어나온 경우
  if (ball.x + ball.radius > this.canvas.width) {
    ball.x = this.canvas.width - ball.radius
  }
  // 6. 공이 캔버스 왼쪽으로 튀어나온 경우
  if (ball.x - ball.radius < 0) {
    ball.x = ball.radius
  }
}
```

# 면접 때 배운 것들

## 쿠버네티스

`Node.js` 이런 환경에서 띄우려면 EC2 instance 이런 데서 띄워야 하는데, 특정 EC2 instance 띄워서 그 ip를 기억하고 접속하는 일은 항상 번거롭다.
만약 instance가 100개가 되면 그 ip를 다 기억할 수 있을까? 이러한 문제점들 때문에 쿠버네티스를 사용한다. 무언가를 배포하려면 어쨋든 serving을 해야 한다. 그냥 S3에 배포하려면 static 사이트 같은 경우는 간단하게 하는데, Next.js나 Nuxt.js같은 것들은 그렇지 않다. 이떄, 쿠버네티스로 처리해보자. 예를 들어서 같은 이미지를 10개를 띄우면, 이중의 한명이 하나로 `load balancer`로 랜덤으로 들어오게 되어 분산처리가 된다.

쿠버네티스는 처음에는 진짜 어렵다. 사용 요금도 비싸다. <u>근데 한번 배우고 나면 “왜 이제서야 배웠지?”라고 생각하게 될 정도로 좋다.</u>
쿠버네티스를 배우기 전에 EC2를 띄워 본 적이 있을 것이다. 그 instance의 IP를 기억하고 SSH로 접속해본 적도 있을 것이다.
만약 여기서 `docker`를 안 썼다면, 소스를 받고, 모듈 설치하고, 서버를 띄우는 등 이러한 과정을 거쳐야 하는데, 이러면서 `OOM(Out Of Memory)` 등의 유쾌하지 못한 경험도 있을 것이다. 이 모든 귀찮은 것들을 쿠버네티스가 전부 알아서 해준다.

- [Docker가 왜 좋은지 5분안에 설명해 줌](https://www.youtube.com/watch?v=chnCcGCTyBg)
- [쿠버네티스가 대세가 된 이유 3가지](https://www.youtube.com/watch?v=S3FVcdZcZnA&t=3s)
- [fastcampus 쿠버네티스 강의 (존나 비쌈)](https://fastcampus.co.kr/dev_online_kubemsa)

## Database

`Nest.js` + `typeORM`이 현재 가장 완벽한 프레임워크긴 하다. `auto migration` 기능도 있어서 괜찮은 것 같다.
But, 현재 db랑 비교해서 `auto migration`을 하니까 조심해야 하는게, 오타가 나거나, db필드가 삭제된다거나 하면 큰일난다. 그렇기에 디버깅할때, 배포하기 전에 유의해야 한다. 이러한 점들 때문에 실무에서는 마이그레이션을 수동으로 하시는 분들도 있다. db 필드는 데이터 로그가 많으면 날리는데 엄청 오래걸리므로, 그래서 db 필드를 체크만 하고 날리지는 않는다. 계속 db에 데이터 로그가 누적이 되는 것. 그러다가 한번씩 서버 내려서 그때 마이그레이션 하는 식이다. 아니면 로그가 아예 없을때는 이러지말고 그냥 날려도 된다.

근데, db를 안날리게 되면 더럽다. 그게 보기싫긴 한데, (앞서 얘기한 점때문에 어쩌다 한번 날려야 하는방법을 써야하는게) 어쩔 수 없다. 그리고 db 필드엔 default값을 줄 수 있는데(선택), 이를 명시하는 경우에는 정말 조심해야 한다. 데이터 log가 많을 때 default 값을 줘 버리면 모든 db필드에 default 값을 채워야 하기 때문에 엄청 오래 걸린다. 그래서 새로운 필드를 추가할 땐 전부 `NULLABLE`로 해주는게 좋다.

- [Why Nest.js](https://www.youtube.com/watch?v=SHfR1tLpe1o)

## redux + redux-saga

`saga` 특유의 **제네레이터 문법**이 있다. 이것이 매력적인 것이, 중간에 <u>hook을 넣어서 크롤링 하듯이</u> 할 수 있다. 예를 들어, 특정 매핑되어 있는 API 요청에서 에러가 발생한 경우, 에러를 알려주는 모달을 다 띄워줄 필요가 있다. 이때, 각각의 API 요청마다 일일이 에러처리를 하는 게 아닌, `*`를 사용해서 모든 `action`을 받아서 그 중 에러가 나는 `action`을 찾아 한번에 모달을 띄워주는 글로벌한 방식이 가능하다.

`redux` 미들웨어로도 할 수 있지만, `next()`로 넘기고 하는 (미들웨어) 방식은 좀 옛날 방식이다.

주의할 점은, <u>`redux`로 통해 모달을 만들려면 `queue`로 구현해야 한다.</u> 만약 `queue`로 구현하지 않는다면 에러가 2개 이상 발생하는 경우 모달이 사라지거나, 내용이 덮어씌워지는 경우가 생긴다.

- [redux-saga 사용하는 이유](https://kyounghwan01.github.io/blog/React/redux/redux-saga/#%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%84%82%E1%85%B3%E1%86%AB-%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%B2)

## C++

한번 배워볼 가치는 충분한 언어. 메모리를 스스로 관리해볼 수 있다. 하지만 어렵다. **스마트 포인터** 같은 개념이 어려워서 이후 비교적 최신 버젼부터는 `Rust`처럼 메모리 세이프티를 보장하는 작성법이 추가되긴 했는데 그것도 어렵다. <u>애초에 디버깅이 어렵다.</u> 예를 들어 <u>class를 만들어 콘솔에 class 인스턴스 찍으면 JS는 바로 나오는데 c++은 그렇지 않다.</u>

## 쉐이더

**쉐이더**는 몸으로 부딪히지 않는 이상 정말 배우기 힘들다. 왜냐면 디버깅이 안된다. 콘솔같은 걸로 찍어볼 수가 없으니까 (특정한 색깔로 찍어서 확인하는 건 있다). 에러는 나는데, <u>아예 실행이 안되던가, 되던가 2가지 경우만 있다.</u> 그렇기에 코드를 작성할 때 어떻게 작동을 할 건지 등의 컨텍스트를 정확하게 꿰고 있어야 한다.

쉐이더를 다룰 수 있으면 정말 엄청난 것을 만들 수 있다. 쉐이더만 잘하면, <u>내 웹사이트 훨씬 더 예쁘게 꾸며볼 수 있고</u>, <u>카메라 이펙트 효과같은 것들도 (노이즈같은거)</u> 가능한데 코드량만 보면 정말 얼마 안된다. 이런것들은 (전체 코드를) 통과해서 한번에 그려지는 거니까, **병렬적인 사고**를 해야 한다. 잘하려면 머리속에 상상력으로 행렬연산이나, 도형을 그려내야 한다. 이런 말이 있다. <u>“수학자가 되고 싶었는데 상상력이 부족해서 시인이 되었다”</u>.

- [WebGL 기초](https://webglfundamentals.org/webgl/lessons/ko/)
- [WebGL2 기초](https://webgl2fundamentals.org/webgl/lessons/ko/)
- [GLSL / Shader](https://www.opentutorials.org/module/3659)
- [The Book of Shaders](https://thebookofshaders.com/?lan=kr)
- [3D 게임을 움직이는 수학과 물리 (책)](https://book.naver.com/bookdb/book_detail.naver?bid=11792229)

# 느낌

실무에 종사하시는 분들은 정말 깊은 사고를 하신다는 것을 알게 되었다. 덕분에 짧은 시간에 엄청난 양의 지식을 얻을 수 있었고, 책 또한 추천받을 수 있었다.
