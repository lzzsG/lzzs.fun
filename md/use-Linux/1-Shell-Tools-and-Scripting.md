# Shell 及其常用命令与组合

Shell 是一种命令行界面，它允许用户通过输入命令与操作系统进行交互。常见的 Shell 包括 Bash（Bourne Again SHell）、Zsh 和 Fish 等。Shell 不仅支持命令执行，还能进行脚本编程，自动化任务。

本文包括  [#常用 Shell 命令](#heading-7) 和 [#常用 Shell 命令的扩展组合用法](#heading-70) 。

### **索引**

| 序号 | 命令 | 描述 |
| ---- | ---- | ---- |
| 1    | [pwd](#heading-8) | 显示当前工作目录的路径 |
| 2    | [ls](#heading-9) | 列出目录内容 |
| 3    | [cd](#heading-10) | 改变当前工作目录 |
| 4    | [mkdir](#heading-11) | 创建新目录 |
| 5    | [rmdir](#heading-12) | 删除空目录 |
| 6    | [rm](#heading-13) | 删除文件或目录 |
| 7    | [cp](#heading-14) | 复制文件或目录 |
| 8    | [mv](#heading-15) | 移动或重命名文件或目录 |
| 9    | [echo](#heading-16) | 输出文本或变量的值 |
| 10   | [man](#heading-17) | 查看命令的手册页 |
| 11   | [touch](#heading-18) | 创建空文件或更新文件的时间戳 |
| 12   | [chmod](#heading-19) | 更改文件权限 |
| 13   | [cat](#heading-20) | 显示文件内容 |
| 14   | [less](#heading-21) | 分页查看文件内容 |
| 15   | [head](#heading-22) | 显示文件的前几行 |
| 16   | [tail](#heading-23) | 显示文件的最后几行 |
| 17   | [grep](#heading-24) | 搜索文本中的特定模式 |
| 18   | [find](#heading-25) | 查找文件和目录 |
| 19   | [ps](#heading-26) | 显示当前运行的进程 |
| 20   | [kill](#heading-27) | 终止进程 |
| 21   | [history](#heading-28) | 显示命令历史 |
| 22   | [clear](#heading-29) | 清除终端屏幕内容 |
| 23   | [echo $VARIABLE](#heading-30) | 显示环境变量的值 |
| 24   | [tar](#heading-31) | 打包和压缩文件 |
| 25   | [zip 和 unzip](#heading-32) | 压缩和解压缩文件 |
| 26   | [wget](#heading-33) | 从网络下载文件 |
| 27   | [curl](#heading-34) | 传输数据或测试 API |
| 28   | [rsync](#heading-35) | 高效同步文件或目录 |
| 29   | [alias](#heading-36) | 创建命令别名 |
| 30   | [unalias](#heading-37) | 删除命令别名 |
| 31   | [export](#heading-38) | 设置环境变量 |
| 32   | [man](#heading-39) | 查看命令手册 |
| 33   | [diff](#heading-40) | 比较两个文件的差异 |
| 34   | [sort](#heading-41) | 排序文件内容 |
| 35   | [uniq](#heading-42) | 删除重复的行 |
| 36   | [awk](#heading-43) | 文本处理工具，适合结构化数据 |
| 37   | [sed](#heading-44) | 流编辑器，用于文本替换 |
| 38   | [grep -r](#heading-45) | 递归搜索文件内容 |
| 39   | [df](#heading-46) | 显示磁盘使用情况 |
| 40   | [du](#heading-47) | 显示目录或文件的磁盘占用情况 |
| 41   | [top](#heading-48) | 实时显示系统进程状态 |
| 42   | [htop](#heading-49) | 更友好的 `top` 命令界面 |
| 43   | [ping](#heading-50) | 测试与远程主机的网络连接 |
| 44   | [crontab](#heading-51) | 定时任务管理 |
| 45   | [at](#heading-52) | 设置一次性定时任务 |
| 46   | [jobs](#heading-53) | 查看当前 Shell 中的后台任务 |
| 47   | [bg](#heading-54) | 将暂停的任务放到后台运行 |
| 48   | [fg](#heading-55) | 将后台任务移到前台运行 |
| 49   | [nohup](#heading-56) | 使任务在退出 Shell 后继续运行 |
| 50   | [screen](#heading-57) | 创建多个虚拟终端会话 |
| 51   | [tmux](#heading-58) | 类似 `screen`，更强大的分屏终端 |
| 52   | [ln](#heading-59) | 创建文件或目录的链接 |
| 53   | [sudo](#heading-60) | 以超级用户身份执行命令 |
| 54   | [apt` 和 `yum](#heading-61) | Linux 包管理工具 |
| 55   | [uptime](#heading-62) | 显示系统的运行时间 |
| 56   | [shutdown](#heading-63) | 关机或重启系统 |
| 57   | [reboot](#heading-64) | 立即重启系统 |
| 58   | [passwd](#heading-65) | 修改用户密码 |
| 59   | [which](#heading-66) | 查找命令的路径 |
| 60   | [who](#heading-67) | 显示当前登录的用户信息 |
| 61   | [sleep](#heading-68) | 暂停命令执行指定的时间 |
| 62   | [time](#heading-69) | 测量命令的执行时间 |

> ### `man` 和 `tldr`
>
> 在 Shell 操作中，我们经常会使用各种命令来处理文件、管理系统、进行文本处理等。学习和掌握这些命令的详细用法至关重要。为了帮助用户快速了解和掌握命令的使用，以下是两种非常实用的工具：`man` 和 `tldr`。
>
> ### `man` 命令
>
> `man`（manual）是 Linux 中的传统命令，显示系统中各个命令的手册页。使用 `man` 命令可以详细了解每个命令的所有参数、选项以及功能解释。
>
> **使用示例**
>
> ```bash
> man sed  # 查看 sed 命令的详细用法
> ```
>
> 通过 `man`，你可以获取某个命令的完整信息。手册页往往非常详细，对于想了解命令所有细节的用户非常有帮助，但对于初学者或需要快速查找某个命令常用操作的人来说，可能显得过于冗长。
>
> ### `tldr` 命令
>
> `tldr`（Too Long; Didn't Read）是一个简洁的命令帮助工具，它提供了常见命令的简单示例和快速参考信息，适合那些只需要快速了解命令如何使用的人。相比 `man` 命令，`tldr` 更加简洁明了，只提供最常用的操作示例，非常适合在日常开发中快速查询。
>
> **使用示例**
>
> ```bash
> tldr sed  # 快速查看 sed 命令的常用示例
> ```
>
> `tldr` 工具提供了 `sed` 命令的常见用法示例，例如替换文本、删除某行、插入文本等操作。这种简明的格式适合日常开发中快速查看命令的常用操作，而不需要去翻阅冗长的手册。
>
> ### 如何安装 `tldr`
>
> 在大多数 Linux 发行版上可以通过以下命令安装 `tldr`：
>
> ```bash
> sudo apt install tldr  # Ubuntu/Debian 系统
> sudo yum install tldr  # CentOS/Fedora 系统
> brew install tldr      # macOS 系统
> ```
>
> 建议在编写和使用 Shell 脚本或命令行操作时，养成使用 `man` 或 `tldr` 的习惯，这样可以迅速提升效率并更好地理解每个命令的作用。
>
> [tldr 在线页面](https://tldr.inbrowser.app/)

---

## 一、常用 Shell 命令

### 1. **pwd**  

   用途：显示当前工作目录的完整路径。  
   示例：  

   ```bash
   pwd
   ```

### 2. **ls**  

   用途：列出当前目录中的文件和文件夹。  
   常用选项：  

- `-l`：以详细格式列出。
- `-a`：显示所有文件，包括隐藏文件。
      示例：  

   ```bash
   ls -la
   ```

### 3. **cd**  

   用途：改变当前工作目录。  
   示例：  

   ```bash
   cd /path/to/directory
   ```

### 4. **mkdir**  

   用途：创建一个新目录。  
   示例：  

   ```bash
   mkdir new_directory
   ```

### 5. **rmdir**  

   用途：删除一个空目录。  
   示例：  

   ```bash
   rmdir empty_directory
   ```

### 6. **rm**  

   用途：删除文件或目录。  
   常用选项：  

- `-r`：递归删除目录及其内容。
      示例：  

   ```bash
   rm -r directory_name
   ```

### 7. **cp**  

   用途：复制文件或目录。  
   常用选项：  

- `-r`：递归复制目录。
      示例：  

   ```bash
   cp file.txt /path/to/destination/
   ```

### 8. **mv**  

   用途：移动或重命名文件和目录。  
   示例：  

   ```bash
   mv old_name.txt new_name.txt
   ```

### 9. **echo**  

   用途：显示一段文本或变量的值。  
   示例：  

   ```bash
   echo "Hello, World!"
   ```

### 10. **man**  

用途：查看命令的手册页，了解其用法和选项。  
示例：  

    ```bash
    man ls
    ```

### 11. touch  

用途：创建一个新的空文件，或更新现有文件的最后修改时间。  
示例：  

```bash
touch new_file.txt
```

### 12. chmod  

用途：更改文件或目录的权限。权限分为读（r）、写（w）和执行（x）。  
常用格式：  

- `chmod [权限设置] [文件名]`  
示例：  

```bash
chmod 755 script.sh
```

在这个示例中，`755` 表示拥有者有读、写、执行权限，用户组和其他用户有读和执行权限。

**`chmod` （进阶用法）**  

除了之前提到的数值方式，还可以使用字母表示法修改权限：  

- `u`：表示文件的拥有者（user）。  
- `g`：表示文件的用户组（group）。  
- `o`：表示其他人（others）。  
- `a`：表示所有用户（all）。

示例：  

```bash
chmod u+x script.sh  # 给文件拥有者添加执行权限
chmod a-w file.txt  # 移除所有用户的写权限
```

### 13. cat  

用途：连接文件并输出其内容。常用于查看文件内容。  
示例：  

```bash
cat file.txt
```

### 14. less  

用途：分页查看文件内容，可以方便地向上或向下滚动。  
示例：  

```bash
less file.txt
```

### 15. head  

用途：显示文件的前几行（默认是10行）。  
示例：  

```bash
head file.txt
```

### 16. tail  

用途：显示文件的最后几行（默认是10行）。常用于查看日志文件的最新记录。  
示例：  

```bash
tail file.txt
```

### 17. grep  

用途：在文件中搜索特定模式。常与其他命令结合使用。  
示例：  

```bash
grep "搜索词" file.txt
```

### 18. find  

用途：在目录中查找文件。  
格式：  

```bash
find [路径] -name [文件名]
```

示例：  

```bash
find /home/user -name "*.txt"
```

### 19. ps  

用途：查看当前运行的进程。  
常用选项：  

- `aux`：显示所有进程的信息。  
示例：  

```bash
ps aux
```

### 20. kill  

用途：终止进程。  
格式：  

```bash
kill [进程ID]
```

示例：  

```bash
kill 1234
```

### 21. history  

用途：显示命令历史，可以查看之前执行过的命令。  
示例：  

```bash
history
```

### 22. clear  

用途：清除终端屏幕上的所有内容。  
示例：  

```bash
clear
```

### 23. echo $VARIABLE  

用途：显示环境变量的值。  
示例：  

```bash
echo $HOME
```

### 24. tar  

用途：打包和压缩文件。常用于备份和归档。  
常用选项：  

- `-c`：创建新的档案。
- `-x`：解压缩档案。
- `-f`：指定档案文件名。
- `-z`：使用 gzip 压缩。

示例：  
创建一个 tar 包：  

```bash
tar -czf archive.tar.gz /path/to/directory
```

解压缩 tar 包：  

```bash
tar -xzf archive.tar.gz
```

### 25. zip 和 unzip  

用途：压缩和解压缩文件。  
示例：  
压缩文件：  

```bash
zip archive.zip file1.txt file2.txt
```

解压缩文件：  

```bash
unzip archive.zip
```

### 26. wget  

用途：从网络上下载文件。  
示例：  

```bash
wget http://example.com/file.zip
```

### 27. curl  

用途：与服务器进行数据交换，常用于测试 API。  
示例：  

```bash
curl -O http://example.com/file.zip
```

### 28. rsync  

用途：高效地同步文件和目录，支持增量备份。  
示例：  

```bash
rsync -avz /local/path/ user@remote_host:/remote/path/
```

### 29. alias  

用途：创建命令的别名，以简化输入。  
示例：  

```bash
alias ll='ls -la'
```

### 30. unalias  

用途：删除命令别名。  
示例：  

```bash
unalias ll
```

### 31. export  

用途：设置环境变量，使其对子进程可用。  
示例：  

```bash
export PATH=$PATH:/new/directory
```

### 32. man  

用途：查看命令的手册，了解详细用法。  
示例：  

```bash
man chmod
```

### 33. diff  

用途：比较两个文件的不同之处。  
示例：  

```bash
diff file1.txt file2.txt
```

### 34. sort  

用途：对文件中的行进行排序。  
示例：  

```bash
sort file.txt
```

### 35. uniq  

用途：去除文件中的重复行。常与 `sort` 命令结合使用。  
示例：  

```bash
sort file.txt | uniq
```

### 36. awk  

用途：强大的文本处理工具，常用于数据分析和报告生成。  
示例：  

```bash
awk '{print $1}' file.txt  # 打印每行的第一列
```

**`awk`（进阶）**

`awk` 是一个非常强大的文本处理工具，尤其在处理结构化数据时非常有用。  

- 打印文件的第一列：  

```bash
awk '{print $1}' file.txt
```

- 计算数值总和：  

```bash
awk '{sum+=$1} END {print sum}' numbers.txt
```

### 37. sed  

用途：流编辑器，适合处理和转换文本数据。  
示例：  

```bash
sed 's/old/new/g' file.txt  # 将文件中的 old 替换为 new
```

### 38. grep -r  

用途：递归搜索目录中的文件。  
示例：  

```bash
grep -r "搜索词" /path/to/directory
```

### 39. `df`  

用途：显示文件系统的磁盘空间使用情况。  
常用选项：  

- `-h`：以人类可读的格式显示（例如，MB、GB）。  
示例：  

```bash
df -h
```

### 40. `du`  

用途：显示目录或文件所占用的磁盘空间。  
常用选项：  

- `-h`：以人类可读的格式显示。  
- `-s`：只显示总计。  
示例：  

```bash
du -sh /path/to/directory
```

**`df` 和 `du`（进阶用法）**  

`df` 和 `du` 的组合使用可以更加详细地分析磁盘使用情况。  
示例：  

```bash
df -h | grep /dev/sda1
```

```bash
du -sh * | sort -h  # 查看当前目录下的各文件占用空间并排序
```

### 41. `top`  

用途：实时显示系统进程和资源使用情况，如 CPU 和内存。  
示例：  

```bash
top
```

### 42. `htop`  

用途：类似于 `top`，但提供更友好的界面。需要单独安装。  
示例：  

```bash
htop
```

### 43. `ping`  

用途：测试与远程主机的网络连通性。  
示例：  

```bash
ping google.com
```

### 44 `crontab`  

用途：设置定时任务，自动执行命令或脚本。  
示例：  
编辑 `crontab` 文件：  

```bash
crontab -e
```

添加定时任务：  

```bash
# 每天凌晨 2 点执行 backup.sh
0 2 * * * /path/to/backup.sh
```

### 45. `at`  

用途：安排在指定时间运行一次性任务。  
示例：  

```bash
echo "backup.sh" | at 02:00
```

### 46. `jobs`  

用途：查看当前 Shell 中的后台任务。  
示例：  

```bash
jobs
```

### 47. `bg`  

用途：将暂停的任务放到后台执行。  
示例：  

```bash
bg %1
```

### 48. `fg`  

用途：将后台任务移到前台继续执行。  
示例：  

```bash
fg %1
```

### 49. `nohup`  

用途：使任务在退出 Shell 后继续运行。  
示例：  

```bash
nohup ./script.sh &
```

### 50. `screen`  

用途：在多个虚拟终端中运行程序，允许断开会话后任务继续执行。  
示例：  
启动一个新的 `screen` 会话：  

```bash
screen
```

### 51. `tmux`  

用途：类似于 `screen`，但功能更强大，支持分屏操作。  
示例：  
启动一个新的 `tmux` 会话：  

```bash
tmux
```

### 52. `ln`  

用途：创建文件或目录的链接。  
常用选项：  

- `-s`：创建符号链接（软链接）。  
示例：  
创建符号链接：  

```bash
ln -s /path/to/original /path/to/link
```

### 53. `sudo`  

用途：以超级用户身份执行命令。  
示例：  

```bash
sudo apt update
```

### 54. `apt` 和 `yum`  

用途：Linux 系统下的软件包管理工具，分别适用于 Debian 系和 Red Hat 系。  
示例（Debian/Ubuntu）：  

```bash
sudo apt install package_name
```

示例（CentOS/Fedora）：  

```bash
sudo yum install package_name
```

### 55. `uptime`  

用途：显示系统运行时间和负载情况。  
示例：  

```bash
uptime
```

### 56. `shutdown`  

用途：关机或重启系统。  
示例：  
定时关机（如在 10 分钟后）：  

```bash
shutdown +10
```

立即重启：  

```bash
shutdown -r now
```

### 57. `reboot`  

用途：立即重启系统。  
示例：  

```bash
reboot
```

### 58. `passwd`  

用途：更改用户密码。  
示例：  

```bash
passwd
```

### 59. `which`

用途：显示指定命令的可执行文件路径。常用于检查某个命令是否安装以及安装路径。  
示例：  

```bash
which python
```

### 60. `who`

用途：显示当前登录系统的所有用户信息。  
示例：  

```bash
who
```

### 61. `sleep`

用途：暂停命令执行指定的时间。  
示例：  
暂停 10 秒：  

```bash
sleep 10
```

### 62. `time`

用途：测量命令的执行时间。  
示例：  

```bash
time ls -l
```

---

## 二、常用 Shell 命令的扩展组合用法

Shell 提供了丰富的命令和工具，但它的真正威力体现在组合使用多个命令来处理复杂任务时。通过使用管道（`|`）、重定向（`>`、`>>`）以及脚本编写，用户可以将简单的命令组合在一起，完成自动化、批量处理等复杂的操作。

### 0. `|` （管道操作符）

`|` 是管道符号，用于将一个命令的输出传递给另一个命令作为输入。常用于将多个命令串联起来，形成一个处理链，逐步对数据进行处理。

#### 示例

```bash
ls | grep "txt"
```

这个命令会先使用 `ls` 列出当前目录的所有文件，并将结果通过管道 `|` 传递给 `grep`，查找文件名中包含 `"txt"` 的文件。

#### 常见用法

- 与 `grep` 结合搜索文本
- 与 `awk` 或 `sed` 结合进行文本处理

### 00. `>` （输出重定向）

`>` 是输出重定向符号，用于将命令的输出重定向到一个文件。如果文件已存在，会覆盖文件内容。

#### 示例

```bash
echo "Hello, World!" > output.txt
```

此命令会将 `"Hello, World!"` 写入到 `output.txt` 文件中。如果文件已存在，它将被覆盖。

#### 用法总结

- 将命令输出保存到文件。
- 覆盖文件内容。

### 000. `>>` （追加输出重定向）

`>>` 是追加输出重定向符号，与 `>` 类似，但不会覆盖文件内容，而是将输出追加到文件末尾。

#### 示例

```bash
echo "This is a new line" >> output.txt
```

此命令会将 `"This is a new line"` 追加到 `output.txt` 文件的末尾，而不会覆盖文件中的已有内容。

#### 用法总结

- 将命令输出追加到文件末尾。
- 不会覆盖文件。

### 1. `ls` + `grep`：过滤文件列表

我们可以使用 `grep` 对 `ls` 命令的输出进行过滤，找到特定的文件或目录。

```bash
ls -la | grep "filename"
```

在这个示例中，`ls -la` 列出所有文件和目录的详细信息，`grep "filename"` 只显示包含 "filename" 的文件或目录。

### 2. `find` + `xargs` + `rm`：批量删除指定类型文件

使用 `find` 搜索文件，然后通过 `xargs` 将找到的文件传递给 `rm` 来批量删除它们。

```bash
find . -name "*.log" | xargs rm
```

这里，`find . -name "*.log"` 找到当前目录及其子目录中的所有 `.log` 文件，`xargs` 将这些文件作为参数传递给 `rm` 命令来删除它们。

### 3. `grep` + `awk` + `sort`：从文件中提取、处理并排序数据

结合使用 `grep`、`awk` 和 `sort` 可以高效地处理文本数据。

```bash
grep "pattern" file.txt | awk '{print $2}' | sort
```

在这个组合中，`grep "pattern"` 先从 `file.txt` 中查找包含特定模式的行，`awk '{print $2}'` 提取每一行的第二列数据，最后 `sort` 对提取的内容进行排序。

### 4. `ps` + `grep` + `kill`：查找并杀死进程

先用 `ps` 命令列出所有正在运行的进程，然后通过 `grep` 找到特定进程，再用 `kill` 终止它。

```bash
ps aux | grep "process_name" | awk '{print $2}' | xargs kill
```

此命令组合中，`ps aux` 列出系统中的所有进程，`grep "process_name"` 查找特定的进程名，`awk '{print $2}'` 提取进程的 PID，最后 `xargs kill` 终止进程。

> `xargs` 是一个非常强大的工具，通常与其他命令配合使用。它能够将来自标准输入的输出转换为命令参数，并传递给指定的命令执行。

### 5. `du` + `sort` + `head`：查找占用空间最大的文件或目录

使用 `du` 来计算目录或文件占用的空间，然后通过 `sort` 排序，最后通过 `head` 显示占用空间最大的项。

```bash
du -sh * | sort -rh | head -n 10
```

这里，`du -sh *` 计算当前目录下所有文件和子目录的空间使用，`sort -rh` 以人类可读的格式按从大到小排序，`head -n 10` 则显示前 10 个占用空间最大的文件或目录。

### 6. `find` + `tar`：打包特定类型的文件

可以使用 `find` 找到符合条件的文件，并将这些文件传递给 `tar` 进行打包压缩。

```bash
find /path/to/search -name "*.txt" -print0 | tar --null -czvf archive.tar.gz --files-from -
```

这里，`find` 找到所有 `.txt` 文件，`-print0` 确保文件名中的空格得到正确处理，`tar --null` 与 `--files-from -` 配合使用，将这些文件打包为 `archive.tar.gz`。

### 7. `crontab` + Shell 脚本：定时任务自动执行

通过 `crontab` 定时执行某个 Shell 脚本，可以自动化一些任务。

首先，编写一个简单的备份脚本 `backup.sh`：

```bash
#!/bin/bash
tar -czf /path/to/backup/backup_$(date +\%Y\%m\%d).tar.gz /path/to/data
```

然后，将该脚本添加到 `crontab`，设置每天凌晨 2 点自动执行备份：

```bash
crontab -e
```

在 `crontab` 文件中添加如下行：

```bash
0 2 * * * /path/to/backup.sh
```

这将每天凌晨 2 点执行该备份脚本。

> **`$(date +\%Y\%m\%d)`** 是一个常见的 Shell 语法，用来获取并格式化当前日期，生成日期字符串。它主要由两部分组成：
>
> 1. **`$(...)`**：这是命令替换（Command Substitution）的语法，用于执行命令并将其输出结果返回。
> 2. **`date` 命令及其格式化参数**：`date` 是一个命令，用于显示或设置系统日期和时间。在这里，它用来生成格式化的日期字符串。
>
> ### 分解讲解
>
> #### 1. `$(...)`：命令替换
>
> - 在 Shell 脚本中，`$(command)` 表示命令替换，会先执行括号内的命令，然后将输出结果替换到该位置。可以把它看作是一种动态插值机制。
>
>   **示例**：
>
>   ```bash
>   echo "Current date is $(date)"
>   ```
>
>   这条命令会执行 `date` 命令，然后将 `date` 的输出（当前日期和时间）插入到 `echo` 中。
>
> #### 2. `date` 命令：获取当前日期和时间
>
> - `date` 命令用于显示当前的系统日期和时间。可以根据用户的需求使用不同的格式化选项，来显示日期和时间的不同部分。
>
>   **基本使用示例**：
>
>   ```bash
>   date
>   ```
>
>   输出示例：
>
>   ```
>   Tue Sep 26 14:30:00 UTC 2023
>   ```
>
> #### 3. 格式化日期输出：`+%Y%m%d`
>
> `date` 命令可以接受格式化选项，通过 `+` 来指定输出的格式。在 `+` 后面跟随不同的格式化符号，可以控制 `date` 命令输出的内容。
>
> - **`+%Y`**：表示四位数的年份，例如 `2023`。
> - **`+%m`**：表示两位数的月份，例如 `09`（表示九月）。
> - **`+%d`**：表示两位数的日期，例如 `26`（表示 26 号）。
>
> 因此，`date +%Y%m%d` 会返回当前的日期，格式为 `YYYYMMDD`。例如：
>
> ```bash
> date +%Y%m%d
> ```
>
> 输出示例：
>
> ```
> 20230926
> ```
>
> 这会显示当前的日期为 2023 年 9 月 26 日，且格式为四位数的年份、两位数的月份和两位数的日。
>
> #### 4. 为什么需要使用 `\%` ？
>
> 在你的原始示例 `$(date +\%Y\%m\%d)` 中，`\%` 前面的反斜杠（`\`）是用来转义百分号的。在某些场景下，`%` 符号可能被 Shell 解释为特殊字符，所以通过 `\%` 来确保百分号不会被误解析，传递给 `date` 命令。
>
> 不过，在大多数标准的 Bash 环境中，不需要对 `%` 进行转义，直接使用 `date +%Y%m%d` 即可正常工作。
>
> ### 示例
>
> 假设我们想将当前日期作为文件名的一部分来生成备份文件名：
>
> ```bash
> backup_filename="backup_$(date +%Y%m%d).tar.gz"
> echo $backup_filename
> ```
>
> 输出：
>
> ```
> backup_20230926.tar.gz
> ```
>
> 这个脚本使用了 `$(date +%Y%m%d)`，将当前日期插入到文件名中生成了 `backup_20230926.tar.gz` 文件名。
>
> ### 更多日期格式化选项
>
> - **`%H`**：小时（24 小时制），例如 `14`（表示下午两点）。
>
> - **`%M`**：分钟，例如 `30`（表示半小时）。
>
> - **`%S`**：秒，例如 `00`。
>
> - **`%F`**：完整日期格式，等价于 `+%Y-%m-%d`。
>
>   **示例**：
>
>   ```bash
>   date +%Y-%m-%d_%H-%M-%S
>   ```
>
>   输出示例：
>
>   ```
>   2023-09-26_14-30-00
>   ```
>
>   这会显示当前的日期和时间，格式为 `YYYY-MM-DD_HH-MM-SS`。
>
> ---
>
> ### `cron` 和 `crontab`（定时任务）
>
> #### `cron`
>
> `cron` 是 Linux 系统中的定时任务调度器，允许用户在指定的时间周期内自动执行某些任务。系统会根据预设的计划自动运行这些任务，非常适合定时备份、日志轮转、定时发送报告等任务。
>
> #### `crontab`
>
> `crontab` 是 `cron table` 的缩写，负责定义和管理用户的定时任务。每个用户都可以拥有自己的 `crontab` 文件，其中每一行定义一个任务的执行时间和需要执行的命令。
>
> #### 示例：编辑当前用户的 `crontab`
>
> ```bash
> crontab -e
> ```
>
> 可以通过这个命令打开编辑器，编写或修改定时任务。
>
> #### `cron` 表达式格式
>
> ```bash
> * * * * * command_to_be_executed
> ```
>
> 五个 `*` 代表以下五个时间字段，依次为：
>
> 1. 分钟（0-59）
> 2. 小时（0-23）
> 3. 日期（1-31）
> 4. 月份（1-12）
> 5. 星期（0-7，0 或 7 都表示星期日）
>
> #### 示例：`0 2 * * *`
>
> ```bash
> 0 2 * * * /path/to/backup.sh
> ```
>
> - 这个任务会在**每天凌晨 2 点**执行 `backup.sh` 脚本。
> - `0 2`：表示在 2:00 执行任务。
> - `* * *`：表示每天的日期、月份和星期。

### 8. `cat` + `tr` + `sort` + `uniq`：统计文件中单词的出现次数

这组命令可以读取文件，转换大小写，排序并去重，最后统计每个单词的出现次数。

```bash
cat file.txt | tr 'A-Z' 'a-z' | tr -c 'a-z' '\n' | sort | uniq -c | sort -nr
```

在这个示例中，`cat file.txt` 读取文件内容，`tr 'A-Z' 'a-z'` 将所有大写字母转换为小写字母，`tr -c 'a-z' '\n'` 将所有非字母字符替换为换行符，`sort` 对单词进行排序，`uniq -c` 统计每个单词的出现次数，`sort -nr` 按照出现次数从多到少排序。

> ### `tr` （字符替换）
>
> `tr`（translate）命令用于替换、删除或压缩文本中的字符。它通常从标准输入中读取数据，然后将指定的字符集替换为另一个字符集。
>
> #### 示例：将文本中的小写字母转换为大写字母
>
> ```bash
> echo "hello world" | tr 'a-z' 'A-Z'
> ```
>
> 输出为：
>
> ```
> HELLO WORLD
> ```
>
> #### 示例：删除字符串中的某些字符
>
> ```bash
> echo "hello 123 world" | tr -d '0-9'
> ```
>
> 输出为：
>
> ```
> hello  world
> ```
>
> #### 用法总结
>
> - 替换字符（如大小写转换）。
> - 删除特定字符（如删除数字或空格）。
>
> ---
>
> ### `uniq` （去除重复行）
>
> `uniq` 命令用于删除文件或输入中的相邻重复行。注意：`uniq` 只会删除连续的重复行，因此通常与 `sort` 结合使用，以确保相同的行相邻。
>
> #### 示例：删除重复的行
>
> ```bash
> sort file.txt | uniq
> ```
>
> 先通过 `sort` 对 `file.txt` 进行排序，然后使用 `uniq` 删除相邻的重复行。
>
> #### 示例：统计重复行的次数
>
> ```bash
> sort file.txt | uniq -c
> ```
>
> 输出的每一行会显示重复次数以及对应的文本内容。
>
> #### 用法总结
>
> - 删除相邻的重复行。
> - 统计重复行的出现次数。

### 9. `tail` + `grep` + `mail`：实时监控日志并发送邮件通知

结合 `tail` 和 `grep`，可以实时监控日志文件的变化，并根据条件发送电子邮件通知。

```bash
tail -f /var/log/syslog | grep --line-buffered "error" | mail -s "Error Found" user@example.com
```

在这个组合中，`tail -f` 实时监控系统日志文件，`grep "error"` 查找包含 "error" 的日志行，`mail` 命令将找到的错误信息发送到指定邮箱。

### 10. `rsync` + `ssh`：通过 SSH 进行文件同步

使用 `rsync` 配合 `ssh` 可以将本地文件或目录与远程服务器同步，常用于备份和文件分发。

```bash
rsync -avz -e ssh /local/directory/ user@remote_host:/remote/directory/
```

这里，`rsync -avz` 用于递归同步文件，`-e ssh` 指定通过 SSH 进行传输，`/local/directory/` 是本地的源目录，`user@remote_host:/remote/directory/` 是远程主机的目标目录。

### 11. `find` + `exec`：对搜索到的文件执行命令

使用 `find` 命令的 `-exec` 选项，可以对找到的文件执行任意命令。例如，查找并更改文件权限。

```bash
find /path/to/search -name "*.sh" -exec chmod +x {} \;
```

在这个示例中，`find` 找到所有 `.sh` 脚本文件，`-exec` 执行 `chmod +x` 命令给这些脚本添加执行权限，`{}` 代表找到的文件，`\;` 表示命令结束。

### 12. `tar` + `gzip` + `scp`：打包压缩并通过 SSH 传输文件

先使用 `tar` 打包并压缩文件，然后通过 `scp` 将其传输到远程服务器。

```bash
tar -czf - /path/to/directory | ssh user@remote_host "cat > /remote/path/backup.tar.gz"
```

这里，`tar -czf -` 将目录打包并通过标准输出传输，`ssh user@remote_host "cat > /remote/path/backup.tar.gz"` 在远程服务器上接收压缩文件并保存。

### 13. `grep` + `cut` + `sort` + `uniq`：分析日志文件中的 IP 地址

通过 `grep` 提取日志中的 IP 地址，并使用 `cut` 提取字段，再使用 `sort` 和 `uniq` 对结果进行排序和去重。

```bash
grep "Failed password" /var/log/auth.log | cut -d' ' -f11 | sort | uniq -c | sort -nr
```

在这个示例中，`grep` 找到所有包含 "Failed password" 的登录尝试，`cut -d' ' -f11` 提取第 11 列（假设 IP 地址在该列），`sort` 排序，`uniq -c` 统计每个 IP 地址的出现次数，最后 `sort -nr` 按次数从多到少排序。

### 14. `wget` + `cron`：定时下载数据

结合 `wget` 和 `cron`，可以自动化定期从指定网址下载数据。  
首先，使用 `wget` 下载文件：

```bash
wget -O /path/to/save/file http://example.com/data.csv
```

然后，在 `cron`

 中设置定时任务，每天凌晨 3 点执行下载操作：

```bash
0 3 * * * wget -O /path/to/save/file http://example.com/data.csv
```

### 15. `sort` + `uniq` + `diff`：文件对比与差异分析

可以使用 `sort` 和 `uniq` 对文件内容进行排序和去重，然后使用 `diff` 对比两个文件的差异。

```bash
sort file1.txt | uniq > sorted1.txt
sort file2.txt | uniq > sorted2.txt
diff sorted1.txt sorted2.txt
```

这里，`sort` 和 `uniq` 分别对两个文件进行排序和去重，`diff` 比较处理后的文件，显示差异。

### 16. `find` + `xargs` + `chmod`：批量修改文件权限

使用 `find` 搜索文件，配合 `xargs` 将结果传递给 `chmod` 来批量修改文件的权限。

```bash
find /path/to/directory -type f -name "*.sh" | xargs chmod +x
```

这里，`find` 搜索所有 `.sh` 脚本文件，`xargs` 将这些文件作为参数传递给 `chmod +x` 命令，为所有脚本添加执行权限。

### 17. `find` + `grep` + `sed`：批量查找和替换文件内容

结合 `find` 和 `grep` 查找特定文件，并使用 `sed` 对内容进行替换。

```bash
find /path/to/directory -type f -name "*.txt" | xargs grep -l "old_string" | xargs sed -i 's/old_string/new_string/g'
```

该命令组合中，`find` 找到所有 `.txt` 文件，`grep -l` 找到包含 "old_string" 的文件，`sed -i` 在这些文件中将 "old_string" 替换为 "new_string"。

### 18. `tar` + `find` + `gzip`：打包并压缩特定类型的文件

通过 `find` 查找文件，并将它们打包后用 `gzip` 压缩。

```bash
find /path/to/directory -name "*.log" -print0 | tar --null -cvzf logs_backup.tar.gz --files-from -
```

在此命令中，`find` 找到所有 `.log` 文件，`tar` 将这些文件打包并压缩为 `logs_backup.tar.gz`，`--null` 和 `-print0` 确保文件名中的空格和特殊字符能被正确处理。

### 19. `df` + `awk` + `mail`：磁盘空间警报

结合 `df` 和 `awk` 监控磁盘使用情况，当某个分区的使用率超过阈值时，通过 `mail` 发送电子邮件通知。

```bash
df -h | awk '$5 > 90 {print $0}' | mail -s "Disk Space Alert" user@example.com
```

`df -h` 显示磁盘使用情况，`awk '$5 > 90'` 过滤出使用率超过 90% 的分区，`mail` 将警报信息发送到指定的邮箱。

### 20. `rsync` + `cron`：定期备份

使用 `rsync` 同步文件，并配合 `cron` 定期执行备份操作。

编写 `backup.sh` 脚本：

```bash
#!/bin/bash
rsync -avz /local/directory/ user@remote_host:/remote/backup/
```

然后在 `cron` 中设置每周执行一次备份：

```bash
0 2 * * 0 /path/to/backup.sh
```

这将每周日凌晨 2 点执行 `backup.sh`，同步 `/local/directory/` 到远程服务器。

### 21. `scp` + `tar`：打包并传输文件到远程服务器

使用 `tar` 打包文件并通过 `scp` 传输到远程服务器。

```bash
tar -czf - /path/to/directory | ssh user@remote_host "cat > /remote/backup/backup_$(date +\%Y\%m\%d).tar.gz"
```

该命令首先用 `tar` 打包并压缩文件，随后通过 `ssh` 将其传输到远程服务器，并保存为 `backup_YYYYMMDD.tar.gz`。

### 22. `find` + `du` + `sort`：查找并分析最大的文件

通过 `find` 和 `du` 找到并显示占用空间最大的文件，然后用 `sort` 对结果排序。

```bash
find /path/to/directory -type f -exec du -h {} + | sort -rh | head -n 10
```

在此命令中，`find` 查找所有文件，`du -h` 显示它们的大小，`sort -rh` 按大小降序排序，`head -n 10` 只显示前 10 个最大的文件。

### 23. `netstat` + `grep` + `awk`：监控网络连接并提取特定信息

使用 `netstat` 列出所有网络连接，并通过 `grep` 和 `awk` 提取特定信息（如监听端口）。

```bash
netstat -tuln | grep LISTEN | awk '{print $4}'
```

`netstat -tuln` 列出所有监听端口，`grep LISTEN` 筛选正在监听的连接，`awk '{print $4}'` 提取端口号信息。

### 24. `grep` + `cut` + `sort`：分析日志文件中的访问记录

通过 `grep` 提取特定模式的日志记录，并用 `cut` 提取字段，最后用 `sort` 对记录进行排序。

```bash
grep "GET" /var/log/nginx/access.log | cut -d' ' -f1 | sort | uniq -c | sort -nr
```

该命令中，`grep "GET"` 提取所有 HTTP GET 请求，`cut -d' ' -f1` 提取发起请求的 IP 地址，`sort` 排序，`uniq -c` 统计每个 IP 的请求次数，`sort -nr` 按次数降序排列。

### 25. `watch` + `ps`：实时监控某个进程的运行状态

使用 `watch` 结合 `ps` 实时监控特定进程的运行状态，方便系统管理员查看进程状态变化。

```bash
watch -n 5 'ps aux | grep process_name'
```

该命令每隔 5 秒运行一次 `ps aux | grep process_name`，实时显示名为 `process_name` 的进程状态。

### 26. `awk` + `grep` + `wc`：统计文本文件中特定模式的数量

通过 `awk` 和 `grep` 提取文本文件中的特定模式，并使用 `wc` 统计出现次数。

```bash
awk '{print $2}' file.txt | grep "pattern" | wc -l
```

在这个示例中，`awk '{print $2}'` 提取文件的第二列，`grep "pattern"` 搜索匹配的模式，`wc -l` 统计匹配行的数量。

### 27. `find` + `exec` + `rm`：按文件修改时间批量删除

使用 `find` 查找并删除超过特定时间未修改的文件。

```bash
find /path/to/directory -type f -mtime +30 -exec rm {} \;
```

此命令会查找所有 30 天前未修改的文件，并使用 `rm` 删除它们。

### 28. `grep` + `tail` + `mail`：实时监控日志并发送告警

结合 `grep` 和 `tail`，实时监控日志文件中的错误，当发现错误时通过 `mail` 发送告警邮件。

```bash
tail -f /var/log/syslog | grep --line-buffered "error" | mail -s "Error Found" user@example.com
```

该命令监控 `/var/log/syslog` 文件，过滤包含 "error" 的日志行并发送电子邮件。

### 29. `awk` + `sed`：格式化并处理文本文件

使用 `awk` 提取文件中的数据，再用 `sed` 修改其格式或内容。

```bash
awk '{print $1, $3}' file.txt | sed 's/old_value/new_value/g'
```

在此命令中，`awk` 提取文件中的第一列和第三列，`sed` 将这些列中的 `old_value` 替换为 `new_value`。

### 30. `date` + `touch` + `find`：根据时间戳管理文件

通过 `touch` 创建特定时间戳的文件，结合 `find` 查找符合时间要求的文件进行管理。

```bash
touch -t 202309280000 /tmp/start
find /path/to/directory -newer /tmp/start
```

此命令使用 `touch` 创建一个时间戳为 2023 年 9 月 28 日的文件 `/tmp/start`，`find` 命令查找所有比这个文件更新的文件。

### 31. `awk` + `grep` + `sed`：批量格式化日志文件中的特定信息

从日志文件中提取特定的字段并重新格式化输出。

```bash
awk '{print $1, $4, $7}' /var/log/nginx/access.log | grep "404" | sed 's/\[//g; s/\]//g'
```

在这个示例中，`awk` 提取日志文件的第一列（IP）、第四列（时间戳）和第七列（请求状态），`grep "404"` 筛选出状态码为 404 的请求，`sed` 去除方括号，进行输出格式化。

### 32. `while` + `read` + `wget`：批量下载 URL 列表中的文件

从包含 URL 列表的文件中逐行读取 URL，并使用 `wget` 下载对应文件。

```bash
while read url; do wget $url; done < urls.txt
```

在此命令中，`while read url` 从文件 `urls.txt` 中逐行读取 URL，`wget $url` 下载文件。`done < urls.txt` 表示读取文件 `urls.txt` 中的 URL。

### 33. `crontab` + `rsync` + `log`：自动备份并记录日志

使用 `crontab` 定时执行 `rsync` 来进行备份，并记录备份操作的日志。

编写备份脚本 `backup.sh`：

```bash
#!/bin/bash
rsync -avz /local/directory/ /backup/directory/ >> /var/log/backup.log 2>&1
```

然后在 `crontab` 中设置每天凌晨 2 点执行该脚本：

```bash
0 2 * * * /path/to/backup.sh
```

这个脚本将每天备份 `/local/directory/` 到 `/backup/directory/`，并将日志记录到 `/var/log/backup.log` 中。

### 34. `cat` + `awk` + `tee`：同时输出文件内容并保存到新文件

通过 `cat` 读取文件并使用 `awk` 进行处理，同时通过 `tee` 将处理后的输出保存到另一个文件。

```bash
cat file.txt | awk '{print $1, $3}' | tee output.txt
```

在这个示例中，`cat` 读取文件内容，`awk` 处理并打印第一列和第三列，`tee` 则将输出结果同时保存到 `output.txt` 文件中。

### 35. `watch` + `df`：实时监控磁盘空间使用情况

通过 `watch` 结合 `df` 实时监控系统磁盘空间使用情况，每隔一定时间更新一次。

```bash
watch -n 10 df -h
```

此命令每隔 10 秒运行一次 `df -h`，显示系统磁盘空间使用情况，方便管理员实时监控。

### 36. `netstat` + `grep` + `awk` + `sort`：监控网络连接并分析连接情况

使用 `netstat` 获取网络连接信息，结合 `grep`、`awk` 和 `sort` 对连接情况进行分析。

```bash
netstat -ntu | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort -nr
```

在此组合中，`netstat -ntu` 列出所有网络连接，`awk '{print $5}'` 提取远程 IP 地址，`cut -d: -f1` 去除端口号，`sort` 排序，`uniq -c` 统计每个 IP 出现的次数，最后 `sort -nr` 按次数降序排列。

### 37. `dmesg` + `grep` + `tail`：监控硬件设备的内核日志

使用 `dmesg` 获取内核日志，结合 `grep` 和 `tail` 实时监控特定硬件设备的日志信息（如 USB 设备）。

```bash
dmesg | grep -i usb | tail -n 20
```

此命令从内核日志中查找与 USB 相关的记录，并使用 `tail` 显示最新的 20 条记录，方便管理员监控设备状态。

### 38. `find` + `tar` + `scp`：打包文件并传输到远程服务器

使用 `find` 查找指定类型的文件，打包压缩后通过 `scp` 传输到远程服务器。

```bash
find /path/to/directory -name "*.log" -print0 | tar --null -cvzf - --files-from - | scp - user@remote_host:/remote/backup/logs_backup.tar.gz
```

此命令先用 `find` 查找 `.log` 文件，使用 `tar` 压缩文件并通过管道将压缩包传输到远程服务器 `remote_host`。

### 39. `nc` + `tar`：通过网络传输文件

使用 `nc`（Netcat）和 `tar` 实现两个系统之间的文件传输，适合在没有 `scp` 或其他传输工具时使用。

在接收端运行以下命令，监听端口并接收文件：

```bash
nc -l -p 12345 | tar xzvf -
```

在发送端运行以下命令，发送文件到接收端：

```bash
tar czvf - /path/to/directory | nc remote_host 12345
```

### 40. `diff` + `patch`：比较文件并应用补丁

使用 `diff` 比较两个文件的不同之处，并生成补丁文件，使用 `patch` 应用补丁。

```bash
diff -u original.txt modified.txt > changes.patch
patch original.txt < changes.patch
```

`diff -u` 生成对比文件的差异，并保存为 `changes.patch`，然后通过 `patch` 将这些差异应用到原文件 `original.txt` 上。

通过上述高级组合命令，你可以在实际操作中应对更加复杂的系统管理和数据处理需求。通过灵活地组合 Shell 命令，可以轻松完成各种任务，如自动化备份、实时监控、日志分析、网络传输等，大大提升工作效率和管理能力。

---

下面是一个较为完整的 Linux 命令练习流程，包含了创建文件和文件夹、文件内容的填充、文件查找、文本处理等操作。此流程将帮助你熟悉 Ubuntu 系统上的基本命令。你可以在一个新的文件夹中逐步进行以下练习：

### 1. 新建文件夹和进入文件夹

```bash
mkdir linux_practice    # 新建一个文件夹
cd linux_practice       # 进入该文件夹
```

### 2. 创建文件和文件夹

#### 创建子文件夹和文件

```bash
mkdir src include docs  # 创建 src、include 和 docs 文件夹
touch src/main.c        # 在 src 文件夹中创建一个 main.c 文件
touch include/header.h  # 在 include 文件夹中创建一个 header.h 文件
touch docs/readme.txt   # 在 docs 文件夹中创建一个 readme.txt 文件
```

#### 创建多个文件

```bash
touch src/module1.c src/module2.c src/module3.c   # 一次性创建多个 .c 文件
```

### 3. 向文件中添加内容

使用 `echo` 和 `>>` 将文本添加到文件末尾。

```bash
echo "#include <stdio.h>" >> src/main.c
echo "int main() { printf(\"Hello, World!\\n\"); return 0; }" >> src/main.c
```

使用 `cat` 显示文件内容：

```bash
cat src/main.c
```

### 4. 重定向和管道

#### 将内容重定向到文件

```bash
echo "This is a sample readme file for the project." > docs/readme.txt
```

#### 使用管道和 `grep`

假设 `main.c`、`module1.c`、`module2.c` 中包含一些代码，可以用 `grep` 查找特定的字符串。

```bash
grep "printf" src/*.c   # 查找 src 文件夹中所有 .c 文件包含 "printf" 的行
```

#### 使用 `grep` 和 `管道`

可以结合 `cat` 和 `grep` 通过管道查找内容：

```bash
cat src/main.c | grep "printf"   # 查找 main.c 中的 "printf"
```

### 5. 使用 `find` 查找文件

查找文件夹中符合条件的文件。

```bash
find . -name "*.c"               # 查找当前文件夹及其子文件夹中所有 .c 文件
find . -type d -name "src"       # 查找名为 "src" 的文件夹
```

#### 查找大小超过 1KB 的文件

```bash
find . -type f -size +1k
```

### 6. 使用 `xargs` 进行批量操作

与 `find` 一起使用 `xargs` 对找到的文件进行批量操作。

```bash
find . -name "*.c" | xargs grep "main"   # 查找所有 .c 文件中包含 "main" 的行
```

### 7. 删除文件和文件夹

删除指定文件和空文件夹。

```bash
rm src/module3.c              # 删除单个文件
rmdir empty_folder             # 删除空文件夹
rm -r docs                     # 删除非空文件夹 docs
```

### 8. 使用 `touch` 更新文件时间

```bash
touch src/main.c               # 更新 main.c 文件的修改时间
```

### 9. 综合练习

在 `src` 文件夹中找到包含 `main` 字符串的 .c 文件并统计行数：

```bash
find src -name "*.c" | xargs grep -c "main"
```

### 10. 查看文件和文件夹结构

可以使用 `tree` 查看文件结构（如未安装 `tree`，先执行 `sudo apt install tree` 安装）。

```bash
tree linux_practice
```

---

好的！接下来继续补充一些内容，尤其是如何统计代码行数的功能。统计代码行数可以使用 `wc` 命令以及结合一些其他命令来完成。同时还会介绍一些其他文件操作和文本处理命令。

### 11. 统计代码行数

#### 方法1：使用 `wc` 命令

`wc` 命令可以用来统计文件的行数、单词数和字节数。使用 `-l` 选项可以仅显示行数。

```bash
wc -l src/*.c           # 统计 src 文件夹中所有 .c 文件的行数
```

#### 方法2：结合 `find` 和 `xargs`

可以通过 `find` 查找所有代码文件，然后使用 `xargs` 传递给 `wc` 统计行数。

```bash
find src -name "*.c" | xargs wc -l   # 统计 src 文件夹下所有 .c 文件的行数
```

#### 方法3：统计整个项目的代码行数

假设你的项目中有多种代码文件，可以统计所有文件夹中所有 `.c` 和 `.h` 文件的行数：

```bash
find . -name "*.c" -o -name "*.h" | xargs wc -l
```

#### 方法4：仅统计非空行数（过滤掉空行）

可以结合 `grep` 来过滤掉空行，从而统计非空行数。

```bash
find src -name "*.c" -o -name "*.h" | xargs grep -v '^\s*$' | wc -l
```

### 12. 统计代码中各个关键词出现次数

使用 `grep` 可以统计特定关键词（如 `main`、`printf` 等）在代码中的出现次数。

```bash
grep -r "main" src/ | wc -l       # 统计 src 文件夹中 "main" 出现的次数
grep -r "printf" src/ | wc -l     # 统计 src 文件夹中 "printf" 出现的次数
```

### 13. 使用 `awk` 进行代码统计和文本处理

`awk` 是一个强大的文本处理工具，可以用来统计代码文件中各部分信息。

#### 统计注释行和代码行

假设你想统计注释行（`//` 开头）和代码行的数量。

```bash
awk '/\/\// {comment++} {code++} END {print "Comments:", comment, "Code:", code - comment}' src/*.c
```

### 14. 统计项目的文件数量

统计项目中不同类型文件的数量，比如 `.c` 文件、`.h` 文件等。

```bash
find . -name "*.c" | wc -l        # 统计项目中 .c 文件的数量
find . -name "*.h" | wc -l        # 统计项目中 .h 文件的数量
find . -type f | wc -l            # 统计项目中所有文件的数量
```

### 15. 使用 `sed` 进行批量替换

`sed` 是一个流编辑器，可以在文件中批量替换内容。例如，将所有代码文件中的 `main` 替换为 `main_function`：

```bash
sed -i 's/main/main_function/g' src/*.c    # 在 src 文件夹中批量替换
```

### 16. 其他文本处理命令

#### `sort` 排序

可以对文件中的内容进行排序，常用于对代码中的某些列表或数据进行排序。

```bash
sort docs/readme.txt    # 对 readme.txt 文件内容进行排序
```

#### `uniq` 去重

对排序后的文件进行去重，适用于清理重复的代码行。

```bash
sort docs/readme.txt | uniq    # 去除 readme.txt 文件中的重复行
```

#### `diff` 文件比较

比较两个文件的差异。假设你有两个代码文件 `module1.c` 和 `module2.c`，可以用 `diff` 命令来比较。

```bash
diff src/module1.c src/module2.c
```

### 17. 自动化脚本：统计整个项目代码行数

可以将代码统计流程写入一个简单的脚本文件，以便多次复用。

创建一个 `count_lines.sh` 脚本文件：

```bash
touch count_lines.sh
chmod +x count_lines.sh  # 赋予执行权限
```

编辑 `count_lines.sh` 脚本内容如下：

```bash
#!/bin/bash

# 统计所有代码行数
echo "Counting total lines in .c and .h files..."
find . -name "*.c" -o -name "*.h" | xargs wc -l

# 统计非空行数
echo "Counting non-empty lines in .c and .h files..."
find . -name "*.c" -o -name "*.h" | xargs grep -v '^\s*$' | wc -l
```

执行该脚本：

```bash
./count_lines.sh
```
