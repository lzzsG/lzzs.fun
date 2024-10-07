#include <stdio.h>

// 示例1：按位与运算
void bitwise_and_example()
{
    printf("示例1：按位与运算\n");
    int a = 12;         // 二进制：1100
    int b = 10;         // 二进制：1010
    int result = a & b; // 结果：1000（二进制），即 8
    printf("%d & %d = %d\n", a, b, result);
}

// 示例2：按位或运算
void bitwise_or_example()
{
    printf("\n示例2：按位或运算\n");
    int a = 12;         // 二进制：1100
    int b = 10;         // 二进制：1010
    int result = a | b; // 结果：1110（二进制），即 14
    printf("%d | %d = %d\n", a, b, result);
}

// 示例3：按位异或运算
void bitwise_xor_example()
{
    printf("\n示例3：按位异或运算\n");
    int a = 12;         // 二进制：1100
    int b = 10;         // 二进制：1010
    int result = a ^ b; // 结果：0110（二进制），即 6
    printf("%d ^ %d = %d\n", a, b, result);
}

// 示例4：按位取反运算
void bitwise_not_example()
{
    printf("\n示例4：按位取反运算\n");
    int a = 12;                      // 二进制：1100
    int result = ~a;                 // 结果：取反后为二进制的补码形式
    printf("~%d = %d\n", a, result); // 结果依赖于机器的整数位数（例如 32 位）
}

// 示例5：左移运算
void bitwise_left_shift_example()
{
    printf("\n示例5：左移运算\n");
    int a = 3;           // 二进制：0011
    int result = a << 2; // 左移两位，结果：1100（二进制），即 12
    printf("%d << 2 = %d\n", a, result);
}

// 示例6：右移运算
void bitwise_right_shift_example()
{
    printf("\n示例6：右移运算\n");
    int a = 16;          // 二进制：10000
    int result = a >> 2; // 右移两位，结果：00100（二进制），即 4
    printf("%d >> 2 = %d\n", a, result);
}

// 示例7：检查奇偶性（利用位运算）
void check_parity_example()
{
    printf("\n示例7：检查奇偶性（利用位运算）\n");
    int a = 7;
    if (a & 1)
    {
        printf("%d 是奇数\n", a);
    }
    else
    {
        printf("%d 是偶数\n", a);
    }
}

// 示例8：交换两个数（利用位运算）
void swap_using_bitwise_example()
{
    printf("\n示例8：交换两个数（利用位运算）\n");
    int a = 5, b = 9;
    printf("交换前：a = %d, b = %d\n", a, b);
    a = a ^ b;
    b = a ^ b;
    a = a ^ b;
    printf("交换后：a = %d, b = %d\n", a, b);
}

// 示例9：计算二进制中1的个数（汉明重量）
int count_set_bits(int n)
{
    int count = 0;
    while (n)
    {
        count += n & 1;
        n >>= 1;
    }
    return count;
}

void count_set_bits_example()
{
    printf("\n示例9：计算二进制中1的个数\n");
    int a = 29; // 二进制：11101
    int result = count_set_bits(a);
    printf("数字 %d 的二进制表示中有 %d 个 1\n", a, result);
}

// 示例10：获取最低有效位
void get_lowest_set_bit_example()
{
    printf("\n示例10：获取最低有效位\n");
    int a = 18;          // 二进制：10010
    int result = a & -a; // 结果为最低有效位
    printf("数字 %d 的最低有效位是 %d\n", a, result);
}

// 示例11：设置某一位为1
void set_bit_example()
{
    printf("\n示例11：设置某一位为1\n");
    int a = 9;                        // 二进制：1001
    int position = 2;                 // 将第 2 位设置为1
    int result = a | (1 << position); // 结果：1101（二进制），即 13
    printf("数字 %d 设置第 %d 位为1后的结果是 %d\n", a, position, result);
}

// 示例12：清除某一位（设置为0）
void clear_bit_example()
{
    printf("\n示例12：清除某一位（设置为0）\n");
    int a = 15;                        // 二进制：1111
    int position = 1;                  // 清除第 1 位
    int result = a & ~(1 << position); // 结果：1101（二进制），即 13
    printf("数字 %d 清除第 %d 位后的结果是 %d\n", a, position, result);
}

