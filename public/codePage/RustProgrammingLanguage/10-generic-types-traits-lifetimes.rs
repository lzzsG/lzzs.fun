// 10. 泛型、Trait 和生命周期
// 提取函数来减少重复
// 泛型允许我们使用一个可以代表多种类型的占位符来替换特定类型，以此来减少代码冗余。
fn main() {
    let number_list = vec![34, 50, 25, 100, 65];
    let mut largest = number_list[0];
    for number in number_list {
        if number > largest {
            largest = number;
        }
    }
    println!("The largest number is {}", largest);

    let number_list = vec![102, 34, 6000, 89, 54, 2, 43, 8];

    let mut largest = &number_list[0];

    for number in &number_list {
        if number > largest {
            largest = number;
        }
    }

    println!("The largest number is {largest}");
}
//为了消除重复，我们要创建一层抽象，定义一个处理任意整型列表作为参数的函数。
fn largest(list: &[i32]) -> &i32 {
    let mut largest = &list[0];

    for item in list {
        if item > largest {
            largest = item;
        }
    }

    largest
}

fn main() {
    let number_list = vec![34, 50, 25, 100, 65];

    let result = largest(&number_list);
    println!("The largest number is {}", result);

    let number_list = vec![102, 34, 6000, 89, 54, 2, 43, 8];

    let result = largest(&number_list);
    println!("The largest number is {}", result);
}
/*
找出重复代码。
将重复代码提取到了一个函数中，并在函数签名中指定了代码中的输入和返回值。
将重复代码的两个实例，改为调用函数。
*/
// 接下来使用相同的步骤通过泛型来减少重复。

// 10.1. 泛型数据类型
// 在函数定义中使用泛型
// 本来在函数签名中指定参数和返回值的类型的地方，改用泛型来表示，使得代码适应性更强，为函数的调用者提供更多的功能，同时也避免了代码的重复。
fn largest_i32(list: &[i32]) -> &i32 {
    let mut largest = &list[0];

    for item in list {
        if item > largest {
            largest = item;
        }
    }

    largest
}

fn largest_char(list: &[char]) -> &char {
    let mut largest = &list[0];

    for item in list {
        if item > largest {
            largest = item;
        }
    }

    largest
}

fn main() {
    let number_list = vec![34, 50, 25, 100, 65];

    let result = largest_i32(&number_list);
    println!("The largest number is {}", result);

    let char_list = vec!['y', 'm', 'a', 'q'];

    let result = largest_char(&char_list);
    println!("The largest char is {}", result);
}

// 定义泛型版本的 largest 函数，类型参数声明位于函数名称与参数列表中间的尖括号 <> 中。
fn largest<T>(list: &[T]) -> &T {}
// 函数 largest 有泛型类型 T。它有个参数 list，其类型是元素为 T 的 slice。largest 函数会返回一个与 T 相同类型的引用。
fn largest<T>(list: &[T]) -> &T {
    let mut largest = &list[0];

    for item in list {
        if item > largest {
            largest = item;
        }
    }

    largest
}
/*
报错：
error[E0369]: binary operation `>` cannot be applied to type `&T`
help: consider restricting type parameter `T`
  |
1 | fn largest<T: std::cmp::PartialOrd>(list: &[T]) -> &T {
  |             ++++++++++++++++++++++
这个错误表明 largest 的函数体不能适用于 T 的所有可能的类型，并不是所有类型都有 > 运算符。
为了开启比较功能，标准库中定义的 std::cmp::PartialOrd trait 可以实现类型的比较功能。
依照帮助说明中的建议，我们限制 T 只对实现了 PartialOrd 的类型有效后代码就可以编译了，因为标准库为 i32 和 char 实现了 PartialOrd。
*/

// 结构体定义中的泛型
// 同样也可以用 <> 语法来定义结构体，包含一个或多个泛型参数类型字段。
struct Point<T> {
    x: T,
    y: T,
}

fn main() {
    let integer = Point { x: 5, y: 10 };
    let float = Point { x: 1.0, y: 4.0 };
}
// 这里字段 x 和 y 都是相同类型的，所以我们在定义 Point 结构体时使用了单个泛型参数 T。如果 Point 的 x 和 y 字段类型不同，我们可以为 Point 结构体定义两个泛型参数，如下所示：
struct Point<T, U> {
    x: T,
    y: U,
}

