# III. Writing Boot Code

Writing boot code is a critical step in bare-metal programming, involving many low-level details that ensure the program can run in an environment without operating system support. Here are the basic essential steps and higher-level optional steps for writing boot code.

### Key Components of the Boot Process

#### 1. **Boot Entry and Initialization Code (Essential)**

This is the first part of the code that is executed when the program starts, usually written in **assembly language** (e.g., `entry.asm`). This entry point is the first location where the program starts executing. It is essential because it is responsible for transferring control from the hardware to our software.

- **Boot Entry Point**: The beginning of program execution, typically named `_start`. In the RISC-V architecture, the task of this entry point includes initializing registers (especially the Stack Pointer SP) to prepare the necessary environment for program execution.
- **Initialize Registers and Stack**: Ensuring all required registers are correctly initialized, especially setting the stack pointer, so the program can use the stack.
- **Zeroing the .bss Section**: Zeroing the uninitialized data section (.bss section) to ensure that global and static variables are initialized to zero before use.

#### 2. **Kernel Entry and Memory Layout (Essential)**

This involves how to organize the program's memory layout and how to jump from the boot code to the main program (e.g., a kernel or application written in Rust).

- **Memory Layout**: Defined by **linker scripts** (such as `linker.ld` or `memory.x`), it specifies the location and size of different program segments (e.g., .text, .data, .bss). This is crucial for ensuring the program can be correctly loaded into memory for execution.
  - **`memory.x` file**: Often used for simplified memory layout definitions. In Rust projects, this file specifies the memory layout, such as heap, stack, code, and data segments.
  - **`linker.ld` file**: Provides more complex and detailed linking configurations than `memory.x`, offering more power and flexibility. It can control the specific location and size of various memory segments and special linking requirements.

- **Kernel Entry**: After the boot code completes all necessary hardware-related initializations, it jumps to the entry point of the main program (e.g., a kernel written in Rust). This usually involves setting the program counter (PC) to a new address, which is where the kernel code begins.

### Optional or Higher-Level Design Steps

#### 1.**Handling Privilege Levels and System Calls**

- When designing systems that need to operate at different privilege levels, boot code needs to set up and manage the CPU's privilege levels. Implementing and encapsulating system call interfaces (e.g., through SBI) allows software to perform privileged operations.
- In the RISC-V architecture, **SBI** (Supervisor Binary Interface) provides a way for operating systems to perform privileged level operations, such as interrupt management or I/O operations, without having to execute hardware-specific code directly.

  - **Role of SBI**: If your system design includes running an operating system in S mode, initializing the SBI environment at the boot stage is essential. This usually involves using existing SBI implementations (like OpenSBI or RustSBI) and configuring them in the boot code to use these services.
  - **Practical Details**: Involves how to integrate an SBI implementation into your boot process, possibly including loading the SBI implementation's binary to the proper memory location and setting up registers so that the operating system can call the functionalities provided by SBI after startup.

#### **2.Exception and Interrupt Handling**

- Initializing and configuring exception and interrupt handlers. This is crucial for creating systems capable of responding to hardware events and exceptions.
- In more complex systems or operating systems, these steps are necessary to ensure the system's stability and responsiveness.

#### 3.**Organization and Implementation**

- **Build Scripts** (Optional): Using build scripts like Makefile or Cargo to automate the compilation, linking, and generation of the final executable image process. This includes calling compilers, linkers, and possibly other tools (like `objcopy`).
- **Functionality Implementation and Encapsulation**: Implementing the core functionalities and abstractions of the operating system in Rust code, such as interrupt handling, device driver interfaces, and system calls. These are usually implemented in a modular manner and called within the kernel's main logic.

### Summary

- **Basic Steps** ensure that the program can correctly start on bare metal and jump to the main logic for execution. These steps apply to almost all bare-metal projects, regardless of the project's complexity.
- The choice between **`memory.x` and `linker.ld`** depends on project needs: `memory.x` might be sufficient for simple projects, while `linker.ld` offers more flexibility and control for complex projects requiring detailed control over memory layout and linking process.
- **Higher-level optional steps** add support for complex hardware interactions, especially when designing operating systems or advanced applications that need precise control of

 hardware features. These steps can be implemented based on the specific requirements and goals of the project.

