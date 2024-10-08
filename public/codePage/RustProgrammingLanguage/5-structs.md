### 5. 使用结构体组织相关联的数据

在Rust中，**结构体**（`struct`）是一种自定义数据类型，用来将相关的数据组织在一起。通过结构体，我们可以创建一个有意义的组合，以便处理和传递复杂的数据。在这一节中，我们将详细介绍如何定义和使用结构体，包括实例化、字段初始化、更新语法、元组结构体、类单元结构体等。

### 5.1. 结构体的定义和实例化

#### 结构体的定义

一个结构体通常包含多个字段，每个字段都有自己的名称和类型。如下所示，我们定义了一个代表用户信息的结构体`User`：

```rust
struct User {
    username: String,     // 用户名
    email: String,        // 邮箱
    sign_in_count: u64,   // 登录次数
    active: bool,         // 是否激活
}
```

- 结构体中的每个字段都有自己的类型。
- 这里`username`和`email`使用的是`String`类型，`sign_in_count`是`u64`类型，而`active`字段是布尔类型（`bool`）。

#### 结构体的实例化

要创建一个结构体实例，我们可以使用`User`类型，并为每个字段赋值：

```rust
fn main() {
    let mut user1 = User {
        email: String::from("someone@example.com"),
        username: String::from("someusername123"),
        active: true,
        sign_in_count: 1,
    };

    // 更新某个字段
    user1.email = String::from("anotheremail@example.com");

    // 访问字段
    println!("{}", user1.email); // 输出: anotheremail@example.com
}
```

- 使用`let mut`声明`user1`为可变的（`mutable`），这样我们可以通过点运算符来修改字段值，如`user1.email = String::from(...)`。
- 如果结构体实例不可变（如`let user1 = User { ... };`），则无法修改其字段。

#### 构造结构体的函数

为了简化结构体的实例化，我们可以创建一个构造函数，类似于以下`build_user`函数：

```rust
fn build_user(email: String, username: String) -> User {
    User {
        email,                  // 字段名与参数名相同，使用简写
        username,               // 字段名与参数名相同，使用简写
        active: true,           // 默认值
        sign_in_count: 1,       // 默认值
    }
}
```

- 当字段名与参数名相同时，Rust允许使用**字段初始化简写语法**，即`email`和`username`可以省略等号后的重复部分。
- 这样构造函数可以更简洁，易于维护。

### 5.1.2. 使用结构体更新语法

在Rust中，我们可以通过**结构体更新语法**从现有的结构体实例创建新的实例。结构体更新语法允许我们只更改部分字段，并使用其他字段的现有值。

```rust
fn main() {
    let user1 = User {
        email: String::from("someone@example.com"),
        username: String::from("someusername123"),
        active: true,
        sign_in_count: 1,
    };

    let user2 = User {
        email: String::from("another@example.com"),
        ..user1 // 使用user1的剩余字段
    };

    println!("user2 email: {}", user2.email); // 输出: another@example.com
}
```

- `..user1`表示结构体的其余字段将从`user1`中复制过来。
- 需要注意的是，像`String`这样的类型在更新时会**转移所有权**，这意味着`user1`中的`username`字段的所有权将转移到`user2`，因此在此之后不能再使用`user1.username`。

### 5.1.3. 元组结构体

Rust还允许定义**元组结构体**，这种结构体没有命名字段，只有类型。这种结构体非常适合表示简单的、没有具体含义的组合类型，例如颜色或坐标点。

```rust
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

fn main() {
    let black = Color(0, 0, 0); // 创建Color实例
    let origin = Point(0, 0, 0); // 创建Point实例
}
```

- 尽管`Color`和`Point`看起来相同，但它们是不同的类型，不能混用。
- 元组结构体可以像普通元组一样使用下标访问字段，例如`black.0`和`origin.1`。

### 5.1.4. 类单元结构体

**类单元结构体**（unit-like structs）是没有任何字段的结构体。这种结构体类似于空元组，用于实现某些行为或标识类型。例如：

```rust
struct AlwaysEqual;

fn main() {
    let subject = AlwaysEqual; // 创建AlwaysEqual实例
}
```

- 尽管`AlwaysEqual`结构体没有存储任何数据，但它依然是一个合法的类型，稍后我们可以为它实现某些特定的行为（例如实现`trait`）。

