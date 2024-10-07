### 示例1：一维数组的定义与初始化

**代码解释**：
定义了一个一维数组 `numbers`，并初始化为 `{1, 2, 3, 4, 5}`。通过 `for` 循环遍历数组，输出每个元素的值。

**代码段**：

```c
int numbers[5] = {1, 2, 3, 4, 5};
for (int i = 0; i < 5; i++)
{
    printf("numbers[%d] = %d\n", i, numbers[i]);
}
```

**输出**：

```
numbers[0] = 1
numbers[1] = 2
numbers[2] = 3
numbers[3] = 4
numbers[4] = 5
```

### 示例2：数组的遍历与修改

**代码解释**：
定义数组 `numbers2`，并在遍历过程中将每个元素的值乘以 2，再输出修改后的值。

**代码段**：

```c
int numbers2[5] = {10, 20, 30, 40, 50};
for (int i = 0; i < 5; i++)
{
    numbers2[i] *= 2;
    printf("修改后的 numbers2[%d] = %d\n", i, numbers2[i]);
}
```

**输出**：

```
修改后的 numbers2[0] = 20
修改后的 numbers2[1] = 40
修改后的 numbers2[2] = 60
修改后的 numbers2[3] = 80
修改后的 numbers2[4] = 100
```

### 示例3：二维数组的定义与遍历

**代码解释**：
定义了一个 3x3 的二维数组 `matrix`，并通过双重 `for` 循环遍历数组，输出每个元素的值。

**代码段**：

```c
int matrix[3][3] = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};
for (int i = 0; i < 3; i++)
{
    for (int j = 0; j < 3; j++)
    {
        printf("matrix[%d][%d] = %d\n", i, j, matrix[i][j]);
    }
    printf("\n");
}
```

**输出**：

```
matrix[0][0] = 1
matrix[0][1] = 2
matrix[0][2] = 3

matrix[1][0] = 4
matrix[1][1] = 5
matrix[1][2] = 6

matrix[2][0] = 7
matrix[2][1] = 8
matrix[2][2] = 9
```

### 示例4：字符数组（字符串）的定义与初始化

**代码解释**：
定义了一个字符数组 `greeting`，并将其初始化为 `"Hello"`。字符串以 `\0` 结束，表示字符串结束符。

**代码段**：

```c
char greeting[6] = {'H', 'e', 'l', 'l', 'o', '\0'};
printf("greeting: %s\n", greeting);
```

**输出**：

```
greeting: Hello
```

### 示例5：使用字符串常量

**代码解释**：
定义了一个字符串常量 `greeting2`，并直接赋值为 `"Hello World!"`。字符串可以直接使用双引号定义。

**代码段**：

```c
char greeting2[] = "Hello World!";
printf("greeting2: %s\n", greeting2);
```

**输出**：

```
greeting2: Hello World!
```

### 示例6：字符串的输入与输出

**代码解释**：
通过 `fgets` 函数从标准输入读取字符串，并通过 `printf` 输出用户输入的字符串。`fgets` 可以防止缓冲区溢出。

**代码段**：

```c
char name[50];
printf("请输入您的名字：");
fgets(name, 50, stdin);
printf("您好，%s！\n", name);
```

**输出**：

```
请输入您的名字：John
您好，John！
```

### 示例7：字符串的复制

**代码解释**：

- 通过 `strcpy` 函数将 `src` 字符串的内容复制到 `dest` 字符串中。
- `strcpy` 函数从源字符串复制字符到目标数组，直到遇到字符串结束符 `\0`。
- 注意：`dest` 需要足够大，以容纳源字符串及其结束符。

**代码段**：

```c
char src[] = "Hello, World!";
char dest[20];
strcpy(dest, src);
printf("src: %s\n", src);
printf("dest: %s\n", dest);
```

**输出**：

```
src: Hello, World!
dest: Hello, World!
```

**详解**：

- `src` 是源字符串，`dest` 是目标字符串。通过 `strcpy`，`src` 的内容被完整复制到了 `dest` 中。
- `strcpy` 不会检查目标字符串的大小，因此在实际使用中，必须确保目标数组足够大，否则会导致溢出。

### 示例8：字符串连接

**代码解释**：

