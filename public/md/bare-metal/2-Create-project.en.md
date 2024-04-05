# 2. Creating a Project

Creating a bare-metal programming project based on RISC-V and Rust is a crucial step in the entire development process. This step involves not only using Rust's package manager Cargo to initialize the project but also configuring the project to meet the specific needs of a bare-metal environment. Below, the knowledge points and operational process of this step are explained in detail.

### Using Cargo to Create a Project

- **Cargo**: Rust's package manager and build tool, used to create, build, and manage Rust projects. Cargo handles dependency management, the compilation process, and allows for the publishing of libraries to [crates.io](https://crates.io/).

- **Creating a Library Project**: Bare-metal projects typically do not use Rust's standard library (std), so it is recommended to create a library project (lib) instead of a binary project (bin). This can be easily done with the Cargo command:

  ```bash
  cargo new --lib project_name
  ```

  This command generates a new project directory containing the basic project structure and `Cargo.toml` configuration file.

### Configuring Cargo.toml

- **Specifying Not to Use the Standard Library**: In bare-metal programming, since there is no operating system support, it's necessary to specify not to use Rust's standard library in `Cargo.toml`. This is done by adding the `#![no_std]` attribute in the project's root file (usually `lib.rs` or `main.rs`).
- **Configuring the Target Architecture**: You also need to specify the build target and optimization level in `Cargo.toml`, which can be done by setting the target triple and adjusting `profile`. For instance, to optimize for a RISC-V 32-bit architecture, you might need to add the corresponding target configuration.

### Writing Basic Code for a Bare-Metal Application

- **Adding Startup Code**: Bare-metal applications need an entry point, typically a function named `_start`. Since Rust by default looks for a `main` function as the program entry, bare-metal programming needs to bypass this behavior by directly using `_start` as the entry point and using the `#[no_mangle]` attribute to prevent name mangling, ensuring the linker can correctly identify the entry point.

  ```rust
  #![no_std]
  #![no_main]
  
  #[no_mangle]
  pub extern "C" fn _start() -> ! {
      loop {}
  }
  ```

- **Configuring Attributes Specific to Bare-Metal Environments**: Due to the lack of the standard library, some functionalities that are available by default in a regular Rust environment (like a panic handler) need to be manually configured in a bare-metal setting.

### Configuring Build Scripts and Toolchain

- **Writing Build Scripts**: To build the project in a bare-metal environment, it might be necessary to write a custom `build.rs` build script to adjust compilation options or perform conditional compilation.
- **Configuring `.cargo/config.toml`**: You can specify default linkers and other build parameters for a specific target in `.cargo/config.toml`, which is crucial for cross-compilation.
  - Alternatively, by **using command line and environment variable `RUSTFLAGS`** to pass these parameters, which is convenient for one-off builds or specific build environments (like CI/CD).


### Summary

Creating a project is the foundation for developing bare-metal applications. It involves using the Cargo tool, configuring the project to adapt to a bare-metal environment, and writing a code structure suitable for bare-metal startup, among other key activities. Understanding the purpose of these steps and configurations and the principles behind them is crucial for successfully developing RISC-V bare-metal applications. With the project set up, the next steps involve writing specific application logic, building, linking, and running the program on target hardware, which will be explained in subsequent content.

---

## Further Explanation

### 1. Reasons for Choosing Library Projects Over Binary Projects

In Rust, projects can be either library (lib) or binary (bin) projects. Library projects are designed to provide reusable code, whereas binary projects generate executable files.

- **Library Projects**: Bare-metal programming often chooses library projects because it allows developers more flexibility in defining the program's entry point (such as the `_start` function), instead of the default `main` function. Library projects facilitate code reuse in different environments, especially in bare-metal applications where precise control over the startup process and execution environment is needed.
- **Binary Projects**: Although they can also be used for bare-metal programming, they typically expect a `main` function as the program entry, which usually isn't suitable in environments lacking standard library support.

### 2. The Meaning and Use Cases of Special Attributes/Configuring Attributes Specific to Bare-Metal Environments

In Rust, special attributes (attributes) provide a way to interact with the compiler, altering the compilation process or indicating the compiler to specially handle certain sections of the code.

Bare-metal environments lack operating system

 support, so specific attributes are needed to configure the environment. Here are some important attributes and their uses:

- **#![no_std]**: This attribute disables Rust's standard library (std), in favor of Rust's core library (core), which provides the most basic abstractions for bare-metal or operating system development. `#![no_std]` is used because the standard library relies on operating system-level functionalities, unavailable in a bare-metal environment.

