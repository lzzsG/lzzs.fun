### 4.1. 什么是所有权？

Rust 的所有权系统是其内存管理的核心机制，通过这一机制，Rust可以在编译时保证内存安全，无需垃圾回收器。这部分内容主要介绍了所有权的规则、变量作用域、内存管理以及如何通过所有权转移和复制来管理数据。

#### 所有权规则

所有权的规则在Rust中非常简单但却非常有效：

1. **每个值在Rust中都有一个所有者**：每个数据（值）只能有一个所有者，这个所有者通常是一个变量。
2. **一个值在任何时候只能有一个所有者**：如果一个值的所有权被转移到另一个变量，原来的变量将不再持有该值。
3. **当所有者离开作用域时，值将被丢弃**：当一个变量离开作用域时，Rust会自动调用`drop`函数释放该变量占用的内存。

#### 变量作用域

变量作用域决定了变量何时创建、使用以及何时被丢弃。例如：

```rust
{
    let s = "hello"; // s 进入作用域
    // 在这个作用域内，s 是有效的
} // s 离开作用域并被丢弃
```

- 在大括号内定义的变量`let s = "hello"`在作用域结束时会自动被丢弃。Rust 会自动处理内存的分配和释放，避免了内存泄漏的风险。

#### String 类型与内存管理

`String`类型是Rust中一个可变的、堆分配的字符串类型，它与基本类型`&str`不同，`String`是动态分配的，在堆上分配空间，因此需要更复杂的内存管理：

```rust
let mut s = String::from("hello");
s.push_str(", world!"); // 可变的字符串拼接
println!("{}", s); // 输出 "hello, world!"
```

#### 移动与克隆

**移动（Move）** 是Rust中所有权的核心概念。当将一个变量赋值给另一个变量时，所有权会被移动：

```rust
let s1 = String::from("hello");
let s2 = s1; // s1 的所有权被转移到 s2
// println!("{}", s1); // 错误！s1 已经失去所有权
```

此时，`s1`不再有效，访问它将导致编译错误。

**克隆（Clone）** 则创建一个数据的完整拷贝，而不是移动所有权：

```rust
let s1 = String::from("hello");
let s2 = s1.clone(); // 复制数据，而不是转移所有权
println!("s1 = {}, s2 = {}", s1, s2); // 输出两个值
```

#### 拷贝（Copy）

对于简单的类型，如`i32`等，它们实现了`Copy` trait，可以直接复制其值，而不涉及所有权的转移：

```rust
let x = 5;
let y = x; // x 被拷贝到 y
println!("x = {}, y = {}", x, y); // 正常工作
```

`i32`等基本类型会被自动复制，不会引发所有权转移的问题。

### 所有权与函数

当你将一个变量传递给函数时，所有权可能会发生转移：

```rust
fn takes_ownership(some_string: String) {
    println!("{}", some_string);
} // some_string 在函数结束后被释放

fn makes_copy(some_integer: i32) {
    println!("{}", some_integer);
} // i32 是 Copy 类型，值不会转移，只会复制
```

- 如果传入的参数是一个`String`类型的值，那么它的所有权会转移到函数内部，并在函数结束时被释放。
- 如果传入的是一个基本类型（如`i32`），因为这些类型实现了`Copy` trait，所以它们会被复制，而不涉及所有权转移。

#### 返回值与所有权

函数的返回值也会转移所有权：

```rust
fn gives_ownership() -> String {
    let some_string = String::from("hello");
    some_string // 返回时，所有权被转移
}

fn takes_and_gives_back(a_string: String) -> String {
    a_string // 返回传入的字符串，所有权重新转移
}
```

在这些函数中，所有权从函数内部的变量转移到外部调用者的变量。

### 4.2. 引用与借用

**引用（Reference）** 允许你借用值的所有权而不实际取得它。通过使用引用，你可以在不转移所有权的情况下访问数据：

