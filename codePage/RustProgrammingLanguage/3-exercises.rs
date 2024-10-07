// 3. exercises
// 练习1：相互转换摄氏与华氏温度
use itertools::Itertools;
use std::io;

fn main() {
    println!("Please enter a temperature, end with a C(Celsius) or F(Fahrenheit):");
    println!("Example: 32 C");
    let mut input = String::new();
    io::stdin()
        .read_line(&mut input)
        .expect("Failed to read line");
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

/*
[package]
edition = "2021"
name = "trans_F_and_C"
version = "0.1.0"

[dependencies]
itertools = "0.10"
*/

// 练习2：生成第 n 个斐波那契数
use std::io;

fn main() {
    // fibonacci
    println!("Please enter a number, to calculate the fibonacci sequence up to that number:");

    let mut input = String::new();
    io::stdin()
        .read_line(&mut input)
        .expect("Failed to read line");
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

fn Fibonacci(n: u32) -> u32 {
    if n <= 1 {
        return n;
    } else {
        return Fibonacci(n - 1) + Fibonacci(n - 2);
    }
}

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
