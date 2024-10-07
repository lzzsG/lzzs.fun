### 示例1：简单的函数定义与调用

**函数定义**：
`greet` 函数是一个简单的无参数、无返回值函数，用于打印一条欢迎消息。该函数通过 `printf` 输出消息，并且不返回任何值。

```c
void greet()
{
    printf("Hello, C code examples manual!\n");
}
```

**函数调用**：
在 `main` 函数中，直接调用 `greet()` 来执行它。

```c
greet();
```

**解释**：

- 该函数没有参数，所以调用时不需要传递任何数据。
- 没有返回值，函数体内只有一条 `printf` 语句，用于打印消息。

**输出示例**：

```
Hello, C code examples manual!
```

### 示例2：带参数的函数定义与调用

**函数定义**：
`add` 函数接收两个整数作为参数，返回它们的和。函数通过 `return` 返回结果，供调用者使用。

```c
int add(int a, int b)
{
    return a + b;
}
```

**函数调用**：
在 `main` 函数中调用 `add(5, 10)` 来传递两个整数参数，并接收返回值。

```c
int sum = add(5, 10);
printf("5 + 10 = %d\n", sum);
```

**解释**：

- 函数接收两个整数 `a` 和 `b`，返回 `a + b`。
- 函数调用时传递两个整数 5 和 10，返回值赋给变量 `sum`，然后打印出来。

**输出示例**：

```
5 + 10 = 15
```

### 示例3：带返回值的函数定义与调用

**函数定义**：
`divide` 函数执行除法操作，并返回结果。如果除数为0，函数会打印错误消息，并返回0，以避免程序崩溃。

```c
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
```

**函数调用**：
在 `main` 函数中，调用 `divide(10, 2)`，将10除以2，并打印结果。

```c
float result = divide(10, 2);
printf("10 / 2 = %.2f\n", result);
```

**解释**：

- 函数接收两个整数 `a` 和 `b`，检查 `b` 是否为0。如果 `b == 0`，打印错误并返回0；否则返回 `a / b`。
- 调用 `divide(10, 2)` 返回 5.00，结果赋给变量 `result`，并通过 `printf` 打印。

**输出示例**：

```
10 / 2 = 5.00
```

### 示例4：递归函数 - 计算阶乘

**函数定义**：
`factorial` 是一个递归函数，用于计算给定整数 `n` 的阶乘。阶乘是通过递归调用自身来完成的。

```c
int factorial(int n)
{
    if (n == 0)
        return 1;
    return n * factorial(n - 1);
}
```

**函数调用**：
在 `main` 函数中调用 `factorial(5)` 来计算 5 的阶乘。

```c
int fact = factorial(5);
printf("5! = %d\n", fact);
```

**解释**：

- 当 `n == 0` 时，返回1（0! = 1）。否则，返回 `n * factorial(n - 1)`，即通过递归计算 `n` 的阶乘。
- 调用 `factorial(5)` 递归计算 5!，即 5 *4* 3 *2* 1 = 120。

**输出示例**：

```
5! = 120
```

### 示例5：传值调用

**函数定义**：
`modify_value` 函数接收一个整数参数 `x`，并将其修改为100。但由于C语言中默认是传值调用，因此这种修改只在函数内部生效，不会影响外部变量。

```c
void modify_value(int x)
{
    x = 100; // 修改的是 x 的副本
}
```

**函数调用**：
在 `main` 函数中调用 `modify_value(x)`，并检查调用前后 `x` 的值是否发生变化。

```c
int x = 5;
printf("Before modification: %d\n", x);
modify_value(x);
printf("After modification: %d\n", x);
```

**解释**：

- `modify_value` 修改的是 `x` 的副本，而不是原始变量。所以在函数外部，变量 `x` 的值保持不变。
- 在 `main` 中，调用 `modify_value(5)` 修改 `x`，但修改只在函数内部生效。

**输出示例**：

```
Before modification: 5
After modification: 5
```

### 示例6：传指针调用

**函数定义**：
`modify_value_by_reference` 函数使用指针参数，传递的是变量的地址。通过解引用指针，可以直接修改指向的变量值，从而影响到传入的原始变量。

```c
void modify_value_by_reference(int *x)
{
    *x = 100; // 通过解引用修改指针指向的值
}
```

