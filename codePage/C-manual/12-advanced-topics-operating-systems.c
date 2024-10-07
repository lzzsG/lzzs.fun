#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <pthread.h>
#include <signal.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <semaphore.h>
#include <fcntl.h>

// 示例1：进程创建与等待（fork 和 wait）
void process_creation_example()
{
    printf("示例1：进程创建与等待\n");
    pid_t pid = fork(); // 创建子进程

    if (pid == -1)
    {
        perror("fork");
        exit(1);
    }
    else if (pid == 0)
    {
        printf("子进程：PID = %d\n", getpid());
        exit(0); // 子进程退出
    }
    else
    {
        printf("父进程：等待子进程结束...\n");
        wait(NULL); // 父进程等待子进程结束
        printf("子进程已结束\n");
    }
}

// 示例2：线程创建与执行
void *thread_function(void *arg)
{
    printf("示例2：线程创建与执行\n");
    printf("线程运行中... ID = %lu\n", pthread_self());
    pthread_exit(NULL);
}

void thread_creation_example()
{
    pthread_t thread;
    int result = pthread_create(&thread, NULL, thread_function, NULL);

    if (result != 0)
    {
        printf("线程创建失败\n");
        exit(1);
    }
    pthread_join(thread, NULL); // 等待线程结束
}

// 示例3：进程间通信（管道）
void pipe_example()
{
    printf("\n示例3：进程间通信（管道）\n");
    int pipefd[2];
    pid_t pid;
    char buffer[30];
    pipe(pipefd); // 创建管道

    pid = fork(); // 创建子进程

    if (pid == 0)
    {
        close(pipefd[0]); // 关闭读端
        char *msg = "来自子进程的数据";
        write(pipefd[1], msg, sizeof(msg)); // 写入管道
        close(pipefd[1]);
    }
    else
    {
        close(pipefd[1]);                        // 关闭写端
        read(pipefd[0], buffer, sizeof(buffer)); // 读取管道数据
        printf("父进程读取的数据: %s\n", buffer);
        close(pipefd[0]);
    }
}

// 示例4：线程互斥锁（Mutex）
pthread_mutex_t lock;
int shared_resource = 0;

void *increment_resource(void *arg)
{
    pthread_mutex_lock(&lock); // 获取锁
    shared_resource++;
    printf("线程 %lu 访问资源，当前值: %d\n", pthread_self(), shared_resource);
    pthread_mutex_unlock(&lock); // 释放锁
    return NULL;
}

void mutex_example()
{
    printf("\n示例4：线程互斥锁（Mutex）\n");
    pthread_t threads[5];
    pthread_mutex_init(&lock, NULL); // 初始化锁

    for (int i = 0; i < 5; i++)
    {
        pthread_create(&threads[i], NULL, increment_resource, NULL);
    }

    for (int i = 0; i < 5; i++)
    {
        pthread_join(threads[i], NULL); // 等待线程结束
    }

    pthread_mutex_destroy(&lock); // 销毁锁
}

// 示例5：信号处理
void signal_handler(int signum)
{
    printf("\n示例5：捕获信号 %d\n", signum);
    exit(signum);
}

void signal_handling_example()
{
    printf("\n示例5：信号处理\n");
    signal(SIGINT, signal_handler); // 注册信号处理程序

    printf("按 Ctrl+C 触发信号...\n");
    while (1)
        ; // 等待信号
}

// 示例6：共享内存（System V共享内存）
#include <sys/ipc.h>
#include <sys/shm.h>

void shared_memory_example()
{
    printf("\n示例6：共享内存\n");
    key_t key = 1234;
    int shmid = shmget(key, 1024, 0666 | IPC_CREAT); // 创建共享内存
    char *str = (char *)shmat(shmid, NULL, 0);       // 附加共享内存

    if (fork() == 0)
    {
        // 子进程
        sprintf(str, "Hello from child process");
        shmdt(str); // 分离共享内存
        exit(0);
    }
    else
    {
        wait(NULL);
        printf("父进程读取共享内存: %s\n", str);
        shmdt(str);                    // 分离共享内存
        shmctl(shmid, IPC_RMID, NULL); // 销毁共享内存
    }
}

// 示例7：信号量同步（POSIX信号量）
sem_t sem;

void *sem_worker(void *arg)
{
    sem_wait(&sem); // 等待信号量
    printf("线程 %lu 获得信号量\n", pthread_self());
    sem_post(&sem); // 释放信号量
    return NULL;
}

