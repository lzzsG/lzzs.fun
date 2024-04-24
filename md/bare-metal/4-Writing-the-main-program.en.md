# IV: Writing the Main Program

Writing the main program involves transforming the startup code and the environment initialized by the system into specific application logic.

### Introduction

In bare-metal programming projects, the boundaries between **"creating a project," "writing startup code," and "writing the main program"** are not always very clear. Especially in smaller or single-function projects, the startup code and main program code may be closely integrated to accomplish tasks in a bare-metal environment. However, conceptually, the startup code is primarily responsible for initialization, while the main program implements specific application logic.

In larger and more complex projects, modularization and encapsulation can clearly distinguish these two parts. For example, startup code, hardware abstraction layers, device drivers, application logic, etc., can be organized into different modules or packages.

The project creation phase (Step Two) has already involved some basic settings, such as using the `#![no_std]` attribute to tell the Rust compiler that our project does not depend on Rust's standard library (std) because the standard library requires operating system support, and bare-metal programming is typically done in an environment without an operating system. This stage is mainly about project initialization, setting compilation targets and configurations, and establishing the project structure.

Subsequently, the writing of the main program turns to implementing specific application logic and system functions, which may include low-level programming that directly interacts with hardware and more abstract high-level system design. In the process of bare-metal programming with RISC-V and Rust, the use of `#![no_std]` and the writing of the main program run through the entire process of project creation and development, without a very clear boundary.

#### **What exactly does the main program refer to?**

In the context of bare-metal programming, the "main program" refers to the code part that implements specific application logic, aside from initializing hardware and preparing the running environment with startup code. This could be a simple loop, blinking an LED; or it could be a complex embedded application, including task scheduling, peripheral management, etc. The main program carries the core functionality and logic of the application.

---

This stage can be divided into writing basic content and subsequent high-level extensions.

## Basic Content

After completing the startup code, the system's running environment has been initialized, and the next step is to write the main program code that implements specific functions. Some of this content has already been mentioned.

1. **Using the `#![no_std]` attribute**: As there is usually no standard library support in a bare-metal environment, it's necessary to declare `#![no_std]` in Rust code, informing the compiler that the project does not use Rust's standard library.

2. **Main function entry**: Since there is no standard entry in a bare-metal environment, the `main` function will not run automatically like in standard Rust programs. You need to use the `#[no_mangle]` attribute on a function, usually the `main` function, to ensure its name does not change after compilation, and then manually jump to this function from the startup code.

3. **Minimal runtime**: In a `#![no_std]` environment, some regular Rust runtime features, such as heap memory allocation, threads, standard input/output, etc., are not available. If needed, they must be manually implemented or provided by external libraries.

4. **`#[panic_handler]` function**: Without the standard library, Rust needs a function defined with the `#[panic_handler]` attribute to handle panic situations.

5. **Memory operations**: When performing memory operations, you may need to directly read and write specific memory addresses, which can be done through raw pointers.

The `#![no_std]` and `#[no_mangle]` attributes are mentioned early in the project creation, while the definition of the main function entry and memory operations (especially configuring memory layout through linker scripts) are usually involved in the startup code writing phase.

**Definition and Role of Minimal Runtime**

The **minimal runtime** refers to the most basic set of runtime features that need to be implemented in a `#![no_std]` environment, due to the lack of standard library support, to allow the program to run. This includes but is not limited to:

- **Memory management**: Provide basic memory allocation and release capabilities.
- **Stack management**: Maintain the program stack to support function calls.
- **Panic handling**: Define the behavior during a panic, such as logging error information, stopping program execution.
- **Global variable initialization**: Ensure global variables are correctly initialized before use.

**Association with the First Two Phases**

- **Project Creation Phase**: In this phase, by using the `#![no_std]` attribute, the compiler is explicitly informed that the project does not depend on Rust's standard library. This is to adapt to bare-metal or resource-constrained environments and is also a prerequisite for implementing a minimal runtime.
- **Writing Startup Code Phase**: The startup code is responsible for hardware initialization and setting up the basic environment for program running, such as stack

 pointer initialization, providing hardware-level support for the implementation of a minimal runtime.

## Subsequent High-Level Extensions

Once the basic structure of the main program and minimal runtime settings are completed, you can begin exploring higher-level system functions and application development.

Writing the main program occupies a central position in the process of bare-metal programming with RISC-V and Rust, not only transforming the environment after system initialization into specific application logic but also possibly involving the implementation of high-level functions at the operating system level. Depending on the function and goals, these contents can be divided into several main categories:

#### Hardware Interaction and Control

- **Peripheral driver writing**: Involves coding practices that interact directly with hardware, including operations of communication interfaces like GPIO, UART, SPI, etc., allowing the application to read external inputs and control external devices.

#### System Function Implementation

- **Task scheduling and management**: In a multitasking environment, develop a simple scheduler to manage the execution of different tasks, achieving basic multitasking processing.
- **Memory management**: Includes static memory allocation and more advanced dynamic memory allocation strategies to effectively manage limited memory resources.
- **Interrupt service routines**: Write interrupt service routines to handle hardware events, allowing the application to respond to external interrupts, such as button presses, timer overflows, etc.

#### Network Communication and Security

- **Embedded protocol stacks**: For networking needs, implement or integrate a TCP/IP protocol stack to enable the application to exchange data over the network.
- **Security features**: Add security mechanisms such as secure boot, encrypted communication, etc., to improve the system's security and reliability.

#### Development and Testing Assistance

- **Using external libraries and tools**: Utilize Rust libraries designed for bare-metal and embedded development, such as hardware abstraction layer libraries, to simplify the development process.
- **Build and test tools**: Use Rust's build and testing tools to automate the build process, ensuring code quality and stability.

#### Expanding Operating System Functions