fn main() {
    let both_integer = Point { x: 5, y: 10 };
    let both_float = Point { x: 1.0, y: 4.0 };
    let integer_and_float = Point { x: 5, y: 4.0 };
}

// 枚举定义中的泛型
enum Option<T> {
    Some(T),
    None,
}

enum Result<T, E> {
    Ok(T),
    Err(E),
}

// 方法定义中的泛型
struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }
}

fn main() {
    let p = Point { x: 5, y: 10 };

    println!("p.x = {}", p.x());
}
// 必须在 impl 后面声明 T，这样就可以在 Point<T> 上实现的方法中使用 T 了。
// 在 Point<T> 上实现的方法必须使用泛型类型 T，因为 Point 实例的类型包含泛型部分。
// 定义方法时也可以为泛型指定限制
impl Point<f32> {
    fn distance_from_origin(&self) -> f32 {
        (self.x.powi(2) + self.y.powi(2)).sqrt()
    }
}
// 这段代码意味着 Point<f32> 类型会有一个方法 distance_from_origin，而其他 T 不是 f32 类型的 Point<T> 实例则没有定义此方法。

// 结构体定义中的泛型类型参数并不总是与结构体方法签名中使用的泛型是同一类型。
struct Point<X1, Y1> {
    x: X1,
    y: Y1,
}

impl<X1, Y1> Point<X1, Y1> {
    fn mixup<X2, Y2>(self, other: Point<X2, Y2>) -> Point<X1, Y2> {
        Point {
            x: self.x,
            y: other.y,
        }
    }
}

fn main() {
    let p1 = Point { x: 5, y: 10.4 };
    let p2 = Point { x: "Hello", y: 'c' };

    let p3 = p1.mixup(p2);

    println!("p3.x = {}, p3.y = {}", p3.x, p3.y);
}

// 泛型代码的性能
// Rust 通过在编译时进行泛型代码的 单态化（monomorphization）来保证效率。单态化是一个通过填充编译时使用的具体类型，将通用代码转换为特定代码的过程。
/*
let integer = Some(5);
let float = Some(5.0);
当 Rust 编译这些代码的时候，它会进行单态化。编译器会读取传递给 Option<T> 的值并发现有两种 Option<T>：一个对应 i32 另一个对应 f64。为此，它会将泛型定义 Option<T> 展开为两个针对 i32 和 f64 的定义，接着将泛型定义替换为这两个具体的定义。
例如：*/
enum Option_i32 {
    Some(i32),
    None,
}

enum Option_f64 {
    Some(f64),
    None,
}

fn main() {
    let integer = Option_i32::Some(5);
    let float = Option_f64::Some(5.0);
}

// 10.2. Trait：定义共同行为
// trait 定义了某个特定类型拥有可能与其他类型共享的功能。（类似于其他语言中的常被称为 接口（interfaces）的功能）
// 可以使用 trait bounds 指定泛型是任何拥有特定行为的类型。

// 定义 trait
pub trait Summary {
    fn summarize(&self) -> String;
}
// 使用 trait 关键字来声明一个 trait，后面是 trait 的名字。可以声明 trait 为 pub 以便依赖这个 crate 的 crate 也可以使用这个 trait。在大括号中声明描述实现这个 trait 的类型所需要的行为的方法签名，在这个例子中是 fn summarize(&self) -> String。
// 在方法签名后跟分号，而不是在大括号中提供其实现。接着每一个实现这个 trait 的类型都需要提供其自定义行为的方法体，编译器也会确保任何实现 Summary trait 的类型都拥有与这个签名的定义完全一致的 summarize 方法。

// 为类型实现 trait
pub struct NewsArticle {
    pub headline: String,
    pub location: String,
    pub author: String,
    pub content: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}, by {} ({})", self.headline, self.author, self.location)
    }
}

pub struct Tweet {
    pub username: String,
    pub content: String,
    pub reply: bool,
    pub retweet: bool,
}

impl Summary for Tweet {
    fn summarize(&self) -> String {
        format!("{}: {}", self.username, self.content)
    }
}

// 不能为外部类型实现外部 trait

