# VIII. Running on the Target Platform

## 1. Steps for Running on the Target Platform

In the process of bare-metal programming with RISC-V and Rust, the final step is to run on the target platform. This step is crucial as it verifies and tests whether the entire system design meets the expected functionality and performance. This process involves deploying the compiled and linked image file to actual RISC-V hardware or executing it in a simulator. Below are the detailed steps and considerations:

### Key Activities for Deployment and Execution

#### 1. **Preparing the Target Hardware or Simulator**

   - **Hardware Preparation**: Ensure the target RISC-V hardware is ready, including necessary power configurations, connection interfaces (such as JTAG, UART, etc.), and other essential hardware setups.
   - **Simulator Preparation**: If using a simulator (like QEMU), configure the simulator to mimic the specific behaviors and resource configurations of the target hardware.

#### 2. **Uploading the Image File**

   - **Uploading via Physical Interface**: For physical hardware, the image file usually needs to be flashed to the device's flash memory or other bootable storage media through specific programming interfaces (such as SPI, JTAG, or USB).
   - **Loading Image in Simulator**: For simulators, loading the image file typically involves specifying the image file's path and the simulator's boot parameters.

#### 3. **Setting Up Communication and Debugging Interfaces**

   - **Debugging and Output**: Set up appropriate debugging and output interfaces, such as UART or other available serial communication interfaces, to receive output from the device and send debugging commands.

#### 4. **Execution and Monitoring**

   - **Start Execution**: Start the device or simulator, observe the system booting and running processes, and pay attention to any boot errors or execution anomalies.
   - **Real-Time Monitoring**: Use debugging tools and log outputs to monitor the system's operational status in real time, ensuring the system operates as designed.

### Indicators of Successful Operation

A successfully running image file indicates that:

   - The program executes correctly on the target hardware or simulator.
   - The operations performed match the design expectations, with no crashes or unexpected behavior.
   - System responses meet expectations, including handling external inputs and system outputs.

### Troubleshooting and Debugging

During the deployment and running process, various issues may arise, such as hardware non-responsiveness, system crashes, or dysfunctional features. To address these issues, you may need to:

   - **Review Logs and Outputs**: Analyze system outputs and log information to find specific locations and causes of errors or anomalies.
   - **Adjust and Optimize Configurations**: Adjust system configurations or code based on observed issues to solve compatibility or performance problems.
   - **Repeat Testing**: After modifications, re-upload the image and test until the system runs stably.

### Summary

Running on the target platform is the final step in verifying and demonstrating the outcomes of bare-metal programming. Through meticulous preparation, precise deployment, and effective monitoring and debugging, the developed system can achieve the expected performance and functionality in real or simulated hardware environments. This step is not only a technical validation process but also the ultimate test of the entire development workflow.

## 2. Additional Recommendations

### 1. **System Performance Evaluation**

   - **Performance Testing**: After the system is successfully running, conducting performance testing is a good idea, especially for applications with strict latency and processing speed requirements. Consider integrating benchmark tests or using performance analysis tools to assess the response times and system throughput for critical operations.

### 2. **Security Evaluation**

   - **Security Audit**: For applications that require high security, conducting a security assessment is also crucial. This includes, but is not limited to, checking the system's defenses against potential security threats, such as buffer overflows, unintended access privilege escalation, etc.

### 3. **Documentation and Maintenance**

   - **Documentation Creation**: Writing detailed operational documentation for the system's deployment and running can help subsequent developers or users understand the system's configuration and operational processes, especially during handovers or when open-sourcing the project.
   - **Maintenance Strategy**: Developing a clear maintenance strategy, defining standard operating procedures for possible updates and iterations, can ensure the system's long-term stability and maintainability.

### 4. **Cross-Platform Compatibility Testing**

   - **Multi-Hardware Testing**: If possible, try testing your system on different RISC-V hardware platforms. This can help identify any specific hardware-dependent issues, ensuring the software has good portability and adaptability.

### 5. **User Feedback and Field Testing**

   - **User Testing**: If conditions permit, consider inviting the target user group to participate in testing and collect their feedback. This can help the development team understand the system's usability and potential improvement points from the users' perspective.
   - **Field Testing**: Conduct tests in actual application environments to assess the system's performance under real working conditions.

## 3. QEMU

Using the QEMU simulator for testing and verification in bare

