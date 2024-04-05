- # 1. Setting Up the Development Environment

  > For those who are new to bare-metal programming with RISC-V and Rust, understanding the overall process of setting up the development environment is the first step, while the specific tools and detailed operations mentioned in the process can be gradually learned later. This means that even if you do not fully understand the specific use of each tool or how to configure them precisely at the beginning, it will not affect subsequent learning and practice. As you gradually grasp the entire development process, the methods of using these tools and their interrelationships will become clear and straightforward.

  Setting up a development environment for bare-metal programming with RISC-V and Rust is foundational to the entire development process. It includes installing necessary software tools, configuring compilation targets, and understanding the basic use of development tools. This step not only lays the foundation for subsequent programming work but also relates to development efficiency and the convenience of program debugging. Below, key knowledge points and tools in this step are detailed.

  ### 1. Installing the Rust Programming Environment

  - **Rustup**: Installation and version management of Rust is typically done through rustup. Rustup simplifies the installation of the Rust programming language and related tools, while also facilitating the management of different Rust versions and cross-compilation toolchains for various target architectures.
  - **Key Point**: Familiarize yourself with basic rustup commands, such as `rustup update` to update the Rust version, and `rustup target add` to add a new compilation target.

  ### 2. Configuring the RISC-V Target Architecture

  - **Cross-Compilation Target**: To support the RISC-V architecture, the Rust compiler needs to have the corresponding target architecture added. There are several variants of RISC-V (such as RV32I, RV64GC, etc.), and selecting the correct target architecture for your hardware or emulator is important.
  - **Key Point**: Get acquainted with Rust's target architecture naming conventions, for example, `riscv64gc-unknown-none-elf` represents a generic RISC-V 64-bit target with GC (i.e., G and C extensions for integer multiplication and division, and compressed instructions).

  ### 3. Installing the Cross-Compilation Toolchain

  - **RISC-V GNU Toolchain**: Although Rust can generate target machine code, linking to produce the final executable often requires an external toolchain, such as the RISC-V GNU Compiler Toolchain, which provides compilers, assemblers, linkers, and other tools.
  - **Key Point**: Learn how to install and configure the RISC-V GNU toolchain and how to integrate it with Rust's cross-compilation process.

  ### 4. Using Emulators or Hardware Tools

  - **QEMU**: As a commonly used hardware emulator, QEMU can simulate RISC-V architecture, allowing developers to develop and test without physical RISC-V hardware.
  - **Key Point**: Learn how to use QEMU to run and debug RISC-V programs, understanding the capabilities of QEMU in supporting RISC-V architecture and simulating peripherals.

  ### 5. Editor and IDE Configuration

  - **Visual Studio Code**: VS Code is a popular editor that supports Rust language and RISC-V development. By installing Rust plugins (such as rust-analyzer) and configuring appropriate build tasks, development efficiency can be enhanced.
  - **Key Point**: Master how to configure VS Code to support development with the Rust language and RISC-V target architecture, including syntax highlighting, code completion, error prompts, and setting up compile tasks.

  ### 6. Debugging Tools

  - **GDB**: The GNU Debugger (GDB) supports the RISC-V architecture and can be used for debugging bare-metal programs. Combined with hardware debuggers (such as JTAG interfaces) or emulators (such as QEMU), GDB can provide powerful debugging capabilities.
  - **Key Point**: Familiarize yourself with basic commands and techniques for cross-debugging with GDB, understanding how to set breakpoints, inspect registers and memory, step through execution, and view the program flow.

  Through the learning of the above steps and knowledge points, developers will not only be able to set up a fully functional development environment but also effectively carry out the writing, compilation, debugging, and testing of bare-metal programs. Although the process of setting up this environment might seem complex at first glance, it lays a solid foundation for delving into bare-metal programming with RISC-V and Rust.

  ---

  Now, let's once again outline the overall process of using these tools in conjunction:

  ### Development Environment Setup Process

  1. **Install Rust and rustup**:
     - Before starting, install the Rust programming environment and rustup tool, the latter helps manage Rust versions and compilation targets.
  2. **Add RISC-V Target Architecture**:
     - Use rustup to add support for the RISC-V architecture, configuring the target platform for cross-compilation.
  3. **Install RISC-V GNU Toolchain**:
     - Obtain the RISC-V cross-compiler, linker, and other

   tools needed to build and link bare-metal programs.
  4. **Configure Emulator or Prepare Hardware Tools**:
     - If there's no physical hardware, use emulators like QEMU; if hardware is available, learn how to upload and run programs.
  5. **Choose the Appropriate Editor and Configure the IDE**:
     - Install and configure Visual Studio Code or another editor, installing necessary Rust plugins to enhance development efficiency.
  6. **Learn and Configure Debugging Tools**:
     - Get familiar with GDB or other debugging tools suitable for RISC-V, learning how to debug programs on emulators or actual hardware.

  ### The Significance of Using These Tools Together

  - These tools and steps together form the infrastructure for RISC-V bare-metal programming, making it possible to go from writing code to running and debugging the program.
  - **While writing code**, Rust's syntax and type system provide safety and efficiency, while editor and IDE plugins offer syntax highlighting, code completion, and error prompts, improving development efficiency.
  - **During compilation and program building**, Rust's cross-compilation functionality and the RISC-V GNU toolchain work together to generate machine code for the target architecture.
  - **For running and debugging the program**, simulators or hardware tools, along with debugging tools like GDB, enable developers to test, run, and debug their programs, even in environments without an operating system.

  As readers gradually delve deeper into the use of this series of tools and processes, they will become more comfortable with bare-metal programming based on RISC-V and Rust. In subsequent content, we will continue to explain in detail the use of these tools and their roles in the actual development process, helping readers build a complete knowledge system and skill framework.

  ---

