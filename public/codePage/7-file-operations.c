#include <stdio.h>
#include <stdlib.h>

int main()
{
    // 示例1：写入文件
    printf("示例1：写入文件\n");
    FILE *file = fopen("example1.txt", "w"); // 打开文件进行写入
    if (file == NULL)
    {
        printf("文件打开失败\n");
        return 1;
    }
    fprintf(file, "Hello, World!\n"); // 写入文件
    fprintf(file, "C 文件操作示例\n");
    fclose(file); // 关闭文件

    // 示例2：读取文件
    printf("\n示例2：读取文件\n");
    file = fopen("example1.txt", "r"); // 以只读模式打开文件
    if (file == NULL)
    {
        printf("文件打开失败\n");
        return 1;
    }
    char buffer[100];
    while (fgets(buffer, sizeof(buffer), file) != NULL)
    {
        printf("%s", buffer); // 输出文件内容
    }
    fclose(file);

    // 示例3：逐字节读取文件
    printf("\n示例3：逐字节读取文件\n");
    file = fopen("example1.txt", "r");
    if (file == NULL)
    {
        printf("文件打开失败\n");
        return 1;
    }
    char ch;
    while ((ch = fgetc(file)) != EOF)
    { // 使用 fgetc 逐个字符读取
        putchar(ch);
    }
    fclose(file);

    // 示例4：写入二进制文件
    printf("\n示例4：写入二进制文件\n");
    int numbers[] = {10, 20, 30, 40, 50};
    file = fopen("example4.bin", "wb"); // 打开文件进行二进制写入
    if (file == NULL)
    {
        printf("文件打开失败\n");
        return 1;
    }
    fwrite(numbers, sizeof(int), 5, file); // 写入整数数组到二进制文件
    fclose(file);

    // 示例5：读取二进制文件
    printf("\n示例5：读取二进制文件\n");
    int read_numbers[5];
    file = fopen("example4.bin", "rb"); // 以二进制模式打开文件
    if (file == NULL)
    {
        printf("文件打开失败\n");
        return 1;
    }
    fread(read_numbers, sizeof(int), 5, file); // 从二进制文件中读取数据
    for (int i = 0; i < 5; i++)
    {
        printf("number[%d] = %d\n", i, read_numbers[i]);
    }
    fclose(file);

    // 示例6：使用 fseek 和 ftell 移动文件指针
    printf("\n示例6：使用 fseek 和 ftell 移动文件指针\n");
    file = fopen("example1.txt", "r");
    if (file == NULL)
    {
        printf("文件打开失败\n");
        return 1;
    }
    fseek(file, 6, SEEK_SET);    // 将文件指针移动到文件第6个字节
    long position = ftell(file); // 获取文件指针当前位置
    printf("文件指针当前位置: %ld\n", position);
    fgets(buffer, sizeof(buffer), file); // 读取从该位置到行尾的内容
    printf("从当前位置读取的内容: %s", buffer);
    fclose(file);

    // 示例7：追加模式写入文件
    printf("\n示例7：追加模式写入文件\n");
    file = fopen("example1.txt", "a"); // 以追加模式打开文件
    if (file == NULL)
    {
        printf("文件打开失败\n");
        return 1;
    }
    fprintf(file, "这是追加的内容\n"); // 在文件末尾追加内容
    fclose(file);

    // 示例8：文件重命名
    printf("\n示例8：文件重命名\n");
    if (rename("example1.txt", "renamed_example.txt") == 0)
    {
        printf("文件重命名成功\n");
    }
    else
    {
        printf("文件重命名失败\n");
    }

    // 示例9：文件删除
    printf("\n示例9：文件删除\n");
    if (remove("renamed_example.txt") == 0)
    {
        printf("文件删除成功\n");
    }
    else
    {
        printf("文件删除失败\n");
    }

    // 示例10：格式化读写文件
    printf("\n示例10：格式化读写文件\n");
    file = fopen("example10.txt", "w"); // 打开文件写入
    if (file == NULL)
    {
        printf("文件打开失败\n");
        return 1;
    }
    fprintf(file, "Name: %s, Age: %d, Height: %.2f\n", "Alice", 25, 5.9); // 格式化写入
    fclose(file);

    file = fopen("example10.txt", "r"); // 打开文件读取
    if (file == NULL)
    {
        printf("文件打开失败\n");
        return 1;
    }
    char name[50];
    int age;
    float height;
    fscanf(file, "Name: %s, Age: %d, Height: %f\n", name, &age, &height); // 格式化读取
    printf("读取内容 - 姓名: %s, 年龄: %d, 身高: %.2f\n", name, age, height);
    fclose(file);

    return 0;
}

// ---------------------------------------------

#include <stdio.h>
#include <stdlib.h>

