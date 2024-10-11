### 7. 使用包、Crate 和模块管理不断增长的项目

在 Rust 中，**包**、**crate** 和 **模块** 是帮助管理大型项目的重要工具。它们提供了一种结构化方式来组织代码，并控制代码的可见性和作用域。随着项目的增长，这种模块化的设计变得尤为重要。

### 7.1. 包和 Crate

**Crate** 是 Rust 中的代码编译单元，分为 **二进制 crate** 和 **库 crate**：

- **二进制 crate** 是可以编译为可执行文件的代码单元，必须包含一个 `main` 函数。
- **库 crate** 提供功能供其他代码调用，不包含 `main` 函数。

**包**（package）是一个或多个 crate 的集合，提供了一组功能。包的根目录中包含 `Cargo.toml` 文件，用于管理包的元数据和依赖。

```bash
package
├── Cargo.toml  # 描述包的依赖和配置
└── src
    ├── main.rs  # 二进制 crate，包含 main 函数
    └── lib.rs   # 库 crate，如果是库项目会有 lib.rs 文件
```

一个包可以包含多个二进制 crate，但只能包含一个库 crate。

### 7.2. 定义模块来控制作用域与私有性

**模块** 是 Rust 中用于组织代码和控制作用域的关键工具。模块不仅允许我们将代码分组，还可以控制模块和其成员的可见性（即是否为其他模块公开）。

#### 模块文件结构

Rust 允许将模块声明放在单独的文件中。我们可以通过 `mod` 关键字声明模块。Rust 编译器会自动在相应的文件路径中查找模块代码。

例如，假设我们有以下模块和文件结构：

```bash
src
├── main.rs         # 包含 crate 根文件
├── front_of_house  # 包含 front_of_house 模块
│   └── hosting.rs  # 包含 front_of_house::hosting 子模块
```

文件 `main.rs` 中可以声明模块 `front_of_house`，Rust 会自动在 `src/front_of_house.rs` 或 `src/front_of_house/mod.rs`（老风格）中查找模块定义。不过我们推荐使用第一种路径，因为它更现代且更直观：

```rust
// src/main.rs
mod front_of_house;  // 声明模块 front_of_house

use crate::front_of_house::hosting;

fn main() {
    hosting::add_to_waitlist(); // 使用模块中的函数
}
```

#### 现代路径 vs 老风格路径

如你所提到的，目前 Rust 推荐在 `src/` 目录下直接创建与模块名相同的文件来声明模块，而不是使用 `mod.rs` 文件。这是 Rust 更现代的模块路径风格。

- **现代风格**：模块 `front_of_house` 的代码会放在 `src/front_of_house.rs`，其子模块 `hosting` 的代码会放在 `src/front_of_house/hosting.rs`。
- **老风格**：`front_of_house` 模块的代码会放在 `src/front_of_house/mod.rs`，子模块 `hosting` 的代码则放在 `src/front_of_house/hosting/mod.rs`。

现代风格更推荐使用，因为它避免了多个 `mod.rs` 文件可能导致的混淆：

```bash
src
├── front_of_house.rs           # front_of_house 模块
└── front_of_house
    └── hosting.rs              # hosting 子模块
```

#### 模块代码示例

假设我们定义了一个 `front_of_house` 模块，并且它有一个子模块 `hosting`。下面是文件结构和代码示例：

```bash
src
├── main.rs                     # 程序入口
└── front_of_house.rs            # front_of_house 模块文件
    └── hosting.rs               # hosting 子模块文件
```

**`main.rs`**：

```rust
mod front_of_house;  // 声明模块

use crate::front_of_house::hosting;

fn main() {
    hosting::add_to_waitlist();  // 调用模块中的函数
}
```

**`front_of_house.rs`**：

```rust
pub mod hosting;  // 声明并公开 hosting 子模块
```

**`hosting.rs`**：

```rust
pub fn add_to_waitlist() {
    println!("Adding to waitlist");
}
```

### 7.3. 引用模块项目的路径

Rust 提供了两种方式来引用模块中的代码：**绝对路径**和**相对路径**。

#### 绝对路径