**函数调用**：
在 `main` 函数中调用 `modify_value_by_reference`，并传递变量 `y` 的地址。调用后，`y` 的值会被修改。

```c
int y = 5;
printf("Before modification: %d\n", y);
modify_value_by_reference(&y);
printf("After modification: %d\n", y);
```

**解释**：

- `modify_value_by_reference` 函数接收一个指向 `int` 类型的指针 `*x`。通过 `*x`（解引用），可以直接访问并修改传入的变量值。
- 在 `main` 中，传递的是变量 `y` 的地址 `&y`，函数内通过解引用修改原始变量 `y` 的值。

**输出示例**：

```
Before modification: 5
After modification: 100
```

- **使用场景**：传指针调用用于在函数内直接修改传入变量的值，常用于需要改变函数外部变量的场合，比如数组修改、复杂结构体修改等。

### 示例7：全局变量

**函数定义**：
全局变量 `global_var` 定义在所有函数之外，函数 `show_global_var` 和 `modify_global_var` 分别用于显示和修改全局变量的值。全局变量可以在多个函数中共享和修改。

```c
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
```

**函数调用**：
在 `main` 函数中，依次调用 `show_global_var`、`modify_global_var` 和 `show_global_var`，以展示全局变量的修改。

```c
show_global_var();
modify_global_var();
show_global_var();
```

**解释**：

- `global_var` 是一个全局变量，所有函数都可以访问它。`show_global_var` 打印它的当前值，而 `modify_global_var` 修改它的值。
- 修改后的全局变量在其他函数中依然保持修改后的状态。

**输出示例**：

```
Global variable: 10
Global variable after modification: 20
Global variable: 20
```

- **使用场景**：全局变量适合在多个函数中共享数据，但要谨慎使用，避免难以追踪的修改影响程序逻辑。

### 示例8：局部变量

**函数定义**：
`local_scope_example` 函数展示了局部变量的使用。局部变量只在函数内部可见，在函数执行完毕后被销毁。

```c
void local_scope_example()
{
    int local_var = 5; // 局部变量
    printf("Local variable: %d\n", local_var);
}
```

**函数调用**：
在 `main` 函数中调用 `local_scope_example`，演示局部变量的使用范围。

```c
local_scope_example();
```

**解释**：

- `local_var` 是一个局部变量，只在 `local_scope_example` 函数中存在。函数外无法访问这个变量。
- 函数执行结束后，`local_var` 被销毁，其他函数无法引用。

**输出示例**：

```
Local variable: 5
```

- **使用场景**：局部变量适合在函数内使用临时数据，不会影响全局状态，保证了函数的独立性和可控性。

### 示例9：静态局部变量

**函数定义**：
`static_local_scope_example` 展示了静态局部变量的使用。静态局部变量只初始化一次，且其值在函数调用结束后依然保留。

```c
void static_local_scope_example()
{
    static int static_local_var = 5; // 静态局部变量，只初始化一次
    printf("Static local variable: %d\n", static_local_var);
    static_local_var++; // 每次调用后递增
}
```

**函数调用**：
在 `main` 函数中多次调用 `static_local_scope_example`，以观察静态局部变量的行为。

```c
static_local_scope_example();
static_local_scope_example();
static_local_scope_example();
```

**解释**：

- 静态局部变量 `static_local_var` 在第一次调用时被初始化为 5，以后调用时不会重新初始化，其值会保持并递增。
- 静态局部变量的生命周期贯穿整个程序运行，但作用域仅限于定义它的函数内部。

**输出示例**：

```
Static local variable: 5
Static local variable: 6
Static local variable: 7
```

- **使用场景**：静态局部变量常用于需要在多次函数调用之间共享状态的情况。

### 示例10：函数原型

**函数定义**：
`multiply` 函数用于计算两个浮点数的乘积。函数原型先声明了该函数，表明函数返回值类型为 `float`，并接收两个 `float` 类型的参数。

```c
float multiply(float a, float b); // 函数原型声明

float multiply(float a, float b)
{
    return a * b;
}
```

**函数调用**：
在 `main` 函数中调用 `multiply(2.5, 4.0)`，并打印返回的结果。

```c
float product = multiply(2.5, 4.0);
printf("2.5 * 4.0 = %.2f\n", product);
```

