// 7. 使用包、Crate 和模块管理不断增长的项目

// 7.1. 包和 Crate
/*
crate 有两种形式：二进制项和库。二进制项 可以被编译为可执行程序，比如一个命令行程序或者一个 web server。它们必须有一个 main 函数来定义当程序被执行的时候所需要做的事情。目前我们所创建的 crate 都是二进制项。

库 并没有 main 函数，它们也不会编译为可执行程序，它们提供一些诸如函数之类的东西，使其他项目也能使用这些东西。

包（package）是提供一系列功能的一个或者多个 crate。包中可以包含至多一个库 crate(library crate)。包中可以包含任意多个二进制 crate(binary crate)。
*/

// 7.2. 定义模块来控制作用域与私有性

//模块小抄
/*
- 从 crate 根节点开始: 当编译一个 crate, 编译器首先在 crate 根文件（通常，对于一个库 crate 而言是src/lib.rs，对于一个二进制 crate 而言是src/main.rs）中寻找需要被编译的代码。

- 声明模块: 在 crate 根文件中，你可以声明一个新模块；比如，你用mod garden;声明了一个叫做garden的模块。编译器会在下列路径中寻找模块代码：
  - 内联，在大括号中，当mod garden后方不是一个分号而是一个大括号
  - 在文件 src/garden.rs
  - 在文件 src/garden/mod.rs

- 声明子模块: 在除了 crate 根节点以外的其他文件中，你可以定义子模块。比如，你可能在src/garden.rs中定义了mod vegetables;。编译器会在以父模块命名的目录中寻找子模块代码：
  - 内联，在大括号中，当mod vegetables后方不是一个分号而是一个大括号
  - 在文件 src/garden/vegetables.rs
  - 在文件 src/garden/vegetables/mod.rs

- 模块中的代码路径: 一旦一个模块是你 crate 的一部分，你可以在隐私规则允许的前提下，从同一个 crate 内的任意地方，通过代码路径引用该模块的代码。举例而言，一个 garden vegetables 模块下的Asparagus类型可以在crate::garden::vegetables::Asparagus被找到。

- 私有 vs 公用: 一个模块里的代码默认对其父模块私有。为了使一个模块公用，应当在声明时使用pub mod替代mod。为了使一个公用模块内部的成员公用，应当在声明前使用pub。

- use 关键字: 在一个作用域内，use关键字创建了一个成员的快捷方式，用来减少长路径的重复。在任何可以引用crate::garden::vegetables::Asparagus的作用域，你可以通过 use crate::garden::vegetables::Asparagus;创建一个快捷方式，然后你就可以在作用域中只写Asparagus来使用该类型。
```
backyard
├── Cargo.lock
├── Cargo.toml
└── src
    ├── garden
    │   └── vegetables.rs
    ├── garden.rs
    └── main.rs
```

文件名：src/main.rs
*/
use crate::garden::vegetables::Asparagus;

pub mod garden;

fn main() {
    let plant = Asparagus {};
    println!("I'm growing {plant:?}!");
}
/*
pub mod garden;行告诉编译器应该包含在src/garden.rs文件中发现的代码：

文件名：src/garden.rs
```c
pub mod vegetables;
```
在此处， pub mod vegetables;意味着在src/garden/vegetables.rs中的代码也应该被包括。这些代码是：

```c
#[derive(Debug)]
pub struct Asparagus {}
```
*/

// 在模块中对相关代码进行分组
/*
我们可以将函数放置到嵌套的模块中，来使我们的 crate 结构与实际的餐厅结构相同。例如执行 cargo new --lib restaurant，来创建一个新的名为 restaurant 的库。然后，将 src/lib.rs 文件中的代码替换为以下内容：
// src/lib.rs
*/
mod front_of_house {
    mod hosting {
        fn add_to_waitlist() {}

        fn seat_at_table() {}
    }

    mod serving {
        fn take_order() {}

        fn serve_order() {}

