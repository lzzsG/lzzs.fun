#include <stdio.h>

// 示例1：宏定义（#define）
#define PI 3.14159

// 示例2：宏函数
#define SQUARE(x) ((x) * (x))

// 示例3：条件编译（#if、#else、#endif）
#define DEBUG 1 // 用于控制调试信息

// 示例4：文件包含（#include）
// 已包含 <stdio.h>，所以不重复

// 示例5：宏替换（#undef）
#define TEMP 100
#undef TEMP // 取消 TEMP 的定义

// 示例6：宏连接运算符（##）
#define CONCAT(a, b) a##b

// 示例7：字符串化运算符（#）
#define STR(x) #x

// 示例8：预定义宏
// __FILE__、__LINE__、__DATE__、__TIME__、__STDC__ 等为预定义宏

int main()
{
    // 示例1：宏定义的使用
    printf("示例1：宏定义\n");
    printf("圆周率 PI = %f\n", PI);

    // 示例2：宏函数的使用
    printf("\n示例2：宏函数\n");
    int num = 5;
    printf("SQUARE(%d) = %d\n", num, SQUARE(num));

    // 示例3：条件编译
    printf("\n示例3：条件编译\n");
#if DEBUG
    printf("调试模式已开启\n");
#else
    printf("非调试模式\n");
#endif

    // 示例4：文件包含
    printf("\n示例4：文件包含\n");
    printf("<stdio.h> 已包含，输出此信息\n");

    // 示例5：宏替换
    printf("\n示例5：宏替换（TEMP 已取消定义）\n");
#ifdef TEMP
    printf("TEMP 定义为: %d\n", TEMP);
#else
    printf("TEMP 已被取消定义\n");
#endif

    // 示例6：宏连接运算符（##）
    printf("\n示例6：宏连接运算符\n");
    int xy = 10;
    printf("连接后的变量 xy 的值: %d\n", CONCAT(x, y));

    // 示例7：字符串化运算符（#）
    printf("\n示例7：字符串化运算符\n");
    printf("STR(Hello) = %s\n", STR(Hello));

    // 示例8：预定义宏
    printf("\n示例8：预定义宏\n");
    printf("文件名: %s\n", __FILE__);
    printf("当前行号: %d\n", __LINE__);
    printf("编译日期: %s\n", __DATE__);
    printf("编译时间: %s\n", __TIME__);
#ifdef __STDC__
    printf("程序遵循 ANSI 标准\n");
#else
    printf("程序不遵循 ANSI 标准\n");
#endif

    return 0;
}

//----------------------------------------------------------
#include <stdio.h>

// 示例9：多行宏定义
#define PRINT_SUM(a, b)    \
    printf("a = %d\n", a); \
    printf("b = %d\n", b); \
    printf("a + b = %d\n", (a) + (b));

// 示例10：递归宏定义
#define RECURSIVE_MACRO(x)     \
    printf("当前值: %d\n", x); \
    if (x > 0)                 \
    {                          \
        RECURSIVE_MACRO(x - 1) \
    }

// 示例11：条件包含（#ifdef、#ifndef、#endif）
#ifndef MAX_BUFFER_SIZE
#define MAX_BUFFER_SIZE 1024
#endif

// 示例12：带参数的条件宏定义
#if defined(_WIN32) || defined(_WIN64)
#define OS_NAME "Windows"
#elif defined(__linux__)
#define OS_NAME "Linux"
#elif defined(__APPLE__) && defined(__MACH__)
#define OS_NAME "macOS"
#else
#define OS_NAME "Unknown OS"
#endif

// 示例13：宏函数中的参数保护
#define MULTIPLY(a, b) ((a) * (b))

// 示例14：宏展开顺序演示
#define DOUBLE(x) (x + x)
#define INCREMENT(x) (x + 1)

// 示例15：宏定义实现调试日志
#define DEBUG_LOG(msg) \
    printf("[DEBUG] %s:%d - %s\n", __FILE__, __LINE__, msg)

// 示例16：宏定义计算数组大小
#define ARRAY_SIZE(arr) (sizeof(arr) / sizeof((arr)[0]))

