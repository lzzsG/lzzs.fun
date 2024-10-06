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
