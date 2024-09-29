## Shell 及其常用命令

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



### 常用命令

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

## 常用 Shell 命令的扩展组合用法

Shell 提供了丰富的命令和工具，但它的真正威力体现在组合使用多个命令来处理复杂任务时。通过使用管道（`|`）、重定向（`>`、`>>`）以及脚本编写，用户可以将简单的命令组合在一起，完成自动化、批量处理等复杂的操作。

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

### 8. `cat` + `tr` + `sort` + `uniq`：统计文件中单词的出现次数

这组命令可以读取文件，转换大小写，排序并去重，最后统计每个单词的出现次数。

```bash
cat file.txt | tr 'A-Z' 'a-z' | tr -c 'a-z' '\n' | sort | uniq -c | sort -nr
```
在这个示例中，`cat file.txt` 读取文件内容，`tr 'A-Z' 'a-z'` 将所有大写字母转换为小写字母，`tr -c 'a-z' '\n'` 将所有非字母字符替换为换行符，`sort` 对单词进行排序，`uniq -c` 统计每个单词的出现次数，`sort -nr` 按照出现次数从多到少排序。

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

---

通过以上命令组合，用户可以实现文件管理、系统监控、网络传输、定时任务、数据处理等多种自动化操作。这些组合为 Shell 的使用提供了强大的灵活性，能够有效提升工作效率并简化复杂任务。