        fn take_payment() {}
    }
}
/*
在模块内，我们可以定义其他的模块，就像本例中的 hosting 和 serving 模块。模块还可以保存一些定义的其他项，比如结构体、枚举、常量、特性、或者函数。
通过使用模块，我们可以将相关的定义分组到一起，并指出它们为什么相关。

前面提到了 src/main.rs 和 src/lib.rs 叫做 crate 根。因为这两个文件的内容都分别在 crate 模块结构的根组成了一个名为 crate 的模块，该结构被称为 模块树（module tree）。
```
crate
 └── front_of_house
     ├── hosting
     │   ├── add_to_waitlist
     │   └── seat_at_table
     └── serving
         ├── take_order
         ├── serve_order
         └── take_payment
```
*/

// 7.3. 引用模块项目的路径
mod front_of_house {
    mod hosting {
        fn add_to_waitlist() {}
    }
}

pub fn eat_at_restaurant() {
    // 绝对路径
    crate::front_of_house::hosting::add_to_waitlist();

    // 相对路径
    front_of_house::hosting::add_to_waitlist();
}
/*
第一种方式，我们在 eat_at_restaurant 中调用 add_to_waitlist 函数，使用的是绝对路径。add_to_waitlist 函数与 eat_at_restaurant 被定义在同一 crate 中，这意味着我们可以使用 crate 关键字为起始的绝对路径。

在 crate 后面，我们持续地嵌入模块，直到我们找到 add_to_waitlist。你可以想象出一个相同结构的文件系统，我们通过指定路径 /front_of_house/hosting/add_to_waitlist 来执行 add_to_waitlist 程序。我们使用 crate 从 crate 根开始就类似于在 shell 中使用 / 从文件系统根开始。

第二种方式，我们在 eat_at_restaurant 中调用 add_to_waitlist，使用的是相对路径。这个路径以 front_of_house 为起始，这个模块在模块树中，与 eat_at_restaurant 定义在同一层级。与之等价的文件系统路径就是 front_of_house/hosting/add_to_waitlist。以模块名开头意味着该路径是相对路径。

不过 hosting 模块是私有的，这个例子无法编译通过。在 Rust 中，默认所有项（函数、方法、结构体、枚举、模块和常量）对父模块都是私有的。
可以使用 pub 关键字来创建公共项，使子模块的内部部分暴露给上级模块。
*/

// 使用 pub 关键字暴露路径
// 尝试修改为
mod front_of_house {
    pub mod hosting {
        fn add_to_waitlist() {}
    }
}
/*
仍然有错误，使模块公有并同时使其内容也公有。
add_to_waitlist 函数仍然是私有的。为了修复这个问题，我们需要将 add_to_waitlist 函数也标记为 pub。
*/
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

pub fn eat_at_restaurant() {
    // 绝对路径
    crate::front_of_house::hosting::add_to_waitlist();

    // 相对路径
    front_of_house::hosting::add_to_waitlist();
}
/*
front_of_house 模块不是公有的，不过因为 eat_at_restaurant 函数与 front_of_house 定义于同一模块中（即，eat_at_restaurant 和 front_of_house 是兄弟），我们可以从 eat_at_restaurant 中引用 front_of_house。

接下来是使用 pub 标记的 hosting 模块。我们可以访问 hosting 的父模块，所以可以访问 hosting。最后，add_to_waitlist 函数被标记为 pub ，我们可以访问其父模块，所以这个函数调用是有效的。

查阅 The Rust API Guidelines，了解有关如何设计和文档化你的公共 API 的建议。
*/

// super 开始的相对路径
/*
可以在路径的开头使用 super ，从父模块开始构建相对路径，而不是从当前模块或者 crate 根开始。这类似以 .. 语法开始一个文件系统路径。
*/
fn deliver_order() {}

mod back_of_house {
    fn fix_incorrect_order() {
        cook_order();
        super::deliver_order();
    }

    fn cook_order() {}
}
// 在 fix_incorrect_order 函数中，我们使用 super::deliver_order() 来调用定义在父模块中的 deliver_order 函数。在文件系统中，这相当于在 back_of_house 目录的上一级目录中寻找 deliver_order 函数。

