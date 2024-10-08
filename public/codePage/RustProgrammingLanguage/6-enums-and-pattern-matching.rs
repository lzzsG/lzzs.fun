// 6. 枚举和模式匹配
// 6.1. 枚举的定义
// 定义枚举来并列可能的成员（variants）
enum IpAddrKind {
    V4,
    V6,
}
// 6.1.1. 枚举值

fn main() {
    let four = IpAddrKind::V4;
    let six = IpAddrKind::V6;

    route(IpAddrKind::V4);
    route(IpAddrKind::V6);

    struct IpAddr {
        kind: IpAddrKind,
        address: String,
    }

    let home = IpAddr {
        kind: IpAddrKind::V4,
        address: String::from("127.0.0.1"),
    };

    let loopback = IpAddr {
        kind: IpAddrKind::V6,
        address: String::from("::1"),
    };

    // 更简洁的方式来表达相同的概念
    enum IpAddr1 {
        V4(String),
        V6(String),
    }

    let home = IpAddr1::V4(String::from("127.0.0.1"));
    let loopback = IpAddr1::V6(String::from("::1"));

    // 每个成员可以处理不同类型和数量的数据
    enum IpAddr2 {
        V4(u8, u8, u8, u8),
        V6(String),
    }

    let home = IpAddr2::V4(127, 0, 0, 1);
    let loopback = IpAddr2::V6(String::from("::1"));

    // 标准库是如何定义 IpAddr 的
    enum IpAddr3 {
        V4(Ipv4Addr),
        V6(Ipv6Addr),
    }

    struct Ipv4Addr {
        // --snip--
    }

    struct Ipv6Addr {
        // --snip--
    }
    // 虽然标准库中包含一个 IpAddr 的定义，仍然可以创建和使用我们自己的定义而不会有冲突，因为我们并没有将标准库中的定义引入作用域。第七章会讲到如何导入类型。

    // 内嵌了多种的类型的枚举
    enum Message {
        Quit,                       // 不携带任何数据的成员
        Move { x: i32, y: i32 },    // 类似于结构体包含命名字段
        Write(String),              // 携带一个 String
        ChangeColor(i32, i32, i32), // 携带三个 i32
    }

    // 和定义多个不同类型的结构体的方式很相像
    struct QuitMessage; // 类单元结构体
    struct MoveMessage {
        x: i32,
        y: i32,
    }
    struct WriteMessage(String); // 元组结构体
    struct ChangeColorMessage(i32, i32, i32); // 元组结构体

    // 在枚举上定义方法
    impl Message {
        fn call(&self) {
            // 方法体
        }
    }

    let m = Message::Write(String::from("hello"));
    m.call();
}

fn route(ip_kind: IpAddrKind) {}

// 6.1.2. Option 枚举和其相对于空值的优势
// Rust 并没有空值，不过它确实拥有一个可以编码存在或不存在概念的枚举。这个枚举是 Option<T>，它定义于标准库中
// enum Option<T> {
//     Some(T),
//     None,
// }
// <T> 语法是一个还未讲到的 Rust 功能。它是一个泛型类型参数，第十章会更详细的讲解泛型。目前，所有你需要知道的就是 <T> 意味着 Option 枚举的 Some 成员可以包含任意类型的数据，同时每一个用于 T 位置的具体类型使得 Option<T> 整体作为不同的类型。
fn main() {
    let some_number = Some(5);
    let some_string = Some("a string");

    let absent_number: Option<i32> = None;

    // Option<T> 和 T（这里 T 可以是任何类型）是不同的类型，编译器不允许像一个肯定有效的值那样使用 Option<T>
    let x: i8 = 5;
    let y: Option<i8> = Some(5);

    // let sum = x + y; // 报错 the trait `Add<Option<i8>>` is not implemented for `i8`
    // 在对 Option<T> 进行运算之前必须将其转换为 T。通常这能帮助我们捕获到空值最常见的问题之一：假设某值不为空但实际上为空的情况。
    // https://doc.rust-lang.org/std/option/enum.Option.html
    // https://rustwiki.org/zh-CN/std/option/enum.Option.html
}