- 通过 `strcat` 函数将 `str2` 连接到 `str1` 后面，并将结果存储在 `result_str` 中。
- `strcat` 函数将目标字符串视为已有字符串的末尾，并将源字符串添加到末尾，最后自动添加结束符 `\0`。

**代码段**：

```c
char str1[] = "Hello, ";
char str2[] = "C!";
char result_str[30]; // 预留足够空间
strcpy(result_str, str1); // 先复制第一个字符串
strcat(result_str, str2); // 然后连接第二个字符串
printf("result_str: %s\n", result_str);
```

**输出**：

```
result_str: Hello, C!
```

**详解**：

- `strcpy` 先将 `str1` 复制到 `result_str` 中，然后 `strcat` 将 `str2` 连接到 `result_str` 的末尾。
- `result_str` 必须有足够的空间来容纳 `str1` 和 `str2`，否则可能导致内存错误。

### 示例9：字符串比较

**代码解释**：

- 通过 `strcmp` 函数比较两个字符串 `str3` 和 `str4`，并根据比较结果输出信息。
- `strcmp` 函数按字典顺序比较字符串，返回一个整数值：
  - 小于 0 表示 `str3` 小于 `str4`。
  - 大于 0 表示 `str3` 大于 `str4`。
  - 等于 0 表示两个字符串相等。

**代码段**：

```c
char str3[] = "apple";
char str4[] = "orange";
int result = strcmp(str3, str4);
if (result < 0)
{
    printf("%s 小于 %s\n", str3, str4);
}
else if (result > 0)
{
    printf("%s 大于 %s\n", str3, str4);
}
else
{
    printf("%s 等于 %s\n", str3, str4);
}
```

**输出**：

```
apple 小于 orange
```

**详解**：

- `strcmp` 比较两个字符串的每个字符，直到发现第一个不同的字符。如果其中一个字符串较短且前面的字符都相同，则短的字符串被认为较小。

### 示例10：字符串长度

**代码解释**：

- 通过 `strlen` 函数计算字符串 `str5` 的长度（不包括结束符 `\0`），并输出结果。
- `strlen` 函数遍历字符串，直到遇到 `\0`，并返回字符的个数。

**代码段**：

```c
char str5[] = "Hello, World!";
int length = strlen(str5); // 计算字符串的长度
printf("字符串\"%s\"的长度是: %d\n", str5, length);
```

**输出**：

```
字符串"Hello, World!"的长度是: 13
```

**详解**：

- `strlen` 函数计算的长度不包括字符串的结束符 `\0`，只计算实际的字符数量。
- 字符串 `str5` 包含 13 个字符，不包括结束符。

### 示例11：字符数组与指针的关系

**代码解释**：

- 定义一个字符数组 `str6`，并使用指针 `ptr` 指向它的首元素。
- 通过 `while` 循环和指针运算遍历字符串，直到遇到字符串结束符 `\0`。

**代码段**：

```c
char str6[] = "Pointer Example";
char *ptr = str6;
while (*ptr != '\0')
{
    printf("%c", *ptr);
    ptr++;
}
printf("\n");
```

**输出**：

```
Pointer Example
```

**详解**：

- `ptr` 是指向字符数组 `str6` 的指针，指针可以像数组索引一样访问数组中的元素。
- `while` 循环通过指针遍历字符串，直到遇到结束符。

### 示例12：多维数组的初始化与使用

**代码解释**：

- 定义一个 3 维数组 `arr`，并通过三重循环访问数组的每个元素。
- 这种多维数组的形式常用于表示复杂的数据结构，如矩阵、立方体等。

**代码段**：

```c
int arr[2][2][2] = {
    {{1, 2}, {3, 4}},
    {{5, 6}, {7, 8}}
};
for (int i = 0; i < 2; i++)
{
    for (int j = 0; j < 2; j++)
    {
        for (int k = 0; k < 2; k++)
        {
            printf("arr[%d][%d][%d] = %d\n", i, j, k, arr[i][j][k]);
        }
    }
}
```

**输出**：

```
arr[0][0][0] = 1
arr[0][0][1] = 2
arr[0][1][0] = 3
arr[0][1][1] = 4
arr[1][0][0] = 5
arr[1][0][1] = 6
arr[1][1][0] = 7
arr[1][1][1] = 8
```

**详解**：