void semaphore_example()
{
    printf("\n示例7：信号量同步（POSIX信号量）\n");
    pthread_t threads[3];
    sem_init(&sem, 0, 1); // 初始化信号量

    for (int i = 0; i < 3; i++)
    {
        pthread_create(&threads[i], NULL, sem_worker, NULL);
    }

    for (int i = 0; i < 3; i++)
    {
        pthread_join(threads[i], NULL);
    }

    sem_destroy(&sem); // 销毁信号量
}

// 示例8：虚拟内存管理（mmap）
#include <sys/mman.h>
#include <fcntl.h>

void mmap_example()
{
    printf("\n示例8：虚拟内存管理（mmap）\n");
    int fd = open("test.txt", O_RDWR | O_CREAT, 0666);
    write(fd, "Hello, mmap!", 12);                                                    // 向文件写入一些数据
    char *mapped = (char *)mmap(NULL, 12, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0); // 内存映射

    printf("通过 mmap 读取文件内容: %s\n", mapped);
    munmap(mapped, 12); // 解除映射
    close(fd);
}

// 示例9：僵尸进程处理
void zombie_process_example()
{
    printf("\n示例9：僵尸进程处理\n");
    pid_t pid = fork();

    if (pid == 0)
    {
        // 子进程
        printf("子进程终止\n");
        exit(0);
    }
    else
    {
        printf("父进程等待 5 秒...\n");
        sleep(5);
        wait(NULL); // 父进程通过 wait 函数处理僵尸进程
        printf("僵尸进程处理完成\n");
    }
}

// 示例10：多线程条件变量（Condition Variable）
pthread_cond_t cond = PTHREAD_COND_INITIALIZER;
pthread_mutex_t cond_mutex = PTHREAD_MUTEX_INITIALIZER;
int ready = 0;

void *condition_worker(void *arg)
{
    pthread_mutex_lock(&cond_mutex);
    while (!ready)
    {
        pthread_cond_wait(&cond, &cond_mutex); // 等待条件变量
    }
    printf("线程 %lu 获得条件信号\n", pthread_self());
    pthread_mutex_unlock(&cond_mutex);
    return NULL;
}

void condition_variable_example()
{
    printf("\n示例10：多线程条件变量\n");
    pthread_t thread;

    pthread_create(&thread, NULL, condition_worker, NULL);
    sleep(1); // 模拟一些操作

    pthread_mutex_lock(&cond_mutex);
    ready = 1;
    pthread_cond_signal(&cond); // 发送条件信号
    pthread_mutex_unlock(&cond_mutex);

    pthread_join(thread, NULL);
}

int main()
{
    process_creation_example();
    thread_creation_example();
    pipe_example();
    mutex_example();
    // signal_handling_example();  // 可以运行并捕获 Ctrl+C 信号
    shared_memory_example();
    semaphore_example();
    mmap_example();
    zombie_process_example();
    condition_variable_example();

    return 0;
}

//---------------------------------------------------------------

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <unistd.h>
#include <sys/mman.h>
#include <fcntl.h>
#include <sys/wait.h>
#include <semaphore.h>
#include <signal.h>
#include <sys/ipc.h>
#include <sys/shm.h>

// 示例11：信号量在进程间的同步
sem_t *sem_process;

void child_process()
{
    printf("子进程等待信号量...\n");
    sem_wait(sem_process); // 等待父进程释放信号量
    printf("子进程获得信号量，继续运行\n");
    sem_post(sem_process); // 释放信号量
    exit(0);
}

void process_semaphore_example()
{
    printf("\n示例11：信号量在进程间的同步\n");

    sem_process = sem_open("/process_semaphore", O_CREAT, 0644, 0); // 创建信号量

    if (fork() == 0)
    {
        child_process(); // 子进程等待信号量
    }
    else
    {
        sleep(2); // 模拟父进程的操作延迟
        printf("父进程释放信号量\n");
        sem_post(sem_process);            // 父进程释放信号量
        wait(NULL);                       // 等待子进程完成
        sem_close(sem_process);           // 关闭信号量
        sem_unlink("/process_semaphore"); // 删除信号量
    }
}

// 示例12：定时器信号处理（使用 alarm）
void alarm_handler(int sig)
{
    printf("\n示例12：定时器触发，信号 %d 被捕获\n", sig);
}

void timer_signal_example()
{
    printf("\n示例12：定时器信号处理\n");
    signal(SIGALRM, alarm_handler); // 注册定时器信号处理函数
    alarm(3);                       // 设置定时器，3秒后触发 SIGALRM 信号
    printf("等待定时器触发...\n");
    pause(); // 暂停等待信号触发
}

