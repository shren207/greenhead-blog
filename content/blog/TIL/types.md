---
title: '[JS] 자료형'
date: 2021-07-21 21:43:12
category: til
thumbnail: { thumbnailSrc }
draft: false
img: false
---

# ▶️ 타입

### 타입의 종류 8가지

- `**number**` – **정수(integer)**, **부동 소수점 숫자(float)** 등의 숫자 ⇒ 2(integer), 2.213(float)
- `**stirng**` – **빈 문자열**이나 **글자들로 이뤄진 문자열**. 단일 문자를 나타내는 별도의 자료형은 없다.
- `**boolean**` – **true**, **false**를 나타낼 때 사용.
- `**null**` – null 값만을 위한 독립 자료형. null은 **알 수 없는 값**을 나타낸다. (null은 절대 자연적으로 발생 **X**)
- `**undefined**` – undefined 값만을 위한 독립 자료형. undefined는 **할당되지 않은 값**을 나타낸다.
  변수가 메모리에 만들어 졌고, 컴퓨터가 이 변수에 대해서 인지하고 있지만, 값이 없는 경우
- `**object**` – 복잡한 데이터 구조를 표현할 때 사용. (**function**, **array**, **object**)
- `bigint` – 길이 제약 없이 정수를 나타낼 때 사용. (심화)
- `symbol` – 객체의 고유 식별자를 만들 때 사용. (심화)

### typeof 연산자

- `typeof x` 또는 `typeof(x)` 형태로 사용
- 피연산자의 자료형을 **문자열(string)** 형태로 반환
- **null**의 typeof 연산은 `"object"`인데, 이는 오류로, null은 객체가 아니라 **그 자체로 하나의 타입**이다.
- 피연산자가 **함수**면 `"function"`을 반환한다. (원래 함수는 객체에 속한다)

```jsx
console.log(typeof 'hira');  // string
consolt.log(typeof 123);     // number

console.log(typeof true);    // boolean
console.log(typeof 1 === 2); // boolean

const myName = null;
console.log(typeof myName);  // null

const myName;
console.log(typeof myName);  // undefined

const names = ['hira', 'nokdoo', 'jururu']
console.log(typeof names);   // object

const names = null;
console.log(typeof names);   // object

const nokdoo = {name: 'nodkoo', age: 23, gender: male}
console.log(typeof nokdoo);  // object

const hello = () => 'hello'
console.log(typeof hello);   // function
```