// 示例13：获取两数的异或值（不进位加法）
void xor_example()
{
    printf("\n示例13：获取两数的异或值\n");
    int a = 7, b = 12;
    int result = a ^ b;
    printf("数字 %d 和 %d 的异或结果是 %d\n", a, b, result);
}

// 示例14：简化的模2运算（奇偶判断）
void mod_2_example()
{
    printf("\n示例14：简化的模2运算\n");
    int a = 18;
    int result = a & 1; // 如果最后一位是1，结果为奇数，否则为偶数
    printf("%d mod 2 = %d\n", a, result);
}

// 示例15：位掩码（Bit Masking）
void bit_mask_example()
{
    printf("\n示例15：位掩码\n");
    int num = 29;            // 二进制：11101
    int mask = 0xF;          // 掩码：1111（二进制）
    int result = num & mask; // 掩码后结果：1101（二进制），即 13
    printf("使用掩码 0xF 对数字 %d 进行位掩码后的结果是 %d\n", num, result);
}

int main()
{
    bitwise_and_example();
    bitwise_or_example();
    bitwise_xor_example();
    bitwise_not_example();
    bitwise_left_shift_example();
    bitwise_right_shift_example();
    check_parity_example();
    swap_using_bitwise_example();
    count_set_bits_example();
    get_lowest_set_bit_example();
    set_bit_example();
    clear_bit_example();
    xor_example();
    mod_2_example();
    bit_mask_example();

    return 0;
}

//-----------------------------------------------------------------

#include <stdio.h>

// 示例16：在C中使用RISC-V汇编进行加法运算
void add_riscv_example()
{
    printf("\n示例16：在C中使用RISC-V汇编进行加法运算\n");
    int a = 10, b = 5, result;
    // 内联汇编：使用 RISC-V 汇编指令 add 进行加法运算
    asm("add %0, %1, %2" : "=r"(result) : "r"(a), "r"(b));
    printf("%d + %d = %d (通过 RISC-V 汇编)\n", a, b, result);
}

// 示例17：使用RISC-V汇编实现按位与操作
void bitwise_and_riscv_example()
{
    printf("\n示例17：使用RISC-V汇编实现按位与操作\n");
    int a = 12, b = 10, result;
    // 内联汇编：使用 RISC-V 汇编指令 and 进行按位与运算
    asm("and %0, %1, %2" : "=r"(result) : "r"(a), "r"(b));
    printf("%d & %d = %d (通过 RISC-V 汇编)\n", a, b, result);
}

// 示例18：使用RISC-V汇编进行左移操作
void left_shift_riscv_example()
{
    printf("\n示例18：使用RISC-V汇编进行左移操作\n");
    int a = 5, shift_amount = 2, result;
    // 内联汇编：使用 RISC-V 汇编指令 slli 进行左移
    asm("slli %0, %1, %2" : "=r"(result) : "r"(a), "i"(shift_amount));
    printf("%d << %d = %d (通过 RISC-V 汇编)\n", a, shift_amount, result);
}

// 示例19：RISC-V汇编中的取反操作
void bitwise_not_riscv_example()
{
    printf("\n示例19：RISC-V汇编中的取反操作\n");
    int a = 0x0F, result;
    // 内联汇编：使用 RISC-V 汇编指令 not (通过 xori 反转位)
    asm("xori %0, %1, -1" : "=r"(result) : "r"(a));
    printf("~%d = %d (通过 RISC-V 汇编)\n", a, result);
}

// 示例20：RISC-V汇编中的乘法运算
void mul_riscv_example()
{
    printf("\n示例20：RISC-V汇编中的乘法运算\n");
    int a = 6, b = 7, result;
    // 内联汇编：使用 RISC-V 汇编指令 mul 进行乘法运算
    asm("mul %0, %1, %2" : "=r"(result) : "r"(a), "r"(b));
    printf("%d * %d = %d (通过 RISC-V 汇编)\n", a, b, result);
}

