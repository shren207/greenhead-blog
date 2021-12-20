---
title: '[백준 1726] 로봇'
date: 2021-12-20 23:12:87
category: algorithms
thumbnail: { thumbnailSrc }
description: 내게 있어 BFS 문제의 끝판왕 느낌의 문제였다...
draft: false
img: true
---

[![backjoon](./img/backjoon.png)](https://www.acmicpc.net/problem/1726)

## 비슷한 문제

- 백준 2178번 _"**미로 탐색**"_
- 코드스테이츠 Toy 25번 _"**robotPath**"_
- 코드스테이츠 Toy 28번 _"**robotPath2**"_

## 헤맸던 부분

- 해당 좌표 방문 여부를 단순히 true, false로 구분하니까 한번 방문한 좌표에 대해 이후 이보다 더 적은 명령수로 도착하는 경우가 있을 수도 있음에도 이를
