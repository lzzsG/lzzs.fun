# 版本控制(Git)

Complete later

可参见[missing-semester: 版本控制(Git)](https://missing-semester-cn.github.io/2020/version-control/)

可使用[Learn Git Branching](https://learngitbranching.js.org/)练习

<div class="iframe-wrapper">
    <iframe src="https://learngitbranching.js.org/?locale=zh_CN" frameborder="0" allowfullscreen></iframe>
    <div class="iframe-overlay-quarter-b">
        <a href="https://learngitbranching.js.org/?locale=zh_CN" target="_blank">点击此处打开</a>
    </div> <!-- 新的遮罩层放在iframe底部1/4区域 -->
</div>

---

## Git 基础指导

### 1. Git 初始操作

- **`git init`**：在当前目录中初始化一个新的 Git 仓库，开始版本控制。
- **`git add <file>`**：将文件加入暂存区，准备提交。
- **`git commit -m "message"`**：提交暂存区内容到仓库，附带提交说明。
- **`git status`**：查看当前仓库状态，显示未提交的更改。
- **`git log`**：查看提交历史，显示提交者、时间、提交信息。

### 2. 分支管理

- **`git branch <branch_name>`**：创建新分支，分支是开发线的独立副本。
- **`git checkout <branch>`**：切换到指定分支，开始在该分支上工作。
- **`git merge <branch>`**：将指定分支的更改合并到当前分支。

### 3. 查看与撤销操作

- **`git diff`**：查看工作区中尚未暂存的更改。
- **`git reset <file>`**：从暂存区移除文件，但保留工作区更改。
- **`git rm <file>`**：从工作区与 Git 仓库中删除文件。

### 4. 远程仓库

- **`git remote add <name> <url>`**：将远程仓库关联到本地项目。
- **`git clone <url>`**：克隆远程仓库到本地。
- **`git pull`**：从远程仓库拉取最新代码并与当前分支合并。
- **`git push`**：将本地更改推送到远程仓库。

## Git 进阶操作指导

### 1. 分支管理与操作

- **`git branch -d <branch>`**：删除已合并的分支。
- **`git stash`**：暂存当前未提交的修改，允许在切换分支时保存工作进度。
- **`git rebase <branch>`**：将指定分支的更改应用于当前分支，保持提交历史整洁。
- **`git cherry-pick <commit>`**：将其他分支的某个提交应用到当前分支。

### 2. 历史管理与回退

- **`git reset --hard <commit>`**：彻底回退到指定提交，放弃后续更改。
- **`git revert <commit>`**：生成一个新的提交，撤销指定提交的更改。

### 3. 远程操作

- **`git fetch`**：从远程仓库获取最新的变更，但不合并。
- **`git push -u <remote> <branch>`**：推送当前分支到远程仓库，并设置跟踪。

### 4. 标签管理

- **`git tag <tag_name>`**：创建标签，常用于标记发布版本。
- **`git push origin <tag_name>`**：推送本地标签到远程仓库。

### 5. 合并冲突与解决

- **合并冲突**：在合并分支时，如果 Git 检测到两个分支修改相同文件的同一部分，将发生冲突。手动编辑冲突部分后，使用 `git add <file>` 解决冲突，然后完成合并。

### 6. 子模块

- **`git submodule add <url>`**：将其他 Git 仓库作为子模块添加到当前项目。
- **`git submodule update --init`**：初始化并更新子模块内容。

### 7. 交互式 rebase

- **`git rebase -i <commit>`**：交互式 rebase 允许你在回顾历史时修改、合并提交、修改提交信息等操作，便于整理历史。

### 8. 清理与优化

- **`git clean -f`**：删除未追踪的文件。
- **`git gc`**：运行垃圾回收，优化 Git 仓库的存储。



## 更多 Git 常用操作

### 1. 重写提交历史
- **`git commit --amend`**：修改最近一次的提交信息或附加更改。
- **`git rebase -i HEAD~n`**：交互式重写最近 n 次提交（修改、合并或删除历史）。

### 2. 远程仓库操作进阶
- **`git remote set-url <name> <new-url>`**：修改现有远程仓库的 URL。
- **`git pull --rebase`**：拉取远程更改并在本地提交的基础上重放。

### 3. 解决冲突
- **`git mergetool`**：使用图形化或命令行工具解决冲突。
  
### 4. 查看提交详细信息
- **`git blame <file>`**：逐行查看文件的更改历史，了解每行代码是谁、何时修改的。
- **`git show <commit>`**：查看特定提交的详细信息。

### 5. Git 别名
- **`git config --global alias.co checkout`**：创建 `git co` 作为 `git checkout` 的简写，方便使用。

### 6. 恢复误删的分支
- **`git reflog`**：查看最近所有 HEAD 的移动记录，可以从中找到删除的分支。
- **`git checkout -b <branch_name> <commit>`**：基于 reflog 中找到的提交，恢复误删分支。