---

## Expanded Explanation

### 1.**Boot Entry and Initialization Code (Essential)**

In bare-metal programming, especially for the RISC-V architecture, the boot entry and initialization code stage is crucial because it sets up the necessary running environment for the rest of the program. This stage is mainly written in assembly language, as it needs to interact directly with the hardware. Here are the key points and contents involved in this stage:

#### Definition of Boot Entry Point (_start)

- **Entry Point (_start)**: This is the first point of execution for the program and where the CPU starts executing after the system is powered on or reset. For RISC-V, the entry point is typically specified in the linker script as `_start`, ensuring that `_start` is at the expected address in the binary file.
- **Content**: `_start` would contain the initial assembly instructions to set the program's initial state. This includes initializing registers, setting up the stack pointer, etc.

#### Initialize Registers and Stack

- **Stack Pointer (SP)**: The stack is crucial for function calls, local variable storage, etc. In `_start`, the first task is often to set the stack pointer (SP) to a large and appropriate memory area to serve as the program's stack.
- **Global Pointer (GP)**: For RISC-V, it might also be necessary to set up the global pointer (GP), useful for efficiently accessing global variables and static data.
- **Other Registers**: Depending on specific needs, other registers might need to be initialized to prepare for program execution.

#### Zero the .bss Section

- **.bss Section Zeroing**: The .bss section contains uninitialized global and static variables. According to C and UNIX tradition, these variables should be zeroed before program execution begins. In `_start`, there is usually a small code snippet that iterates over all addresses in the .bss section, setting them to 0.
- **Implementation Method**: Through an assembly loop, calculate the start address and size of the .bss section (this information can be obtained from the linker script), then iterate over this range, zeroing each position.

#### Jump to High-Level Language Entry (such as Rust's main function)

- **Jump Instruction**: After completing the basic setup, `_start` will use a jump instruction to transition to a program entry point written in a high-level language, such as Rust's `main` function. This transition marks the move from assembly language to high-level language, entering the main logic part of the program.
- **Prepare Arguments**: If the high-level language entry point (like `main`) expects to receive arguments (for example, command-line arguments), these arguments must be prepared in registers or memory according to conventions before jumping.

#### Assembly Code Example

A very basic example of RISC-V startup assembly code might include:

```assembly
.section .text
.global _start

_start:
    # Initialize the stack pointer
    la sp, stack_top

    # Zero the .bss section (not shown in detail here)

    # Jump to the main program (Rust's main function)
    call main

    # Loop or halt
    .align 2
    j .

.section .bss
    .align 4
stack:
    .space 4096  # Allocate 4096 bytes for the stack
stack_top:
```

This is just a simplified example; in reality, depending on your specific needs, other initialization operations may also be required.

The boot entry and initialization code stage is vital in bare-metal programming, involving low-level settings closely related to hardware. By directly controlling the hardware with assembly language, it provides a stable environment for the rest of the program to run. Understanding and correctly implementing this stage is the foundation for smooth progress in subsequent development work.

### 2.**Kernel Entry and Memory Layout (Essential)**

The kernel entry and memory layout are crucial stages in the startup process of an operating system or bare-metal program, involving how to organize and arrange the program's layout in memory. The core work of this stage is accomplished through linker scripts, providing instructions to the compiler and linker on how to place the various parts of the program into memory.

### Linker Script

A linker script is a special script file used to control the memory layout of a program. It defines the positions, sizes, and arrangements of various segments (such as .text, .data, .bss, etc.) in the final binary file.

#### Key Concepts and Components

