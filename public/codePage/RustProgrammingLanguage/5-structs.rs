// 5. 使用结构体组织相关联的数据

// 5.1. 结构体的定义和实例化
struct User {
    username: String, //字段名: 字段类型
    email: String,
    sign_in_count: u64,
    active: bool,
}

fn main() {
    //实例化
    let mut user1 = User {
        email: String::from("someone@example.com"),
        username: String::from("someusername123"),
        active: true,
        sign_in_count: 1,
    };

    // 使用点运算符为对应的字段赋值, 实例必须是可变的
    user1.email = String::from("anotheremail@example.com");

    //访问字段
    println!("{}", user1.email);
    //使用结构体更新语法创建一个User实例的另一个实例
}

fn build_user(email: String, username: String) -> User {
    User {
        email: email,
        username: username,
        active: true,
        sign_in_count: 1,
    }
}

// 5.1.1. 使用字段初始化简写语法
// 字段与参数名称相同时, 可以省略字段初始化语法
fn build_user(email: String, username: String) -> User {
    User {
        email,
        username,
        active: true,
        sign_in_count: 1,
    }
}

// 5.1.2. 使用结构体更新语法从其他实例创建实例
fn main() {
    let user1 = User {
        email: String::from("someone@example.com"),
        username: String::from("someusername123"),
        active: true,
        sign_in_count: 1,
    };

    // 使用结构体更新语法创建一个User实例的另一个实例
    let user2 = User {
        active: user1.active,     // 使用user1的active字段
        username: user1.username, // String 被移到 user2
        email: String::from("another@example.com"),
        sign_in_count: user1.sign_in_count,
    }; // 不能再使用user1，String 被移到 user2

    let user3 = User {
        email: String::from("another@example.com"),
        username: String::from("anotherusername567"),
        ..user2 // ..user2 放在最后, 使用user2的其余字段
    }; // 可以使用user2，active 和 sign_in_count 的类型是实现 Copy trait 的类型
}

// 5.1.3. 使用没有命名字段的元组结构体来创建不同的类型
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

fn main() {
    let black = Color(0, 0, 0);
    let origin = Point(0, 0, 0);
}

// 5.1.4. 没有任何字段的类单元结构体
struct AlwaysEqual;
fn main() {
    let subject = AlwaysEqual;
}
// 设想我们稍后将为这个类型实现某种行为，使得每个 AlwaysEqual 的实例始终等于任何其它类型的实例，我们无需要任何数据来实现这种行为，第十章中将介绍如何实现这种行为。（trait）

// 5.1.5. 结构体数据的所有权
// User 结构体的定义中，我们使用了自身拥有所有权的 String 类型而不是 &str 字符串 slice 类型。这是一个有意而为之的选择，因为我们想要这个结构体拥有它所有的数据，为此只要整个结构体是有效的话其数据也是有效的。
// 存储引用需要考虑生命周期，第十章将详细介绍生命周期。

// 5.2. 结构体示例程序
// rectangles
fn main() {
    let width1 = 30;
    let height1 = 50;

    println!(
        "The area of the rectangle is {} square pixels.",
        area(width1, height1)
    );
}

fn area(width: u32, height: u32) -> u32 {
    width * height
}

// 5.2.1. 使用元组重构
// 函数 area 本应该计算一个长方形的面积，不过函数却有两个参数。这两个参数是相关联的，不过程序本身却没有表现出这一点。
// 元组结构体可以清晰地表达出结构体中包含的值的意义。
fn main() {
    let rect1 = (30, 50);

    println!(
        "The area of the rectangle is {} square pixels.",
        area(rect1)
    );
}

fn area(rectangle: (u32, u32)) -> u32 {
    rectangle.0 * rectangle.1
}
// 元组并没有给出元素的名称，所以计算变得更费解了，因为不得不使用索引来获取元组的每一部分。

// 5.2.2. 使用结构体重构：赋予更多意义
struct Rectangle {
    // 结构体定义
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle {
        // 实例化
        width: 30,
        height: 50,
    };

    println!(
        "The area of the rectangle is {} square pixels.",
        area(&rect1)
    );
}