- 多维数组可以被视为嵌套的数组。`arr[2][2][2]` 是一个包含 2 个 2x2 矩阵的三维数组。
- 通过三重循环可以访问每个元素，遍历顺序是按数组的每一维进行嵌套遍历。

### 示例13：数组作为函数参数传递

**代码解释**：

- 在 C 语言中，数组可以作为函数参数传递。传递的是数组的首地址，而不是整个数组。
- 这里定义了一个 `print_array` 函数，用于接收一个数组及其大小，然后通过循环输出数组的每个元素。

**代码段**：

```c
void print_array(int arr[], int size)
{
    for (int i = 0; i < size; i++)
    {
        printf("%d ", arr[i]);
    }
    printf("\n");
}
```

**输出**：

```
1 2 3 4 5 
```

**详解**：

- `print_array` 函数接收一个数组 `arr` 和它的大小 `size`，通过遍历输出数组元素。
- 注意，传递给函数的数组是通过引用传递的，因此在函数内部对数组元素的修改会影响到原数组。

### 示例14：字符数组操作示例

**代码解释**：

- 演示了字符数组的定义和修改。字符串实际上是一个字符数组，因此可以直接通过下标修改字符串中的字符。

**代码段**：

```c
char name2[20] = "john Doe";
printf("name: %s\n", name2);
name2[0] = 'J';  // 修改字符串的第一个字符
printf("修改后的name: %s\n", name2);
```

**输出**：

```
name: john Doe
修改后的name: John Doe
```

**详解**：

- 字符数组 `name2` 初始化为 "john Doe"，通过 `name2[0] = 'J';` 修改了首字符，将小写 `j` 改为大写 `J`。
- 由于字符数组是可修改的，因此可以直接通过下标操作对其内容进行修改。

### 示例15：冒泡排序算法

**代码解释**：

- 实现了经典的冒泡排序算法，它通过反复交换相邻的元素，将较大的元素逐步移到数组末尾，从而实现排序。

**代码段**：

```c
void bubble_sort(int arr[], int size)
{
    for (int i = 0; i < size - 1; i++)
    {
        for (int j = 0; j < size - i - 1; j++)
        {
            if (arr[j] > arr[j + 1])
            {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}
```

**输出**：

```
排序前的数组：
64 34 25 12 22 11 90 
排序后的数组：
11 12 22 25 34 64 90
```

**详解**：

- 冒泡排序的核心思想是：从数组的头部开始，每次比较相邻的两个元素，如果它们顺序不正确，就交换它们的位置。
- 每完成一次内层循环，当前未排序部分的最大元素会被移动到该部分的最后位置。
- 该算法的时间复杂度是 O(n²)，适合用于数据量较小的排序任务。

### 示例16：二维字符数组 - 存储多个字符串

**代码解释**：

- 通过二维字符数组来存储多个字符串。二维数组的每一行都是一个字符串。
- 使用循环遍历二维字符数组，输出每个字符串。

**代码段**：

```c
char fruits[3][20] = {
    "Apple",
    "Banana",
    "Cherry"
};
for (int i = 0; i < 3; i++)
{
    printf("%s\n", fruits[i]);
}
```

**输出**：

```
Apple
Banana
Cherry
```

**详解**：

- 二维字符数组 `fruits[3][20]` 定义了 3 个长度为 20 的字符串。
- 每一行都是一个独立的字符串，因此可以通过循环 `fruits[i]` 来逐行访问这些字符串。
- 这种形式适合用于存储多个字符串或文本行。

### 示例17：指向数组的指针

**代码解释**：

- 演示了如何使用指向数组的指针。定义了一个数组 `values`，并使用一个指向数组的指针 `arr_ptr` 来访问数组中的元素。
- 使用 `(*arr_ptr)[i]` 语法访问指针所指向的数组元素。

**代码段**：

```c
int values[5] = {10, 20, 30, 40, 50};
int (*arr_ptr)[5] = &values;
printf("第一个元素的值: %d\n", (*arr_ptr)[0]);
printf("第二个元素的值: %d\n", (*arr_ptr)[1]);
```

**输出**：

```
第一个元素的值: 10
第二个元素的值: 20
```

**详解**：