// 示例13：进程优先级调整（使用 nice）
void adjust_process_priority_example()
{
    printf("\n示例13：进程优先级调整\n");
    int current_priority = getpriority(PRIO_PROCESS, 0); // 获取当前进程优先级
    printf("当前进程优先级：%d\n", current_priority);

    int new_priority = nice(5); // 提高进程的优先级
    printf("调整后进程优先级：%d\n", new_priority);
}

// 示例14：虚拟内存分页（mmap 与匿名内存映射）
void anonymous_mmap_example()
{
    printf("\n示例14：虚拟内存分页（匿名内存映射）\n");
    size_t size = 4096; // 分配一页大小的内存
    void *mapped_mem = mmap(NULL, size, PROT_READ | PROT_WRITE, MAP_ANONYMOUS | MAP_PRIVATE, -1, 0);

    if (mapped_mem == MAP_FAILED)
    {
        perror("mmap failed");
        exit(1);
    }

    printf("匿名映射成功，写入数据...\n");
    snprintf((char *)mapped_mem, size, "操作系统示例数据");
    printf("映射的内存内容: %s\n", (char *)mapped_mem);

    munmap(mapped_mem, size); // 解除映射
}

// 示例15：文件锁机制（flock 锁定文件）
#include <sys/file.h>

void file_lock_example()
{
    printf("\n示例15：文件锁机制（flock）\n");
    int fd = open("lockfile.txt", O_CREAT | O_RDWR, 0666);

    if (fd == -1)
    {
        perror("文件打开失败");
        exit(1);
    }

    printf("锁定文件...\n");
    if (flock(fd, LOCK_EX) == -1)
    { // 获取文件排他锁
        perror("文件锁定失败");
        exit(1);
    }

    printf("文件已锁定，写入数据...\n");
    write(fd, "锁定写入数据\n", 16);

    printf("解锁文件...\n");
    if (flock(fd, LOCK_UN) == -1)
    { // 释放文件锁
        perror("文件解锁失败");
        exit(1);
    }

    close(fd);
}

// 示例16：进程池模拟（通过 fork 创建多个子进程）
void process_pool_example()
{
    printf("\n示例16：进程池模拟\n");
    int num_processes = 4;
    for (int i = 0; i < num_processes; i++)
    {
        pid_t pid = fork();
        if (pid == 0)
        {
            printf("子进程 %d 正在执行，PID = %d\n", i + 1, getpid());
            exit(0);
        }
    }

    for (int i = 0; i < num_processes; i++)
    {
        wait(NULL); // 等待所有子进程完成
    }
    printf("所有子进程已完成\n");
}

// 示例17：线程的条件变量同步
pthread_cond_t condition = PTHREAD_COND_INITIALIZER;
pthread_mutex_t cond_mutex2 = PTHREAD_MUTEX_INITIALIZER;
int condition_met = 0;

void *condition_thread_worker(void *arg)
{
    pthread_mutex_lock(&cond_mutex2);
    while (!condition_met)
    {
        pthread_cond_wait(&condition, &cond_mutex2); // 等待条件变量
    }
    printf("线程 %lu 获得条件变量信号\n", pthread_self());
    pthread_mutex_unlock(&cond_mutex2);
    return NULL;
}

void thread_condition_example()
{
    printf("\n示例17：线程的条件变量同步\n");
    pthread_t thread;

    pthread_create(&thread, NULL, condition_thread_worker, NULL);
    sleep(1); // 模拟一些操作

    pthread_mutex_lock(&cond_mutex2);
    condition_met = 1;
    pthread_cond_signal(&condition); // 发送条件信号
    pthread_mutex_unlock(&cond_mutex2);

    pthread_join(thread, NULL);
}

// 示例18：进程分离（daemon 守护进程）
void daemon_process_example()
{
    printf("\n示例18：进程分离（守护进程）\n");

    pid_t pid = fork();
    if (pid > 0)
    {
        printf("父进程退出，子进程将成为守护进程\n");
        exit(0); // 父进程退出
    }
    else if (pid == 0)
    {
        setsid(); // 创建新的会话，子进程脱离终端
        printf("守护进程 PID: %d 正在运行\n", getpid());
        while (1)
        {
            sleep(5); // 模拟守护进程执行的后台任务
            printf("守护进程正在后台运行...\n");
        }
    }
}

int main()
{
    process_semaphore_example();
    timer_signal_example();
    adjust_process_priority_example();
    anonymous_mmap_example();
    file_lock_example();
    process_pool_example();
    thread_condition_example();
    // daemon_process_example();  // 启动守护进程示例，注意会使程序持续运行

    return 0;
}
