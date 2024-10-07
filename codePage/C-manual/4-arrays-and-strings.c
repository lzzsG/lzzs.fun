#include <stdio.h>
#include <string.h>
#include <stdlib.h>

// 示例13：数组作为函数参数传递
void print_array(int arr[], int size);

// 示例15：冒泡排序算法
void bubble_sort(int arr[], int size);

int main()
{
    // 示例1：一维数组的定义与初始化
    printf("示例1：一维数组的定义与初始化\n");
    int numbers[5] = {1, 2, 3, 4, 5};
    for (int i = 0; i < 5; i++)
    {
        printf("numbers[%d] = %d\n", i, numbers[i]);
    }

    // 示例2：数组的遍历与修改
    printf("\n示例2：数组的遍历与修改\n");
    int numbers2[5] = {10, 20, 30, 40, 50};
    for (int i = 0; i < 5; i++)
    {
        numbers2[i] *= 2;
        printf("修改后的 numbers2[%d] = %d\n", i, numbers2[i]);
    }

    // 示例3：二维数组的定义与遍历
    printf("\n示例3：二维数组的定义与遍历\n");
    int matrix[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}};
    for (int i = 0; i < 3; i++)
    {
        for (int j = 0; j < 3; j++)
        {
            printf("matrix[%d][%d] = %d\n", i, j, matrix[i][j]);
        }
        printf("\n");
    }

    // 示例4：字符数组（字符串）的定义与初始化
    printf("\n示例4：字符数组（字符串）的定义与初始化\n");
    char greeting[6] = {'H', 'e', 'l', 'l', 'o', '\0'};
    printf("greeting: %s\n", greeting);

    // 示例5：使用字符串常量
    printf("\n示例5：使用字符串常量\n");
    char greeting2[] = "Hello World!";
    printf("greeting2: %s\n", greeting2);

    // 示例6：字符串的输入与输出
    printf("\n示例6：字符串的输入与输出\n");
    char name[50];
    printf("请输入您的名字：");
    fgets(name, 50, stdin);
    printf("您好，%s！\n", name);

    // 示例7：字符串的复制
    printf("\n示例7：字符串的复制\n");
    char src[] = "Hello, World!";
    char dest[20];
    strcpy(dest, src);
    printf("src: %s\n", src);
    printf("dest: %s\n", dest);

    // 示例8：字符串连接,strcat,需要包含<string.h>
    printf("\n示例8：字符串连接\n");
    char str1[] = "Hello, ";
    char str2[] = "C!";
    char result_str[30];      // 预留足够空间
    strcpy(result_str, str1); // 先复制第一个字符串
    strcat(result_str, str2); // 然后连接第二个字符串
    printf("result_str: %s\n", result_str);

    // 或者直接连接到 str1,但str1 需要足够大
    char new_str1[20] = "Hello, "; // 预留足够空间
    strcat(new_str1, str2);        // 将 str2 连接到 str1 的末尾
    printf("直接连接后的new_str1: %s\n", new_str1);

    // 示例9：字符串比较
    printf("\n示例9：字符串比较\n");
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

    // 示例10：字符串长度
    printf("\n示例10：字符串长度\n");
    char str5[] = "Hello, World!";
    int length = strlen(str5); // 计算字符串的长度
    printf("字符串\"%s\"的长度是: %d\n", str5, length);

    // 示例11：字符数组与指针的关系
    printf("\n示例11：字符数组与指针的关系\n");
    char str6[] = "Pointer Example";
    char *ptr = str6;
    while (*ptr != '\0')
    {
        printf("%c", *ptr);
        ptr++;
    }
    printf("\n");

    // 示例12：多维数组的初始化与使用
    printf("\n示例12：多维数组的初始化与使用\n");
    int arr[2][2][2] = {
        {{1, 2},
         {3, 4}},
        {{5, 6},
         {7, 8}}};
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

    // 示例13：数组作为函数参数传递
    printf("\n示例13：数组作为函数参数传递\n");
    // void print_array(int arr[], int size)
    int numbers3[] = {1, 2, 3, 4, 5};
    int size = sizeof(numbers3) / sizeof(numbers3[0]);
    print_array(numbers3, size);

    // 示例14：字符数组操作示例
    printf("\n示例14：字符数组操作示例\n");
    char name2[20] = "john Doe";
    printf("name: %s\n", name2);
    name2[0] = 'J';
    printf("修改后的name: %s\n", name2);

    // 示例15：冒泡排序算法
    printf("\n示例15：冒泡排序算法\n");
    // void bubble_sort(int arr[], int size)
    int arr2[] = {64, 34, 25, 12, 22, 11, 90};
    int size2 = sizeof(arr2) / sizeof(arr2[0]);
    printf("排序前的数组：\n");
    for (int i = 0; i < size2; i++)
    {
        printf("%d ", arr2[i]);
    }
    bubble_sort(arr2, size2);
    printf("\n排序后的数组：\n\n");
    for (int i = 0; i < size2; i++)
    {
        printf("%d ", arr2[i]);
    }

    // 示例16：二维字符数组 - 存储多个字符串
    printf("\n示例16：二维字符数组 - 存储多个字符串\n");
    char fruits[3][20] = {
        "Apple",
        "Banana",
        "Cherry"};
    for (int i = 0; i < 3; i++)
    {
        printf("%s\n", fruits[i]);
    }

    // 示例17：指向数组的指针
    printf("\n示例17：指向数组的指针\n");
    int values[5] = {10, 20, 30, 40, 50};
    int(*arr_ptr)[5] = &values;
    printf("第一个元素的值: %d\n", (*arr_ptr)[0]);
    printf("第二个元素的值: %d\n", (*arr_ptr)[1]);

    // 示例18：动态分配一维数组
    printf("\n示例18：动态分配一维数组\n");
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

    // 示例19：动态分配二维数组
    printf("\n示例19：动态分配二维数组\n");
    int rows, cols;
    printf("请输入二维数组的行数和列数: ");
    scanf("%d %d", &rows, &cols);
    int **dynamic_2d_array = (int **)malloc(rows * sizeof(int *)); // 分配二维数组
    for (int i = 0; i < rows; i++)
    {
        dynamic_2d_array[i] = (int *)malloc(cols * sizeof(int));
    }
    for (int i = 0; i < rows; i++)
    {
        for (int j = 0; j < cols; j++)
        {
            dynamic_2d_array[i][j] = i * cols + j + 1; // 初始化数组元素
        }
        printf("\n");
    }
    printf("动态分配的二维数组: \n");
    for (int i = 0; i < rows; i++)
    {
        for (int j = 0; j < cols; j++)
        {
            printf("%d ", dynamic_2d_array[i][j]);
        }
        printf("\n");
    }
    for (int i = 0; i < rows; i++)
    {
        free(dynamic_2d_array[i]); // 释放每一行的内存
    }

    // 示例20：使用 strtok() 分割字符串，需要包含头文件 <string.h>
    printf("\n示例20：使用 strtok() 分割字符串\n");
    char sentence[] = "Hello, World! This is a test.";
    char *token = strtok(sentence, " "); // 使用空格作为分隔符, 返回第一个单词
    while (token != NULL)
    {
        printf("%s\n", token);
        token = strtok(NULL, " "); // 继续分割下一个单词
    }

    // 示例21：查找字符在字符串中的位置
    printf("\n示例21：查找字符在字符串中的位置\n");
    char search_str[] = "Find character in string";
    char ch = 'i';
    char *position = strchr(search_str, ch); // 查找字符 'i' 在字符串中的位置, 返回指向该字符的指针, 如果未找到则返回 NULL, 仅查找第一个匹配的字符
    if (position != NULL)
    {
        printf("字符 '%c' 在字符串中的位置是: %ld\n", ch, position - search_str); // 计算字符的位置, position - search_str 得到字符在字符串中的索引
    }
    else
    {
        printf("字符 '%c' 在字符串中未找到\n", ch);
    }

    // 示例22：查找字符串在字符串中的位置
    printf("\n示例22：查找字符串在字符串中的位置\n");
    char main_str[] = "This is a test string";
    char search_sub_str[] = "test";
    char *position_sub_str = strstr(main_str, search_sub_str); // 查找子字符串在字符串中的位置, 返回指向该子字符串的指针, 如果未找到则返回 NULL, 查找第一个匹配的子字符串
    if (position_sub_str != NULL)
    {
        printf("子字符串 '%s' 在字符串中的位置是: %ld\n", search_sub_str, position_sub_str - main_str); // 计算子字符串的位置, position_sub_str - main_str 得到子字符串在字符串中的索引
    }
    else
    {
        printf("子字符串 '%s' 在字符串中未找到\n", search_sub_str);
    }

    // 示例23：数组的反转
    printf("\n示例23：数组的反转\n");
    int numbers_to_reverse[] = {1, 2, 3, 4, 5};
    int size_of_numbers_to_reverse = sizeof(numbers_to_reverse) / sizeof(numbers_to_reverse[0]);
    printf("反转前的数组: ");
    for (int i = 0; i < size_of_numbers_to_reverse; i++)
    {
        printf("%d ", numbers_to_reverse[i]);
    }
    printf("\n");
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

    // 示例24：将字符串转为整数
    printf("\n示例24：将字符串转为整数\n");
    char num_str[] = "12345";
    int num = atoi(num_str); // 将字符串转为整数, 返回转换后的整数, 如果字符串无法转换为整数则返回 0, 仅转换数字部分,忽略其他字符,需要包含头文件 <stdlib.h>
    printf("字符串 \"%s\" 转换为整数: %d\n", num_str, num);

    // 示例25：将整数转为字符串
    printf("\n示例25：将整数转为字符串\n");
    int num_to_str = 12345;
    char result_ste[20];
    sprintf(result_ste, "%d", num_to_str); // 将整数转为字符串, 返回转换后的字符串, 需要包含头文件 <stdio.h>
    printf("整数 %d 转换为字符串: \"%s\"\n", num_to_str, result_ste);

    // 示例26：字符串到浮点数的转换
    printf("\n示例26：字符串到浮点数的转换\n");
    char float_str[] = "123.45";
    float float_num = atof(float_str); // 将字符串转为浮点数, 返回转换后的浮点数, 如果字符串无法转换为浮点数则返回 0, 仅转换数字部分,忽略其他字符,需要包含头文件 <stdlib.h>
    printf("字符串 \"%s\" 转换为浮点数: %f\n", float_str, float_num);

    // 示例27：使用 memcmp() 比较内存块
    printf("\n示例27：使用 memcmp() 比较内存块\n");
    char memory_block1[] = "Hello, World!";
    char memory_block2[] = "Hello, wOrld!";
    int result_memcmp = memcmp(memory_block1, memory_block2, 5); // 比较两个内存块的前 n 个字节, 返回 0 表示相等, 返回负数表示第一个内存块小于第二个内存块, 返回正数表示第一个内存块大于第二个内存块, 需要包含头文件 <string.h>
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

    // 示例28：memcpy() 内存复制
    printf("\n示例28：memcpy() 内存复制\n");
    char source_mem[] = "Hello, World!";
    char destination_mem[20];
    memcpy(destination_mem, source_mem, sizeof(source_mem)); // 复制内存块
    printf("源内存块: \"%s\"\n", source_mem);
    printf("目标内存块: \"%s\"\n", destination_mem);

    // 示例29：使用 memset() 初始化内存
    printf("\n示例29：使用 memset() 初始化内存\n");
    char buffer_mem[20];
    memset(buffer_mem, 'A', sizeof(buffer_mem)); // 初始化内存块, 将内存块的前 n 个字节设置为指定的值, 需要包含头文件 <string.h>
    buffer_mem[sizeof(buffer_mem) - 1] = '\0';   // 确保字符串以 null 结尾
    printf("初始化后的内存块: \"%s\"\n", buffer_mem);

    // 示例30：指针数组的使用
    printf("\n示例30：指针数组的使用\n");
    char *countries[] = {"China", "USA", "Russia", "India"};
    int size_of_countries = sizeof(countries) / sizeof(countries[0]);
    for (int i = 0; i < size_of_countries; i++)
    {
        printf("Country %d: %s\n", i + 1, countries[i]);
    }

    // 示例31：数组的按值查找
    printf("\n示例31：数组的按值查找\n");
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

    // 示例32：使用 realloc() 动态调整数组大小
    printf("\n示例32：使用 realloc() 动态调整数组大小\n");
    int *dynamic_array1 = (int *)malloc(5 * sizeof(int)); // 动态分配内存, 返回指向分配内存的指针, 需要包含头文件 <stdlib.h>
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
    dynamic_array1 = (int *)realloc(dynamic_array1, 10 * sizeof(int)); // 动态调整内存大小, 返回指向调整后内存的指针, 需要包含头文件 <stdlib.h>
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
    printf("释放内存\n");
    free(dynamic_array1); // 释放动态分配的内存

    // 示例33：指针运算与数组
    printf("\n示例33：指针运算与数组\n");
    int num_array[] = {1, 2, 3, 4, 5};
    int *ptr4 = num_array; // 指向数组第一个元素的指针
    for (int i = 0; i < 5; i++)
    {
        printf("元素 %d: %d\n", i, *(ptr + i)); // 使用指针运算访问数组元素
    }
    printf("指针地址: %p\n", ptr);      // 打印指针地址
    printf("指针指向的值: %d\n", *ptr); // 打印指针指向的值

    // 示例34：二维数组中的指针运算
    printf("\n示例34：二维数组中的指针运算\n");
    int two_dim_array[2][3] = {{1, 2, 3}, {4, 5, 6}};
    int *ptr5 = &two_dim_array[0][0]; // 指向二维数组第一个元素的指针
    for (int i = 0; i < 2; i++)
    {
        for (int j = 0; j < 3; j++)
        {
            printf("元素 %d, %d: %d\n", i, j, *(ptr5 + i * 3 + j)); // 使用指针运算访问二维数组元素
        }
    }
    printf("\n");
    int(*ptr_2d)[3] = two_dim_array; // 指向二维数组第一个元素的指针
    for (int i = 0; i < 2; i++)
    {
        for (int j = 0; j < 3; j++)
        {
            printf("元素 %d, %d: %d\n", i, j, *(*(ptr_2d + i) + j)); // 使用指针运算访问二维数组元素
        }
    }

    // 示例35：字符串连接 - 使用 snprintf 限制缓冲区大小
    printf("\n示例35：字符串连接 - 使用 snprintf 限制缓冲区大小\n");
    char buffer2[50];
    snprintf(buffer2, sizeof(buffer2), "Hello, %s!", "World");
    printf("字符串连接结果: %s\n", buffer2);

    return 0;
}

// 示例13：数组作为函数参数传递
void print_array(int arr[], int size)
{
    for (int i = 0; i < size; i++)
    {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

// 示例15：冒泡排序算法
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
