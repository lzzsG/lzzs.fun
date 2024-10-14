### 9. 错误处理

Rust 的错误处理机制通过类型系统要求开发者显式处理可能出现的错误。

### 9.1. 用 `panic!` 处理不可恢复的错误

当程序遇到无法恢复的严重问题时，可以使用 `panic!` 宏让程序崩溃并打印错误信息。

#### 示例

```rust
fn main() {
    panic!("crash and burn");
}
```

- 当调用 `panic!` 时，程序会停止执行，并在控制台输出一条错误信息，显示 panic 的原因和发生位置。
- `panic!` 适合用来处理程序中无法继续运行的场景。

#### panic! 的 backtrace

通过环境变量 `RUST_BACKTRACE=1`，可以获取详细的调用栈回溯（backtrace），帮助开发者定位错误发生的具体位置。

```rust
fn main() {
    let v = vec![1, 2, 3];
    v[99]; // 越界访问
}
```

如果超出 `vector` 的索引范围，Rust 会触发 `panic!`：

```bash
RUST_BACKTRACE=1 cargo run
```

输出：

```
thread 'main' panicked at 'index out of bounds: the len is 3 but the index is 99', src/main.rs:4:6
stack backtrace:
   0: rust_begin_unwind
   1: core::panicking::panic_fmt
   2: core::panicking::panic_bounds_check
   3: <usize as core::slice::index::SliceIndex<[T]>>::index
   4: core::slice::index::<impl core::ops::index::Index<I> for [T]>::index
```

- **backtrace** 是一个栈帧回溯工具，帮助开发者追踪到 panic 发生的原因和路径。需要在非 `release` 模式下启用才能查看。

### 9.2. 用 `Result` 处理可恢复的错误

Rust 提供了 `Result<T, E>` 枚举，用于处理那些可以被恢复的错误。它表示一个可能的成功结果（`Ok`）或者一个错误结果（`Err`）。

#### `Result` 枚举的定义

```rust
enum Result<T, E> {
    Ok(T),  // 成功时返回的值
    Err(E), // 失败时返回的错误
}
```

- `T` 是成功时返回的值类型。
- `E` 是错误类型，通常是 `std::io::Error` 或者其他自定义错误类型。

#### 使用 `Result` 处理文件操作

```rust
use std::fs::File;

fn main() {
    let greeting_file_result = File::open("hello.txt");

    let greeting_file = match greeting_file_result {
        Ok(file) => file,
        Err(error) => panic!("Problem opening the file: {error:?}"),
    };
}
```

- 通过 `match` 检查 `Result` 的值。如果文件打开成功，返回 `Ok` 中的 `File`；如果失败，触发 `panic!`。

#### 匹配不同类型的错误

有时需要根据不同的错误类型做不同处理。`std::io::ErrorKind` 提供了常见的错误类型枚举，可以用于模式匹配。

```rust
use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let greeting_file_result = File::open("hello.txt");

    let greeting_file = match greeting_file_result {
        Ok(file) => file,
        Err(error) => match error.kind() {
            ErrorKind::NotFound => match File::create("hello.txt") {
                Ok(fc) => fc,
                Err(e) => panic!("Problem creating the file: {e:?}"),
            },
            other_error => {
                panic!("Problem opening the file: {other_error:?}");
            }
        },
    };
}
```

- 通过 `error.kind()` 来检查错误类型。如果文件不存在 (`ErrorKind::NotFound`)，则尝试创建文件。如果是其他错误，仍然使用 `panic!` 终止程序。

#### 使用 `unwrap_or_else` 简化错误处理

Rust 提供了 `Result` 的辅助方法 `unwrap_or_else`，它接受一个闭包，如果 `Result` 是 `Ok`，则返回其中的值；如果是 `Err`，则执行闭包的代码。

```rust
use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let greeting_file = File::open("hello.txt").unwrap_or_else(|error| {
        if error.kind() == ErrorKind::NotFound {
            File::create("hello.txt").unwrap_or_else(|error| {
                panic!("Problem creating the file: {error:?}");
            })
        } else {
            panic!("Problem opening the file: {error:?}");
        }
    });
}
```

- `unwrap_or_else` 方法使得代码更简洁，避免了嵌套的 `match` 语句。

### 9.3. 错误处理：`unwrap` 和 `expect`、错误传播与 `?` 运算符

Rust 提供了强大的错误处理机制，鼓励开发者在编译时处理所有潜在的错误。Rust 的两种错误处理方法——不可恢复的错误通过 `panic!` 处理，可恢复的错误通过 `Result` 处理。在这一部分，我们将介绍如何简化错误处理，传播错误以及使用 `unwrap` 和 `expect` 等便捷方式处理错误。

### `unwrap` 和 `expect`：失败时 `panic` 的简写

`unwrap` 和 `expect` 是处理 `Result` 和 `Option` 类型时的简写方式，它们在遇到错误时会导致程序立即 `panic!`，因此在编写测试、原型代码以及确保不会出现错误时非常方便。

#### `unwrap`

`unwrap` 方法在 `Result` 是 `Ok` 时返回其值，但在 `Result` 是 `Err` 时，它会触发 `panic!` 并打印错误信息。

```rust
use std::fs::File;

fn main() {
    let greeting_file = File::open("hello.txt").unwrap(); // 文件不存在时 panic
}
/* 报错：
thread 'main' panicked at 'called `Result::unwrap()` on an `Err` value: Os { code: 2, kind: NotFound, message: "No such file or directory" }'
*/
```

#### `expect`

`expect` 和 `unwrap` 类似，但可以自定义错误信息，使其更加直观。`expect` 在 `Err` 时会打印用户自定义的错误信息，之后 `panic!`。

