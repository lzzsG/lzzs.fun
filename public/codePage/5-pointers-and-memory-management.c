#include <stdio.h>
#include <stdlib.h>

int main()
{
    // 示例1：指针的基本使用
    printf("示例1：指针的基本使用\n");
    int x = 10;
    int *ptr = &x; // ptr 指向 x 的地址
    printf("x 的值: %d\n", x);
    printf("x 的地址: %p\n", &x);
    printf("ptr 指向的值: %d\n", *ptr); // 通过指针访问 x 的值

    // 示例2：指针与指针运算
    printf("\n示例2：指针与指针运算\n");
    int arr[] = {1, 2, 3, 4, 5};
    int *p = arr; // p 指向数组第一个元素
    for (int i = 0; i < 5; i++)
    {
        printf("arr[%d] = %d, 通过指针访问: %d\n", i, arr[i], *(p + i));
    }

    // 示例3：指向指针的指针
    printf("\n示例3：指向指针的指针\n");
    int **pptr = &ptr; // 指向指针的指针
    printf("ptr 的地址: %p\n", &ptr);
    printf("pptr 指向 ptr 的值: %p\n", *pptr);     // pptr 访问 ptr 的值
    printf("通过 pptr 访问 x 的值: %d\n", **pptr); // 通过 pptr 访问 x 的值

    // 示例4：动态内存分配 - malloc()
    printf("\n示例4：动态内存分配 - malloc()\n");
    int *dynamic_array = (int *)malloc(5 * sizeof(int)); // 分配5个整数大小的内存
    if (dynamic_array == NULL)
    {
        printf("内存分配失败\n");
        return 1;
    }
    for (int i = 0; i < 5; i++)
    {
        dynamic_array[i] = i + 1; // 初始化动态分配的内存
        printf("dynamic_array[%d] = %d\n", i, dynamic_array[i]);
    }
    free(dynamic_array); // 释放动态分配的内存

    // 示例5：动态内存分配 - calloc()
    printf("\n示例5：动态内存分配 - calloc()\n");
    int *zero_array = (int *)calloc(5, sizeof(int)); // 分配并初始化为0
    if (zero_array == NULL)
    {
        printf("内存分配失败\n");
        return 1;
    }
    for (int i = 0; i < 5; i++)
    {
        printf("zero_array[%d] = %d\n", i, zero_array[i]); // 输出初始化为0的值
    }
    free(zero_array); // 释放动态内存

    // 示例6：动态内存分配 - realloc()
    printf("\n示例6：动态内存分配 - realloc()\n");
    int *realloc_array = (int *)malloc(3 * sizeof(int)); // 初始分配3个整数大小的内存
    if (realloc_array == NULL)
    {
        printf("内存分配失败\n");
        return 1;
    }
    for (int i = 0; i < 3; i++)
    {
        realloc_array[i] = i + 1;
        printf("realloc_array[%d] = %d\n", i, realloc_array[i]);
    }
    realloc_array = (int *)realloc(realloc_array, 5 * sizeof(int)); // 重新调整大小为5个整数
    if (realloc_array == NULL)
    {
        printf("内存重新分配失败\n");
        return 1;
    }
    realloc_array[3] = 4;
    realloc_array[4] = 5;
    for (int i = 0; i < 5; i++)
    {
        printf("调整大小后的 realloc_array[%d] = %d\n", i, realloc_array[i]);
    }
    free(realloc_array); // 释放动态内存

    // 示例7：数组与指针的关系
    printf("\n示例7：数组与指针的关系\n");
    int array[] = {10, 20, 30, 40, 50};
    int *array_ptr = array; // 指针指向数组的第一个元素
    for (int i = 0; i < 5; i++)
    {
        printf("通过指针访问 array[%d] = %d\n", i, *(array_ptr + i)); // 通过指针遍历数组
    }

    // 示例8：指针和函数参数
    printf("\n示例8：指针和函数参数\n");
    void modify_value(int *num)
    {
        *num = 100; // 修改指针所指向的值
    }
    int value = 50;
    printf("修改前 value = %d\n", value);
    modify_value(&value); // 传递指针给函数，修改值
    printf("修改后 value = %d\n", value);

    // 示例9：指针数组
    printf("\n示例9：指针数组\n");
    int a = 1, b = 2, c = 3;
    int *pointers[3] = {&a, &b, &c}; // 指针数组
    for (int i = 0; i < 3; i++)
    {
        printf("pointers[%d] 指向的值: %d\n", i, *pointers[i]); // 通过指针数组访问值
    }

    // 示例10：函数指针
    printf("\n示例10：函数指针\n");
    int add(int a, int b)
    {
        return a + b;
    }
    int (*func_ptr)(int, int) = add; // 函数指针指向 add 函数
    int result = func_ptr(3, 4);     // 调用函数指针
    printf("通过函数指针调用 add(3, 4) = %d\n", result);

    return 0;
}