**解释**：

- `multiply` 函数用于乘法运算。函数原型提前声明，确保在 `main` 函数中可以调用，即使函数定义位于后面。
- `multiply(2.5, 4.0)` 返回结果 10.00，并通过 `printf` 打印。

**输出示例**：

```
2.5 * 4.0 = 10.00
```

- **使用场景**：函数原型声明在函数使用之前，可以提前声明函数接口，保证函数可以在任意位置调用。它在大规模程序中非常有用，确保函数可以互相调用。

### 示例11：多个返回值 - 使用指针返回多个值

**函数定义**：
`get_min_max` 函数用于从数组中找出最小值和最大值。因为 C 函数一次只能返回一个值，这里使用了指针参数 `*min` 和 `*max`，通过指针返回多个值。

```c
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
```

**函数调用**：
在 `main` 函数中，调用 `get_min_max` 来获取数组的最小值和最大值。

```c
int arr[] = {5, 3, 8, 1, 9};
int min, max;
get_min_max(arr, 5, &min, &max);
printf("Min: %d, Max: %d\n", min, max);
```

**解释**：

- 通过传递指针参数，可以在函数内部修改外部变量的值。
- 使用循环遍历数组，将最小值和最大值分别赋给 `*min` 和 `*max`。

**输出示例**：

```
Min: 1, Max: 9
```

### 示例12：函数指针作为参数

**函数定义**：
`perform_operation` 函数接收一个函数指针作为参数，该指针指向一个操作函数（如 `add` 或 `subtract`）。函数根据传入的操作函数执行计算。

```c
void perform_operation(int a, int b, int (*operation)(int, int))
{
    int result = operation(a, b);
    printf("Result: %d\n", result);
}
```

**函数调用**：
在 `main` 函数中，调用 `perform_operation`，分别传递 `add` 和 `subtract` 函数指针。

```c
perform_operation(10, 5, add);
perform_operation(10, 5, subtract);
```

**解释**：

- 函数指针作为参数允许程序在运行时选择具体执行的函数。
- 调用 `perform_operation(10, 5, add)` 将执行加法操作，调用 `perform_operation(10, 5, subtract)` 则执行减法操作。

**输出示例**：

```
Result: 15
Result: 5
```

### 示例13：变量隐藏（局部变量与全局变量同名）

**函数定义**：
这个示例展示了局部变量隐藏全局变量的情况。在 `hidden_global_var` 函数中，局部变量 `global_var` 屏蔽了同名的全局变量。

```c
int global_var = 10; // 全局变量

void show_global_var()
{
    printf("Global variable: %d\n", global_var);
}

void hidden_global_var()
{
    int global_var = 20; // 局部变量, 隐藏全局变量
    printf("Local variable: %d\n", global_var);
}
```

**函数调用**：
在 `main` 函数中，先调用 `show_global_var` 显示全局变量，再调用 `hidden_global_var` 显示局部变量，并且在局部作用域外再次显示全局变量。

```c
show_global_var();
hidden_global_var();
printf("Global variable after hiding: %d\n", global_var);
```

**解释**：

- 在 `hidden_global_var` 中，局部变量 `global_var` 屏蔽了同名的全局变量，但只在该函数内部有效。
- 函数结束后，程序恢复对全局变量的访问。

**输出示例**：

```
Global variable: 10
Local variable: 20
Global variable after hiding: 10
```

### 示例14：内联函数（C99 引入，建议用于小型、频繁调用的函数）

**函数定义**：
`inline` 关键字用于定义内联函数，适合小型且频繁调用的函数。内联函数通过展开函数代码而不是通过函数调用来提高效率。

```c
inline int sqare(int x)
{
    return x * x;
}
```

**函数调用**：
在 `main` 函数中调用 `sqare(5)` 计算5的平方。

```c
printf("Square of 5: %d\n", sqare(5));
```

**解释**：

- 内联函数 `sqare` 将计算 `x * x`。在编译时，编译器会将函数调用展开为代码，以减少函数调用的开销。
- 适合频繁调用的小型函数，如计算平方。

**输出示例**：

```
Square of 5: 25
```

### 示例15：递归函数 - 斐波那契数列

