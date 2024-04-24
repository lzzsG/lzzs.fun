# I. Setting Up the Development Environment

  > For those who are new to bare-metal programming with RISC-V and Rust, understanding the overall process of setting up the development environment is the first step, while the specific tools and detailed operations mentioned in the process can be gradually learned later. This means that even if you do not fully understand the specific use of each tool or how to configure them precisely at the beginning, it will not affect subsequent learning and practice. As you gradually grasp the entire development process, the methods of using these tools and their interrelationships will become clear and straightforward.

  >This section does not provide specific details on setting up the development environment but rather gives a general description of the process for basic understanding. For detailed information, please refer to experimental reference books and official documentation.



Setting up a development environment for bare-metal programming based on RISC-V and Rust is a crucial first step in the entire development process. This step not only lays the foundation for subsequent programming work but also directly affects the efficiency of development and the convenience of program debugging. Understanding and configuring the correct tools and environment are essential for successfully developing bare-metal applications. Below is a detailed introduction to the key knowledge points and tools in this step, as well as the specific reasons for making these settings.

## 1. Install Rust Programming Environment

**Tool: Rustup**

- **Functionality**: Rustup is the installation and version management tool for Rust. Through Rustup, developers can easily install the Rust programming language and its related tools while managing different versions of Rust and cross-compilation toolchains for various target architectures.
- **Knowledge Points**: Familiarity with the basic commands of Rustup is crucial, such as using `rustup update` to update the Rust version and `rustup target add` to add a new compilation target.
- **Reason**: The main reason for using Rustup to install and manage the Rust environment is that it offers a unified and convenient way to handle the complexities of multiple versions and multiple platforms, which is crucial for developing and testing on different hardware.

## 2. Configure RISC-V Target Architecture

**Tool: Cross-compilation target**

- **Functionality**: To support the RISC-V architecture, it is necessary to add the corresponding target architecture to the Rust compiler. Since RISC-V has several variants (such as RV32I, RV64GC, etc.), choosing the correct target architecture that matches your hardware or simulator is very important.
- **Knowledge Points**: Understanding Rust's target architecture naming convention is key, for example, `riscv64gc-unknown-none-elf` indicates a generic RISC-V 64-bit target, which includes the GC (integer multiplication and division, and compressed instructions).
- **Reason**: Correct configuration of the target architecture ensures that the compiled code will run correctly on the specified hardware, avoiding failures due to hardware incompatibilities, thereby improving development efficiency and reliability.

## 3. Install Cross-Compilation Toolchain

**Tool: RISC-V GNU Toolchain**

- **Functionality**: Although Rust can generate target machine code, linking to produce the final executable often requires an external toolchain, such as the RISC-V GNU Compiler Toolchain. This toolchain provides compilers, assemblers, and linkers.
- **Knowledge Points**: It is crucial to master how to install and configure the RISC-V GNU toolchain and understand how to integrate it with Rust's cross-compilation process.
- **Reason**: The purpose of installing the cross-compilation toolchain is to ensure that Rust code can be effectively transformed into machine code that can run on the target architecture. Additionally, the external toolchain provides more detailed control over the underlying hardware features, which is necessary for bare-metal programming because it can optimize program performance and resource use, ensuring that the generated code can make the most of the hardware's features.

## 4. Use Simulators or Hardware Tools

**Tool: QEMU**

- **Functionality**: QEMU is a widely used hardware simulator that can emulate various hardware architectures, including RISC-V. This allows developers to develop and test programs even without physical RISC-V hardware.
- **Knowledge Points**: Learning how to use QEMU to run and debug RISC-V programs is a basic skill, and it is also necessary to understand the RISC-V architecture features and peripheral simulation capabilities supported by QEMU.
- **Reason**: The main reason for using the QEMU simulator is that it provides a cost-effective and flexible development environment, allowing developers to verify and optimize their code before purchasing real hardware. This not only saves costs but also helps identify and solve potential problems in advance.

## 5. Editor and IDE Configuration

**Tool: Visual Studio Code** (as an example recommendation)

- **Functionality**: VS Code is a popular editor that supports the Rust language and RISC-V development. By installing Rust plugins like rust-analyzer and configuring appropriate compilation tasks, development efficiency can be significantly improved.
- **Knowledge Points**: Mastering how to configure VS Code to support Rust language and RISC-V target architecture development is crucial, including setting up syntax highlighting, code completion, error prompts, and compilation tasks.
- **Reason**: The reason for choosing VS Code as the development environment is its extensive plugin ecosystem and high customizability, which allows it to adapt to various programming needs and workflows, thereby enhancing the efficiency of code writing and maintenance.

## 6. Debugging Tools

**Tool: GDB**

- **Functionality**: GNU Debugger (GDB) supports the RISC-V architecture and can be used for debugging bare-metal programs. Combined with hardware debuggers (such as JTAG interfaces) or simulators (like QEMU), GDB can provide powerful debugging capabilities.
- **Knowledge Points**: Familiarity with the basic commands and techniques for cross-debugging using G

DB is crucial, including setting breakpoints, checking registers and memory, stepping through the program, and viewing the program's execution flow.
- **Reason**: The main reason for using GDB for program debugging is its powerful functionality and broad applicability, which helps developers precisely locate errors and performance bottlenecks in programs, thereby improving code quality and stability.

Through the configuration of the above steps and tools, developers can not only set up a fully functional development environment but also effectively carry out the writing, compilation, debugging, and testing of bare-metal programs. Although the process of setting up this environment may seem complex, it provides a solid foundation for a deeper understanding of bare-metal programming with RISC-V and Rust, thus supporting more advanced development and innovative activities.

For beginners, although it is necessary to understand the above development tools and environment settings, there is no need to rush to prepare everything at the start. In fact, based on your learning progress and project needs, gradually installing the required parts and corresponding versions is often more efficient. Adjust and optimize your development environment as needed during the experimentation process to better fit the actual application scenario. Additionally, as you gradually deepen your understanding of bare-metal programming through reading this series, you will be able to more clearly identify which tools and configurations are necessary, thus making more purposeful choices and installations.

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