- **Batch processing systems**: As an extension of operating system functions, implement a batch processing system to automatically run and manage multiple programs.
- **Multiprogramming and time-sharing multitasking**: Introduce the concepts of concurrent execution and time-sharing systems to improve the system's resource utilization and responsiveness.
- **Address space and process management**: Implement process isolation, process state management, and scheduling algorithms, which are the basis for operating system resource and task management.
- **File systems and I/O management**: Build file systems to manage persistent storage and implement abstraction and management of I/O devices.
- **Inter-process communication (IPC)**: Design and implement communication mechanisms between processes or threads, supporting data sharing and synchronization.
- **Concurrency and synchronization**: In a multi-core processor environment, implement parallel computing and synchronization mechanisms to support concurrent execution of the system and applications.

Through this classification and overview, we can see that writing the main program in bare-metal programming not only includes implementing specific application functions but also may involve adding complex operating system-level functions to the system. From directly controlling hardware to managing system resources, and then to implementing network communication and security mechanisms, these steps together constitute the broad field of bare-metal programming, providing developers with the ability to bridge hardware and software.

Writing the main program transforms the environment after startup code initialization into an actual running application. Initially, it's necessary to focus on establishing the project's basic structure and minimal runtime environment. Subsequently, by expanding more system functions and application logic, the program's complexity and functionality can gradually be increased.

---

## Supplement 1: Regarding Operating Systems

For **operating systems**, implementing a batch processing system, switching privilege levels, and subsequent content, such as multiprogramming and time-sharing multitasking, address space, processes and process management, file systems and I/O redirection, inter-process communication, and concurrency, mainly belong to further development and system expansion after the "writing the main program" phase. These contents go beyond the most basic implementation of startup code, entering the core part of operating system functionality implementation. Below, I will outline the relationship between these contents and "writing the main program":

#### Writing the Main Program

- **Basics**: In the "writing the main program" phase, you typically define the core functions of the operating system, such as initializing hardware devices, setting up the runtime environment, creating and managing processes, etc. This can be seen as building the foundation of the operating system.

#### Extending OS Functionality

For the operating system, the following chapters cover further development and functional extensions of the operating system, including but not limited to the following aspects:

1. **Batch Processing System**: Implementing a basic operating system that can automatically run multiple programs in sequence. This is usually the simplest functionality of an operating system and belongs to the early stages of operating system development.

2. **Multiprogramming and Time-sharing Multitasking**: Introducing the capability to execute multiple programs concurrently, as well as the concept of time-sharing systems, making it seem as if multiple users and programs are using computer resources simultaneously.

3. **Address Space**: Involving memory

 management, how to provide each running program with an independent address space, achieving memory protection and isolation.

4. **Processes and Process Management**: Discussing in detail the concept of processes, process state management, scheduling algorithms, etc., which are core components of an operating system.

5. **File Systems and I/O Redirection**: Implementing persistent storage management and the management of input/output devices, as well as how to abstract these resources, providing a unified interface to upper-layer applications.

6. **Inter-Process Communication**: Introducing how processes or threads can communicate, share data, etc., which is the basis for communication within the operating system and between applications.

7. **Concurrency**: Exploring how to implement parallel execution of the operating system and applications on multi-core processors, including locks, synchronization mechanisms, and other concurrency control technologies.

These contents form the main body of operating system development, with each chapter representing a key point in enhancing the functionality and performance of the operating system. Starting with implementing a batch processing system and switching privilege levels, each step builds upon the previous one, gradually expanding and deepening until forming a complete operating system. Thus, these contents can be considered advanced functions and features gradually implemented and perfected after the "writing the main program" phase, based on the needs of the operating system design.

**More supplements in the next section**

---

## Supplement 1.1: main.rs

