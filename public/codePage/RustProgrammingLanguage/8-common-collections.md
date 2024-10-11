### 8. 常见集合

Rust 中的集合类型用于存储多个值，与固定大小的数组不同，集合类型的数据是存储在堆上的，数据的数量可以动态增长或缩减。Rust 提供了几个常见的集合类型，其中最常用的包括 `Vector`（向量）、字符串（`String`）和哈希表（`HashMap`）。这些集合在标准库中实现，并且都能高效地管理动态数据。

### 8.1. 使用 `Vector` 存储列表

`Vec<T>`（通常称为 vector）是一个动态数组，它允许存储多个相同类型的值，并且这些值在内存中是彼此相邻存储的。`Vector` 的大小可以在运行时动态调整，非常适合存储和处理可变数量的数据。

#### 8.1.1. 新建 `Vector`

可以通过调用 `Vec::new()` 创建一个空的 `vector`。由于没有立即插入数据，因此需要显式指定元素的类型：

```rust
let v: Vec<i32> = Vec::new();
```

也可以使用 `vec!` 宏直接创建并初始化 `vector`：

```rust
let v = vec![1, 2, 3]; // 类型自动推断为 Vec<i32>
```

#### 8.1.2. 更新 `Vector`

`vector` 是可变的，因此可以通过 `push` 方法在 `vector` 末尾插入新元素：

```rust
let mut v = Vec::new();
v.push(5);
v.push(6);
v.push(7);
v.push(8);
```

#### 8.1.3. 读取 `Vector` 中的元素

可以通过索引或 `get` 方法读取 `vector` 中的元素：

```rust
let v = vec![1, 2, 3, 4, 5];

// 使用索引访问
let third: &i32 = &v[2];
println!("The third element is {}", third);

// 使用 get 方法访问
match v.get(2) {
    Some(third) => println!("The third element is {}", third),
    None => println!("There is no third element."),
}
```

- 使用索引访问时，如果索引超出范围会导致程序 **panic**：

  ```rust
  let does_not_exist = v[100]; // 直接 panic
  ```

- 使用 `get` 方法时返回 `Option`，如果元素不存在，返回 `None`，不会导致 panic：

  ```rust
  let does_not_exist = v.get(100); // 返回 None
  ```

#### 借用规则：不能同时存在可变和不可变引用

Rust 的借用规则规定，同一时间只能存在一个可变引用或任意多个不可变引用，不能混合使用。下面的代码违反了这个规则，因为在借用了 `v[0]` 的不可变引用后，还尝试对 `vector` 进行可变操作：

```rust
let mut v = vec![1, 2, 3, 4, 5];
let first = &v[0];
v.push(6); // 错误：可变借用和不可变借用同时存在
```

向 `vector` 添加元素可能会导致重新分配内存，因此之前的引用可能会指向无效的数据。Rust 的借用规则防止了这种潜在的内存错误。

#### 8.1.4. 遍历 `Vector` 的元素

使用 `for` 循环可以遍历 `vector` 中的元素：

```rust
let v = vec![100, 32, 57];

// 遍历不可变引用
for i in &v {
    println!("{i}");
}

// 遍历可变引用并修改元素
let mut v = vec![100, 32, 57];
for i in &mut v {
    *i += 50; // 解引用并修改元素
}
```

在遍历可变引用时，需要使用解引用运算符 `*` 来修改引用所指向的值。

#### 8.1.5. 使用枚举来储存多种类型

`Vector` 只能存储相同类型的数据。如果需要在同一个 `vector` 中存储不同类型的数据，可以使用 **枚举**。通过定义枚举来存储不同类型的值：

```rust
enum SpreadsheetCell {
    Int(i32),
    Float(f64),
    Text(String),
}

let row = vec![
    SpreadsheetCell::Int(3),
    SpreadsheetCell::Text(String::from("blue")),
    SpreadsheetCell::Float(10.12),
];
```

- 使用枚举后，`Vector` 中的每个元素都属于相同的枚举类型，但每个枚举成员可以包含不同类型的数据。

#### 8.1.6. 丢弃 `Vector` 时释放内存

当 `vector` 超出作用域时，Rust 会自动释放 `vector` 及其包含的元素的内存：

```rust
{
    let v = vec![1, 2, 3, 4];
    // 使用 v
} // v 超出作用域，内存被释放
```

Rust 的所有权系统确保了当 `vector` 不再使用时，它和其中的元素都会被安全释放，避免内存泄漏。

### 8.2. 使用字符串储存 UTF-8 编码的文本