- **#![no_main]**: Disables Rust's default entry point lookup mechanism, allowing developers to define their own entry point. In bare-metal applications, the operating system does not call the `main` function, so it's necessary to explicitly mark not to use Rust's standard entry point mechanism.

  - **#![no_std]** and **#![no_main]**: These attributes are placed at the top of the source file's root (usually `lib.rs` or `main.rs`), applying the `#![attribute]` syntax to the entire crate.

  - ```rust
    #![no_std]
    #![no_main]
    ```

- **#[no_mangle]**: This attribute is used to prevent the Rust compiler from changing the name of a function (name mangling), ensuring the function name remains unchanged in the compiled binary. This is crucial when defining a custom entry point (such as `_start`) because the linker needs to accurately identify this entry point.

  - Applied before a function declaration to prevent the compiler from changing the function's name. The `#[attribute]` syntax applies to individual items.

  - ```rust
    #[no_mangle]
    pub extern "C" fn _start() -> ! {
        // Startup code
    }
    ```

- **#[panic_handler]**: Defines a panic handling function. In the absence of the standard library, Rust requires you to provide a function to handle panic because the default panic behavior relies on the standard library. This function must accept a `&PanicInfo` parameter and never return (return type is `!`):

  ```rust
  use core::panic::PanicInfo;
  
  #[panic_handler]
  fn panic(_info: &PanicInfo) -> ! {
      // Define behavior during panic here
      loop {}
  }
  ```

- **#[alloc_error_handler]**: If your program uses heap allocation (through the `alloc` crate), you must define an error handling function for allocation failures. This applies to applications that need to use dynamic memory allocation even in a bare-metal environment.

### 3. Further Explanation on Startup Code

Startup code, also known as the boot sequence or bootstrap code, is a critical part of bare-metal applications. It's responsible for initializing hardware and setting up the necessary runtime environment before jumping to the main logic of the application.

#### Responsibilities of Startup Code

- **Hardware Initialization**: This includes setting up the clock, configuring memory, initializing peripherals, etc.
- **Stack Pointer Setup**: Provides stack space for the program's execution.
- **Calling Global Constructors**: If present, such as in C++.
- **Jumping to the Main Program**: After setting up the environment, it jumps to the main logic of the program to start execution.

#### Example

In Rust, the startup code might look something like this:

```rust
#[no_mangle]
pub extern "C" fn _start() -> ! {
    // Hardware initialization code

    // Set up the stack pointer
    // asm!("mov sp, {}", val(stack_top));

    // Jump to main program logic
    main();

    loop {}
}

// Assuming this is your main program logic
fn main() {
    // Main program code
}
```

> Here, `main` is not the traditional entry point in the sense of a typical Rust program but is used to illustrate how to transition from a custom entry point (such as `_start`) to the main part of the program. In this context, `main` is just a regular function, not the entry point specific to binary projects. This pattern is commonly used in bare-metal programming, especially in library projects that do not rely on the standard library, where developers need to clearly define their own program entry logic.

Due to the use of `#![no_std]`, the standard library is unavailable, so you need to use the `core` library or custom libraries to replace the functionalities of the standard library.

The startup code is an essential part of bare-metal application development, requiring developers to have a deep understanding of the target hardware. Writing and configuring startup code correctly is key to ensuring the program runs correctly.

### 4. Methods and Naming Conventions for Configuring Target Architecture

Configuring the target architecture means instructing the compiler to generate code for a specific hardware platform. This is particularly important in bare-metal programming and cross-compilation.

- **Configuration Methods**: New compilation targets can be added with the `rustup target add <target>` command. Additionally, setting the `[build] target` value in the project's `.cargo/config.toml` file is a common method.
- **Rust Target Architecture Naming Convention**: Rust uses a specific format to denote target architectures, typically formatted as `<arch><sub>-<vendor>-<sys>-<abi>`.
  - **arch**: Refers to the CPU architecture, like `riscv64` for 64-bit RISC-V.
  - **sub**: A subtype of the architecture, like `gc` for RISC-V with “G” integer and “C” compressed instructions.
  - **vendor**: Manufacturer, usually `unknown` for cross-platform targets.
  - **sys**: System type, typically `none` for bare-metal indicating no operating system.
  - **abi**: Binary interface, like `elf` for using the ELF format.

#### Examples

