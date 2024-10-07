### 3. Exercises

在本节中，我们将通过两个练习进一步掌握Rust的核心编程概念。这些练习包括温度转换和斐波那契数列计算，展示了如何处理用户输入、进行数学计算、递归算法、以及使用缓存优化递归运算的效率。

#### 练习 1：相互转换摄氏与华氏温度

本练习的目的是实现摄氏温度（Celsius）与华氏温度（Fahrenheit）之间的相互转换。用户输入一个温度值及其单位，程序根据输入的单位进行相应的转换并输出结果。

**代码分析：**

```rust
use itertools::Itertools;
use std::io;

fn main() {
    println!("Please enter a temperature, end with a C(Celsius) or F(Fahrenheit):");
    println!("Example: 32 C");
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line");
    let input = input.trim();

    let (temp, unit) = input.split_whitespace().collect_tuple().unwrap();
    let temp: f32 = temp.parse().unwrap();
    let unit: char = unit.chars().next().unwrap();

    if unit == 'C' {
        let fahrenheit = (temp * 9.0 / 5.0) + 32.0;
        println!("{} C is {:.2} F", temp, fahrenheit);
    } else if unit == 'F' {
        let celsius = (temp - 32.0) * 5.0 / 9.0;
        println!("{} F is {:.2} C", temp, celsius);
    }
}
```

1. **用户输入**：
   - 程序首先提示用户输入带有温度单位的温度值，例如“32 C”。
   - 使用`io::stdin().read_line()`读取输入并去除多余空白字符。

2. **分割输入**：
   - 使用`split_whitespace()`将输入按空白字符分割为两个部分：温度值和单位。
   - `collect_tuple()` 函数来自`itertools`库，将两个分割后的字符串分别存储到`temp`和`unit`变量中。

3. **转换温度**：
   - `temp`字符串被解析为浮点数`f32`，`unit`字符串的第一个字符被作为温度单位（'C'或'F'）。
   - 程序根据单位进行转换：
     - 如果是摄氏温度`C`，转换为华氏温度`F`：`F = C * 9.0 / 5.0 + 32.0`。
     - 如果是华氏温度`F`，转换为摄氏温度`C`：`C = (F - 32.0) * 5.0 / 9.0`。

4. **输出结果**：
   - 使用`println!`打印出转换后的温度，保留两位小数。

**示例输出**：

```
Please enter a temperature, end with a C(Celsius) or F(Fahrenheit):
Example: 32 C
32 C is 89.60 F
```

#### 练习 2：生成第 n 个斐波那契数

斐波那契数列是一个著名的递归数列，定义为：

- `F(0) = 0, F(1) = 1`
- `F(n) = F(n-1) + F(n-2)`, 对于`n >= 2`

这个练习要求用户输入一个正整数`n`，并计算斐波那契数列的第`n`个数。

**代码分析：**

```rust
use std::io;

fn main() {
    // 提示用户输入一个数字
    println!("Please enter a number, to calculate the fibonacci sequence up to that number:");

    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line");
    let n: u32 = input
        .trim()
        .parse()
        .expect("Please enter a positive number which less than 30!");

    if n <= 0 || n > 30 {
        println!("Please enter a positive number which less than 30!");
        return;
    }

    let result = calculate_fibonacci_memo(n);

    println!("The result is: {}", result);
}
```

1. **用户输入**：
   - 程序提示用户输入一个整数，读取并解析为`u32`类型。
   - 通过`trim()`去除输入中的多余空格，使用`parse()`将输入字符串解析为数字。
   - 限制用户输入的数字为1到30之间，避免输入过大的数字导致递归过深。

2. **斐波那契函数的递归实现**：

```rust
fn Fibonacci(n: u32) -> u32 {
    if n <= 1 {
        return n;
    } else {
        return Fibonacci(n - 1) + Fibonacci(n - 2);
    }
}
```

- 这个函数通过递归计算斐波那契数列。对于`n <= 1`，返回`n`，否则返回前两个斐波那契数的和。该方法虽然直观，但当`n`较大时会因为重复计算导致性能较差。

3. **带记忆化的斐波那契函数**：

```rust
fn Fibonacci_memory(n: usize, memo: &mut Vec<u32>) -> u32 {
    if n <= 1 {
        return n as u32;
    }
    if memo[n] != 0 {
        println!("hit memo[{n}] is {}", memo[n]);
        return memo[n];
    }
    memo[n] = Fibonacci_memory(n - 1, memo) + Fibonacci_memory(n - 2, memo);

    memo[n]
}

fn calculate_fibonacci_memo(n: u32) -> u32 {
    let mut memo = vec![0; n as usize + 1];
    Fibonacci_memory(n as usize, &mut memo)
}
```

- **记忆化递归**（Memoization）通过存储之前计算的结果避免重复计算。`Fibonacci_memory`函数使用一个`Vec<u32>`来缓存已计算的斐波那契数，显著提升了递归算法的效率。
- `memo[n] != 0` 检查缓存中是否已经存储了第`n`个斐波那契数，如果有则直接返回，避免重新计算。
- `calculate_fibonacci_memo`负责初始化缓存`memo`，并调用`Fibonacci_memory`进行计算。

**示例输出**：

```
Please enter a number, to calculate the fibonacci sequence up to that number:
10
hit memo[2] is 1
hit memo[3] is 2
hit memo[4] is 3
hit memo[5] is 5
hit memo[6] is 8
hit memo[7] is 13
hit memo[8] is 21
hit memo[9] is 34
The result is: 55
```