**函数定义**：
`fibonacci` 函数使用递归方法计算斐波那契数列的第 `n` 项。斐波那契数列定义为：`F(0) = 0`，`F(1) = 1`，从 `F(2)` 开始，每一项是前两项的和。

```c
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
```

**函数调用**：
在 `main` 函数中，使用 `fibonacci(i)` 计算前 10 项的斐波那契数列，并输出结果。

```c
for (int i = 0; i < 10; i++)
{
    printf("fibonacci(%d) = %d\n", i, fibonacci(i));
}
```

**解释**：

- 斐波那契函数使用递归，每次调用时根据 `n` 的值确定是否递归调用。对于 `n > 1` 的情况，递归调用 `fibonacci(n - 1)` 和 `fibonacci(n - 2)`，并返回它们的和。
- 递归是指函数调用自身的编程方法，适合解决可以被分解为相似子问题的问题。

**输出示例**：

```
fibonacci(0) = 0
fibonacci(1) = 1
fibonacci(2) = 1
fibonacci(3) = 2
fibonacci(4) = 3
fibonacci(5) = 5
fibonacci(6) = 8
fibonacci(7) = 13
fibonacci(8) = 21
fibonacci(9) = 34
```

- **使用场景**：递归方法适合分解问题的场合，比如斐波那契数列、阶乘、树遍历等问题。但要注意递归深度，过深可能导致栈溢出。

### 示例16：函数的可变参数（使用 `stdarg.h`）

**函数定义**：
`sum_of_numbers` 函数使用可变参数来计算不定数量参数的和。C 标准库中的 `stdarg.h` 提供了处理可变参数的机制。

```c
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
```

**函数调用**：
在 `main` 函数中，调用 `sum_of_numbers`，并传递不同数量的参数进行求和。

```c
printf("3个数字的和: %d\n", sum_of_numbers(3, 1, 2, 3));
printf("5个数字的和: %d\n", sum_of_numbers(5, 1, 2, 3, 4, 5));
```

**解释**：

- `sum_of_numbers` 使用 `va_list` 来处理不定数量的参数。通过 `va_start` 初始化参数列表，使用 `va_arg` 获取参数值，最后用 `va_end` 结束处理。
- `count` 参数表示可变参数的数量，其后跟随不定数量的整型参数，函数将这些参数相加并返回结果。

**输出示例**：

```
3个数字的和: 6
5个数字的和: 15
```

- **使用场景**：可变参数函数适合处理参数数量不确定的场景，如 `printf`、`scanf` 这种格式化输出和输入的函数。

### 示例17：作用域中的静态全局变量（仅在当前文件有效）

**函数定义**：
`static_global_var` 是一个静态全局变量，它只能在定义它的文件中访问。静态全局变量的生命周期贯穿程序运行，但作用域仅限于当前文件。

```c
static int static_global_var = 30;

void show_static_global_var()
{
    printf("Static global variable: %d\n", static_global_var);
    static_global_var += 10;
}
```

**函数调用**：
在 `main` 函数中，多次调用 `show_static_global_var`，观察静态全局变量的值在函数之间的变化。

```c
show_static_global_var();
show_static_global_var();
show_static_global_var();
```

**解释**：

- 静态全局变量 `static_global_var` 只能在定义它的文件中访问。它的值在不同的函数调用之间保持，并且每次调用时值都会增加。
- 静态全局变量有助于封装和隐藏数据，防止其他文件中的代码意外修改它。

**输出示例**：

```
Static global variable: 30
Static global variable: 40
Static global variable: 50
```

- **使用场景**：静态全局变量用于限制变量的作用范围，确保变量在整个程序的运行过程中有效，但不被其他文件访问。

### 示例18：嵌套函数调用 - 函数之间的调用关系

**函数定义**：
`function_a` 调用 `function_b`。这种嵌套调用展示了一个函数可以调用另一个函数，形成函数调用链。

```c
void function_b()
{
    printf("Function B\n");
}

void function_a()
{
    printf("Function A, calling function B...\n");
    function_b();
}
```

**函数调用**：
在 `main` 函数中调用 `function_a`，间接调用 `function_b`。

```c
function_a();
```

**解释**：

- `function_a` 中调用了 `function_b`，演示了函数之间的嵌套调用。
- 嵌套函数调用是一种常见的编程模式，用于将复杂的任务分解为多个函数来处理。

**输出示例**：