Rust 提供了多种方式来处理字符串。它们主要有两种形式：**字符串切片**（`&str`）和**字符串**（`String`）。`String` 是可变的、可增长的，拥有内存，而 `&str` 是对已有字符串数据的引用。

#### 8.2.1 什么是字符串？

在 Rust 中，字符串有两种主要形式：

1. **字符串切片 `&str`**：
   - 这是 Rust 核心语言中的字符串类型，通常是对一段 UTF-8 编码的文本的引用。
   - 通常用作借用（引用）的形式：`&str`。
   - 字符串切片不可变，通常指向已分配的静态字符串数据（例如字符串字面值）。

2. **`String` 类型**：
   - 由 Rust 标准库提供，属于可增长的、可变的、拥有内存的字符串类型。
   - `String` 可以动态增加或减少数据，允许修改。
   - `String` 也是 UTF-8 编码的，可以存储不同语言的字符。

```rust
let s1: &str = "hello"; // 字符串切片
let s2: String = String::from("hello"); // String 类型
```

#### 8.2.2 新建字符串

可以使用 `String::new()` 函数来创建一个空的 `String`，也可以通过已有的字符串数据创建一个带有初始值的 `String`。

1. **创建空字符串**：

```rust
let mut s = String::new();
```

2. **通过 `to_string()` 方法将字符串字面值转换为 `String`**：

```rust
let s = "initial contents".to_string();
```

3. **通过 `String::from()` 函数创建字符串**：

```rust
let s = String::from("initial contents");
```

`String` 是 UTF-8 编码的，因此可以包含不同语言的字符：

```rust
let hello = String::from("你好");       // 中文
let hello = String::from("こんにちは"); // 日语
let hello = String::from("Hola");       // 西班牙语
```

#### 8.2.3 更新字符串

字符串是可变的，Rust 提供了多种方式来对 `String` 进行更新。

1. **使用 `push_str` 和 `push` 添加字符串**：

- `push_str` 方法用于将一个字符串切片附加到 `String` 的末尾：

```rust
let mut s = String::from("foo");
s.push_str("bar"); // s = "foobar"
```

- `push` 方法用于在 `String` 的末尾添加单个字符：

```rust
let mut s = String::from("lo");
s.push('l'); // s = "lol"
```

2. **使用 `+` 运算符或 `format!` 宏连接字符串**：

- `+` 运算符用于拼接两个字符串，但会移动左侧的字符串所有权，因此左侧字符串在操作后不能再使用：

```rust
let s1 = String::from("Hello, ");
let s2 = String::from("world!");
let s3 = s1 + &s2; // s1 被移动，不能再使用
```

- **`+` 运算符只能连接 `&str` 类型**：在 `add` 函数中，`String` 类型会被强制转换为 `&str` 类型。

- 对于多个字符串的拼接，`+` 运算符可能显得繁琐：

```rust
let s1 = String::from("tic");
let s2 = String::from("tac");
let s3 = String::from("toe");

let s = s1 + "-" + &s2 + "-" + &s3; // s = "tic-tac-toe"
```

- 更简洁和惯用的方式是使用 `format!` 宏，它不会转移任何字符串的所有权：

```rust
let s1 = String::from("tic");
let s2 = String::from("tac");
let s3 = String::from("toe");

let s = format!("{}-{}-{}", s1, s2, s3); // s1, s2, s3 都可继续使用
```

#### 字符串是 UTF-8 编码的

Rust 的 `String` 类型采用 UTF-8 编码，因此它可以包含任何可以被正确编码的数据。每个字符串的数据实际上是存储为字节数组的。尽管我们经常将字符串看作字符序列，但在 Rust 中，字符串的底层是字节。比如：

```rust
let hello = String::from("你好");
```

- 在上面的例子中，字符串 `"你好"` 实际上由多个字节组成，但它们是 UTF-8 编码的，并且 Rust 保证字符串是有效的 UTF-8 字符序列。

### 8.2.4 索引字符串

在 Rust 中，`String` 类型**没有**提供直接使用索引访问字符串元素的方法。原因是 Rust 的 `String` 是 UTF-8 编码的，这意味着每个字符的长度可能不一样，因此通过索引访问字符并不总是对应到一个有效的 Unicode 字符。

#### 无法索引 `String`

在 Rust 中，如果尝试像这样使用索引访问字符串，会导致编译错误：

```rust
let s1 = String::from("hello");
let h = s1[0]; // 编译错误
```

