---
title: H사 React 과제 복기
date: 2022-04-18 21:04:38
category: retrospect
thumbnail: { thumbnailSrc }
draft: false
img: false
---

`typescript` 기반의 `React` 뼈대 코드를 받아 6시간동안 요구하는 사항을 구현하면 되는 과제였다.

통과는 했지만 중간에 막히는 부분도 있었고, **쓰로틀링** 구현은 하지 못했기에 복습겸 글을 남긴다.

## npm install 에러

모듈을 설치하기 위해 `npm install`을 하니까 에러가 나면서 정상적으로 설치되지 않았다.
당시 node 버젼은 `16.14.0`의 `lts` 버젼이었기에 당연히 될 줄 알았는데 안되서 약간 해멨던 것 같다.

터미널에 `nvm use 14` 를 입력해서 노드 버젼을 14로 다운그레이드 하니까 정상적으로 설치가 되었다.
`lts` 버전이라고 안심하지 말고 npm install이 안되면 항상 `node` 버젼을 낮추도록 하자.

## <**Mole**> 컴포넌트 렌더링

`Mole` 컴포넌트 16개를 렌더링해야 하는데, 고차함수 `map`을 쓰자니 배열의 형태가 아니고, 그렇다고 하드코딩하자니 16개는 너무 많았다.

## <**Number**>와 <**number**>의 차이

```tsx
const [score, setScore] = useState<Number>(0)
//                        useState<number>(0) 이라고 할 시에는 OK
const [log, setLog] = useState([])
const onHit = (location: number) => {
  setScore(currentScore => currentScore + 1)
  setLog((current: []) => [...current, [location, Date.now()]])
}
```

> Operator '+' cannot be applied to types 'Number' and 'number'.

App.tsx에서 작업하는데, score변수의 type을 Number로 지으니 currentScore쪽에서 위 오류가 발생했다.
이를 number로 작성한 경우에는 에러가 발생하지 않았다.