### 5.1.5. 结构体数据的所有权

在定义结构体时，选择使用哪种类型存储数据非常重要。通常，结构体内部的字段会拥有其所存储的数据，这样当结构体有效时，字段中的数据也会有效。

```rust
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}
```

- 在上面的例子中，`User`结构体的`username`和`email`字段使用了`String`类型，这意味着它们拥有自己的数据。当`User`实例被销毁时，这些数据也会被销毁。
- 如果使用字符串切片`&str`，则需要考虑**生命周期**（lifetime）问题，即确保引用的字符串在结构体实例的整个生命周期内都有效。

在处理结构体时，Rust的所有权系统和生命周期机制确保了内存安全，这也是Rust区别于其他语言的重要特性之一。

### 5.2. 结构体示例程序：长方形

这一节通过一个计算长方形面积的例子，展示了如何在Rust中使用结构体。结构体能够帮助我们更清晰地组织相关联的数据，尤其是在多字段相关时。我们将逐步通过几种不同的方式重构代码，最终让结构体更加灵活和实用。

#### 初始版本：不使用结构体

最初的版本中，我们直接使用两个变量来表示长方形的宽度和高度，并通过一个简单的函数`area`来计算长方形的面积：

```rust
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
```

这种方式能够解决问题，但有几个不足之处：

- 宽度和高度是相关联的，但是代码中没有体现两者的关联性。
- 随着涉及的参数变多，代码的可维护性和可读性会降低。

#### 5.2.1. 使用元组重构

为了更好地表达长方形的概念，我们可以使用**元组**来将宽度和高度封装在一起。元组能够帮助我们将数据组合成一个整体：

```rust
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
```

虽然元组能够将相关的数据组合在一起，但存在以下问题：

- **缺乏语义信息**：元组中的元素没有名称，只能通过索引访问，这使得代码的可读性较差（如`rectangle.0`和`rectangle.1`无法明确表达哪个是宽度，哪个是高度）。
- **可读性差**：当数据变得复杂时，元组的这种特性会使代码难以理解。

#### 5.2.2. 使用结构体重构：赋予更多意义

为了解决上述问题，我们可以引入**结构体**，为数据提供明确的含义。通过使用结构体，我们可以为每个字段命名，使得代码更加清晰：

```rust
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!(
        "The area of the rectangle is {} square pixels.",
        area(&rect1) // 传入结构体的引用
    );
}

fn area(rectangle: &Rectangle) -> u32 {
    rectangle.width * rectangle.height
}
```

**改进之处**：

- 结构体提供了**命名字段**，我们可以通过字段名称（如`rectangle.width`）明确表示数据的含义，提升了代码的可读性。
- `area`函数接受一个对`Rectangle`的**引用**，这避免了函数调用时所有权的转移。

#### 5.2.3. 通过派生 `Debug` trait 增加调试功能

在Rust中，结构体默认不会实现任何输出格式。要输出结构体的信息，必须为其派生（`derive`）某些trait，例如`Debug`。`Debug` trait允许我们打印出结构体的内容，用于调试目的。

```rust
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

    println!("rect1 is {:?}", rect1);  // 使用 {:?} 输出结构体的调试信息
    println!("rect1 is {:#?}", rect1); // 使用 {:#?} 格式化输出，输出更美观
}
```

- **`{:?}`**：这是Rust的**调试格式化符**，用于打印实现了`Debug` trait的对象。
- **`{:#?}`**：是一种更具**可读性**的格式化输出，输出内容分行显示，更清晰。
  
同时，Rust提供了一个非常方便的调试宏——`dbg!`：

```rust
fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    dbg!(&rect1); // dbg! 宏会打印出文件名、行号、以及变量的值
}
```

- **`dbg!`**：这个宏不仅打印变量的值，还会显示其所在文件和行号，非常适合调试代码。`dbg!`宏会**消耗表达式的所有权**，不过传递引用（如`&rect1`）时不会转移所有权。

#### 将`area`函数和结构体结合

尽管`area`函数能够很好地计算长方形的面积，但它与`Rectangle`结构体是分开的。为了让这个行为与结构体更加紧密地结合，我们可以考虑将`area`函数作为结构体的一部分（方法），以提高代码的结构性和可读性。这将在后面的章节中详细介绍。

