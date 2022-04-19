---
title: '[React] Class Components'
date: 2022-04-19 13:04:41
category: development
thumbnail: { thumbnailSrc }
draft: false
img: false
---

`React Hooks`이 나온 이후로, 새롭게 React 프로젝트를 시작할 때 클래스 컴포넌트는 거의 사용되지 않지만, React의 `Component Life Cycle`을 이해하려면 클래스 컴포넌트를 어떻게 작성하고, 또 어떻게 동작하는지 파악하는게 가장 좋은 방법인 것 같아 간단히 공부하고 배운 내용을 정리해 보았다.

## 함수형 컴포넌트 vs 클래스형 컴포넌트

React Hooks 이전에는 State를 다루기 위해서 Class Component를 사용이 강제되었다.
Function Component는 Function이기 때문에 Return이 명시되며, JSX.Element를 리턴한다.

```jsx
function App {
  const [state, setState] = useState(0)
  const add = () => console.log("add");
  const minus = () => console.log("minus");
  return (
    <>
      <h1>The number is {state}</h1>
      <button onClick={add}>Add</button>
      <button onClick={minus}>Minus</button>
    </>
    )
}
```

Class Component는 Return이 없다. 왜냐하면 Function이 아니기 때문이다. Return 대신 Render 메서드를 가진다.
React는 자동적으로 모든 Class Component의 render 메서드를 실행한다.

```jsx
class App extends React.Component {
  state = { count: 0 }
  add = () => console.log('add')
  minus = () => console.log('minus')
  render() {
    return (
      <>
        <h1>The number is {this.count.state}</h1>
        <button onClick={this.add}>Add</button>
        <button onClick={this.minus}>Minus</button>
      </>
    )
  }
}
```

## 클래스형 컴포넌트에서 State 변경하기

```jsx
class App extends React.Component {
  state = { count: 0 }
  add = () => {
    this.state.count += 1
  }
  minus = () => {
    this.state.count -= 1
  }
  render() {
    return (
      <>
        <h1>The number is {this.state.count}</h1>
        <button onClick={this.add}>Add</button>
        <button onClick={this.minus}>Minus</button>
      </>
    )
  }
}
```

> "Do not mutate state directly. Use setState()."

위 코드처럼 state를 직접 변경하려고 하면 안 된다. 왜냐하면 이 경우 React는 render 메서드를 호출하지 않기 때문이다.

그렇다면, 매번 state가 변경될 때마다 React가 render 메서드를 호출하게 하려면 어떻게 해야 할까?
에러문구에 나와있는 것처럼 setState()를 사용한다. 그러면 React는 state를 refresh하고 render 메서드를 호출한다.

아래와 같이 해보자. class component에서 state는 object이기 때문에 {}로 감싸줘야 한다.

```jsx
// 1. setState()에 state를 전달
add = () => this.setState({ count: this.state.count + 1 })
minus = () => this.setState({ count: this.state.count - 1 })
```

위의 코드로 작성하면 Add, Minus 버튼을 클릭할 때마다 state가 refresh되며 render 메서드가 호출된다.
하지만 좋은 코드는 아닌데, 이런 작성방식은 state에 의존하게 되기 때문이다. 이런 방식은 몇가지 성능 문제를 야기할 수도 있으며, function component에서도 같은 이유로 이러한 방식으로 작성하지 않는다.

```jsx
// 2. setState()에 function을 전달
add = () => this.setState(current => ({ count: current.count + 1 }))
minus = () => this.setState(current => ({ count: current.count - 1 }))

// add = () => this.setState(current => { count: current.count + 1 })
// 위처럼 작성하면 안된다. {}를 객체로 인식하지 못하고 함수 스코프로 인식하기 때문이다.
// 화살표 함수가 {}를 먼저 만나면 Implicit Return이 되지 않기에 스코프 내에서 Return을 찾게 된다.
// 따라서 Implicit Return을 통해 객체를 리턴하고 싶다면, ()로 감싸주어야 한다.
```

위의 코드로 작성하는 게 좋은데, 왜냐하면 이 방법이 React에서 state를 변경할 때 외부의 상태에 의존하지 않는 가장 좋은 방식이기 때문이다.

결론은, React에서 직접 state를 바꾸려고(mutate) 하면 render 메서드가 호출되지 않아 리렌더링이 되지 않는다.
대신, setState()를 사용해야 한다. React에서 setState()를 호출할 때마다, React는 새로운 state와 함께 render 메서드를 호출한다.

## Component Life Cycle

component가 <u>생성될 때</u>, <u>업데이트될 때</u>, <u>제거될 때</u> 호출되는 **life cycle method**들이 있으며, 이는 **클래스형 컴포넌트**에서만 사용할 수 있다.

### Mounting

```jsx
class App extends React.Component {
  constructor(props) {
    super(props)
    console.log('I am the first')
  }
  componentDidMount() {
    console.log('I am the third')
  }
  render() {
    console.log('I am the second')
    return <h1>Hello World!</h1>
  }
  // render() 가 JSX.Element를 return하지 않는다면, 아래의 에러를 띄운다.
  // "Error: name":"Invariant Violation","framesToPop":1"
  // 따라서 명시적으로 JSX.Element를 반환하도록 하자.
}
```

컴포넌트가 Mounting될 때는, 아래의 순서로 method가 동작한다.

1. `constructor()` : component가 mount될 때 가장 먼저 호출되는 메서드
2. `render()` : component를 render하는 메서드
3. `componentDidMount()` : component가 최초로 render되고 난 후 호출되는 메서드

콘솔창엔 다음과 같이 찍히게 된다.

```
"I am the first"
"I am the second"
"I am the third"
```

### Updating

```jsx
class App extends React.Component {
  state = { count: 0 }
  add = () => this.setState(current => ({ count: current.count + 1 }))
  minus = () => this.setState(current => ({ count: current.count - 1 }))
  componentDidUpdate() {
    console.log('I am the second')
  }
  render() {
    console.log('I am the first')
    return (
      <>
        <h1>The number is {this.state.count}</h1>
        <button onClick={this.add}>Add</button>
        <button onClick={this.minus}>Minus</button>
      </>
    )
  }
}
```

component에서 `setState()`를 호출할 때마다 호출되는 메서드들은 다음과 같다.

1. `render()`
2. `componentDidUpdate()`

이후 콘솔창엔 다음과 같이 찍히게 된다.

```
(component가 mount 됬을 때)
"I am the first"

(component가 update 됬을 때)
"I am the first"
"I am the second"
```

### Unmounting

component가 제거되기 직전에(=페이지를 바꾸거나, 종료할 때) 호출되는 메서드는 하나 존재한다.

1. `componentWillUnmount()` : component가 unmount되어 제거되기 직전에 호출. 내부에서 setState()를 호출하면 안됨. 컴포넌트 내부에서 Timer나 비동기 API를 사용하고 있을 때, 이를 제거하기에 유용하며, 쓰로틀링 구현에도 유용하게 쓰인다.

> **함수형 컴포넌트에**서는 `useEffect`를 이용하면 `componentDidMount()`, `componentDidUpdate()`, `componentWillUnmount()`를 전부 구현할 수 있다.
