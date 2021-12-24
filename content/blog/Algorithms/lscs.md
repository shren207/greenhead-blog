---
title: 'LSCS(Largest Sum of Contiguous Subarray)'
date: 2021-12-24 23:12:06
category: algorithms
thumbnail: { thumbnailSrc }
draft: false
img: true
---

![lcsc](./img/lscs.png)

**LSCS**(Largest Sum of Contiguous Subarray)란, <u>주어진 배열의 연속된 부분 배열의 합 중 **가장 큰 값**</u>을 의미합니다.

위의 사진을 예로 들자면, 배열 `[-2, -3, 4, -1, -2, 1, 5, -3]` 의 LSCS는 **7**입니다.

이 문제를 브루트포스 알고리즘으로 풀이할 시, 시간복잡도는 무려 **O(2<sup>n</sup>)**입니다. 멱집합을 구현할 때 자주 사용되는 방식인 `pickOrNot` 으로 구현해 보았습니다.

```js
let candidate = [] // 정답 후보군이 들어갈 배열
let arr = [-2, -3, 4, -1, -2, 1, 5, -3]
const LSCS = (sum, idx) => {
  // base case: 배열의 끝인 경우
  if (idx === arr.length) return

  // recursive case : pickOrNot
  candidate.push(sum) // 현재까지의 부분합을 후보 배열에 삽입합니다.
  LSCS(sum + arr[idx], idx + 1) // 1️⃣ keep continuing
  LSCS(0, idx + 1) // 2️⃣ disconnected and recontinue
}
LSCS(0, 0)
candidate.length // 255 (2^7 - 1)
```

> 배열 arr의 요소는 7개이며, 배열 candidate의 길이는 2<sup>7</sup>-1
