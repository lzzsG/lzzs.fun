// 4.1. 什么是所有权？

fn main() {
    // 所有权规则
    // 1. Rust 中的每一个值都有一个被称为其所有者（owner）的变量。
    // 2. 值在任一时刻只能有一个所有者。
    // 3. 当所有者（变量）离开作用域，其值会被丢弃。

    // 变量作用域
    {
        // s 在这里无效，它尚未声明
        let s = "hello"; // s 进入作用域
                         // do something with s
    } // s 离开作用域并被丢弃

    // String 类型
    // Rust 中的字符串类型是 String，它是一个可变，堆分配的，UTF-8 编码的字符串
    let mut s = String::from("hello");
    s.push_str(", world!"); // push_str() 在字符串后追加字面值
    println!("{}", s); // 输出 "hello, world!"

    // 内存与分配
    // 移动
    let s1 = String::from("hello");
    let s2 = s1; // s1 被移动到 s2
                 // println!("{}", s1); // 错误！s1 被移动了

    // 克隆
    let s1 = String::from("hello");
    let s2 = s1.clone(); // s1 被克隆到 s2
    println!("s1 = {}, s2 = {}", s1, s2); // 正常
                                          // 因为 String 是一个复杂类型，其值被分配在堆上，所以为了防止内存泄漏，当 String 的所有权从一个变量转移到另一个变量时，第一个变量会变为空，不能再使用。

    // 拷贝
    let x = 5;
    let y = x; // x 被拷贝到 y
    println!("x = {}, y = {}", x, y); // 正常
                                      // 因为 i32 是一个实现了 Copy trait 的类型，当其值被绑定到一个新变量时，其值会被拷贝。这意味着我们可以在创建一个新变量时重用内存。
}

// 所有权与函数
fn main() {
    let s = String::from("hello"); // s 进入作用域

    takes_ownership(s); // s 的值被移动到函数里，
                        // 所以不再有效

    let x = 5; // x 进入作用域

    makes_copy(x); // x 应该移动函数里，但 i32 是 Copy 的，所以它的值被拷贝进函数里，后面x 仍然有效
} // 这里，x 先移出了作用域，然后是 s。但因为 s 的值已被移走，所以不会有特殊操作

fn takes_ownership(some_string: String) {
    // some_string 进入作用域
    println!("{}", some_string);
} // 这里，some_string 移出作用域并调用 `drop` 方法。占用的内存被释放

fn makes_copy(some_integer: i32) {
    // some_integer 进入作用域
    println!("{}", some_integer);
} // 这里，some_integer 移出作用域。没有特殊操作，因为 i32 是 Copy 的。

// 返回值与作用域
fn main() {
    let s1 = gives_ownership(); // gives_ownership 将返回值移动给 s1

    let s2 = String::from("hello"); // s2 进入作用域

    let s3 = takes_and_gives_back(s2); // s2 被移动，s3 获得返回值
} // 这里，s3 移出作用域并被丢弃。s2 也移出作用域，但已被移走，所以什么也不会发生。s1 移出作用域并被丢弃

fn gives_ownership() -> String {
    let some_string = String::from("hello"); // some_string 进入作用域
    some_string // some_string 被移动出函数
}

// takes_and_gives_back 将传入字符串并返回该值
fn takes_and_gives_back(a_string: String) -> String {
    // a_string 进入作用域
    a_string // a_string 被移动出函数
}

// 4.2. 引用与借用

fn main() {
    let s1 = String::from("hello");

    let len = calculate_length(&s1);

    println!("The length of '{}' is {}.", s1, len);
}

//  & 表示引用，引用是一个指向被引用变量的指针，它不会取得变量的所有权，所以当引用离开作用域时，它指向的值不会被丢弃。
fn calculate_length(s: &String) -> usize {
    // s 是 String 的引用
    s.len()
} // 这里，s 离开了作用域。但因为它并不拥有引用值的所有权，所以什么也不会发生

// 与使用 & 引用相反的操作是解引用（Dereferencing），它使用解引用运算符 *。解引用运算符用于获取引用值所指向的值。
// 将创建一个引用的行为称为 借用（borrowing）。

// 可变引用
fn main() {
    let mut s = String::from("hello"); // s 必须是可变的
    let mut s1 = String::from("hello1");

    change(&mut s); // &mut s 是一个可变引用
                    // 如果你有一个对该变量的可变引用，你就不能再创建对该变量的另一个引用。
                    // let r1 = &mut s; // 错误！不能有两个可变引用
                    // let r2 = &s; // 错误！不能可变引用和不可变引用同时存在
                    // 使用大括号来创建一个新的作用域，这样就可以在这作用域的末尾放弃对 s 的引用
    {
        let r1 = &mut s1;
    } // r1 在这里离开了作用域，所以我们完全可以创建一个新引用
    let r2 = &mut s1;
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}