//----------------------------------------------
#include <stdio.h>
#include <stdlib.h>

int main()
{
    // 示例11：指针的指针与二维数组
    printf("\n示例11：指针的指针与二维数组\n");
    int matrix[2][3] = {{1, 2, 3}, {4, 5, 6}};
    int(*ptr_to_matrix)[3] = matrix; // 指向二维数组的指针
    for (int i = 0; i < 2; i++)
    {
        for (int j = 0; j < 3; j++)
        {
            printf("matrix[%d][%d] = %d\n", i, j, *(*(ptr_to_matrix + i) + j)); // 使用指针访问二维数组
        }
    }

    // 示例12：指针与字符串
    printf("\n示例12：指针与字符串\n");
    char *str = "Hello, Pointer!";
    printf("字符串内容: %s\n", str);        // 直接打印字符串
    printf("字符串第一个字符: %c\n", *str); // 使用指针访问第一个字符
    printf("字符串地址: %p\n", str);        // 打印字符串的地址

    // 示例13：野指针与空指针
    printf("\n示例13：野指针与空指针\n");
    int *wild_ptr;        // 野指针（未初始化的指针）
    int *null_ptr = NULL; // 空指针
    printf("空指针 null_ptr 的值：%p\n", null_ptr);
    // printf("野指针 wild_ptr 的值：%d\n", *wild_ptr); // 未初始化指针，可能导致错误，故注释
    if (null_ptr == NULL)
    {
        printf("null_ptr 是空指针\n");
    }

    // 示例14：void 指针的使用
    printf("\n示例14：void 指针的使用\n");
    int num = 100;
    void *void_ptr = &num;                                   // void 类型的指针可以指向任何类型的数据
    printf("void_ptr 指向的整数值: %d\n", *(int *)void_ptr); // 需要转换为正确类型

    // 示例15：使用指针遍历字符串
    printf("\n示例15：使用指针遍历字符串\n");
    char text[] = "Pointer Loop";
    char *text_ptr = text; // 指向字符串第一个字符的指针
    while (*text_ptr != '\0')
    {
        printf("%c", *text_ptr); // 通过指针遍历每个字符
        text_ptr++;
    }
    printf("\n");

    // 示例16：动态分配字符数组（字符串）
    printf("\n示例16：动态分配字符数组（字符串）\n");
    char *dynamic_str = (char *)malloc(20 * sizeof(char)); // 动态分配20个字符的内存
    if (dynamic_str == NULL)
    {
        printf("内存分配失败\n");
        return 1;
    }
    strcpy(dynamic_str, "Dynamic String"); // 将字符串复制到动态分配的内存中
    printf("动态分配的字符串: %s\n", dynamic_str);
    free(dynamic_str); // 释放内存

    // 示例17：结构体与指针
    printf("\n示例17：结构体与指针\n");
    struct Point
    {
        int x;
        int y;
    };
    struct Point point = {10, 20};
    struct Point *point_ptr = &point;                                           // 指向结构体的指针
    printf("结构体 point 的 x 值: %d, y 值: %d\n", point_ptr->x, point_ptr->y); // 使用指针访问结构体成员

    // 示例18：动态分配结构体数组
    printf("\n示例18：动态分配结构体数组\n");
    struct Point *points = (struct Point *)malloc(3 * sizeof(struct Point)); // 分配结构体数组
    if (points == NULL)
    {
        printf("内存分配失败\n");
        return 1;
    }
    for (int i = 0; i < 3; i++)
    {
        points[i].x = i + 1;
        points[i].y = (i + 1) * 10;
        printf("Point %d -> x: %d, y: %d\n", i, points[i].x, points[i].y); // 输出结构体数组的值
    }
    free(points); // 释放结构体数组

    // 示例19：指针与 const 修饰符
    printf("\n示例19：指针与 const 修饰符\n");
    const int constant_value = 50;
    const int *const_ptr = &constant_value; // 指向常量的指针
    printf("constant_value 的值: %d\n", *const_ptr);
    // *const_ptr = 100;  // 错误，无法通过 const 指针修改值

    // 示例20：指向 const 对象的指针
    printf("\n示例20：指向 const 对象的指针\n");
    int var = 100;
    const int *ptr_const_obj = &var; // 指向普通变量的 const 指针
    printf("var 的值: %d\n", *ptr_const_obj);
    var = 200;                                         // 通过变量本身修改
    printf("修改后的 var 的值: %d\n", *ptr_const_obj); // 指针仍然可以看到修改后的值，但不能通过指针修改

    return 0;
}

//----------------------------------------------