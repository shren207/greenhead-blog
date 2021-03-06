---
title: '[HTML] 기초'
date: 2021-07-26 20:41:59
category: til
thumbnail: { thumbnailSrc }
draft: false
img: false
---

HTML은 <u>HyperText Markup Language</u>의 약자로 웹 페이지를 구성하는 마크업 언어입니다. 글자 그대로, <u>HTML은 프로그래밍 언어가 아닙니다.</u> 그러나 HTML은 웹 페이지를 구성하는 뼈대가 되는 언어입니다. HTML은 구조를 표현하는 언어이기 때문에 HTML의 구조를 잘 짜놓으면, 자바스크립트로 개발을 할 때 더욱 직관적인 코드를 작성할 수 있습니다. 다른 코드가 그러하듯, 내가 작성한 HTML 문서도 다른 사람이 읽는 경우가 있습니다. <u>의미있는(Semantic) 태그를 적절하게 사용</u>한다면, 다른 사람이 HTML 문서를 접할 때 쉽게 이해하고 개발할 수 있습니다.

## Achievement Goals

- HTML을 CSS를 적용하고, JavaScript로 개발할 수 있게(Programmable) 작성할 수 있다.
  1. Inline : `style` 속성을 해당 HTML 엘리먼트에 작성 (안 좋은 방법)
  2. Interal : `<head>` 태그 안 `<style></style>` 를 작성하여 그 안에 CSS 작성
  3. External : `<head>` 태그 안 `<link rel="stylesheet" href="파일경로">` 를 작성하여 CSS 파일 연결
- HTML이 Markup language라는 것을 이해할 수 있다.
  - "구조를 표현하는 언어" 라는 의미를 자신의 언어로 표현할 수 있다.
- HTML의 구조와 문법에 대해서 이해하고 적용할 수 있다.
  - opening tag, closing tag, self-closing tag에 대해서 이해하고 있다.
    > `<head>` : opening tag<br> `</head>` : closing tag<br> `<img />`, `<input />` : self-closing tag
- 자주 사용되는 HTML 요소(Element)가 무엇인지 알고 차이를 설명할 수 있다.
  - div, span 태그가 무엇이고, 어떤 차이가 있는지 설명할 수 있다.
    > 레이아웃을 지정하고자 할 때 상당히 자주 사용되는 태그이다.<br>
    > 차이점은 `<div>`는 display가 block, `<span>`은 display는 inline이라는 점이다.
  - ul, ol, li 가 무엇이고, 언제 사용해야 하는지 알고 있다.
    > `ul` : unordered list<br> `ol` : ordered list<br> `li` : list (개별 항목들)
  - input type을 설정하여 다양한 종류의 input을 활용할 수 있다.<br>
    > 유저가 어떤 정보를 입력할 때 `<input />`을 사용, type에 따라 password, email, text 등 여러가지가 있다.
- 동적인 웹 어플리케이션 개발을 위한 HTML 구조를 짤 수 있다.
  - 간단한 웹 페이지 기획안을 HTML 문서로 표현할 수 있다.
  - id와 class를 목적에 맞게 사용하여 사람과 컴퓨터가 읽기 쉬운, 의미있는(Sementic) HTML 문서를 작성할 수 있다.<br>
    > `id` : 식별을 위해 엘리먼트에 부여하는 중복 불가능한 속성
    > `class` : 식별을 위해 엘리먼트에 부여하는 중복 가능한 속성
  - HTML5 semantic tag를 적재적소에 사용하여 사람과 컴퓨터가 읽기 쉬운 시멘틱한 HTML 문서를 작성할 수 있다.<br>
    > `<header>`, `<main>`, `<mark>`, `<nav>` 등 수많은 요소가 있다.