// 创建公有的结构体和枚举
/*
可以使用 pub 来设计公有的结构体和枚举，如果我们在一个结构体定义的前面使用了 pub ，这个结构体会变成公有的，但是这个结构体的字段仍然是私有的。
我们可以根据情况决定每个字段是否公有。
*/
mod back_of_house {
    pub struct Breakfast {
        pub toast: String,
        seasonal_fruit: String,
    }

    impl Breakfast {
        pub fn summer(toast: &str) -> Breakfast {
            Breakfast {
                toast: String::from(toast),
                seasonal_fruit: String::from("peaches"),
            }
        }
    }
}

pub fn eat_at_restaurant() {
    // 在夏天订购一个黑麦土司作为早餐
    let mut meal = back_of_house::Breakfast::summer("Rye");
    // 改变主意更换想要面包的类型
    meal.toast = String::from("Wheat");
    println!("I'd like {} toast please", meal.toast);

    // 如果取消下一行的注释代码不能编译；
    // 不允许查看或修改早餐附带的季节水果
    // meal.seasonal_fruit = String::from("blueberries");
}

/*
toast 字段是公有的，所以我们可以在 eat_at_restaurant 中使用点号来随意的读写 toast 字段。
不能在 eat_at_restaurant 中使用 seasonal_fruit 字段，因为 seasonal_fruit 是私有的。
因为 back_of_house::Breakfast 具有私有字段，所以这个结构体需要提供一个公共的关联函数来构造 Breakfast 的实例 (这里命名为 summer)。
如果 Breakfast 没有这样的函数，我们将无法在 eat_at_restaurant 中创建 Breakfast 实例，因为我们不能在 eat_at_restaurant 中设置私有字段 seasonal_fruit 的值。

如果我们将枚举设为公有，则它的所有成员都将变为公有。*/
mod back_of_house {
    pub enum Appetizer {
        Soup,
        Salad,
    }
}

pub fn eat_at_restaurant() {
    let order1 = back_of_house::Appetizer::Soup;
    let order2 = back_of_house::Appetizer::Salad;
}

// 7.4. 使用 use 关键字将路径引入作用域
// 可以使用 use 关键字创建一个短路径，然后就可以在作用域中的任何地方使用这个更短的名字。
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}
use crate::front_of_house::hosting;
pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
}

// use 只能创建 use 所在的特定作用域内的短路径。
// 将 eat_at_restaurant 函数移动到一个子模块如 customer，错误显示短路径不再适用于 customer 模块。
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

use crate::front_of_house::hosting;

mod customer {
    pub fn eat_at_restaurant() {
        hosting::add_to_waitlist();
    }
}
// 可以将 use 移动到 customer 模块内，或者在子模块 customer 内通过 super::hosting 引用父模块中的这个短路径

// 创建惯用的 use 路径
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

use crate::front_of_house::hosting::add_to_waitlist;

pub fn eat_at_restaurant() {
    add_to_waitlist();
}
// 这样完成了相同的任务
// 但使用 use 将函数引入作用域的习惯用法是将函数的父模块引入作用域，然后使用双冒号 (::) 语法调用函数。
// 这样在调用函数时必须指定父模块，可以清晰地表明函数不是在本地定义的，同时使完整路径的重复度最小化。
// 将 HashMap 结构体引入二进制 crate 作用域的习惯用法：
use std::collections::HashMap;

fn main() {
    let mut map = HashMap::new();
    map.insert(1, 2);
}

// 例外，想要使用 use 语句将两个具有相同名称的项带入作用域。
use std::fmt;
use std::io;

fn function1() -> fmt::Result {
    // --snip--
}

fn function2() -> io::Result<()> {
    // --snip--
}
// 使用父模块可以区分这两个 Result 类型。

// 使用 as 关键字提供新的名称
// 使用 use 将两个同名类型引入同一作用域这个问题还有另一个解决办法：在这个类型的路径后面，我们使用 as 指定一个新的本地名称或者别名。
use std::fmt::Result;
use std::io::Result as IoResult;

fn function1() -> Result {
    // --snip--
}

fn function2() -> IoResult<()> {
    // --snip--
}
// 在第二个 use 语句中，我们选择 IoResult 作为 std::io::Result 的新名称，它与从 std::fmt 引入作用域的 Result 并不冲突。