- **.text Segment**: Contains the executable code of the program. In the linker script, you need to specify the position of the code segment, which is typically the starting point of the program.
- **.data Segment**: Contains initialized global and static variables. These variables are placed in specified locations by the loader before the program starts.
- **.bss Segment**: For uninitialized global and static variables, this part is usually zeroed at the start of the program.
- **Heap and Stack**: While the specific positions and sizes of the heap and stack can be dynamically adjusted at runtime, in some cases, the linker script may also be used to specify their initial positions and size limits.

#### Example Linker Script Content

```ld
/* Define the memory regions where program sections will be placed */
MEMORY
{
    RAM (wxa) : ORIGIN = 0x80000000, LENGTH = 128K
}

/* Define the program sections */
SECTIONS
{
    /* .text section */
    .text : {
        *(.text)
    } > RAM

    /* .data section */
    .data : {
        *(.data)
    } > RAM

    /* .bss section */
    .bss : {
        *(.bss)
        *(.sbss)
    } > RAM

    /* Add additional sections here */
}
```

In this example, we defined a memory region named `RAM` with a starting address of `0x80000000` and a length of 128K. Then, we specified that the .text, .data, and .bss segments should be placed in the `RAM` area. This kind of configuration in the linker script ensures that different parts of the program are placed in memory as intended.

### Kernel Entry Point

The kernel entry point is a key concept in the startup process of an operating system, marking where the OS or bare-metal application begins execution. In the linker script, the entry point symbol (usually `_start`) can be explicitly specified.

- **Setting the Entry Point**: In the linker script, the `ENTRY(_start)` directive is used to specify the entry point. This tells the linker that program execution should start from the location of the `_start` label.
- **Entry Point Function**: For programs written in Rust, the entry point function might be Rust's `main` function. The `_start` function in assembly is responsible for performing all necessary initialization (such as setting up registers and the stack) before jumping to Rust's `main` function.

The kernel entry and memory layout stage are crucial for ensuring the program can be correctly loaded and executed. Through carefully designed linker scripts, developers can precisely control the program's memory layout and how its different parts are arranged in appropriate memory regions. Successful completion of this stage lays the foundation for the smooth execution of the program. Understanding and correctly applying the instructions and syntax of linker scripts is vital for developing reliable operating systems and bare-metal programs.

### 3. Optional or High-Level Design Steps

In developing operating systems or bare-metal programs based on the RISC-V architecture, beyond the essential boot entry and memory layout settings, there is a series of optional or high-level design steps. These steps provide the operating system with the capability to handle privilege levels and system calls, exception and interrupt handling, and also include how to automate the build process with build scripts and how to organize and implement advanced features of the operating system.

### Handling Privilege Levels and System Calls (SBI)

The RISC-V architecture defines several different privilege levels, the most common being Machine mode (M mode), Supervisor mode (S mode), and User mode (U mode). In more complex systems, such as operating systems, handling these privilege levels becomes very important.

- **Privilege Level Switching**: Boot code needs to switch the CPU from Machine mode (M mode, the highest privilege level) to Supervisor mode (S mode) or User mode (U mode) for the normal operation of the operating system or user programs. This involves setting related control registers and privilege level states.

- **System Call Interface (SBI)**: SBI allows S-mode software to call functionalities in M-mode, such as interrupt management, timer settings, etc. Ensuring the correct setup of SBI during the boot stage or operating system initialization phase

 is crucial. For projects using Rust, libraries like RustSBI may be used to provide SBI functionalities.

### Exception and Interrupt Handling

Exception and interrupt handling are core functionalities of an operating system, responsible for responding to hardware events and exceptions.

- **Exception Handler (trap handler)**: It's necessary to register an exception handler during the system initialization phase so that the system can respond to various exceptions (such as system calls, page faults, etc.) and interrupts (such as peripheral interrupts).

- **Interrupt Vector Table**: In some designs, an interrupt vector table might be used to manage different interrupt sources and their corresponding handlers. This usually involves memory layout design and privilege level control.

### Build Scripts (Optional)

Using build scripts is crucial for automating and simplifying the build process. These scripts can automate steps such as compilation, linking, and generating binary images.