```rust
fn main() {
    let s1 = String::from("hello");

    let len = calculate_length(&s1); // 借用 s1

    println!("The length of '{}' is {}.", s1, len); // s1 仍然有效
}

fn calculate_length(s: &String) -> usize { // & 表示引用
    s.len() // 返回字符串的长度
}
```

- `&s1`创建了一个对`s1`的引用，函数`calculate_length`通过引用访问`s1`，而不是移动所有权。引用的好处是，借用期间，原变量仍然可以使用。

**借用（Borrowing）** 是指通过引用访问变量的行为，它不会取得所有权，因此当借用结束时，原值仍然可以使用。

#### 可变引用

Rust中的可变引用允许修改借用的值：

```rust
let mut s = String::from("hello");
change(&mut s); // 可变引用

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```

但在同一作用域中，Rust只允许同时存在一个可变引用，或者多个不可变引用，不能同时存在可变和不可变引用。这避免了数据竞争：

```rust
let r1 = &mut s;
// let r2 = &mut s; // 错误！不能同时存在两个可变引用
```

#### 悬垂引用

Rust通过其严格的所有权和引用规则避免了**悬垂引用**，即指向已被释放内存的引用。如下代码会引发编译错误：

```rust
fn dangle() -> &String {
    let s = String::from("hello");
    &s // 错误：s 在这里被释放，其引用无效
}
```

在这种情况下，应该直接返回`String`，而不是引用：

```rust
fn dangle() -> String {
    let s = String::from("hello");
    s // 正确：返回所有权，而不是引用
}
```

### 4.3. Slice 类型

在Rust中，`Slice`（切片）是一种非常强大的数据类型，允许引用集合（如字符串、数组）中的一部分，而不会占用额外的内存。这种机制使得我们可以更高效地操作数据集合的某些部分，而无需拷贝数据。在这一节中，我们通过几个例子来逐步理解Slice的使用和优势。

#### 引入：没有使用 Slice 的字符串子串查找

首先，我们来看看如果不使用`slice`，如何在字符串中查找第一个单词。这是通过一个函数`first_word`实现的，该函数返回第一个空格出现的位置：

```rust
fn first_word(s: &String) -> usize {
    let bytes = s.as_bytes(); // 将字符串转换为字节数组

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' { // 检测空格字符
            return i;
        }
    }

    s.len() // 如果没有空格，则返回字符串的长度
}
```

这个函数接受一个`String`类型的引用，通过迭代字符串中的每个字节找到第一个空格的索引。然而，它的问题在于，如果我们对字符串进行了修改（如清空字符串），之前的索引将变得无效。这可能会导致程序出现错误。

```rust
fn main() {
    let mut s = String::from("hello world");
    let word = first_word(&s); // word 现在是 5
    s.clear(); // 这清空了字符串

    // 虽然 word 是 5，但字符串已经清空，再使用 word 会产生错误
    println!("the first word is: {}", word); // 错误！因为 s 已经被修改
}
```

#### 使用字符串 Slice 改进

为了避免上述问题，可以使用`Slice`，它允许我们安全地引用字符串的部分，而不会使索引无效：

```rust
fn main() {
    let s = String::from("hello world");

    let hello = &s[..5];  // "hello"
    let world = &s[6..];  // "world"
}
```

这里，`&s[..5]`表示一个从0到5（不包括5）的字符串切片，`&s[6..]`表示从第6个字符到字符串结束的切片。`Slice`引用的是原始数据的一个部分，这比返回一个索引更加灵活和安全。

#### 改进 `first_word` 函数

我们可以通过使用字符串`slice`来重写`first_word`函数，让它返回一个`&str`而不是`usize`，这样即使原字符串被清空或修改，也不会产生无效的索引问题：

```rust
fn first_word(s: &String) -> &str {
    let bytes = s.as_bytes(); // 将字符串转换为字节数组

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i]; // 返回从0到空格的slice
        }
    }

    &s[..] // 如果没有空格，返回整个字符串的slice
}
```

