## readline

`readline` 是一个常用的 C 语言库，用于实现行输入功能，支持命令行编辑、历史记录等。`readline` 库的功能可以帮助我们实现一个简单的交互式命令行界面，使用户可以方便地输入命令和参数，尤其适合需要解析多个参数的场景。

### 1. 基本用法：使用 `readline` 获取用户输入

`readline` 提供的核心函数是 `readline()`，它从标准输入读取一行文本并返回一个指向该文本的指针。

```c
#include <stdio.h>
#include <readline/readline.h>
#include <readline/history.h>

int main() {
    char *input;

    // 提示用户输入
    input = readline("Enter command: ");

    if (input) {
        printf("You entered: %s\n", input);
        free(input);  // 释放分配的内存
    }

    return 0;
}
```

### 2. 支持输入历史

`readline` 库还提供了输入历史功能，用户可以使用上下键浏览历史命令。使用 `add_history()` 函数可以将输入的命令保存到历史中：

```c
#include <stdio.h>
#include <readline/readline.h>
#include <readline/history.h>

int main() {
    char *input;

    while (1) {
        // 读取输入
        input = readline("Enter command: ");

        if (input) {
            // 保存到历史记录
            add_history(input);

            printf("You entered: %s\n", input);

            // 处理输入命令（例如，"exit" 退出）
            if (strcmp(input, "exit") == 0) {
                free(input);
                break;
            }

            free(input);  // 释放分配的内存
        }
    }

    return 0;
}
```

### 3. 解析命令和多个参数

在解析用户输入的命令时，通常需要将输入字符串拆分成命令和参数。可以使用`strtok`函数来解析`readline`返回的字符串。

#### 示例：解析简单的命令和参数

以下示例演示了如何将输入解析成命令和多个参数：

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <readline/readline.h>
#include <readline/history.h>

int main() {
    char *input;

    while (1) {
        input = readline("Enter command: ");
        
        if (input) {
            add_history(input);

            // 使用 strtok 解析命令和参数
            char *token = strtok(input, " ");
            if (token == NULL) {
                free(input);
                continue;
            }

            printf("Command: %s\n", token);

            // 逐个解析参数
            int arg_count = 0;
            char *args[10];  // 假设最多支持10个参数
            while ((token = strtok(NULL, " ")) != NULL) {
                args[arg_count++] = token;
            }

            printf("Arguments (%d):\n", arg_count);
            for (int i = 0; i < arg_count; i++) {
                printf("  Arg %d: %s\n", i, args[i]);
            }

            // 检查退出命令
            if (strcmp(input, "exit") == 0) {
                free(input);
                break;
            }

            free(input);
        }
    }

    return 0;
}
```

### 4. 使用 `execvp` 执行外部命令

结合 `readline` 和 `execvp` 函数，可以实现一个简单的命令行解释器，将用户输入的命令和参数传递给系统执行。

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <readline/readline.h>
#include <readline/history.h>

int main() {
    char *input;

    while (1) {
        input = readline("Enter command: ");
        
        if (input) {
            add_history(input);

            // 使用 strtok 解析命令和参数
            char *token = strtok(input, " ");
            if (token == NULL) {
                free(input);
                continue;
            }

            // 第一个 token 是命令
            char *command = token;

            // 后续的 token 是参数
            char *args[10];  // 假设最多支持10个参数
            int arg_count = 0;
            args[arg_count++] = command; // 第一个参数是命令本身

            while ((token = strtok(NULL, " ")) != NULL) {
                args[arg_count++] = token;
            }
            args[arg_count] = NULL; // execvp 需要以 NULL 结尾的参数列表

            // 执行命令
            if (fork() == 0) {
                execvp(command, args);
                perror("execvp failed"); // execvp 返回说明出错
                exit(EXIT_FAILURE);
            } else {
                wait(NULL); // 等待子进程结束
            }

            if (strcmp(command, "exit") == 0) {
                free(input);
                break;
            }

            free(input);
        }
    }

    return 0;
}
```

#### 解释

- **解析输入**：使用`strtok`将用户输入拆分为命令和参数。
- **构建参数数组**：将命令和参数依次放入`args`数组，并以`NULL`结尾。
- **执行命令**：通过`fork`创建子进程，在子进程中调用`execvp`执行命令。`execvp`会根据`PATH`环境变量搜索命令。
- **等待子进程**：主进程使用`wait`等待子进程结束。

### 5. `readline` 高级功能

`readline`库还提供了一些高级功能，可以让用户输入命令时更加方便：

- **自动补全**：通过`rl_bind_key`函数和`rl_complete`回调设置命令自动补全。
- **自定义提示符**：可以设置动态提示符，如显示当前路径、用户名等。
- **加载和保存历史记录**：使用`read_history`和`write_history`函数，可以在程序退出时保存历史记录，并在下次启动时加载。

### 示例：添加自动补全

在`readline`库中可以自定义补全函数，实现对命令的自动补全。以下是一个简单的示例，展示如何添加基本的补全功能：

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <readline/readline.h>
#include <readline/history.h>

// 补全函数
char *command_generator(const char *text, int state) {
    static int list_index, len;
    char *commands[] = {
        "help", "exit", "list", "show", "add", "delete", NULL
    };

    if (!state) {
        list_index = 0;
        len = strlen(text);
    }

    while (commands[list_index]) {
        if (strncmp(commands[list_index], text, len) == 0) {
            return strdup(commands[list_index++]);
        }
        list_index++;
    }

    return NULL;
}

// 补全回调函数
char **command_completion(const char *text, int start, int end) {
    rl_attempted_completion_over = 1;
    return rl_completion_matches(text, command_generator);
}

