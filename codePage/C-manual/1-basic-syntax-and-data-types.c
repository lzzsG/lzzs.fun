#include <stdio.h>
#include <limits.h> // 包含INT_MAX和INT_MIN等常量
#include <float.h>  // 包含FLT_MAX和FLT_MIN等常量
#include <string.h> // 包含strlen、strcpy等函数
#include <ctype.h>  // 包含isalpha、isdigit等函数

int main()
{
    // 示例1: 整形变量的声明与赋值
    int a = 10;
    int b = 20;
    int sum = a + b;
    printf("整型变量: a = %d, b = %d, sum = a + b = %d\n", a, b, sum);

    // 示例2: 浮点型变量的声明与计算
    float f1 = 3.14;
    float f2 = 2.718;
    float product = f1 * f2;
    printf("浮点型变量: f1 = %.2f, f2 = %.2f, product = f1 * f2 = %.2f\n", f1, f2, product);

    // 示例3: 字符型变量的声明与赋值
    char c1 = 'A';
    char c2 = 'B';
    printf("字符型变量: c1 = %c, c2 = %c\n", c1, c2);

    // 示例4: 布尔型变量的声明与赋值（C99后使用 stdbool.h）
    int flag = 1;
    _Bool b1 = flag != 0; // 将非零值转换为布尔值true
    printf("布尔型变量: flag = %d, b1 = %d\n", flag, b1);

    // 示例5: 常量
    const int MAX_SIZE = 100;
    printf("常量: MAX_SIZE = %d\n", MAX_SIZE);

    // 示例6: 类型转换（隐式与显式）
    int i = 10;
    float f = 3.14;
    float result = i + f;       // 隐式类型转换
    int result2 = (int)(i + f); // 显式类型转换
    printf("类型转换: result = i + f = %.2f, 显式转换 result2 = %d\n", result, result2);

    // 示例7: 算数运算符
    int x = 15;
    int y = 2;
    printf("算数运算符: x + y = %d, x - y = %d, x * y = %d, x / y = %d, x %% y = %d\n", x + y, x - y, x * y, x / y, x % y);

    // 示例8: 递增递减运算符
    int ii = 5;
    printf("递增递减运算符: ii = %d, ii++ = %d, ii = %d, ++ii = %d, ii = %d, ii-- = %d, ii = %d, --ii = %d, ii = %d,\n", ii, ii++, ii, ++ii, ii, ii--, ii, --ii, ii);

    // 示例9: 关系运算符
    int m = 10;
    int n = 20;
    printf("关系运算符: m = %d, n = %d, m > n = %d, m < n = %d, m >= n = %d, m <= n = %d, m == n = %d, m != n = %d\n", m, n, m > n, m < n, m >= n, m <= n, m == n, m != n);

    // 示例10: 逻辑运算符, 与: &&，或: ||，非: !
    int p = 1; // true
    int q = 0; // false
    printf("逻辑运算符: p = %d, q = %d, p && q = %d, p || q = %d, !p = %d, !q = %d\n", p, q, p && q, p || q, !p, !q);

    // 示例11: 位运算符, 与: &，或: |，异或: ^，取反: ~
    int num1 = 6; // 二进制 0110
    int num2 = 3; // 二进制 0011
    printf("位运算符: num1 = %d(0b0110), num2 = %d(0b0011), num1 & num2 = %d, num1 | num2 = %d, num1 ^ num2 = %d, ~num1 = %d \n", num1, num2, num1 & num2, num1 | num2, num1 ^ num2, ~num1);

    // 示例12: 移位运算符, 左移: <<，右移: >>
    int shift_num = 8; // 二进制 1000
    printf("移位运算符: shift_num = %d(0b1000), shift_num << 1 = %d, shift_num >> 1 = %d\n", shift_num, shift_num << 1, shift_num >> 1);

    // 示例13: sizeof运算符
    // 获取变量或类型的大小, 单位为字节, 返回类型为size_t, lu表示unsigned long, size_t是无符号整数类型，可以表示更大的值。
    // sizeof运算符, 使用%lu格式说明符来打印size_t类型的值。
    printf("sizeof运算符: sizeof(int) = %lu, sizeof(float) = %lu, sizeof(char) = %lu\n", sizeof(int), sizeof(float), sizeof(char));

    // 示例14: 复合赋值运算符
    int comp_num = 5;
    comp_num += 3; // 等价于 comp_num = comp_num + 3;
    printf("复合赋值运算符: comp_num = %d, comp_num += 3, comp_num = %d\n", comp_num, comp_num += 3);

    // 示例15: 三元运算符
    int ternary_num = (a > b) ? a : b; // 如果a大于b，则将a赋值给ternary_num，否则将b赋值给ternary_num
    printf("三元运算符: a = %d, b = %d, ternary_num = (a > b) ? a : b, ternary_num = %d\n", a, b, ternary_num);

    // 示例16: 类型的最大值与最小值（需要包含limits.h头文件）
    printf("整型的范围: INT_MAX = %d, INT_MIN = %d\n", INT_MAX, INT_MIN);
    printf("无符号整型的范围: UINT_MAX = %u\n", UINT_MAX);
    printf("短整型的范围: SHRT_MAX = %d, SHRT_MIN = %d\n", SHRT_MAX, SHRT_MIN);
    printf("长整型的范围: LONG_MAX = %ld, LONG_MIN = %ld\n", LONG_MAX, LONG_MIN);
    printf("无符号长整型的范围: ULONG_MAX = %lu\n", ULONG_MAX);
    printf("长长整型的范围: LLONG_MAX = %lld, LLONG_MIN = %lld\n", LLONG_MAX, LLONG_MIN);
    printf("无符号长长整型的范围: ULLONG_MAX = %llu\n", ULLONG_MAX);

    // 示例17: 浮点数范围和精度（需要包含float.h头文件）
    printf("浮点数的范围: FLT_MAX = %g, FLT_MIN = %g\n", FLT_MAX, FLT_MIN);
    printf("双精度浮点数的范围: DBL_MAX = %g, DBL_MIN = %g\n", DBL_MAX, DBL_MIN);
    printf("长双精度浮点数的范围: LDBL_MAX = %g, LDBL_MIN = %g\n", LDBL_MAX, LDBL_MIN);
    // 精度是指浮点数能够表示的有效数字的位数，而不是小数点后的位数。
    printf("浮点数的精度: FLT_DIG = %d\n", FLT_DIG);
    printf("双精度浮点数的精度: DBL_DIG = %d\n", DBL_DIG);
    printf("长双精度浮点数的精度: LDBL_DIG = %d\n", LDBL_DIG);

    // 示例18: 枚举类型
    enum Day
    {
        Sunday,    // 0
        Monday,    // 1
        Tuesday,   // 2
        Wednesday, // 3
        Thursday,  // 4
        Friday,    // 5
        Saturday   // 6
    };

    enum Day today = Friday;
    printf("枚举类型: today = %d\n", today);

    // 示例19: typedef 为类型定义别名
    typedef int Integer;
    typedef float Real;
    typedef char Character;
    Integer num3 = 10;
    Real num4 = 3.14;
    Character ch = 'A';
    printf("typedef 为类型定义别名: num3 = %d, num4 = %.3f, ch = %c\n", num3, num4, ch);

    // 示例20: 多种进制表示整数
    int decimal = 10;    // 十进制
    int octal = 012;     // 八进制
    int hex = 0xA;       // 十六进制
    int binary = 0b1010; // 二进制
    printf("多种进制表示整数: decimal = %d, octal = %d, hex = %d, binary = %d\n", decimal, octal, hex, binary);

    // 示例21: 浮点数科学计数法表示
    // float 浮点数，double 双精度浮点数，long double 长双精度浮点数
    float float_num = 1.23e-2;     // 即 1.23 * 10^-2 = 0.0123
    double double_num = 1.23e+100; // 即 1.23 * 10^100 = 1.23e+100
    printf("浮点数科学计数法表示: float_num = %.2f, double_num = %.4lf,\n", float_num, double_num);

    // 示例22 复合字面量
    struct Point
    {
        int x;
        int y;
    };
    struct Point p1 = {10, 20};               // 普通结构体初始化
    struct Point p2 = (struct Point){10, 20}; // 复合字面量初始化
    printf("复合字面量: p1 = (%d, %d), p2 = (%d, %d)\n", p1.x, p1.y, p2.x, p2.y);

    // 示例23: 类型大小的其他例子
    short int short_num = 10;
    long int long_num = 1000000;
    long long longlong_num = 1000000000000000LL;
    printf("类型大小的其他例子: short_num = %d, long_num = %ld, longlong_num = %lld\n", short_num, long_num, longlong_num);

    // 示例24: 隐式类型提升, 即自动将较小的数据类型提升为较大的数据类型
    // 大小是指数据类型能够表示的数值范围的大小，大小关系为: char < short < int < long < long long < float < double < long double
    int aa = 10;
    float bb = 3.14;
    double cc = 2.71828;
    printf("隐式类型提升: aa + bb = %.2f, aa + cc = %.6f\n", aa + bb, aa + cc);

    // 示例25: 字符的转义序列
    printf("字符的转义序列: \\n 表示换行, \\t 表示制表符, \\\" 表示双引号, \\\' 表示单引号, \\\\ 表示反斜杠\n");

    // 示例26: 初始化多个变量
    int var1 = 1, var2 = 2, var3 = 3;
    printf("初始化多个变量: var1 = %d, var2 = %d, var3 = %d\n", var1, var2, var3);

    // 示例27: 溢出示例
    unsigned char uchar_max = 255;                // 8位无符号整数，最大值为255
    unsigned char uchar_overflow = uchar_max + 1; // 溢出
    printf("溢出示例: uchar_max = %d, uchar_overflow = %d\n", uchar_max, uchar_overflow);

    // 示例28: 强制类型转换
    double pi = 3.14159;
    int int_pi = (int)pi; // 强制类型转换，将double类型转换为int类型
    printf("强制类型转换: pi = %.2f, int_pi = %d\n", pi, int_pi);

    // 示例29: 变量作用域
    int outer_var = 10; // 外层变量
    {
        int inner_var = 20; // 内层变量
        printf("变量作用域: 外层变量 = %d, 内层变量 = %d\n", outer_var, inner_var);
    }

    // 示例30: 常量指针和指针常量
    int A = 10, B = 20;
    const int *ptr1 = &A; // 常量指针，指向的值不能被修改，但可以指向不同的地址
    int *const ptr2 = &A; // 指针常量，指向的地址不能被修改，但可以修改指向的值
    // *p1 = 30; // 错误，常量指针不能修改指向的值
    ptr1 = &B; // 正确，常量指针可以指向不同的地址，但仍然不能通过 p1 修改指向的值
    // *p1 = 40; // 错误，常量指针仍不能修改指向的值
    *ptr2 = 30; // 正确，指针常量可以修改指向的值
    printf("常量指针和指针常量: A = %d, B = %d\n", *ptr1, *ptr2);

    // 示例31: 静态局部变量
    for (int i = 0; i < 3; i++)
    {
        static int static_var = 0; // 静态局部变量，在函数调用结束后仍然保留其值
        printf("静态局部变量: i = %d, static_var = %d\n", i, static_var);
        static_var++;
    }
    printf("静态局部变量: static_var = %d\n");

    // 示例32: 格式化字符串 - 整数、浮点数、字符、字符串
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

    // 示例33: 格式化输出 - 字段宽度与对齐
    printf("格式化输出 - 字段宽度与对齐:\n");
    printf("%10d\n", 123);                                           // 字段宽度为10，右对齐
    printf("%-10d\n", 123);                                          // 字段宽度为10，左对齐
    printf("|%-10s|%-10d|%-10.2f|\n", "左对齐", int_var, float_var); // 左对齐，宽度为10
    printf("|%10s|%10d|%10.2f|\n", "右对齐", int_var, float_var);    // 右对齐，宽度为10

    // 示例34: 输入整数和字符串
    int user_int;
    char user_str[100];
    printf("请输入一个整数和一个字符串: \n");
    scanf("%d %s", &user_int, user_str);
    printf("您输入的整数是: %d\n", user_int);
    printf("您输入的字符串是: %s\n", user_str);

    // 示例35: 字符串操作 - 使用标准库函数, 如strlen、strcpy、strcat、strcmp、strchr等, 需要包含头文件<string.h>
    char str1[] = "Hello";
    char str2[] = "World";
    char str3[20];
    // 字符串连接
    sprintf(str3, "%s %s", str1, str2);
    printf("字符串连接: %s\n", str3);
    // 字符串长度
    printf("字符串长度: %lu\n", sizeof(str3) - 1);
    // 字符串比较
    int cmp_result = strcmp(str1, str2);
    printf("字符串比较: strcmp(str1, str2) = %d\n", cmp_result);
    // 字符串复制
    strcpy(str3, str1);
    printf("字符串复制:str3 = %s\n", str3);
    // 字符串查找
    char *pos = strchr(str3, 'o');
    if (pos != NULL)
    {
        printf("字符串查找: strchr(str3, 'o') = %s\n", pos);
    }

    // 示例36: 字符数组和指针的区别
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

    // 示例37: 字符串的格式化输入
    char full_name[50];
    printf("请输入您的全名: ");
    fflush(stdin);                 // 清空输入缓冲区
    scanf("%[^\n]%*c", full_name); // 使用 %[^\n] 读取整行输入，%*c 读取并丢弃换行符
    printf("您的全名是: %s\n", full_name);
    // 在使用 scanf 时，之前的输入（例如按下的回车键 \n）会留在输入缓冲区中。如果缓冲区中有残留的换行符，会直接被 scanf("%[^\n]%*c", full_name) 处理，导致程序跳过用户输入而直接结束

    // 示例38: 字符处理函数, 需要包含头文件<ctype.h>
    char test_char = 'A';
    printf("字符处理函数:\n");
    printf("字符 %c 是否为数字: %s\n", test_char, isdigit(test_char) ? "是" : "否");
    printf("字符 %c 是否为字母: %s\n", test_char, isalpha(test_char) ? "是" : "否");
    printf("字符 %c 是否为大写字母: %s\n", test_char, isupper(test_char) ? "是" : "否");
    printf("字符 %c 是否为小写字母: %s\n", test_char, islower(test_char) ? "是" : "否");
    printf("字符 %c 是否为空白字符: %s\n", test_char, isspace(test_char) ? "是" : "否");
    printf("字符 %c 的 ASCII 码: %d\n", test_char, (int)test_char);
    printf("字符 %c 的 ASCII 码转换为字符: %c\n", (int)test_char, (char)(int)test_char);

    // 示例39: 多种浮点数格式化
    float float_num1 = 123.456789;
    printf("多种浮点数格式化:\n");
    printf("默认格式: %f\n", float_num1);
    printf("小数点后3位: %.3f\n", float_num1);
    printf("科学计数法: %e\n", float_num1);
    printf("自动选择格式: %g\n", float_num1);

    // 示例40: 输入输出 - scanf 和 printf 的返回值
    printf("输入输出的返回值, 输入一个数字:\n");
    int scanf_result = scanf("%d", &int_var);
    printf("scanf 返回值: %d\n", scanf_result);
    int printf_result = printf("打印点什么\n");
    printf("printf 返回值: %d\nscanf 和 printf 的返回值分别表示成功读取的参数数量和成功输出的字符数量", printf_result);
    // scanf 和 printf 的返回值分别表示成功读取的参数数量和成功输出的字符数量

    // 示例41: 格式化字符串的占位符
    int hex_var = 0x255;
    printf("格式化字符串的占位符:\n");
    printf("十六进制: %x\n", hex_var);
    printf("八进制: %o\n", hex_var);
    printf("十进制: %d\n", hex_var);
    printf("指针地址: %p\n", &hex_var);

    // 示例42: 字符串长度的不同计算方法
    char str_var1[] = "Hello, World!";
    printf("字符串长度的不同计算方法:\n");
    printf("strlen(str_var1): %lu, 不包含'\\0'\n", strlen(str_var1));
    printf("sizeof(str_var1): %lu, 包含'\\0'\n", sizeof(str_var1));

    // 示例43: 格式化输出宽度和精度
    double precise_num = 12345.6789;
    printf("格式化输出宽度和精度:\n");
    printf("宽度为10, 精度为2: |%10.2f|\n", precise_num);
    printf("宽度为10, 精度为2, 左对齐: |%-10.2f|\n", precise_num);

    // 示例44: `puts` 和 `gets` 基础使用
    char simple_input[50];
    printf("请输入一行文本: ");
    fflush(stdin);      // 清空输入缓冲区
    gets(simple_input); // 使用 gets 读取整行输入,gets 函数会读取一行输入直到遇到换行符或文件结束符，并将读取的内容存储在指定的字符数组中。gets 函数不会检查输入的长度，因此如果输入的长度超过了字符数组的长度，会导致缓冲区溢出，从而引发安全问题。
    printf("您输入的文本是: %s\n", simple_input);
    puts("使用 puts 输出, 你输入的文本是: ");
    puts(simple_input); // 使用 puts 输出, puts 函数会自动在输出的字符串末尾添加一个换行符，并立即刷新输出缓冲区，因此不需要使用 printf 的换行符。

    // 示例45: 使用 `fgets` 代替 `gets` 以避免缓冲区溢出
    char safe_input[50];
    printf("使用 fgets 代替 gets 以避免缓冲区溢出:\n");
    printf("请输入一行文本: ");
    fflush(stdin);                                // 清空输入缓冲区
    fgets(safe_input, sizeof(safe_input), stdin); // 使用 fgets 读取整行输入，并指定最大读取长度以避免缓冲区溢出
    puts("您输入的文本是: ");
    puts(safe_input);

    // 示例46: 位字段的使用
    struct BitField
    {
        unsigned int a : 1; // 1位
        unsigned int b : 3; // 3位
        unsigned int c : 4; // 4位
    };
    struct BitField bf;
    bf.a = 1; // 只能是0或1
    bf.b = 5; // 只能是0到7
    bf.c = 9; // 只能是0到15
    printf("位字段的使用:\n");
    printf("a: %u, b: %u, c: %u\n", bf.a, bf.b, bf.c);

    // 示例47: 联合体
    union Data
    {
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

    // 示例48: 字符处理 - `tolower` 和 `toupper`
    char upper = 'A';
    char lower = 'a';
    printf("字符处理 - tolower 和 toupper:\n");
    printf("toupper(%c) = %c, tolower(%c) = %c\n", lower, toupper(lower), upper, tolower(upper));

    return 0;
}