这是因为 Rust 的 `String` 实际上是 `Vec<u8>` 的封装，存储的是 UTF-8 编码的字节序列。在 UTF-8 编码中，一个字符可能占用多个字节，因此索引并不总是对应一个完整的字符。

#### 字符串的长度与字节数

在不同的语言中，一个字符可能由多个字节表示。例如：

```rust
let hello = String::from("Hola");
println!("Length of 'Hola': {}", hello.len()); // 输出 4
```

在这里，`"Hola"` 每个字符占用一个字节，总共 4 个字节。

但是对于其他语言字符，长度可能会更大：

```rust
let hello = String::from("Здравствуйте");
println!("Length of 'Здравствуйте': {}", hello.len()); // 输出 24
```

`"Здравствуйте"` 包含 12 个字符，但因为每个字符占用 2 个字节，因此整个字符串的字节长度为 24。

### 8.2.5 字节、标量值和字形簇

字符串在内存中的表示可以从三个不同的角度来看：

1. **字节（bytes）**：

   - 字符串底层是 UTF-8 编码的字节数组。在这个层面上，字符串是由 `u8` 数组表示的。
   - 例如，字符串 `"नमस्ते"`（梵文书写的印度语 "namaste"）在内存中的字节表示为：

   ```rust
   [224, 164, 168, 224, 164, 174, 224, 164, 184, 224, 165, 141, 224, 164, 164, 224, 165, 135]
   ```

2. **Unicode 标量值**：

   - Rust 中的 `char` 类型代表一个 Unicode 标量值，表示一个有效的字符。
   - 对于同样的 `"नमस्ते"` 字符串，它的标量值表示为：

   ```rust
   ['न', 'म', 'स', '्', 'त', 'े']
   ```

   其中，一些字符并不是完整的字母，例如发音符号 `्`。

3. **字形簇**：

   - 字形簇是一个或多个字符的组合，形成了人眼看到的单个字符。
   - 对于 `"नमस्ते"`，字形簇会是：

   ```rust
   ["न", "म", "स्", "ते"]
   ```

   字形簇比 Unicode 标量值更符合自然语言中的字符表示。

由于字符串可能涉及多字节的字符或符号，直接索引会导致意想不到的结果或错误，因此 Rust 选择禁止对字符串进行直接索引。

### 8.2.6 字符串切片

虽然不能通过索引直接访问字符串的字符，但可以通过**字符串切片**获取字符串的一部分。切片是基于字节索引进行的，因此需要保证切片的边界在有效的字符边界上，否则会导致运行时错误。

```rust
let hello = "Здравствуйте";
let s = &hello[0..4]; // 取前两个字节，结果是 "Зд"
```

在这个例子中，由于每个 Unicode 字符 `З` 和 `д` 各占 2 个字节，因此 `[0..4]` 切片返回前两个字符 `"Зд"`。

> 注意：切片操作必须保证索引落在字符的有效字节边界，否则会引发 panic。例如，尝试在 "Здравствуйте" 中使用 `[0..3]` 切片会因为跨越了字符边界而导致运行时错误。

### 8.2.7 遍历字符串的方法

在操作字符串时，常常需要逐字符或逐字节地遍历字符串。Rust 提供了多种方式来遍历字符串，包括按字符、按字节以及其他方式。

#### 按字符遍历

可以使用 `chars` 方法逐个 `char` 类型的字符进行遍历：

```rust
for c in "Зд".chars() {
    println!("{c}");
}
// 输出：
// З
// д
```

#### 按字节遍历

可以使用 `bytes` 方法逐个字节遍历字符串。对于 Unicode 字符串，每个字符可能会占用多个字节：

```rust
for b in "Зд".bytes() {
    println!("{b}");
}
// 输出：
// 208
// 151
// 208
// 180
```

在这个例子中，`"Зд"` 中的每个字符都由 2 个字节组成。`bytes` 方法返回的是每个字符的 UTF-8 编码字节。

### 8.3. 使用 HashMap 储存键值对

`HashMap<K, V>` 是 Rust 提供的一种集合，用于储存键值对的映射。`HashMap` 使用哈希函数来将键映射到值，并根据键快速查找相应的值。在标准库的集合类型中，`HashMap` 是最灵活的，但它不像 `Vec` 那样常用，因此需要手动导入。

#### 8.3.1 新建一个哈希 map

可以通过 `HashMap::new()` 创建一个空的哈希表。由于 `HashMap` 是泛型类型，因此我们需要指定键 `K` 和值 `V` 的类型：