int main() {
    rl_attempted_completion_function = command_completion;

    char *input;
    while ((input = readline("Enter command: ")) != NULL) {
        if (strcmp(input, "exit") == 0) {
            free(input);
            break;
        }
        add_history(input);
        printf("You entered: %s\n", input);
        free(input);
    }

    return 0;
}
```

在这个示例中，输入`help`、`exit`等命令时，用户可以使用`Tab`键自动补全。

---

## `strtok`

`strtok` 是 C 标准库中的一个字符串分割函数，用于将字符串按指定的分隔符分割成一个个子串（token）。这是在 C 语言中解析字符串的常用方法。以下是 `strtok` 的用法、注意事项和示例。

### 1. `strtok` 的基本用法

函数声明：

```c
char *strtok(char *str, const char *delim);
```

- **参数**：
  - `str`：要分割的字符串。如果是第一次调用，`str` 应该指向要分割的字符串；如果是连续调用，请传入 `NULL`。
  - `delim`：字符串内的字符将被视为分隔符。例如，`" "` 表示按空格分割，`","` 表示按逗号分割。

- **返回值**：返回一个指向下一个子串的指针。如果没有更多的子串可以提取，则返回 `NULL`。

- **工作机制**：
  - `strtok` 使用静态变量保存分割过程中的位置，因此在第一次调用后，只需传入 `NULL` 就可以继续分割同一个字符串。
  - 每次调用返回找到的下一个子串，同时将该子串末尾的分隔符替换为 `\0`，使得这个子串可以被当作独立的字符串使用。

### 2. `strtok` 的使用示例

假设我们有一个字符串 `"Hello, world! Welcome to C programming."`，并希望按空格分割成不同的单词：

```c
#include <stdio.h>
#include <string.h>

int main() {
    char str[] = "Hello, world! Welcome to C programming.";
    char *token;

    // 第一次调用 strtok，将字符串按空格分割
    token = strtok(str, " ");
    while (token != NULL) {
        printf("%s\n", token);   // 打印每个子串
        token = strtok(NULL, " "); // 传入 NULL，继续处理剩余部分
    }

    return 0;
}
```

**输出**：

```
Hello,
world!
Welcome
to
C
programming.
```

### 3. 注意事项

- **破坏原始字符串**：`strtok` 会修改原始字符串，将分隔符替换为 `\0`，因此不能直接使用字符串常量（即 `const char *`），例如不能传入 `"Hello, world!"`，必须传入可修改的字符数组。

- **连续调用 `strtok`**：由于 `strtok` 使用静态变量保存状态，因此如果在一个线程中分割多个字符串，需要在每次分割前将状态重置，否则会产生冲突。可以使用 `strtok_r` 函数（`reentrant` 版本）来实现线程安全。

- **分隔符中的连续空字符**：如果分隔符之间有连续的空格或其它分隔字符，`strtok` 会自动跳过这些连续的分隔符。例如，分隔符是 `" "` 时，`"a    b"` 会被解析成 `a` 和 `b` 两个子串，中间不会产生空子串。

### 4. 分割多个分隔符

`strtok` 支持多个分隔符的字符串。例如，如果希望按空格和逗号进行分割，可以将分隔符设置为 `", "`。

```c
#include <stdio.h>
#include <string.h>

int main() {
    char str[] = "apple, orange,banana grape";
    char *token;

    // 使用多种分隔符
    token = strtok(str, ", ");
    while (token != NULL) {
        printf("%s\n", token);
        token = strtok(NULL, ", ");
    }

    return 0;
}
```

**输出**：

```
apple
orange
banana
grape
```

### 5. 使用 `strtok_r` 实现线程安全

`strtok_r` 是 `strtok` 的线程安全版本，适用于多线程环境下。与 `strtok` 不同的是，`strtok_r` 使用一个额外的参数来保存状态，而不是依赖静态变量。这意味着可以同时处理多个字符串而不影响其他线程。

函数声明：

```c
char *strtok_r(char *str, const char *delim, char **saveptr);
```

- **参数**：
  - `str`：第一次调用时传入需要分割的字符串，后续调用传入 `NULL`。
  - `delim`：分隔符。
  - `saveptr`：保存状态的指针。每次调用后会更新状态，用于记录当前位置。

- **返回值**：与 `strtok` 相同，返回下一个子串的指针。

#### 示例：使用 `strtok_r` 处理多个字符串

```c
#include <stdio.h>
#include <string.h>

int main() {
    char str1[] = "apple, orange, banana";
    char str2[] = "cat; dog; bird";
    char *token;
    char *saveptr1, *saveptr2;

    // 分割第一个字符串
    token = strtok_r(str1, ", ", &saveptr1);
    while (token != NULL) {
        printf("str1 token: %s\n", token);
        token = strtok_r(NULL, ", ", &saveptr1);
    }

    // 分割第二个字符串
    token = strtok_r(str2, "; ", &saveptr2);
    while (token != NULL) {
        printf("str2 token: %s\n", token);
        token = strtok_r(NULL, "; ", &saveptr2);
    }

    return 0;
}
```

**输出**：

```
str1 token: apple
str1 token: orange
str1 token: banana
str2 token: cat
str2 token: dog
str2 token: bird
```

### 6. 综合示例：解析命令和参数

以下示例展示了如何使用 `strtok` 将输入的字符串解析成命令和参数：

```c
#include <stdio.h>
#include <string.h>

int main() {
    char input[100];
    printf("Enter command: ");
    fgets(input, sizeof(input), stdin);

    // 移除换行符
    input[strcspn(input, "\n")] = 0;

    // 第一个 token 是命令
    char *command = strtok(input, " ");
    printf("Command: %s\n", command);

    // 剩余的 token 是参数
    int arg_count = 0;
    char *args[10];
    char *token;
    while ((token = strtok(NULL, " ")) != NULL) {
        args[arg_count++] = token;
    }

    printf("Arguments:\n");
    for (int i = 0; i < arg_count; i++) {
        printf("  Arg %d: %s\n", i, args[i]);
    }

    return 0;
}
```

**示例运行**：

```
Enter command: cp file1.txt file2.txt
Command: cp
Arguments:
  Arg 0: file1.txt
  Arg 1: file2.txt