**[rCore-Tutorial-Code-2024S ch1](https://github.com/LearningOS/rCore-Tutorial-Code-2024S/tree/ch1)/[os](https://github.com/LearningOS/rCore-Tutorial-Code-2024S/tree/ch1/os)/[src](https://github.com/LearningOS/rCore-Tutorial-Code-2024S/tree/ch1/os/src)/main.rs**

This code serves as the main entry module (`main.rs`) for a bare-metal operating system based on RISC-V and Rust, responsible for starting up and initializing the operating system. Here is a detailed code analysis and explanation in Chinese.

### Code File Analysis

```rust
//! Main module and entry point
//!
//! The operating system and applications start from this module. The kernel code starts executing from `entry.asm`, and then calls [`rust_main()`] to
//! initialize various functionalities [`clear_bss()`]. (See source code for details)
//!
//! Then calls [`println!`] to display `Hello, world!`.

#![deny(missing_docs)]
#![deny(warnings)]
#![no_std]
#![no_main]
#![feature(panic_info_message)]

use core::arch::global_asm;
use log::*;

#[macro_use]
mod console;
mod lang_items;
mod logging;
mod sbi;

#[path = "boards/qemu.rs"]
mod board;

global_asm!(include_str!("entry.asm"));

/// Clear the BSS segment
pub fn clear_bss() {
    extern "C" {
        fn sbss();
        fn ebss();
    }
    (sbss as usize..ebss as usize).for_each(|a| unsafe { (a as *mut u8).write_volatile(0) });
}

/// Rust entry point for the operating system
#[no_mangle]
pub fn rust_main() -> ! {
    extern "C" {
        fn stext(); // start address of the text segment
        fn etext(); // end address of the text segment
        fn srodata(); // start address of the read-only data segment
        fn erodata(); // end address of the read-only data segment
        fn sdata(); // start address of the data segment
        fn edata(); // end address of the data segment
        fn sbss(); // start address of the BSS segment
        fn ebbs(); // end address of the BSS segment
        fn boot_stack_lower_bound(); // lower boundary of the stack
        fn boot_stack_top(); // top of the stack
    }
    clear_bss(); // Clear the BSS segment
    logging::init(); // Initialize logging
    println!("[kernel] Hello, world!"); // Print "Hello, world!"
    trace!(
        "[kernel] .text [{:#x}, {:#x})",
        stext as usize,
        etext as usize
    );
    debug!(
        "[kernel] .rodata [{:#x}, {:#x})",
        srodata as usize, erodata as usize
    );
    info!(
        "[kernel] .data [{:#x}, {:#x})",
        sdata as usize, edata as usize
    );
    warn!(
        "[kernel] boot_stack top=bottom={:#x}, lower_bound={:#x}",
        boot_stack_top as usize, boot_stack_lower_bound as usize
    );
    error!("[kernel] .bss [{:#x}, {:#x})", sbss as usize, ebbs as usize);

    use crate::board::QEMUExit;
    crate::board::QEMU_EXIT_HANDLE.exit_success(); // CI automatic test success
                                                   //crate::board::QEMU_EXIT_HANDLE.exit_failure(); // CI automatic test failure
}
```

### Detailed Code Explanation

#### 1. Attribute Declarations

In bare-metal or operating system development with Rust, attribute declarations specify compiler behavior and project configuration, impacting how the code is compiled and executed.

```rust
#![deny(missing_docs)]
#![deny(warnings)]
#![no_std]
#![no_main]
#![feature(panic_info_message)]
```

- `#![deny(missing_docs)]`: This attribute causes the compilation to error if code lacks documentation comments, forcing developers to write documentation for public APIs, aiding maintenance and quality assurance.
- `#![deny(warnings)]`: This attribute treats all compilation warnings as errors, helping to maintain code quality and identify potential issues.
- `#![no_std]`: Instructs the compiler not to link Rust's standard library (std). This is crucial for bare-metal or operating system development, as most functionalities of the standard library rely on operating system support.
- `#![no_main]`: Typically, Rust programs start execution from the `main` function, but in bare-metal or operating system development, the startup process is controlled by assembly language, so this attribute informs the compiler there is no standard `main` entry.
- `#![feature(panic_info_message)]`: Enables an experimental language feature that allows accessing error information during a panic. This is beneficial for handling errors and exceptions in operating system development.

#### 2. Module References

This section includes references to internal and external modules, used for structuring code and reusing functionalities.

```rust
use core::arch::global_asm;
use log::*;

#[macro_use]
mod console;
mod lang_items;
mod logging;
mod sbi;

#[path = "boards/qemu.rs"]
mod board;

global_asm!(include_str!("entry.asm"));
```

- `use core::arch::global_asm;`: Imports the `global_asm` macro, allowing direct embedding of assembly code within Rust files.
- `use log::*;`: Imports everything from the `log` library, a generic logging interface in Rust used for implementing cross-library logging.
- `mod console; mod lang_items; mod logging; mod sbi;`: Imports various modules defined in the project, such as console operations, language items (including panic handling and stack overflow handling), logging system, and SBI call encapsulation.
- `#[path = "boards/qemu.rs"] mod board;`: Specifies a particular file as a module, useful when dealing with specific hardware or environments.
- `global_asm!(include_str!("entry.asm"));`: Embeds assembly code located in `entry.asm`, which is the starting point of the program execution, usually including initial stack setup and jump instructions.

#### 3. Memory Initialization

This section defines a critical function for initializing the program's BSS segment, which is the segment for uninitialized global variables.

```rust
/// Clear the BSS segment
pub fn clear_bss() {
    extern "C" {
        fn sbss();
        fn ebss();
    }
    (sbss as usize..ebbs as usize).for_each(|a| unsafe { (a as *mut u8).write_volatile(0) });
}
```

- `pub fn clear_bss()`: This function clears (sets to zero) the BSS segment, an essential step in the program initialization process.
- `extern "C" { fn sbss(); fn ebbs(); }`: These two external symbols point to the start and end of the BSS segment, typically defined in the linker script.
- `(sbss as usize..ebbs as usize).for_each(|a| unsafe { (a as *mut u8).write_volatile(0) });`: This line of code uses Rust's iterator and range expression to traverse each address in the BSS segment and set its content to zero. `write_volatile` ensures that these write operations are not optimized away by the compiler, which is necessary during initialization.

Let's continue with an in-depth analysis of the remaining parts of `main.rs`, including the entry function `rust_main()`, logging and output, and exit handling.

### 4. Entry Function `rust_main()`

The `rust_main` function is the Rust-level entry point for the operating system, called by the startup assembly code. It performs initialization tasks and starts system functionalities.

```rust
#[no_mangle]
pub fn rust_main() -> ! {
    extern "C" {
        fn stext(); // start address of the text segment
        fn etext(); // end address of the text segment
        fn srodata(); // start address of the read-only data segment
        fn erodata(); // end address of the read-only data segment
        fn sdata(); // start address of the data segment
        fn edata(); // end address of the data segment
        fn sbss(); // start address of the BSS segment
        fn ebbs(); // end address of the BSS segment
        fn boot_stack_lower_bound(); // lower boundary of the stack
        fn boot_stack_top(); // top of the stack
    }
    clear_bss(); // Clear the BSS segment
    logging::init(); // Initialize logging

    println!("[kernel] Hello, world!");
    trace!(
        "[kernel] .text [{:#x}, {:#x})",
        stext as usize,
        etext as usize
    );
    debug!(
        "[kernel] .rodata [{:#x}, {:#x})",
        srodata as usize, erodata as usize
    );
    info!(
        "[kernel] .data [{:#x}, {:#x})",
        sdata as usize, edata as usize
    );
    warn!(
        "[kernel] boot_stack top=bottom={:#x}, lower_bound={:#x}",
        boot_stack_top as usize, boot_stack_lower_bound as usize
    );
    error!("[kernel] .bss [{:#x}, {:#x})", sbss as usize, ebbs as usize);
    use crate::board::QEMUExit;
    crate::board::QEMU_EXIT_HANDLE.exit_success(); // CI automatic test success
    // crate::board::QEMU_EXIT_HANDLE.exit_failure(); // CI automatic test failure
}
```

**Detailed Analysis**

- `#[no_mangle]`: Ensures that this function's name is not changed after compilation, which is crucial for correct invocation from assembly language.
- `pub fn rust_main() -> !`: This function signature with `!` indicates that the function will not return, which is typical for an operating system entry point.
- **External Symbols**: Internally, the function declares a series of external symbols that correspond to memory layouts defined in the linker script, allowing Rust code to access these crucial memory addresses.

### 5. Logging and Output

In the `rust_main` function, the logging and output section uses `log` macros to output memory layout and initial information, aiding in system startup debugging and verification.

```rust
println!("[kernel] Hello, world!");
trace!("[kernel] .text [{:#x}, {:#x})", stext as usize, etext as usize);
debug!("[kernel] .rodata [{:#x}, {:#x})", srodata as usize, erodata as usize);
info!("[kernel] .data [{:#x}, {:#x})", sdata as usize, edata as usize);
warn!("[kernel] boot_stack top=bottom={:#x}, lower_bound={:#x}", boot_stack_top as usize, boot_stack_lower_bound as usize);
error!("[kernel] .bss [{:#x}, {:#x})", sbss as usize, ebbs as usize);
```

- **Log Levels**: Utilizes different log levels (`trace`, `debug`, `info`, `warn`, `error`) to differentiate the importance of messages, helping to quickly identify issues during runtime or later log analysis.

### 6. Exit Handling

In testing and simulation environments for operating systems or applications, a mechanism is sometimes necessary to terminate execution normally or abnormally, which is particularly common in CI (Continuous Integration testing).

```rust
use crate::board::QEMUExit;
crate::board::QEMU_EXIT_HANDLE.exit_success(); // CI automatic test success
// crate::board::QEMU_EXIT_HANDLE.exit_failure(); // CI automatic test failure
```

- **Exit Handling**: Here, a board-specific exit handling module is used, which encapsulates the QEMU exit mechanism. This allows the operating system to proactively notify the state of test success or failure within the QEMU virtual machine.

This concludes the detailed analysis of `main.rs`, which outlines the initial setup, memory initialization, logging, and system boot processes critical for a bare-metal operating system developed in Rust and targeted for RISC-V architecture.

### Supplementary 1.2: console.rs

In bare-metal programming projects based on RISC-V and Rust, `console.rs` typically handles basic console output functionality. This file encapsulates the logic for outputting text to the console, leveraging the Supervisor Binary Interface (SBI) functionality. Below is the code analysis and Chinese translation of `console.rs`:

### File Content Analysis

```rust
//! SBI console driver for text output
use crate::sbi::console_putchar;
use core::fmt::{self, Write};

struct Stdout;

impl Write for Stdout {
    fn write_str(&mut self, s: &str) -> fmt::Result {
        for c in s.chars() {
            console_putchar(c as usize);
        }
        Ok(())
    }
}

pub fn print(args: fmt::Arguments) {
    Stdout.write_fmt(args).unwrap();
}

/// Print to the host console using a format string and arguments.
#[macro_export]
macro_rules! print {
    ($fmt: literal $(, $($arg: tt)+)?) => {
        $crate::console::print(format_args!($fmt $(, $($arg)+)?))
    }
}

/// Print to the host console using a format string and arguments, automatically appending a newline.
#[macro_export]
macro_rules! println {
    ($fmt: literal $(, $($arg: tt)+)?) => {
        $crate::console::print(format_args!(concat!($fmt, "\n") $(, $($arg)+)?))
    }
}
```

### Detailed Analysis

#### Module and Structure Declaration

- `use crate::sbi::console_putchar;`: Imports the `console_putchar` function, which is a low-level SBI call used to output a single character to the console.
- `use core::fmt::{self, Write};`: Imports formatting functionality and the `Write` trait from Rust's core library, providing the foundation for custom formatted output.
- `struct Stdout;`: Defines a simple `Stdout` struct, serving as the implementation of the `Write` trait.

#### Implementation of `Write` Trait

- `impl Write for Stdout`: Implements the `Write` trait for the `Stdout` struct, allowing it to use Rust's formatting capabilities.
  - `fn write_str(&mut self, s: &str) -> fmt::Result`: Implements the actual character output, with each call to `console_putchar` outputting characters from the string one by one.

#### Output Function

- `pub fn print(args: fmt::Arguments)`: A public printing function that accepts arguments of type `fmt::Arguments`, which represents a pre-formatted text block. It uses `Stdout.write_fmt(args).unwrap()` to invoke `write_fmt` for outputting formatted text.

#### Macro Definitions

- `#[macro_export] macro_rules! print` and `#[macro_export] macro_rules! println`: Define two macros, `print!` and `println!`, for conveniently formatting output in Rust code. The `println!` macro appends a newline character `\n` to the `print!` macro's functionality.

### Functionality and Purpose

These code snippets and macros greatly simplify text output operations in bare-metal environments, enabling developers to use `print!` and `println!` just like in a standard Rust environment for debugging information or user prompts. By encapsulating low-level SBI calls within the `print` function and related macros, code readability and maintainability are enhanced. Additionally, implementing the `Write` trait allows `Stdout` to leverage the widely used formatting capabilities of Rust's standard library, further enhancing output flexibility and expressiveness.

### Supplementary 1.3: logging.rs

This code defines a simple logging system for recording and outputting log information in a bare-metal programming environment based on RISC-V and Rust. Here's a detailed analysis and translation of the `logging.rs` module:

### File Content Analysis

```rust
//! Global logger

use log::{Level, LevelFilter, Log, Metadata, Record};

/// A simple logger
struct SimpleLogger;

impl Log for SimpleLogger {
    fn enabled(&self, _metadata: &Metadata) -> bool {
        true
    }
    fn log(&self, record: &Record) {
        if !self.enabled(record.metadata()) {
            return;
        }
        let color = match record.level() {
            Level::Error => 31, // Red
            Level::Warn => 93,  // Light Yellow
            Level::Info => 34,  // Blue
            Level::Debug => 32, // Green
            Level::Trace => 90, // Light Black
        };
        println!(
            "\u{1B}[{}m[{:>5}] {}\u{1B}[0m",
            color,
            record.level(),
            record.args(),
        );
    }
    fn flush(&self) {}
}

/// Initialize the logger
pub fn init() {
    static LOGGER: SimpleLogger = SimpleLogger;
    log::set_logger(&LOGGER).unwrap();
    log::set_max_level(match option_env!("LOG") {
        Some("ERROR") => LevelFilter::Error,
        Some("WARN") => LevelFilter::Warn,
        Some("INFO") => LevelFilter::Info,
        Some("DEBUG") => LevelFilter::Debug,
        Some("TRACE") => LevelFilter::Trace,
        _ => LevelFilter::Off,
    });
}
```

### Detailed Analysis

#### Structures and Implementations

- **SimpleLogger Structure**: Defines a structure named `SimpleLogger`, which serves as a custom logger.
- **Implementing Log Trait**: `SimpleLogger` implements the `Log` trait from the `log` crate, allowing it to integrate with Rust's `log` library.
  - `fn enabled(&self, _metadata: &Metadata) -> bool`: Always returns `true`, indicating that all log levels are enabled.
  - `fn log(&self, record: &Record)`: Handles each log message, colors the output based on the log level, and formats it for printing to the console.
  - `fn flush(&self)`: This method is a no-op here since additional flushing is not required for most console logs.

#### Color Coding

- Sets text color based on log level, using ANSI escape sequences to change console text color, enhancing log readability.

#### Initialization Function

- `pub fn init()`: Initializes the logging system.
  - `static LOGGER: SimpleLogger = SimpleLogger;`: Defines and initializes a static instance of the logger.
  - `log::set_logger(&LOGGER).unwrap();`: Sets the global logger to our custom logger.
  - `log::set_max_level(...)`: Sets the maximum log output level, controlled by the `LOG` environment variable, allowing dynamic adjustment of log output based on different runtime environments.

### Functionality and Purpose

This custom logging system provides a simple yet effective solution for log output in bare-metal programs. By implementing the `Log` trait, `SimpleLogger` seamlessly integrates with Rust's logging library, leveraging existing logging tools and libraries in the Rust ecosystem. Additionally, the ability to control log levels via environment variables increases runtime flexibility, allowing developers to adjust log output as needed, which is beneficial in both debugging and production environments.

### Supplementary 1.4: lang_items.rs

The file `lang_items.rs` contains language items that define special behaviors of the operating system, primarily focusing on defining the panic handler in this case. In the bare-metal programming process based on RISC-V and Rust, this file mainly belongs to the **writing the main program** stage. During this stage, besides implementing the core logic of the operating system, handling possible runtime errors and exceptional situations is also necessary. Below is a detailed analysis of the `lang_items.rs` file:

### File Content Analysis

```rust
//! Panic handler

use crate::sbi::shutdown;
use core::panic::PanicInfo;

#[panic_handler]
/// Panic handler function
fn panic(info: &PanicInfo) -> ! {
    if let Some(location) = info.location() {
        println!(
            "[kernel] Panicked at {}:{} {}",
            location.file(),
            location.line(),
            info.message().unwrap()
        );
    } else {
        println!("[kernel] Panicked: {}", info.message().unwrap());
    }
    shutdown()
}
```

### Detailed Analysis

#### Panic Handler

- **Dependencies Import**:
  - `use crate::sbi::shutdown;` Imports the `shutdown` function, which is typically an SBI (Supervisor Binary Interface) call used to shut down the system after a panic.
  - `use core::panic::PanicInfo;` Imports the `PanicInfo` type from the Rust core library, which provides detailed information about panic events.

- **Defining the Panic Handler Function**:
  - `#[panic_handler]`: This is an attribute macro indicating to the compiler that this function is the panic handler for the entire program.
  - `fn panic(info: &PanicInfo) -> !`: Defines a function named `panic` that takes a reference to `PanicInfo` and never returns (the return type `!` indicates that this function is a diverging function, meaning it never returns after being called).

#### Handling Panic Information

- **Processing Panic Information**:
  - `if let Some(location) = info.location()`: Attempts to retrieve the file location and line number where the panic occurred from the panic information.
  - `println!`: Uses a macro to print the panic information to the console. If location information exists, it prints the file name, line number, and panic message; otherwise, it only prints the panic message.

#### System Shutdown

- **System Shutdown**:
  - `shutdown()`: After printing the panic information, calls the `shutdown` function to stop the system from running. This is a typical way to handle unrecoverable errors in a bare-metal environment.

### Functionality and Purpose

This panic handler is a critical component in bare-metal systems or operating systems. It not only provides error handling mechanisms but also ensures that the system can safely shut down when an unrecoverable error occurs, avoiding potential erratic behavior or data corruption. By providing detailed error information to developers, it also helps to quickly pinpoint the cause of the problem, making it an indispensable tool in the development and debugging process.

Furthermore, a custom panic handler allows developers to control the logic of error handling, optimizing the handling process according to specific application requirements and environments. This is particularly important in embedded systems or development for specific hardware platforms, as the default panic behavior may not be suitable for all use cases.

### Supplementary 1.5: sbi.rs

The file `sbi.rs` encapsulates functionalities for Supervisor Binary Interface (SBI) calls, which are particularly important in bare-metal programming environments based on RISC-V, as SBI provides a standard way to interact with the underlying hardware. This file mainly includes some basic SBI calls, such as console output and system shutdown. These functionalities typically belong to the **writing the main program** stage as they provide fundamental services required for the operation of the operating system. Below is the code analysis and translation of `sbi.rs`:

### File Content Analysis

```rust
//! SBI call encapsulation

use core::arch::asm;

const SBI_CONSOLE_PUTCHAR: usize = 1;

/// Generic SBI call
#[inline(always)]
fn sbi_call(which: usize, arg0: usize, arg1: usize, arg2: usize) -> usize {
    let mut ret;
    unsafe {
        asm!(
            "li x16, 0",
            "ecall",
            inlateout("x10") arg0 => ret,
            in("x11") arg1,
            in("x12") arg2,
            in("x17") which,
        );
    }
    ret
}

/// Output a character to the console using SBI call (QEMU UART handler)
pub fn console_putchar(c: usize) {
    sbi_call(SBI_CONSOLE_PUTCHAR, c, 0, 0);
}

use crate::board::QEMUExit;
/// Shutdown the kernel using SBI call
pub fn shutdown() -> ! {
    crate::board::QEMU_EXIT_HANDLE.exit_failure();
}
```

### Detailed Analysis

#### SBI Call Encapsulation

- **`sbi_call` Function**: This is a generic function encapsulating SBI calls. It takes a `which` parameter identifying the SBI call and up to three additional arguments `arg0`, `arg1`, `arg2`. The function returns the result of the SBI call.
  - `unsafe { ... }`: Since SBI calls involve `asm!` (inline assembly), it needs to be executed within an `unsafe` block.
  - `asm!`: Specifies the actual assembly instructions, including setting parameters and executing the `ecall` instruction, which triggers the SBI call.

#### Console Output

- **`console_putchar` Function**: This function outputs a character to the console using the `SBI_CONSOLE_PUTCHAR` operation (via SBI's `putchar` functionality). It serves as the underlying implementation for logging and console interaction.
  - `sbi_call(SBI_CONSOLE_PUTCHAR, c, 0, 0)`: Calls `sbi_call` to execute the SBI `putchar` operation, where `c` is the character to output.

#### System Shutdown

- **`shutdown` Function**: Provides a method to safely shut down the system via SBI call.
  - `crate::board::QEMU_EXIT_HANDLE.exit_failure()`: This line actually calls the board-specific exit handler to perform the shutdown operation. Typically, this involves sending a signal to QEMU to terminate the simulation.

### Functionality and Purpose

This module provides interfaces for basic hardware operations in Rust bare-metal environments, allowing Rust code to perform standard low-level operations such as output and shutdown. By encapsulating these low-level operations into Rust functions, it enhances code safety and maintainability, while also simplifying the complexity of hardware operations. Additionally, this approach enables other parts of the operating system to interact with hardware not directly through assembly language but through safe abstractions provided by higher-level languages.

### Supplementary 1.6: qemu.rs

The file `boards/qemu.rs` provides a system exit mechanism specific to the QEMU virtual environment, suitable for bare-metal programming based on the RISC-V architecture. This module is particularly important as it allows bare-metal programs written in Rust to control their exit behavior by interacting with the virtual hardware of QEMU. Below is a detailed analysis of this module, including its functionality, purpose, and coordination within the system:

### Functionality and Purpose

#### `QEMUExit` Trait

- **Functionality**: Defines basic operations for interacting with the QEMU virtual machine, including normal exit, failure exit, and system reset.
- **Methods**:
  - `exit(&self, code: u32) -> !`: Sends an exit signal to the QEMU virtual machine. This method allows terminating QEMU execution with a specific exit code.
  - `exit_success(&self) -> !` and `exit_failure(&self) -> !`: Provide convenient methods for common exit operations, corresponding to successful and failed exit scenarios.

#### `RISCV64` Struct

- **Configuration**: Represents a specific configuration for sending exit signals to the `sifive_test` device in QEMU.
- **Instantiation**: Initialized using the `new(addr: u64)` method, where `addr` is the mapping address of the `sifive_test` device in QEMU.
- **Implementation**: Implementation of the `QEMUExit` trait allows sending exit signals to QEMU, controlling the manner in which the test environment ends.

#### Assembly Operations

- **Implementing Exit Operations**: Directly writes a value to the specified memory address using Rust's inline assembly feature (`asm!` macro), encoding the value based on the provided exit code.
- **Fallback Operation**: If QEMU fails to respond to the exit instruction, the code enters an infinite loop to ensure that no further operations are executed.

### Coordination and Usage Scenarios

1. **Testing and Debugging**:
   - During the development cycle, especially in automated testing environments, `exit_success()` or `exit_failure()` can be called to simulate different test scenario outcomes, thereby controlling the testing process in CI (Continuous Integration) environments.

2. **Error Handling**:
   - In cases of unrecoverable errors or panics in the system, `exit_failure()` can be used to immediately halt program execution, ensuring that error states are properly recorded and responded to, preventing further error propagation.

3. **Coordination with Other Modules**:
   - The panic handling function defined in `lang_items.rs` may call `shutdown()`, which ultimately utilizes the exit mechanism provided by `boards/qemu.rs` to safely shut down the QEMU virtual machine.
   - The main program or test scripts in `main.rs` can directly utilize these exit functions to control the program's runtime state in QEMU, especially after completing all tests or in the event of a serious error.

### Summary

The `boards/qemu.rs` file adds important testing and error handling capabilities to bare-metal programming based on RISC-V and Rust by providing precise control over QEMU's exit behavior. This capability not only improves development and testing efficiency but also enhances system robustness, making it a key tool for efficiently managing virtualized testing environments.

---

## Supplementary 1.7: Summary of Collaboration

In the project of bare-metal programming based on RISC-V and Rust, the modules `main.rs`, `logging.rs`, `console.rs`, `lang_items.rs`, `sbi.rs`, and `qemu.rs` work together to build a complete bare-metal operating system. Each module has specific responsibilities and dependencies on other modules to provide necessary functionalities and services. Below is a detailed explanation of how these files collaborate:

### Bootstrapping and Initialization Process

1. **System Boot-up (`main.rs` and `lang_items.rs`)**:
   - The system starts from the assembly entry point called by `global_asm!(include_str!("entry.asm"));` in `main.rs`, initializing hardware and stack environments, then jumps to the Rust layer's `rust_main()`.
   - In `rust_main()`, the `clear_bss()` function defined in `lang_items.rs` is called to clear the BSS segment, which allocates zero values for global uninitialized variables.

2. **Logging System Initialization (`main.rs` and `logging.rs`)**:
   - `rust_main()` proceeds to initialize the logging system through the `init()` function in `logging.rs`. This sets up the logging level and format, allowing subsequent logging output.

### Console Output and Logging

3. **Console Output (`console.rs` and `sbi.rs`)**:
   - Logs and other outputs are displayed on the console using the `print!` and `println!` macros provided by `console.rs`. These macros call the printing function in `console.rs`, which interacts with the underlying SBI interface via `sbi.rs` to send characters to the console.

4. **Logging Output (`logging.rs` and `console.rs`)**:
   - `logging.rs` defines the logging levels and output methods, with all logging calls through the `log` macro library ultimately outputting to the console through the printing function in `console.rs`.

### Error Handling and System Shutdown

5. **Panic Handling and System Shutdown (`lang_items.rs` and `sbi.rs`)**:
   - When the system encounters an unrecoverable error, the panic handling function in `lang_items.rs` is triggered. This function utilizes the output functionality provided by `console.rs` to print error messages and then calls the `shutdown()` function in `sbi.rs` to safely shut down the system.

6. **QEMU-Specific Exit Handling (`qemu.rs`)**:
   - In scenarios such as automated testing or when precise control over exit states is needed, `qemu.rs` provides QEMU-specific exit functionality. This is achieved by writing to a specific memory address to signal QEMU to exit, supporting both successful and failed exit states.

### Summary

The collaboration among these modules establishes a complete foundation for developing a bare-metal operating system based on RISC-V and Rust. Each module assumes specific responsibilities and relies on others to provide necessary functionalities and services. From system booting, logging, console output, error handling, to specific handling for virtualized environments, each module plays a crucial role in ensuring the system's proper operation and efficient management during development. This modular and layered design approach not only enhances code maintainability but also allows for independent updates and optimizations, representing an exemplary model in modern operating system design.

---

## Supplement 2: Subsequent High-Level Extensions

> A brief overview of the high-level extensions following the basic content of writing the main program.

### 1. Device Driver Development

Device drivers are a critical part of the interaction between the operating system and hardware devices, allowing the OS and applications to communicate with hardware through standardized interfaces. Developing device drivers in a RISC-V and Rust environment not only leverages Rust's type safety and memory safety features to reduce common errors in driver development but also explores new driver architectures and concurrency models.

#### Driver Development Process:

1. **Understanding Hardware Interfaces**: Thoroughly understand the working principles and programming interfaces of hardware devices, often requiring reading hardware manuals and datasheets.
2. **Driver Design**: Design the driver architecture based on the hardware interface and the requirements of the operating system, determining how the driver interacts with other parts of the OS.
3. **Rust Driver Implementation**: Write driver programs in Rust, utilizing Rust's modules and traits to organize code, ensuring the maintainability and extensibility of the driver.
4. **Testing and Verification**: Test the driver program on actual hardware or in a simulated environment, verifying its functionality and performance, ensuring the stability and reliability of the driver.

### 2. Application Development and System Services

In addition to driver development, writing the main program also includes implementing various applications and system services, such as file managers, network services, and graphical user interfaces (GUIs).

1. **System Tools and Services**: Develop basic system tools and services, such as shells, logging services, and system monitoring tools.
2. **Network Applications**: Implement network applications using the network stack, such as HTTP servers, FTP clients, and remote command execution.
3. **Graphical Interfaces**: If the hardware supports it, try developing simple graphical user interfaces to provide a more user-friendly interaction method.

### 3. Real-time System Development

For applications requiring high time determinism, such as industrial control and robot navigation, you can implement real-time operating system (RTOS) features at this stage. Rust's efficient execution and memory safety features make it very suitable for real-time system development.

- **Task Scheduling**: Implement real-time scheduling strategies, such as fixed priority scheduling or round-robin scheduling, to ensure critical tasks are executed on time.
- **Resource Locking**: Design low-latency lock mechanisms for real-time task synchronization, such as priority inheritance mutexes, to reduce task blocking time.
- **Timers and Time Management**: Utilize RISC-V's timer features to implement precise time management and task scheduling.

### 4. Security Features Implementation

The security of the operating system is crucial for protecting user data and preventing malicious attacks. You can integrate various security mechanisms during the main program writing phase.

- **Access Control**: Implement role-based access control (RBAC) or discretionary access control (DAC) mechanisms to limit access to system resources.
- **Encryption Services**: Provide data encryption and secure communication services, such as implementing the TLS/SSL protocol, to protect the security of data transmission.
- **Secure Boot**: Implement a secure boot process to ensure the system boots from a trusted source, preventing malicious code execution.

### 5. Performance Optimization

Optimizing the performance of the operating system is crucial for improving user experience and resource utilization. Rust's zero-cost abstractions allow you to write high-level abstract code without sacrificing performance.

- **Concurrency and Parallel Processing**: Utilize Rust's asynchronous programming model and concurrency primitives, such as `async/await`, `Futures`, `Tokio`, etc., to optimize the efficiency of I/O operations and task execution.
- **Memory Management Optimization**: Reduce memory waste and improve access speed through fine-grained memory allocation strategies and caching mechanisms.
- **System Call Optimization**: Optimize the system call path, reducing the overhead of context switching and speeding up the processing of system calls.

### 6. Cross-Platform Support

Considering the scalability of the RISC-V architecture and Rust's cross-platform features, you can consider system cross-platform compatibility when writing the main program.

- **Hardware Abstraction Layer (HAL)**: Develop a hardware abstraction layer to shield hardware differences, simplifying driver development across different RISC-V platforms.
- **Conditional Compilation**: Utilize Rust's conditional compilation features to provide customized implementations for different hardware platforms and operating system features.

### 7. Embedded and IoT Applications

With the proliferation of IoT devices, operating system development for embedded systems and IoT devices has become an important field. RISC-V, with its high configurability and energy efficiency advantages, has become the preferred architecture for many embedded and IoT projects.

- **Low Power Design**: Implement low power management strategies, such as dynamic power management and sleep modes, to extend the battery life of devices.
- **Resource Constraint Optimization**: Optimize memory and storage use on resource-constrained embedded devices, such as through kernel slimming and optimization of compilation options to reduce the system's resource footprint.
- **IoT Communication Protocols**: Implement lightweight communication protocols suitable for IoT, such as

 MQTT, CoAP, etc., to support efficient communication between devices.

### 8. Cloud Computing and Microservices Architecture

With the rise of cloud computing and microservices architecture, operating systems also need to adapt to the requirements of running in virtualized environments and containers, providing flexible resource management and service deployment capabilities.

- **Containerization Support**: Provide a container runtime environment, supporting the operation and management of containers on the operating system, such as Docker containers.
- **Lightweight Virtualization**: Implement lightweight virtualization technologies, such as Unikernels or lightweight VMs, to improve resource utilization and boot speed in cloud environments.
- **Microservices Communication**: Support efficient service discovery and network communication mechanisms to facilitate rapid communication and data exchange between microservices.

### 9. Developer Tools and Ecosystem

A robust developer toolchain and a rich ecosystem are key factors driving the success of an operating system. Operating system projects based on RISC-V and Rust can benefit from the maturity and activity of the Rust ecosystem.

- **Debugging and Performance Analysis Tools**: Develop debugging and performance analysis tools optimized for the RISC-V architecture, helping developers more effectively locate issues and optimize performance.
- **Cross-Platform Build Tools**: Provide cross-platform build and deployment tools, simplifying the software development and testing process across different RISC-V platforms and devices.
- **Ecosystem Integration**: Integrate a wide range of Rust libraries and frameworks, using ready-made components from the Rust ecosystem to accelerate development, enhancing system functionality and reliability.

### 10. Security and Privacy Protection

As the importance of digital security and privacy protection becomes increasingly prominent, designing operating systems that support advanced security features becomes particularly important.

- **Kernel Hardening**: Take measures to harden the operating system kernel, preventing attackers from exploiting system vulnerabilities.
- **Privacy Protection Technologies**: Implement data encryption, anonymous communication, and other privacy protection technologies to ensure the security and privacy of user data.
- **Secure Update Mechanisms**: Design secure system update mechanisms to ensure the system can apply patches and updates timely and securely.

### 11. Distributed System Support

As distributed computing becomes increasingly popular, operating systems need to provide support for distributed architectures, such as distributed file systems, distributed database support, and native support for distributed computing frameworks.

- **Distributed Locks and Synchronization**: Implement lock and synchronization mechanisms in a distributed environment, ensuring data consistency across multiple computing nodes.
- **Network Partition Tolerance**: Design the system to tolerate network partitions, ensuring the system's robustness by implementing strategies from the CAP theorem (Consistency, Availability, Partition Tolerance).

### 12. Machine Learning and Artificial Intelligence

As machine learning and artificial intelligence (AI) technologies develop, operating systems also need to adapt to the needs of these high-performance computing tasks, providing optimized resource management and scheduling.

- **AI Accelerator Hardware Support**: Integrate support for AI accelerators (such as GPUs, TPUs) to optimize the efficiency of AI workloads.
- **Machine Learning Library Integration**: Provide integration support with popular machine learning libraries and frameworks (such as TensorFlow, PyTorch), simplifying the deployment and operation of AI applications.

### 13. Edge Computing

Edge computing shifts data processing from the central cloud to the network edge to reduce latency and bandwidth consumption. For operating systems, this requires supporting efficient operation on resource-constrained edge devices.

- **Lightweight Container Technologies**: Implement or optimize lightweight container technologies, such as Docker's lightweight version or Kubernetes edge edition, to support rapid deployment and management of applications on edge devices.
- **Offline and Low Bandwidth Optimization**: Optimize the system to support operation in environments with limited or no network connectivity, including data caching, latency tolerance mechanisms, etc.

### 14. Trusted Computing

Trusted computing aims to ensure the security and trustworthiness of computing processes through hardware and software mechanisms. For operating systems, this means implementing a series of secure boot and runtime detection mechanisms.

- **Secure Boot**: Implement hardware-based secure boot mechanisms, such as using TPM (Trusted Platform Module) for system integrity verification.
- **Runtime Integrity Verification**: Conduct regular or event-triggered runtime system integrity verification to ensure the system has not been tampered with by malicious software.

### 15. Adaptive and Self-healing Systems

As system environments become increasingly complex and variable, operating systems need a certain degree of adaptability, automatically optimizing configurations based on changes in the runtime environment and workload, and even self-repairing when problems are detected.

- **Adaptive Scheduling**: Implement adaptive task scheduling strategies based on workload characteristics to optimize the system's response time and resource utilization.
- **Self-healing Mechanisms**: Develop fault detection and recovery mechanisms, allowing the system to automatically take recovery measures when encountering software errors or hardware failures, reducing system downtime.

### 16. High Availability and Fault Tolerance

For critical tasks and enterprise-level applications, operating systems need to provide high availability and fault tolerance capabilities to ensure the system and services remain operational in the face of hardware failures, software defects, or network issues.

- **Cluster

 Management and Failover**: Implement cluster management functions, supporting automatic fault detection and failover to minimize the impact of single points of failure.
- **Data Redundancy and Backup**: Provide data redundancy storage and regular backup mechanisms to prevent data loss and damage, quickly restoring system state.

### 17. Multimodal Interaction

With the development of artificial intelligence technologies, users expect to interact with the system in various ways, including voice, touch, gestures, etc. Operating systems need to support multimodal input and output to provide a more natural and intuitive user experience.

- **Voice Recognition and Virtual Assistants**: Integrate voice recognition technology, support voice commands and interactions, and develop virtual assistant functions.
- **Touch and Gesture Control**: Optimize support for touchscreens and gesture recognition devices, implementing intuitive touch interactions and gesture control.

### 18. ...

### Summary

By exploring the fourth step of the general process of bare-metal programming with RISC-V and Rust, writing the main program, and exploring the extended functionality and advanced features of operating systems, we have gained a comprehensive perspective, seeing the broad domain and endless possibilities of operating system development. From handling core concepts to introducing advanced extensions, each step reflects careful consideration of performance, security, usability, and future trends.

This section's extensive discussion, from driver development to cloud-native support, from real-time system features to edge computing and security mechanisms, not only provides readers with a conceptual map of operating system development but also shows how to contribute to the future of operating systems through practice and innovation in this rapidly evolving technological field.