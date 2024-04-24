# About Bare-Metal Programming



- [Bare Metal - 0 About bare metal programming](0-About-bare-metal-programming)
- [Bare Metal - 1 Development environment setup](1-Development-environment-setup)
- [Bare Metal - 2 Create project](2-Create-project)
- [Bare Metal - 3 Writing boot code](3-Writing-boot-code)
- [Bare Metal - 4 Writing the main program](4-Writing-the-main-program)
- [Bare Metal - 4½ Supplement for the main program of operating systems](4½-Supplement-for-the-main-program-of-operating-systems)



## Introduction

This series is designed to provide beginners with a comprehensive and integrated perspective, delving into the entire process of bare-metal programming. Our focus will be on the framework of the process rather than the intricate details of specific bare-metal program designs. Bare-metal programming might seem particularly complex and obscure for beginners, especially starting from setting up the development environment, as the entire process has significant differences from traditional software programming. Hands-on practice is a part of learning, but merely following tutorials to complete projects often isn't enough for beginners to gain a clear understanding of bare-metal programming.

Therefore, this series has been designed to systematically introduce the key stages of bare-metal programming, from setting up the environment and writing code to deploying and debugging programs. Each part aims to gradually reveal the inherent logic and necessary techniques of bare-metal programming, helping beginners progressively build an understanding and confidence in this field.

In addition, we will explore some fundamental theories and practical strategies related to bare-metal programming, such as memory management, direct control of hardware interfaces, and how to handle interactions between hardware and software. By elucidating these key concepts, beginners will not only learn how to operate bare-metal programs but also understand the principles and strategies behind them.

Through this series of articles, you should be able to not only grasp the operational methods of bare-metal programming but, more importantly, understand its underlying principles and logic. This foundation will prepare you for more complex hardware programming environments in the future. This series will be a steadfast companion on your journey of learning bare-metal programming, helping you gradually unlock more technical thresholds and enhance your mastery and confidence in this field.## Introduction

This series is designed to provide beginners with a comprehensive and integrated perspective, delving into the entire process of bare-metal programming. Our focus will be on the framework of the process rather than the intricate details of specific bare-metal program designs. Bare-metal programming might seem particularly complex and obscure for beginners, especially starting from setting up the development environment, as the entire process has significant differences from traditional software programming. Hands-on practice is a part of learning, but merely following tutorials to complete projects often isn't enough for beginners to gain a clear understanding of bare-metal programming.

Therefore, this series has been designed to systematically introduce the key stages of bare-metal programming, from setting up the environment and writing code to deploying and debugging programs. Each part aims to gradually reveal the inherent logic and necessary techniques of bare-metal programming, helping beginners progressively build an understanding and confidence in this field.

In addition, we will explore some fundamental theories and practical strategies related to bare-metal programming, such as memory management, direct control of hardware interfaces, and how to handle interactions between hardware and software. By elucidating these key concepts, beginners will not only learn how to operate bare-metal programs but also understand the principles and strategies behind them.

Through this series of articles, you should be able to not only grasp the operational methods of bare-metal programming but, more importantly, understand its underlying principles and logic. This foundation will prepare you for more complex hardware programming environments in the future. This series will be a steadfast companion on your journey of learning bare-metal programming, helping you gradually unlock more technical thresholds and enhance your mastery and confidence in this field.

> Note! The vast majority of this series' content comes from questions asked to ChatGPT. ChatGPT might make mistakes. Please consider verifying important information. This series' content is for reference and understanding only; for more specific learning, refer to authoritative materials. 2024-04

## 1. Explaining Bare-Metal Programming

Bare-metal programming is a method of programming that runs directly on hardware without the support of a traditional operating system. This style of programming is widely used in embedded systems, microcontrollers, and applications requiring high optimization and precise hardware control. Bare-metal programming allows developers to fully utilize hardware performance and achieve direct and complete control over hardware resources.

### Characteristics of Bare-metal Programming

1. **Direct Hardware Manipulation**: The program interacts directly with hardware interfaces, bypassing the abstraction layer of the operating system.
2. **Efficiency**: Since operating systems are omitted, bare-metal programs can achieve higher execution efficiency and response speeds.
3. **Resource Control**: Developers must manually manage all hardware resources, including memory allocation and peripheral control.
4. **Customization**: Hardware usage and program behavior can be customized based on specific needs.

### Applications of Bare-metal Programming

Bare-metal programming is primarily used in environments where performance requirements are extremely high or resources are very limited. For example, in aerospace, automotive electronics, and industrial control fields, bare-metal programming enables devices to respond quickly to external events, ensuring system real-time performance and reliability. Additionally, considering hardware costs and energy consumption, many portable devices and smart sensors also use bare-metal programming to optimize performance and power consumption.

### Challenges of Bare-metal Programming

Although bare-metal programming provides high efficiency and control capabilities, it also presents several challenges:
- **High Complexity**: Developers need to have an in-depth understanding of the hardware, including the internal structure of processors and detailed specifications of peripherals.
- **Difficult Debugging**: Without the error handling and debugging tools provided by operating systems, all error detection and debugging must be implemented by the developers themselves.
- **Maintenance Cost**: Direct hardware manipulation makes the code more susceptible to changes in hardware, leading to increased maintenance costs.

### How to Start with Bare-metal Programming

Before starting bare-metal programming, it is necessary to choose the appropriate hardware platform and development tools. Typically, this includes:
- **Choosing the Right Microcontroller or Processor**: Select a chip that supports bare-metal programming based on application requirements.
- **Setting Up the Development Environment**: Install necessary compilers, linkers, and debuggers.
- **Writing Boot Code**: Implement hardware initialization and the program entry point.
- **Developing Application Logic**: Write code that directly controls the hardware based on project needs.

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

From setting up the development environment to ultimately running the program on the target platform, this process covers all the key steps of bare-metal programming, including environment setup, project creation, code writing, compilation, linking, image generation, and deployment and execution on hardware.

In the upcoming series of explanations, we will delve deeper into each step, helping everyone better understand and master the relevant knowledge and skills in bare-metal programming. Through this series of in-depth discussions, you will gain a better understanding of how to interact directly with hardware in an environment without operating system support, completing complex programming tasks. We hope that through these explanations, everyone can deepen their understanding of bare-metal programming and enhance their technical skills.
