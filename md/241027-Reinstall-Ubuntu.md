# 重装Ubuntu

## 1. 更新系统并安装基础工具

- **更新软件包列表**：确保系统使用的是最新的软件包。

  ```bash
  sudo apt update && sudo apt upgrade -y
  ```

- **安装常用工具**：安装一些基础的工具，如 `curl`、`git`、`vim`、`htop`、`build-essential` 等，以便日常使用。

  ```bash
  sudo apt install -y curl git vim htop build-essential
  ```

## 2. 配置系统语言和输入法

- **安装输入法**：安装并配置中文 Pinyin 输入法（如 `fcitx` Hanyu Pinyin 或 [搜狗拼音](https://shurufa.sogou.com/linux)）。

## 3. 设置 SSH 密钥和 Git 配置

### 3.1 生成 SSH 密钥

1. 打开终端，生成一个新的 SSH 密钥对（以 `RSA` 为例）。替换 `your_email@example.com` 为你的 GitHub 关联邮箱：

   ```bash
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
   ```

2. 系统会提示密钥的存储路径，默认会存放在 `~/.ssh/id_rsa`。如果这是你的第一对密钥，直接按 `Enter` 使用默认路径即可：

   ```plaintext
   Enter file in which to save the key (/home/username/.ssh/id_rsa):
   ```

3. 设置一个密码短语用于保护 SSH 密钥，输入后按 `Enter` 确认（也可以直接按 `Enter` 跳过）：

   ```plaintext
   Enter passphrase (empty for no passphrase):
   ```

   重复输入密码确认。

4. 完成后，SSH 密钥对会保存在 `~/.ssh/` 目录下，`id_rsa` 为私钥，`id_rsa.pub` 为公钥。

### 3.2 查看生成的 SSH 公钥

要将 SSH 公钥添加到 GitHub，需要复制 `id_rsa.pub` 文件的内容。

在终端中输入以下命令查看公钥内容：

```bash
cat ~/.ssh/id_rsa.pub
```

终端会显示公钥内容，如下所示：

```plaintext
ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAv... your_email@example.com
```

**注意**：确保复制完整的公钥字符串。

### 3.3 将 SSH 公钥添加到 GitHub

1. 登录 [GitHub](https://github.com) 并进入你的账户。

2. 在页面右上角，点击头像，选择 **Settings**（设置）。

3. 在左侧菜单中，找到并点击 **SSH and GPG keys**。

4. 点击 **New SSH key** 按钮，进入添加 SSH 密钥的页面。

5. 在 **Title** 栏中为密钥命名（例如，`My Laptop SSH Key`）。

6. 在 **Key** 栏中粘贴刚刚复制的 SSH 公钥内容。

7. 点击 **Add SSH key** 按钮完成添加。

### 3.4 测试 SSH 连接

在终端中输入以下命令，测试是否成功添加到 GitHub：

```bash
ssh -T git@github.com
```

你可能会看到如下提示，输入 `yes` 确认：

```plaintext
The authenticity of host 'github.com (IP ADDRESS)' can't be established.
RSA key fingerprint is SHA256:xxxxxxxxxxxx.
Are you sure you want to continue connecting (yes/no)? yes
```

如果设置成功，你会看到以下信息：

```plaintext
Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```

### 3.5 配置 Git 用户名和邮箱

Git 使用用户名和邮箱来标识每次提交的身份。要配置全局 Git 用户名和邮箱，使用以下命令：

```bash
git config --global user.name "Your Name"
git config --global user.email "your_email@example.com"
```

可以验证配置是否成功：

```bash
git config --global --list
```

输出示例：

```plaintext
user.name=Your Name
user.email=your_email@example.com
```

### 3.6 将 SSH 密钥添加到 `ssh-agent`（可选）

将 SSH 密钥添加到 `ssh-agent` 可以避免每次使用 Git 时都输入密码短语。

1. 启动 `ssh-agent`：

   ```bash
   eval "$(ssh-agent -s)"
   ```

2. 将私钥添加到 `ssh-agent`：

   ```bash
   ssh-add ~/.ssh/id_rsa
   ```

这时，SSH 密钥已被 `ssh-agent` 管理，以后再使用 Git 操作时无需手动输入密码短语。

现在你的 GitHub 配置已经完成，可以使用 SSH 进行 Git 操作了，如克隆仓库或提交代码等。

## 4. 安装常用软件和开发环境

### 4.1 工具、软件、编程语言和开发环境

#### 更新软件包列表

```bash
sudo apt update && sudo apt upgrade -y
```

#### 常用工具安装

```bash
sudo apt install -y vim curl wget git htop tmux build-essential net-tools \
    unzip zip tree screenfetch neofetch gnome-tweaks
```

- **vim**：高级文本编辑器
- **curl & wget**：下载工具
- **git**：版本控制工具
- **htop**：交互式系统监视工具
- **tmux**：终端复用工具
- **net-tools**：包含 `ifconfig` 等网络工具
- **gnome-tweaks**：GNOME 桌面环境的调整工具

---

### 4.2 软件

- **[Chrome](https://www.google.com/intl/zh-CN/chrome/)**：登录Google账号同步插件、密码管理
- **[VScode](https://code.visualstudio.com/download)**：登录Microsoft账号同步插件设置
- **[Typora](https://support.typora.io/Typora-on-Linux/)**：Markdown 编辑
- 远程桌面

### 4.3 编程语言和开发环境

#### Python

Ubuntu 自带 Python 3，但可以升级到最新版本并安装一些常用工具。

```bash
sudo apt install -y python3 python3-pip python3-venv python3-dev
pip3 install --user virtualenv ipython
```

#### Node.js 和 npm

使用 `nvm`（Node 版本管理器）安装 Node.js，可以方便地切换版本。

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
source ~/.bashrc
nvm install --lts
```

#### Java

安装 OpenJDK，适合 Java 开发。

```bash
sudo apt install -y openjdk-11-jdk
```

#### Rust

Rust 可以通过官方的 `rustup` 安装，便于管理版本。

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```

#### Ruby

使用 `rbenv` 和 `ruby-build` 管理 Ruby 版本：

```bash
sudo apt install -y rbenv
rbenv install 3.0.0
rbenv global 3.0.0
```

## 5. 配置 dotfiles

- **创建 dotfiles 目录**：将配置文件（如 `.bashrc`、`.vimrc`、`.gitconfig` 等）集中管理。

- **Git 管理 dotfiles**：初始化一个 `dotfiles` 仓库，并将配置文件软链接到系统根目录。

  ```bash
  git init ~/dotfiles
  ln -s ~/dotfiles/.bashrc ~/.bashrc
  ```

- **安装常用插件**：比如，`vim` 或 `zsh` 的插件和主题，推荐使用 `oh-my-zsh` 进行 Shell 美化。

## 6. 个性化环境

### 6.1 Vim 配置

#### 基本 `.vimrc` 配置

创建或编辑 `~/.vimrc` 文件，添加以下配置来增强 Vim 的使用体验：

```vim
" 基础设置
set number            " 显示行号
set relativenumber    " 相对行号
set cursorline        " 高亮当前行
set showcmd           " 显示当前命令
set clipboard=unnamed " 系统剪贴板共享
set tabstop=4         " Tab 显示为4个空格
set shiftwidth=4      " 自动缩进4个空格
set expandtab         " 使用空格代替Tab

" 搜索设置
set ignorecase        " 搜索忽略大小写
set smartcase         " 搜索大小写智能匹配
set hlsearch          " 高亮搜索结果
set incsearch         " 增量搜索

" 显示设置
syntax on             " 语法高亮
set background=dark   " 适合深色主题
set termguicolors     " 启用真彩色支持

" 插件相关（使用 Vim-Plug 管理插件）
call plug#begin('~/.vim/plugged')
Plug 'preservim/nerdtree'        " 文件浏览器
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }  " 模糊查找
Plug 'junegunn/fzf.vim'          " fzf 插件扩展
Plug 'tpope/vim-fugitive'        " Git 集成
Plug 'itchyny/lightline.vim'     " 状态栏
call plug#end()

" 快捷键配置
nmap <C-n> :NERDTreeToggle<CR>   " Ctrl+n 打开/关闭文件树
nmap <C-p> :Files<CR>            " Ctrl+p 调用 fzf 查找文件
```

- **插件管理**：上面的配置中使用了 `vim-plug` 插件管理器，需先安装 [vim-plug](https://github.com/junegunn/vim-plug)。
- **fzf**：安装 `fzf` 终端模糊查找工具，提供文件搜索等便捷功能。

### 6.2 Bash 配置

在 `~/.bashrc` 中添加一些个性化配置，提升日常使用的便利性。

#### 基本 `.bashrc` 配置

```bash
# 彩色命令提示符
PS1='\[\e[1;32m\]\u@\h \[\e[1;34m\]\w\[\e[0m\] \$ '

# 常用别名
alias ll='ls -la --color=auto'         # 长列表显示
alias grep='grep --color=auto'         # 高亮显示搜索结果
alias ..='cd ..'                       # 返回上级目录
alias h='history'                      # 快捷查看历史命令
alias update='sudo apt update && sudo apt upgrade -y'  # 一键更新系统

# Git 状态快捷提示
parse_git_branch() {
  git branch 2> /dev/null | grep '*' | sed 's/* //'
}
export PS1="\[\e[32m\]\u@\h:\[\e[33m\]\w\[\e[36m\]\$(parse_git_branch)\[\e[0m\] $ "

# 设置命令历史
export HISTSIZE=10000                   # 增加历史命令数量
export HISTFILESIZE=20000               # 增加命令历史文件大小
export HISTCONTROL=ignoredups:ignorespace # 忽略重复命令和前导空格的命令
```

- **Git 分支提示**：`parse_git_branch` 函数会在命令提示符上显示当前 Git 分支，便于快速查看当前所在的分支。
- **命令历史控制**：`HISTCONTROL` 可以忽略重复和以空格开头的命令，方便整理历史记录。

### 6.3 Zsh 配置

Zsh 是一个更强大的 Shell，搭配 `oh-my-zsh` 可以获得丰富的插件和主题支持。

#### 安装 `oh-my-zsh`

安装 `zsh` 和 `oh-my-zsh`：

```bash
sudo apt install -y zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

#### 基本 `.zshrc` 配置

在 `~/.zshrc` 中添加以下配置来个性化 `zsh`：

```bash
# 基础设置
export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="agnoster"              # 使用 agnoster 主题，显示简洁的 Git 信息
plugins=(git z zsh-autosuggestions zsh-syntax-highlighting)

# 自定义别名
alias ll='ls -la --color=auto'
alias gs='git status'
alias gc='git commit -m'
alias gl='git log --oneline --graph --decorate'

# 添加路径
export PATH="$HOME/bin:/usr/local/bin:$PATH"

# 自动建议与语法高亮插件
source $ZSH/oh-my-zsh.sh
source /usr/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
source /usr/share/zsh-autosuggestions/zsh-autosuggestions.zsh

# Git 分支提示
autoload -U colors && colors
parse_git_branch() {
  git branch 2> /dev/null | grep '*' | sed 's/* //'
}
PROMPT='%{$fg[green]%}%n@%m %{$fg[blue]%}%~ %{$fg[yellow]%}$(parse_git_branch) %{$reset_color%}$ '
```

- **主题选择**：`oh-my-zsh` 自带丰富的主题，`agnoster` 是一个简洁且功能强大的主题，显示 Git 状态信息。
- **插件**：`zsh-autosuggestions` 和 `zsh-syntax-highlighting` 提供命令自动建议和语法高亮，提升使用体验。

### 6.4 Tmux 配置

Tmux 是一个终端复用器，便于管理多个终端窗口。

#### 基本 `.tmux.conf` 配置

在 `~/.tmux.conf` 中添加以下内容，便于快速切换窗口、调整分割布局等：

```bash
# 设置前缀键为 Ctrl+a
unbind C-b
set -g prefix C-a
bind C-a send-prefix

# 分割窗口
bind | split-window -h
bind - split-window -v

# 调整窗口
bind -r h resize-pane -L 2
bind -r j resize-pane -D 2
bind -r k resize-pane -U 2
bind -r l resize-pane -R 2

# 状态栏设置
set -g status-bg colour235
set -g status-fg white
set -g status-left "#[fg=green]#S #[default]"
set -g status-right "#[fg=cyan]%Y-%m-%d %H:%M#[default]"

# 窗口切换
bind -n C-Left select-pane -L
bind -n C-Right select-pane -R
bind -n C-Up select-pane -U
bind -n C-Down select-pane -D
```

- **快捷键配置**：将 `prefix` 键更改为 `Ctrl+a`，方便使用。
- **状态栏**：在状态栏显示会话名称和当前时间，方便快速查看。

### 6.5 常用别名和快捷命令

#### 别名配置示例

在 `~/.bashrc` 或 `~/.zshrc` 中添加一些常用别名，加快日常操作：

```bash
alias c='clear'                        # 清屏
alias py='python3'                     # 快捷调用 Python
alias myip="curl http://ipecho.net/plain; echo"  # 查看外网 IP
alias reload='source ~/.bashrc'        # 重新加载配置文件
alias dush="du -sh * | sort -h"        # 按大小列出当前目录内容
```

这些配置可以帮助你创建一个高效的个性化环境，提升日常操作的便利性和工作效率。

## 7. 文件整理

在 Ubuntu 中，默认的用户目录（`~/`）下包含一些预设的文件夹，用于存放不同类型的文件。根据这些预设，我们可以再创建一些新的文件夹来组织个人数据、项目和软件源码，帮助保持文件结构的整洁。

### 7.1 Ubuntu 默认文件夹说明

Ubuntu 的用户主目录（`~/`）包含以下一些默认文件夹：

- **Desktop**：存放桌面文件或快捷方式的文件夹，对应桌面图标。
- **Documents**：存放各类文档、文字处理文件等，适合存放日常使用的文件。
- **Downloads**：默认的下载文件夹，适合存放从浏览器或其他软件下载的文件。
- **Music**：默认的音乐文件夹，可以存放音频文件。
- **Pictures**：图片文件夹，适合存放照片、截图等。
- **Videos**：视频文件夹，适合存放各类视频文件。

这些文件夹在系统内有特殊的图标显示，便于识别和管理。

### 7.2推荐新建的文件夹结构

在默认文件夹之外，你可以根据文件类型和使用需求，在主目录下新建一些文件夹，以便更清晰地组织文件和项目。以下是一些推荐的文件夹结构和用途：

#### 1. **projects**（项目文件夹）

存放所有的个人项目、开发项目等，便于集中管理开发工作。

```bash
mkdir ~/projects
```

可以根据项目类型进一步分文件夹：

- `~/projects/web`：存放 Web 开发项目。
- `~/projects/data`：存放数据分析、机器学习等项目。
- `~/projects/automation`：存放自动化脚本或工具项目。

#### 2. **workspace**（工作区文件夹）

存放日常办公、工作相关的文件，比如办公文档、备忘录等。

```bash
mkdir ~/workspace
```

可以细分一些文件夹，例如：

- `~/workspace/reports`：存放工作报告。
- `~/workspace/references`：存放参考文档和资料。
- `~/workspace/todo`：存放日常任务清单和工作记录。

#### 3. **src**（源码文件夹）

存放从 GitHub、GitLab 等获取的源码，便于集中管理安装和测试的软件或库的源码。

```bash
mkdir ~/src
```

可以根据来源或用途进行分类：

- `~/src/github`：存放从 GitHub 克隆的代码仓库。
- `~/src/libraries`：存放一些外部库的源码。
- `~/src/tests`：测试代码、示例代码。

#### 4. **scripts**（脚本文件夹）

存放自定义脚本、日常自动化脚本等。常用于自动化任务，如批处理文件、Shell 脚本等。

```bash
mkdir ~/scripts
```

- `~/scripts/backup`：备份脚本。
- `~/scripts/cleanup`：系统清理脚本。
- `~/scripts/automation`：其他日常自动化任务的脚本。

#### 5. **virtualenvs**（Python 虚拟环境）

如果有多个 Python 项目，使用虚拟环境隔离依赖。建议将所有虚拟环境集中存放到一个文件夹中。

```bash
mkdir ~/virtualenvs
```

使用 `virtualenv` 或 `conda` 创建的 Python 虚拟环境可以存放在此目录中：

```bash
python3 -m venv ~/virtualenvs/my_project_env
```

#### 6. **notes**（笔记和学习资料）

用于存放个人笔记、学习资料等，可以包括 Markdown 笔记或手册。

```bash
mkdir ~/notes
```

- `~/notes/linux`：存放 Linux 学习笔记。
- `~/notes/python`：Python 学习笔记。
- `~/notes/algorithms`：算法和数据结构的笔记。

#### 7. **archives**（归档文件夹）

存放需要归档的文件，或者较少使用的旧文件。建议按时间或类别存放。

```bash
mkdir ~/archives
```

可以按年份分目录：

- `~/archives/2023`
- `~/archives/2022`

### 7.3 文件分类存放建议

根据上述文件夹结构，不同类型的文件可以有以下存放建议：

- **软件安装源码**：放在 `~/src` 下，可以按项目来源分类。例如，GitHub 上的项目可以放在 `~/src/github`，外部库源码可以放在 `~/src/libraries`。

- **文档**：日常办公文档或工作相关的文件，建议放在 `~/workspace` 中。可以根据内容进行细分，比如 `~/workspace/reports` 用于报告，`~/workspace/references` 存放参考资料。

- **项目文件**：所有开发项目文件都可以放在 `~/projects` 文件夹中，并按照项目类型（如 `web`、`data`）分类。如果是代码项目，可以直接在此目录中初始化 Git 仓库。

- **脚本和工具**：自定义脚本存放在 `~/scripts` 文件夹下，以便快速查找和运行。可以把路径添加到 `PATH` 环境变量中，便于在任何位置运行脚本。

- **归档文件**：对于不常用或需要备份的文件，建议放在 `~/archives` 文件夹下，并按年份或类型分类，以便后续查找。

### 7.4 快捷方式和环境变量配置

#### 1. 将常用文件夹添加到 PATH

可以将 `~/scripts` 文件夹加入到 `PATH` 环境变量，以便快速调用其中的脚本：

在 `~/.bashrc` 或 `~/.zshrc` 中添加以下内容：

```bash
export PATH="$PATH:$HOME/scripts"
```

保存并执行 `source ~/.bashrc` 使配置生效。

#### 2. 为常用目录创建快捷方式

在主目录中创建软链接，便于快速访问文件夹：

```bash
ln -s ~/projects ~/p
ln -s ~/src ~/s
ln -s ~/workspace ~/w
```

这样，你可以直接输入 `cd ~/p` 快速进入 `projects` 文件夹，提升操作效率。

## 8. 配置备份和同步

- **设置备份计划**：使用 `rsync` 或 `cron` 定期备份重要文件和配置。

  ```bash
  crontab -e
  # 添加以下行，每天备份一次 dotfiles 目录
  0 2 * * * tar czvf ~/backup/dotfiles_backup_$(date +\%F).tar.gz ~/dotfiles
  ```

- **文件同步**：可以使用工具（如 Nextcloud 或 Syncthing）同步特定文件夹到云端，保持多台设备的文件一致。

## 9. 记录系统配置信息

为了方便未来重装或迁移，记录安装步骤和配置文件列表。可以创建一个 Markdown 文件 `setup.md`，记录所有配置和安装步骤。

完成以上配置后，你的 Linux 环境将更加稳定、易用并且便于迁移。通过版本管理、脚本化安装和备份同步，你的工作环境可以随时在不同系统上轻松恢复，节省未来的维护成本。