[Typescript Do's and Don'ts](https://www.typescriptlang.org/ko/docs/handbook/declaration-files/do-s-and-don-ts.html)

공식 문서에 따르면, Number, String, Boolean, Symbol, Object 타입을 사용하면 안 된다고 한다.
이는 JS 코드에서 거의 사용하지 않는 래퍼 객체를 가리킨다고 한다.

대신, number, string, boolean, symbol, object를 사용하면 된다.

## TS에서 useState 타입을 array로 정하기

```tsx
function App() {
  const [score, setScore] = useState<number>(0);
  const [log, setLog] = useState([]); //
  const onHit = (location: number) => {
    setScore((currentScore) => currentScore + 1);
    setLog((current) => [...current, [location, Date.now()]]); // 에러 발생
  };
```

> Type '(current: never[]) => number[][]' is not assignable to type '(prevState: never[]) => never[]'.

`log`의 `initialValue`를 `[]`로 설정하면 `log`의 `type`은 `never[]`로 추론되기에, `log`는 항상 빈 배열이 되어야 한다.

```jsx
const [log, setLog] = useState([] as any);
```

위처럼 작성하면 에러는 나오지 않았지만, `as`는 type 사기를 칠 수 있게 해주기에 올바른 방법은 아니다.

[stackoverflow 관련 질문](https://stackoverflow.com/questions/59249256/argument-of-type-never-is-not-assignable-to-parameter-of-type-never-when-d)

위의 링크를 참고하니, type을 이용하면 이를 해결할 수 있다.  
아래와 같이 작성하면 에러없이 정상적으로 동작한다.

```tsx
type MyArrayType = [number, number]; // 튜플 타입 설정

function App() {
  const [score, setScore] = useState<number>(0);
  const [log, setLog] = useState<MyArrayType[]>([]);
  const onHit = (location: number) => {
    setScore((currentScore) => currentScore + 1);
    setLog((current) => [...current, [location, Date.now()]]);
  };
```

참고로 <u>`MyArrayType[]`은 이미 **빈 배열의 타입**이 될 수 있기 때문</u>에, 아래와 같이 하면 안된다.

```tsx
const [log, setLog] = useState<MyArrayType[] | []>([]) // 에러 발생
```

[빈 배열을 고려해서 union type으로 할 필요가 없는 이유](https://stackoverflow.com/questions/56918950/displaying-an-array-received-from-usestate-hook-with-typescript)

## React.FunctionComponent / React.FC

```tsx
// Mole.tsx
interface MoleProps {
    onHit(): void;
}
const Mole: React.FunctionComponent<MoleProps> = (props) => {
// 생략
```

위 코드와 같이 함수형 컴포넌트의 type을 `React.FunctionComponent` (=`React.FC`)로 지정하는 코드가 있었는데,
<u>현재에 이르러선 잘 쓰이지 않는 방식</u>이라고 한다. 아무래도 TS에서 타입을 지정하는 기존의 방식과 괴리가 있어서 그런 것 같다.

아래와 같이 작성하면 기존의 TS에서 `function`의 `type`을 지정하는 방식과 동일하게 작성할 수 있다.

```tsx
interface MoleProps {
    onHit(): void;
}
const Mole = (props: MoleProps) => {
// const Mole = (props: MoleProps): JSX.Element => { 로 리턴타입을 명시해줄 수도 있다

// 생략
```

[TS에서 함수형 컴포넌트 작성방법 (typescript cheatsheet)](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components/)<br>
[React.FC 제거해주는 모듈 (github)](https://github.com/gndelia/codemod-replace-react-fc-typescript)

## useCallback

[React Hooks: useCallback 사용 방법 (DaleSeo)](https://www.daleseo.com/react-hooks-use-callback/)

함수를 재사용하기 위해 사용하는 Hook이다. 주로 <u>의존 배열로 함수를 넘길 때</u> 사용하거나, 혹은 <u>`React.memo()` 함수와 조합해서 불필요한 렌더링을 줄이기 위해</u> 사용한다.

초보 개발자는 React 컴포넌트 내에 선언하는 모든 함수에 useCallback()을 무조건적으로 사용하는 경우가 많다고 하는데, 항상
사용하기 전에 이를 통해 얻을 수 있는 성능상의 이점을 분석한 뒤 사용이 권장된다.

## 조건부 useEffect

[리액트 useEffect: 개발자가 알아야 할 네가지 팁](https://ui.toast.com/weekly-pick/ko_20200916)
[useEffect 사용법](https://xiubindev.tistory.com/100)

상태 `mole`은 `boolean`값을 가지며, mole이 변할 때마다 `useEffect`가 실행되는데, <u>mole이 true인 경우에만
useEffect가 호출</u>되게 하고 싶었다.

핵심은 <u>useEffect가 받는 콜백 함수 최상단에서 조건에 맞지 않는 경우에는 return</u>하는 것이다.
따라서 `mole === false` 인 경우에는 최상단에서 바로 return하면 된다.

## React에서 setTimeout쓰는 법

`setTimeout`에서 지정한 함수가 2번 이상 실행될 수 있었기 때문에 2초 내에 두더지를 클릭하더라도 Invalid가 되었다.
<u>매 시간마다 setTimeout은 **딱 1번만 실행**되도록(**쓰로틀링**)</u> 할 필요가 있었기에 관련 링크를 찾아보았다.

[JS setTimeout, clearTimeout 질문이요 (okky)](https://okky.kr/article/877205?note=2247045)

> 1. useEffect에서 clearTimeout을 하는 이유

`setTimeout`은 지정한 시간이 지나면 인수로 받은 함수를 실행한다. 하지만 <u>지정한 시간이 지나기전에 useEffect가 다시 실행되는 일이 발생하면 setTimeout이 다시 실행되고 결국 setTimeout에 지정한 함수가 **두번 실행**된다</u>. 이 같은일을 방지하려면 지정된 시간이 지나기 전에 clearTimeout로 제거함으로써 항상 시간마다 1번만 실행되는것을 보증할수 있다.

> 2. clearTimeout를 함수로 반환하는 이유

<u>`useEffect`가 함수를 리턴하는 경우, 컴포넌트가 새로 렌더링 될 때 **리턴된 함수를 실행**</u>시킨다.  
새로운 입력이 들어오는 경우, 이전에 타임아웃을 취소시키는 콜백함수를 실행시켜 취소시키고, 새로운 타임아웃을 실행시키게 된다.
여기서 클리어 타임아웃을 콜백으로 전달해주지 않는다면, 입력을 받아 컴포넌트가 새로 렌더링 되자마자 클리어타임아웃 함수가 실행이 되어버리기 떄문에 우리가 목표로 했던 쓰로틀링의 효과를 볼 수 없다.

# 느낀 점

`React`는 자신있었기에 금방 풀 수 있을 줄 알았는데 생각보다 시간이 많이 걸렸다.

우선 `Typescript`는 여전히 공부를 많이 해야할 것 같다. `useState`를 사용할 때 타입 지정하는 방식과 `props`의 타입을 지정하는 방식, 그리고 `React.FC`가 무엇을 의미하고 이보다 더 좋은 코드는 어떻게 작성하는 지 등을 당시에는 몰라 시간을 좀 잡아먹었다.

`Typescript`를 제외한 순수 `React`에서도 제대로 알지못한 부분도 있었다.
`useCallback`이 어떤 기능을 하고 무슨 목적으로 사용되는 지, `useEffect`에서 `componentWillUnmount()`는 어떻게 구현하는 지 알지 못해서 타이머 API를 사용할 때 **쓰로틀링**을 구현하는 것도 하지 못했다.

덕분에 모르는 것이 뭔지 확실히 알 수 있었고, 이렇게 하나하나 정리하면서 지식이 더 풍부해져서 좋다. 여기서 배운 것을 바탕으로 다음에는 더 빠르고 정확하게 과제를 수행해보자!
