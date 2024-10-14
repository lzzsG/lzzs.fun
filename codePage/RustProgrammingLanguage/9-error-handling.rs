// 9. 错误处理
// Rust 要求你承认错误的可能性，并在你的代码编译前采取一些行动。
// Rust 的 Result<T, E> 类型，用于处理可恢复的错误。panic! 宏让程序遇到不可恢复的错误时停止执行。

// 9.1. 用 panic! 处理不可恢复的错误
fn main() {
    panic!("crash and burn"); // panic! 宏会停止程序，打印一个错误信息，然后清理运行时资源。
}
/* 输出：
thread 'main' panicked at src/main.rs:2:5:
crash and burn
*/

// 使用 panic! 的 backtrace
fn main() {
    let v = vec![1, 2, 3];

    v[99];
}
// 尝试读取数据结构之后的值是未定义行为，为了保护程序远离这类漏洞，如果尝试读取一个索引不存在的元素，Rust 会停止执行并拒绝继续。
/* 输出：
thread 'main' panicked at src/main.rs:4:6:
index out of bounds: the len is 3 but the index is 99
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
说明（note）行提醒我们可以设置 RUST_BACKTRACE 环境变量来得到一个 backtrace。
$ RUST_BACKTRACE=1 cargo run

thread 'main' panicked at 'index out of bounds: the len is 3 but the index is 99', src/main.rs:4:5

stack backtrace:
   0: rust_begin_unwind
             at /rustc/e092d0b6b43f2de967af0887873151bb1c0b18d3/library/std/src/panicking.rs:584:5
   1: core::panicking::panic_fmt
             at /rustc/e092d0b6b43f2de967af0887873151bb1c0b18d3/library/core/src/panicking.rs:142:14
   2: core::panicking::panic_bounds_check
             at /rustc/e092d0b6b43f2de967af0887873151bb1c0b18d3/library/core/src/panicking.rs:84:5
   3: <usize as core::slice::index::SliceIndex<[T]>>::index
             at /rustc/e092d0b6b43f2de967af0887873151bb1c0b18d3/library/core/src/slice/index.rs:242:10
   4: core::slice::index::<impl core::ops::index::Index<I> for [T]>::index
             at /rustc/e092d0b6b43f2de967af0887873151bb1c0b18d3/library/core/src/slice/index.rs:18:9
   5: <alloc::vec::Vec<T,A> as core::ops::index::Index<I>>::index
             at /rustc/e092d0b6b43f2de967af0887873151bb1c0b18d3/library/alloc/src/vec/mod.rs:2591:9
   6: panic::main
             at ./src/main.rs:4:5
   7: core::ops::function::FnOnce::call_once
             at /rustc/e092d0b6b43f2de967af0887873151bb1c0b18d3/library/core/src/ops/function.rs:248:5
note: Some details are omitted, run with `RUST_BACKTRACE=full` for a verbose backtrace.

*/
// 为了获取带有这些信息的 backtrace，必须启用 debug 标识。当不使用 --release 参数运行 cargo build 或 cargo run 时，Rust 会默认启用 debug 标识。

// 9.2. 用 Result 处理可恢复的错误
// 大部分错误并没有严重到需要程序完全停止执行。
// 回忆 Result 枚举，它定义有如下两个成员，Ok 和 Err：
enum Result<T, E> {
    Ok(T),
    Err(E),
}
// T 代表成功时返回的 Ok 成员中的数据的类型，而 E 代表失败时返回的 Err 成员中的错误的类型。
use std::fs::File;

fn main() {
    let greeting_file_result = File::open("hello.txt");
}
// File::open 函数返回一个 Result<T, E>，其中 T 是 std::fs::File，而 E 是 std::io::Error。
// File::open 函数需要一个方法在告诉我们成功与否的同时返回文件句柄或者错误信息。这些信息正好是 Result 枚举所代表的。

use std::fs::File;

fn main() {
    let greeting_file_result = File::open("hello.txt");

    let greeting_file = match greeting_file_result {
        Ok(file) => file,
        Err(error) => panic!("Problem opening the file: {error:?}"),
    };
}
// 使用 match 语句可以检查 Result 的值，如果 Result 是 Ok，则返回 Ok 成员中的值，否则调用 panic! 宏返回 Err 成员中的值。

