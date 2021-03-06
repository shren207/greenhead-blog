---
title: '[JS] 조건문'
date: 2021-07-21 23:14:12
category: til
thumbnail: { thumbnailSrc }
draft: false
img: false
---

# 조건문

- `if문` : 범용적으로 사용됨
- `삼항연산자` : 코드량이 적음, 변수에 바로 할당 가능, 추후 배울 React에 자주 사용

### if문

```js
let value = prompt('값을 입력해주세요.')

if (value > 0) {
  // 이 때, () 안에 들어가는 조건은 truthy, falsy로 판별한다.
  console.log('값이 0보다 큽니다!')
} else {
  console.log('값이 0보다 작거나 같습니다!')
}
```

```js
let age = prompt('나이를 입력해주세요.')
let message

if (age < 3) {
  message = '아가야 안녕?'
} else if (age < 18) {
  message = '안녕!'
} else if (age < 100) {
  message = '환영합니다!'
} else {
  ;('나이가 아주 많으시거나, 나이가 아닌 값을 입력 하셨군요!')
}

alert(message)
```

### 삼항 연산자 (조건부 연산자)

```js
let value = prompt('값을 입력해주세요.')

value > 0
  ? console.log('값이 0보다 큽니다!')
  : console.log('값이 0보다 작거나 같습니다!')
```

```js
let age = prompt('나이를 입력해주세요.')

let message =
  age < 3
    ? '아기야 안녕?'
    : age < 18
    ? '안녕!'
    : age < 100
    ? '환영합니다!'
    : '나이가 아주 많으시거나, 나이가 아닌 값을 입력 하셨군요!'

alert(message)
```

---

### 참고 링크

[모던 자바스크립트](https://ko.javascript.info/ifelse)
