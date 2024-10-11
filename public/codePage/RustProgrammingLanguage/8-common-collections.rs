// 8. 常见集合
// 集合可以包含多个值，不同于内建的数组和元组类型，这些集合指向的数据是储存在堆上的，这意味着数据的数量不必在编译时就已知，可以随着程序的运行增长或缩小。
// vector、字符串和哈希 map 是 Rust 中最常用的集合类型，它们被包含在标准库中。

// 8.1. 使用 Vector 储存列表
// Vec<T> 也被称为 vector，允许我们在一个单独的数据结构中储存多于一个的值，它在内存中彼此相邻地排列所有的值。vector 只能储存相同类型的值。

// 8.1.1 新建 vector
// 调用 Vec::new 函数
let v: Vec<i32> = Vec::new();
// 这里增加了一个类型注解，因为没有向这个 vector 中插入任何值，Rust 并不知道我们想要储存什么类型的元素。
// vector 是用泛型实现的，它可以存放任何类型，而当 Vec 存放某个特定类型时，那个类型位于尖括号中。

// 可以使用 vec! 宏，这个宏会根据我们提供的值来创建一个新的 vector。
let v = vec![1, 2, 3];
// 因为我们提供了 i32 类型的初始值，Rust 可以推断出 v 的类型是 Vec<i32>，因此类型注解就不是必须的。

// 8.1.2 更新 vector
// 可以使用 push 方法向 vector 增加元素
let mut v = Vec::new();
v.push(5);
v.push(6);
v.push(7);
v.push(8);

// 8.1.3 读取 vector 的元素
// 可以通过索引或使用 get 方法来读取 vector 中的元素
let v = vec![1, 2, 3, 4, 5];

let third: &i32 = &v[2];
println!("The third element is {}", third);

match v.get(2) {
    Some(third) => println!("The third element is {}", third),
    None => println!("There is no third element."),
}

let third: Option<&i32> = v.get(2);
match third {
    Some(third) => println!("The third element is {}", third),
    None => println!("There is no third element."),
}

// 尝试使用现有元素范围之外的索引值
let does_not_exist = v[100]; // 报错，panic!，vector 中没有第 100 个元素
let does_not_exist = v.get(100); // 返回 None


// 不能在相同作用域中同时存在可变和不可变引用
// 当我们获取了 vector 的第一个元素的不可变引用并尝试在 vector 末尾增加一个元素的时候，如果尝试在函数的后面引用这个元素是行不通的
let mut v = vec![1, 2, 3, 4, 5];

let first = &v[0];

v.push(6);

println!("The first element is: {first}");
// 在 vector 的结尾增加新元素时，在没有足够空间将所有元素依次相邻存放的情况下，可能会要求分配新内存并将老的元素拷贝到新的空间中。这时，第一个元素的引用就指向了被释放的内存。借用规则阻止程序陷入这种状况。

// 8.1.4 遍历 vector 的元素
// 可以使用 for 循环来遍历 vector 中的每一个值
// 何使用 for 循环来获取 i32 值的 vector 中的每一个元素的不可变引用并将其打印：
let v = vec![100, 32, 57];
for i in &v {
    println!("{i}");
}
// 遍历可变 vector 的每一个元素的可变引用以便能改变它们:
let mut v = vec![100, 32, 57];
for i in &mut v {
    *i += 50;
}
// 为了修改可变引用所指向的值，在使用 += 运算符之前必须使用解引用运算符（*）获取 i 中的值。

// 8.1.5 使用枚举来储存多种类型
// vector 只能储存相同类型的值，如果想要储存不同类型的值，可以使用枚举，枚举的成员都被定义为相同的枚举类型。
enum SpreadsheetCell {
    Int(i32),
    Float(f64),
    Text(String),
}

let row = vec![ 
    SpreadsheetCell::Int(3),
    SpreadsheetCell::Text(String::from("blue")),
    SpreadsheetCell::Float(10.12),
];
// 如果在编写程序时不能确切无遗地知道运行时会储存进 vector 的所有类型，可以使用标准库中定义的 trait 对象来储存任何类型的值。trait 对象允许我们抽象出不同类型的共同行为，第十七章会讲到它。

// 8.1.6 丢弃 vector 时也会丢弃其所有元素
// 当 vector 超出作用域时，它的元素会自动被丢弃。
{
    let v = vec![1, 2, 3, 4];

    // do stuff with v
} // <- v goes out of scope and is freed here
// 当 vector 超出作用域时，Rust 释放 vector 和其所有元素的内存。

// 8.2. 使用字符串储存 UTF-8 编码的文本
// 字符串是作为字节的集合外加一些方法实现的，当这些字节被解释为文本时，这些方法提供了实用的功能。