// 匹配不同的错误
// 如果我们希望的是对不同的错误原因采取不同的行为：
// 如果 File::open 因为文件不存在而失败，我们希望创建这个文件并返回新文件的句柄。如果 File::open 因为任何其他原因失败，例如没有打开文件的权限，我们仍然希望 panic!。
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
// io::Error，它是一个标准库中提供的结构体。这个结构体有一个返回 io::ErrorKind 值的 kind 方法可供调用。io::ErrorKind 是一个枚举，它定义了所有可能的错误条件。例如，NotFound 和 PermissionDenied 都是 io::ErrorKind 的变体。
// 内层 match 中检查的条件是 error.kind() 的返回值是否为 ErrorKind的 NotFound 成员。如果是，则尝试通过 File::create 创建文件。然而因为 File::create 也可能会失败，还需要增加一个内层 match 语句。

// 第十三章会介绍闭包，它允许我们更简洁地处理错误。
use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let greeting_file = File::open("hello.txt").unwrap_or_else(|error| {
        if error.kind() == ErrorKind::NotFound {
            File::create("hello.txt").unwrap_or_else(|error| {
                panic!("Problem creating the file: {:?}", error);
            })
        } else {
            panic!("Problem opening the file: {:?}", error);
        }
    });
}
// unwrap_or_else 方法接受一个闭包作为参数。如果 Result 是 Ok，则 unwrap_or_else 会返回 Ok 中的值。如果 Result 是 Err，则 unwrap_or_else 会将 Err 中的值作为参数传递给闭包，并返回闭包的返回值。

// 失败时 panic 的简写：unwrap 和 expect
// unwrap 方法在 Result 是 Ok 时返回 Ok 中的值，在 Result 是 Err 时调用 panic! 宏并打印出错误信息。
use std::fs::File;

fn main() {
    let greeting_file = File::open("hello.txt").unwrap();
}
/* 报错：
thread 'main' panicked at 'called `Result::unwrap()` on an `Err` value: Os {
code: 2, kind: NotFound, message: "No such file or directory" }',
src/main.rs:4:49
*/
// expect 方法与 unwrap 类似，唯一的区别是 expect 接受一个错误信息作为参数，当 Result 是 Err 时，expect 会打印出我们指定的错误信息而不是自动生成的错误信息。
use std::fs::File;

fn main() {
    let greeting_file =
        File::open("hello.txt").expect("hello.txt should be included in this project");
}
/* 报错：
thread 'main' panicked at 'hello.txt should be included in this project: Error
{ repr: Os { code: 2, message: "No such file or directory" } }',
src/libcore/result.rs:906:4
*/

// 传播错误
// 调用一些可能会失败的操作的函数时，除了在这个函数中处理错误外，还可以选择让调用者知道这个错误并决定该如何处理。这被称为 传播（propagating）错误。
use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io::Error> {
    let username_file_result = File::open("hello.txt");

    let mut username_file = match username_file_result {
        Ok(file) => file,
        Err(e) => return Err(e),
    };

    let mut username = String::new();

    match username_file.read_to_string(&mut username) {
        Ok(_) => Ok(username),
        Err(e) => Err(e),
    }
}
// 如果 File::open 返回 Err，则 read_username_from_file 函数会立即返回相同的 Err 值。这被称为传播错误。如果 File::open 返回 Ok，则 read_username_from_file 函数会继续执行，并将 File 的值绑定到 username_file 变量上。
// 如果 read_to_string 返回 Err，则 read_username_from_file 函数会立即返回相同的 Err 值。如果 read_to_string 返回 Ok，则 read_username_from_file 函数会返回 Ok(username)，其中 username 是 read_to_string 放入 username 变量的值。

// 传播错误的简写：? 运算符
use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io::Error> {
    let mut username_file = File::open("hello.txt")?;
    let mut username = String::new();
    username_file.read_to_string(&mut username)?;
    Ok(username)
}
// ? 运算符只能用于返回 Result 类型的函数。如果 Result 是 Ok，则 ? 运算符会返回 Ok 中的值。如果 Result 是 Err，则 ? 运算符会返回 Err 中的值，并立即从当前函数返回。