```rust
use std::fs::File;

fn main() {
    let greeting_file = File::open("hello.txt").expect("hello.txt should be included in this project");
}
/* 报错：
thread 'main' panicked at 'hello.txt should be included in this project: Error { repr: Os { code: 2, message: "No such file or directory" } }'
*/
```

使用 `expect` 时，可以为用户提供更多信息，特别是在调试或测试过程中，帮助快速定位错误原因。

### 错误传播

有时，处理某个函数中的错误并不是最佳选择，而是将错误返回给调用者，让调用者决定如何处理。这个过程被称为**错误传播**。

#### 传播错误示例

```rust
use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io::Error> {
    let username_file_result = File::open("hello.txt");

    let mut username_file = match username_file_result {
        Ok(file) => file,
        Err(e) => return Err(e), // 传播错误
    };

    let mut username = String::new();

    match username_file.read_to_string(&mut username) {
        Ok(_) => Ok(username),
        Err(e) => Err(e), // 再次传播错误
    }
}
```

- `read_username_from_file` 函数通过 `Result` 返回可能的错误。对于 `File::open` 或 `read_to_string` 的错误，函数不会自己处理，而是将错误返回给调用者。

### `?` 运算符：错误传播的简写

`?` 运算符是错误传播的简化版，它可以自动处理 `Result` 中的 `Ok` 和 `Err` 值。`?` 只能在返回 `Result` 或 `Option` 类型的函数中使用。

#### 使用 `?` 传播错误

```rust
use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io::Error> {
    let mut username_file = File::open("hello.txt")?; // 如果是 Err，直接返回 Err
    let mut username = String::new();
    username_file.read_to_string(&mut username)?;
    Ok(username)
}
```

- 当 `File::open("hello.txt")` 返回 `Ok` 时，`?` 会将 `Ok` 中的值返回，否则直接返回 `Err`，从函数中退出。
- 通过 `?` 可以避免大量的 `match` 语句，简化代码。

#### 使用链式调用和 `?`

```rust
use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io::Error> {
    let mut username = String::new();
    File::open("hello.txt")?.read_to_string(&mut username)?; // 链式调用
    Ok(username)
}
```

- 通过链式调用的方式，代码更加简洁。

### `fs::read_to_string`：Rust 标准库的便捷方法

Rust 提供了一个便捷的函数 `fs::read_to_string`，它可以直接读取文件内容到一个 `String` 中：

```rust
use std::fs;
use std::io;

fn read_username_from_file() -> Result<String, io::Error> {
    fs::read_to_string("hello.txt") // 一行代码代替文件读取和错误处理
}
```

这个函数简化了文件读取的步骤，自动处理了文件打开和读取的过程。

### 哪里可以使用 `?` 运算符

`?` 运算符只能在返回 `Result` 或 `Option` 类型的函数中使用。它的作用是根据 `Ok` 或 `Some` 继续处理结果，如果是 `Err` 或 `None`，则立即返回。

#### 使用 `Option` 和 `?`

```rust
fn last_char_of_first_line(text: &str) -> Option<char> {
    text.lines().next()?.chars().last() // 使用 ? 传播 None
}
```

- 如果 `text.lines().next()` 返回 `None`，函数会立即返回 `None`。

### `main` 函数也可以返回 `Result`

Rust 允许 `main` 函数返回 `Result` 类型，这使得 `main` 函数可以使用 `?` 运算符来处理错误。

```rust
use std::error::Error;
use std::fs::File;

fn main() -> Result<(), Box<dyn Error>> {
    let greeting_file = File::open("hello.txt")?; // 使用 ? 简化错误处理
    Ok(())
}
```

- `Box<dyn Error>` 可以表示任何类型的错误，允许在 `main` 函数中灵活处理错误。

### 何时使用 `panic!` 和 `Result`

- **使用 `panic!` 的场景**：
  - 编写测试代码时，使用 `unwrap` 和 `expect` 可以快速发现错误并终止测试。
  - 当你完全确定代码不会失败时，例如硬编码的值，可以使用 `unwrap` 或 `expect`。
  
  示例：

  ```rust
  use std::net::IpAddr;

  let home: IpAddr = "127.0.0.1".parse().expect("Hardcoded IP address should be valid");
  ```

  在这种情况下，虽然 `parse` 返回的是 `Result`，但我们知道 `"127.0.0.1"` 是有效的 IP 地址，因此直接使用 `expect` 断言解析不会失败。

- **使用 `Result` 的场景**：
  - 当错误是可以恢复的，并且需要进一步处理时，例如文件读写、网络请求、用户输入等场景。

### 自定义类型进行有效性验证

在设计系统时，可以通过自定义类型进行值的约束。例如，可以使用 `Guess` 结构体确保用户输入的数字在合理范围内。

```rust
pub struct Guess {
    value: i32,
}

impl Guess {
    pub fn new(value: i32) -> Guess {
        if value < 1 || value > 100 {
            panic!("Guess value must be between 1 and 100, got {value}.");
        }

        Guess { value }
    }

    pub fn value(&self) -> i32 {
        self.value
    }
}
```

- `Guess::new` 会检查输入值是否在 1 到 100 之间，如果不符合条件，会调用 `panic!`。
- `value` 方法返回内部存储的值，确保了在使用 `Guess` 时，值总是有效的。

#### 使用示例

```rust
fn main() {
    let guess = Guess::new(50); // 合法的输入
    println!("The guess is: {}", guess.value());

    let guess = Guess::new(200); // 非法输入，触发 panic
    println!("The guess is: {}", guess.value());
}
// 输出:
// The guess is: 50
// thread 'main' panicked at 'Guess value must be between 1 and 100, got 200.'
```

通过自定义类型，可以确保数据总是有效，并避免在后续代码中出现无效输入导致的错误。