```

### 7. `strtok` 用法小结

- `strtok` 是C语言中常用的字符串分割函数，用于将字符串按指定分隔符分割成子串。
- `strtok` 会修改原字符串，将分隔符替换为 `\0`，并返回子串指针。
- 多次调用时传入 `NULL` 继续分割同一字符串。
- `strtok_r` 是线程安全版本，适合多线程环境。

`strtok` 是简单的字符串分割工具，尽管有一些限制（如依赖静态变量，不能分割字符串常量），但在很多命令行解析和输入处理场景中非常有用。

---

在C语言中，有许多`str`开头的字符串处理函数，这些函数可以在处理命令行输入、解析参数和字符串操作时派上用场。以下是一些常用的`str`开头的函数，特别是命令解析和字符串处理中常用的函数，以及它们的用法和示例。

### 1. `strlen` - 获取字符串长度

**函数原型**：

```c
size_t strlen(const char *str);
```

- **功能**：返回字符串的长度（不包括终止的`\0`字符）。
- **常见用法**：判断字符串的长度或分配动态内存。

**示例**：

```c
#include <stdio.h>
#include <string.h>

int main() {
    const char *str = "hello";
    printf("Length of '%s' is %zu\n", str, strlen(str));
    return 0;
}
```

### 2. `strcpy` 和 `strncpy` - 复制字符串

**函数原型**：

```c
char *strcpy(char *dest, const char *src);
char *strncpy(char *dest, const char *src, size_t n);
```

- **功能**：将源字符串 `src` 复制到目标字符串 `dest`。
  - `strcpy` 会一直复制到源字符串的 `\0` 字符。
  - `strncpy` 只会复制最多 `n` 个字符，适用于需要限定长度的场合。
- **注意事项**：目标字符串`dest`必须有足够的空间来存储源字符串。

**示例**：

```c
#include <stdio.h>
#include <string.h>

int main() {
    char src[] = "hello";
    char dest[10];
    strcpy(dest, src);
    printf("Copied string: %s\n", dest);
    return 0;
}
```

### 3. `strcmp` 和 `strncmp` - 比较字符串

**函数原型**：

```c
int strcmp(const char *str1, const char *str2);
int strncmp(const char *str1, const char *str2, size_t n);
```

- **功能**：比较两个字符串的内容。
  - `strcmp` 完整比较两个字符串，返回0表示相等，正数表示 `str1` 大于 `str2`，负数表示 `str1` 小于 `str2`。
  - `strncmp` 只比较前 `n` 个字符。
- **常见用法**：判断命令输入是否匹配特定字符串。

**示例**：

```c
#include <stdio.h>
#include <string.h>

int main() {
    const char *cmd = "exit";
    if (strcmp(cmd, "exit") == 0) {
        printf("Exiting...\n");
    }
    return 0;
}
```

### 4. `strcat` 和 `strncat` - 拼接字符串

**函数原型**：

```c
char *strcat(char *dest, const char *src);
char *strncat(char *dest, const char *src, size_t n);
```

- **功能**：将源字符串 `src` 追加到目标字符串 `dest` 的末尾。
  - `strncat` 只会追加最多 `n` 个字符。
- **注意事项**：目标字符串 `dest` 必须足够大，以容纳拼接后的结果。

**示例**：

```c
#include <stdio.h>
#include <string.h>

int main() {
    char str1[20] = "Hello, ";
    char str2[] = "world!";
    strcat(str1, str2);
    printf("Concatenated string: %s\n", str1);
    return 0;
}
```

### 5. `strchr` 和 `strrchr` - 查找字符

**函数原型**：

```c
char *strchr(const char *str, int c);
char *strrchr(const char *str, int c);
```

- **功能**：在字符串中查找字符 `c`。
  - `strchr` 返回字符串中第一个匹配字符的指针。
  - `strrchr` 返回最后一个匹配字符的指针。
- **常见用法**：查找命令中的特定字符（如选项前缀 `-` 或路径中的 `/`）。

**示例**：

```c
#include <stdio.h>
#include <string.h>

int main() {
    const char *path = "/home/user/file.txt";
    char *last_slash = strrchr(path, '/');
    if (last_slash) {
        printf("Filename: %s\n", last_slash + 1);
    }
    return 0;
}
```

### 6. `strstr` - 查找子串

**函数原型**：

```c
char *strstr(const char *haystack, const char *needle);
```

- **功能**：在字符串 `haystack` 中查找子串 `needle` 的第一个匹配。
- **常见用法**：检查命令输入中是否包含特定子字符串。

**示例**：

```c
#include <stdio.h>
#include <string.h>

int main() {
    const char *input = "This is a test command";
    if (strstr(input, "test")) {
        printf("Found 'test' in input.\n");
    }
    return 0;
}
```

### 7. `strdup` - 复制字符串到新内存

**函数原型**：

```c
char *strdup(const char *str);
```

- **功能**：分配足够的内存，并复制 `str` 的内容到新的内存块中。
- **注意事项**：`strdup` 使用 `malloc` 分配内存，因此返回的指针需要手动 `free`。

**示例**：

```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main() {
    char *orig = "Hello, world!";
    char *copy = strdup(orig);
    printf("Copied string: %s\n", copy);
    free(copy); // 释放内存
    return 0;
}
```

### 8. `strtok` - 字符串分割

`strtok` 用于按分隔符分割字符串，详细用法在上文中已说明，这里不再赘述。

### 9. `strspn` 和 `strcspn` - 子串搜索

**函数原型**：

```c
size_t strspn(const char *str1, const char *str2);
size_t strcspn(const char *str1, const char *str2);
```

- **功能**：
  - `strspn`：返回 `str1` 中连续包含 `str2` 中字符的前缀长度。
  - `strcspn`：返回 `str1` 中第一个不在 `str2` 中的字符位置。
- **常见用法**：查找字符串中连续的特定字符或首个不匹配字符。

**示例**：

```c
#include <stdio.h>
#include <string.h>

