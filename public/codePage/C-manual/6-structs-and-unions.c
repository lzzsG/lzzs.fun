#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main()
{
    // 示例1：结构体的定义与初始化
    printf("示例1：结构体的定义与初始化\n");
    struct Person
    {
        char name[50];
        int age;
        float height;
    };

    struct Person person1 = {"Alice", 25, 5.9}; // 初始化结构体
    printf("姓名: %s, 年龄: %d, 身高: %.1f\n", person1.name, person1.age, person1.height);

    // 示例2：结构体数组
    printf("\n示例2：结构体数组\n");
    struct Person people[3] = {
        {"Bob", 30, 6.0},
        {"Charlie", 28, 5.8},
        {"David", 35, 6.2}};
    for (int i = 0; i < 3; i++)
    {
        printf("姓名: %s, 年龄: %d, 身高: %.1f\n", people[i].name, people[i].age, people[i].height);
    }

    // 示例3：嵌套结构体
    printf("\n示例3：嵌套结构体\n");
    struct Address
    {
        char city[50];
        char street[50];
        int houseNumber;
    };

    struct Employee
    {
        char name[50];
        struct Address address;
    };

    struct Employee emp = {"Eve", {"New York", "5th Avenue", 101}};
    printf("姓名: %s, 城市: %s, 街道: %s, 门牌号: %d\n", emp.name, emp.address.city, emp.address.street, emp.address.houseNumber);

    // 示例4：结构体指针
    printf("\n示例4：结构体指针\n");
    struct Person *person_ptr = &person1; // 指向结构体的指针
    printf("通过指针访问姓名: %s, 年龄: %d, 身高: %.1f\n", person_ptr->name, person_ptr->age, person_ptr->height);

    // 示例5：动态分配结构体
    printf("\n示例5：动态分配结构体\n");
    struct Person *dynamic_person = (struct Person *)malloc(sizeof(struct Person)); // 动态分配结构体
    if (dynamic_person == NULL)
    {
        printf("内存分配失败\n");
        return 1;
    }
    strcpy(dynamic_person->name, "Frank");
    dynamic_person->age = 40;
    dynamic_person->height = 6.1;
    printf("姓名: %s, 年龄: %d, 身高: %.1f\n", dynamic_person->name, dynamic_person->age, dynamic_person->height);
    free(dynamic_person); // 释放内存

    // 示例6：结构体与函数
    printf("\n示例6：结构体与函数\n");
    void printPerson(struct Person p)
    {
        printf("姓名: %s, 年龄: %d, 身高: %.1f\n", p.name, p.age, p.height);
    }
    printPerson(person1); // 通过函数传递结构体

    // 示例7：联合体的定义与初始化
    printf("\n示例7：联合体的定义与初始化\n");
    union Data
    {
        int i;
        float f;
        char str[20];
    };

    union Data data;
    data.i = 10;
    printf("整数值: %d\n", data.i);
    data.f = 220.5;
    printf("浮点值: %.2f\n", data.f);
    strcpy(data.str, "Hello");
    printf("字符串值: %s\n", data.str);

    // 示例8：结构体与联合体在内存中的关系
    printf("\n示例8：结构体与联合体在内存中的关系\n");
    struct ExampleStruct
    {
        int num;
        float val;
    };

    union ExampleUnion
    {
        int num;
        float val;
    };

    struct ExampleStruct exampleStruct;
    union ExampleUnion exampleUnion;

    printf("结构体大小: %lu 字节\n", sizeof(exampleStruct));
    printf("联合体大小: %lu 字节\n", sizeof(exampleUnion));

    // 示例9：位域在结构体中的使用
    printf("\n示例9：位域在结构体中的使用\n");
    struct BitField
    {
        unsigned int a : 4; // 4位
        unsigned int b : 4; // 4位
    };

    struct BitField bf;
    bf.a = 5;
    bf.b = 10;
    printf("位域 a: %u, 位域 b: %u\n", bf.a, bf.b);

    // 示例10：匿名结构体与联合体
    printf("\n示例10：匿名结构体与联合体\n");
    struct
    {
        int id;
        union
        {
            int age;
            float salary;
        };
    } anonymous;

    anonymous.id = 101;
    anonymous.age = 30; // 匿名联合体的成员可以直接访问
    printf("匿名结构体 ID: %d, 年龄: %d\n", anonymous.id, anonymous.age);

    return 0;
}

