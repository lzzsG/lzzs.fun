later

ubuntu安装[资源](https://www.reddit.com/r/Ubuntu/comments/13jmdn2/ubuntu_2004_desktop_arm64/?rdt=55229)

## 关于`apt-get` 和 `apt`

`apt-get` 和 `apt` 是两个不同的命令行工具，但它们都用于管理 Debian 和 Ubuntu 系统中的软件包管理系统。虽然它们的功能非常相似，但有一些细微的区别。

### 1. `apt-get`

`apt-get` 是一个较早的工具，专门用于安装、更新和删除软件包。它是 `dpkg` 包管理系统的高级命令行接口，已经存在了很长时间，功能非常全面。

常见的 `apt-get` 命令有：

- `sudo apt-get update`：更新软件包索引。
- `sudo apt-get upgrade`：升级已安装的软件包。
- `sudo apt-get install <package>`：安装新的软件包。
- `sudo apt-get remove <package>`：卸载软件包。

### 2. `apt`

`apt` 是 Ubuntu 16.04 及之后的版本中引入的一个较新的命令行工具，它是 `apt-get` 的简化版本，旨在为用户提供更简单、更易用的命令行体验。

`apt` 结合了 `apt-get`、`apt-cache` 的某些功能，并提供了更好的输出和用户体验。它被设计为一个更直观的工具，适合普通用户日常的软件包管理操作。

常见的 `apt` 命令有：

- `sudo apt update`：更新软件包索引。
- `sudo apt upgrade`：升级已安装的软件包。
- `sudo apt install <package>`：安装新的软件包。
- `sudo apt remove <package>`：卸载软件包。

### 主要区别

- **用途**：`apt-get` 更加稳定和传统，用于脚本编写等自动化任务；而 `apt` 更简洁且适合人类用户日常操作。
- **输出**：`apt` 提供了更好的输出格式和交互体验，适合终端使用者。
- **功能差异**：`apt` 没有涵盖 `apt-get` 的所有功能，它是 `apt-get` 的简化版本，日常管理足够，但更高级或脚本中的操作通常还是使用 `apt-get`。

### 什么时候用 `apt`，什么时候用 `apt-get`？

- 对于普通用户的日常软件管理任务，建议使用 `apt`，因为它更简洁、输出更美观。
- 对于编写脚本或需要更多高级功能时，使用 `apt-get`。

总的来说，`apt` 是 `apt-get` 的简化版本，专为终端用户设计，提供了更好的用户体验。而 `apt-get` 则更加稳定、功能全面，适合高级用户或在脚本中使用。