// 默认实现
pub trait Summary {
    fn summarize(&self) -> String {
        String::from("(Read more...)")
    }
}
// 要对 NewsArticle 实例使用这个默认实现，可以通过 impl Summary for NewsArticle {} 指定一个空的 impl 块。
// 如果在 impl 块中为特定类型提供了方法的实现，那么这个实现将会覆盖掉默认实现。
let article = NewsArticle {
    headline: String::from("Penguins win the Stanley Cup Championship!"),
    location: String::from("Pittsburgh, PA, USA"),
    author: String::from("Iceburgh"),
    content: String::from(
        "The Pittsburgh Penguins once again are the best \
         hockey team in the NHL.",
    ),
};

println!("New article available! {}", article.summarize());
// 打印 New article available! (Read more...)

pub trait Summary {
    fn summarize_author(&self) -> String;

    fn summarize(&self) -> String {
        format!("(Read more from {}...)", self.summarize_author())
    }
}
// 只需在实现 trait 时定义 summarize_author 
impl Summary for Tweet {
    fn summarize_author(&self) -> String {
        format!("@{}", self.username)
    }
}

let tweet = Tweet {
    username: String::from("horse_ebooks"),
    content: String::from(
        "of course, as you probably already know, people",
    ),
    reply: false,
    retweet: false,
};

println!("1 new tweet: {}", tweet.summarize());
// 打印 1 new tweet: (Read more from @horse_ebooks...)

// trait 作为参数
// 定义一个函数 notify 来调用参数 item 上的 summarize 方法，该参数是实现了 Summary trait 的某种类型。
pub fn notify(item: &impl Summary) {
    println!("Breaking news! {}", item.summarize());
}
//  trait bound 语法
pub fn notify<T: Summary>(item: &T) {
    println!("Breaking news! {}", item.summarize());
}
// 通知函数 notify 的定义中，类型参数 T 在冒号后面指定了一个 trait bound，来指定 T 必须实现 Summary trait。这相当于说，“任何满足这些约束条件的类型都可以作为 item 参数的值。”

// impl Trait 很方便，适用于短小的例子。
pub fn notify(item1: &impl Summary, item2: &impl Summary) {}
// 这适用于 item1 和 item2 允许是不同类型的情况（只要它们都实现了 Summary）。
// 如果要强制它们都是相同类型，使用 trait bound 
pub fn notify<T: Summary>(item1: &T, item2: &T) {}

// 通过 + 指定多个 trait bound
pub fn notify(item: &(impl Summary + Display)) {}
// 或者
pub fn notify<T: Summary + Display>(item: &T) {}

// 通过 where 简化 trait bound
// 有多个泛型参数的函数在名称和参数列表之间会有很长的 trait bound 信息
fn some_function<T: Display + Clone, U: Clone + Debug>(t: &T, u: &U) -> i32 {}
// 此时可以使用 where 从句来使 trait bound 更加简洁和易读
fn some_function<T, U>(t: &T, u: &U) -> i32
where
    T: Display + Clone,
    U: Clone + Debug,
{}

// 返回实现了 trait 的类型
fn returns_summarizable() -> impl Summary {
    Tweet {
        username: String::from("horse_ebooks"),
        content: String::from(
            "of course, as you probably already know, people",
        ),
        reply: false,
        retweet: false,
    }
}
// 指定 returns_summarizable 函数返回某个实现了 Summary trait 的类型，但是不确定其具体的类型。
// 在闭包和迭代器场景十分的有用
// 只适用于返回单一类型的情况。
fn returns_summarizable(switch: bool) -> impl Summary {
    if switch {
        NewsArticle {
            headline: String::from(
                "Penguins win the Stanley Cup Championship!",
            ),
            location: String::from("Pittsburgh, PA, USA"),
            author: String::from("Iceburgh"),
            content: String::from(
                "The Pittsburgh Penguins once again are the best \
                 hockey team in the NHL.",
            ),
        }
    } else {
        Tweet {
            username: String::from("horse_ebooks"),
            content: String::from(
                "of course, as you probably already know, people",
            ),
            reply: false,
            retweet: false,
        }
    }
}
// 尝试返回 NewsArticle 或 Tweet。不能编译，因为 impl Trait 工作方式的限制。

// 使用 trait bound 有条件地实现方法
use std::fmt::Display;

struct Pair<T> {
    x: T,
    y: T,
}

