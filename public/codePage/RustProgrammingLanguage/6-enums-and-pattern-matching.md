### 6. 枚举和模式匹配

**枚举**（`enum`）是Rust中一种非常强大和灵活的数据类型，用于表示一组相关但不同的值。每个枚举成员可以携带不同类型和数量的数据。通过枚举，我们可以将相关的几种类型集合在一起并给出明确的语义。枚举在Rust中经常与**模式匹配**（`match`）一起使用，以处理不同的情况和逻辑分支。

### 6.1. 枚举的定义

在Rust中，枚举通过`enum`关键字定义。枚举成员（variants）代表了一组可能的值，每个成员可以携带不同的数据类型。

#### 枚举定义示例

```rust
enum IpAddrKind {
    V4,
    V6,
}
```

这里定义了一个枚举`IpAddrKind`，它包含两个成员：`V4`和`V6`，表示IPv4和IPv6的类型。

### 6.1.1.1 枚举值

可以使用枚举来实例化不同的值，并通过点运算符来访问枚举的成员：

```rust
fn main() {
    let four = IpAddrKind::V4; // 创建一个 V4 变体
    let six = IpAddrKind::V6;  // 创建一个 V6 变体

    route(IpAddrKind::V4);
    route(IpAddrKind::V6);
}

fn route(ip_kind: IpAddrKind) {
    // 根据ip_kind执行不同操作
}
```

在这个例子中，我们使用了枚举的`V4`和`V6`成员来表示不同的IP地址类型。枚举值`IpAddrKind::V4`和`IpAddrKind::V6`作为参数传递给`route`函数。

### 6.1.1.2. 结合结构体使用枚举

枚举可以与结构体结合，进一步表达复杂的数据结构。下面的例子中，我们使用结构体来包含IP地址类型和对应的IP地址字符串：

```rust
struct IpAddr {
    kind: IpAddrKind,     // 使用枚举类型
    address: String,      // IP地址
}

fn main() {
    let home = IpAddr {
        kind: IpAddrKind::V4,
        address: String::from("127.0.0.1"),
    };

    let loopback = IpAddr {
        kind: IpAddrKind::V6,
        address: String::from("::1"),
    };
}
```

- `IpAddr`结构体包含了枚举`IpAddrKind`，用于表示IP地址的类型，以及一个`String`字段来存储实际的IP地址。
- 通过实例化`IpAddr`结构体，可以结合类型和数据一同存储。

### 6.1.1.3. 枚举携带数据

Rust的枚举不仅仅可以像`V4`、`V6`这样简单，还可以携带数据。我们可以将数据与每个枚举成员关联起来，这样可以使得每个变体有不同的数据类型和结构。

```rust
enum IpAddr1 {
    V4(String),  // V4 变体携带一个字符串
    V6(String),  // V6 变体携带一个字符串
}

fn main() {
    let home = IpAddr1::V4(String::from("127.0.0.1"));
    let loopback = IpAddr1::V6(String::from("::1"));
}
```

这里的`IpAddr1`枚举每个变体都携带了一个`String`类型的数据，表示不同的IP地址版本和对应的IP地址。这样，枚举变体可以携带更多的信息。

#### 处理不同类型和数量的数据

枚举成员还可以携带不同的数据类型和数量：

```rust
enum IpAddr2 {
    V4(u8, u8, u8, u8), // V4 变体携带四个 u8 类型的数据
    V6(String),         // V6 变体携带一个字符串
}

fn main() {
    let home = IpAddr2::V4(127, 0, 0, 1);      // 使用四个字节表示 IPv4 地址
    let loopback = IpAddr2::V6(String::from("::1")); // 使用字符串表示 IPv6 地址
}
```

- `IpAddr2::V4`变体携带四个`u8`类型的数据，用于表示一个IPv4地址。
- `IpAddr2::V6`变体仍然使用一个`String`来表示IPv6地址。

### 6.1.1.4. 枚举在标准库中的定义

Rust标准库中也有一个定义良好的`IpAddr`枚举，其变体分别是`V4`和`V6`，并携带了更具体的`Ipv4Addr`和`Ipv6Addr`类型的数据：

```rust
enum IpAddr3 {
    V4(Ipv4Addr), // V4 变体携带 Ipv4Addr 类型
    V6(Ipv6Addr), // V6 变体携带 Ipv6Addr 类型
}

struct Ipv4Addr {
    // IPv4 地址的具体实现
}

struct Ipv6Addr {
    // IPv6 地址的具体实现
}
```

我们可以自己定义与标准库类似的枚举类型，而不会引发冲突。

### 6.1.1.5. 枚举的更多变体

枚举的成员不仅可以携带简单的数据类型，还可以携带结构体或元组，甚至是没有任何数据的变体。一个常见的例子是`Message`枚举，它展示了多种不同类型的变体：

