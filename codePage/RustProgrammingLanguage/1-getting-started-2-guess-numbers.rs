// 1. 入门指南
// 1.1. 安装
// $ curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
// https://www.rust-lang.org/install.html

// 1.2. Hello, World!
fn main() {
    println!("Hello, World!");
}

// 1.3. Hello, Cargo!
fn main() {
    println!("Hello, Cargo!");
}

/*
$ cargo new hello_cargo
$ cd hello_cargo
$ cargo build
$ ./target/debug/hello_cargo
$ cargo run
$ cargo check
$ cargo clean
$ cargo doc --open
$ cargo test
$ cargo build --release

file:Cargo.toml

[package]
name = "hello_cargo"
version = "0.1.0"
edition = "2021"

# See more keys andtheir definitions at h

[dependencies]
 */

// 2. 写个猜数字游戏
use rand::Rng;
use std::cmp::Ordering;
use std::io;

fn main() {
    println!("Guess the number!");

    let secret_number = rand::thread_rng().gen_range(1..101);

    // println!("The secret number is: {}", secret_number);

    loop {
        // 提示用户输入
        println!("Please input your guess (type 'q' to quit):");

        // 获取用户输入
        let mut guess = String::new();
        io::stdin()
            .read_line(&mut guess)
            .expect("Failed to read line");

        // 使用trim去除换行符和空格
        let guess = guess.trim();

        // 检查输入是否为 "q"
        if guess == "q" {
            println!("Goodbye!");
            return; // 退出程序
        }

        // 尝试将输入解析为 u32
        let guess: u32 = match guess.parse() {
            Ok(num) => num,
            Err(_) => {
                println!("Please type a valid number!");
                continue; // 继续循环，等待用户输入数字
            }
        };

        // 如果输入有效数字，打印出来
        println!("You guessed: {}", guess);

        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too small!"),
            Ordering::Greater => println!("Too big!"),
            Ordering::Equal => {
                println!("You win, Goodbye!");
                break;
            }
        }
    }
}

/*
[package]
edition = "2021"
name = "guessing_game"
version = "0.1.0"

[dependencies]
rand = "0.8.5"
*/

// 3. 常见编程概念

// 3.1. 变量与可变性
// 3.2. 数据类型
// variables
// 定义常量，表示三小时的秒数，类型是无符号32位整型
const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;

use std::io;

fn main() {
    // 定义一个不可变变量x，初始值为5
    let x = 5;

    // 重新定义x，赋值为x加1，即6
    let x = x + 1;

    {
        // 在一个内部作用域中再次重新定义x，赋值为x乘以2，即12
        let x = x * 2;
        // 打印内部作用域中的x值：12
        println!("The value of x in the inner scope is: {}", x);
    }
    // 打印外部作用域中的x值：6（内外作用域的x是不同的变量）
    println!("The value of x is: {}", x);

    // 打印常量THREE_HOURS_IN_SECONDS的值
    println!(
        "The value of the constant THREE_HOURS_IN_SECONDS is: {}",
        THREE_HOURS_IN_SECONDS
    );

    // 定义两个无符号8位整型变量x和y
    let x: u8 = 250;
    let y: u8 = 10;

    // 1. 使用wrapping_add进行加法，溢出时结果会环绕
    let wrapping_result = x.wrapping_add(y);
    println!("Warpping add: {} + {} = {}", x, y, wrapping_result);

    // 2. 使用saturating_add进行加法，溢出时结果饱和在最大值
    let saturating_result = x.saturating_add(y);
    println!("Saturating add: {} + {} = {}", x, y, saturating_result);

    // 3. 使用checked_add进行加法，返回Option类型，溢出时返回None
    match x.checked_add(y) {
        Some(result) => println!("Checked add: {} + {} = {}", x, y, result),
        None => println!("Checked add: Overflow occurred!"),
    }

    // 4. 使用overflowing_add进行加法，返回一个元组，第一个元素是结果，第二个元素表示是否发生溢出
    let (overflowing_result, overflowed) = x.overflowing_add(y);
    println!(
        "Overflowing add: {} + {} = {} (overflowed: {})",
        x, y, overflowing_result, overflowed
    );

    // 浮点数运算示例，f_x默认为f64类型，f_y是f32类型
    let f_x = 1.0; // f64
    let f_y: f32 = 2.0; // f32

    // 浮点数加法
    let sum = f_x + f_y;
    println!("Sum: {} + {} = {}", f_x, f_y, sum);

    // 浮点数减法
    let difference = f_x - f_y;
    println!("Difference: {} - {} = {}", f_x, f_y, difference);

    // 浮点数乘法
    let product = f_x * f_y;
    println!("Product: {} * {} = {}", f_x, f_y, product);

    // 浮点数除法
    let quotient = f_x / f_y;
    println!("Quotient: {} / {} = {}", f_x, f_y, quotient);

    // 浮点数取余
    let remainder = f_x % f_y;
    println!("Remainder: {} % {} = {}", f_x, f_y, remainder);

    // 整数除法，结果会被截断
    let truncated = -5 / 3;

    // 布尔类型示例
    let t = true;
    let f: bool = false;

    // 字符类型示例
    let c = 'c';
    let z: char = 'z';
    let heart_eyed_cat = '😻'; // 使用Unicode字符

    // 元组类型示例，定义一个三元组tup
    let tup: (i32, f64, u8) = (500, 6.4, 1);

    // 解构元组，分别赋值给x, y, z
    let (x, y, z) = tup;
    println!("x: {}, y: {}, z: {}", x, y, z);

    // 通过索引访问元组元素
    let five_hundred = tup.0;
    let six_point_four = tup.1;
    let one = tup.2;

    // 数组类型示例
    let a = [1, 2, 3, 4, 5];

    // 定义月份数组
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    // 访问数组第一个元素
    let first = months[0];

    // 创建一个元素全为3的数组，长度为5
    let a = [3; 5];
    println!("a: {:?}", a); // 使用调试格式打印数组
    let a: [i32; 5] = [1, 2, 3, 4, 5];
    println!("months: {:#?}", months); // 以更易读的格式打印数组

    // 读取用户输入的数组索引
    println!("Please enter an array index of a.");

    let mut index = String::new();

    // 从标准输入读取字符串
    io::stdin()
        .read_line(&mut index)
        .expect("Failed to read line");

    // 将用户输入转换为数字
    let index: usize = match index.trim().parse() {
        Ok(num) => num,
        Err(_) => panic!("Index entered was not a number"),
    };

    // 根据用户输入的索引访问数组元素
    let element = a[index];

    // 打印索引对应的数组元素
    println!("The value of element at index {} is: {}", index, element);
}