// 8.2.1 什么是字符串？
// Rust 的核心语言中只有一种字符串类型：字符串 slice str，它通常以被借用的形式出现，&str。它们是一些对储存在别处的 UTF-8 编码字符串数据的引用。
// 字符串（String）类型由 Rust 标准库提供，而不是编入核心语言，它是一种可增长、可变、可拥有、UTF-8 编码的字符串类型。

// 8.2.2 新建字符串
// 很多 Vec 可用的操作在 String 中同样可用，如使用 new 函数新建一个实例：
let mut s = String::new();
// 通常字符串会有初始数据，可以使用 to_string 方法向s装载数据，它能用于任何实现了 Display trait 的类型，比如字符串字面值。
let data = "initial contents";
let s = data.to_string();

// 该方法也可直接用于字符串字面值：
let s = "initial contents".to_string();

// 也可以使用 String::from 函数来从字符串字面值创建 String。
let s = String::from("initial contents");

// 字符串是 UTF-8 编码的，可以包含任何可以正确编码的数据:
let hello = String::from("السلام عليكم");
let hello = String::from("Dobrý den");
let hello = String::from("Hello");
let hello = String::from("שלום");
let hello = String::from("नमस्ते");
let hello = String::from("こんにちは");
let hello = String::from("안녕하세요");
let hello = String::from("你好");
let hello = String::from("Olá");
let hello = String::from("Здравствуйте");
let hello = String::from("Hola");

// 8.2.3 更新字符串
// 1.使用 push_str 和 push 附加字符串
let mut s = String::from("foo");
s.push_str("bar");

// push_str 方法采用字符串 slice，因为我们并不需要获取参数的所有权。将 s2 的内容附加到 s1 之后还能使用它：
let mut s1 = String::from("foo");
let s2 = "bar";
s1.push_str(s2);
println!("s2 is {s2}");

// push 方法被定义为获取一个单独的字符作为参数，并附加到 String 中。
let mut s = String::from("lo");
s.push('l');

// 2.使用 + 运算符或 format! 宏连接字符串
let s1 = String::from("Hello, ");
let s2 = String::from("world!");
let s3 = s1 + &s2; // 注意 s1 被移动了，不能继续使用
// + 运算符使用了 add 函数，这个函数签名看起来像这样：
fn add(self, s: &str) -> String { ... }
// 只能将 &str 和 String 相加，不能将两个 String 值相加。在 add 调用中使用 &s2 是因为 &String 可以被 强转（coerced）成 &str，通过 Deref 强制转换，第十五章会更深入的讨论 Deref 强制转换。
// 签名中 add 获取了 self 的所有权， s1 的所有权将被移动到 add 调用中，之后就不再有效。

// 想要级联多个字符串，+ 的行为就显得笨重了：
let s1 = String::from("tic");
let s2 = String::from("tac");
let s3 = String::from("toe");

let s = s1 + "-" + &s2 + "-" + &s3;

// 可以使用 format! 宏：
let s1 = String::from("tic");
let s2 = String::from("tac");
let s3 = String::from("toe");

let s = format!("{}-{}-{}", s1, s2, s3);

// 8.2.4 索引字符串
// Rust 的 String 类型没有获取索引的方法，因为 Rust 中的字符串是 UTF-8 编码的，索引并不总是对应一个有效的 Unicode 标量值。
let s1 = String::from("hello");
let h = s1[0]; // 编译错误
// String 是一个 Vec<u8> 的封装。
let hello = String::from("Hola"); 
// 这里 len 的值是 4，这意味着储存字符串 “Hola” 的 Vec 的长度是四个字节
let hello = String::from("Здравствуйте");
// 这里 len 的值是 24，因为每个 Unicode 标量值需要 2 个字节的储存空间。

// 8.2.5 字节、标量值和字形簇
// 用梵文书写的印度语单词 “नमस्ते” 储存在 vector 中的 u8 值看起来像这样：
[224, 164, 168, 224, 164, 174, 224, 164, 184, 224, 165, 141, 224, 164, 164,
224, 165, 135]
// 如果从 Unicode 标量值的角度即 Rust 的 char 类型，这些字节看起来像这样：
['न', 'म', 'स', '्', 'त', 'े']
// 不过第四个和第六个都不是字母，它们是发音符号本身并没有任何意义。如果以字形簇的角度理解，就会得到构成这个单词的四个字母：
["न", "म", "स्", "ते"]

// 另外，索引操作预期总是需要常数时间复杂度 O(1)，但是要确定一个字符边界需要检查这个字符之前的所有字节，所以这个操作是 O(n) 的。

