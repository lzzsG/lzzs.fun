# About Bare-Metal Programming

- [Bare Metal - 0 About bare metal programming](0-About-bare-metal-programming)
- [Bare Metal - 1 Development environment setup](1-Development-environment-setup)
- [Bare Metal - 2 Create project](2-Create-project)
- [Bare Metal - 3 Writing boot code](3-Writing-boot-code)

> Note! The vast majority of this series' content comes from questions asked to ChatGPT. ChatGPT might make mistakes. Please consider verifying important information. This series' content is for reference and understanding only; for more specific learning, refer to authoritative materials.

## 1. Explaining Bare-Metal Programming

Bare-metal programming refers to writing software that runs directly on hardware, without going through an operating system or any abstraction layers. This type of programming is commonly used in embedded systems, gaming consoles, dedicated computing devices, or other scenarios requiring direct hardware control. Without the assistance of an operating system, developers need to have a deep understanding of hardware details, including processor architecture, memory management, and peripheral control. Below, I will explain some key concepts and challenges in detail.

### 1.1 Understanding Hardware

- **Processor Architecture**: Developers need to understand the instruction set architecture (ISA) of their target processor, such as ARM, x86, or RISC-V, etc. This includes knowing how to use various processor instructions to perform computations, manage memory access, and control peripherals.
- **Memory Management**: In the absence of an operating system, developers need to manage physical memory directly. This involves precise control over memory allocation, layout, and protection strategies, as well as understanding different types of memory (such as RAM, ROM, cache) and their characteristics.
- **Peripheral Control**: Directly controlling peripherals by reading and writing hardware registers, such as GPIO (General Purpose Input/Output ports), ADC (Analog to Digital Converters), communication interfaces (like SPI, I2C), etc.

### 1.2 Development Tools

- **Cross-Compiler**: Used to compile code into machine code for the target hardware platform. For example, if you are developing for an ARM architecture embedded system on an x86 architecture computer, you need a cross-compiler that compiles code into ARM machine code.
- **Debugger**: Hardware debuggers (such as JTAG or SWD interfaces) allow developers to step through code, set breakpoints, and inspect memory/register states on the actual hardware, which is crucial for discovering and fixing low-level issues.

### 1.3 Programming Challenges

- **Bootloader**: On bare-metal, the first piece of code that runs is responsible for initializing hardware (like setting up the clock system, memory controller) and jumping to the main application. This is often referred to as the bootloader or boot firmware.
- **Resource Management**: Developers need to manually manage all hardware resources, such as timers, interrupts, and memory. This requires the ability to write efficient and reliable code to avoid resource conflicts and leaks.
- **Real-Time Requirements**: Many bare-metal systems need to meet real-time requirements, meaning the software must respond to events within a given time limit. Developers must carefully design their programs to ensure they meet these strict timing constraints.

### 1.4 Programming Languages

While theoretically any language can be used for bare-metal programming, C is most commonly used because it provides direct control over hardware while also allowing for relatively easy high-level abstraction. Assembly language is also often used for performance-critical or highly optimized sections of code.

In summary, bare-metal programming is a complex but exciting task that requires developers to have a deep understanding and direct control of the hardware they are using. This programming method allows developers to optimize the performance and resource use of their applications to the maximum extent, but it also brings higher complexity and development difficulty.

---

## 2. A General Process for Bare-Metal Programming with RISC-V and Rust

### 2.1 Setting Up the Development Environment

First, set up a Rust development environment that supports the RISC-V architecture. This includes installing the Rust programming language, configuring a cross-compilation toolchain for the RISC-V target architecture, and any other necessary tools (like linkers, debuggers). This step is fundamental and critical, as it supports all subsequent development activities, ensuring you can write and compile code for a specific hardware architecture.

### 2.2 Creating a Project

Create a new library project (lib) using Rust's package manager, Cargo, as bare-metal projects usually do not depend on Rust's standard library. This is achieved by specifying in the `Cargo.toml` not to use the standard library and using the `#![no_std]` attribute in the source code. This is because there's no operating system support in a bare-metal environment, making many functionalities of the standard library unusable.

### 2.3 Writing Boot Code

In bare-metal programming, boot code (usually a function named `_start`) is the entry point of the program, responsible for initializing hardware and setting up the running environment, then jumping to the program's main logic. Since there's no operating system intervention, this code needs to interact directly with the hardware, performing critical operations like setting up stack space, initializing hardware devices, etc. This step is the bridge connecting software to hardware, ensuring the program can start correctly on the hardware.

### 2.4 Writing the Main Program

After completing the boot code, the next step is to write the logic of the main program. This includes defining the main functionalities of the program, such as handling inputs, performing computations, controlling hardware interfaces (GPIO, UART, SPI,

 etc.), and managing peripherals. The main program is where the specific application logic is implemented, whether it's blinking an LED, reading sensor data, or implementing a communication protocol.

The main program contains the core logic of the bare-metal application, directly determining how the program will interact with hardware to complete the intended tasks. Writing the main program usually involves a deep understanding of hardware features and peripherals, as well as how to effectively manage resources and perform tasks without operating system assistance.

Bare-metal programming means there's no abstraction layer of an operating system, and the program needs to interact directly with the hardware. Therefore, the main program must precisely control hardware behavior, respond to external events, and perform operations according to specific requirements. This requires the program to efficiently use limited resources while ensuring system stability and responsiveness.

### 2.5 Compiling the Code

Compile the code using Rust's cross-compilation capabilities, targeting the RISC-V architecture. This step transforms Rust code into machine code that the target hardware can understand and execute. Cross-compilation is necessary because development usually does not take place on the target hardware platform but on a host with a different architecture.

### 2.6 Linking the Code

Linking is the process of combining compiled code with any necessary runtime libraries and boot code into a single executable file. In bare-metal projects, linker configuration is especially important because it requires precise control over the memory layout to ensure different parts of the program are placed at the correct addresses. This step is related to whether the program can execute correctly on the hardware.

### 2.7 Generating an Image File

Convert the linked executable file into a format suitable for loading on the target hardware, such as a binary image file. This may involve packaging the executable file into a specific format or adding necessary metadata for hardware recognition. The generated image file contains everything needed to run the program and is the entity directly deployed to the hardware.

### 2.8 Running on the Target Platform

The final step is to upload the generated image file to the target RISC-V hardware or run it through an emulator. This may involve using specific tools or commands, as well as setting up communications with the hardware. Successfully running the image file means the software can execute predetermined operations on the hardware without operating system support.

Through this comprehensive process, we can see that bare-metal programming not only requires a deep understanding of the hardware but also demands that developers precisely control every step of the program's execution, ensuring the program can run efficiently and stably in an environment without operating system support.
