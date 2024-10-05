#include <stdio.h>
#include <assert.h>

// 函数声明
int add(int a, int b);
int subtract(int a, int b);
int multiply(int a, int b);
int divide(int a, int b);
int check_condition(int num);

int main()
{
    // 示例1：if-else 语句
    int a = 10, b = 20;
    printf("if-else 语句:\n");
    if (a > b)
    {
        printf("a 大于 b\n");
    }
    else
    {
        printf("a 小于或等于 b\n");
    }

    // 示例2：嵌套的 if-else 语句
    printf("\n嵌套的 if-else 语句:\n");
    if (a == b)
    {
        printf("a 等于 b\n");
    }
    else
    {
        if (a > b)
        {
            printf("a 大于 b\n");
        }
        else
        {
            printf("a 小于 b\n");
        }
    }

    // 示例3：else-if 链
    int score = 85;
    printf("\nelse-if 链:\n");
    if (score >= 90)
    {
        printf("成绩等级为 A\n");
    }
    else if (score >= 80)
    {
        printf("成绩等级为 B\n");
    }
    else if (score >= 70)
    {
        printf("成绩等级为 C\n");
    }
    else
    {
        printf("成绩等级为 D\n");
    }

    // 示例4：switch 语句
    int day = 2;
    printf("\nswitch 语句:\n");
    switch (day)
    {
    case 1:
        printf("今天是星期一\n");
        break;
    case 2:
        printf("今天是星期二\n");
        break;
    case 3:
        printf("今天是星期三\n");
        break;
    case 4:
        printf("今天是星期四\n");
        break;
    case 5:
        printf("今天是星期五\n");
        break;
    default:
        printf("周末\n");
        break;
    }

    // 示例5：三元运算符
    printf("\n三元运算符:\n");
    int max = (a > b) ? a : b;
    printf("a 和 b 中的最大值是: %d\n", max);

    // 示例6：while 循环
    int count = 0;
    printf("\nwhile 循环:\n");
    while (count < 5)
    {
        printf("count = %d\n", count);
        count++;
    }

    // 示例7：do-while 循环
    count = 0;
    printf("\ndo-while 循环:\n");
    do
    {
        printf("count = %d\n", count);
        count++;
    } while (count < 5);

    // 示例8：for 循环
    printf("\nfor 循环:\n");
    for (int i = 0; i < 5; i++)
    {
        printf("i = %d\n", i);
    }

    // 示例9：for 循环 - 多个变量
    printf("\nfor 循环 - 多个变量:\n");
    for (int i = 0, j = 10; i < 5; i++, j--)
    {
        printf("i = %d, j = %d\n", i, j);
    }

    // 示例10：break 语句
    printf("\nbreak 语句:\n");
    for (int i = 0; i < 10; i++)
    {
        if (i == 5)
        {
            break; // 当 i 等于 5 时退出循环
        }
        printf("i = %d\n", i);
    }

    // 示例11：continue 语句
    printf("\ncontinue 语句:\n");
    for (int i = 0; i < 10; i++)
    {
        if (i % 2 == 0)
        {
            continue; // 跳过偶数
        }
        printf("i = %d\n", i);
    }

    // 示例12：嵌套循环
    printf("\n嵌套循环:\n");
    for (int i = 1; i <= 3; i++)
    {
        for (int j = 1; j <= 3; j++)
        {
            printf("i = %d, j = %d\n", i, j);
        }
    }

    // 示例13：循环中的条件判断和 break 语句结合
    printf("\n循环中的条件判断和 break 语句结合:\n");
    for (int i = 0; i < 10; i++)
    {
        printf("i = %d\n", i);
        if (i > 5)
        {
            printf("i 大于 5，退出循环\n");
            break;
        }
    }

    // 示例14：嵌套的条件和循环结构
    printf("\n嵌套的条件和循环结构:\n");
    for (int i = 0; i < 3; i++)
    {
        if (i % 2 == 0)
        {
            for (int j = 0; j < 3; j++)
            {
                printf("i = %d, j = %d\n", i, j);
            }
        }
    }

    // 示例15：switch 中的嵌套结构
    printf("\nswitch 中的嵌套结构:\n");
    int x = 2, y = 3;
    switch (x)
    {
    case 1:
        printf("x 是 1\n");
        break;
    case 2:
        switch (y)
        {
        case 2:
            printf("y 是 2\n");
            break;
        case 3:
            printf("y 是 3\n");
            break;
        }
        break;
    default:
        printf("x 不是 1 或 2\n");
        break;
    }

    // 示例16：带标签的 goto 语句
    printf("\ngoto 语句:\n");
    int flag = 1;
    if (flag)
    {
        goto label;
    }
    printf("这行代码不会执行\n");
label:
    printf("跳到了标签处\n");

    // 示例17：for 循环中的空语句
    printf("\nfor 循环中的空语句:\n");
    int sum = 0;
    for (int i = 1; i <= 100; sum += i, i++)
        ; // 利用空语句累加 1 到 100
    printf("1 到 100 的和是: %d\n", sum);

    // 示例18：嵌套循环 - 打印乘法表
    printf("\n嵌套循环 - 打印乘法表:\n");
    for (int i = 1; i <= 9; i++)
    {
        for (int j = 1; j <= i; j++)
        {
            printf("%d * %d = %2d  ", j, i, i * j);
        }
        printf("\n");
    }

    int i, j;
    int found = 0; // 标志变量
    printf("\n带标志的跳出多层嵌套循环:\n");
    for (i = 1; i <= 5; i++)
    {
        for (j = 1; j <= 5; j++)
        {
            if (i == 3 && j == 3)
            {
                found = 1; // 设置标志
                break;     // 跳出内层循环
            }
            printf("i = %d, j = %d\n", i, j);
        }
        if (found)
        { // 外层循环检测标志
            break;
        }
    }

    // 示例20：模拟 switch 的枚举与函数指针表
    enum Operation
    {
        ADD,
        SUBTRACT,
        MULTIPLY,
        DIVIDE
    };

    printf("\n模拟 switch 的枚举与函数指针表:\n");

    int (*operations[])(int, int) = {add, subtract, multiply, divide}; // 函数指针数组

    int op = ADD;
    int x1 = 10, y1 = 5;
    printf("ADD: %d + %d = %d\n", x1, y1, operations[op](x1, y1));

    op = MULTIPLY;
    printf("MULTIPLY: %d * %d = %d\n", x, y, operations[op](x, y));

    // 示例21：if 语句中的逗号运算符
    printf("\nif 语句中的逗号运算符:\n");
    int a1 = 1, b1 = 2;
    if (a1 = 3, b1 = 4, a1 > b1)
    {
        printf("a1 大于 b1\n");
    }
    else
    {
        printf("a1 小于或等于 b1\n");
    }

    // 示例22：在循环内动态调整循环条件
    printf("\n在循环内动态调整循环条件:\n");
    int limit = 5;
    for (int i = 0; i < limit; i++)
    {
        printf("i = %d\n", i);
        if (i == 2)
        {
            limit = 7; // 在循环中动态调整 limit
            printf("Limit 动态调整为 %d\n", limit);
        }
    }

    // 示例23：多层循环中的 continue 和 break
    printf("\n多层循环中的 continue 和 break:\n");
    for (int i = 0; i < 3; i++)
    {
        for (int j = 0; j < 3; j++)
        {
            if (i == j)
            {
                continue; // 跳过同等 i, j 的情况
            }
            if (i + j == 4)
            {
                break; // 当 i + j 等于 4 时，跳出内层循环
            }
            printf("i = %d, j = %d\n", i, j);
        }
    }

    // 示例24：for 循环中的条件初始化
    printf("\nfor 循环中的条件初始化:\n");
    for (int i = 0, sum = 0; i < 10 && sum < 20; i++)
    {
        sum += i;
        printf("i = %d, sum = %d\n", i, sum);
    }

    // 示例25：条件编译中的控制结构
    printf("\n条件编译中的控制结构:\n");
#ifdef DEBUG
    printf("Debug 模式下执行的代码\n");
#else
    printf("Release 模式下执行的代码\n");
#endif

    // 示例26：使用 assert 检查控制结构中的逻辑

    printf("\n使用 assert 检查控制结构中的逻辑:\n");
    int val = 10;
    assert(val >= 0); // 如果 val 小于 0，程序终止
    printf("val = %d\n", val);

    // 示例27：条件循环与函数结合
    printf("\n条件循环与函数结合:\n");
    /*
    int check_condition(int num)
    {
        return num > 0;
    }

    int start = 5;
    while (check_condition(start))
    {
        printf("start = %d\n", start);
        start--;
    }
    */
    printf("\n条件循环与函数结合:\n");

    int start = 5;
    while (check_condition(start))
    {
        printf("start = %d\n", start);
        start--;
    }

    // 示例28：使用 for 循环计算数组元素的和
    printf("\n使用 for 循环计算数组元素的和:\n");
    int arr[] = {1, 2, 3, 4, 5};
    int sum1 = 0;
    for (int i = 0; i < sizeof(arr) / sizeof(arr[0]); i++)
    {
        sum1 += arr[i];
    }
    printf("数组元素的和: %d\n", sum1);

    // 示例29：倒序循环遍历数组
    printf("\n倒序循环遍历数组:\n");
    for (int i = sizeof(arr) / sizeof(arr[0]) - 1; i >= 0; i--)
    {
        printf("arr[%d] = %d\n", i, arr[i]);
    }

    // 示例30：双重循环中跳出到外层
    // 方式1：使用标志变量退出多层循环
    printf("\n双重循环中使用标志位跳出外层:\n");
    int found1 = 0; // 标志变量
    for (int i = 0; i < 5 && !found1; i++)
    {
        for (int j = 0; j < 5; j++)
        {
            if (j == 3)
            {
                found1 = 1; // 设置标志变量，退出外层循环
                break;      // 跳出内层循环
            }
            printf("i = %d, j = %d\n", i, j);
        }
    }
    // 方式2：使用 goto 跳出双重循环
    printf("\n双重循环中使用 goto 跳出外层:\n");
    for (int i = 0; i < 5; i++)
    {
        for (int j = 0; j < 5; j++)
        {
            if (j == 3)
            {
                goto outer_loop_exit; // 使用 goto 跳出双重循环
            }
            printf("i = %d, j = %d\n", i, j);
        }
    }
outer_loop_exit:
    printf("跳出了双重循环\n");

    return 0;
}

// 示例20函数定义
int add(int a, int b)
{
    return a + b;
}

int subtract(int a, int b)
{
    return a - b;
}

int multiply(int a, int b)
{
    return a * b;
}

int divide(int a, int b)
{
    return b != 0 ? a / b : 0;
}

int check_condition(int num)
{
    return num > 0;
}