// 8.2.6 字符串 slice
// 可以使用 [] 和一个 range 来创建含特定字节的字符串 slice：
let hello = "Здравствуйте";
let s = &hello[0..4]; // 这些字母都是两个字节长的，所以 s 将是 "Зд"

// 8.2.7 遍历字符串的方法
// 操作字符串每一部分的最好的方法是明确表示需要字符还是字节。
// 对 “Зд” 调用 chars 方法会将其分开并返回两个 char 类型的值
for c in "Зд".chars() {
    println!("{c}");
}
// 会打印出：
З
д
// 对 “Зд” 调用 bytes 方法会返回每个字节的值
for b in "Зд".bytes() {
    println!("{b}");
}
// 会打印出：
208
151
208
180
// 请记住有效的 Unicode 标量值可能会由不止一个字节组成。


// 8.3. 使用 Hash Map 储存键值对
// HashMap<K, V> 类型储存了一个键类型 K 对应一个值类型 V 的映射。
// 它通过一个 哈希函数（hashing function）来实现映射，决定如何将键和值放入内存中。

// 8.3.1 新建一个哈希 map
use std::collections::HashMap;

let mut scores = HashMap::new();

scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);
// 必须首先 use 标准库中集合部分的 HashMap。在这三个常用集合中，HashMap 是最不常用的，所以并没有被 prelude 自动引用。

// 8.3.2 访问哈希 map 中的值
// 使用 get 方法来获取一个键对应的值
use std::collections::HashMap;

let mut scores = HashMap::new();

scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);

let team_name = String::from("Blue");
let score = scores.get(&team_name).copied().unwrap_or(0);
// get 方法返回 Option<&V>，通过调用 copied 方法来获取一个 Option<i32> 而不是 Option<&i32>，unwrap_or 在 scores 中没有该键所对应的项时将其设置为零。

// 遍历哈希 map 中的每一个键值对
for (key, value) in &scores {
    println!("{}: {}", key, value);
}
// 这会以任意顺序打印出每一个键值对：
Yellow: 50
Blue: 10

// 8.3.3 哈希 map 和所有权
// 像 i32 这样的实现了 Copy trait 的类型，其值可以拷贝进哈希 map。像 String 这样拥有所有权的值，其值将被移动而哈希 map 会成为这些值的所有者
use std::collections::HashMap;

let field_name = String::from("Favorite color");
let field_value = String::from("Blue");

let mut map = HashMap::new();
map.insert(field_name, field_value);
// field_name 和 field_value 现在不再有效，如果试图使用它们，编译器将会报错。
// 如果将值的引用插入哈希 map，这些值本身将不会被移动进哈希 map。但是这些引用指向的值必须至少在哈希 map 有效时也是有效的。

// 8.3.4 更新哈希 map
// 每个唯一的键只能同时关联一个值（反之不一定成立
// 1. 覆盖一个值
use std::collections::HashMap;

let mut scores = HashMap::new();

scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Blue"), 25);

println!("{:?}", scores);
// 输出：{"Blue": 25} 原始的值 10 则被覆盖了

// 2. 只在键没有对应值时插入
use std::collections::HashMap;

let mut scores = HashMap::new();
scores.insert(String::from("Blue"), 10);

scores.entry(String::from("Yellow")).or_insert(50);
scores.entry(String::from("Blue")).or_insert(50);

println!("{:?}", scores);
// 输出：{"Yellow": 50, "Blue": 10}，因为键 "Blue" 已经存在，所以它的值没有被更新。
// entry 函数的返回值是一个枚举，Entry，它代表了可能存在也可能不存在的值。使用 entry 方法只在键没有对应一个值时插入
// Entry 的 or_insert 方法在键对应的值存在时就返回这个值的可变引用，如果不存在则将参数作为新值插入并返回新值的可变引用。

// 3. 根据旧值更新一个值
use std::collections::HashMap;

let text = "hello world wonderful world";

let mut map = HashMap::new();

for word in text.split_whitespace() {
    let count = map.entry(word).or_insert(0);
    *count += 1;
}

println!("{:?}", map);
// 输出：{"hello": 1, "world": 2, "wonderful": 1}

// 8.3.5 哈希函数
// HashMap 默认使用一种叫做 SipHash 的哈希函数，它可以抵御涉及哈希表（hash table）1 的拒绝服务（Denial of Service, DoS）攻击。
// 可以指定一个不同的 hasher 来切换为其它函数。hasher 是一个实现了 BuildHasher trait 的类型。第十章会讨论 trait 和如何实现它们。