int main() {
    const char *str = "123abc456";
    printf("Digits prefix length: %zu\n", strspn(str, "0123456789"));
    printf("First non-digit position: %zu\n", strcspn(str, "0123456789"));
    return 0;
}
```

**输出**：

```
Digits prefix length: 3
First non-digit position: 3
```

### 10. `strcasecmp` 和 `strncasecmp` - 忽略大小写的字符串比较

**函数原型**：

```c
int strcasecmp(const char *str1, const char *str2);
int strncasecmp(const char *str1, const char *str2, size_t n);
```

- **功能**：忽略大小写地比较两个字符串。
  - `strcasecmp`：比较完整字符串。
  - `strncasecmp`：只比较前 `n` 个字符。
- **常见用法**：处理命令解析时忽略大小写的比较，例如用户输入的命令或选项。

**示例**：

```c
#include <stdio.h>
#include <strings.h> // 注意：strcasecmp 在 strings.h 中

int main() {
    const char *cmd = "EXIT";
    if (strcasecmp(cmd, "exit") == 0) {
        printf("Exiting...\n");
    }
    return 0;
}
```

### 11. `strpbrk` - 查找任一字符

**函数原型**：

```c
char *strpbrk(const char *str1, const char *str2);
```

- **功能**：在 `str1` 中查找 `str2` 中任一字符的第一个匹配位置。
- **常见用法**：在解析命令时，查找包含多种分隔符的位置。

**示例**：

```c
#include <stdio.h>
#include <string.h>

int main() {
    const char *input = "name=value; path=/usr/bin";
    char *result = strpbrk(input, "=;");
    if (result) {
        printf("Found separator: %c

\n", *result);
    }
    return 0;
}
```

### 总结

这些`str`开头的函数为字符串操作提供了许多基础功能，特别是在命令解析和文本处理时非常有用。它们涉及字符串的比较、查找、分割、拼接等操作，在编写交互式程序和实现命令行解析器时非常有帮助。

除了`str`开头的字符串处理函数外，C语言标准库中还有一些其他常用的字符串处理函数，它们在解析、格式化和处理字符串时非常有用。以下是一些常用的非`str`开头的字符串处理函数及其用法。

### 1. `sscanf` - 从字符串读取格式化数据

**函数原型**：

```c
int sscanf(const char *str, const char *format, ...);
```

- **功能**：从字符串中读取格式化数据，就像`scanf`从标准输入读取数据一样。
- **常见用法**：解析命令行输入、从字符串提取参数。

**示例**：

```c
#include <stdio.h>

int main() {
    char input[] = "123 456.78 hello";
    int i;
    float f;
    char s[10];

    sscanf(input, "%d %f %s", &i, &f, s);
    printf("Integer: %d\n", i);
    printf("Float: %.2f\n", f);
    printf("String: %s\n", s);

    return 0;
}
```

### 2. `sprintf` 和 `snprintf` - 将格式化数据写入字符串

**函数原型**：

```c
int sprintf(char *str, const char *format, ...);
int snprintf(char *str, size_t size, const char *format, ...);
```

- **功能**：将格式化数据写入字符串中。
  - `sprintf`：没有缓冲区长度限制，容易产生缓冲区溢出。
  - `snprintf`：安全版本，最多写入指定长度`size`的数据。
- **常见用法**：构造格式化的字符串。

**示例**：

```c
#include <stdio.h>

int main() {
    char buffer[50];
    int year = 2023;
    snprintf(buffer, sizeof(buffer), "The year is %d.", year);
    printf("%s\n", buffer);

    return 0;
}
```

### 3. `atoi`, `atof`, `atol`, `atoll` - 字符串转换为数字

**函数原型**：

```c
int atoi(const char *str);
double atof(const char *str);
long atol(const char *str);
long long atoll(const char *str);
```

- **功能**：将字符串转换为整型、浮点型、长整型等。
- **常见用法**：将用户输入的数字字符串转换成实际的数值类型。

**示例**：

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    char *intStr = "123";
    char *floatStr = "456.78";

    int i = atoi(intStr);
    double f = atof(floatStr);

    printf("Integer: %d\n", i);
    printf("Float: %.2f\n", f);

    return 0;
}
```

### 4. `strtol`, `strtod`, `strtoul` - 字符串转换为数字（带错误检查）

**函数原型**：

```c
long strtol(const char *str, char **endptr, int base);
double strtod(const char *str, char **endptr);
unsigned long strtoul(const char *str, char **endptr, int base);
```

- **功能**：类似于`atoi`系列函数，但支持指定进制，并且可以通过`endptr`获取未转换部分，便于错误检查。
- **常见用法**：在处理进制转换（如十六进制）和错误检查时比`atoi`更灵活。

**示例**：

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    const char *str = "123abc";
    char *endptr;
    long value = strtol(str, &endptr, 10);

    printf("Converted value: %ld\n", value);
    printf("Remaining string: %s\n", endptr);

    return 0;
}
```

### 5. `memset` - 设置内存块中的值

**函数原型**：

```c
void *memset(void *str, int c, size_t n);
```

- **功能**：将内存块中的前`n`个字节设置为指定的值`c`。
- **常见用法**：初始化字符数组、清空内存区域。

**示例**：

```c
#include <stdio.h>
#include <string.h>

int main() {
    char buffer[10];
    memset(buffer, '*', sizeof(buffer) - 1);
    buffer[9] = '\0';  // 确保字符串以 '\0' 结尾
    printf("Buffer: %s\n", buffer);

    return 0;
}
```

### 6. `memcpy` 和 `memmove` - 内存拷贝

**函数原型**：

```c
void *memcpy(void *dest, const void *src, size_t n);
void *memmove(void *dest, const void *src, size_t n);
```

- **功能**：将源内存块中的内容拷贝到目标内存块中。
  - `memcpy` 用于没有重叠的内存块拷贝。
  - `memmove` 可以安全处理重叠的内存块。
- **常见用法**：拷贝或移动内存块中的数据。

**示例**：

```c
#include <stdio.h>
#include <string.h>

