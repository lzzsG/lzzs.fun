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

// 示例11：多个返回值 - 使用指针返回多个值
#include <stdio.h>

void get_min_max(int arr[], int size, int *min, int *max)
{
    *min = *max = arr[0];
    for (int i = 1; i < size; i++)
    {
        if (arr[i] < *min)
        {
            *min = arr[i];
        }
        if (arr[i] > *max)
        {
            *max = arr[i];
        }
    }
}

int main()
{
    printf("示例11：多个返回值 - 使用指针返回多个值\n");
    int arr[] = {5, 3, 8, 1, 9};
    int min, max;
    get_min_max(arr, 5, &min, &max);
    printf("Min: %d, Max: %d\n", min, max);
    return 0;
}

// 示例12：函数指针作为参数
#include <stdio.h>

void perform_operation(int a, int b, int (*operation)(int, int))
{
    int result = operation(a, b);
    printf("Result: %d\n", result);
}

int add(int a, int b)
{
    return a + b;
}

int subtract(int a, int b)
{
    return a - b;
}

int main()
{
    printf("示例12：函数指针作为参数\n");
    perform_operation(10, 5, add);
    perform_operation(10, 5, subtract);
    return 0;
}

// 示例13：变量隐藏（局部变量与全局变量同名）
#include <stdio.h>

int global_var = 10; // 全局变量

void show_global_var()
{
    printf("Global variable: %d\n", global_var);
}

void hidden_global_var()
{
    int global_var = 20; // 局部变量, 隐藏了全局变量
    printf("Local variable: %d\n", global_var);
}

int main()
{
    printf("示例13：变量隐藏（局部变量与全局变量同名）\n");
    show_global_var();
    hidden_global_var();
    printf("Global variable after hiding: %d\n", global_var);
    return 0;
}

// 示例14：内联函数
#include <stdio.h>

inline int sqare(int x)
{
    return x * x;
}

int main()
{
    printf("示例14：内联函数\n");
    printf("Square of 5: %d\n", sqare(5));
    return 0;
}

// 示例15：递归函数 - 斐波那契数列
#include <stdio.h>

int fibonacci(int n)
{
    if (n <= 1)
    {
        return n;
    }
    else
    {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}

int main()
{
    printf("示例15：递归函数 - 斐波那契数列\n");
    for (int i = 0; i < 10; i++)
    {
        printf("fibonacci(%d) = %d\n", i, fibonacci(i));
    }
    return 0;
}

// 示例16：函数的可变参数
#include <stdio.h>
#include <stdarg.h>

int sum_of_numbers(int count, ...)
{
    int sum = 0;
    va_list args;
    va_start(args, count);
    for (int i = 0; i < count; i++)
    {
        sum += va_arg(args, int);
    }
    va_end(args);
    return sum;
}

int main()
{
    printf("示例16：函数的可变参数\n");
    printf("3个数字的和: %d\n", sum_of_numbers(3, 1, 2, 3));
    printf("5个数字的和: %d\n", sum_of_numbers(5, 1, 2, 3, 4, 5));
    return 0;
}

// 示例17：作用域中的静态全局变量
#include <stdio.h>

static int static_global_var = 30;

void show_static_global_var()
{
    printf("Static global variable: %d\n", static_global_var);
    static_global_var += 10;
}

int main()
{
    printf("示例17：作用域中的静态全局变量\n");
    show_static_global_var();
    show_static_global_var();
    show_static_global_var();
    return 0;
}

// 示例18：嵌套函数调用
#include <stdio.h>

void function_b()
{
    printf("Function B\n");
}

void function_a()
{
    printf("Function A, calling function B...\n");
    function_b();
}

int main()
{
    printf("示例18：嵌套函数调用\n");
    function_a();
    return 0;
}

// 示例19: 函数指针作为返回值
#include <stdio.h>

int *find_max(int *a, int *b)
{
    if (*a > *b)
    {
        return a;
    }
    else
    {
        return b;
    }
}

int main()
{
    printf("示例19：函数返回指针\n");
    int a = 10, b = 20;
    int *max_ptr = find_max(&a, &b);
    printf("Max: %d\n", *max_ptr);
    return 0;
}

// 示例20: 嵌套的递归函数 - 汉诺塔问题
#include <stdio.h>

void hanoi(int n, char from, char to, char aux)
{
    if (n == 1)
    {
        printf("Move disk 1 from %c to %c\n", from, to);
        return;
    }
    hanoi(n - 1, from, aux, to);
    printf("Move disk %d from %c to %c\n", n, from, to);
    hanoi(n - 1, aux, to, from);
}

int main()
{
    printf("示例20：嵌套的递归函数 - 汉诺塔问题\n");
    hanoi(3, 'A', 'C', 'B');
    return 0;
}

// 示例21: 函数中的静态局部变量的应用（计数器）
#include <stdio.h>

void count_calls()
{
    static int count = 0; // 静态局部变量，只初始化一次
    count++;
    printf("This function has been called %d times.\n", count);
}

int main()
{
    printf("示例21：函数中的静态局部变量的应用（计数器）\n");
    count_calls();
    count_calls();
    count_calls();
    return 0;
}

// 示例22: 通过指针返回局部变量的地址（警告错误示例）
#include <stdio.h>

int *return_local_address()
{
    int local_var = 10;
    return &local_var; // 返回局部变量的地址 (错误示例)
}

int main()
{
    printf("示例22：通过指针返回局部变量的地址（警告错误示例）\n");
    int *ptr = return_local_address();
    printf("Value at address: %d\n", *ptr); // 不可靠输出
    return 0;
}

// 示例23: 使用动态内存分配返回指针
#include <stdio.h>
#include <stdlib.h>

int *create_array(int size)
{
    int *arr = (int *)malloc(size * sizeof(int));
    if (arr == NULL)
    {
        printf("Memory allocation failed\n");
        exit(1);
    }
    for (int i = 0; i < size; i++)
    {
        arr[i] = i * 2; // 初始化数组元素
    }
    return arr;
}

int main()
{
    printf("示例23：使用动态内存分配返回指针\n");
    int *arr = create_array(5);
    for (int i = 0; i < 5; i++)
    {
        printf("array[%d] = %d\n", i, arr[i]);
    }
    free(arr); // 释放动态内存
    return 0;
}

// 示例24: 全局静态变量与多文件作用域
#include <stdio.h>

int global_static_var = 100;

void show_global_static_var()
{
    printf("Global static variable: %d\n", global_static_var);
}

int main()
{
    printf("示例24：全局静态变量与多文件作用域\n");
    show_global_static_var();
    return 0;
}

// 示例25: 实现类似默认参数的效果
#include <stdio.h>

void print_message(char *message, int times)
{
    for (int i = 0; i < times; i++)
    {
        printf("%s\n", message);
    }
}

void print_message_default(char *message)
{
    print_message(message, 1);
}

void print_message_special(char *message, int times)
{
    if (times == -1)
    {
        times = 1; // 使用默认值
    }
    for (int i = 0; i < times; i++)
    {
        printf("%s\n", message);
    }
}

int main()
{
    printf("示例25：实现类似默认参数的效果\n");
    print_message_default("Hello, World!");
    print_message("Hello, World!", 3);
    print_message_special("Hello, World!", -1);
    print_message_special("Hello, World!", 4);
    return 0;
}