```rust
use std::collections::HashMap;

let mut scores = HashMap::new(); // 创建一个空的 HashMap<K, V>

scores.insert(String::from("Blue"), 10);    // 插入键值对 ("Blue", 10)
scores.insert(String::from("Yellow"), 50);  // 插入键值对 ("Yellow", 50)
```

- 在上面的例子中，我们创建了一个 `HashMap`，它的键类型是 `String`，值类型是 `i32`。

#### 8.3.2 访问哈希 map 中的值

可以使用 `get` 方法通过键来访问哈希 map 中的值。`get` 方法返回一个 `Option<&V>` 类型，因此我们需要处理可能不存在的键。

```rust
use std::collections::HashMap;

let mut scores = HashMap::new();
scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);

let team_name = String::from("Blue");
let score = scores.get(&team_name).copied().unwrap_or(0); // 如果没有值则返回 0
```

- 这里我们使用了 `copied()` 方法将 `Option<&i32>` 转换为 `Option<i32>`，并用 `unwrap_or(0)` 处理不存在的情况。

#### 遍历哈希 map 中的每一个键值对

可以使用 `for` 循环遍历哈希表中的所有键值对：

```rust
for (key, value) in &scores {
    println!("{}: {}", key, value);
}
// 输出可能是：
// Yellow: 50
// Blue: 10
```

- 遍历时的顺序是不确定的，因为哈希表的键值对存储顺序依赖于哈希函数。

#### 8.3.3 哈希 map 和所有权

哈希表会接管插入的值的所有权，因此对于像 `String` 这种拥有所有权的数据类型，值会被移动到 `HashMap` 中：

```rust
use std::collections::HashMap;

let field_name = String::from("Favorite color");
let field_value = String::from("Blue");

let mut map = HashMap::new();
map.insert(field_name, field_value);  // field_name 和 field_value 被移动到哈希表中
// field_name 和 field_value 不再有效，无法使用
```

如果插入的是实现了 `Copy` trait 的类型（例如 `i32`），它们会被拷贝，而不是移动。

#### 8.3.4 更新哈希 map

`HashMap` 只允许一个键对应一个值。如果插入同一个键多次，它的值会被覆盖。Rust 提供了几种方式来更新哈希表中的值：

1. **覆盖一个值**

```rust
use std::collections::HashMap;

let mut scores = HashMap::new();
scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Blue"), 25);  // "Blue" 键的值从 10 更新为 25

println!("{:?}", scores);  // 输出 {"Blue": 25}
```

2. **只在键没有对应值时插入**

可以使用 `entry` 方法来只在键不存在时插入新值。如果键已经存在，`or_insert` 不会修改其值：

```rust
use std::collections::HashMap;

let mut scores = HashMap::new();
scores.insert(String::from("Blue"), 10);

scores.entry(String::from("Yellow")).or_insert(50);  // 插入 "Yellow" 键
scores.entry(String::from("Blue")).or_insert(50);    // "Blue" 键已存在，值不会更新

println!("{:?}", scores);  // 输出 {"Yellow": 50, "Blue": 10}
```

- `entry` 方法返回一个 `Entry` 枚举，它表示键是否已经存在。
- `or_insert` 方法返回键对应的值的可变引用，如果不存在则插入新值并返回新值的引用。

3. **根据旧值更新一个值**

可以结合 `entry` 和 `or_insert` 方法根据当前值来更新哈希表中的值。例如，统计每个单词在文本中出现的次数：

```rust
use std::collections::HashMap;

let text = "hello world wonderful world";

let mut map = HashMap::new();

for word in text.split_whitespace() {
    let count = map.entry(word).or_insert(0);  // 如果不存在该键则插入 0
    *count += 1;  // 根据旧值更新
}

println!("{:?}", map);  // 输出 {"hello": 1, "world": 2, "wonderful": 1}
```

#### 8.3.5 哈希函数

默认情况下，Rust 的 `HashMap` 使用 **SipHash** 算法，这是一种安全哈希函数，旨在抵御拒绝服务（DoS）攻击。SipHash 在处理哈希冲突和防止攻击方面表现良好，但它并非最快的哈希算法。

- 如果你有特定的性能需求，Rust 允许指定自定义的哈希函数，只需提供一个实现了 `BuildHasher` trait 的类型。

```rust
use std::collections::HashMap;
use std::collections::hash_map::RandomState;

let s = RandomState::new();  // 使用自定义的哈希生成器
let mut map: HashMap<i32, i32, RandomState> = HashMap::with_hasher(s);
```