int main() {
    char src[] = "hello";
    char dest[10];

    memcpy(dest, src, strlen(src) + 1);
    printf("Copied string: %s\n", dest);

    return 0;
}
```

### 7. `strdup` - 复制字符串到动态分配的内存

**函数原型**：

```c
char *strdup(const char *str);
```

- **功能**：为字符串分配足够的内存空间，并复制内容。返回的指针需要`free`释放。
- **常见用法**：在需要分配独立的字符串拷贝时使用。

**示例**：

```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main() {
    const char *str = "hello";
    char *copy = strdup(str);
    if (copy != NULL) {
        printf("Copied string: %s\n", copy);
        free(copy); // 释放内存
    }
    return 0;
}
```

### 8. `toupper` 和 `tolower` - 字符转换为大写或小写

**函数原型**：

```c
int toupper(int ch);
int tolower(int ch);
```

- **功能**：将字符转换为大写或小写。
- **常见用法**：对字符串中的字符进行大小写转换（需要逐字符遍历）。

**示例**：

```c
#include <stdio.h>
#include <ctype.h>

int main() {
    char str[] = "Hello World!";
    for (int i = 0; str[i]; i++) {
        str[i] = tolower(str[i]);
    }
    printf("Lowercase: %s\n", str);

    return 0;
}
```

### 9. `strnlen` - 限制长度的字符串长度计算

**函数原型**：

```c
size_t strnlen(const char *str, size_t maxlen);
```

- **功能**：计算字符串长度，但最多返回`maxlen`，避免越界。
- **常见用法**：在处理不确定长度的字符串时，防止越界。

**示例**：

```c
#include <stdio.h>
#include <string.h>

int main() {
    const char *str = "hello";
    size_t len = strnlen(str, 3); // 最多返回3
    printf("Limited length: %zu\n", len);

    return 0;
}
```

### 10. `strerror` - 返回错误代码对应的描述信息

**函数原型**：

```c
char *strerror(int errnum);
```

- **功能**：将错误代码转换为对应的错误描述字符串。
- **常见用法**：在系统调用出错时获取详细错误信息。

**示例**：

```c
#include <stdio.h>
#include <string.h>
#include <errno.h>

int main() {
    FILE *fp = fopen("non_existent_file.txt", "r");
    if (fp == NULL) {
        printf("Error opening file: %s\n", strerror(errno));
    }
    return 0;
}
```

### 11. `strchrnul` - 查找字符或返回字符串末尾

**函数原型**：

```c
char *strchrnul(const char *s, int c);
```

- **功能**：在字符串 `s` 中查找字符 `c`。如果未找到 `c`，则返回字符串末尾的指针。
- **常见用法**：避免字符不在字符串中时返回 `NULL` 的情况。

**示例**：

```c
#include <stdio.h>
#include <string.h>

int main() {
    const char *str = "hello";
    char *ptr = strchrnul(str

, 'x'); // 找不到 'x'，返回字符串末尾
    printf("Position of 'x': %ld\n", ptr - str); // 输出字符串长度

    return 0;
}
```

### 12. `strlcpy` 和 `strlcat` - 安全的字符串复制和拼接

这些是非标准函数，在一些Unix系统中提供，如BSD系统。相比于`strcpy`和`strcat`，`strlcpy`和`strlcat`提供了更安全的字符串复制和拼接功能，防止缓冲区溢出。

**函数原型**：

```c
size_t strlcpy(char *dst, const char *src, size_t dstsize);
size_t strlcat(char *dst, const char *src, size_t dstsize);
```

- **功能**：安全地将字符串复制或拼接到指定大小的缓冲区。
- **常见用法**：在缓冲区中复制或拼接字符串时防止溢出。

**示例**：

```c
#include <stdio.h>
#include <string.h>

int main() {
    char buffer[10];
    strlcpy(buffer, "hello", sizeof(buffer));
    strlcat(buffer, " world", sizeof(buffer)); // 超出缓冲区，自动截断
    printf("Buffer: %s\n", buffer);

    return 0;
}
```

### 总结

在C语言中，字符串处理的需求非常常见。以上函数，包括格式化、转换、分割、复制、查找等功能，可以帮助你有效地处理字符串，尤其是在命令行解析、参数处理、字符串操作等场景中。这些函数各自的功能不同，但在组合使用时可以实现非常灵活的字符串处理。

`strncpy` 是一种从源字符串复制指定数量字符到目标缓冲区的函数。它的用法和标准格式如下：

```c
char *strncpy(char *dest, const char *src, size_t n);
```

- **参数**：
  - `dest`：目标缓冲区，用于存放复制后的字符串。
  - `src`：源字符串，提供要复制的内容。
  - `n`：要复制的字符数上限。

- **返回值**：返回目标缓冲区 `dest` 的指针。

### `strncpy` 的特性

1. **限制字符复制数量**：`strncpy`最多只会复制 `n` 个字符，即使源字符串长度大于 `n`，它也只会复制指定的 `n` 个字符。

2. **填充空字符**：如果源字符串长度小于 `n`，`strncpy` 会在 `dest` 中剩余的空间填充 `\0`，直到填满 `n` 个字符。这个特性在有些情况下用于初始化固定长度的字符数组。

3. **不自动添加终止符**：如果源字符串长度等于或超过 `n`，`strncpy` 不会自动在结尾添加 `\0`。在这种情况下，目标字符串可能不是一个合法的 C 字符串（没有 `\0` 终止符），需要手动添加 `\0`。

### 使用示例

```c
#include <stdio.h>
#include <string.h>