fn area(rectangle: &Rectangle) -> u32 {
    // 传入引用
    rectangle.width * rectangle.height // 访问字段
}

// 5.2.3. 通过派生 trait 增加实用功能
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!("rect1 is {}", rect1); // 报错，因为 Rectangle 没有实现 Display trait
                                    // 报错提示：`Rectangle` doesn't implement `std::fmt::Display`，可能可以使用:? ，但是同样报错，需要派生 Debug trait
}

#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

// {:?} {:#?} dbg!
fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!("rect1 is {:?}", rect1);
    // {:?} 是一种格式化符号，用于打印调试信息，派生 Debug trait 后，可以打印出结构体的内容
    println!("rect1 is {:#?}", rect1);
    // {:#?} 是一种格式化符号，用于打印调试信息，派生 Debug trait 后，可以打印出结构体的内容，并且格式化更美观
    dbg!(&rect1);
    // dbg! 宏可以打印出变量的值，并且返回变量的值，可以用于调试
    // dbg! 宏接收一个表达式的所有权（与 println! 宏相反，后者接收的是引用），打印出代码中调用 dbg! 宏时所在的文件和行号，以及该表达式的结果值，并返回该值的所有权。
    println!("rect1 is {}", rect1);
}

// 我们的 area 函数是非常特殊的，它只计算长方形的面积。如果这个行为与 Rectangle 结构体再结合得更紧密一些就更好了，因为它不能用于其他类型。

// 5.3. 方法语法
// 方法（method）与函数类似，不过方法与特定类型相关联。

// 5.3.1. 定义方法
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    // impl 块中定义了 Rectangle 的关联函数
    fn area(&self) -> u32 {
        // &self 是一个 self 的引用，self 必须是第一个参数，&self 是一个借用，意味着函数对结构体的引用，而不是拥有它
        self.width * self.height // 访问字段
    }

    // 以选择将方法的名称与结构中的一个字段相同。
    fn width(&self) -> bool {
        self.width > 0
    }

    // getters方法
    // 与字段同名的方法将被定义为只返回字段中的值，而不做其他事情。这样的方法被称为 getters，Rust 并不像其他一些语言那样为结构字段自动实现它们。Getters 很有用，因为你可以把字段变成私有的，但方法是公共的，这样就可以把对字段的只读访问作为该类型公共 API 的一部分。
    // 智能合约？
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area()
    );

    if rect1.width() {
        println!("The rectangle has a nonzero width; it is {}", rect1.width);
    }
}

// 5.3.2. -> 运算符到哪去了？
// Rust 并没有一个与 -> 等效的运算符；相反，Rust 有一个叫 自动引用和解引用（automatic referencing and dereferencing）的功能。方法调用是 Rust 中少数几个拥有这种行为的地方。
// 当调用方法时，Rust 会在方法名前自动添加 &、&mut 或 *，这取决于方法定义中如何使用 self。
// 也就是说，这些代码是等价的：
// p1.distance(&p2);
// (&p1).distance(&p2);

// 5.3.3. 带有更多参数的方法
// 定义 can_hold 方法, 如果 self （第一个 Rectangle）能完全包含第二个长方形则返回 true；否则返回 false。
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}
fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };
    let rect2 = Rectangle {
        width: 10,
        height: 40,
    };
    let rect3 = Rectangle {
        width: 60,
        height: 45,
    };
    println!("Can rect1 hold rect2? {}", rect1.can_hold(&rect2));
    println!("Can rect1 hold rect3? {}", rect1.can_hold(&rect3));
}

impl Rectangle {
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

// 5.3.4. 关联函数
// impl 块中定义的函数被称为 关联函数（associated function），因为它们与结构体相关联。这些函数经常被用作构造器（constructor）——即用于创建结构体实例的函数。
// 5.3.5. 多个 impl 块
// 可以在同一个结构体名下定义多个 impl 块，每个块中定义不同的方法。
impl Rectangle {
    fn square(size: u32) -> Self {
        Self {
            width: size,
            height: size,
        }
    }
}