- **Makefile or Cargo Scripts**: For Rust projects, Cargo already offers powerful build management capabilities. However, for complex build steps or when a specific build toolchain is required (such as cross-compilation), writing Makefiles or extending Cargo build scripts may be necessary.

### Functionality Implementation and Encapsulation

As system functionalities increase, properly organizing and encapsulating code becomes especially important.

- **Modular Design**: Divide system functionalities into different modules or libraries, such as memory management, file systems, network stacks, etc. This helps improve code readability and maintainability.

- **Abstraction and Interface Definition**: Define clear interfaces and abstraction layers to isolate hardware-dependent code from upper-level application logic. This makes it easier to port and adapt the code across different hardware platforms.

These optional or high-level design steps enable the operating system to effectively manage hardware resources, provide rich system services, and ensure the system's scalability and maintainability. Through proper code organization and the use of automated build scripts, development efficiency can be improved, errors reduced, and team collaboration facilitated. These advanced features and design considerations are indispensable parts of building modern operating systems and complex bare-metal programs.

---

## Supplement 1: Explanation of Chapter One's Code Structure

The project structure and file explanations below, and how they work together in a bare-metal or operating system project:

```python
.
├── bootloader
│   └── rustsbi-qemu.bin      # RISC-V's SBI implementation, providing a standard system call interface
├── os
│   ├── Cargo.toml            # Rust project configuration file, defining project dependencies and metadata
│   ├── Makefile              # Provides build scripts for compiling, linking, and building the final binary file
│   └── src
│       ├── console.rs        # Encapsulates the SBI interface for printing characters, providing formatted output functionality
│       ├── entry.asm         # Assembly entry point for the bare-metal program, setting up the kernel execution environment
│       ├── lang_items.rs     # Implements Rust-specific semantic items, such as panic handling logic
│       ├── linker.ld         # Linker script, defining the kernel's memory layout
│       ├── logging.rs        # Implements logging functionality for debugging and outputting log information
│       ├── main.rs           # The kernel's main function, the program's main entry point
│       └── sbi.rs            # Encapsulates the Rust interface for SBI calls, providing system call functionality
└── rust-toolchain            # Specifies the version of the Rust toolchain, ensuring compilation consistency
```

### Process and Collaboration

1. **Boot and SBI (Supervisor Binary Interface)**:
   - `bootloader/rustsbi-qemu.bin` is crucial in the boot process, offering an SBI implementation. SBI is the interface standard between the operating system and hardware in the RISC-V architecture, allowing the OS to perform privileged operations (such as interrupt management) without directly interacting with hardware. This binary file is loaded and executed at system boot, providing necessary low-level support for the operating system.

2. **Project Configuration**:
   - `Cargo.toml` defines the project's dependencies and compilation configuration, the standard way of building Rust projects using Cargo.
   - `rust-toolchain` specifies the Rust version used by the project, ensuring consistency across all developers and environments.

3. **Build Script**:
   - `Makefile` provides build commands for compiling, linking, and generating the final binary file. It might call `cargo build` along with other tools, such as `objcopy` to convert the compilation product into a specific format.

4. **Kernel Entry and Memory Layout**:
   - `entry.asm` contains the assembly entry point of the boot code, setting up the preliminary execution environment, such as stack pointer initialization, then jumping to Rust's `main.rs` to start execution.
   - `linker.ld` defines the program's memory layout, including the positions and sizes of code, data, stack, etc., crucial for bare-metal programming.

5. **Functionality Implementation and Encapsulation**:
   - `main.rs` is the program's main entry, calling other modules to complete specific tasks.
   - `console.rs`, `logging.rs`, and `sbi.rs` provide basic functionalities required during the operation of the operating system, such as console output and system calls.
   - `lang_items.rs` implements special functionalities expected by the Rust compiler to be provided by the operating system or runtime, such as the logic during a `panic`.

### Summary

This project is an implementation of an operating system under the RISC-V architecture, written in Rust. It starts executing from the assembly language written boot code, initializes the hardware and execution environment, then enters the main program written in Rust. In this process, the operating system interacts with hardware through SBI, executing necessary system calls, such as clock management and interrupt handling. Each component and file work together according to their responsibilities and needs, forming the complete functionality of the operating system.