int main() {
    char src[] = "Hello, world!";
    char dest[20];

    // 将 src 中的前 5 个字符复制到 dest
    strncpy(dest, src, 5);
    dest[5] = '\0';  // 手动添加 '\0' 以保证 dest 成为有效的 C 字符串

    printf("Result: %s\n", dest);  // 输出：Result: Hello

    return 0;
}
```

在这个例子中：

- `strncpy(dest, src, 5);` 将 `src` 中前 5 个字符复制到 `dest` 中。
- 因为 `strncpy` 不会自动添加终止符，所以我们手动在 `dest[5]` 位置加上 `\0`，确保 `dest` 是一个有效的 C 字符串。

### 常见用法与注意事项

1. **确保目标字符串有足够空间**：`dest` 的空间必须至少为 `n + 1`（如果想存储一个合法的 C 字符串），以防止出现越界。

2. **处理未自动终止的情况**：如果可能复制的数据刚好达到 `n` 长度，记得在目标字符串的 `n` 位置手动添加 `\0`。

3. **安全性**：`strncpy` 用于需要控制字符复制数量的场合，适合处理固定长度的字符数组初始化或者需要限定数据长度的场合。

## fgets

在 C 中处理多行输入时，可以通过 `fgets` 函数逐行读取标准输入，每次调用 `fgets` 都会读取一行，直到遇到换行符 `\n` 或文件结束符（EOF）为止。`fgets` 函数适合逐行读取，能够自动识别行末的换行符，并在遇到 EOF 时停止读取。

### `fgets` 如何逐行读取输入

1. **函数原型**：

   ```c
   char *fgets(char *str, int n, FILE *stream);
   ```

   - `str`：存储读取内容的字符数组（缓冲区）。
   - `n`：指定读取的最大字符数（包含字符串结束符 `\0`）。
   - `stream`：文件流，`stdin` 表示标准输入。

2. **读取机制**：

   - 每次调用 `fgets` 时，函数会从指定的输入流（如 `stdin`）读取字符，直到遇到换行符 `\n`、字符数达到 `n - 1`，或达到文件结束符（EOF）为止。
   - `fgets` 会将换行符 `\n` 包含在读取的字符串中（如果存在），并在字符串的末尾添加一个空字符 `\0`。

3. **识别每行的结束**：

   - 每次 `fgets` 返回时，如果字符串末尾是换行符 `\n`，说明这一行读取完成。
   - 当 `fgets` 返回 `NULL` 时，表示读取到文件结束符（EOF），可以停止读取。

### 示例代码：多行输入读取与处理

假设我们有以下代码来逐行读取输入，并在每行输入后移除换行符，然后解析数据：

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_EXPR_LENGTH 1024

int main() {
    char line[MAX_EXPR_LENGTH];  // 存储每行输入的缓冲区

    printf("Enter multiple lines (press Ctrl+D to end input):\n");

    while (fgets(line, sizeof(line), stdin) != NULL) {
        // 去掉行末的换行符
        line[strcspn(line, "\n")] = '\0';

        // 输出每行去掉换行符后的内容
        printf("Processed line: %s\n", line);
    }

    printf("End of input.\n");
    return 0;
}
```

### 代码解释

1. **`fgets` 逐行读取**：
   - `fgets(line, sizeof(line), stdin)` 从标准输入读取一行内容到 `line` 数组中。
   - 每次调用 `fgets` 之后会读取一行内容，直到遇到换行符或 EOF。

2. **去除换行符**：
   - `line[strcspn(line, "\n")] = '\0';` 用于找到并去除换行符，将其替换为字符串终止符 `\0`。
   - `strcspn(line, "\n")` 会返回 `line` 中第一个 `\n` 的位置（如果存在），否则返回字符串的长度。

3. **EOF 结束输入**：
   - `fgets` 返回 `NULL` 表示到达 EOF（在终端中通常用 `Ctrl+D` 输入结束符），循环停止。

### 示例输入与输出

假设输入如下：

```plaintext
123 + 456 * 789
42 - 7
(10 + 5) * 3
```

程序输出：

```plaintext
Enter multiple lines (press Ctrl+D to end input):
Processed line: 123 + 456 * 789
Processed line: 42 - 7
Processed line: (10 + 5) * 3
End of input.
```

### 总结

- **逐行读取**：`fgets` 会读取输入到缓冲区，识别每一行直到换行符或 EOF。
- **换行符处理**：可以使用 `strcspn` 移除行末的换行符，以便于进一步的字符串处理。
- **结束读取**：当 `fgets` 返回 `NULL` 时，表示已经达到 EOF，可以停止读取。

## line[strcspn(line, "\n")] = '\0'  

这一行代码：

```c
line[strcspn(line, "\n")] = '\0';
```

用于去除字符串 `line` 中的换行符 `\n`，将它替换为字符串结束符 `\0`，以便后续处理时不包含换行符。

### 代码详解

- **`strcspn(line, "\n")`**：这是一个 C 标准库函数，用于查找 `line` 字符串中第一次出现 `"\n"` 的位置。
  - `strcspn` 的作用是计算 `line` 中前面不包含 `\n` 的字符数，因此它返回的就是 `\n` 的索引位置。
  - 如果 `line` 中没有换行符 `\n`，`strcspn(line, "\n")` 将返回 `line` 的长度（因为没有匹配到换行符）。

- **`line[...] = '\0';`**：将 `line` 中 `\n` 的位置替换为 `\0`。
  - `\0` 是 C 字符串的结束标志，将换行符替换成 `\0` 后，这一行就被正确截断了，换行符也被移除了。

### 为什么需要这行代码？

当我们使用 `fgets` 读取输入时，如果用户输入一行并按下 Enter 键，`fgets` 会包含换行符 `\n`，所以在 `line` 中我们得到的内容可能是 `"123 + 456 * 789\n"`。直接带换行符的字符串在后续处理（如打印、拼接等）时可能会引起不便或影响输出的美观。