// 可以在 ? 之后直接使用链式方法调用来进一步缩短代码。
use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result<String, io::Error> {
    let mut username = String::new();

    File::open("hello.txt")?.read_to_string(&mut username)?;

    Ok(username)
}

// Rust 提供了名为 fs::read_to_string 的函数，它会打开文件、新建一个 String、读取文件的内容，并将内容放入 String，接着返回它。
use std::fs;
use std::io;

fn read_username_from_file() -> Result<String, io::Error> {
    fs::read_to_string("hello.txt")
}

// 哪里可以使用 ? 运算符
// ? 运算符只能用于返回 Result 或 Option 类型的函数。
// 如果 Result 或是 Ok，则 ? 运算符会返回 Ok 中的值。如果 Result 是 Err，则 ? 运算符会返回 Err 中的值，并立即从当前函数返回。
// 如果 Option 是 Some，则 ? 运算符会返回 Some 中的值。如果 Option 是 None，则 ? 运算符会返回 None，并立即从当前函数返回。
fn last_char_of_first_line(text: &str) -> Option<char> {
    text.lines().next()?.chars().last()
}
// ? 运算符不会自动将 Result 转化为 Option，反之亦然；在这些情况下，可以使用类似 Result 的 ok 方法或者 Option 的 ok_or 方法来显式转换。

// main 函数也可以返回 Result<(), E>
use std::error::Error;
use std::fs::File;

fn main() -> Result<(), Box<dyn Error>> {
    let greeting_file = File::open("hello.txt")?;

    Ok(())
}
// 可以将 Box<dyn Error> 理解为 “任何类型的错误”。在返回 Box<dyn Error> 错误类型 main 函数中对 Result 使用 ? 是允许的，因为它允许任何 Err 值提前返回。

// 9.3. 要不要 panic!
// 示例、代码原型和测试都非常适合 panic
// 在我们准备好决定如何处理错误之前，unwrap和expect方法在原型设计时非常方便。
// 在编写测试时，我们希望测试失败时程序 panic，这样就知道测试没有通过。
// 在代码原型中，我们可能希望某些函数 panic，这样就可以专注于编写其余代码。在编写完原型后，我们可以添加错误处理，而不是将所有可能出错的函数都 panic。

// 当我们比编译器知道更多的情况
// 当你有一些其他的逻辑来确保 Result 会是 Ok 值时，调用 unwrap 或者 expect 也是合适的，虽然编译器无法理解这种逻辑。
use std::net::IpAddr;

let home: IpAddr = "127.0.0.1"
    .parse()
    .expect("Hardcoded IP address should be valid");
// 在这个例子中，我们比编译器知道更多的情况：我们知道 "127.0.0.1" 是一个有效的 IP 地址。
//  parse 方法的返回值类型仍然是一个 Result 值，而编译器仍然会要求我们处理这个 Result。
// 但在这种情况下，我们确定 parse 方法不会失败，因此我们使用 expect 方法来断言这一点。如果 parse 方法确实失败，expect 会打印出我们提供的错误信息，并使程序 panic。

// 创建自定义类型进行有效性验证
// 修改第二章的猜数字游戏，我们使用一个名为 Guess 的结构体来存储用户猜测的数字。我们希望用户猜测的数字在 1 和 100 之间，因此我们可以在 Guess 结构体中实现一个方法来验证这一点。
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
// new 函数检查 value 是否在 1 和 100 之间。如果不是，则调用 panic! 宏，并打印出一个错误信息。如果 value 在 1 和 100 之间，则 new 函数会创建一个新的 Guess 实例并返回它。
// value 方法返回 Guess 结构体中存储的值。
// 在 main 函数中，我们使用 Guess::new 函数来创建一个新的 Guess 实例，并使用 expect 方法来处理可能出现的错误。
// 如果 Guess::new 函数 panic，则 expect 方法会打印出错误信息，并使程序 panic。如果 Guess::new 函数成功，则 expect 方法会返回 Guess 实例中的值。
fn main() {
    let guess = Guess::new(50);
    println!("The guess is: {}", guess.value());
    let guess = Guess::new(200);
    println!("The guess is: {}", guess.value());
}
// The guess is: 50
// thread 'main' panicked at 'Guess value must be between 1 and 100, got 200.', src/main.rs:
