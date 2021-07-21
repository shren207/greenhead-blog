---
title: '[JS] 함수'
date: 2021-07-21 23:48:02
category: til
thumbnail: { thumbnailSrc }
draft: false
img: false
---

# ▶️ 함수

### 함수의 특징

**함수의 선언, 호출**

```jsx
;[선언]
const getTriangleArea = (base, height) => (base * height) / 2
// base, height는 매개변수(parameter)

;[호출]
getTriangleArea(3, 4)
// 3, 4는 전달인자(argument)
```

**입력값과 출력값**

```jsx
const getTriangleArea = (base, height) => (base * height) / 2
console.log(getTriangleArea(2, 4)) // 4

// 함수 내부에서 리턴을 한 경우 => 출력값이 return문의 값

const getTriangleArea = (base, height) => {
  let triangleArea = (base * height) / 2
}
console.log(getTriangleArea(2, 4)) // **undefined**

// 함수 내부에서 리턴을 하지 않은 경우 => 출력값이 undefined
```

**함수의 return**

```jsx
let number = 3
const hello = () => {
  return 'this function is over' // 함수 종료 => 문자열 리턴
  number = 5 // 이 문장의 코드는 실행되지 않음
}

console.log(number) // 3

// return을 하면, 함수는 작동을 멈추고 결과 값을 return한다.
```

### 함수 선언식, 함수 표현식

```jsx
[함수 선언식] : 호이스팅 O
function getRectangleArea (width, height) {
  return width * height;
}

[함수 표현식] : 변수 선언 후 익명함수 할당, 호이스팅 **X**
let getRectangleArea = function (width, height) {
  return width * height;
}

[화살표 함수⭐️] : this를 쓰는 경우를 제외하고는 전부 화살표 함수를 쓰도록 하자
: 함수의 본문에 return문만 있는 경우 => return, 중괄호 {} 생략 가능
let getRectangleArea = (width, height) => width * height; // O
let getRectangleArea = (width, height) => (width * height); // O

let getRectangleArea = (width, height) => {width * height}; // X
let getRectangleArea = (width, height) => {return width * height}; // O

let getRectangleArea = (width, height) => {
  let rectangleArea =  width * height;
  **return** rectangleArea;
} // O
```

### 화살표 함수

대부분의 경우는 화살표 함수를 쓸 수 있으나 `this` 를 쓸 때는 사용할 수 없다.
화살표 함수의 `this`는 이벤트 객체가 아닌 `window` 객체를 가리키기 때문이다.

```jsx
const hira = {
  name: 'Hira',
  age: 24,
  addYear: () => {
    this.age++ // arrow function의 this는 window 객체를 가리킴
  },
}
console.log(hira.age) // 24
hira.addYear() // 작동 X
consolo.log(hira.age) // 24
```

여기서도 화살표 함수의 this는 객체 hira가 아닌, 객체 window를 가리키기 때문에 속성 age의 값이 변경되지 않는다. 이를 해결하기 위해서는 **함수 선언식**을 쓰면 된다.

```jsx
const hira = {
  name: 'Hira',
  age: 24,
  addYear() {
    this.age++ // 이 때의 this는 hira를 가리킨다.
  },
}
console.log(hira.age) // 24
hira.addYear() // age: 25 로 변경됨
consolo.log(hira.age) // 25
```

### Default Values (parameter, destructuring)

**함수** **파라미터**를 설정할 때 값을 전달받지 못했거나, undefined가 전달된 경우, Default value를 대신 사용 가능
Default value는 표현식, 변수, 객체형 등 무엇이든 다 올 수 있다.

```jsx
const Sayhi = (aName = 'Hira') => 'Hello ' + aName
let myName

console.log(Sayhi('Nokdoo')) // "Hello Nokdoo"
console.log(Sayhi()) // "Hello Hira" (값을 전달받지 못한 경우)
console.log(Sayhi(Myname)) // "Hello Hira" (undefined가 전달된 경우)
```

**구조분해할당**에서도 Default value를 지정해줄 수 있다.

```jsx
const days = ['mon', 'tue', 'wed']

const [Mon, Tue, Wed, Thu = 'thu'] = days

console.log(Mon) // mon
console.log(Tue) // tue
console.log(Wed) // wed
console.log(Thu) // thu
```

```jsx
const hira = {
  city: 'Nagoya',
  age: 24,
  gender: 'female',
}

const { city, age, gender = 'female' } = hira

console.log(city) // Nagoya
console.log(age) // 24
console.log(gender) // female
```