通过这行代码，可以将 `"123 + 456 * 789\n"` 转换为 `"123 + 456 * 789"`，去除了最后的换行符，使字符串更加适合进一步处理或输出。

### 示例

假设 `line` 的内容是 `"hello\n"`，执行这行代码后：

- `strcspn(line, "\n")` 返回 `5`（换行符的索引位置）。
- `line[5] = '\0';` 将换行符替换为字符串结束符 `\0`。

最后，`line` 的内容会变成 `"hello"`（不包含换行符）。

## 输入的终止

在这个代码片段中，`fgets` 逐行读取输入，默认没有输入终止条件。当在控制台运行时，可以通过输入 `EOF` (End Of File) 来结束输入，通常在 Linux/macOS 终端中按下 `Ctrl+D`，在 Windows 控制台中按下 `Ctrl+Z` 然后回车。

如果希望在代码中指定一个终止输入的条件，例如输入一个特定的单词或符号（如 "exit"）来停止读取，可以在循环中添加条件检查。

### 示例代码：使用特定输入终止

以下代码示例增加了一个终止条件，允许输入 `exit` 来结束输入。

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_EXPR_LENGTH 1024

int main() {
    char line[MAX_EXPR_LENGTH];  // 用于存储每行输入的缓冲区

    printf("Enter multiple lines (type 'exit' to end input):\n");

    while (fgets(line, sizeof(line), stdin) != NULL) {
        // 去掉行末的换行符
        line[strcspn(line, "\n")] = '\0';

        // 检查是否输入了 "exit" 来终止输入
        if (strcmp(line, "exit") == 0) {
            break; // 退出循环
        }

        // 处理或输出当前行
        printf("Processed line: %s\n", line);
    }

    printf("End of input.\n");
    return 0;
}
```

### 代码说明

- **`fgets` 读取一行输入**：每次读取一行，并存储到 `line` 数组中。
- **去掉换行符**：使用 `line[strcspn(line, "\n")] = '\0';` 去掉行末的换行符。
- **检查终止条件**：使用 `strcmp(line, "exit") == 0` 检查用户是否输入了 `"exit"`。如果是，则退出循环，终止输入。
- **打印并处理行内容**：如果不是终止条件，则打印或处理该行内容。

### 示例运行

在终端中运行后：

```plaintext
Enter multiple lines (type 'exit' to end input):
hello
Processed line: hello
world
Processed line: world
exit
End of input.
```

这样，输入 `"exit"` 后程序会结束输入。这个方法比依赖 `EOF` 更加用户友好，特别是在交互式程序中。

## 从**标准输入** (`stdin`) 修改为从文件读取内容，可以通过 `fopen` 打开指定的文件，替换 `fgets` 中的输入流 `stdin` 为文件流指针

---

ANSI颜色代码字符串

## 讲解strchr feof

在C语言中，`strchr` 和 `feof` 是用于字符串处理和文件操作的两个标准库函数。下面是它们的详细介绍及在代码中的作用说明。

### 1. `strchr` 函数

`strchr` 用于在字符串中查找特定字符的首次出现位置。它的原型在`<string.h>`头文件中定义，通常用来检查字符串中是否包含某个特定字符。

#### 原型

```c
char *strchr(const char *str, int c);
```

- **参数**
  - `str`：要搜索的字符串。
  - `c`：要查找的字符（以`int`表示，但会自动转换为`char`）。

- **返回值**
  - 如果找到字符 `c`，则返回指向该字符在字符串中的指针。
  - 如果未找到字符 `c`，则返回 `NULL`。

#### 用法示例

```c
char str[] = "Hello, world!";
char *pos = strchr(str, 'w');
if (pos != NULL) {
    printf("Found 'w' at position: %ld\n", pos - str);
} else {
    printf("Character not found.\n");
}
```

在上面的代码中，`strchr` 搜索字符 `w` 的位置，找到后返回指针位置。

#### 代码中的作用

在上面的代码中：

```c
if (strchr(line, '\n') == NULL && !feof(file))
```

- `strchr(line, '\n') == NULL` 检查当前行是否包含换行符 `\n`，如果返回 `NULL`，说明`line`的内容没有换行符。
- 如果此时 `feof(file)` 返回 `0`（即文件未到末尾），说明当前行超过了缓冲区的最大长度（4096字符），因此还未读到完整的行内容。

### 2. `feof` 函数

`feof` 用于检查文件流是否到达文件末尾。它的原型在`<stdio.h>`头文件中定义，常用于循环中判断文件是否已被完整读取。

#### 原型

```c
int feof(FILE *stream);
```

- **参数**
  - `stream`：文件指针，指向已打开的文件。

- **返回值**
  - 如果文件流到达文件末尾，返回非零值（`1`），否则返回 `0`。

#### 用法示例

```c
FILE *file = fopen("example.txt", "r");
if (file == NULL) {
    perror("Error opening file");
    return -1;
}

while (!feof(file)) {
    char buffer[100];
    if (fgets(buffer, sizeof(buffer), file) != NULL) {
        printf("%s", buffer);
    }
}

fclose(file);
```

在上面的代码中，`feof` 用于检查文件是否到达末尾，使得 `while` 循环继续读取文件内容直到结束。

#### 代码中的作用

在代码中：

```c
if (strchr(line, '\n') == NULL && !feof(file))
```

- `!feof(file)` 用于判断文件未结束的情况下，是否有超过一行的字符仍未读取。这个判断与 `strchr` 的条件组合起来，可以准确判断文件中是否有超长行。

## 如何获取打印的内容并记录在变量里

在 C 程序中，如果想将 `printf` 打印的内容捕获到一个变量中，可以使用 `sprintf` 或 `snprintf` 函数将格式化字符串直接存储到字符串变量中，而不是打印到标准输出。除此之外，还可以使用 `freopen`、`pipe` 或 `popen` 等方式重定向输出流，获取更多复杂场景下的输出内容。

### 方法1：使用 `sprintf` 或 `snprintf`

最简单的方法是使用 `sprintf` 或 `snprintf` 将输出存储在字符串缓冲区中，而不打印到屏幕上。

```c
#include <stdio.h>