```
Function A, calling function B...
Function B
```

- **使用场景**：嵌套函数调用可以用于分解复杂的任务，并有助于组织代码，使逻辑更加清晰。

### 示例19：函数指针作为返回值

**函数定义**：
`find_max` 函数通过比较两个整数的指针，返回指向较大值的指针。

```c
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
```

**函数调用**：
在 `main` 函数中调用 `find_max`，并通过返回的指针访问较大值。

```c
int a = 10, b = 20;
int *max_ptr = find_max(&a, &b);
printf("Max: %d\n", *max_ptr);
```

**解释**：

- 函数返回指向较大值的指针，调用时通过解引用 `*max_ptr` 获取该值。
- 使用指针可以直接比较并返回内存地址，适合需要返回多个结果或需要更高灵活性的情况。

**输出示例**：

```
Max: 20
```

### 示例20：嵌套的递归函数 - 汉诺塔问题

**函数定义**：
`hanoi` 函数通过递归解决经典的汉诺塔问题，将 `n` 个盘子从起始杆 `from` 移动到目标杆 `to`，使用辅助杆 `aux`。

```c
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
```

**函数调用**：
在 `main` 函数中，调用 `hanoi(3, 'A', 'C', 'B')`，演示移动三个盘子的过程。

```c
hanoi(3, 'A', 'C', 'B');
```

**解释**：

- 汉诺塔问题通过递归逐步将盘子从一根杆子移动到另一根。递归分为两个步骤：先将 `n-1` 个盘子移到辅助杆，再将第 `n` 个盘子移到目标杆。
- 每个盘子的移动步骤通过递归拆解成多个子步骤。

**输出示例**：

```
Move disk 1 from A to C
Move disk 2 from A to B
Move disk 1 from C to B
Move disk 3 from A to C
Move disk 1 from B to A
Move disk 2 from B to C
Move disk 1 from A to C
```

### 示例21：函数中的静态局部变量的应用（计数器）

**函数定义**：
`count_calls` 函数演示了静态局部变量的使用。静态局部变量只在第一次调用时初始化一次，并在后续的调用中保留其值。

```c
void count_calls()
{
    static int count = 0; // 静态局部变量
    count++;
    printf("This function has been called %d times.\n", count);
}
```

**函数调用**：
在 `main` 函数中多次调用 `count_calls`，查看计数器的值。

```c
count_calls();
count_calls();
count_calls();
```

**解释**：

- 静态局部变量 `count` 在函数间保持其值。它只初始化一次，每次调用时值会递增。
- 静态局部变量的生命周期贯穿程序运行，但作用域仅限于定义它的函数。

**输出示例**：

```
This function has been called 1 times.
This function has been called 2 times.
This function has been called 3 times.
```

### 示例22：通过指针返回局部变量的地址（警告错误示例）

**函数定义**：
`return_local_address` 函数错误地返回了一个局部变量的地址，这在函数返回后会导致未定义行为，因为局部变量的内存空间在函数结束时被释放。

```c
int *return_local_address()
{
    int local_var = 10;
    return &local_var; // 返回局部变量的地址（错误）
}
```

**函数调用**：
在 `main` 函数中调用 `return_local_address` 并尝试访问返回的地址，展示不安全的用法。

```c
int *ptr = return_local_address();
printf("Value at address: %d\n", *ptr); // 可能会导致未定义行为
```

**解释**：

- 函数 `return_local_address` 返回局部变量的地址，这个变量在函数结束后被销毁，其地址空间可能被其他数据覆盖，因此对该地址的访问是危险的。
- 正确的做法是避免返回局部变量的地址，可以使用动态内存分配来解决此问题。

**输出示例**：

```
Value at address: （未定义行为，输出结果不确定）
```

### 示例23：使用动态内存分配返回指针（需要手动释放内存）

**函数定义**：
`create_array` 函数使用动态内存分配创建一个指定大小的整数数组。动态内存分配使用 `malloc`，程序员需要手动释放分配的内存。

```c
int *create_array(int size)
{
    int *arr = (int *)malloc(size * sizeof(int)); // 动态分配内存
    if (arr == NULL)
    {
        printf("Memory allocation failed\n");
        exit(1); // 如果内存分配失败，程序退出
    }
    for (int i = 0; i < size; i++)
    {
        arr[i] = i * 2; // 初始化数组元素
    }
    return arr;
}
```