- `arr_ptr` 是一个指向包含 5 个元素的数组的指针，它指向数组 `values`。
- 通过解引用 `(*arr_ptr)`，可以获得整个数组，然后通过数组下标来访问元素，如 `(*arr_ptr)[0]`。
- 指向数组的指针可以在函数参数中使用，传递整个数组的引用，而不是数组的首地址。

### 示例18：动态分配一维数组

**代码解释**：

- 使用 `malloc` 函数动态分配内存来创建一维数组。动态分配的数组大小由用户输入决定。
- 动态分配的内存需要手动释放，使用 `free` 函数。

**代码段**：

```c
int dyamic_array_size;
printf("请输入数组的大小: ");
scanf("%d", &dyamic_array_size);
int *dynamic_array = (int *)malloc(dyamic_array_size * sizeof(int));
if (dynamic_array == NULL)
{
    printf("内存分配失败\n");
    return 1;
}
for (int i = 0; i < dyamic_array_size; i++)
{
    dynamic_array[i] = i + 1; // 初始化数组元素
}
printf("动态分配的数组: ");
for (int i = 0; i < dyamic_array_size; i++)
{
    printf("%d ", dynamic_array[i]);
}
printf("\n");
free(dynamic_array); // 释放动态分配的内存
```

**输出**：

```
请输入数组的大小: 5
动态分配的数组: 1 2 3 4 5 
```

**详解**：

- `malloc` 函数用于动态分配内存，它返回指向分配内存的指针。
- 通过用户输入决定数组的大小，然后使用 `malloc` 根据大小分配相应的内存空间。
- 内存分配后，必须在不再使用时通过 `free` 函数释放，否则会导致内存泄漏。

### 示例19：动态分配二维数组

**代码解释**：

- 使用 `malloc` 动态分配二维数组，行和列的大小由用户输入决定。
- 通过嵌套的 `for` 循环初始化和访问动态分配的二维数组。
- 动态分配的内存需要在使用后手动释放。

**代码段**：

```c
int rows, cols;
printf("请输入二维数组的行数和列数: ");
scanf("%d %d", &rows, &cols);

// 动态分配二维数组
int **dynamic_2d_array = (int **)malloc(rows * sizeof(int *));
for (int i = 0; i < rows; i++)
{
    dynamic_2d_array[i] = (int *)malloc(cols * sizeof(int));
}

// 初始化二维数组
for (int i = 0; i < rows; i++)
{
    for (int j = 0; j < cols; j++)
    {
        dynamic_2d_array[i][j] = i * cols + j + 1;
    }
}

// 打印二维数组
printf("动态分配的二维数组: \n");
for (int i = 0; i < rows; i++)
{
    for (int j = 0; j < cols; j++)
    {
        printf("%d ", dynamic_2d_array[i][j]);
    }
    printf("\n");
}

// 释放动态分配的内存
for (int i = 0; i < rows; i++)
{
    free(dynamic_2d_array[i]);
}
free(dynamic_2d_array);
```

**输出**：

```
请输入二维数组的行数和列数: 2 3
动态分配的二维数组:
1 2 3 
4 5 6
```

**详解**：

- 使用 `malloc` 函数分别为二维数组的行和列分配内存。二维数组的每一行是通过 `malloc` 动态分配的一个一维数组。
- 在初始化数组时，采用了 `i * cols + j + 1` 的方式为每个元素赋值，这只是一个示例初始化方法，你可以根据实际需要进行修改。
- 完成操作后，需使用 `free` 函数释放每行及整个二维数组的内存，避免内存泄漏。

### 示例20：使用 `strtok()` 分割字符串

**代码解释**：

- `strtok()` 函数用于分割字符串，它会返回字符串中按指定分隔符分割的每个子字符串。
- 每次调用 `strtok()` 都会返回下一个子字符串，直到返回 `NULL` 表示没有更多的子字符串。

**代码段**：

```c
char sentence[] = "Hello, World! This is a test.";
char *token = strtok(sentence, " "); // 使用空格作为分隔符, 返回第一个单词
while (token != NULL)
{
    printf("%s\n", token);
    token = strtok(NULL, " "); // 继续分割下一个单词
}
```

**输出**：

```
Hello,
World!
This
is
a
test.
```

**详解**：