// 示例21：从RISC-V汇编中读取寄存器值
void read_riscv_register_example()
{
    printf("\n示例21：从RISC-V汇编中读取寄存器值\n");
    int result;
    // 内联汇编：从RISC-V x1 寄存器读取值（假设我们设置了某个值）
    asm("mv %0, x1" : "=r"(result)); // 将 x1 的值赋给 result
    printf("RISC-V 寄存器 x1 的值为: %d\n", result);
}

// 示例22：写入RISC-V寄存器
void write_riscv_register_example()
{
    printf("\n示例22：写入RISC-V寄存器\n");
    int value = 42;
    // 内联汇编：将值 42 写入到 RISC-V x1 寄存器
    asm("mv x1, %0" : : "r"(value));
    printf("已将值 %d 写入 RISC-V 寄存器 x1\n", value);
}

// 示例23：RISC-V汇编中的条件判断 (小于判断)
void conditional_riscv_example()
{
    printf("\n示例23：RISC-V汇编中的条件判断\n");
    int a = 5, b = 10, result;
    // 内联汇编：使用 RISC-V 汇编指令 slt 进行小于判断
    asm("slt %0, %1, %2" : "=r"(result) : "r"(a), "r"(b));
    printf("%d < %d 的结果是: %d (通过 RISC-V 汇编)\n", a, b, result);
}

// 示例24：RISC-V汇编中的条件跳转
void jump_riscv_example()
{
    printf("\n示例24：RISC-V汇编中的条件跳转\n");
    int a = 5, b = 5, result;
    // 内联汇编：条件跳转，如果 a 等于 b 则设置 result 为 1
    asm("beq %1, %2, equal_label\n"
        "li %0, 0\n"
        "j end_label\n"
        "equal_label:\n"
        "li %0, 1\n"
        "end_label:"
        : "=r"(result) : "r"(a), "r"(b));
    printf("a == b 的结果是: %d (通过 RISC-V 汇编)\n", result);
}

int main()
{
    add_riscv_example();
    bitwise_and_riscv_example();
    left_shift_riscv_example();
    bitwise_not_riscv_example();
    mul_riscv_example();
    read_riscv_register_example();
    write_riscv_register_example();
    conditional_riscv_example();
    jump_riscv_example();

    return 0;
}

//----------------------------------------------------------------------------
#include <stdio.h>

// 示例25：RISC-V汇编中的寄存器加载操作（寄存器到内存）
void load_register_riscv_example()
{
    printf("\n示例25：RISC-V汇编中的寄存器加载操作\n");
    int result;
    int value = 100;

    // 内联汇编：使用 RISC-V 指令 lw 从内存加载数据到寄存器
    asm("lw %0, 0(%1)" : "=r"(result) : "r"(&value));
    printf("从内存加载的值: %d (通过 RISC-V 汇编)\n", result);
}

// 示例26：RISC-V汇编中的寄存器存储操作（寄存器到内存）
void store_register_riscv_example()
{
    printf("\n示例26：RISC-V汇编中的寄存器存储操作\n");
    int value = 42;
    int memory_location;

    // 内联汇编：使用 RISC-V 指令 sw 将数据从寄存器存储到内存
    asm("sw %1, 0(%0)" : : "r"(&memory_location), "r"(value));
    printf("已将值 %d 存储到内存地址 %p\n", value, (void *)&memory_location);
}

// 示例27：RISC-V汇编中的内存屏障指令（Memory Barrier）
void memory_barrier_riscv_example()
{
    printf("\n示例27：RISC-V汇编中的内存屏障指令\n");

    // 内联汇编：使用 RISC-V 的 fence 指令来实现内存屏障，确保顺序性
    asm volatile("fence");
    printf("执行了内存屏障操作（fence 指令）\n");
}

// 示例28：RISC-V汇编中的位域操作（位掩码和位操作）
void bitfield_riscv_example()
{
    printf("\n示例28：RISC-V汇编中的位域操作\n");
    int value = 0xFF00FF00; // 32位值，部分位为 1

    int mask = 0x00FF0000; // 位掩码
    int result;

    // 内联汇编：使用 and 和 slli 指令进行位域操作
    asm("and %0, %1, %2" : "=r"(result) : "r"(value), "r"(mask));
    printf("应用掩码后结果: 0x%X\n", result);
}

