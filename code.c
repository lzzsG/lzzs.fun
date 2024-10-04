#include <stdio.h>
#include <limits.h> // 包含INT_MAX和INT_MIN等常量
#include <float.h>  // 包含FLT_MAX和FLT_MIN等常量
// MARK: section1
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

    // 示例6：类型转换（隐式与显式）
    int i = 10;
    float f = 3.14;
    float result = i + f;       // 隐式类型转换
    int result2 = (int)(i + f); // 显式类型转换
    printf("类型转换: result = i + f = %.2f, 显式转换 result2 = %d\n", result, result2);

    // 示例7：算数运算符
    // MARK: section2
    int x = 15;
    int y = 2;
    printf("算数运算符: x + y = %d, x - y = %d, x * y = %d, x / y = %d, x %% y = %d\n", x + y, x - y, x * y, x / y, x % y);

    // 示例8：递增递减运算符
    int ii = 5;
    printf("递增递减运算符: ii = %d, ii++ = %d, ii = %d, ++ii = %d, ii = %d, ii-- = %d, ii = %d, --ii = %d, ii = %d,\n", ii, ii++, ii, ++ii, ii, ii--, ii, --ii, ii);

    // 示例9：关系运算符
    int m = 10;
    int n = 20;
    printf("关系运算符: m = %d, n = %d, m > n = %d, m < n = %d, m >= n = %d, m <= n = %d, m == n = %d, m != n = %d\n", m, n, m > n, m < n, m >= n, m <= n, m == n, m != n);

    // 示例10：逻辑运算符, 与：&&，或：||，非：!
    int p = 1; // true
    int q = 0; // false
    printf("逻辑运算符: p = %d, q = %d, p && q = %d, p || q = %d, !p = %d, !q = %d\n", p, q, p && q, p || q, !p, !q);

    // 示例11：位运算符, 与：&，或：|，异或：^，取反：~
    int num1 = 6; // 二进制 0110
    int num2 = 3; // 二进制 0011
    printf("位运算符: num1 = %d(0b0110), num2 = %d(0b0011), num1 & num2 = %d, num1 | num2 = %d, num1 ^ num2 = %d, ~num1 = %d \n", num1, num2, num1 & num2, num1 | num2, num1 ^ num2, ~num1);

    // 示例12：移位运算符, 左移：<<，右移：>>
    int shift_num = 8; // 二进制 1000
    printf("移位运算符: shift_num = %d(0b1000), shift_num << 1 = %d, shift_num >> 1 = %d\n", shift_num, shift_num << 1, shift_num >> 1);

    // 示例13：sizeof运算符
    // 获取变量或类型的大小, 单位为字节, 返回类型为size_t, lu表示unsigned long, size_t是无符号整数类型，可以表示更大的值。
    // sizeof运算符, 使用%lu格式说明符来打印size_t类型的值。
    printf("sizeof运算符: sizeof(int) = %lu, sizeof(float) = %lu, sizeof(char) = %lu\n", sizeof(int), sizeof(float), sizeof(char));

    // 示例14：复合赋值运算符
    int comp_num = 5;
    comp_num += 3; // 等价于 comp_num = comp_num + 3;
    printf("复合赋值运算符: comp_num = %d, comp_num += 3, comp_num = %d\n", comp_num, comp_num += 3);

    // 示例15：三元运算符
    // MARK: section3
    int ternary_num = (a > b) ? a : b; // 如果a大于b，则将a赋值给ternary_num，否则将b赋值给ternary_num
    printf("三元运算符: a = %d, b = %d, ternary_num = (a > b) ? a : b, ternary_num = %d\n", a, b, ternary_num);

    // 示例16：类型的最大值与最小值（需要包含limits.h头文件）
    printf("整型的范围: INT_MAX = %d, INT_MIN = %d\n", INT_MAX, INT_MIN);
    printf("无符号整型的范围: UINT_MAX = %u\n", UINT_MAX);
    printf("短整型的范围: SHRT_MAX = %d, SHRT_MIN = %d\n", SHRT_MAX, SHRT_MIN);
    printf("长整型的范围: LONG_MAX = %ld, LONG_MIN = %ld\n", LONG_MAX, LONG_MIN);
    printf("无符号长整型的范围: ULONG_MAX = %lu\n", ULONG_MAX);
    printf("长长整型的范围: LLONG_MAX = %lld, LLONG_MIN = %lld\n", LLONG_MAX, LLONG_MIN);
    printf("无符号长长整型的范围: ULLONG_MAX = %llu\n", ULLONG_MAX);

    // 示例17：浮点数范围和精度（需要包含float.h头文件）
    printf("浮点数的范围: FLT_MAX = %g, FLT_MIN = %g\n", FLT_MAX, FLT_MIN);
    printf("双精度浮点数的范围: DBL_MAX = %g, DBL_MIN = %g\n", DBL_MAX, DBL_MIN);
    printf("长双精度浮点数的范围: LDBL_MAX = %g, LDBL_MIN = %g\n", LDBL_MAX, LDBL_MIN);
    // 精度是指浮点数能够表示的有效数字的位数，而不是小数点后的位数。
    printf("浮点数的精度: FLT_DIG = %d\n", FLT_DIG);
    printf("双精度浮点数的精度: DBL_DIG = %d\n", DBL_DIG);
    printf("长双精度浮点数的精度: LDBL_DIG = %d\n", LDBL_DIG);

    // 示例18：枚举类型
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

    // 示例19：typedef 为类型定义别名
    typedef int Integer;
    typedef float Real;
    typedef char Character;
    Integer num3 = 10;
    Real num4 = 3.14;
    Character ch = 'A';
    printf("typedef 为类型定义别名: num3 = %d, num4 = %.3f, ch = %c\n", num3, num4, ch);

    // 示例20：多种进制表示整数
    int decimal = 10;    // 十进制
    int octal = 012;     // 八进制
    int hex = 0xA;       // 十六进制
    int binary = 0b1010; // 二进制
    printf("多种进制表示整数: decimal = %d, octal = %d, hex = %d, binary = %d\n", decimal, octal, hex, binary);

    // 示例21：浮点数科学计数法表示
    // float 浮点数，double 双精度浮点数，long double 长双精度浮点数
    float float_num = 1.23e-2;     // 即 1.23 * 10^-2 = 0.0123
    double double_num = 1.23e+100; // 即 1.23 * 10^100 = 1.23e+100
    printf("浮点数科学计数法表示: float_num = %.2f, double_num = %.4lf,\n", float_num, double_num);

    // 示例22 复合字面量
    // MARK: section4
    struct Point
    {
        int x;
        int y;
    };
    struct Point p1 = {10, 20};               // 普通结构体初始化
    struct Point p2 = (struct Point){10, 20}; // 复合字面量初始化
    printf("复合字面量: p1 = (%d, %d), p2 = (%d, %d)\n", p1.x, p1.y, p2.x, p2.y);

    // 示例23：类型大小的其他例子
    short int short_num = 10;
    long int long_num = 1000000;
    long long longlong_num = 1000000000000000LL;
    printf("类型大小的其他例子: short_num = %d, long_num = %ld, longlong_num = %lld\n", short_num, long_num, longlong_num);

    // 示例24：隐式类型提升, 即自动将较小的数据类型提升为较大的数据类型
    // 大小是指数据类型能够表示的数值范围的大小，大小关系为: char < short < int < long < long long < float < double < long double
    int aa = 10;
    float bb = 3.14;
    double cc = 2.71828;
    printf("隐式类型提升: aa + bb = %.2f, aa + cc = %.6f\n", aa + bb, aa + cc);

    return 0;
}