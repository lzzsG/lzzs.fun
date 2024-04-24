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