这样，`first_word`会返回字符串的一个片段，而不是索引，避免了潜在的错误。

#### 处理修改后的字符串

但在上面的例子中，如果我们修改了原字符串，这仍然会产生问题。Rust的借用规则不允许在有一个不可变引用存在的同时对变量进行可变修改。这是因为这样会导致数据竞争：

```rust
fn main() {
    let mut s = String::from("hello world");

    let word = first_word(&s);
    s.clear(); // 错误！尝试修改s，但s已经被借用
    println!("the first word is: {}", word);
}
```

上面的代码会产生编译错误，因为`first_word`对`s`进行了不可变借用，而后我们又尝试通过`s.clear()`来修改`s`，这是不被允许的。Rust通过这些规则避免了潜在的内存错误。

#### 字符串字面值就是 Slice

字符串字面值本身就是`&str`类型的切片，不需要再创建新的切片。我们可以直接传递字符串字面值给`first_word`函数：

```rust
fn main() {
    let s = "hello world"; // 字符串字面值，&str类型

    let word = first_word(&s[..]); // 传递 &str
    let word = first_word(s); // 直接传递 &str
}
```

这种方式让我们可以灵活地处理`String`和`&str`类型的数据。

#### 处理数组 Slice

`Slice`不仅仅适用于字符串。Rust允许我们对任何类型的数组创建`slice`，例如：

```rust
fn main() {
    let a = [1, 2, 3, 4, 5];

    let slice = &a[1..3]; // 返回数组的切片，类型为 &[i32]
    assert_eq!(slice, &[2, 3]);
}
```

这段代码展示了如何对整数数组进行切片，`slice`引用了原始数组中的部分内容，而没有创建新的数组。

#### 改进后的 `first_word` 函数

通过使用切片，我们可以进一步改进`first_word`函数，使其能够处理`String`和`&str`类型的数据，并且通过Rust的`deref coercion`特性自动进行类型转换：

```rust
fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }

    &s[..]
}
```

在这个版本中，`first_word`不再仅限于接受`String`类型，它可以接受任何`&str`类型的数据。这让函数更加通用。

<details>
  <summary>
  关于 字符串字面值、String类型、字符串切片和字符串引用等 点击展开
  </summary>
在Rust中，处理字符串涉及到多个概念，包括**字符串字面值**、**`String`类型**、**字符串切片**和**字符串引用**等。理解这些概念对于在Rust中高效、安全地操作字符串至关重要。我们将逐一解释这些相关概念，并讨论它们的区别和使用场景。

### 1. 字符串字面值（String Literal）

**字符串字面值**是Rust中最简单的字符串类型，通常以双引号包围的文本形式出现，如`"hello world"`。字符串字面值是**不可变的**，其类型是`&str`，代表的是对编译时静态分配的字符串的引用。

```rust
fn main() {
    let s = "hello, world"; // s 是一个字符串字面值，类型是 &str
}
```

#### 特点

- **静态分配**：字符串字面值保存在程序的二进制文件中，程序运行时不会在堆上分配内存。
- **不可变**：字符串字面值是不可变的，无法修改。
- **类型**：它的类型是`&str`，表示的是对固定内容的引用。
  
**使用场景**：适合表示简单的、固定的文本，例如日志信息、静态提示等。

### 2. `String` 类型

**`String`类型**是Rust提供的动态字符串类型，适合需要在运行时创建或修改的字符串。`String`类型的字符串存储在**堆**上，并且可以**动态扩展**。

```rust
fn main() {
    let mut s = String::from("hello"); // 使用 String::from 创建一个可变的 String
    s.push_str(", world!"); // 动态修改字符串
    println!("{}", s); // 输出 "hello, world!"
}
```

#### 特点

- **堆分配**：`String`类型在堆上分配内存，可以在程序运行时动态调整大小。
- **可变性**：`String`可以是可变的（通过`mut`关键字），可以对其进行追加、修改等操作。
- **所有权**：`String`遵循Rust的所有权规则，当变量的作用域结束时，字符串会自动释放堆上的内存。