```rust
enum Message {
    Quit,                       // 不携带任何数据
    Move { x: i32, y: i32 },    // 类似于结构体，携带命名字段
    Write(String),              // 携带一个字符串
    ChangeColor(i32, i32, i32), // 携带三个i32
}
```

- `Quit`变体不携带任何数据。
- `Move`变体类似结构体，携带两个命名的`i32`字段。
- `Write`变体携带一个`String`类型的数据。
- `ChangeColor`变体携带三个`i32`数据，表示颜色。

这使得枚举可以更加灵活，处理不同类型的数据。

### 6.1.1.6. 在枚举上定义方法

我们可以为枚举定义方法，就像在结构体上定义方法一样。方法定义在`impl`块中，允许对枚举进行行为操作：

```rust
impl Message {
    fn call(&self) {
        // 处理不同的枚举成员
    }
}

fn main() {
    let m = Message::Write(String::from("hello"));
    m.call(); // 调用枚举方法
}
```

通过在枚举上定义方法，可以为每个枚举成员增加一些行为逻辑，使代码更加组织化和模块化。

### 6.1.2. `Option` 枚举与空值的优势

在许多编程语言中，存在**空值**（null）的概念，用来表示某个变量没有值。然而，空值常常引发严重的问题，比如解引用空指针会导致程序崩溃。为了解决这一问题，Rust选择不引入空值，而是提供了一个更加安全的替代方案——`Option` 枚举。它允许显式表达**值的存在或不存在**。

`Option<T>` 枚举的定义如下：

```rust
enum Option<T> {
    Some(T), // 表示存在值
    None,    // 表示没有值
}
```

- `Some(T)` 变体包含一个类型为`T`的值。
- `None` 变体表示没有任何值。

`<T>` 是一个**泛型类型参数**，它表示 `Option` 可以封装任何类型的数据。

#### 示例

```rust
fn main() {
    let some_number = Some(5);             // 表示有一个数字 5
    let some_string = Some("a string");    // 表示有一个字符串
    let absent_number: Option<i32> = None; // 表示没有数字

    let x: i8 = 5;
    let y: Option<i8> = Some(5);

    // let sum = x + y; // 编译报错，因为 Option<i8> 和 i8 是不同的类型
}
```

- `Option<T>` 和 `T` 是不同的类型，不能直接进行相加等操作。在使用 `Option` 的值之前，必须先**解包**（unwrap）或者使用模式匹配将其转换为基础类型。
- 这种设计能够防止常见的空值错误，因为 Rust 强制开发者处理 `Option` 类型的情况，而不是默认假设值总是存在。

#### `Option<T>` 的优点

相比于空值，`Option<T>` 提供了明确的安全保障：

- 编译器强制你处理可能的`None`情况，避免在运行时崩溃。
- 在需要操作某个值时，必须通过解包`Option`，这使得代码更加显式和安全。

### 6.2. `match` 控制流结构

Rust 提供了非常强大的**模式匹配**机制，称为 `match` 表达式。它能够对枚举值进行模式匹配，并根据不同的变体执行不同的操作。`match` 也适用于其他类型，比如整数和引用。

#### 枚举与 `match` 表达式

```rust
fn main() {
    enum Coin {
        Penny,
        Nickel,
        Dime,
        Quarter,
    }

    fn value_in_cents(coin: Coin) -> u8 {
        match coin {
            Coin::Penny => {
                println!("Lucky penny!");
                1
            },
            Coin::Nickel => 5,
            Coin::Dime => 10,
            Coin::Quarter => 25,
        }
    }
}
```

- `match` 用于匹配枚举的每个变体，并根据匹配结果执行相应的代码块。
- 可以选择是否在分支中使用大括号。如果分支只有一个表达式，省略大括号；如果有多行代码或需要返回值，使用大括号包裹。

### 6.2.1. 绑定值的模式

在枚举的某些变体中，可能还包含额外的数据。通过 `match` 表达式，我们可以直接绑定这个数据，进一步处理。例如，假设 `Quarter` 变体还包含一个州的具体信息：

```rust
#[derive(Debug)]
enum UsState {
    Alabama,
    Alaska,
}

enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter(UsState),
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter(state) => {
            println!("State quarter from {:?}!", state);
            25
        },
    }
}

fn main() {
    let coin = Coin::Quarter(UsState::Alaska);
    value_in_cents(coin);
}
```

- 当 `Coin::Quarter` 匹配成功时，我们可以通过 `state` 变量访问与该变体关联的数据（即州的名称），并在 `println!` 中打印出来。

### 6.2.2. 匹配 `Option<T>`

通过 `match`，我们可以处理 `Option<T>` 类型，并根据它是 `Some` 还是 `None` 做出不同的处理。比如，实现一个函数 `plus_one`，它接收一个 `Option<i32>` 并将 `Some(i)` 加1：