### 5.3. 方法语法

在Rust中，**方法（method）**与**函数（function）**类似，都是由`fn`关键字定义的。但是，方法与特定的**类型**（通常是结构体）关联，属于该类型的一个行为。方法的定义需要放在`impl`（implementation）块中，与结构体等类型关联。相比普通函数，方法更紧密地结合数据和行为，从而更清晰地组织代码。

### 5.3.1. 定义方法

让我们通过一个具体的例子来介绍如何在结构体中定义方法。下面的`Rectangle`结构体代表一个长方形：

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    // 定义一个计算面积的方法
    fn area(&self) -> u32 {
        self.width * self.height // 通过self访问结构体的字段
    }

    // 一个简单的返回布尔值的方法
    fn width(&self) -> bool {
        self.width > 0
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area() // 调用方法，自动引用 &self
    );

    if rect1.width() {
        println!("The rectangle has a nonzero width; it is {}", rect1.width);
    }
}
```

- **`impl`块**：方法定义在`impl`块中，`impl`是"implementation"的缩写，表示这个块是用来为结构体实现方法的。
- **`self`参数**：在方法中，`self`代表方法所属的实例。`&self`是一个不可变引用，表示该方法只读取而不修改实例。
- **访问字段**：通过`self.width`和`self.height`可以访问结构体的字段，这类似于在Python中通过`self`访问类成员。

### Getters方法

在Rust中，Rust不会像其他语言一样自动生成"getter"方法（用于访问私有字段的公共方法）。我们可以手动定义getter，以只读方式访问字段：

```rust
impl Rectangle {
    // 返回是否有正宽度
    fn width(&self) -> bool {
        self.width > 0
    }
}
```

这样，我们可以提供一种安全的方式来访问结构体的私有字段，并将其作为类型的公共API的一部分。Getters非常有用，因为你可以将字段设为私有，然后通过公共的getter方法进行访问。

### 5.3.2. -> 运算符到哪去了？

在Rust中，不像C++或其他语言那样使用`->`运算符来解引用对象访问其成员。Rust的**自动引用和解引用**（automatic referencing and dereferencing）特性简化了方法的调用。

例如，以下两种代码是等价的：

```rust
p1.distance(&p2);  // 自动引用
(&p1).distance(&p2);  // 手动引用
```

当调用`rect1.area()`时，Rust会自动将`rect1`转换为`&rect1`（或者在方法定义中需要`&mut self`时自动生成`&mut rect1`）。

### 5.3.3. 带有更多参数的方法

我们还可以为结构体定义接受多个参数的方法，例如比较两个长方形的大小，判断一个长方形是否可以完全包容另一个长方形：

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    // 判断一个长方形是否可以完全包含另一个长方形
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
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
```

- `self` 代表方法调用的实例，`other`是另一个长方形的引用。
- `can_hold` 方法比较两个长方形的宽度和高度，判断当前实例`rect1`是否可以完全包容另一个长方形`rect2`或`rect3`。

### 5.3.4. 关联函数

**关联函数（Associated Functions）**是定义在`impl`块中的函数，但它们并不以`self`作为参数。这意味着它们不需要实例来调用，通常用作**构造器函数**。常见的构造器命名为`new`或其他有意义的名称。要调用关联函数，需要使用`::`语法。

例如，定义一个创建正方形的关联函数`square`：

```rust
impl Rectangle {
    fn square(size: u32) -> Self {
        Self {
            width: size,
            height: size,
        }
    }
}

fn main() {
    let sq = Rectangle::square(30); // 调用关联函数
    println!("Square: {:#?}", sq); // 调试输出正方形
}
```

- **`Self`**：在这里，`Self`指代`Rectangle`类型，使用它来创建并返回一个新实例。
- **关联函数**：`Rectangle::square`是一个关联函数，因为它与`Rectangle`类型相关联但不需要特定的实例。

### 5.3.5. 多个 `impl` 块

Rust允许我们为同一个结构体定义多个`impl`块，这样可以根据功能将不同的方法分组，保持代码结构清晰。例如，我们可以在不同的`impl`块中分别定义普通方法和关联函数：

```rust
impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

impl Rectangle {
    fn square(size: u32) -> Self {
        Self {
            width: size,
            height: size,
        }
    }
}
```