- riscv64gc-unknown-none-elf:
  - `riscv64`: 64-bit RISC-V architecture.
  - `gc`: Supports “G” and “C” extensions.
  - `unknown`: Manufacturer unspecified.
  - `none`: No operating system.
  - `elf`: Uses the ELF binary interface.
- Other possible examples:
  - **thumbv7em-none-eabi**: For ARM Cortex-M4/M7 devices without an operating system, using EABI.
  - **aarch64-unknown-none**: For a bare-metal environment of 64-bit ARM architecture with an unspecified manufacturer.

### 5. `build.rs` Build Scripts, Command-Line Building, and `.cargo/config.toml`

> `link_riscv32.x`, `link_riscv64.x`, and `src/linker.ld` are examples of linker scripts.

- **`build.rs` Build Scripts**: An independent Rust program executed by Cargo before compiling your project. This script can be used for various automated build tasks, such as code generation, automated modifications to `Cargo.toml`, adding compilation flags, etc. In bare-metal projects, `build.rs` can be used to set specific compiler flags or environment variables crucial for the target platform.

  - An example use case for `build.rs` is when you need to adjust compilation options based on the target platform. In `build.rs`, you can check the target architecture and set the corresponding compilation flags accordingly.

  - Usage: Create a `build.rs` file in the project root directory and define the build logic within it. Cargo will automatically execute this script every time the project is built.

  - ```rust
    use std::env;
    
    fn main() {
        let target = env::var("TARGET").unwrap();
        if target.contains("riscv32") {
            println!("cargo:rustc-link-arg=-Tlink_riscv32.x");
        } else if target.contains("riscv64") {
            println!("cargo:rustc-link-arg=-Tlink_riscv64.x");
        }
    }
    ```

- **Direct Command-Line Use (`RUSTFLAGS` environment variable)**: Although `build.rs` offers flexibility and powerful capabilities during the automated build process, you can still directly use the command line to build the project. For example, you can use the `cargo build --target your-target-triple` command to specify the target architecture directly. If specific compilation flags are needed, they can be set through environment variables like `RUSTFLAGS`, which may be more straightforward and convenient for simple projects or one-off build tasks.

  - By setting `RUSTFLAGS` in the command line, you can directly pass specific compiler and linker options, achieving the same effect as using `println!("cargo:rustc-link-arg=...")` in a `build.rs` script.

  - ```bash
    RUSTFLAGS="-C link-arg=-Tlink_riscv64.x" cargo build --target=riscv64gc-unknown-none-elf
    ```

- **`.cargo/config.toml` Configuration**: The `.cargo/config.toml` configuration provides a way to configure Cargo's behavior, including default build targets, environment variables, compiler parameters, etc. Create a `config.toml` file in the `.cargo` directory and add configurations within it. This file can control many aspects of Cargo, especially useful for simplifying command-line parameters, setting default target architectures, and configuring linkers.

  - ```toml
    [build]
    target = "riscv64gc-unknown-none-elf"  # Default build target
    
    [target.'cfg(target_arch = "riscv32")']
    rustflags = ["-C", "link-arg=-Tlink_riscv32.x"]  # Set specific compiler flags for the riscv32 target
    
    [target.'cfg(target_arch = "riscv64")']
    rustflags = ["-C", "link-arg=-Tlink_riscv64.x"]  # Set specific compiler flags for the riscv64 target
    ```

  - This configuration file does several things:

    - Sets the default build target to `riscv64gc-unknown-none-elf`.
    - Sets different compiler flags for the `riscv32` and `riscv64` target architectures based on `target_arch`, mainly specifying different linker scripts.

### 5⅓. Differentiating Between the Three Methods

These three methods are used to pass specific parameters to the Rust compiler, especially for specifying linker scripts, thus affecting the output of the compilation. Their common effect is to ensure the use of specific linker scripts during the compilation process, but each has its advantages and applicable scenarios.

- **Common Effect**

Whether through a `build.rs` script, the `RUSTFLAGS` environment variable, or the `.cargo/config.toml` configuration file, their ultimate function is to pass the `-C link-arg=-T<linker_script>` parameter to the Rust compiler. This instructs the compiler (or more accurately, the linker) to use the specified linker script when linking the compiled object files into the final executable or library file. Linker scripts control the linking process, such as specifying the layout of various sections (e.g., `.text`, `.data`, `.bss`, etc.).