**使用场景**：适用于需要动态构建或修改的字符串，例如从用户输入生成的文本、动态拼接的字符串等。

### 3. 字符串切片（String Slice）

**字符串切片**是`&str`类型的字符串，它是对`String`或字符串字面值的部分引用，表示字符串的一部分，而不是整个字符串。切片的本质是**借用了字符串的一部分**，并不拥有其所有权。

```rust
fn main() {
    let s = String::from("hello world");

    let hello = &s[0..5]; // hello 是 "hello"
    let world = &s[6..]; // world 是 "world"
}
```

#### 特点

- **不可变引用**：`&str`是不可变的，它只是指向原始字符串中的某个部分，不可以修改。
- **零拷贝**：字符串切片不会复制数据，而是引用原始数据，这使得它在处理大字符串时非常高效。
- **有效性**：`&str`切片的有效范围受限于原始字符串的生命周期。如果原始字符串被修改或清空，切片将变得无效。

#### `&str` 类型的字符串切片可以从

- 字符串字面值（如`"hello world"`）获取；
- `String` 类型字符串获取，如通过`&s[..]`创建一个对整个字符串的切片。

**使用场景**：当只需要使用字符串的一部分，或者需要高效地访问和操作大字符串时，使用切片非常合适。

### 4. 字符串引用（String Reference）

**字符串引用**可以指的是对`String`或`&str`的引用。我们可以通过不可变引用`&String`或`&str`来引用字符串而不拥有其所有权。

```rust
fn main() {
    let s = String::from("hello world");
    let s_ref: &String = &s; // 不可变引用 &String
    println!("{}", s_ref);
    
    let slice: &str = &s[..]; // 字符串切片 &str
    println!("{}", slice);
}
```

#### 特点

- **不可变引用**：通过`&String`或`&str`引用字符串，可以避免所有权的转移，同时允许对字符串进行只读操作。
- **灵活性**：由于Rust的`deref coercion`特性，`&String`可以自动转换为`&str`，因此在许多函数调用中可以同时接受`String`和`&str`类型的参数。

**使用场景**：当需要传递或引用字符串而不希望获得其所有权时，使用字符串引用。特别是在需要避免不必要的拷贝时，引用能够大幅提升效率。

### 5. `&str` 与 `String` 的关系

Rust中有一个重要的特性叫做**自动解引用**（`deref coercion`），它使得`&String`可以自动转换为`&str`。因此，你可以在很多地方传递`String`的引用给一个接受`&str`的函数，而无需显式地进行转换。

```rust
fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }

    &s[..]
}

fn main() {
    let my_string = String::from("hello world");

    // first_word 可以接受 String 的引用
    let word = first_word(&my_string);

    // 也可以接受字符串字面值
    let word = first_word("hello world");
}
```

### 6. 总结：关键区别

- **`String`类型**：
  - 动态分配内存，可以在运行时修改和扩展。
  - 存储在堆上。
  - 遵循所有权规则，当变量离开作用域时会自动释放内存。

- **字符串字面值（`&str`）**：
  - 静态分配，不可变。
  - 是对已知长度字符串的引用。
  - 非堆分配，通常是静态嵌入程序中的。

- **字符串切片（`&str`）**：
  - 是对`String`或字符串字面值的部分引用。
  - 不拥有数据，且只能对原数据进行只读访问。
  - 灵活且高效，因为它不会复制数据。

- **字符串引用（`&String`）**：
  - 是对`String`的不可变引用，可以避免所有权转移，适合传递和使用较大的字符串。
  - `&String`可以通过解引用自动转换为`&str`。

Rust通过这些不同的字符串类型和切片提供了灵活的内存管理方案，既可以高效处理小型静态字符串，也可以处理大型动态字符串，同时严格遵循所有权和借用规则，确保内存安全和性能。

</details>