---

### Supplement 2: Boot Code Process Diagram

1. **Start** [Hardware Level]
   - Description: System power-up or reset.
2. **Define Boot Entry Point (_start)** [Assembly Language, Software Level]
   - File: `entry.asm` (or similar)
   - Description: Defines the system's entry point, the first code executed.
3. **Initialize Registers and Stack** [Assembly Language, Software Level]
   - File: `entry.asm`
   - Description: Sets the Stack Pointer (SP) and necessary registers.
4. **Zero the .bss Section** [Assembly Language, Software Level]
   - File: `entry.asm`
   - Description: Zeroes the uninitialized data area.
5. **Set Memory Layout** [Linker Script, Software Level]
   - File: `linker.ld` or `memory.x`
   - Description: Defines memory segment positions and sizes.
6. **Jump to High-Level Language Entry Point** [Assembly Language -> Rust/C/C++, Software Level]
   - File: `entry.asm` jumping to `main.rs` or `main.c`

     - Description: Jumps from assembly to the program entry written in a high-level language.

7. **Handle Privilege Level and System Calls (SBI)** [Optional, Rust/C, Software Level]
   - File: `sbi.rs` or `sbi.c`
   - Description: Initializes SBI, performs privilege level switching.
8. **Exception and Interrupt Handling** [Optional, Rust/C/C++, Software Level]
   - File: `interrupt.rs` or `interrupt.c`
   - Description: Registers exception and interrupt handling functions.
9. **Build and Link** [Build System, Software Level]
   - Tools: Makefile, Cargo.toml
   - Description: Automates the compilation and linking process.
10. **Generate Binary Image** [Build System, Software Level]
    - Tools: `objcopy`, Cargo build scripts
    - Description: Converts the compiled code into an executable binary image.
11. **Load and Execute** [Hardware/Emulator Level]
    - Description: Loads the binary image onto the target hardware or emulator for execution.
12. **System Running** [Hardware/Software Level]
    - Description: The system executes the user-defined program written in high-level language.

---

## Supplement 3: Tutorial Content Related

In the general process of bare-metal programming with RISC-V and Rust, implementing a batch processing operating system, transitioning between privilege levels, and subsequent content such as multitasking and time-sharing, address space, process and process management, file systems and I/O redirection, inter-process communication, concurrency, etc., are primarily built on **"Writing the Main Program" stage** followed by in-depth development and feature extension.

### Bare-Metal Boot Process

1. **Boot Parameter Configuration** and **RustSBI as BootLoader**: Using QEMU to simulate the RISC-V 64 computer boot, loading the BootLoader (such as RustSBI) through the -bios parameter, and loading the kernel binary file to a specified physical address through the -device parameter, belongs to the preparatory work for running on the target platform.

### Writing Boot Code

1. **Entry Function (_start) and Boot Code**: Define the entry point `_start` for starting the application, perform preliminary environment setup (such as zeroing the .bss section), interacting directly with hardware to prepare the running environment.
2. **Implement Shutdown Functionality**: Implementing shutdown functionality through the ecall instruction calling RustSBI's SBI call demonstrates how to use system calls within the operating system to interact with the BootLoader.
3. **Configure Program Memory Layout** and **Set Stack Space Layout**: Use linker scripts to adjust linker behavior to ensure the executable file's memory layout is as expected, and initialize the operating system's stack space through assembly code.

### Implementing Batch Processing Operating System

1. **Loading and Executing Applications**: Describes how to load the binary image of an application to a predetermined physical address and use the `fence.i` instruction to clear the i-cache, a key step in implementing a batch processing operating system.

### Implementing Privilege Level Switching

1. **Privilege Level Switching**: Detailed introduction on how to switch between User Mode (U Mode) and Supervisor Mode (S Mode), handling system calls and exceptions. It shows how the operating system uses the `ecall` instruction to call services provided by RustSBI, such as shutdown.