// 6.2. match 控制流结构
// 一个枚举和一个以枚举成员作为模式的 match 表达式
fn main() {
    enum Coin {
        Penny,
        Nickel,
        Dime,
        Quarter,
    }

    fn value_in_cents(coin: Coin) -> u8 {
        match coin {
            // 如果想要在分支中运行多行代码，可以使用大括号，而分支后的逗号是可选的。
            Coin::Penny => {
                println!("Lucky penny!");
                1
            }
            Coin::Nickel => 5, // 如果一个分支没有使用大括号，那么它只能包含一个表达式，表达式的值会作为该分支的返回值
            Coin::Dime => 10,
            Coin::Quarter => 25,
        }
    }
}

// 6.2.1. 绑定值的模式
#[derive(Debug)]
enum UsState {
    Alabama,
    Alaska,
}

enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter(UsState), // 带有值的枚举成员, 每个州都有自己的硬币，所以 Quarter 成员包含一个额外的 UsState 变量来保存哪个州铸造了硬币
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter(state) => {
            println!("State quarter from {:?}!", state);
            25
        }
    }
}

fn main() {
    let coin = Coin::Quarter(UsState::Alaska);
    value_in_cents(coin);
}

// 6.2.2. 匹配 Option<T>
fn main() {
    fn plus_one(x: Option<i32>) -> Option<i32> {
        match x {
            None => None,
            Some(i) => Some(i + 1),
        }
    }

    let five = Some(5);
    let six = plus_one(five); // Some(6)
    let none = plus_one(None); // None + 1 = None
}

// 6.2.3. 匹配是穷尽的
// 分支必须覆盖了所有的可能性
fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        Some(i) => Some(i + 1),
        // None => None, 报错, 因为没有覆盖所有的可能性
    }
}

// 6.2.4. 通配模式和 _ 占位符
fn main() {
    let dice_roll = 9;
    match dice_roll {
        3 => add_fancy_hat(),
        7 => remove_fancy_hat(),
        other => move_player(other),
    }

    fn add_fancy_hat() {}
    fn remove_fancy_hat() {}
    fn move_player(num_spaces: u8) {}
}

// 不想使用通配模式获取的值时，请使用 _ ，这是一个特殊的模式，可以匹配任意值而不绑定到该值。这告诉 Rust 我们不会使用这个值，所以 Rust 也不会警告我们存在未使用的变量。
fn main() {
    let dice_roll = 9;
    match dice_roll {
        3 => add_fancy_hat(),
        7 => remove_fancy_hat(),
        _ => reroll(), // _ 模式匹配所有值
    }

    fn add_fancy_hat() {}
    fn remove_fancy_hat() {}
    fn reroll() {}
}

// 或者 3 或 7 以外的值将无事发生。使用单元值（在“元组类型”一节中提到的空元组）作为 _ 分支的代码
fn main() {
    let dice_roll = 9;
    match dice_roll {
        3 => add_fancy_hat(),
        7 => remove_fancy_hat(),
        _ => (), // 单元值
    }
    fn add_fancy_hat() {}
    fn remove_fancy_hat() {}
}

// 6.3. if let 简洁控制流
fn main() {
    let config_max = Some(3u8);

    // 示例 match ，只关心当值为 Some 时执行代码
    match config_max {
        Some(max) => println!("The maximum is configured to be {}", max),
        _ => (),
    }

    // if let 简洁控制流
    if let Some(max) = config_max {
        println!("The maximum is configured to be {}", max);
    }
    // if let 语法获取通过等号分隔的一个模式和一个表达式。它的工作方式是，如果 let 语法能匹配模式，则执行 if let 块中的代码。否则，什么也不做。
    // 可以认为 if let 是 match 的一个语法糖，它当值匹配某一模式时执行代码而忽略所有其他值。
}

// 可以在 if let 中包含一个 else。else 块中的代码与 match 表达式中的 _ 分支块中的代码相同，这样的 match 表达式就等同于 if let 和 else。
#[derive(Debug)]
enum UsState {
    Alabama,
    Alaska,
    // --snip--
}

enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter(UsState),
}

fn main() {
    let coin = Coin::Penny;
    let mut count = 0;
    match coin {
        Coin::Quarter(state) => println!("State quarter from {state:?}!"),
        _ => count += 1,
    }
}
// 等同于
fn main() {
    let coin = Coin::Penny;
    let mut count = 0;
    if let Coin::Quarter(state) = coin {
        println!("State quarter from {state:?}!");
    } else {
        count += 1;
    }
}