impl<T> Pair<T> {
    // 所有类型的 Pair<T> 都可以调用 new 方法
    fn new(x: T, y: T) -> Self {
        Self { x, y }
    }
}

// 只有当 T 实现了 Display 和 PartialOrd 时，Pair<T> 才能调用 cmp_display
impl<T: Display + PartialOrd> Pair<T> {
    fn cmp_display(&self) {
        if self.x >= self.y {
            println!("The largest member is x = {}", self.x);
        } else {
            println!("The largest member is y = {}", self.y);
        }
    }
}


// 使用 trait bound 有条件地实现 trait
use std::fmt::Display;

// 为所有实现了 Display 的类型实现 ToString trait
impl<T: Display> ToString for T {
    // ToString 的实现可以调用 Display 的功能
    fn to_string(&self) -> String {
        format!("{}", self)
    }
}

// 10.3. 生命周期确保引用有效
// 生命周期避免了悬垂引用
fn main() {
    let r;

    {
        let x = 5;
        r = &x;
    }

    println!("r: {r}");
}
// r 引用的值在尝试使用之前就离开了作用域，这会导致悬垂引用。
/*
error[E0597]: `x` does not live long enough
 --> src/main.rs:6:13
  |
5 |         let x = 5;
  |             - binding `x` declared here
6 |         r = &x;
  |             ^^ borrowed value does not live long enough
7 |     }
  |     - `x` dropped here while still borrowed
8 |
9 |     println!("r: {r}");
  |                  --- borrow later used here
*/

// 借用检查器
// Rust 编译器有一个借用检查器，它比较作用域来确保所有的借用都是有效的。
/* 
fn main() {
    let r;                // ---------+-- 'a
                          //          |
    {                     //          |
        let x = 5;        // -+-- 'b  |
        r = &x;           //  |       |
    }                     // -+       |
                          //          |
    println!("r: {r}");   //          |
}                         // ---------+
*/

// 正确的例子：
/*
fn main() {
    let x = 5;            // ----------+-- 'b
                          //           |
    let r = &x;           // --+-- 'a  |
                          //   |       |
    println!("r: {r}");   //   |       |
                          // --+       |
}                         // ----------+
*/

// 函数中的泛型生命周期
// 编写一个返回两个字符串 slice 中较长者的函数。这个函数获取两个字符串 slice 并返回一个字符串 slice。
fn main() {
    let string1 = String::from("abcd");
    let string2 = "xyz";

    let result = longest(string1.as_str(), string2);
    println!("The longest string is {result}");
}

fn longest(x: &str, y: &str) -> &str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}// ❌
// error[E0106]: missing lifetime specifier...
// 返回值需要一个泛型生命周期参数，因为 Rust 并不知道将要返回的引用是指向 x 或 y。

// 生命周期注解语法
// 生命周期注解并不改变任何引用的生命周期的长短。相反它们描述了多个引用生命周期相互的关系，而不影响其生命周期。
// 生命周期参数名称必须以撇号（'）开头，其名称通常全是小写，类似于泛型其名称非常短。大多数人使用 'a 作为第一个生命周期注解。生命周期参数注解位于引用的 & 之后，并有一个空格来将引用类型与生命周期注解分隔开。
&i32        // 引用
&'a i32     // 带有显式生命周期的引用
&'a mut i32 // 带有显式生命周期的可变引用

// 函数签名中的生命周期注解
// 为了在函数签名中使用生命周期注解，需要在函数名和参数列表间的尖括号中声明泛型生命周期（lifetime）参数，就像泛型类型（type）参数一样。
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
//  longest 函数并不需要知道 x 和 y 具体会存在多久，而只需要知道有某个可以被 'a 替代的作用域将会满足这个签名。
// 泛型生命周期 'a 的具体生命周期等同于 x 和 y 的生命周期中较小的那一个。因为我们用相同的生命周期参数 'a 标注了返回的引用值，所以返回的引用值就能保证在 x 和 y 中较短的那个生命周期结束之前保持有效。
fn main() {
    let string1 = String::from("long string is long");

    {
        let string2 = String::from("xyz");
        let result = longest(string1.as_str(), string2.as_str());
        println!("The longest string is {result}");
    }
}// ✅

