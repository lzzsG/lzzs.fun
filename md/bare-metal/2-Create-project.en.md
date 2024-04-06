# II. Creating a Project

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

#### Further Differentiation

- Configuring `rustflags` in `.cargo/config.toml` and setting `RUSTFLAGS` through the command line offer flexibility in format. This flexibility allows developers to choose the most suitable expression based on personal preference or project needs. Let's delve into these differences and their implications.

##### `rustflags` in `.cargo/config.toml`

- **No Space Format**:

    ```toml
    rustflags = ["-Clink-arg=-Tsrc/linker.ld", "-Cforce-frame-pointers=yes"]
    ```

    In this format, each compiler option is an element of the array, with `-C` and the subsequent directive (like `link-arg=`) closely connected. This format reduces the number of strings, making the array appear more compact.

- **With Space Format**:

    ```toml
    rustflags = ["-C", "link-arg=-Tlink_riscv32.x"]
    ```

    This format separates `-C` and its subsequent compiler directive into two elements of the array. This approach may be visually clearer, especially when compiler directives are lengthy or there's a need to emphasize the `-C` option specifically.

  Functionally, these two formats are equivalent. They both effectively pass the same directives to the compiler. The choice between them primarily depends on personal or team preference.

##### `RUSTFLAGS` in Command Line

  When using the `RUSTFLAGS` environment variable in the command line, you typically pass the entire string as a continuous command to the compiler:

  ```bash
  RUSTFLAGS="-C link-arg=-Tlink_riscv32.x"
  ```

  Here, `-C` and `link-arg=` are part of the same string. In the command line, since the entire `RUSTFLAGS` value is enclosed in quotes, whether or not there is space, it's considered part of the same parameter string.

##### The Difference with or without Space after `-C`

- **In `.cargo/config.toml`**, whether it's `"-Clink-arg=..."` or `"-C", "link-arg=..."`, essentially, the same parameters are being passed to `rustc`. The main difference in using array to split parameters is about readability and personal preference.
- **In the command line**, since the entire `RUSTFLAGS` is treated as one string, whether there is a space after `-C` does not affect the parsing of the parameter. However, for consistency and readability, it may be necessary to unify the style according to team standards.

  In summary, whether in the `.cargo/config.toml` configuration file or in setting compiler parameters in the command line, whether there is a space after `-C` mainly affects readability and formatting preferences, not the functionality of the parameters. Developers can choose the most suitable format based on personal or team coding style.

## Expanded Explanation of the Expanded Explanation

### 1. Is there no difference between library and binary projects since we used `#![no_main]`?

Even though the `#![no_main]` attribute makes the distinction between library and binary projects less apparent in terms of defining the entry point, there are still some key differences between the two:

- **Library Projects**: More suitable for bare-metal programming because they allow complete customization of the startup process and entry point. Library projects do not expect a `main` function and are suited for scenarios requiring fine control over the execution flow.
- **Binary Projects**: Expect a `main` function as the program's entry. Although `#![no_main]` can be used in binary projects to allow custom entry points, library projects are generally preferred in bare-metal or operating system kernel development for greater flexibility.

### 2. Adjusting Linker Behavior Using Linker Scripts

The previously mentioned `link_riscv32.x`, `link_riscv64.x`, and `src/linker.ld` are examples of linker scripts.

> Linker scripts and their role in bare-metal programming are relatively advanced and specific topics. This content involves complex concepts like memory layout and the linking process, which might feel abstract and complex for beginners. However, for those just starting with bare-metal programming using RISC-V and Rust, understanding the details of linker scripts is not immediately necessary.

A Linker Script is a script file used by the linker that guides how to link various compiled objects (.o files) and library files into a final executable or library file. In bare-metal programming and operating system development, correct memory layout is crucial for the program's operation. Linker scripts allow developers to precisely specify the position and order of various sections (such as code `.text`, data `.data`, BSS `.bss`) in memory.

#### The Role of Linker Scripts in the General Process

In the general process of bare-metal programming with RISC-V and Rust, **the use of linker scripts mainly pertains to the "Compiling Code" and "Linking Code

" parts**. Linker scripts directly impact the linking step, the process of combining compiled object files into the final executable file.

1. **Compiling Code**: At this stage, your Rust code is compiled into machine code for the target architecture (usually a series of object files). Although the code is compiled, it's not yet organized into an executable program.
2. **Linking Code**: Here, the linker, following the directives of the linker script, links the previously compiled object files and necessary library files into the final executable file according to a specific layout. The linker script plays a decisive role as it defines the detailed information about the program's memory layout, like which part of the code or data should be placed where in memory.