// 悬垂引用
fn main() {
    let reference_to_nothing = dangle();
}

// 错误，因为 dangle 函数返回一个指向 s 的引用，但 s 在 dangle 函数结束时被丢弃了，所以引用指向了无效的内存。
fn dangle() -> &String {
    // 返回一个指向 String 的引用
    let s = String::from("hello"); // s 进入作用域

    &s // 返回字符串 s 的引用
} // 这里，s 离开了作用域并被丢弃。其内存被释放了。
  // 创建了一个悬垂引用，它指向的内存可能已经被分配给其他持有者。
  // 解决方法是直接返回 String，而不是引用。
  // fn dangle() -> String {...}

// 总结
// 所有权是 Rust 最独特的特性，它让 Rust 无需垃圾回收即可防止内存泄漏，并确保内存安全。
// Rust 中的每个值都有一个被称为其 所有者（owner）的变量。
// 值在任一时刻只能有一个所有者。
// 当所有者（变量）离开作用域，值会被丢弃。
// 引用必须总是有效的。
// 借用（Borrowing）允许你引用某些值而不取得其所有权。
// 可变引用和不可变引用不能同时存在。
// 你可以在一个作用域中拥有任意数量的不可变引用，或者一个可变引用，但不能同时拥有两者。

// 4.3. Slice 类型
// 引入：不用 slice，编写一个获取字符串中子字符串的函数。
fn first_word(s: &String) -> usize {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        // iter() 方法创建一个每个元素都是字符串中字节的迭代器，enumerate() 函数返回一个 (索引, 值) 对的元组的迭代器。
        if item == b' ' {
            return i; // 返回第一个空格的索引
        }
    }

    s.len() // 如果没有找到空格，则返回字符串的长度
}

fn main() {
    let mut s = String::from("hello world");

    let word = first_word(&s); // word 的值为 5

    s.clear(); // 这清空了字符串，使其变成 ""

    // word 现在是 5，但它指向的字符串已经被清空了！
    println!("the first word is: {}", word); // 错误
}

// 字符串 slice
fn main() {
    let s = String::from("hello world");

    let hello = &s[..5]; // 字符串 slice, .. 表示从 0 到 5（不包括 5）
                         // hello 是一个部分引用，指向 s 的一个片段
    let world = &s[6..]; // 字符串 slice, .. 表示从 6 到字符串结尾
    let ell = &s[1..4]; // 字符串 slice, .. 表示从 1 到 4（不包括 5）
                        // 索引必须在有效的范围之内，否则程序会 panic。

    let len = s.len(); // 字符串的长度
}

// 重写 first_word 函数，使用字符串 slice
fn first_word(s: &String) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i]; // 返回字符串 slice
        }
    }

    &s[..] // 返回整个字符串的 slice
}

fn main() {
    let mut s = String::from("hello world");

    let word = first_word(&s);

    s.clear(); // 错误！mutable borrow occurs here

    println!("the first word is: {}", word); // immutable borrow later used here
}

// 字符串字面值就是 slice
fn main() {
    let s = "hello world"; // s 是一个字符串 slice

    let my_string = String::from("hello world"); // my_string 是一个 String

    // first_word 中传入一个字符串 slice，而不是整个 String
    let word = first_word(&my_string[..6]); // 现在 word 的类型是 &str
    let word = first_word(&s[0..6]); // s 的类型是 &str

    // `first_word` 也适用于 `String` 的引用, 这等价于整个 `String` 的 slice
    let word = first_word(&my_string); // my_string 的类型是 String，但 &my_string 的类型是 &String，deref coercion 将 &String 转换为 &str

    let word = first_word(s); // s 的类型是 &str

    // 其他类型的 slice
    let a = [1, 2, 3, 4, 5];

    let slice = &a[1..3]; // slice 的类型是 &[i32]

    assert_eq!(slice, &[2, 3]);
}
// 字符串 slice 作为参数, 修改 first_word 函数，使其接收一个字符串 slice 而不是整个 String
// deref coercions 允许我们编写一个接收 String 但实际上只使用其中的 slice 的函数。
fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i]; // 返回字符串 slice
        }
    }

    &s[..] // 返回整个字符串的 slice
}