## Glossary 1

- **Development Environment**: Refers to the collection of tools and software needed for software development, usually including compilers, editors or Integrated Development Environments (IDEs), and debugging tools. It provides programmers with all the resources needed to write, compile, and debug programs.
- **Editor/IDE**: Text editors (like VS Code) are used for writing code, while Integrated Development Environments (IDEs) offer more comprehensive features, including writing, compiling, and debugging code. IDEs typically include the functionalities of text editors and integrate compilers, debuggers, and other tools.
- **Cross-Compilation**: The process of compiling a program for one architecture on a computer of another architecture. For example, compiling a program on an x86 architecture PC to run on a RISC-V architecture.

- **Compilation Target/Target Architecture**: Refers to the hardware architecture for which the compiler generates code. In Rust, support for a specific target architecture can be added through the `rustup target add` command, facilitating cross-compilation.
- **RISC-V Architecture**: An open-source Instruction Set Architecture (ISA) that supports multiple hardware implementations. RISC-V's design is simple and easy to learn and use, particularly suitable for education and research.
- **RISC-V Variants**: RISC-V defines multiple standards, such as RV32I, RV64GC, etc., corresponding to different sets of functionalities and address space sizes. These variants allow different hardware implementations to choose the standard that best suits their needs.
- **Rust Target Architecture Naming Convention**: Rust uses a specific naming convention to identify target architectures, like `riscv64gc-unknown-none-elf`, which includes architecture, feature set, operating system (typically `none` in bare-metal programming), and Binary Interface (ABI).
- **GNU Toolchain**: A collection of tools including the compiler (GCC), assembler (as), and linker (ld) used for compiling and linking programs. The GNU toolchain supports various architectures, including RISC-V.
- **Compiler, Assembler, Linker**:
  - **Compiler** transforms high-level language (like Rust) code into assembly language.
  - **Assembler** transforms assembly language into machine code.
  - **Linker** combines multiple object files into one executable file, resolving internal and external symbol references.
- **GDB (GNU Debugger)**: Full name GNU Debugger, a powerful debugging tool that supports various programming languages and architectures. GDB can be used for local or remote debugging, including in cross-compilation environments.
- **GNU**: A recursive acronym for “GNU's Not Unix,” the name of a free software project aimed at creating a completely free Unix-like operating system. The goal of the GNU project is to create an operating system that includes all standard Unix tools and functionalities but is entirely independent of proprietary Unix systems.

- **Program Debugging**: The process of finding and fixing program errors. Debugging tools can help developers monitor the execution of a program, check the state of variables, trace function calls, and more.
- **Debugging Tools**: Software tools that assist in program debugging, like GDB (GNU Debugger). They provide functionalities such as setting breakpoints and stepping through execution to help developers find errors.
- **Hardware Debugger and JTAG Interface**: Hardware debuggers communicate directly with the target hardware through interfaces (like JTAG), allowing developers to debug programs at the hardware level. The JTAG interface is a common hardware debugging interface that supports programming and debugging while the hardware is running.

- **Hardware Emulator**: Such as QEMU, is a type of software that can simulate different hardware architectures, allowing programs to run and be tested without physical hardware. Emulators are particularly useful in situations where actual hardware is not available or when simulating specific hardware conditions is required.