---
title: '[백준 1389] 케빈 베이컨의 6가지 법칙'
date: 2021-12-19 23:12:09
category: Problems
thumbnail: { thumbnailSrc }
draft: false
img: true
---

[![backjoon](./img/backjoon.png)](https://www.acmicpc.net/problem/1389)

## 헤맸던 부분

처음에 _"모든 사람은 친구 관계로 연결되어져 있다"_ 라는 조건때문에 _'아 그러면 무한루프에 안 빠지겠네?'_ 라고 착각해서 <u>해당 정점 방문여부를 체크하지 않은게 **첫번째 실수**</u>이다.

**두번째 실수**는 <u>인물 A가 인물 B까지 이어지는데 걸리는 단계는 하나만 있는게 아닌, **여러 개**가 있을 수 있다</u>는 점을 간과했다는 것이다.

예를 들어 사람이 **5명**이고, `1과 3`, `1과 4`, `2와 3`, `3과 4`, `4와 5` 가 친구인 경우, 아래 코드를 보며 내가 무엇을 놓쳤는지 자세히 이해해보자.

```js
const matrix = [
  [0, 0, 1, 1, 0], // 사람 1은 3, 4와 친구
  [0, 0, 1, 0, 0], // 사람 2는 3과 친구
  [1, 1, 0, 1, 0], // 사람 3은 1, 2, 4와 친구
  [1, 0, 1, 0, 1], // 사람 4는 1, 3, 5와 친구
  [0, 0, 0, 1, 0], // 사람 5는 4와 친구
]
```

여기서 **1이 4까지 몇 단계를 걸치는 지** 계산할 때, `1 -> 4` 만에 갈 수 있으니 **최소 단계**는 1이지만, 만약 이 문제를 **DFS**로 탐색을 하게 되면 `1 -> 3 -> 4` 순으로 방문하기에 2가 출력되어 버린다.

### 느낀점

- **그래프** 문제에선 **방문여부를 체크**하는 것을 잊지 말자!
- 문제가 `최솟값` 을 요구하고 있는 경우는 (대부분) **BFS!**

## 코드

```js
const [a, ...relationships] = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
const [M] = a.split(' ').map(Number)

const findInfluencer = (M, relationships) => {
  const matrix = new Array(M + 1).fill(0).map(el => new Array(M + 1).fill(0))
  // 인물이 1부터 시작하므로 0번째 인덱스에 dummy 값을 넣는다.
  for (let el of relationships) {
    let [a, b] = el.split(' ').map(Number)
    matrix[a][b] = 1
    matrix[b][a] = 1
    // 간선 추가
  }
  // matrix 완성
  const steps = [] // 임의의 인물에 대한 모든 단계가 차례대로 push됨
  const KBs = [Number.MAX_SAFE_INTEGER]
  // 0번째 인덱스 값은 dummy. Max값으로 설정
  // 이후 인물 1, 2, 3... 순으로,
  // steps의 모든 단계를 더한 값을 최종적으로 여기에 push.
  const queue = [] // bfs를 위한 queue.
  const bfs = () => {
    while (queue.length > 0) {
      let [now, target, cnt, visit] = queue.shift()
      if (now === target) {
        steps.push(cnt)
        return
      }
      for (let friend = 1; friend <= M; friend++) {
        if (matrix[now][friend] === 1 && !visit[friend]) {
          visit[friend] = true
          queue.push([friend, target, cnt + 1, visit])
        }
      }
    }
  }
  for (let now = 1; now <= M; now++) {
    // now는 현재 케빈베이컨 수를 구할 대상,
    for (let target = 1; target <= M; target++) {
      // target은 각각 now의 친구들을 의미
      // 이 반복문이 한번 돌 때마다 now와 target이 이어지는 데 필요한 최소단계가 steps에 push됨
      if (now !== target) {
        const visit = new Array(M + 1).fill(0) // 해당 인물(정점)의 방문 여부를 저장하는 배열
        visit[now] = true
        queue.push([now, target, 0, visit])
        bfs()
      }
    }
    KBs.push(steps.reduce((a, b) => a + b, 0))
    steps.splice(0, steps.length)
    // 반복문이 종료된 시점에서 now에 대한 모든 친구(target)들의 단계가 steps에 저장됨
    // 배열 steps에 저장된 단계를 전부 더해서(reduce) answer에 push
    // 그 후 steps의 모든 요소를 제거한다(splice)
  }
  let minValue = Math.min(...KBs)
  // 가장 적은 케빈베이컨 수를 찾는다.
  let influencer = KBs.indexOf(minValue)
  // minValue에 해당하는 인물을 찾는다. 중복되는 경우, 숫자가 가장 적은 사람을 찾는다.
  return influencer
}
console.log(findInfluencer(M, relationships))
```