**绝对路径** 是从 crate 根目录开始的完整路径。你可以通过 `crate::` 开始的路径从 crate 根开始逐级引用模块：

```rust
pub fn eat_at_restaurant() {
    crate::front_of_house::hosting::add_to_waitlist();
}
```

- `crate::front_of_house::hosting::add_to_waitlist` 是绝对路径，从 `crate` 开始，然后是模块的层次结构，直到具体的函数。

#### 相对路径

**相对路径** 是从当前模块的相对位置开始的路径。如果要引用与当前模块同级的模块，或者子模块，可以使用相对路径：

```rust
pub fn eat_at_restaurant() {
    front_of_house::hosting::add_to_waitlist();  // 相对路径
}
```

- `front_of_house::hosting::add_to_waitlist` 是相对路径，因为 `eat_at_restaurant` 和 `front_of_house` 在同一层级。

### 模块的可见性控制

Rust 中的模块默认是 **私有的**，即模块和模块中的项目（如函数、结构体等）默认只能在它们被定义的模块中访问。如果你希望某个模块或项目可以被外部使用，需要使用 `pub` 关键字将它们声明为公共的：

```rust
// 声明公共模块
pub mod hosting {
    // 声明公共函数
    pub fn add_to_waitlist() {
        println!("Adding to waitlist");
    }
}
```

在上面的代码中，`hosting` 模块和 `add_to_waitlist` 函数都使用了 `pub` 关键字声明为公共，因此可以在其他地方调用。

### 使用 `pub` 关键字暴露路径

在 Rust 中，默认情况下模块和其内部的项目（如函数、结构体等）都是**私有的**，即只能在定义它们的模块内访问。如果我们希望模块或其内容能够被外部访问，需要使用 `pub` 关键字将它们声明为**公有的**。

#### 使模块和函数公有

在以下例子中，虽然 `hosting` 模块已经使用了 `pub` 关键字，允许外部模块访问它，但其内部的 `add_to_waitlist` 函数仍然是私有的：

```rust
mod front_of_house {
    pub mod hosting {
        fn add_to_waitlist() {}
    }
}
```

如果我们尝试调用 `add_to_waitlist`，会遇到编译错误。要使函数也可以被外部调用，我们需要将 `add_to_waitlist` 函数也声明为公有：

```rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}
```

这样，`hosting` 模块和 `add_to_waitlist` 函数都被标记为 `pub`，可以在外部模块中访问。

#### 示例：使用绝对路径和相对路径

```rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

pub fn eat_at_restaurant() {
    // 使用绝对路径
    crate::front_of_house::hosting::add_to_waitlist();

    // 使用相对路径
    front_of_house::hosting::add_to_waitlist();
}
```

- **绝对路径**：`crate::front_of_house::hosting::add_to_waitlist()` 从 crate 根开始引用模块。
- **相对路径**：`front_of_house::hosting::add_to_waitlist()` 从当前模块位置引用模块。

在这个例子中，`eat_at_restaurant` 和 `front_of_house` 都在同一个模块内，因此我们可以直接使用相对路径引用 `front_of_house` 模块。而 `hosting` 模块和 `add_to_waitlist` 函数通过 `pub` 关键字变得公有，从而能够在其他地方使用。

### 使用 `super` 关键字

`super` 关键字允许我们从**父模块**开始构建路径，这类似于文件系统中使用 `..` 表示返回上一级目录。它用于在当前模块的父模块中查找定义的项目。

```rust
fn deliver_order() {}

mod back_of_house {
    fn fix_incorrect_order() {
        cook_order();
        super::deliver_order(); // 使用 super 引用父模块的函数
    }

    fn cook_order() {}
}
```

在 `fix_incorrect_order` 函数中，我们使用 `super::deliver_order()` 来调用父模块中的 `deliver_order` 函数。`super` 提供了一种方便的方式来访问父模块中的项目，避免了必须从 crate 根开始的绝对路径。

### 创建公有的结构体和枚举

使用 `pub` 关键字，我们还可以创建**公有的结构体和枚举**，并根据需求控制字段和成员的可见性。

#### 公有结构体的字段控制