// --------------------------------------

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
    // 示例11：结构体类型别名（typedef）
    printf("示例11：结构体类型别名（typedef）\n");
    typedef struct
    {
        char make[20];
        char model[20];
        int year;
    } Car;

    Car car1 = {"Toyota", "Corolla", 2018};
    Car car2 = {"Ford", "Focus", 2020};
    printf("汽车1: %s %s, %d\n", car1.make, car1.model, car1.year);
    printf("汽车2: %s %s, %d\n", car2.make, car2.model, car2.year);

    // 示例12：结构体中的枚举类型
    printf("\n示例12：结构体中的枚举类型\n");
    typedef enum
    {
        RED,
        GREEN,
        BLUE
    } Color;

    typedef struct
    {
        char name[20];
        Color favoriteColor;
    } PersonWithColor;

    PersonWithColor p1 = {"Alice", BLUE};
    PersonWithColor p2 = {"Bob", GREEN};
    printf("姓名: %s, 喜爱的颜色编号: %d\n", p1.name, p1.favoriteColor);
    printf("姓名: %s, 喜爱的颜色编号: %d\n", p2.name, p2.favoriteColor);

    // 示例13：联合体与结构体结合
    printf("\n示例13：联合体与结构体结合\n");
    typedef union
    {
        int int_val;
        float float_val;
        char str[20];
    } MixedData;

    typedef struct
    {
        char name[20];
        MixedData data;
    } DataContainer;

    DataContainer container;
    strcpy(container.name, "Container1");
    container.data.int_val = 42;
    printf("容器名称: %s, 数据值: %d\n", container.name, container.data.int_val);

    strcpy(container.data.str, "Hello, Union");
    printf("容器名称: %s, 数据字符串: %s\n", container.name, container.data.str);

    // 示例14：结构体中的自引用（链表节点）
    printf("\n示例14：结构体中的自引用（链表节点）\n");
    typedef struct Node
    {
        int data;
        struct Node *next;
    } Node;

    Node node1 = {10, NULL};
    Node node2 = {20, NULL};
    node1.next = &node2; // node1 指向 node2

    printf("节点1的数据: %d, 节点2的数据: %d\n", node1.data, node1.next->data);

    // 示例15：结构体指针与内存管理（链表）
    printf("\n示例15：结构体指针与内存管理（链表）\n");
    Node *head = (Node *)malloc(sizeof(Node)); // 创建链表头节点
    head->data = 100;
    head->next = (Node *)malloc(sizeof(Node)); // 创建第二个节点
    head->next->data = 200;
    head->next->next = NULL; // 链表结束

    printf("链表头节点的数据: %d, 下一个节点的数据: %d\n", head->data, head->next->data);

    // 释放内存
    free(head->next);
    free(head);

    // 示例16：联合体与结构体内存占用对比
    printf("\n示例16：联合体与结构体内存占用对比\n");
    typedef struct
    {
        int a;
        float b;
        char c[20];
    } StructExample;

    typedef union
    {
        int a;
        float b;
        char c[20];
    } UnionExample;

    printf("结构体大小: %lu 字节\n", sizeof(StructExample));
    printf("联合体大小: %lu 字节\n", sizeof(UnionExample));

    // 示例17：结构体的按值传递与按引用传递
    printf("\n示例17：结构体的按值传递与按引用传递\n");
    void modifyStructByValue(Car c)
    {
        c.year = 2025; // 只在函数内修改
    }

    void modifyStructByReference(Car * c)
    {
        c->year = 2025; // 修改原结构体
    }

    Car car3 = {"Honda", "Civic", 2022};
    printf("按值传递前: %d\n", car3.year);
    modifyStructByValue(car3); // 按值传递，函数内修改不会影响外部
    printf("按值传递后: %d\n", car3.year);

    printf("按引用传递前: %d\n", car3.year);
    modifyStructByReference(&car3); // 按引用传递，修改会影响外部
    printf("按引用传递后: %d\n", car3.year);

    // 示例18：结构体与文件操作
    printf("\n示例18：结构体与文件操作\n");
    FILE *file = fopen("person.dat", "wb"); // 打开文件写入
    if (file != NULL)
    {
        fwrite(&car3, sizeof(Car), 1, file); // 将结构体写入文件
        fclose(file);
    }

    Car car4;
    file = fopen("person.dat", "rb"); // 打开文件读取
    if (file != NULL)
    {
        fread(&car4, sizeof(Car), 1, file); // 从文件读取结构体
        fclose(file);
        printf("从文件读取的汽车: %s %s, %d\n", car4.make, car4.model, car4.year);
    }

    // 示例19：联合体在结构体中的嵌套使用
    printf("\n示例19：联合体在结构体中的嵌套使用\n");
    typedef struct
    {
        int id;
        union
        {
            int age;
            float salary;
        } info;
    } EmployeeWithUnion;

    EmployeeWithUnion emp1;
    emp1.id = 101;
    emp1.info.age = 25; // 使用年龄
    printf("员工 ID: %d, 年龄: %d\n", emp1.id, emp1.info.age);

    emp1.info.salary = 50000.50; // 改用工资
    printf("员工 ID: %d, 工资: %.2f\n", emp1.id, emp1.info.salary);

    // 示例20：结构体与联合体中的内存对齐
    printf("\n示例20：结构体与联合体中的内存对齐\n");
    struct AlignedStruct
    {
        char a;
        int b;
        double c;
    };

    printf("结构体 AlignedStruct 大小（内存对齐）：%lu 字节\n", sizeof(struct AlignedStruct));

    return 0;
}
