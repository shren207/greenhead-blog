---
title: CSS 전치리기(Preprocessor), Sass
date: 2021-12-09 19:12:67
category: development
thumbnail: 'sass'
draft: false
img: true
---

![Sass](./img/sass.png)

**Sass** 는 CSS가 동작하기 전에 사용되는 전처리기(Preprocessor)로, 셀렉터의 중첩(Nesting)이나 조건문, 반복문 등과 같은 프로그래밍 언어에서 다룰법한 기능을 가능케 한다.

참고로 `SCSS` 는 CSS 구문과 완전히 호환되도록 새로운 문법을 도입하였지만 그러면서도 기존 Sass의 모든 기능을 지원하는 CSS의 **Superset**이다.

대부분의 경우 `Sass` 를 쓴다는 건 그냥 `SCSS`를 쓴다는 뜻이며, 만약 서로를 명확히 구별하여 둘 중 하나를 써야 하는 상황이라면 문법적으로 보다 Vanilla CSS에 더 가까운 **SCSS**를 사용하는 게 좋다.

이번 글을 쓰는 이유는 공부하면서 _노마드코더_ 에서 간단하게 보고 넘어간 적도 있고, 무엇보다 현재 내 블로그 template인 `gatsby-starter-bee` 가 **Sass**를 사용하고 있기에 블로그를 예쁘게 꾸미려면 기본적인 이해는 필수라고 생각했기 때문이다.

따라서 Sass에 대한 아주 아주 기본적인 내용만 다뤘으며 추후 내용을 추가할 수도 있다.

## CRA에서 Sass 사용

Sass는 웹에서 직접 동작할 수 없기 때문에 전처리기로 작성 후 CSS로 컴파일해야 한다.

`CRA(create-react-app)` 을 이용하는 경우, 간단하게 Sass를 사용할 수 있다.

---

1️⃣ create-react-app이 설치된 프로젝트 폴더에서 sass를 설치한다.

```bash
npm i sass
```

2️⃣ 이후 각각의 js파일에 대응되는 scss파일을 import하면 끝이다.

```jsx
import `./src/style.scss`
```

## 중첩

Sass는 **중첩(Nesting)** 기능을 사용할 수 있는데, 이 덕분에 <u>상위 셀럭터의 반복을 피할 수 있기에</u> 더 깔끔하고 보기 좋은 스타일링을 가능케 한다.

참고로 Sass의 중첩 기능은 React 라이브러리인 `styled-component` 도 사용할 수 있다.

1️⃣ SCSS

```scss
.container {
  width: 100vw;
  ul {
    margin-left: 0px;
    li {
      color: tomato;
    }
  }
}
```

2️⃣ CSS

```css
.container {
  width: 100vw;
}
.container ul {
  margin-left: 0px;
}
.container ul li {
  color: tomato;
}
```

### & : 상위 셀렉터 참조(AND)

---

중첩 안에서의 `&` 키워드는 부모 셀렉터를 참조하게 해 준다.  
`hover` , `active` 와 같은 **state**를 나타낼 때는 `&:state` 와 같이 작성한다.

1️⃣ SCSS

```scss
.body {
  &.tail {
    color: red;
  }
}

.btn {
  background-color: black;
  &:hover {
    background-color: white;
  }
}
```

2️⃣ CSS

```css
.body.tail {
  color: red;
}

.btn {
  background-color: black;
}
.btn:hover {
  background-color: white;
}
```

## 변수

**프로그래밍 방법론**을 도입한 Sass는 반복되는 스타일을 **변수**로 지정해줄 수 있다.

변수 앞에 **항상** `$` 를 붙인다는 점에 주의하자.

```
$변수: 속성;
```

1️⃣ SCSS

```scss
$default-color: #cd679a;
$default-margin: 100px;

.box {
  color: $default-color;
  margin: $default-margin;
}
```

2️⃣ CSS

```css
.box {
  color: #cd679a;
  margin: 100px;
}
```

### 변수 유효범위

---

Sass의 변수는 블록 스코프(`{}`)의 영향을 받는다.  
`let` , `const` 와 같은 자바스크립트의 변수와 비슷하다.

변수 `$default-color` 는 `.container` 의 블록 안에서 설정되었기에 블록 밖의 `.container2` 는 사용할 수 없다.

```scss
.container1 {
  $default-color: #cd679a;
  background-color: $default-color;
}

.container2 {
  // 에러 발생
  background-color: $default-color;
}
```

## Mixins

`Mixins` 은 <u>JS에서 **클래스**를 정의하고 그 **인스턴스**를 만들어 내는 것</u>과 거의 비슷하다.

`@mixin` 로 **클래스**를 정의하고, `@include` 로 **인스턴스**를 만들면 된다.

```scss
@mixin default-border($width, $type, $color: black) {
  border: $width $type $color;
}

.container1 {
  @include default-border(2px, solid, black);
}
.container2 {
  @include default-border(1px, dotted, red);
}
```