```rust
fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,        // 没有值，返回 None
        Some(i) => Some(i + 1), // 有值，返回加1后的结果
    }
}

fn main() {
    let five = Some(5);
    let six = plus_one(five);  // 输出 Some(6)
    let none = plus_one(None); // 输出 None
}
```

- 当传入的 `Option` 是 `None` 时，返回的也是 `None`。
- 当传入的 `Option` 是 `Some(i)` 时，将 `i` 加1并返回 `Some(i + 1)`。

### 6.2.3. 匹配是穷尽的

在 Rust 中，`match` 表达式必须穷尽所有可能的情况，这意味着所有可能的模式都必须被处理。如果没有处理所有情况，编译器会报错，提示你没有覆盖某些可能性。

```rust
fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        Some(i) => Some(i + 1),
        // 如果没有处理 `None`，会报错：
        // 报错：`match` arms have incompatible types
        // Rust 要求我们处理 `None` 的情况
    }
}
```

- `match` 是一种**穷尽**的匹配方式，必须对所有可能的值进行处理，这样可以防止遗漏边缘情况。

### 6.2.4. 通配模式和 `_` 占位符

在 Rust 中，**通配模式**允许我们捕获未显式匹配的所有情况，而不需要列出所有的可能性。这在处理有限的匹配条件时非常有用。通配模式可以通过**`_` 占位符**来实现。

#### 使用通配模式

通配模式可以捕获所有没有明确匹配的值，并允许我们通过变量名访问这个值：

```rust
fn main() {
    let dice_roll = 9;
    match dice_roll {
        3 => add_fancy_hat(),
        7 => remove_fancy_hat(),
        other => move_player(other), // 使用 `other` 绑定值
    }

    fn add_fancy_hat() {}
    fn remove_fancy_hat() {}
    fn move_player(num_spaces: u8) {}
}
```

- `other => move_player(other)` 这一行表示捕获所有不是`3`或`7`的值，并将其绑定到 `other` 变量上。然后调用 `move_player`，并将 `other` 作为参数传递。

#### 使用 `_` 占位符

如果我们不关心捕获到的值，也不打算使用它，那么可以使用 **`_`**，表示"忽略这个值"。Rust 的编译器不会警告我们未使用这个值：

```rust
fn main() {
    let dice_roll = 9;
    match dice_roll {
        3 => add_fancy_hat(),
        7 => remove_fancy_hat(),
        _ => reroll(), // 忽略所有其他值
    }

    fn add_fancy_hat() {}
    fn remove_fancy_hat() {}
    fn reroll() {}
}
```

#### 使用空元组 `()` 表示无操作

如果我们希望在特定情况下什么都不做，可以使用空元组 `()` 作为匹配结果，表示"无操作"：

```rust
fn main() {
    let dice_roll = 9;
    match dice_roll {
        3 => add_fancy_hat(),
        7 => remove_fancy_hat(),
        _ => (), // 忽略其他值且不做任何操作
    }

    fn add_fancy_hat() {}
    fn remove_fancy_hat() {}
}
```

- 这里 `()` 是一种表示空操作的语法，它表明没有要执行的代码。

### 6.3. `if let` 简洁控制流

`match` 表达式非常强大，但在某些情况下，`match` 可能显得过于冗长，尤其是当我们只关心某一具体条件而忽略其他条件时。Rust 提供了 `if let` 作为一种简洁的语法糖，用于简化只关心一种匹配的情况。

#### 使用 `match` 处理 `Option`

考虑下面的例子，我们只关心 `Option` 是 `Some` 的情况：

```rust
fn main() {
    let config_max = Some(3u8);

    match config_max {
        Some(max) => println!("The maximum is configured to be {}", max),
        _ => (), // 忽略其他情况
    }
}
```

这种模式很常见，只关心一种匹配情况而忽略其他所有情况。

#### 使用 `if let` 简化代码

`if let` 可以简化这种模式，只处理一个具体的匹配情况，而忽略其他：

```rust
fn main() {
    let config_max = Some(3u8);

    if let Some(max) = config_max {
        println!("The maximum is configured to be {}", max);
    }
}
```

- `if let Some(max) = config_max` 表示，如果 `config_max` 是 `Some`，则绑定值到 `max`，并执行 `if` 语句块中的代码。
- 如果 `config_max` 是 `None`，则什么也不做。

#### `if let` 和 `else` 结合使用

可以为 `if let` 语句添加一个 `else` 块来处理未匹配的情况。`else` 块的作用等同于 `match` 中的 `_` 通配符：

```rust
#[derive(Debug)]
enum UsState {
    Alabama,
    Alaska,
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

    if let Coin::Quarter(state) = coin {
        println!("State quarter from {state:?}!");
    } else {
        count += 1; // 当不是 Quarter 时，计数器增加
    }
}
```

- 如果 `coin` 是 `Quarter` 变体，则打印州信息；否则，执行 `else` 块中的代码，将 `count` 加1。