在以下例子中，我们使用 `pub` 使 `Breakfast` 结构体公有，但结构体中的字段默认仍然是私有的。我们可以为某些字段单独使用 `pub` 来控制可见性：

```rust
mod back_of_house {
    pub struct Breakfast {
        pub toast: String,        // 公有字段
        seasonal_fruit: String,   // 私有字段
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
    // 订购一个早餐
    let mut meal = back_of_house::Breakfast::summer("Rye");
    // 允许更改公有字段
    meal.toast = String::from("Wheat");
    println!("I'd like {} toast, please", meal.toast);

    // 不允许访问或修改私有字段
    // meal.seasonal_fruit = String::from("blueberries"); // 报错
}
```

- `toast` 字段被标记为 `pub`，因此可以在外部访问和修改。
- `seasonal_fruit` 字段是私有的，无法在 `eat_at_restaurant` 函数中直接访问或修改。

#### 公有枚举的成员控制

与结构体不同的是，如果我们将一个枚举声明为 `pub`，则枚举的所有成员都会自动变成公有的：

```rust
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
```

在这个例子中，`Appetizer` 枚举及其成员 `Soup` 和 `Salad` 都是公有的，可以在外部访问。

### 7.4. 使用 `use` 关键字将路径引入作用域

为了简化路径的使用，Rust 提供了 `use` 关键字，它允许我们将路径引入当前作用域，并通过简化后的路径使用模块中的项目。

#### 使用 `use` 引入路径

```rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist(); // 通过 use 简化后的路径
}
```

在这个例子中，我们通过 `use crate::front_of_house::hosting` 将 `hosting` 模块引入当前作用域。这样在 `eat_at_restaurant` 函数中，我们可以直接使用 `hosting::add_to_waitlist()` 而无需写完整的路径。

#### `use` 的作用域限制

`use` 引入的路径只在声明它的作用域中有效。如果我们将 `eat_at_restaurant` 函数移动到一个子模块中，`use` 的效果就不再适用了：

```rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

use crate::front_of_house::hosting; // 这个路径只在当前作用域有效

mod customer {
    pub fn eat_at_restaurant() {
        hosting::add_to_waitlist(); // 错误：找不到 hosting
    }
}
```

此时，`hosting` 的简化路径在 `customer` 模块中不可见。我们可以选择将 `use` 声明放在 `customer` 模块内部，或者通过 `super::hosting` 访问父模块中的路径：

```rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

mod customer {
    use crate::front_of_house::hosting; // 将 use 放在模块内

    pub fn eat_at_restaurant() {
        hosting::add_to_waitlist(); // 现在可以使用
    }
}
```

通过将 `use` 放入子模块中，`customer` 模块就可以访问 `hosting` 模块中的 `add_to_waitlist` 函数了。

### 创建惯用的 `use` 路径

在 Rust 中，使用 `use` 关键字可以将某个模块、函数或类型的路径引入当前作用域。通过合理地使用 `use`，可以简化代码，避免重复使用长路径。

#### 1. 使用 `use` 引入父模块

惯用的 `use` 方式是将**父模块**引入作用域，而不是直接引入具体的函数或类型。这样在调用函数时，仍需通过父模块来调用，避免与其他模块中的函数重名，并且能够更清楚地表明函数或类型的来源：

```rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist(); // 通过父模块调用函数
}
```

在这种方式中，`use` 引入了 `hosting` 模块，而不是直接引入 `add_to_waitlist` 函数，这样调用时必须通过 `hosting::add_to_waitlist()`，明确指出该函数属于哪个模块。

#### 2. 使用 `as` 关键字提供新名称

当我们需要将两个具有相同名称的类型或函数引入同一作用域时，可以使用 `as` 关键字为其中一个类型或函数提供一个**别名**，避免冲突。

```rust
use std::fmt::Result;
use std::io::Result as IoResult;

fn function1() -> Result {
    // fmt::Result
}

fn function2() -> IoResult<()> {
    // io::Result
}
```

- 这里 `Result` 分别来自 `std::fmt` 和 `std::io`，使用 `as` 将 `std::io::Result` 重命名为 `IoResult`，避免了名称冲突。