- `strtok()` 第一次调用时，传入待分割的字符串和分隔符，返回第一个分割出的子字符串。
- 之后每次调用时，需要将字符串参数设置为 `NULL`，以告诉 `strtok()` 继续在上次的位置之后查找下一个子字符串。
- `strtok()` 直接修改了原字符串，将每个分隔符替换为 `\0`，因此原字符串在分割后不可再用作完整的字符串。

### 示例21：查找字符在字符串中的位置

**代码解释**：

- 使用 `strchr()` 查找字符在字符串中的首次出现。
- 如果找到字符，则返回一个指向该字符在字符串中位置的指针；如果未找到，返回 `NULL`。

**代码段**：

```c
char search_str[] = "Find character in string";
char ch = 'i';
char *position = strchr(search_str, ch); // 查找字符 'i'
if (position != NULL)
{
    printf("字符 '%c' 在字符串中的位置是: %ld\n", ch, position - search_str);
}
else
{
    printf("字符 '%c' 在字符串中未找到\n", ch);
}
```

**输出**：

```
字符 'i' 在字符串中的位置是: 1
```

**详解**：

- `strchr()` 函数用于查找字符 `ch` 在字符串 `search_str` 中的首次出现。
- 如果找到该字符，函数返回指向该字符的指针。通过 `position - search_str` 可以计算出字符在字符串中的索引位置。
- 若字符未找到，返回 `NULL`。

### 示例22：查找字符串在字符串中的位置

**代码解释**：

- 使用 `strstr()` 函数查找子字符串在主字符串中的首次出现。
- 返回指向子字符串起始位置的指针，如果未找到则返回 `NULL`。

**代码段**：

```c
char main_str[] = "This is a test string";
char search_sub_str[] = "test";
char *position_sub_str = strstr(main_str, search_sub_str); // 查找子字符串
if (position_sub_str != NULL)
{
    printf("子字符串 '%s' 在字符串中的位置是: %ld\n", search_sub_str, position_sub_str - main_str);
}
else
{
    printf("子字符串 '%s' 在字符串中未找到\n", search_sub_str);
}
```

**输出**：

```
子字符串 'test' 在字符串中的位置是: 10
```

**详解**：

- `strstr()` 函数用于查找子字符串 `search_sub_str` 在主字符串 `main_str` 中的首次出现。
- 如果找到该子字符串，函数返回指向它在主字符串中的位置。通过 `position_sub_str - main_str` 可以计算出子字符串的起始索引。
- 如果子字符串未找到，返回 `NULL`。

### 示例23：数组的反转

**代码解释**：

- 反转一个数组，即将数组的第一个元素和最后一个元素交换，第二个元素和倒数第二个元素交换，依此类推。
- 采用的是双指针法，通过交换对应的元素来实现反转。

**代码段**：

```c
int numbers_to_reverse[] = {1, 2, 3, 4, 5};
int size_of_numbers_to_reverse = sizeof(numbers_to_reverse) / sizeof(numbers_to_reverse[0]);

printf("反转前的数组: ");
for (int i = 0; i < size_of_numbers_to_reverse; i++)
{
    printf("%d ", numbers_to_reverse[i]);
}
printf("\n");

// 反转数组
for (int i = 0; i < size_of_numbers_to_reverse / 2; i++)
{
    int temp = numbers_to_reverse[i];
    numbers_to_reverse[i] = numbers_to_reverse[size_of_numbers_to_reverse - i - 1];
    numbers_to_reverse[size_of_numbers_to_reverse - i - 1] = temp;
}

printf("反转后的数组: ");
for (int i = 0; i < size_of_numbers_to_reverse; i++)
{
    printf("%d ", numbers_to_reverse[i]);
}
printf("\n");
```

**输出**：

```
反转前的数组: 1 2 3 4 5 
反转后的数组: 5 4 3 2 1 
```

**详解**：

- 通过一个 `for` 循环实现数组反转。循环的次数是数组长度的一半，在每次循环中交换前后对应的元素。
- 使用一个 `temp` 变量暂存元素的值，避免在交换时丢失数据。

### 示例24：将字符串转为整数

**代码解释**：

- 使用 `atoi()` 函数将字符串转换为整数。该函数会解析字符串中的数字，并返回对应的整数值。
- 如果字符串中包含无法转换为数字的字符，则会忽略这些字符，仅转换有效的数字部分。