### Compilation and Building

1. **QEMU Simulation and Running**: Load and run the compiled application through the `qemu-system-riscv64` command, involving details of controlling the program memory layout with linker scripts.

### Expanding Operating System Functionality

1. **Content from Chapter 2 to Chapter 8**: These chapters cover the key points of core operating system functionality implementation and performance enhancement from batch processing systems to concurrency, such as multitasking and time-sharing, address space, process and process management, file systems and I/O redirection, inter-process communication, etc., which are gradually implemented and perfected after the "Writing the Main Program" stage, based on the needs of operating system design.

### `memory.x` vs. `linker.ld`

> Previously mentioned `link_riscv32.x`, `link_riscv64.x`, and `src/linker.ld` are examples of linker scripts.

- **`memory.x` file**: This is a common practice in Rust embedded or bare-metal projects, especially when using the `cargo` build system and the `rustc` compiler. `memory.x` is typically used to specify the memory layout, such as the start address and size of memory. It is a simplified form of linker script, specifically used for configuring memory, and this configuration is used by the linker in embedded projects.
- **`linker.ld` file**: This is a more general linker script file, which not only defines the memory layout but can also perform more complex linking instructions, such as symbol relocation, segment (section) arrangement and attribute settings. The `linker.ld` file offers broader and more flexible configuration capabilities, suitable for projects that require detailed control over the compilation output.

---

## Supplement 4

### - Why Choose `linker.ld`

In the project you mentioned, choosing to use `linker.ld` instead of `memory.x` might be for several reasons:

1. **More Complex Memory Layout**: If the project requires detailed definition of multiple memory segments, special symbols, or other complex linking rules, `linker.ld` can provide richer syntax and functionality.
2. **Broader Compatibility**: `linker.ld`, as the standard configuration file for the GNU linker, might be chosen by the project to ensure compatibility with widely used toolchains and environments, especially in cross-language projects not limited to the Rust ecosystem.
3. **Project Requirements**: The project might need specific configurations, such as load addresses, symbol exports, segmentation arrangements, etc., which go beyond the simplified scope of `memory.x`. Especially when involving operating systems or complex bare-metal programs, fine control over the linking process becomes very important.

Although both `memory.x` and `linker.ld` can be used to configure the project's memory layout and linking process, `linker.ld` offers a wider range of

 functionality and flexibility. In some cases, choosing `linker.ld` is due to considerations of project complexity and specific requirements. This choice reflects the decision made by the project's designers based on their needs and preferences. In the project you mentioned, using `linker.ld` indicates that the developers might need to take advantage of advanced features provided by the GNU linker, or it is due to the need to cooperate with other non-Rust components.

---