// 示例29：流水线中的 NOP 指令插入（避免数据相关性问题）
void nop_riscv_example()
{
    printf("\n示例29：RISC-V汇编中的 NOP 指令插入\n");

    int a = 10, b = 20, result;

    // 插入 NOP 指令以模拟流水线中的无效操作
    asm("add %0, %1, %2\n"
        "nop\n" // 插入 NOP 指令
        "nop\n" // 插入更多 NOP
        : "=r"(result) : "r"(a), "r"(b));

    printf("加法结果: %d (通过 RISC-V 汇编，插入 NOP)\n", result);
}

// 示例30：条件分支预测中的条件跳转（使用分支指令）
void branch_prediction_riscv_example()
{
    printf("\n示例30：RISC-V汇编中的条件分支跳转\n");
    int a = 5, b = 10, result = 0;

    // 内联汇编：使用 beq 和 bne 实现条件分支
    asm("beq %1, %2, equal\n"
        "li %0, 0\n"
        "j end\n"
        "equal:\n"
        "li %0, 1\n"
        "end:"
        : "=r"(result) : "r"(a), "r"(b));

    printf("条件判断 a == b 的结果是: %d (通过 RISC-V 汇编)\n", result);
}

// 示例31：直接内存访问 (DMA) 模拟
void dma_riscv_example()
{
    printf("\n示例31：RISC-V汇编中的直接内存访问 (DMA) 模拟\n");
    int source[] = {10, 20, 30, 40};
    int destination[4];

    // 内联汇编：模拟 DMA 的内存复制操作
    for (int i = 0; i < 4; i++)
    {
        asm("lw %0, 0(%1)\n"
            "sw %0, 0(%2)\n"
            : "=r"(destination[i]) : "r"(&source[i]), "r"(&destination[i]));
    }

    printf("内存复制完成，目标数组内容: ");
    for (int i = 0; i < 4; i++)
    {
        printf("%d ", destination[i]);
    }
    printf("\n");
}

// 示例32：硬件锁定实现（自旋锁）
void spinlock_riscv_example()
{
    printf("\n示例32：RISC-V汇编中的硬件自旋锁实现\n");
    volatile int lock = 0;

    // 尝试获取自旋锁
    asm volatile(
        "1: li t0, 1\n"             // 尝试设置锁为 1
        "amoswap.w.aq t0, t0, %0\n" // 原子交换，如果锁已经被设置，则自旋等待
        "bnez t0, 1b\n"             // 如果 t0 不为 0，表示锁已被占用，继续自旋
        : "=A"(lock));

    printf("自旋锁已获取\n");

    // 释放锁
    asm volatile("amoswap.w.rl x0, x0, %0" : "=A"(lock));

    printf("自旋锁已释放\n");
}

// 示例33：RISC-V汇编中的内存原子操作 (CAS)
void cas_riscv_example()
{
    printf("\n示例33：RISC-V汇编中的内存原子操作 (CAS)\n");
    int memory_value = 100;
    int expected_value = 100;
    int new_value = 200;

    int result;
    // 使用 RISC-V 原子指令实现 CAS (Compare and Swap)
    asm volatile(
        "lr.w %0, %1\n"      // 加载保留值到 result
        "bne %0, %2, fail\n" // 如果 result != expected_value，跳到失败
        "sc.w t0, %3, %1\n"  // 尝试交换，如果失败 t0 != 0
        "bnez t0, fail\n"    // 如果 t0 非 0，CAS 失败，跳到失败
        "j done\n"
        "fail:\n"
        "li %0, -1\n"
        "done:"
        : "=r"(result), "=A"(memory_value)
        : "r"(expected_value), "r"(new_value)
        : "t0");

    if (result == -1)
    {
        printf("CAS 操作失败，内存值未改变\n");
    }
    else
    {
        printf("CAS 操作成功，内存值已更改为 %d\n", memory_value);
    }
}

int main()
{
    load_register_riscv_example();
    store_register_riscv_example();
    memory_barrier_riscv_example();
    bitfield_riscv_example();
    nop_riscv_example();
    branch_prediction_riscv_example();
    dma_riscv_example();
    spinlock_riscv_example();
    cas_riscv_example();

    return 0;
}