#### Content of Linker Scripts

Linker scripts contain a series of directives and symbol definitions that tell the linker how to map the segments from object files (like `.text`, `.data`, `.bss`, etc.) to positions in the target memory. In bare-metal programming, this allows developers to precisely control the layout of the program, ensuring it runs as expected, especially in embedded systems with specific memory layout requirements.

For example, if your bare-metal program needs to run at a specific memory address, or you need to place code and data in separate memory areas (such as in systems with a Harvard architecture), this can be achieved through linker scripts.

The use and configuration of linker scripts are usually specified during the project's build configuration phase, such as dynamically adding linker parameters through a `build.rs` build script or statically setting linker parameters in `.cargo/config.toml`. This ensures the correct linker script and memory layout are used each time the project is built.

#### Configuring Linker Scripts in `.cargo/config.toml`

By specifying `rustflags` in the `.cargo/config.toml` file, you can instruct the Rust compiler to use a custom linker script during the compilation process. The parameter `-Clink-arg=-Tsrc/linker.ld` specifies the linker script.

```toml
[build]
target = "riscv64gc-unknown-none-elf"

[target.riscv64gc-unknown-none-elf]
rustflags = [
    "-Clink-arg=-Tsrc/linker.ld", "-Cforce-frame-pointers=yes"
]
```

This configuration instructs the compiler to use the linker script located at `src/linker.ld` for the target `riscv64gc-unknown-none-elf`, and to force the use of frame pointers (useful in some debugging scenarios).

Linker scripts' syntax and capabilities are extensive, covering everything from symbol definitions to fine control over segment layouts, offering strong support for operating system development and advanced bare-metal programming. Developers interested in delving deeper can explore the documentation of the GNU linker (ld) to fully understand the capabilities of linker scripts.

---

### Glossary

- **Standard Library (std)**: Rust's standard library, which offers a wide range of functionalities such as data structures, input/output processing, threading, etc. In bare-metal or embedded programming, it is usually not available, thus the `#![no_std]` attribute is used to disable it.
- **Library Project (lib)**: A Rust library project aimed at creating a code library that can be referenced by other projects, instead of generating standalone executable programs.
- **Binary Project (bin)**: A Rust binary project aimed at generating executable files. This is the program that end-users run directly.
- **Boot Code**: The first piece of code that runs after the system is powered on, used to initialize hardware and the runtime environment, preparing for the operation of the operating system or application.
- **Build Script**: Scripts used for automating the compilation and build process, such as `Makefile` or Rust's `build.rs` file.
- **Build Environment**: The software and hardware environment required to compile and build software, including compilers, linkers, libraries, etc.
- **Environment Variable `RUSTFLAGS`**: An environment variable that sets options for the Rust compiler, affecting the compilation process, such as optimization levels, feature enablement, etc.
- **`#![no_std]`**: A Rust attribute used in library or binary projects to disable the standard library, allowing for bare-metal or embedded program writing.
- **`#![no_main]`**: A Rust attribute that allows disabling the default entry point, commonly used in custom boot code scenarios.
- **`#[no_mangle]`**: A Rust attribute that disables mangling (name decoration) by the compiler for a specific function, ensuring the function name remains unchanged after compilation, commonly used for calling Rust functions from external code (such as C or assembly).
- **`#[panic_handler]`**: A Rust attribute used to define a function for handling panics, essential in a `#![no_std]` environment.
- **`core` Library**: Rust's core library, a subset of the standard library that does not depend on the operating system and can be used in a `#![no_std]` environment.
- **Custom Library**: Libraries developed by users or teams for specific functionalities or business logic, which can be referenced by other projects.
- **Compile Flags/Compiler Arguments**: Options passed to the compiler during the compilation process to control the behavior and output of the compilation.
- **`Cargo.toml` Configuration File**: The configuration file for Rust projects, defining the project's dependencies, version, compilation options, etc.
- **Linker Script**: A script that guides the linker on how to combine various compiled object files into the final executable file. It defines the memory layout and the arrangement of different sections.
- **Linker**: A tool that links compiled object files and libraries into an executable file.
- **Compiled Object (.o Files)**: Intermediate products of source code compilation, containing machine code but not yet linked into the final executable file.
- **Memory Layout**: The organization of a program in memory, including the positions and sizes of various segments.
- **Code Segment `.text`**: The memory region that holds program instructions.
- **Data Segment `.data`**: The memory region that holds initialized global and static variables.
- **BSS Segment `.bss`**: Used to store uninitialized global and static variables, in the program start.