# Supplement 5: Startup entry assembly code example
[rCore-Tutorial-Code-2024S](https://github.com/LearningOS/rCore-Tutorial-Code-2024S/tree/ch1)/[os](https://github.com/LearningOS/rCore-Tutorial-Code-2024S/tree/ch1/os)/[src](https://github.com/LearningOS/rCore-Tutorial-Code-2024S/tree/ch1/os/src)/entry.asm

In the startup code for bare-metal programs or operating systems, assembly language is often used to set up the most basic execution environment, especially at the initial stage of system startup when the high-level language runtime has not been initialized yet. This piece of code provides an excellent example of how to prepare and hand over control to a main program written in Rust. Let's analyze this code line by line to deeply understand each step's purpose and significance.

### Assembly Code Explanation

```asm
.section .text.entry
.globl _start
_start:
    la sp, boot_stack_top
    call rust_main
```

- `.section .text.entry`: This directive places the following code into a segment named `.text.entry`. This name is often used to specify the entry segment of the program, specially referenced in the linker script to ensure this section is positioned at the beginning of the program.

- `.globl _start`: This line declares the `_start` label as a global symbol, making it visible to other files and modules during the linking process. This is the entry point for the operating system or bare-metal program startup.

- `_start:`: This is the actual label definition, indicating that the instructions starting here are the beginning of the program.

- `la sp, boot_stack_top`: The `la` (Load Address) instruction loads the address of `boot_stack_top` into the stack pointer `sp`. This is a critical step in setting up the initial stack before preparing the stack space for subsequent program execution.

- `call rust_main`: Calls a function named `rust_main`, which is assumed to be the entry point of a program written in Rust. The `call` instruction not only jumps to execute `rust_main` but also pushes the return address onto the stack, enabling a correct return after `rust_main` is executed.

### Stack Space Setup

```asm
.section .bss.stack
.globl boot_stack_lower_bound
boot_stack_lower_bound:
    .space 4096 * 16
.globl boot_stack_top
boot_stack_top:
```

- `.section .bss.stack`: Specifies that the following instructions and data are located in a segment named `.bss.stack`. The `BSS` segment is used to store uninitialized data needed during program execution, here used to define the stack.

- `.globl boot_stack_lower_bound` and `.globl boot_stack_top`: These lines declare `boot_stack_lower_bound` and `boot_stack_top` as global symbols, making them visible during the linking process and accessible to other modules.

- `boot_stack_lower_bound:`: Marks the beginning address of the stack.

- `.space 4096 * 16`: Allocates space for the stack, here allocating `4096 * 16` bytes, which is 64KB. The `.space` directive reserves space for the specified number of bytes in the target file but does not initialize them.

- `boot_stack_top:`: Marks the top address of the stack. Used to initialize the stack pointer `sp` in `la sp, boot_stack_top`.

### Summary

This assembly code is a crucial part of the startup process for bare-metal programs, responsible for setting up the initial execution environment, including stack initialization and program entry invocation. By precisely controlling the setup of the stack and program entry, it ensures that the kernel or main program written in Rust can start and run correctly in the appropriate environment. Such startup code bridges the gap between hardware and the application logic written in high-level languages, an indispensable component in the design of operating systems and bare-metal programs.



---

### Related Glossary

**Basic Concepts**

- **Assembly Language**: A low-level programming language that corresponds one-to-one with machine instructions, used for writing code that directly interacts with hardware.
- **Register**: A small storage unit inside the CPU, used for storing instructions, data, and addresses.
- **Stack Pointer (SP)**: A specific register pointing to the current top of the stack.
- **Global Pointer (GP)**: Used for efficient access to global variables, mainly used in certain architectures (like RISC-V).

**Memory and Program Structure**

- **Heap**: A dynamically allocated memory area used for storing data allocated during program execution.
- **Stack**: An automatically managed memory area used for storing local variables and managing function calls.
- **.text Segment**: The part of the program containing machine instructions, stores compiled code.
- **.data Segment**: Stores the program's initialized global and static variables.
- **.bss Segment**: A storage area for uninitialized global and static variables, usually cleared to zero at program startup.
- **Memory Layout**: The organization of a program in memory, including the .text, .data, .bss segments, and the positions and sizes of the heap and stack.

**Control Flow and Management**

- **Startup Entry**: The first place where a program starts executing, typically an entry point written in assembly language named `_start`.
- **Jump Instruction**: An assembly instruction used to change the program's execution flow.
- **Kernel Entry**: The place where an operating system starts executing, transitioning from boot code to this point to begin the execution of the OS's main body.
- **Privilege Level and Privilege Switching**: The running mode of the CPU, determining the permission of executing instructions. Privilege level switching is the process of transitioning from one running mode to another.
- **System Call/SBI**: Provides a way for user-space programs to request services provided by the operating system kernel. For RISC-V, the SBI (Supervisor Binary Interface) allows S-mode code to call M-mode functions.
- **Exception and Interrupt Handling**: The response and handling of system events and exceptions that occur during system operation.

**Building and Encapsulation**

- **Linker Script**: A script controlling the program's memory layout, defining the positions and sequences of different segments.
- **Build Script**: A script used to automate the compilation and building process, such as Makefile or Cargo's build configuration.
- **Encapsulation**: The process of modularizing and abstracting code to organize functionality.
