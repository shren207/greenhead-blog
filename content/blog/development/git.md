---
title: '[GIT] 브랜치'
date: 2022-01-20 21:01:73
category: development
thumbnail: 'git'
draft: false
img: false
---

# GIT

![img](https://i.imgur.com/V6WGdMu.png)

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

## 현재 git의 전체적인 상태를 알고 싶을 때

```bash
git status
```

: 현재 브랜치, 상태(커밋이 최신인지),
커밋할 것이 있는지 등을 표시해준다.

## 로컬 레포지토리 내의 모든 branch를 알고 싶을 때

```bash
git branch
```

: 현재 레파지토리의 모든 브랜치를 표시,
현재 위치의 브랜치는 \* 이 앞에 붙는다.

## branch를 새로 만들고 싶을 때

- 그냥 만들기만 하고 싶은 경우

```bash
git branch <branch 명>
```

- 만든 뒤 해당 브랜치로 이동하고 싶은 경우

```bash
git checkout (-b) <branch 명>
git switch (-c) <branch 명>
```

( ) 안을 작성하지 않는다면 단순히 해당 브랜치로 이동만 한다.

## 해당 브랜치에서 만든 파일이 브랜치를 바꿔도 남아있을 때

<img src=./img/MandU.png>

- M : Modified (스냅샷에 존재하는 파일(Tracked)이며, 변경된 사항이 commit되지 않은 경우)
- U : Untracked (클론해온 파일에는 없던 새로운 파일이며, 아직 해당 브랜치에서 commit이 안된경우)

## 해당 브랜치를 삭제하고 싶은 경우

```bash
git branch -d <삭제할 브랜치명>
git branch -D <삭제할 브랜치명>
```

삭제할때는 해당 브랜치에서 벗어난후 삭제를 진행할 수 있다
-D는 삭제할 브랜치가 상위 브랜치가 동기화가 되지 않은 경우에, 이를 무시하고 삭제할 수 있다.

## 특정 브랜치를 clone받아오고 싶은 경우

```bash
   git clone <repo 주소> # default 브랜치를 clone
   git clone -b <branch명> <repo 주소> # 해당 branch를 클론
```

- fork 는 모든 branch 를 다 가져온다.
- clone 은 기본 branch 하나만 가져온다.

(모든 branch 를 가져올 수는 없는 것 같다(추정))

## 새로 만든 branch를 원격에 push했는데 아무것도 없을 때

새로운 branch를 생성한 다음, git add / git commit 의 명령어를 사용하지 않으면
새로 생성된 branch‘만’ push가 되고 새로 생성된 branch 에서 수정된 사항은 일절 반영되지 않는다.
(터미널 상에서 Changes not staged for commit 이라고 나오며 git add 및 git commit 을 권장한다.)

## 브랜치 A의 하위브랜치 A/B를 만들려고 했는데 에러가 나는 경우

[https://stackoverflow.com/questions/22630404/git-push-refs-heads-my-subbranch-exists-cannot-create](https://stackoverflow.com/questions/22630404/git-push-refs-heads-my-subbranch-exists-cannot-create)

- **If branch `b` exists, no branch named `b/anything` can be created.**
- **Likewise, if branch `dev/b` exists, `dev/b/c` cannot be created.**

이 점들을 생각해 볼때, 브랜치명은 `/`대신, `-`을 사용해야 할 듯 하다.

9)

예를 들어, main 이라는 branch 가 있고, dev 라는 branch 가 있다고 가정하자.

( main 이하에 dev 가 있는 것이다 )

이 경우에 main 에는 index.js 가 있고 dev 에서는 index.js 를 삭제하고,

main branch 에서 `git merge dev` 명령어를 사용하게 되면 dev 의 파일 상태가 ‘덮어쓰기’ 되어

main branch 의 index.js 는 삭제가 된다. 즉, merge 는 ‘덮어쓰기’ 의 개념인 것 같다.

10)

main 에서 index.js 에 `console.log(1)` 이라는 내용이 있다고 치고,

dev 에서 index.js 에 `console.log(2)` 이라는 내용이 있다고 치자.

main branch 에서 `git merge dev` 명령어를 입력하면

main branch 의 index.js 는 `console.log(2)` 가 된다.

---

main 에서 index.js 파일이 없고, dev 에서 index.js 에 `console.log(2)` 라는 내용이 있다고 치자.

main branch 에서 `git merge dev` 명령어를 입력하면

main branch 에 index.js 파일이 생기고 그 내용은 `console.log(2)` 이다.

---

반대로, main 에서 index.js 에 `console.log(1)` 이라는 내용이 있다고 치고,

dev 에서 index.js 라는 파일이 없다고 치자.

main branch 에서 `git merge dev` 명령어를 사용했을때

1. Fast-Forward 방식으로 merge 가 되면 main 의 index.js 는 삭제된다.

( 즉, merge 되는 dev branch 에 index.js 파일이 없는 상태가 main branch 에 덮어씌워진다는 것 )

2. Recursive 방식으로 merge 가 되면 main 의 index.js 는 살아남고,

main 에 없고 dev 에서 추가된 파일 및 폴더가 main 에 추가된다.

( 즉, - 는 없이 + 의 개념만 덮어씌워진다는 것 )

11)

main branch 에 index.js 파일이 있다고 가정하자.

그 다음, dev branch 를 생성하면 당연히 dev branch 에도 index.js 파일이 있을 것이다.

이제 여기서 A 와 B 가 작업을 한다.

A 는 dev-login 이라는 branch 를 만들어 작업을 하는데, index.js 는 일절 건드리지 않았다.

B 는 dev-logout 이라는 branch 를 만들어 작업을 하는데, index.js 를 삭제했다.

`git add .` 명령어를 통해 git 의 변경사항을 저장하면,

A 의 기록에는 - (변화없음) 이 남아있을 것이고, B 의 기록에는 -index.js (파일삭제) 가 있을 것이다.

이후 A 가 dev branch 에서 `git merge dev-login` 명령어를 통해 merge 를 시도하면,

dev branch 에서 index.js 는 살아있다. 왜? A 는 dev-login 에서 index.js 를 일절 건드리지 않았으므로.

하지만 이후 B 가 dev branch 에서 `git merge dev-logout` 명령어를 통해 merge 를 시도하면,

dev branch 에서 index.js 는 삭제된다. 왜? B 는 dev-logout 에서 -index.js 라는 ‘삭제기록’을 남겼기 때문.

따라서, B 가 merge 를 할때는 index.js 가 삭제되고, A 가 merge 를 할때는 index.js 가 보존되는 것이다.

( GitHub 홈페이지에서 PR 을 merge 시킬 때도 마찬가지다. )

12)

branch 를 원격으로 삭제할 때는 CLI에 `git push origin --delete <브랜치명>` 를 입력하도록 한다.