int main() {
    char buffer[100];  // 用于存储打印内容的变量

    int num = 10;
    sprintf(buffer, "The number is: %d", num);  // 将内容格式化并存储到 buffer 中

    printf("Stored in buffer: %s\n", buffer);   // 打印存储的内容
    return 0;
}
```

### 方法2：使用 `freopen` 重定向 `stdout` 到文件

在某些场景中，可以使用 `freopen` 将标准输出重定向到一个文件，然后从文件中读取内容并存储到变量中。

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    // 将 stdout 重定向到一个文件
    freopen("output.txt", "w", stdout);

    // 打印内容会写入文件而不是控制台
    printf("This content is redirected to a file.\n");

    // 恢复 stdout 输出到控制台
    freopen("/dev/tty", "a", stdout);

    // 从文件读取内容到变量
    FILE *fp = fopen("output.txt", "r");
    if (!fp) {
        perror("Failed to open file");
        return 1;
    }

    char buffer[100];
    fgets(buffer, sizeof(buffer), fp);
    fclose(fp);

    printf("Stored content: %s\n", buffer);  // 显示读取到的内容
    return 0;
}
```

### 方法3：使用 `popen` 捕获外部命令输出

如果你想要从外部命令捕获输出内容并存储在变量中，可以使用 `popen`。

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    FILE *fp;
    char buffer[100];

    // 使用 popen 执行命令，并打开读取管道
    fp = popen("./build/gen-expr 10", "r");
    if (fp == NULL) {
        perror("Failed to run command");
        return 1;
    }

    // 从命令输出中读取内容并存储到 buffer 中
    if (fgets(buffer, sizeof(buffer), fp) != NULL) {
        printf("Output stored in buffer: %s\n", buffer);
    }

    // 关闭管道
    pclose(fp);

    return 0;
}
```

### 方法4：使用 `asprintf` 将格式化字符串存储到变量中（GNU 扩展）

如果使用 GNU C 库，可以使用 `asprintf`，它会自动分配足够的内存来存储字符串并返回指针。

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    char *buffer;
    int num = 10;

    // 使用 asprintf 格式化并分配内存
    asprintf(&buffer, "The number is: %d", num);

    printf("Stored in buffer: %s\n", buffer);

    free(buffer);  // 使用完后释放内存
    return 0;
}
```

### 总结

- **`sprintf` / `snprintf`**：直接存储到缓冲区。
- **`freopen` 重定向 `stdout`**：适合将多条 `printf` 输出内容捕获到文件再读取。
- **`popen` 捕获外部命令输出**：执行命令并捕获其输出。
- **`asprintf` (GNU 扩展)**：自动分配内存并存储格式化字符串。

## 建一个数量待定还是建一个定长的存储

在选择使用定长存储还是数量待定（动态分配）的存储时，可以根据数据的特点、内存使用效率以及项目需求来做决定。以下是一些使用定长和动态分配存储时的考虑因素。

### 1. 定长存储（固定大小的数组）

如果可以确定数据的数量上限（即数组的大小是固定且已知的），则可以使用定长存储。定长存储分配的是一块连续内存，管理和访问更简单、速度更快，但会占用固定大小的内存。

#### 使用场景

- **确定数据数量上限**：如缓存、少量临时数据等。
- **性能要求较高**：定长数组存储在栈上，内存分配和释放效率较高。
- **内存资源较充足**：定长数组会在栈或堆上分配一块固定大小的内存。

#### 示例

```c
#include <stdio.h>

#define MAX_SIZE 100

int main() {
    int fixed_array[MAX_SIZE]; // 定长数组，大小为 MAX_SIZE
    // 初始化和使用数组
    for (int i = 0; i < MAX_SIZE; i++) {
        fixed_array[i] = i * 2;
    }
    printf("Last element: %d\n", fixed_array[MAX_SIZE - 1]);
    return 0;
}
```

### 2. 动态分配存储（可变大小的数组）

如果数据的数量不确定或可能变化，使用动态分配存储（`malloc`、`realloc`）更为灵活。动态分配存储会在堆上分配内存，可以根据需求随时调整大小。

#### 使用场景

- **数据大小不可预测**：如用户输入、需要扩展的数据结构。
- **内存有限且需要灵活使用**：动态分配的内存更能适应不确定的数据量，避免过多分配。
- **复杂的数据结构**：如链表、树等，常使用动态分配来适应不同数据量。

#### 示例

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int initial_size = 10;
    int *dynamic_array = malloc(initial_size * sizeof(int)); // 动态分配

    if (dynamic_array == NULL) {
        perror("Memory allocation failed");
        return 1;
    }

    // 使用数组
    for (int i = 0; i < initial_size; i++) {
        dynamic_array[i] = i * 2;
    }
    printf("Last element: %d\n", dynamic_array[initial_size - 1]);

    // 如果需要更大空间，可以使用 realloc 调整大小
    int new_size = 20;
    dynamic_array = realloc(dynamic_array, new_size * sizeof(int));
    if (dynamic_array == NULL) {
        perror("Reallocation failed");
        return 1;
    }

    // 使用扩展后的数组
    for (int i = initial_size; i < new_size; i++) {
        dynamic_array[i] = i * 3;
    }
    printf("New last element: %d\n", dynamic_array[new_size - 1]);

    // 释放动态分配的内存
    free(dynamic_array);
    return 0;
}
```

### 3. 总结：选择依据

- **确定数据量上限** ➔ 使用定长数组。
- **数据量不确定或可能变化** ➔ 使用动态分配。
- **性能要求高** ➔ 使用定长数组（适合栈上操作的临时数据）。
- **内存节省和灵活性更重要** ➔ 使用动态分配。

这两个方法各有优缺点，根据需求选择适合的存储方式即可。