#### 3. 使用 `pub use` 进行重导出

有时你可能希望将某个模块中的内容导出，使其在你的库或项目的公共 API 中可用。通过 `pub use`，不仅可以将项目引入当前作用域，还可以使其对外部用户可见。

```rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

pub use crate::front_of_house::hosting;  // 重导出 hosting 模块

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
}
```

- `pub use` 不仅将 `hosting` 模块引入当前作用域，还将其重导出，使外部代码能够使用 `crate::hosting::add_to_waitlist()`。

### 使用外部包

Rust 社区通过 **crates.io** 提供了丰富的开源库和包。通过在 `Cargo.toml` 文件中添加依赖，可以将外部包引入项目中。

#### 1. 添加外部包依赖

例如，添加 `rand` 库用于生成随机数：

```toml
# Cargo.toml
[dependencies]
rand = "0.8.5"
```

在项目中引入 `rand` 库并使用其中的功能：

```rust
use rand::Rng;

fn main() {
    let secret_number = rand::thread_rng().gen_range(1..=100);
    println!("The secret number is: {}", secret_number);
}
```

- 在代码中，通过 `use rand::Rng` 将 `Rng` 引入作用域，然后使用 `thread_rng()` 和 `gen_range()` 生成随机数。

#### 2. 引入标准库中的项

Rust 的标准库 `std` 也是外部 crate，尽管无需在 `Cargo.toml` 中显式声明，但依然需要通过 `use` 将标准库中的项引入作用域。例如：

```rust
use std::collections::HashMap;

fn main() {
    let mut map = HashMap::new();
    map.insert(1, 2);
}
```

- 这里通过 `use std::collections::HashMap` 引入了 `HashMap`，以便在代码中使用。

### 使用嵌套路径简化 `use` 语句

当你需要从同一个模块中引入多个项时，可以使用**嵌套路径**来减少 `use` 语句的数量：

```rust
use std::{cmp::Ordering, io};
// 等价于
use std::cmp::Ordering;
use std::io;
```

- 通过 `{}` 将 `std` 下的多个模块或项一次性引入作用域，减少了重复的 `use` 语句。

类似的，当你需要同时引入模块和它本身时，也可以使用嵌套路径：

```rust
use std::io::{self, Write};
// 等价于
use std::io;
use std::io::Write;
```

- `self` 表示当前模块本身，这种写法简化了多次引用相同模块的情况。

### 使用 `glob` 运算符引入所有公有定义

在某些场景中（如测试模块），你可能想要将模块中的**所有公有项**引入当前作用域。此时可以使用 `glob` 运算符 `*`：

```rust
use std::collections::*;
```

- `glob` 运算符会将 `std::collections` 模块下的所有公有项全部引入当前作用域。虽然它提供了一种快速引入多个定义的方式，但应谨慎使用，因为它会使代码的作用域不够明确，增加调试和维护的难度。

### 7.5. 将模块拆分成多个文件

随着模块的增长，将代码拆分到多个文件中可以提高可读性和可维护性。在 Rust 中，我们可以通过将模块声明和定义分布到不同的文件来实现这种拆分。

#### 1. 拆分模块

假设我们有一个包含 `front_of_house` 模块的项目，我们可以将 `front_of_house` 模块从 `lib.rs` 或 `main.rs` 文件中提取到单独的文件 `src/front_of_house.rs`：

```rust
// src/lib.rs
mod front_of_house;

pub use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
}
```

将 `front_of_house` 模块的定义放入 `src/front_of_house.rs` 文件：

```rust
// src/front_of_house.rs
pub mod hosting;
```

然后，将 `hosting` 模块也提取到 `src/front_of_house/hosting.rs` 文件中：

```rust
// src/front_of_house/hosting.rs
pub fn add_to_waitlist() {}
```

- 通过这种方式，我们将代码结构划分为多个文件，保持了模块的清晰性和代码的组织性。
- 编译器会根据 `mod` 关键字和文件路径自动查找模块的定义，只需在模块树的某处声明一次 `mod` 即可。
