---
title: '[GIT] 기초'
date: 2021-07-28 09:03:47
category: til
thumbnail: { thumbnailSrc }
draft: false
img: false
---

# GIT

![스크린샷 2021-09-02 오후 3.58.35.png](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fce76f96f-77b0-4149-9474-117656b5d88c%2F%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2021-09-02_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.58.35.png?table=block&id=873335cc-a096-4c3f-9f45-a5b35aedf192&spaceId=afdce364-b2e1-4547-8282-c4a28b754ef8&width=2000&userId=60efd79d-1828-4612-87a4-223e97e23bee&cache=v2)

> **_위의 사진을 이해하는 것이 중요하다._**

### git init, git remote add origin <주소>가 필요한 경우

만약 타인의 repository에 contribute하려는 경우에는 fork, clone만 하면되서 위의 과정이 필요없다.
만약 내가 주도해서 videogames 프로젝트를 만드려고 하는 경우에는 프로젝트 폴더에서 git init을 하여
git local repository로 만들어 준 뒤, github에서 videogames repository를 하나 만들고, 그 repository
주소를 git remote add origin <주소> 를 써서 local과 remote를 연결해준다.
즉, 코드스테이츠에서 과제같은 걸 다운받아서 그 내용을 수정하거나 하는 경우는 git init,
git remote add origin같은 걸 할 필요가 없다
순서: git init ⇒ github에 repository 만들기 ⇒ git remote add origin <주소>

### merge

기본적으로 pull을 해오면 auto-merging이 되지만 같은 코드를 수정한 상태이면 충돌이 발생한다. 이경우는
일단 commit까지 진행하고 그다음 pull로 받아와서 내용을 수정한다. commit까지 진행하지 않은 상태에서
pull을 하려 하면 error가 발생하여 pull이 되지 않는다. 내용을 수정했으면 unstaged로 돌아가는데 병합이
잘 됬음을 의미한다.

### 기본 구조

`add` ⇒ `commit` ⇒ `push` 3박자를 기억해라

### git restore <파일명>

commit 혹은 staged되지 않은 변경 사항을 폐기

- staged되었으나 commit은 되지 않은 변경 사항 폐기법

  1️⃣ git restore —staged <파일명>
  2️⃣ git restore <파일명>

- staged되지 않은 변경 사항 폐기법

  1️⃣ git restore <파일명>

### git reset HEAD

local에서 commit한 내용 취소 (아직 remote repository에 올라가지 않은 commit)

`git reset HEAD~1` 또는 `git reset HEAD^` : 가장 최근의 커밋 1개 취소
`git reset HEAD~3` 또는 `git reset HEAD^^^` : 가장 최근의 커밋 순으로 3개 취소

### Pull Request

pull request는 CLI에서도 할 수 있지만, 브라우저에서 하는게 명시적이고 더 좋다(권장)

### **Upstream vs Origin**

다른사람의 github 저장소를 fork한 경우,

- 나의 github repository는 `origin` (shren207)
- 처음 포크한 repository는 `upstream` (codestates)

### 연결 삭제

git remote remove <사용자명>