int main()
{
    // 示例11：检查文件末尾（feof）
    printf("示例11：检查文件末尾（feof）\n");
    FILE *file = fopen("example10.txt", "r"); // 以只读模式打开文件
    if (file == NULL)
    {
        printf("文件打开失败\n");
        return 1;
    }
    while (!feof(file))
    { // 检查文件是否到达末尾
        char ch = fgetc(file);
        if (ch != EOF)
        {
            putchar(ch);
        }
    }
    fclose(file);

    // 示例12：文件错误检测（ferror 和 clearerr）
    printf("\n示例12：文件错误检测（ferror 和 clearerr）\n");
    file = fopen("example10.txt", "r");
    if (file == NULL)
    {
        printf("文件打开失败\n");
        return 1;
    }
    int ch = fgetc(file); // 尝试读取文件
    if (ferror(file))
    { // 检查是否发生错误
        printf("文件读取时发生错误\n");
    }
    else
    {
        printf("文件读取成功，字符: %c\n", ch);
    }
    clearerr(file); // 清除文件的错误标记
    fclose(file);

    // 示例13：多文件操作
    printf("\n示例13：多文件操作\n");
    FILE *file1 = fopen("file1.txt", "w");
    FILE *file2 = fopen("file2.txt", "w");
    if (file1 == NULL || file2 == NULL)
    {
        printf("文件打开失败\n");
        return 1;
    }
    fprintf(file1, "这是第一个文件的内容\n");
    fprintf(file2, "这是第二个文件的内容\n");
    fclose(file1);
    fclose(file2);
    printf("两个文件已成功写入\n");

    // 示例14：文件随机访问（fseek 和 rewind）
    printf("\n示例14：文件随机访问（fseek 和 rewind）\n");
    file = fopen("example10.txt", "r");
    if (file == NULL)
    {
        printf("文件打开失败\n");
        return 1;
    }
    fseek(file, 10, SEEK_SET); // 从文件开头偏移10字节
    printf("文件指针偏移10字节后读取内容: ");
    while (fgets(buffer, sizeof(buffer), file) != NULL)
    {
        printf("%s", buffer);
    }
    rewind(file); // 将文件指针重置到文件开头
    printf("\n重置文件指针后再次读取内容: ");
    while (fgets(buffer, sizeof(buffer), file) != NULL)
    {
        printf("%s", buffer);
    }
    fclose(file);

    // 示例15：文件的二进制追加模式（"ab"）
    printf("\n示例15：文件的二进制追加模式（\"ab\"）\n");
    int additional_numbers[] = {60, 70, 80};
    file = fopen("example4.bin", "ab"); // 打开文件进行二进制追加
    if (file == NULL)
    {
        printf("文件打开失败\n");
        return 1;
    }
    fwrite(additional_numbers, sizeof(int), 3, file); // 追加整数到二进制文件
    fclose(file);

    // 示例16：临时文件操作（tmpfile）
    printf("\n示例16：临时文件操作（tmpfile）\n");
    FILE *temp_file = tmpfile(); // 创建临时文件
    if (temp_file == NULL)
    {
        printf("创建临时文件失败\n");
        return 1;
    }
    fprintf(temp_file, "这是一个临时文件\n");
    rewind(temp_file); // 重置文件指针
    while (fgets(buffer, sizeof(buffer), temp_file) != NULL)
    {
        printf("%s", buffer); // 输出临时文件内容
    }
    fclose(temp_file); // 临时文件在关闭时自动删除

    // 示例17：文件的逐块读取（大文件处理）
    printf("\n示例17：文件的逐块读取（大文件处理）\n");
    file = fopen("example_large.txt", "r");
    if (file == NULL)
    {
        printf("文件打开失败\n");
        return 1;
    }
    char large_buffer[256];
    while (fgets(large_buffer, sizeof(large_buffer), file) != NULL)
    {
        printf("%s", large_buffer); // 逐块读取文件，适合大文件处理
    }
    fclose(file);

    // 示例18：读取和写入文件中指定位置
    printf("\n示例18：读取和写入文件中指定位置\n");
    file = fopen("example10.txt", "r+"); // 打开文件进行读写
    if (file == NULL)
    {
        printf("文件打开失败\n");
        return 1;
    }
    fseek(file, 5, SEEK_SET); // 将指针移动到第5个字节位置
    fprintf(file, "Updated"); // 从当前位置开始写入
    fclose(file);

    // 示例19：二进制文件读写自定义结构体
    printf("\n示例19：二进制文件读写自定义结构体\n");
    typedef struct
    {
        char name[20];
        int age;
        float height;
    } Person;

    Person people[] = {{"Alice", 25, 5.9}, {"Bob", 30, 6.0}};
    file = fopen("people.bin", "wb"); // 写入结构体到二进制文件
    if (file == NULL)
    {
        printf("文件打开失败\n");
        return 1;
    }
    fwrite(people, sizeof(Person), 2, file); // 写入结构体数组
    fclose(file);

    file = fopen("people.bin", "rb"); // 读取二进制文件中的结构体
    if (file == NULL)
    {
        printf("文件打开失败\n");
        return 1;
    }
    Person read_people[2];
    fread(read_people, sizeof(Person), 2, file);
    for (int i = 0; i < 2; i++)
    {
        printf("姓名: %s, 年龄: %d, 身高: %.1f\n", read_people[i].name, read_people[i].age, read_people[i].height);
    }
    fclose(file);

    // 示例20：文件缓冲控制（setvbuf）
    printf("\n示例20：文件缓冲控制（setvbuf）\n");
    file = fopen("example1.txt", "w");
    if (file == NULL)
    {
        printf("文件打开失败\n");
        return 1;
    }
    char buf[BUFSIZ];
    setvbuf(file, buf, _IOFBF, BUFSIZ); // 设置全缓冲模式
    fprintf(file, "这是一条缓冲写入的测试\n");
    fclose(file); // 关闭文件时，缓冲区内容会写入到文件中

    return 0;
}