- **Distinct Advantages**

  - **`build.rs`**: Provides a programmatic way to dynamically generate compilation parameters. Especially when the compilation parameters need to be decided based on complex logic, `build.rs` offers more flexibility. For example, you can dynamically choose linker scripts based on the target platform, environment variables, or other conditions.

  - **Command Line `RUSTFLAGS`**: Very useful for one-off compilation tasks or in specific build environments (like CI/CD pipelines), allowing quick overriding or addition of compilation parameters without modifying the project's configuration files.

  - **`.cargo/config.toml`**: Offers a persistent and project-wide method of configuration, suitable for projects that consistently use the same compilation settings for a specific target platform.

#### Settings and Their Meanings

##### Conditional Checks and Dynamic Parameter Setting in `build.rs`

```rust
if target.contains("riscv32") {
    println!("cargo:rustc-link-arg=-Tlink_riscv32.x");
}
```

- This code checks whether the compilation target includes the `"riscv32"` string. If so, it outputs a special key-value pair, telling Cargo to add the `-C link-arg=-Tlink_riscv32.x` parameter to the compilation command, meaning to use `link_riscv32.x` as the linker script.

##### `RUSTFLAGS` in Command Line

```bash
RUSTFLAGS="-C link-arg=-Tlink_riscv32.x" cargo build --target=riscv32imac-unknown-none-elf
```

- Directly specifies compiler parameters in the command line via the `RUSTFLAGS` environment variable. Here, `-C link-arg=-Tlink_riscv32.x` instructs the linker to use `link_riscv32.x` as the linker script, while `--target=riscv32imac-unknown-none-elf` specifies the compilation target.

##### Target-Specific Configuration in `.cargo/config.toml`

- **Configuration for a Specific Architecture**

```toml
[target.'cfg(target_arch = "riscv32")']
rustflags = ["-C", "link-arg=-Tlink_riscv32.x"]
```

- This configuration sets compiler flags for targets that meet the `target_arch = "riscv32"` condition. This means that when the compilation target's architecture is `riscv32`, the `-C link-arg=-Tlink_riscv32.x` compiler parameter will be automatically applied.

### 5⅔. Continued Examples and Further Differentiation

To specify the compilation target as `riscv64gc-unknown-none-elf` and pass the linker script `src/linker.ld` along with enabling forced frame pointers compilation option (`-Cforce-frame-pointers=yes`), we can use `build.rs` build script, command-line building, and `.cargo/config.toml` in different ways to achieve this goal.

#### Using `build.rs` Build Script

In `build.rs`, you can detect the target architecture and dynamically add compiler and linker parameters based on it. However, note that `build.rs` is mainly used to output configurations during compilation and cannot directly specify the compilation target, which needs to be specified in the command line with the `--target` flag or configured in `.cargo/config.toml`.

```rust
use std::env;

fn main() {
    let target = env::var("TARGET").unwrap();
    if target == "riscv64gc-unknown-none-elf" {
        println!("cargo:rustc-link-arg=-Tsrc/linker.ld");
        println!("cargo:rustc-flags=-C force-frame-pointers=yes");
    }
}
```

#### Using Command-Line Building

In the command line, you can directly use the `RUSTFLAGS` environment variable to add compiler and linker parameters and use the `--target` option to specify the target architecture.

```bash
RUSTFLAGS="-C link-arg=-Tsrc/linker.ld -C force-frame-point

ers=yes" cargo build --target riscv64gc-unknown-none-elf
```

#### Using `.cargo/config.toml`

`.cargo/config.toml` offers a persistent way to configure compilation parameters, which is very useful when you need to use the same compilation and linking settings for a specific target architecture repeatedly.

```toml
[build]
target = "riscv64gc-unknown-none-elf"

[target.riscv64gc-unknown-none-elf]
rustflags = [
    "-Clink-arg=-Tsrc/linker.ld", "-Cforce-frame-pointers=yes"
]
```

Here, we first set the default compilation target to `riscv64gc-unknown-none-elf` in the `[build]` section, then set the required `rustflags` for this specific target architecture, including specifying the linker script and enabling forced frame pointers option.

#### Summary Revisited

Each of the three methods has its pros and cons:

- **`build.rs`** offers the greatest flexibility, particularly suited for dynamically generating compilation configurations based on complex logic.
- **Command-line building** is suitable for one-off builds or dynamically adjusting compilation parameters in continuous integration workflows.
- **`.cargo/config.toml`** is the most stable configuration method, ideal for projects that have long-term fixed compilation configurations.

The choice among these methods depends on project requirements, team habits, and development workflows.