fn main() {
    let string1 = String::from("long string is long");
    let result;
    {
        let string2 = String::from("xyz");
        result = longest(string1.as_str(), string2.as_str());
    }
    println!("The longest string is {result}");
}// ❌


// 深入理解生命周期
// 如果将 longest 函数的实现修改为总是返回第一个参数而不是最长的字符串 slice，就不需要为参数 y 指定一个生命周期。
fn longest<'a>(x: &'a str, y: &str) -> &'a str {
    x
}
// 当从函数返回一个引用，返回值的生命周期参数需要与一个参数的生命周期参数相匹配。如果返回的引用 没有 指向任何一个参数，那么唯一的可能就是它指向一个函数内部创建的值。然而它将会是一个悬垂引用，因为它将会在函数结束时离开作用域。
fn longest<'a>(x: &str, y: &str) -> &'a str {
    let result = String::from("really long string");
    result.as_str()
}// ❌
// result 在 longest 函数的结尾将离开作用域并被清理，而我们尝试从函数返回一个 result 的引用。

// 结构体定义中的生命周期注解
struct ImportantExcerpt<'a> {
    part: &'a str,
}
// ImportantExcerpt 的实例不能比其 part 字段中的引用存在的更久
fn main() {
    let novel = String::from("Call me Ishmael. Some years ago...");
    let first_sentence = novel.split('.').next().expect("Could not find a '.'");
    let i = ImportantExcerpt { part: first_sentence };
}

// 生命周期省略（Lifetime Elision）
// 函数或方法的参数的生命周期被称为 输入生命周期（input lifetimes），而返回值的生命周期被称为 输出生命周期（output lifetimes）。
// 编译器采用三条规则来判断引用何时不需要明确的注解。第一条规则适用于输入生命周期，后两条规则适用于输出生命周期。如果编译器检查完这三条规则后仍然存在没有计算出生命周期的引用，编译器将会停止并生成错误。这些规则适用于 fn 定义，以及 impl 块。
// 1.编译器为每一个引用参数都分配一个生命周期参数。例如，fn foo<'a, 'b>(x: &'a i32, y: &'b i32) -> &'a i32，这里编译器将 &'a i32 和 &'b i32 分别分配给 x 和 y。
// 2.如果只有一个输入生命周期参数，那么它被赋予所有输出生命周期参数。例如，fn foo<'a>(x: &'a i32) -> &'a i32，这里 x 的生命周期被分配给输出生命周期 'a。
// 3.如果方法有多个输入生命周期参数，并且其中之一是 &self 或 &mut self，那么 self 的生命周期被赋予所有输出生命周期参数。
fn first_word(s: &str) -> &str {}
// 应用第一条规则：
fn first_word<'a>(s: &'a str) -> &str {}
// 应用第二条规则：
fn first_word<'a>(s: &'a str) -> &'a str {}
// 第三条规则不适用

fn longest(x: &str, y: &str) -> &str {}
// 应用第一条规则：
fn longest<'a, 'b>(x: &'a str, y: &'b str) -> &str {}
// 第二，第三条规则不适用

// 方法定义中的生命周期注解
// 结构体字段的生命周期必须总是在 impl 关键字之后声明并在结构体名称之后被使用，因为这些生命周期是结构体类型的一部分。
impl<'a> ImportantExcerpt<'a> {
    fn level(&self) -> i32 {
        3
    }

    // 适用于第三条生命周期省略规则，因为有一个 &self 参数
    fn announce_and_return_part(&self, announcement: &str) -> &str {
        println!("Attention please: {}", announcement);
        self.part
    }
}

// 静态生命周期
// 'static，其生命周期能够存活于整个程序期间。所有的字符串字面值都拥有 'static 生命周期，也可以选择像下面这样标注出来
let s: &'static str = "I have a static lifetime.";
// 将引用指定为 'static 之前，思考一下这个引用是否真的在整个程序的生命周期里都有效，以及你是否希望它存在得这么久。

// 结合泛型类型参数、trait bounds 和生命周期
use std::fmt::Display;

fn longest_with_an_announcement<'a, T>(
    x: &'a str,
    y: &'a str,
    ann: T,
) -> &'a str
where
    T: Display,
{
    println!("Announcement! {ann}");
    if x.len() > y.len() {
        x
    } else {
        y
    }
}