-metal programming with RISC-V and Rust is a highly effective method. QEMU can simulate various hardware platforms, providing a fast, controllable testing environment, ideal for development and testing phases. Here are some specific recommendations and additional notes on using QEMU for bare-metal programming:

### 1. **Configuration and Launching QEMU**

- **Configure Command-Line Parameters**: Configuring the correct command-line parameters for QEMU is key to ensuring the simulator correctly executes RISC-V architecture code. Common parameters include CPU type, memory size, machine type, etc.

  For example, starting a RISC-V virtual machine might use the following command:

  ```bash
  qemu-system-riscv64 -machine virt -cpu rv64 -m 128M -kernel path_to_your_binary.elf -nographic
  ```

  Here, `-machine virt` specifies using a virtualized machine type, `-cpu rv64` sets the CPU architecture, `-m 128M` sets the memory size to 128MB, and `-kernel` specifies the location of the bare-metal program.

- **No Graphical Interface Mode** (`-nographic`): When performing bare-metal programming, a graphical interface is usually not needed. Using the `-nographic` option allows QEMU to run in command-line mode, where all input and output occur through the console.

### 2. **Debugging Support**

- **GDB Debugging**: QEMU supports using GDB for remote debugging. You can start QEMU with the `-s -S` options, which make QEMU wait for a debugger connection at startup.

  For example:

  ```bash
  qemu-system-riscv64 -machine virt -cpu rv64 -m 128M -kernel path_to_your_binary.elf -nographic -s -S
  ```

  Then, you can connect to QEMU with GDB (usually at `localhost:1234`) to perform debugging.

- **Logs and Tracing**: QEMU offers extensive logging and tracing capabilities that can help developers understand the behavior of virtual hardware. Configuring QEMU's logging system can provide detailed information about system calls, exceptions, and other system events during execution.

### 3. **Performance Analysis**

- **Simulator Performance Analysis**: Although QEMU provides a fast development environment, the performance metrics observed in QEMU may differ from those on real hardware. Developers should be aware that performance indicators observed in QEMU might not fully align with actual hardware performance.

### 4. **Automated Testing**

- **Scripted Testing**: Using QEMU's command-line interface, you can write scripts to automate the testing process. For example, you can automatically start QEMU, run the program, check outputs, and then shut down QEMU. This is very useful for regression testing.

### 5. **Environment Isolation and Version Control**

- **Version Control**: As QEMU is frequently updated and improved, it is advisable to clearly document the version of QEMU used in the project, ensuring consistent behavior across all developers and test environments.

With these enhancements, using QEMU as a simulation platform for RISC-V bare-metal programming becomes more efficient and controllable. Properly configuring and using QEMU can accelerate the development process and help identify potential errors and issues early in the project.

---

- **`bootloader/rustsbi-qemu.bin`**: RISC-V's SBI implementation, used to provide a standard system call interface. This is necessary when running on target hardware or a simulator, providing a standard service interface for the operating system.

---

Here's the translation of your text into English:

---

# Final Summary

After completing a detailed study of bare-metal programming with RISC-V and Rust, you should now have gained the following understanding:

1. **Importance of Environment Setup**: You have learned how to set up a programming environment for a specific hardware architecture, including cross-compilers and necessary tools. This is the foundation for all subsequent activities.

2. **Systematic Project Structure**: You understand how to set up and configure a bare-metal project, including managing dependencies and the build process using Cargo and potentially Makefiles.

3. **Hardware-Level Programming**: Through learning startup code and main programs, you've understood how to interact directly with hardware, including how to initialize hardware, set up memory, and configure the execution environment without operating system support.

4. **In-depth Interaction with Memory and Processor**: Through linker scripts and startup code, you've gained a deep understanding of memory layout and the processor boot process, which is crucial for optimizing program performance and resource utilization.

5. **Debugging and Logging**: You have learned how to implement basic debugging and logging functions in an environment without advanced operating system support, which are key skills for monitoring and optimizing program behavior.

6. **Practical Deployment and Testing**: By generating image files and running them on target platforms or simulators, you are not only able to put theory into practice but also understand how to deploy and debug programs on actual hardware.

With these learnings, you should be able to independently conduct development of bare-metal projects using RISC-V and Rust, managing the entire process from project initiation to deployment. These skills are not only limited to embedded system development but are also valuable assets for any field that requires a deep understanding of direct interactions between hardware and software.

I hope this summary helps you better understand and integrate your learning outcomes, laying a solid foundation for future programming challenges. If you have any questions or suggestions about this series, please feel free to tell me!