**代码段**：

```c
char num_str[] = "12345";
int num = atoi(num_str); // 将字符串转为整数
printf("字符串 \"%s\" 转换为整数: %d\n", num_str, num);
```

**输出**：

```
字符串 "12345" 转换为整数: 12345
```

**详解**：

- `atoi()` 函数用于将字符串 `num_str` 中的数字部分转换为整数。对于非数字字符，函数会忽略它们。
- 如果字符串无法解析为有效的整数，函数返回 0。

### 示例25：将整数转为字符串

**代码解释**：

- 使用 `sprintf()` 函数将整数转换为字符串。该函数将格式化后的整数值存入字符数组。
- 常用于需要将数字与字符串组合的场景。

**代码段**：

```c
int num_to_str = 12345;
char result_str[20];
sprintf(result_str, "%d", num_to_str); // 将整数转为字符串
printf("整数 %d 转换为字符串: \"%s\"\n", num_to_str, result_str);
```

**输出**：

```
整数 12345 转

换为字符串: "12345"
```

**详解**：

- `sprintf()` 函数类似于 `printf()`，但它的输出目标是字符数组而非终端。
- 它将格式化后的字符串存储在 `result_str` 中，`%d` 用于将整数格式化为字符串。
- 这种方式可以灵活地将数字与字符串结合在一起用于输出或存储。

### 示例26：字符串到浮点数的转换

**代码解释**：

- 使用 `atof()` 函数将字符串转换为浮点数。
- 该函数解析字符串中的数字部分，并返回对应的浮点数值。

**代码段**：

```c
char float_str[] = "123.45";
float float_num = atof(float_str); // 将字符串转为浮点数
printf("字符串 \"%s\" 转换为浮点数: %f\n", float_str, float_num);
```

**输出**：

```
字符串 "123.45" 转换为浮点数: 123.450000
```

### 示例27：使用 `memcmp()` 比较内存块

**代码解释**：

- 使用 `memcmp()` 函数比较两个内存块的前 n 个字节。
- 返回值为 0 表示相等，为负数表示第一个内存块小于第二个，为正数表示第一个内存块大于第二个。

**代码段**：

```c
char memory_block1[] = "Hello, World!";
char memory_block2[] = "Hello, wOrld!";
int result_memcmp = memcmp(memory_block1, memory_block2, 5); // 比较前5个字节
if (result_memcmp == 0)
{
    printf("两个内存块相等\n");
}
else if (result_memcmp < 0)
{
    printf("第一个内存块小于第二个内存块\n");
}
else
{
    printf("第一个内存块大于第二个内存块\n");
}
```

**输出**：

```
两个内存块相等
```

### 示例28：`memcpy()` 内存复制

**代码解释**：

- 使用 `memcpy()` 函数将源内存块复制到目标内存块中。
- 这是一种快速复制内存内容的方式，适用于数组或结构体的复制。

**代码段**：

```c
char source_mem[] = "Hello, World!";
char destination_mem[20];
memcpy(destination_mem, source_mem, sizeof(source_mem)); // 复制内存块
printf("源内存块: \"%s\"\n", source_mem);
printf("目标内存块: \"%s\"\n", destination_mem);
```

**输出**：

```
源内存块: "Hello, World!"
目标内存块: "Hello, World!"
```

### 示例29：使用 `memset()` 初始化内存

**代码解释**：

- `memset()` 函数用于将指定内存块的前 n 个字节设置为指定的值。
- 常用于初始化数组或内存区域。

**代码段**：

```c
char buffer_mem[20];
memset(buffer_mem, 'A', sizeof(buffer_mem)); // 初始化内存
buffer_mem[sizeof(buffer_mem) - 1] = '\0';   // 确保字符串以 null 结尾
printf("初始化后的内存块: \"%s\"\n", buffer_mem);
```

**输出**：

```
初始化后的内存块: "AAAAAAAAAAAAAAAAAAA"
```

### 示例30：指针数组的使用

**代码解释**：

- 通过定义指针数组，存储多个字符串的指针。
- 使用数组下标访问指针所指向的字符串。

**代码段**：

```c
char *countries[] = {"China", "USA", "Russia", "India"};
int size_of_countries = sizeof(countries) / sizeof(countries[0]);
for (int i = 0; i < size_of_countries; i++)
{
    printf("Country %d: %s\n", i + 1, countries[i]);
}
```

