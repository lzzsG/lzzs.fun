// 示例1：简单的函数定义与调用
#include <stdio.h>

void greet()
{
    printf("Hello, C code examples manual!\n");
}

int main()
{
    printf("示例1：简单的函数定义与调用\n");
    greet();
    return 0;
}

// 示例2：带参数的函数定义与调用
#include <stdio.h>

int add(int a, int b)
{
    return a + b;
}

int main()
{
    printf("示例2：带参数的函数\n");
    int sum = add(5, 10);
    printf("5 + 10 = %d\n", sum);
    return 0;
}

// 示例3：带返回值的函数定义与调用
#include <stdio.h>

int divide(int a, int b)
{
    if (b == 0)
    {
        printf("Error: Division by zero!\n");
        return 0;
    }
    else
    {
        return (float)a / b;
    }
}

int main()
{
    printf("示例3：带返回值的函数\n");
    float result = divide(10, 2);
    printf("10 / 2 = %.2f\n", result);
    return 0;
}

// 示例4：递归函数 - 计算阶乘
#include <stdio.h>

int factorial(int n)
{
    if (n == 0)
        return 1;
    return n * factorial(n - 1);
}

int main()
{
    printf("示例4：递归函数\n");
    int fact = factorial(5);
    printf("5! = %d\n", fact);
    return 0;
}

// 示例5：传值调用
#include <stdio.h>

void modify_value(int x)
{
    x = 100; // 修改的是x的副本，不影响传入的参数
}

int main()
{
    printf("示例5：传值调用\n");
    int x = 5;
    printf("Before modification: %d\n", x);
    modify_value(x);
    printf("After modification: %d\n", x);
    return 0;
}

// 示例6：传指针调用
#include <stdio.h>

void modify_value_by_reference(int *x)
{
    *x = 100; // 修改的是x所指向的值，会影响传入的参数
}

int main()
{
    printf("示例6：传指针调用\n");
    int y = 5;
    printf("Before modification: %d\n", y);
    modify_value_by_reference(&y);
    printf("After modification: %d\n", y);
    return 0;
}

// 示例7：全局变量
#include <stdio.h>

int global_var = 10; // 全局变量

void show_global_var()
{
    printf("Global variable: %d\n", global_var);
}

void modify_global_var()
{
    global_var = 20; // 修改全局变量
    printf("Global variable after modification: %d\n", global_var);
}

int main()
{
    printf("示例7：全局变量\n");
    show_global_var();
    modify_global_var();
    show_global_var();
    return 0;
}

// 示例8：局部变量
#include <stdio.h>

void local_scope_example()
{
    int local_var = 5; // 局部变量
    printf("Local variable: %d\n", local_var);
}

int main()
{
    printf("示例8：局部变量\n");
    local_scope_example();
    // printf("Outside local scope: %d\n", local_var); // 错误：局部变量在函数外部不可见
    return 0;
}

// 示例9：静态局部变量
#include <stdio.h>

void static_local_scope_example()
{
    static int static_local_var = 5; // 静态局部变量, 只初始化一次, 值在函数间保持
    printf("Static local variable: %d\n", static_local_var);
    static_local_var++;
}

int main()
{
    printf("示例9：静态局部变量\n");
    static_local_scope_example();
    static_local_scope_example();
    static_local_scope_example(); // 静态局部变量在函数间保持值
    return 0;
}

// 示例10：函数原型
#include <stdio.h>

float multiply(float a, float b); // 函数原型声明

int main()
{
    printf("示例10：函数原型\n");
    float product = multiply(2.5, 4.0);
    printf("2.5 * 4.0 = %.2f\n", product);
    return 0;
}

float multiply(float a, float b)
{
    return a * b;
}