// 示例17：可变参数的宏
#define LOG(format, ...) \
    printf(format, ##__VA_ARGS__)

// 示例18：宏定义中嵌套宏
#define ADD(a, b) ((a) + (b))
#define CALCULATE_SUM(x, y, z) ADD(ADD(x, y), z)

int main()
{
    // 示例9：多行宏定义的使用
    printf("示例9：多行宏定义\n");
    PRINT_SUM(3, 4); // 调用多行宏，输出求和结果

    // 示例10：递归宏定义
    printf("\n示例10：递归宏定义\n");
    RECURSIVE_MACRO(3); // 递归展开宏，逐次减少

    // 示例11：条件包含（#ifdef、#ifndef、#endif）
    printf("\n示例11：条件包含\n");
    printf("最大缓冲区大小: %d\n", MAX_BUFFER_SIZE); // MAX_BUFFER_SIZE 只有在未定义时才定义

    // 示例12：带参数的条件宏定义
    printf("\n示例12：带参数的条件宏定义\n");
    printf("当前操作系统: %s\n", OS_NAME); // 根据操作系统进行不同的宏定义

    // 示例13：宏函数中的参数保护
    printf("\n示例13：宏函数中的参数保护\n");
    printf("MULTIPLY(3 + 2, 4) = %d\n", MULTIPLY(3 + 2, 4)); // 使用括号保护宏参数

    // 示例14：宏展开顺序演示
    printf("\n示例14：宏展开顺序演示\n");
    printf("DOUBLE(INCREMENT(2)) = %d\n", DOUBLE(INCREMENT(2))); // 宏的嵌套展开顺序

    // 示例15：宏定义实现调试日志
    printf("\n示例15：宏定义实现调试日志\n");
    DEBUG_LOG("这是一个调试信息");

    // 示例16：宏定义计算数组大小
    printf("\n示例16：宏定义计算数组大小\n");
    int arr[] = {1, 2, 3, 4, 5};
    printf("数组大小: %lu\n", ARRAY_SIZE(arr)); // 计算数组大小

    // 示例17：可变参数的宏
    printf("\n示例17：可变参数的宏\n");
    LOG("简单的日志信息\n");                       // 不带参数
    LOG("带参数的日志信息: %d, %s\n", 42, "示例"); // 带参数

    // 示例18：宏定义中嵌套宏
    printf("\n示例18：宏定义中嵌套宏\n");
    printf("CALCULATE_SUM(1, 2, 3) = %d\n", CALCULATE_SUM(1, 2, 3)); // 嵌套宏调用

    return 0;
}

//-------------------------------------------------------------------------

#include <stdio.h>

// 示例19：带返回值的宏函数
#define MAX(a, b) ((a) > (b) ? (a) : (b))

// 示例20：字符串连接宏
#define CONCAT_STR(str1, str2) str1 str2

// 示例21：带默认值的宏
#define DEFAULT(val, def) ((val) ? (val) : (def))

// 示例22：宏定义检查编译器版本
#if __STDC_VERSION__ >= 199901L
#define C_VERSION "C99 or later"
#else
#define C_VERSION "Pre-C99"
#endif

// 示例23：宏定义嵌入代码块
#define RUN_CODE_BLOCK(code) \
    do                       \
    {                        \
        code                 \
    } while (0)

// 示例24：静态断言宏（C11 引入 _Static_assert）
#define STATIC_ASSERT(expr, msg) _Static_assert(expr, msg)

// 示例25：宏定义生成唯一标识符
#define UNIQUE_ID(prefix) prefix##__LINE__

// 示例26：宏定义的字符串拼接（## 和 #）
#define TO_STRING(x) #x
#define CONCAT(a, b) a##b

// 示例27：宏展开顺序递归调用
#define EXPAND(x) x + x
#define RECURSIVE_EXPAND(x) EXPAND(x) + EXPAND(x)

// 示例28：可变参数宏的递归处理
#define LOG_MESSAGE(fmt, ...) printf(fmt, ##__VA_ARGS__)

int main()
{
    // 示例19：带返回值的宏函数
    printf("示例19：带返回值的宏函数\n");
    int a = 10, b = 20;
    printf("MAX(%d, %d) = %d\n", a, b, MAX(a, b));

    // 示例20：字符串连接宏
    printf("\n示例20：字符串连接宏\n");
    printf("连接后的字符串: %s\n", CONCAT_STR("Hello, ", "World!"));

    // 示例21：带默认值的宏
    printf("\n示例21：带默认值的宏\n");
    int x = 0;
    printf("DEFAULT(x, 5) = %d\n", DEFAULT(x, 5));

    // 示例22：宏定义检查编译器版本
    printf("\n示例22：宏定义检查编译器版本\n");
    printf("C 语言版本: %s\n", C_VERSION);

    // 示例23：宏定义嵌入代码块
    printf("\n示例23：宏定义嵌入代码块\n");
    RUN_CODE_BLOCK(
        int val = 42;
        printf("运行的代码块，val = %d\n", val););

    // 示例24：静态断言宏（C11 引入 _Static_assert）
    printf("\n示例24：静态断言宏\n");
    STATIC_ASSERT(sizeof(int) == 4, "int 类型不是 4 字节"); // 如果断言失败会在编译时报错

    // 示例25：宏定义生成唯一标识符
    printf("\n示例25：宏定义生成唯一标识符\n");
    int UNIQUE_ID(var) = 100;
    printf("生成的唯一标识符 var__LINE__: %d\n", var__LINE__);

    // 示例26：宏定义的字符串拼接（## 和 #）
    printf("\n示例26：宏定义的字符串拼接\n");
    printf("TO_STRING(123) = %s\n", TO_STRING(123));
    int CONCAT(my, Variable) = 999;
    printf("拼接生成的变量名 myVariable: %d\n", myVariable);

    // 示例27：宏展开顺序递归调用
    printf("\n示例27：宏展开顺序递归调用\n");
    printf("RECURSIVE_EXPAND(2) = %d\n", RECURSIVE_EXPAND(2));

    // 示例28：可变参数宏的递归处理
    printf("\n示例28：可变参数宏的递归处理\n");
    LOG_MESSAGE("日志: %s, 数值: %d\n", "测试", 42);

    return 0;
}
