# 重装ysyx

## 1. init 安装设置环境变量

```bash
cd ysyx-workbench
git branch -m master

bash init.sh npc

bash init.sh nvboard

bash init.sh nemu

bash init.sh abstract-machine

source ~/.bashrc

echo "
$NPC_HOME 
$NEMU_HOME
$NVBOARD_HOME
$AM_HOME"
```

## 2. [安装verilator v5.008](https://verilator.org/guide/latest/install.html)

[or](https://soc.ustc.edu.cn/CECS/lab0/verilator/)

```bash
# Prerequisites:
sudo apt-get install git help2man perl python3 make autoconf g++ flex bison ccache
sudo apt-get install libgoogle-perftools-dev numactl perl-doc
sudo apt-get install libfl2  # Ubuntu only (ignore if gives error)
sudo apt-get install libfl-dev  # Ubuntu only (ignore if gives error)
sudo apt-get install zlibc zlib1g zlib1g-dev  # Ubuntu only (ignore if gives error)

git clone https://github.com/verilator/verilator   # Only first time

# Every time you need to build:
unsetenv VERILATOR_ROOT  # For csh; ignore error if on bash
unset VERILATOR_ROOT  # For bash
cd verilator
git pull         # Make sure git repository is up-to-date
git tag          # See what versions exist
#git checkout master      # Use development branch (e.g. recent bug fixes)
#git checkout stable      # Use most recent stable release
#git checkout v{version}  # Switch to specified release version

autoconf         # Create ./configure script
./configure      # Configure and create Makefile
make -j `nproc`  # Build Verilator itself (if error, try just 'make')
sudo make install

verilator --version
```

## 3.波形查看工具

```bash
apt-get install gtkwave
```

## 4.评估电路综合后的时序

- [开源RTL综合器yosys](https://yosyshq.net/yosys)

在 Ubuntu 上安装 Yosys 有几种方式，包括使用 OSS CAD Suite 或直接从源代码构建。以下是详细的步骤：

### 方法一：使用 OSS CAD Suite 安装

1. **下载 OSS CAD Suite**：访问 [OSS CAD Suite 的 GitHub 发布页](https://github.com/YosysHQ/oss-cad-suite-build/releases)。

2. **解压缩**：

   ```bash
   tar -xvzf oss-cad-suite-linux-x64-<版本号>.tar.gz
   ```

3. **设置环境变量**：将 `oss-cad-suite` 路径加入到系统路径中。

   ```bash
   echo 'export PATH=$PATH:/path/to/oss-cad-suite/bin' >> ~/.bashrc
   source ~/.bashrc
   ```

### 方法二：使用 Ubuntu 包管理器安装

在 Ubuntu 软件库中可以找到 Yosys，直接使用 `apt` 安装：

```bash
sudo apt update
sudo apt install yosys
```

### 方法三：从源代码构建 ⬅️ ⬅️

#### 1. 安装构建依赖项

   运行以下命令安装所需的工具和库：

   ```bash
sudo apt-get install build-essential clang lld bison flex \
    libreadline-dev gawk tcl-dev libffi-dev git \
    graphviz xdot pkg-config python3 libboost-system-dev \
    libboost-python-dev libboost-filesystem-dev zlib1g-dev
   ```

#### 2. 克隆 Yosys 源代码

   使用 Git 克隆 Yosys 源代码库：

   ```bash
git clone https://github.com/YosysHQ/yosys.git
cd yosys
   ```

#### 3. 配置编译

   你可以选择 `clang` 或 `gcc` 作为编译器，运行以下命令来配置：

   ```bash
make config-clang  # 使用 clang
# 或者
make config-gcc    # 使用 gcc
   ```

> 在构建 Yosys 时如遇到错误表明缺少 `abc` 子模块和 `cxxopts` 库。可以通过以下步骤解决这些问题：
>
> ### 1. 更新 Git 子模块
>
> `Yosys` 使用 `abc` 作为逻辑综合引擎，需要初始化并更新 `abc` 子模块。执行以下命令：
>
> ```bash
> git submodule update --init --recursive
> ```
>
> ### 2. 安装 `cxxopts` 库
>
> `cxxopts` 是一个 C++ 命令行选项解析库。如果依旧缺少可以通过以下命令在 Ubuntu 上安装它：
>
> ```bash
> sudo apt-get install libsdl2-dev libsdl2-ttf-dev libsdl2-image-dev libsdl2-mixer-dev
> ```
>
> ### 3. 重新运行构建
>
> 更新子模块和安装缺失的库后，重新运行构建命令：
>
> ```bash
> make -j$(nproc)
> ```

#### 4. 编译 Yosys

   执行 `make` 命令来开始编译：

   ```bash
make
   ```

#### 5. 安装 Yosys

   编译完成后，使用以下命令进行安装：

   ```bash
sudo make install
   ```

### 运行测试

确保 `iverilog` 和 `gawk` 已安装后，执行以下命令来运行测试：

```bash
make test
```

### 快速使用 Yosys

Yosys 提供了交互式命令行工具，你可以通过以下命令启动 Yosys 的交互式 shell：

```bash
yosys
```

在交互式 shell 中，你可以使用 Verilog 文件执行合成任务。

### [iSTA](https://github.com/OSCC-Project/iEDA/tree/master/src/operation/iSTA)

通过以下命令克隆该项目

```bash
git clone git@github.com:OSCPU/yosys-sta.git
```

**阅读README**

## Verilog插件配置

参见[Verilog插件配置]

## PA0

PA 需要以下工具：

```text
sudo apt-get install build-essential    # build-essential packages, include binary utilities, gcc, make, and so on
sudo apt-get install man                # on-line reference manual
sudo apt-get install gcc-doc            # on-line reference manual for gcc
sudo apt-get install gdb                # GNU debugger
sudo apt-get install git                # revision control system
sudo apt-get install libreadline-dev    # a library used later
sudo apt-get install libsdl2-dev        # a library used later #2.0.20

sudo apt install libsdl2-image-dev
sudo apt install libsdl2-ttf-dev  #2.0.18 在arm版Ubuntu上要手动从源码安装 以及libsdl2-dev 2.0.20
```

```bash
apt-get install vim
apt-get install tmux
```

## PA1

```bash
sudo apt-get install ccache
```

### 1. 安装 `ccache`

在终端中运行以下命令来安装 `ccache`：

```bash
sudo apt-get install ccache
```

### 2. 配置 `ccache`

#### 确认编译器路径

使用 `which` 命令查看编译器的位置，例如：

```bash
which gcc
```

通常会输出 `/usr/bin/gcc`，这表示执行 `gcc` 时实际运行的是 `/usr/bin/gcc`。

#### 配置环境变量

为了让 `ccache` 在编译时缓存结果，需要将其添加到环境变量。打开 `~/.bashrc` 文件：

```bash
vim ~/.bashrc
```

在文件末尾添加如下行：

```bash
export PATH="/usr/lib/ccache:$PATH"
```

这将确保在运行 `gcc` 时优先使用 `ccache` 提供的缓存功能。

#### 刷新环境变量

保存 `.bashrc` 文件并让改动立即生效：

```bash
source ~/.bashrc
```

#### 验证配置

再次运行 `which gcc`，应看到输出 `/usr/lib/ccache/gcc`。如果输出符合预期，说明 `ccache` 已成功配置。

## NEMU

```bash
make menuconfig
make run
```
