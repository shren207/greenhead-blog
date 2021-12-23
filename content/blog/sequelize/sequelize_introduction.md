---
title: '[Sequelize] 쿼리문 없이 객체지향적 코드로 DB 관리!'
date: 2021-12-23 22:12:80
category: sequelize
thumbnail: { thumbnailSrc }
draft: false
img: true
---

![sequelize](./img/sequelize_title.png)

ORM(Object-Relational-Mapping)은 객체와 모델 사이의 관계. 관계형 데이터베이스를 프로그래밍 언어의 관점에서 접근할 수 있도록 해줌

SQL은 서툴지만, 자바스크립트 코드는 익숙하면 ORM을 사용하면 자바스크립트 코드만으로 더이상 SQL문 없이 관계형 데이터베이스에 접근할 수 있다.

프로그래밍만 익숙한 사람이 관계형 데이터베이스를 사용할 때는 ORM이 매우 유리할 것

sequelize : a promise-based Node.js ORM
지원 RDBMS: Postgres, MySQL, MariaDB, SQLite, Microsoft SQL Server

sequelize만 할 줄 할면, 즉 자바스크립트만 할 줄 알 면 저 위의 모든 RDBMS를 전부 다룰 수 있다!!

- Association (=ORM을 이용해서 JOIN 구현 [sequelize 공식문서 참조])
- Transaction (=은행 업무와 비슷, rollback)

## Sequelize 설정

```bash
npm i sequelize # sequelize 설치
npm i --save-dev sequelize-cli # migration(DB 상태를 변화시키는 것) 위한 툴 설치
npx sequelize-cli init #
```
