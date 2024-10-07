代码仓库 [C-code-examples-manual](https://github.com/lzzsG/C-code-examples-manual/blob/main/1-basic-syntax-and-data-types.c)

### 示例1: 整形变量的声明与赋值

这部分代码展示了如何在C语言中声明整型变量并进行赋值操作。变量 `a` 被赋值为 10，`b` 被赋值为 20，然后计算它们的和 `sum`。通过 `printf` 输出 `a`、`b` 以及它们的和 `sum`。其中，`%d` 是格式化输出符，用于输出整数类型变量。这一示例演示了整型变量的基础声明、赋值和输出。

```c
int a = 10;
int b = 20;
int sum = a + b;
printf("整型变量: a = %d, b = %d, sum = a + b = %d\n", a, b, sum);
```

输出示例：

```
整型变量: a = 10, b = 20, sum = a + b = 30
```

### 示例2: 浮点型变量的声明与计算

这部分代码展示了如何声明浮点型变量，并进行浮点数的乘法运算。变量 `f1` 和 `f2` 分别被赋值为 3.14 和 2.718，计算它们的乘积 `product`。`printf` 输出浮点型结果时使用 `%.2f` 控制小数点后两位的精度。这一示例介绍了浮点型变量的声明、计算以及格式化输出。

```c
float f1 = 3.14;
float f2 = 2.718;
float product = f1 * f2;
printf("浮点型变量: f1 = %.2f, f2 = %.2f, product = f1 * f2 = %.2f\n", f1, f2, product);
```

输出示例：

```
浮点型变量: f1 = 3.14, f2 = 2.72, product = f1 * f2 = 8.54
```

### 示例3: 字符型变量的声明与赋值

该示例展示了字符型变量的声明和赋值。字符变量 `c1` 和 `c2` 被赋值为字符 'A' 和 'B'，通过 `printf` 使用 `%c` 来输出字符类型的数据。这一部分演示了如何在C语言中处理单个字符。

```c
char c1 = 'A';
char c2 = 'B';
printf("字符型变量: c1 = %c, c2 = %c\n", c1, c2);
```

输出示例：

```
字符型变量: c1 = A, c2 = B
```

### 示例4: 布尔型变量的声明与赋值

这一部分使用 `_Bool` 类型来声明布尔变量，并展示了如何通过逻辑判断将整型值转换为布尔值。在C语言中，布尔类型的值可以通过 `0`（表示false）和非零值（表示true）来表示。通过 `printf` 输出布尔值，1表示true，0表示false。

```c
int flag = 1;
_Bool b1 = flag != 0; // 将flag的值转换为布尔值
printf("布尔型变量: flag = %d, b1 = %d\n", flag, b1);
```

输出示例：

```
布尔型变量: flag = 1, b1 = 1
```

### 示例5: 常量

该示例展示了如何定义和使用常量。常量 `MAX_SIZE` 使用 `const` 关键字声明，这意味着它的值在程序运行过程中不能被修改。通过 `printf` 输出常量的值。

```c
const int MAX_SIZE = 100;
printf("常量: MAX_SIZE = %d\n", MAX_SIZE);
```

输出示例：

```
常量: MAX_SIZE = 100
```

### 示例6: 类型转换（隐式与显式）

此示例展示了两种类型转换方式：隐式类型转换和显式类型转换。在隐式类型转换中，C语言自动将 `int` 类型与 `float` 类型相加，并将结果提升为 `float`。显式类型转换通过将 `float` 强制转换为 `int` 来实现。这一部分介绍了C语言中的类型提升和强制类型转换。

```c
int i = 10;
float f = 3.14;
float result = i + f;       // 隐式类型转换，i被提升为float
int result2 = (int)(i + f); // 显式类型转换，结果被转换为int
printf("类型转换: result = i + f = %.2f, 显式转换 result2 = %d\n", result, result2);
```

输出示例：

```
类型转换: result = i + f = 13.14, 显式转换 result2 = 13
```

### 示例7: 算术运算符

这一部分展示了算术运算符的使用，包括加法、减法、乘法、除法和取余操作。通过 `printf` 输出每个运算的结果。`%%` 表示在 `printf` 中输出 `%` 字符。

```c
int x = 15;
int y = 2;
printf("算数运算符: x + y = %d, x - y = %d, x * y = %d, x / y = %d, x %% y = %d\n", x + y, x - y, x * y, x / y, x % y);
```

输出示例：

```
算数运算符: x + y = 17, x - y = 13, x * y = 30, x / y = 7, x % y = 1
```

### 示例8: 递增递减运算符

这个示例展示了递增运算符（`++`）和递减运算符（`--`）的使用，展示了前缀和后缀形式的不同效果。后缀递增 `ii++` 先返回 `ii` 的值再自增，而前缀递增 `++ii` 则是先自增再返回值。

```c
int ii = 5;
printf("递增递减运算符: ii = %d, ii++ = %d, ii = %d, ++ii = %d, ii = %d, ii-- = %d, ii = %d, --ii = %d, ii = %d\n", ii, ii++, ii, ++ii, ii, ii--, ii, --ii, ii);
```

输出示例：

```
递增递减运算符: ii = 5, ii++ = 5, ii = 6, ++ii = 7, ii = 7, ii-- = 7, ii = 6, --ii = 5, ii = 5
```

### 示例9: 关系运算符

这一部分展示了如何使用关系运算符对两个整数 `m` 和 `n` 进行比较。常见的关系运算符包括：

- `>`：大于
- `<`：小于
- `>=`：大于等于
- `<=`：小于等于
- `==`：等于
- `!=`：不等于

每个运算符都会返回一个布尔值：如果条件成立，返回 `1`；如果条件不成立，返回 `0`。通过 `printf` 可以直接输出每个关系表达式的结果。

```c
int m = 10;
int n = 20;
printf("关系运算符: m = %d, n = %d, m > n = %d, m < n = %d, m >= n = %d, m <= n = %d, m == n = %d, m != n = %d\n", m, n, m > n, m < n, m >= n, m <= n, m == n, m != n);
```

**输出示例**：

```
关系运算符: m = 10, n = 20, m > n = 0, m < n = 1, m >= n = 0, m <= n = 1, m == n = 0, m != n = 1
```

### 示例10: 逻辑运算符

这一部分展示了逻辑运算符的使用，包括：

- `&&`（与）：只有两个操作数都为真时，结果才为真；
- `||`（或）：只要有一个操作数为真，结果就为真；
- `!`（非）：对一个布尔值取反。

这里定义了两个布尔变量 `p` 和 `q`，分别为 `1` 和 `0`，用于展示各种逻辑操作的结果。

```c
int p = 1; // true
int q = 0; // false
printf("逻辑运算符: p = %d, q = %d, p && q = %d, p || q = %d, !p = %d, !q = %d\n", p, q, p && q, p || q, !p, !q);
```

**输出示例**：

```
逻辑运算符: p = 1, q = 0, p && q = 0, p || q = 1, !p = 0, !q = 1
```

### 示例11: 位运算符

位运算符直接操作变量的二进制位，包括：

- `&`（按位与）：比较两个二进制数的每一位，如果对应位都为 `1`，则结果为 `1`；
- `|`（按位或）：比较两个二进制数的每一位，如果至少有一个为 `1`，则结果为 `1`；
- `^`（按位异或）：对应位不同为 `1`，相同为 `0`；
- `~`（按位取反）：将每一位取反。

代码中定义了两个整数 `num1` 和 `num2`，它们的二进制分别为 `0110` 和 `0011`，用于展示各种位运算的效果。

```c
int num1 = 6; // 二进制 0110
int num2 = 3; // 二进制 0011
printf("位运算符: num1 = %d(0b0110), num2 = %d(0b0011), num1 & num2 = %d, num1 | num2 = %d, num1 ^ num2 = %d, ~num1 = %d \n", num1, num2, num1 & num2, num1 | num2, num1 ^ num2, ~num1);
```

**输出示例**：

```
位运算符: num1 = 6(0b0110), num2 = 3(0b0011), num1 & num2 = 2, num1 | num2 = 7, num1 ^ num2 = 5, ~num1 = -7
```

### 示例12: 移位运算符

移位运算符用于将二进制数向左或向右移动若干位。左移 `<<` 会将二进制数向左移动，相当于乘以 2 的 n 次方；右移 `>>` 则相当于除以 2 的 n 次方。
在代码中，`shift_num` 的二进制表示是 `1000`，左移和右移后可以看到其二进制变化。

```c
int shift_num = 8; // 二进制 1000
printf("移位运算符: shift_num = %d(0b1000), shift_num << 1 = %d, shift_num >> 1 = %d\n", shift_num, shift_num << 1, shift_num >> 1);
```

**输出示例**：

```
移位运算符: shift_num = 8(0b1000), shift_num << 1 = 16, shift_num >> 1 = 4
```

### 示例13: `sizeof` 运算符

`sizeof` 是一个用于计算数据类型或变量大小的运算符，返回的是该类型在内存中所占的字节数。代码展示了如何使用 `sizeof` 计算 `int`、`float`、`char` 等基本数据类型的大小。

```c
printf("sizeof运算符: sizeof(int) = %lu, sizeof(float) = %lu, sizeof(char) = %lu\n", sizeof(int), sizeof(float), sizeof(char));
```

**输出示例**（大小可能根据系统架构不同而有所差异）：

```
sizeof运算符: sizeof(int) = 4, sizeof(float) = 4, sizeof(char) = 1
```

### 示例14: 复合赋值运算符

复合赋值运算符是将运算和赋值结合在一起的简写形式。`comp_num += 3` 等价于 `comp_num = comp_num + 3`。这一示例展示了这种运算符的简洁性和实用性。

```c
int comp_num = 5;
comp_num += 3; // 等价于 comp_num = comp_num + 3;
printf("复合赋值运算符: comp_num = %d, comp_num += 3, comp_num = %d\n", comp_num, comp_num += 3);
```

**输出示例**：

```
复合赋值运算符: comp_num = 8, comp_num += 3, comp_num = 11
```

### 示例15: 三元运算符

三元运算符 `? :` 是C语言中的简写形式，用于条件判断。它的语法是 `(条件) ? (值1) : (值2)`，如果条件为真，返回 `值1`，否则返回 `值2`。该示例展示了如何根据条件 `a > b` 的结果来决定 `ternary_num` 的值。

```c
int ternary_num = (a > b) ? a : b;
printf("三元运算符: a = %d, b = %d, ternary_num = (a > b) ? a : b, ternary_num = %d\n", a, b, ternary_num);
```

**输出示例**：

```
三元运算符: a = 10, b = 20, ternary_num = (a > b) ? a : b, ternary_num = 20
```

### 示例16: 类型的最大值与最小值

该示例展示了如何使用 `limits.h` 头文件中的常量来获取各种整型类型的最大值和最小值。C语言中 `limits.h` 定义了不同类型的数值范围，例如 `INT_MAX` 表示 `int` 类型的最大值，`INT_MIN` 表示 `int` 类型的最小值。

```c
printf("整型的范围: INT_MAX = %d, INT_MIN = %d\n", INT_MAX, INT_MIN);
printf("无符号整型的范围: UINT_MAX = %u\n", UINT_MAX);
printf("短整型的范围: SHRT_MAX = %d, SHRT_MIN = %d\n", SHRT_MAX, SHRT_MIN);
printf("长整型的范围: LONG_MAX = %ld, LONG_MIN = %ld\n", LONG_MAX, LONG_MIN);
printf("无符号长整型的范围: ULONG_MAX = %lu\n", ULONG_MAX);
printf("长长整型的范围: LLONG_MAX = %lld, LLONG_MIN = %lld\n", LLONG_MAX, LLONG_MIN);
printf("无符号长长整型的范围: ULLONG_MAX = %llu\n", ULLONG_MAX);
```

**输出示例**（根据系统不同可能略有差异）：

```
整型的范围: INT_MAX = 2147483647, INT_MIN = -2147483648
无符号整型的范围:

 UINT_MAX = 4294967295
短整型的范围: SHRT_MAX = 32767, SHRT_MIN = -32768
长整型的范围: LONG_MAX = 9223372036854775807, LONG_MIN = -9223372036854775808
无符号长整型的范围: ULONG_MAX = 18446744073709551615
长长整型的范围: LLONG_MAX = 9223372036854775807, LLONG_MIN = -9223372036854775808
无符号长长整型的范围: ULLONG_MAX = 18446744073709551615
```

### 示例17: 浮点数范围和精度（需要包含 `float.h` 头文件）

这个示例展示了如何使用 `float.h` 中定义的常量来获取浮点数（`float`）、双精度浮点数（`double`）以及长双精度浮点数（`long double`）的最大值和最小值。同时还展示了这些数据类型的精度，即它们能够准确表示的有效数字的位数。`FLT_MAX` 和 `FLT_MIN` 分别表示 `float` 类型的最大值和最小值，`FLT_DIG` 则表示 `float` 类型的有效位数。`DBL_MAX` 和 `LDBL_MAX` 分别表示 `double` 和 `long double` 的最大值。

```c
printf("浮点数的范围: FLT_MAX = %g, FLT_MIN = %g\n", FLT_MAX, FLT_MIN);
printf("双精度浮点数的范围: DBL_MAX = %g, DBL_MIN = %g\n", DBL_MAX, DBL_MIN);
printf("长双精度浮点数的范围: LDBL_MAX = %g, LDBL_MIN = %g\n", LDBL_MAX, LDBL_MIN);
printf("浮点数的精度: FLT_DIG = %d\n", FLT_DIG);
printf("双精度浮点数的精度: DBL_DIG = %d\n", DBL_DIG);
printf("长双精度浮点数的精度: LDBL_DIG = %d\n", LDBL_DIG);
```

**输出示例**：

```
浮点数的范围: FLT_MAX = 3.40282e+38, FLT_MIN = 1.17549e-38
双精度浮点数的范围: DBL_MAX = 1.79769e+308, DBL_MIN = 2.22507e-308
长双精度浮点数的范围: LDBL_MAX = 1.18973e+4932, LDBL_MIN = 3.3621e-4932
浮点数的精度: FLT_DIG = 6
双精度浮点数的精度: DBL_DIG = 15
长双精度浮点数的精度: LDBL_DIG = 18
```

### 示例18: 枚举类型

枚举类型定义了一组相关的常量。每个枚举值默认从 0 开始递增，这里定义了一周的天数（`Sunday` 到 `Saturday`）。通过枚举类型，可以使用更加直观的名称而不是整数值来表示状态。`today` 被设置为 `Friday`，其对应的整数值为 `5`。

```c
enum Day { Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday };
enum Day today = Friday;
printf("枚举类型: today = %d\n", today);
```

**输出示例**：

```
枚举类型: today = 5
```

### 示例19: `typedef` 为类型定义别名

`typedef` 关键字可以为现有的类型定义一个新的别名，简化代码书写。例如，可以将 `int` 定义为 `Integer`，`float` 定义为 `Real`，`char` 定义为 `Character`。这样一来，使用这些别名代替原始类型声明变量时，代码会更加易读和简洁。

```c
typedef int Integer;
typedef float Real;
typedef char Character;
Integer num3 = 10;
Real num4 = 3.14;
Character ch = 'A';
printf("typedef 为类型定义别名: num3 = %d, num4 = %.3f, ch = %c\n", num3, num4, ch);
```

**输出示例**：

```
typedef 为类型定义别名: num3 = 10, num4 = 3.140, ch = A
```

### 示例20: 多种进制表示整数

C语言支持以不同的进制表示整数。十进制是默认格式；八进制以 `0` 开头；十六进制以 `0x` 开头。不过，C语言不直接支持二进制格式（`0b` 这种写法不合法，需要通过其他方式转换二进制数）。因此，`binary = 0b1010` 实际上是无效的语法。

```c
int decimal = 10;    // 十进制
int octal = 012;     // 八进制
int hex = 0xA;       // 十六进制
printf("多种进制表示整数: decimal = %d, octal = %d, hex = %d\n", decimal, octal, hex);
```

**输出示例**：

```
多种进制表示整数: decimal = 10, octal = 10, hex = 10
```

### 示例21: 浮点数科学计数法表示

科学计数法是一种紧凑的浮点数表示方式，特别适合表示非常大或非常小的数。C语言支持用科学计数法表示浮点数，`e` 表示 10 的幂次。`float_num` 的值为 `1.23e-2`，即 `1.23 * 10^-2 = 0.0123`，而 `double_num` 则表示极大的值 `1.23e+100`。

```c
float float_num = 1.23e-2;
double double_num = 1.23e+100;
printf("浮点数科学计数法表示: float_num = %.2f, double_num = %.4lf\n", float_num, double_num);
```

**输出示例**：

```
浮点数科学计数法表示: float_num = 0.01, double_num = 1.2300e+100
```

### 示例22: 复合字面量

复合字面量是一种直接定义结构体变量的方法，允许在同一行内初始化结构体。这里定义了一个 `Point` 结构体类型，用于表示坐标点。`p1` 通过普通的初始化方式赋值，而 `p2` 使用复合字面量进行初始化。

```c
struct Point { int x; int y; };
struct Point p1 = {10, 20};               // 普通初始化
struct Point p2 = (struct Point){10, 20}; // 复合字面量初始化
printf("复合字面量: p1 = (%d, %d), p2 = (%d, %d)\n", p1.x, p1.y, p2.x, p2.y);
```

**输出示例**：

```
复合字面量: p1 = (10, 20), p2 = (10, 20)
```

### 示例23: 类型大小的其他例子

不同类型的变量占用的内存空间是不同的。`short int`、`long int` 和 `long long` 分别用于表示较小和较大的整数范围。该示例展示了如何使用这些类型，以及如何使用 `printf` 的不同格式说明符来输出它们。

```c
short int short_num = 10;
long int long_num = 1000000;
long long longlong_num = 1000000000000000LL;
printf("类型大小的其他例子: short_num = %d, long_num = %ld, longlong_num = %lld\n", short_num, long_num, longlong_num);
```

**输出示例**：

```
类型大小的其他例子: short_num = 10, long_num = 1000000, longlong_num = 1000000000000000
```

### 示例24: 隐式类型提升

当不同数据类型的变量进行运算时，C语言会自动将较小类型提升为较大的类型，以确保计算的精度。此示例展示了整型与浮点型、双精度浮点型之间的运算，隐式类型提升为 `float` 或 `double`。

```c
int aa = 10;
float bb = 3.14;
double cc = 2.71828;
printf("隐式类型提升: aa + bb = %.2f, aa + cc = %.6f\n", aa + bb, aa + cc);
```

**输出示例**：

```
隐式类型提升: aa + bb = 13.14, aa + cc = 12.718280
```

### 示例25: 字符的转义序列

在C语言中，转义序列用于表示一些特殊的字符或操作，例如换行符、制表符、引号等。每个转义序列以反斜杠 `\` 开始，紧跟一个字符，用来表示特殊意义的字符。这段代码通过 `printf` 展示了几种常用的转义字符：

- `\n` 表示换行；
- `\t` 表示制表符；
- `\\` 表示反斜杠；
- `\"` 和 `\'` 分别表示双引号和单引号。

```c
printf("字符的转义序列: \\n 表示换行, \\t 表示制表符, \\\" 表示双引号, \\\' 表示单引号, \\\\ 表示反斜杠\n");
```

**输出示例**：

```
字符的转义序列: \n 表示换行, \t 表示制表符, \" 表示双引号, \' 表示单引号, \\ 表示反斜杠
```

### 示例26: 初始化多个变量

C语言允许在一行中声明和初始化多个变量，这样可以简化代码书写。该示例展示了同时初始化三个整型变量 `var1`、`var2` 和 `var3`，并将它们的值输出。

```c
int var1 = 1, var2 = 2, var3 = 3;
printf("初始化多个变量: var1 = %d, var2 = %d, var3 = %d\n", var1, var2, var3);
```

**输出示例**：

```
初始化多个变量: var1 = 1, var2 = 2, var3 = 3
```

### 示例27: 溢出示例

这是一个展示溢出的例子。无符号字符类型 `unsigned char` 的取值范围是 `0` 到 `255`，所以当值达到 `255` 时，再加 `1` 会导致溢出，值会从 `0` 重新开始。这段代码演示了这一现象。

```c
unsigned char uchar_max = 255;
unsigned char uchar_overflow = uchar_max + 1; // 溢出
printf("溢出示例: uchar_max = %d, uchar_overflow = %d\n", uchar_max, uchar_overflow);
```

**输出示例**：

```
溢出示例: uchar_max = 255, uchar_overflow = 0
```

### 示例28: 强制类型转换

C语言允许使用强制类型转换来将一种数据类型转换为另一种数据类型。这段代码展示了将 `double` 类型的 `pi` 强制转换为 `int` 类型，去掉小数部分只保留整数部分。

```c
double pi = 3.14159;
int int_pi = (int)pi; // 强制类型转换
printf("强制类型转换: pi = %.2f, int_pi = %d\n", pi, int_pi);
```

**输出示例**：

```
强制类型转换: pi = 3.14, int_pi = 3
```

### 示例29: 变量作用域

在C语言中，变量的作用域决定了它可以被访问的范围。这里的示例展示了两个变量：`outer_var` 是外层作用域的变量，可以在整个 `main()` 函数中使用；`inner_var` 是在块作用域 `{}` 中声明的，只能在该块内访问。

```c
int outer_var = 10; // 外层变量
{
    int inner_var = 20; // 内层变量
    printf("变量作用域: 外层变量 = %d, 内层变量 = %d\n", outer_var, inner_var);
}
```

**输出示例**：

```
变量作用域: 外层变量 = 10, 内层变量 = 20
```

### 示例30: 常量指针和指针常量

常量指针和指针常量是C语言中的重要概念：

- `const int *ptr1` 是常量指针，意味着不能通过该指针修改它指向的值，但可以改变指针指向的地址。
- `int *const ptr2` 是指针常量，意味着指针指向的地址不能修改，但可以通过指针修改指向的值。

```c
const int *ptr1 = &A; // 常量指针，指向的值不能被修改，但可以指向不同的地址
int *const ptr2 = &A; // 指针常量，指向的地址不能被修改，但可以修改指向的值
ptr1 = &B; // 正确：常量指针可以改变指向
*ptr2 = 30; // 正确：可以通过指针修改值
printf("常量指针和指针常量: A = %d, B = %d\n", *ptr1, *ptr2);
```

**输出示例**：

```
常量指针和指针常量: A = 20, B = 30
```

### 示例31: 静态局部变量

静态局部变量（`static`）的生命周期贯穿程序的整个运行过程，即使离开作用域，它也会保留之前的值。这里的 `static_var` 是一个静态局部变量，每次循环结束后不会被销毁，而是保留其值。

```c
for (int i = 0; i < 3; i++) {
    static int static_var = 0;
    printf("静态局部变量: i = %d, static_var = %d\n", i, static_var);
    static_var++;
}
```

**输出示例**：

```
静态局部变量: i = 0, static_var = 0
静态局部变量: i = 1, static_var = 1
静态局部变量: i = 2, static_var = 2
静态局部变量: static_var = 3
```

### 示例32: 格式化字符串 - 整数、浮点数、字符、字符串

这个示例展示了如何使用 `printf` 格式化输出不同类型的数据，包括整数、浮点数、字符和字符串。它还展示了如何使用 `%p` 输出变量的内存地址。

```c
int int_var = 10;
float float_var = 3.14;
char char_var = 'A';
char str_var[] = "Hello, World!";
printf("格式化输出:\n");
printf("整数: %d\n", int_var);
printf("浮点数: %.2f\n", float_var);
printf("字符: %c\n", char_var);
printf("字符串: %s\n", str_var);
printf("地址int_var: %p\n", &int_var);
```

**输出示例**：

```
格式化输出:
整数: 10
浮点数: 3.14
字符: A
字符串: Hello, World!
地址int_var: 0x7ffebbe2f8cc  // （地址会根据系统不同而不同）
```

### 示例33: 格式化输出 - 字段宽度与对齐

此示例展示了如何通过格式说明符控制输出的字段宽度以及左右对齐。`%10d` 表示将整数按右对齐方式输出，并占据10个字符的宽度。`%-10d` 则表示按左对齐输出。类似地，对于字符串和浮点数也可以通过指定宽度来控制输出的对齐方式。

```c
printf("%10d\n", 123); // 右对齐，占10个字符宽度
printf("%-10d\n", 123); // 左对齐，占10个字符宽度
printf("|%-10s|%-10d|%-10.2f|\n", "左对齐", int_var, float_var); // 左对齐，字段宽度为10
printf("|%10s|%10d|%10.2f|\n", "右对齐", int_var, float_var); // 右对齐，字段宽度为10
```

**输出示例**：

```
       123
123       
|左对齐 |10        |3.14      |
| 右对齐|        10|      3.14|
```

### 示例34: 输入整数和字符串

这一段代码展示了如何通过 `scanf` 读取用户输入的整数和字符串。`%d` 用于读取整数，`%s` 用于读取字符串。注意，`scanf` 会将遇到的空白字符视为输入结束符，不能读取带空格的字符串。

```c
scanf("%d %s", &user_int, user_str); // 读取整数和字符串
printf("您输入的整数是: %d\n", user_int);
printf("您输入的字符串是: %s\n", user_str);
```

**输出示例**（假设输入 `42 Hello`）：

```
您输入的整数是: 42
您输入的字符串是: Hello
```

### 示例35: 字符串操作

这一部分展示了如何使用C语言标准库中的字符串操作函数（`strlen`、`strcpy`、`strcat`、`strcmp`、`strchr`）进行字符串的处理操作，包括连接、复制、比较以及查找字符等操作。

```c
// 字符串连接
sprintf(str3, "%s %s", str1, str2); // 将 str1 和 str2 连接
printf("字符串连接: %s\n", str3);

// 字符串长度
printf("字符串长度: %lu\n", strlen(str3));

// 字符串比较
int cmp_result = strcmp(str1, str2);
printf("字符串比较: strcmp(str1, str2) = %d\n", cmp_result);

// 字符串复制
strcpy(str3, str1);
printf("字符串复制:str3 = %s\n", str3);

// 字符串查找
char *pos = strchr(str3, 'o');
if (pos != NULL) {
    printf("字符串查找: strchr(str3, 'o') = %s\n", pos);
}
```

**输出示例**：

```
字符串连接: Hello World
字符串长度: 11
字符串比较: strcmp(str1, str2) = -1
字符串复制:str3 = Hello
字符串查找: strchr(str3, 'o') = o
```

### 示例36: 字符数组和指针的区别

此示例展示了字符数组和字符指针之间的区别。字符数组的内容是可变的，修改数组中的字符会直接反映在数组上。字符指针可以指向数组或字符串常量，指针可以改变指向的地址，但在修改指针指向的字符时需要注意指向的是否是字符串常量。

```c
char str[] = "Hello, World!";
char *ptr = str;
printf("字符数组和指针的区别:\n");
printf("字符数组: %s\n", str);
printf("字符指针: %s\n", ptr);

// 修改字符数组中的字符
str[0] = 'h';
printf("修改字符数组中的字符: %s\n", str);

// 修改字符指针指向的字符
*ptr = 'H';
printf("修改字符指针指向的字符: %s\n", str);

// 修改字符指针指向的地址
ptr = "Hi, World!";
printf("修改字符指针指向的地址: %s\n", str);
```

**输出示例**：

```
字符数组和指针的区别:
字符数组: Hello, World!
字符指针: Hello, World!
修改字符数组中的字符: hello, World!
修改字符指针指向的字符: Hello, World!
修改字符指针指向的地址: Hello, World!
```

### 示例37: 字符串的格式化输入

通过 `scanf("%[^\n]%*c", full_name)` 来读取整行输入，直到遇到换行符，这里使用了 `scanf` 的格式化输入功能。`%[^\n]` 用来读取换行符之前的所有字符，而 `%*c` 则丢弃换行符。

```c
scanf("%[^\n]%*c", full_name); // 读取整行输入
printf("您的全名是: %s\n", full_name);
```

**输出示例**（假设输入 `John Doe`）：

```
您的全名是: John Doe
```

### 示例38: 字符处理函数

C语言提供了许多字符处理函数（`isdigit`、`isalpha`、`isupper`、`islower`、`isspace`）来判断字符的类型。此示例展示了如何使用这些函数来检查字符的不同属性，并输出它们的 ASCII 码值。

```c
printf("字符 %c 是否为数字: %s\n", test_char, isdigit(test_char) ? "是" : "否");
printf("字符 %c 是否为字母: %s\n", test_char, isalpha(test_char) ? "是" : "否");
printf("字符 %c 是否为大写字母: %s\n", test_char, isupper(test_char) ? "是" : "否");
printf("字符 %c 是否为小写字母: %s\n", test_char, islower(test_char) ? "是" : "否");
printf("字符 %c 是否为空白字符: %s\n", test_char, isspace(test_char) ? "是" : "否");
printf("字符 %c 的 ASCII 码: %d\n", test_char, (int)test_char);
```

**输出示例**：

```
字符 A 是否为数字: 否
字符 A 是否为字母: 是
字符 A 是否为大写字母: 是
字符 A 是否为小写字母: 否
字符 A 是否为空白字符: 否
字符 A 的 ASCII 码: 65
```

### 示例39: 多种浮点数格式化

展示了如何使用不同的格式说明符来输出浮点数，包括默认格式、小数点后的精度控制、科学计数法和自动选择的格式。

```c
printf("默认格式: %f\n", float_num1);
printf("小数点后3位: %.3f\n", float_num1);
printf("科学计数法: %e\n", float_num1);
printf("自动选择格式: %g\n", float_num1);
```

**输出示例**：

```
默认格式: 123.456789
小数点后3位: 123.457
科学计数法: 1.234568e+02
自动选择格式: 123.457
```

### 示例40: 输入输出 - `scanf` 和 `printf` 的返回值

`scanf` 和 `printf` 的返回值分别表示成功读取的参数数量和成功输出的字符数量。`scanf` 返回成功读取的参数个数，而 `printf` 返回成功输出的字符数。

```c
int scanf_result = scanf("%d", &int_var);
printf("scanf 返回值: %d\n", scanf_result);
int printf_result = printf("打印点什么\n");
printf("printf 返回值: %d\n", printf_result);
```

**输出示例**：

```
输入输出的返回值, 输入一个数字:
42
scanf 返回值: 1
打印点什么
printf 返回值: 16
```

### 示例41: 格式化字符串的占位符

此示例展示了如何使用格式说明符 `%x`、`%o` 和 `%d` 将整数以不同进制的格式输出。`%x` 用于十六进制输出，`%o` 用于八进制输出，`%d` 则用于十进制输出。`%p` 用来输出变量的内存地址。

```c
int hex_var = 0x255;
printf("格式化字符串的占位符:\n");
printf("十六进制: %x\n", hex_var);
printf("八进制: %o\n", hex_var);
printf("十进制: %d\n", hex_var);
printf("指针地址: %p\n", &hex_var);
```

**输出示例**：

```
格式化字符串的占位符:
十六进制: 255
八进制: 525
十进制: 597
指针地址: 0x7ffebbe2f8cc
```

### 示例42: 字符串长度的不同计算方法

这个示例展示了使用 `strlen` 和 `sizeof` 计算字符串长度的不同方式。`strlen` 计算的是字符串的实际长度（不包括终止符 `\0`），而 `sizeof` 包括了字符串末尾的 `\0`。

```c
char str_var1[] = "Hello, World!";
printf("字符串长度的不同计算方法:\n");
printf("strlen(str_var1): %lu, 不包含'\\0'\n", strlen(str_var1));
printf("sizeof(str_var1): %lu, 包含'\\0'\n", sizeof(str_var1));
```

**输出示例**：

```
字符串长度的不同计算方法:
strlen(str_var1): 13, 不包含'\0'
sizeof(str_var1): 14, 包含'\0'
```

### 示例43: 格式化输出宽度和精度

这里展示了如何使用格式化说明符控制输出的宽度和小数点精度。`%10.2f` 表示占据10个字符宽度，且小数部分保留两位。`%-10.2f` 表示左对齐，宽度同样为10。

```c
double precise_num = 12345.6789;
printf("格式化输出宽度和精度:\n");
printf("宽度为10, 精度为2: |%10.2f|\n", precise_num);
printf("宽度为10, 精度为2, 左对齐: |%-10.2f|\n", precise_num);
```

**输出示例**：

```
格式化输出宽度和精度:
宽度为10, 精度为2: |  12345.68|
宽度为10, 精度为2, 左对齐: |12345.68  |
```

### 示例44: `puts` 和 `gets` 基础使用

`gets` 函数用于读取一行输入，直到遇到换行符或EOF，但由于 `gets` 不会检查输入的长度，容易导致缓冲区溢出，不推荐使用。`puts` 函数用于输出字符串，自动在末尾加上一个换行符。

```c
char simple_input[50];
printf("请输入一行文本: ");
fflush(stdin);      // 清空输入缓冲区
gets(simple_input); // 读取输入
printf("您输入的文本是: %s\n", simple_input);
puts("使用 puts 输出, 你输入的文本是: ");
puts(simple_input);
```

**输出示例**：

```
请输入一行文本: Hello World
您输入的文本是: Hello World
使用 puts 输出, 你输入的文本是: 
Hello World
```

### 示例45: 使用 `fgets` 代替 `gets` 以避免缓冲区溢出

`fgets` 函数用于读取指定长度的字符串，能够有效避免缓冲区溢出问题，是 `gets` 的安全替代方案。

```c
char safe_input[50];
printf("使用 fgets 代替 gets 以避免缓冲区溢出:\n");
printf("请输入一行文本: ");
fflush(stdin); // 清空输入缓冲区
fgets(safe_input, sizeof(safe_input), stdin); // 读取输入
puts("您输入的文本是: ");
puts(safe_input);
```

**输出示例**：

```
使用 fgets 代替 gets 以避免缓冲区溢出:
请输入一行文本: Hello, fgets
您输入的文本是: 
Hello, fgets
```

### 示例46: 位字段的使用

位字段允许在结构体中分配特定数量的位给变量，节省内存空间。此示例展示了如何定义和使用位字段。变量 `a` 占用1位，`b` 占用3位，`c` 占用4位。

```c
struct BitField {
    unsigned int a : 1;
    unsigned int b : 3;
    unsigned int c : 4;
};
struct BitField bf;
bf.a = 1;
bf.b = 5;
bf.c = 9;
printf("位字段的使用:\n");
printf("a: %u, b: %u, c: %u\n", bf.a, bf.b, bf.c);
```

**输出示例**：

```
位字段的使用:
a: 1, b: 5, c: 9
```

### 示例47: 联合体

联合体允许多个成员共用同一段内存。此示例展示了如何在联合体中存储不同类型的数据。注意，每次只能存储一个成员的数据，后续写入会覆盖之前的内容。

```c
union Data {
    int i;
    float f;
    char str[20];
};
union Data data;
data.i = 10;
printf("联合体的使用:\n");
printf("data.i: %d\n", data.i);
data.f = 220.5;
printf("data.f: %f\n", data.f);
strcpy(data.str, "C Programming");
printf("data.str: %s\n", data.str);
```

**输出示例**：

```
联合体的使用:
data.i: 10
data.f: 220.500000
data.str: C Programming
```

### 示例48: 字符处理 - `tolower` 和 `toupper`

此示例展示了如何使用 `tolower` 和 `toupper` 函数将字符转换为小写和大写字母。

```c
char upper = 'A';
char lower = 'a';
printf("字符处理 - tolower 和 toupper:\n");
printf("toupper(%c) = %c, tolower(%c) = %c\n", lower, toupper(lower), upper, tolower(upper));
```

**输出示例**：

```
字符处理 - tolower 和 toupper:
toupper(a) = A, tolower(A) = a
```