**函数调用**：
在 `main` 函数中调用 `create_array` 创建一个包含 5 个元素的数组，并输出其内容。最后需要使用 `free` 来释放分配的内存。

```c
int *arr = create_array(5);
for (int i = 0; i < 5; i++)
{
    printf("array[%d] = %d ", i, arr[i]);
}
free(arr); // 释放动态分配的内存
```

**解释**：

- `malloc` 用于动态分配内存。程序员需要根据需要手动分配内存，并在不再需要时手动释放内存，以避免内存泄漏。
- 动态分配的内存不在函数结束时自动释放，必须使用 `free` 来释放。

**输出示例**：

```
array[0] = 0 array[1] = 2 array[2] = 4 array[3] = 6 array[4] = 8
```

### 示例24：全局静态变量与多文件作用域

**概念**：
全局静态变量仅在定义它的文件中可见，限制了它的作用范围，避免了其他文件对它的修改。静态变量通过在声明时使用 `static` 关键字来实现。

**变量声明**：
在示例中，`global_static_var` 是一个全局静态变量，限制了它的作用域为当前文件。通过函数 `show_global_static_var`，可以显示和修改该变量。

```c
static int global_static_var = 100;

void show_global_static_var()
{
    printf("Global static variable: %d\n", global_static_var);
    global_static_var += 10; // 修改静态全局变量
}
```

**函数调用**：
在 `main` 函数中多次调用 `show_global_static_var`，观察全局静态变量的值如何随着每次调用变化。

```c
show_global_static_var();
show_global_static_var();
show_global_static_var();
```

**解释**：

- `static` 关键字将全局变量的作用范围限制在当前文件中，其他文件无法访问该变量。这避免了其他文件中的代码对变量的意外修改。
- 全局静态变量的值在函数调用之间保持并且可以多次修改。

**输出示例**：

```
Global static variable: 100
Global static variable: 110
Global static variable: 120
```

### 示例25：实现类似默认参数的效果

**概念**：
C 语言不支持默认参数，但可以通过函数重载或特殊值来模拟默认参数的行为。

#### 方法1：通过不同的函数名模拟不同参数数量的情况

**函数定义**：
定义两个函数，一个接受两个参数，另一个函数不接受第二个参数，默认为调用第一个函数时使用默认值。

```c
void print_message(char *message, int times)
{
    for (int i = 0; i < times; i++)
    {
        printf("%s\n", message);
    }
}

void print_message_default(char *message)
{
    print_message(message, 1); // 默认输出1次
}
```

**函数调用**：
在 `main` 函数中，可以调用 `print_message_default`，也可以调用 `print_message`，并传递多个参数。

```c
print_message_default("Hello, World!"); // 使用默认参数调用
printf("\n");
print_message("Hello, World!", 3);      // 使用指定参数调用
```

**解释**：

- 通过定义一个带有参数的函数和一个不带参数的函数，可以模拟类似 C++ 默认参数的行为。没有传递次数参数时，将使用默认的 1 次。

**输出示例**：

```
Hello, World!

Hello, World!
Hello, World!
Hello, World!
```

#### 方法2：使用特殊值（如 `-1`）表示未传递的参数

**函数定义**：
使用特殊值（如 `-1`）表示没有传递参数。函数中通过检测特殊值来决定是否使用默认值。

```c
void print_message_special(char *message, int times)
{
    if (times == -1) // 如果传入的参数是-1，表示未传递参数，使用默认值
    {
        times = 1;
    }
    for (int i = 0; i < times; i++)
    {
        printf("%s\n", message);
    }
}
```

**函数调用**：
在 `main` 函数中，调用 `print_message_special`，通过传递 `-1` 实现类似默认参数的行为。

```c
print_message_special("Hello, World!", -1); // 使用默认次数
printf("\n");
print_message_special("Hello, World!", 4);  // 使用指定次数
```

**解释**：

- `-1` 作为特殊值表示未传递参数。通过检测这个特殊值，函数可以决定是否使用默认值。
- 这种方法允许通过一个函数实现类似默认参数的效果。

**输出示例**：

```
Hello, World!

Hello, World!
Hello, World!
Hello, World!
Hello, World!
```