**输出**：

```
Country 1: China
Country 2: USA
Country 3: Russia
Country 4: India
```

### 示例31：数组的按值查找

**代码解释**：

- 通过遍历数组，查找指定的值并返回其索引。
- 找到后立即退出循环，并打印出该值的索引。

**代码段**：

```c
int search_array[] = {1, 2, 3, 4, 5};
int size_of_search_array = sizeof(search_array) / sizeof(search_array[0]);
int search_value = 3;
int found_index = -1;
for (int i = 0; i < size_of_search_array; i++)
{
    if (search_array[i] == search_value)
    {
        found_index = i;
        break;
    }
}
if (found_index != -1)
{
    printf("Value %d found at index %d\n", search_value, found_index);
}
else
{
    printf("Value %d not found\n", search_value);
}
```

**输出**：

```
Value 3 found at index 2
```

### 示例32：使用 `realloc()` 动态调整数组大小

**代码解释**：

- `realloc()` 函数用于调整已经动态分配的内存块的大小。
- 在代码中，首先为数组分配初始大小，然后使用 `realloc()` 扩展数组大小，并对其进行初始化。

**代码段**：

```c
int *dynamic_array1 = (int *)malloc(5 * sizeof(int)); // 动态分配内存
if (dynamic_array1 == NULL)
{
    printf("内存分配失败\n");
    return 1;
}
for (int i = 0; i < 5; i++)
{
    dynamic_array1[i] = i + 1;
}
printf("原始数组: ");
print_array(dynamic_array1, 5);

dynamic_array1 = (int *)realloc(dynamic_array1, 10 * sizeof(int)); // 调整内存大小
if (dynamic_array1 == NULL)
{
    printf("内存调整失败\n");
    return 1;
}
for (int i = 5; i < 10; i++)
{
    dynamic_array1[i] = i + 1;
}
printf("调整后的数组: ");
print_array(dynamic_array1, 10);

free(dynamic_array1); // 释放内存
```

**输出**：

```
原始数组: 1 2 3 4 5 
调整后的数组: 1 2 3 4 5 6 7 8 9 10
```

### 示例33：指针运算与数组

**代码解释**：

- 指针可以通过运算来遍历数组。
- 通过增加指针值，可以访问数组的不同元素，这和使用数组下标的方式效果相同。

**代码段**：

```c
int num_array[] = {1, 2, 3, 4, 5};
int *ptr4 = num_array; // 指向数组第一个元素的指针
for (int i = 0; i < 5; i++)
{
    printf("元素 %d: %d\n", i, *(ptr4 + i)); // 使用指针运算访问数组元素
}
```

**输出**：

```
元素 0: 1
元素 1: 2
元素 2: 3
元素 3: 4
元素 4: 5
```

### 示例34：二维数组中的指针运算

**代码解释**：

- 指针可以通过计算偏移量来访问二维数组中的元素。
- 使用 `*(ptr + i * 行长度 + j)` 的形式来计算二维数组的地址。

**代码段**：

```c
int two_dim_array[2][3] = {{1, 2, 3}, {4, 5, 6}};
int *ptr5 = &two_dim_array[0][0]; // 指向二维数组第一个元素的指针

for (int i = 0; i < 2; i++)
{
    for (int j = 0; j < 3; j++)
    {
        printf("元素 %d, %d: %d\n", i, j, *(ptr5 + i * 3 + j)); // 使用指针运算访问二维数组元素
    }
}
```

**输出**：

```
元素 0, 0: 1
元素 0, 1: 2
元素 0, 2: 3
元素 1, 0: 4
元素 1, 1: 5
元素 1, 2: 6
```

### 示例35：字符串连接 - 使用 `snprintf` 限制缓冲区大小

**代码解释**：

- `snprintf()` 函数将格式化的输出写入缓冲区，同时确保不会超过缓冲区大小，从而避免缓冲区溢出的问题。

**代码段**：

```c
char buffer2[50];
snprintf(buffer2, sizeof(buffer2), "Hello, %s!", "World");
printf("字符串连接结果: %s\n", buffer2);
```

**输出**：

```
字符串连接结果: Hello, World!
```