// 使用 pub use 重导出名称
// 将某个名称导入当前作用域后，这个名称在此作用域中就可以使用了，但它对此作用域之外还是私有的。
// 可以使用 pub use 语句将名称重导出，“重导出（re-exporting）”不仅将一个名称导入了当前作用域，还允许别人把它导入他们自己的作用域
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

pub use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
}
// 现在 pub use 从根模块重导出了 hosting 模块，外部代码现在可以使用路径 restaurant::hosting::add_to_waitlist。

// 使用外部包
/*文件名：Cargo.toml
```
rand = "0.8.5"
```
在 Cargo.toml 中加入 rand 依赖告诉了 Cargo 要从 crates.io 下载 rand 和其依赖，并使其可在项目代码中使用。

接着为了将 rand 定义引入项目包的作用域，我们加入一行 use 起始的包名，它以 rand 包名开头并列出了需要引入作用域的项。*/
use rand::Rng;

fn main() {
    let secret_number = rand::thread_rng().gen_range(1..=100);
}
// crates.io 上有更多 Rust 社区成员发布的包
// std 标准库对于你的包来说也是外部 crate。因为标准库随 Rust 语言一同分发，无需修改 Cargo.toml 来引入 std，不过需要通过 use 将标准库中定义的项引入项目包的作用域中来引用它们，比如我们使用的 HashMap。
use std::collections::HashMap;

// 嵌套路径来消除大量的 use 行
// 如果需要引入嵌套路径中的多个项，可以指定整个路径，然后使用 ::{ } 语法将整个路径中的多个项引入作用域。
use std::cmp::Ordering;
use std::io;
// 等于
use std::{cmp::Ordering, io};
//
use std::io;
use std::io::Write;
// 等于
use std::io::{self, Write};

// 通过 glob 运算符将所有的公有定义引入作用域
// 将一个路径下 所有 公有项引入作用域，可以指定路径后跟 *，glob 运算符
use std::collections::*;
// 使用 glob 运算符时请多加小心！Glob 会使得我们难以推导作用域中有什么名称和它们是在何处定义的。
// 常用于测试模块 tests 中，将所有内容引入作用域

// 7.5. 将模块拆分成多个文件
// 当模块变得更大时，你可能想要将它们的定义移动到单独的文件中，从而使代码更容易阅读。
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

pub use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
}
// 将模块提取到各自的文件中，而不是将所有模块都定义到 crate 根文件中。这里 crate 根文件是 src/lib.rs，不过这个过程也适用于 crate 根文件是 src/main.rs 的二进制 crate。
// 首先将 front_of_house 模块提取到其自己的文件中。删除 front_of_house 模块的大括号中的代码，只留下 mod front_of_house; 声明。
// 文件名：src/lib.rs
mod front_of_house;

pub use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
}
// 接下来将之前大括号内的代码放入一个名叫 src/front_of_house.rs 的新文件中。
// 如前面提到的，编译器找到了 crate 根中名叫 front_of_house 的模块声明，它就知道去搜寻这个文件。
// 文件名：src/front_of_house.rs
pub mod hosting {
    pub fn add_to_waitlist() {}
}
// 只需在模块树中的某处使用一次 mod 声明就可以加载这个文件，项目中的其他文件都可以使用其所声明的位置的路径来引用那个文件的代码。
// 接下来我们同样将 hosting 模块提取到自己的文件中。
// 因为 hosting 是 front_of_house 的子模块而不是根模块，我们将 hosting 的文件放在与模块树中它的父级模块同名的目录中，在这里是 src/front_of_house/。
// 文件名：src/front_of_house.rs
pub mod hosting;
// 文件名：src/front_of_house/hosting.rs
pub fn add_to_waitlist() {}
// 如果将 hosting.rs 放在 src 目录，编译器会认为 hosting 模块中的 hosting.rs 的代码声明于 crate 根，而不是声明为 front_of_house 的子模块。
// src/lib.rs 中的 pub use crate::front_of_house::hosting 语句并未发生改变。