// 3.3. 函数
// 3.4. 注释
// functions
// 定义一个函数示例
fn main() {
    // 单行注释示例
    println!("Hello, world!");

    // 调用自定义函数another_function并传递参数3
    another_function(3);

    // 调用函数并传递两个参数
    print_labeled_measurement(5, 'h');

    // 调用返回值为5的函数five
    let x = five();
    println!("The value of five() returned is: {x}");
}

// 定义一个函数，参数为整型x
fn another_function(x: i32) {
    // 打印x的值
    println!("The value of x is: {x}");
}

// 定义一个函数，带有两个参数
fn print_labeled_measurement(value: i32, unit_label: char) {
    // 打印带单位的测量值
    println!("The measurement is: {value}{unit_label}");
}

// 返回整型5的函数
fn five() -> i32 {
    // 返回5
    5
}

// 分支和循环控制流示例
fn main() {
    let number = 7;

    // if-else分支语句，判断number是否小于5
    if number < 5 {
        println!("condition was true");
    } else {
        println!("condition was false");
    }

    // if-else if-else分支语句，判断number是否能被4、3或2整除
    if number % 4 == 0 {
        println!("number is divisible by 4");
    } else if number % 3 == 0 {
        println!("number is divisible by 3");
    } else if number % 2 == 0 {
        println!("number is divisible by 2");
    } else {
        println!("number is not divisible by 4, 3, or 2");
    }

    // 使用条件表达式赋值
    let condition = true;
    let number = if condition { 5 } else { 6 };
    println!("The value of number is: {}", number);

    // 循环语句示例，使用loop关键字
    let mut counter = 0;

    // 无限循环，直到counter等于10时使用break退出
    let over_counter = loop {
        println!("again!");
        counter += 1;
        if counter == 10 {
            break (counter + 1); // break带有返回值
        }
    };
    println!("The value of over_counter is: {}", over_counter);

    let mut count = 0;
    // 嵌套循环，带有标签'counting_up用于外部循环的break跳出
    'counting_up: loop {
        println!("count = {}", count);
        let mut remaining = 10;

        // 内部循环
        loop {
            println!("remaining = {}", remaining);
            if remaining == 9 {
                break; // 结束内部循环
            }
            if count == 2 {
                break 'counting_up; // 结束外部循环
            }
            remaining -= 1;
        }

        count += 1;
    }
    println!("End count = {}", count);

    // while循环示例
    let mut num = 3;

    while num != 0 {
        println!("{}!", num);
        num -= 1;
    }
    println!("LIFTOFF!!!");

    // 使用while循环遍历数组
    let a = [10, 20, 30, 40, 50];
    let mut index = 0;

    while index < 5 {
        println!("The value is: {}", a[index]);
        index += 1;
    }

    // 使用for循环遍历数组
    for element in a {
        println!("The value is: {}", element);
    }

    // 使用for循环和range，倒序打印数字
    for number in (1..=5).rev() {
        println!("{}!", number);
    }
    println!("LIFTOFF!!!");
}
