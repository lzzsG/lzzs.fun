#include <stdio.h>
#include <stdlib.h>

// 示例1：动态数组的创建与扩展
void dynamic_array_example()
{
    printf("示例1：动态数组的创建与扩展\n");
    int *arr = (int *)malloc(3 * sizeof(int)); // 动态分配内存
    if (arr == NULL)
    {
        printf("内存分配失败\n");
        return;
    }
    for (int i = 0; i < 3; i++)
    {
        arr[i] = i + 1; // 初始化数组
        printf("arr[%d] = %d\n", i, arr[i]);
    }

    // 扩展动态数组
    arr = (int *)realloc(arr, 5 * sizeof(int)); // 扩展数组
    if (arr == NULL)
    {
        printf("内存重新分配失败\n");
        return;
    }
    arr[3] = 4;
    arr[4] = 5;
    for (int i = 0; i < 5; i++)
    {
        printf("扩展后的 arr[%d] = %d\n", i, arr[i]);
    }
    free(arr); // 释放内存
}

// 示例2：单向链表的创建与遍历
struct Node
{
    int data;
    struct Node *next;
};

void linked_list_example()
{
    printf("\n示例2：单向链表的创建与遍历\n");
    struct Node *head = NULL, *second = NULL, *third = NULL;

    // 动态分配内存
    head = (struct Node *)malloc(sizeof(struct Node));
    second = (struct Node *)malloc(sizeof(struct Node));
    third = (struct Node *)malloc(sizeof(struct Node));

    head->data = 1;
    head->next = second;

    second->data = 2;
    second->next = third;

    third->data = 3;
    third->next = NULL;

    // 遍历链表
    struct Node *ptr = head;
    while (ptr != NULL)
    {
        printf("节点数据: %d\n", ptr->data);
        ptr = ptr->next;
    }

    // 释放内存
    free(head);
    free(second);
    free(third);
}

// 示例3：双向链表的创建与遍历
struct DNode
{
    int data;
    struct DNode *prev;
    struct DNode *next;
};

void doubly_linked_list_example()
{
    printf("\n示例3：双向链表的创建与遍历\n");
    struct DNode *head = NULL, *second = NULL, *third = NULL;

    // 动态分配内存
    head = (struct DNode *)malloc(sizeof(struct DNode));
    second = (struct DNode *)malloc(sizeof(struct DNode));
    third = (struct DNode *)malloc(sizeof(struct DNode));

    head->data = 10;
    head->prev = NULL;
    head->next = second;

    second->data = 20;
    second->prev = head;
    second->next = third;

    third->data = 30;
    third->prev = second;
    third->next = NULL;

    // 正向遍历
    struct DNode *ptr = head;
    printf("正向遍历:\n");
    while (ptr != NULL)
    {
        printf("节点数据: %d\n", ptr->data);
        ptr = ptr->next;
    }

    // 反向遍历
    ptr = third;
    printf("反向遍历:\n");
    while (ptr != NULL)
    {
        printf("节点数据: %d\n", ptr->data);
        ptr = ptr->prev;
    }

    // 释放内存
    free(head);
    free(second);
    free(third);
}

// 示例4：栈的实现（基于数组）
struct Stack
{
    int top;
    int capacity;
    int *array;
};

struct Stack *create_stack(int capacity)
{
    struct Stack *stack = (struct Stack *)malloc(sizeof(struct Stack));
    stack->capacity = capacity;
    stack->top = -1;
    stack->array = (int *)malloc(stack->capacity * sizeof(int));
    return stack;
}

int is_full(struct Stack *stack)
{
    return stack->top == stack->capacity - 1;
}

int is_empty(struct Stack *stack)
{
    return stack->top == -1;
}

void push(struct Stack *stack, int item)
{
    if (is_full(stack))
    {
        printf("栈已满，无法推入元素\n");
        return;
    }
    stack->array[++stack->top] = item;
    printf("推入栈: %d\n", item);
}

int pop(struct Stack *stack)
{
    if (is_empty(stack))
    {
        printf("栈为空，无法弹出元素\n");
        return -1;
    }
    return stack->array[stack->top--];
}

void stack_example()
{
    printf("\n示例4：栈的实现（基于数组）\n");
    struct Stack *stack = create_stack(5);

    push(stack, 10);
    push(stack, 20);
    push(stack, 30);

    printf("弹出栈: %d\n", pop(stack));
    printf("弹出栈: %d\n", pop(stack));

    free(stack->array);
    free(stack);
}

// 示例5：队列的实现（基于数组）
struct Queue
{
    int front, rear, size;
    unsigned capacity;
    int *array;
};

struct Queue *create_queue(unsigned capacity)
{
    struct Queue *queue = (struct Queue *)malloc(sizeof(struct Queue));
    queue->capacity = capacity;
    queue->front = queue->size = 0;
    queue->rear = capacity - 1;
    queue->array = (int *)malloc(queue->capacity * sizeof(int));
    return queue;
}

int is_full_queue(struct Queue *queue)
{
    return queue->size == queue->capacity;
}

int is_empty_queue(struct Queue *queue)
{
    return queue->size == 0;
}

void enqueue(struct Queue *queue, int item)
{
    if (is_full_queue(queue))
    {
        printf("队列已满，无法入队元素\n");
        return;
    }
    queue->rear = (queue->rear + 1) % queue->capacity;
    queue->array[queue->rear] = item;
    queue->size = queue->size + 1;
    printf("入队: %d\n", item);
}

int dequeue(struct Queue *queue)
{
    if (is_empty_queue(queue))
    {
        printf("队列为空，无法出队元素\n");
        return -1;
    }
    int item = queue->array[queue->front];
    queue->front = (queue->front + 1) % queue->capacity;
    queue->size = queue->size - 1;
    return item;
}

void queue_example()
{
    printf("\n示例5：队列的实现（基于数组）\n");
    struct Queue *queue = create_queue(5);

    enqueue(queue, 10);
    enqueue(queue, 20);
    enqueue(queue, 30);

    printf("出队: %d\n", dequeue(queue));
    printf("出队: %d\n", dequeue(queue));

    free(queue->array);
    free(queue);
}

int main()
{
    dynamic_array_example();
    linked_list_example();
    doubly_linked_list_example();
    stack_example();
    queue_example();

    return 0;
}

//------------------------------------------------------
#include <stdio.h>
#include <stdlib.h>

// 示例6：环形缓冲区（循环队列）的实现
struct CircularQueue
{
    int front, rear, size;
    unsigned capacity;
    int *array;
};

struct CircularQueue *create_circular_queue(unsigned capacity)
{
    struct CircularQueue *queue = (struct CircularQueue *)malloc(sizeof(struct CircularQueue));
    queue->capacity = capacity;
    queue->front = queue->size = 0;
    queue->rear = capacity - 1; // 队列的尾部从 capacity - 1 开始
    queue->array = (int *)malloc(queue->capacity * sizeof(int));
    return queue;
}

int is_full_circular_queue(struct CircularQueue *queue)
{
    return (queue->size == queue->capacity);
}

int is_empty_circular_queue(struct CircularQueue *queue)
{
    return (queue->size == 0);
}

void enqueue_circular(struct CircularQueue *queue, int item)
{
    if (is_full_circular_queue(queue))
    {
        printf("环形缓冲区已满，无法入队元素\n");
        return;
    }
    queue->rear = (queue->rear + 1) % queue->capacity;
    queue->array[queue->rear] = item;
    queue->size = queue->size + 1;
    printf("入队: %d\n", item);
}

int dequeue_circular(struct CircularQueue *queue)
{
    if (is_empty_circular_queue(queue))
    {
        printf("环形缓冲区为空，无法出队元素\n");
        return -1;
    }
    int item = queue->array[queue->front];
    queue->front = (queue->front + 1) % queue->capacity;
    queue->size = queue->size - 1;
    return item;
}

void circular_queue_example()
{
    printf("\n示例6：环形缓冲区（循环队列）的实现\n");
    struct CircularQueue *queue = create_circular_queue(5);

    enqueue_circular(queue, 10);
    enqueue_circular(queue, 20);
    enqueue_circular(queue, 30);
    enqueue_circular(queue, 40);
    enqueue_circular(queue, 50);

    printf("出队: %d\n", dequeue_circular(queue));
    printf("出队: %d\n", dequeue_circular(queue));

    enqueue_circular(queue, 60);
    enqueue_circular(queue, 70);

    printf("出队: %d\n", dequeue_circular(queue));
    printf("出队: %d\n", dequeue_circular(queue));

    free(queue->array);
    free(queue);
}

// 示例7：动态链式栈的实现
struct StackNode
{
    int data;
    struct StackNode *next;
};

struct StackNode *create_stack_node(int data)
{
    struct StackNode *stack_node = (struct StackNode *)malloc(sizeof(struct StackNode));
    stack_node->data = data;
    stack_node->next = NULL;
    return stack_node;
}

int is_empty_stack(struct StackNode *root)
{
    return !root;
}

void push_stack(struct StackNode **root, int data)
{
    struct StackNode *stack_node = create_stack_node(data);
    stack_node->next = *root;
    *root = stack_node;
    printf("推入栈: %d\n", data);
}

int pop_stack(struct StackNode **root)
{
    if (is_empty_stack(*root))
    {
        printf("栈为空，无法弹出元素\n");
        return -1;
    }
    struct StackNode *temp = *root;
    *root = (*root)->next;
    int popped = temp->data;
    free(temp);
    return popped;
}

void stack_linked_example()
{
    printf("\n示例7：动态链式栈的实现\n");
    struct StackNode *root = NULL;

    push_stack(&root, 10);
    push_stack(&root, 20);
    push_stack(&root, 30);

    printf("弹出栈: %d\n", pop_stack(&root));
    printf("弹出栈: %d\n", pop_stack(&root));

    free(root);
}

// 示例8：动态链式队列的实现
struct QueueNode
{
    int data;
    struct QueueNode *next;
};

struct QueueLinked
{
    struct QueueNode *front, *rear;
};

struct QueueLinked *create_queue_linked()
{
    struct QueueLinked *queue = (struct QueueLinked *)malloc(sizeof(struct QueueLinked));
    queue->front = queue->rear = NULL;
    return queue;
}

void enqueue_linked(struct QueueLinked *queue, int data)
{
    struct QueueNode *new_node = (struct QueueNode *)malloc(sizeof(struct QueueNode));
    new_node->data = data;
    new_node->next = NULL;
    if (queue->rear == NULL)
    {
        queue->front = queue->rear = new_node;
        printf("入队: %d\n", data);
        return;
    }
    queue->rear->next = new_node;
    queue->rear = new_node;
    printf("入队: %d\n", data);
}

int dequeue_linked(struct QueueLinked *queue)
{
    if (queue->front == NULL)
    {
        printf("队列为空，无法出队元素\n");
        return -1;
    }
    struct QueueNode *temp = queue->front;
    int data = temp->data;
    queue->front = queue->front->next;
    if (queue->front == NULL)
    {
        queue->rear = NULL;
    }
    free(temp);
    return data;
}

void queue_linked_example()
{
    printf("\n示例8：动态链式队列的实现\n");
    struct QueueLinked *queue = create_queue_linked();

    enqueue_linked(queue, 100);
    enqueue_linked(queue, 200);
    enqueue_linked(queue, 300);

    printf("出队: %d\n", dequeue_linked(queue));
    printf("出队: %d\n", dequeue_linked(queue));

    free(queue);
}

int main()
{
    circular_queue_example();
    stack_linked_example();
    queue_linked_example();

    return 0;
}

//--------------------------------------------------------------------------
#include <stdio.h>
#include <stdlib.h>

// 示例9：链式双端队列（Deque）的实现
struct DequeNode
{
    int data;
    struct DequeNode *next;
    struct DequeNode *prev;
};

struct Deque
{
    struct DequeNode *front;
    struct DequeNode *rear;
};

struct Deque *create_deque()
{
    struct Deque *deque = (struct Deque *)malloc(sizeof(struct Deque));
    deque->front = deque->rear = NULL;
    return deque;
}

int is_empty_deque(struct Deque *deque)
{
    return deque->front == NULL;
}

void insert_front(struct Deque *deque, int data)
{
    struct DequeNode *new_node = (struct DequeNode *)malloc(sizeof(struct DequeNode));
    new_node->data = data;
    new_node->next = deque->front;
    new_node->prev = NULL;
    if (is_empty_deque(deque))
    {
        deque->rear = new_node;
    }
    else
    {
        deque->front->prev = new_node;
    }
    deque->front = new_node;
    printf("插入到前端: %d\n", data);
}

void insert_rear(struct Deque *deque, int data)
{
    struct DequeNode *new_node = (struct DequeNode *)malloc(sizeof(struct DequeNode));
    new_node->data = data;
    new_node->next = NULL;
    new_node->prev = deque->rear;
    if (is_empty_deque(deque))
    {
        deque->front = new_node;
    }
    else
    {
        deque->rear->next = new_node;
    }
    deque->rear = new_node;
    printf("插入到后端: %d\n", data);
}

int delete_front(struct Deque *deque)
{
    if (is_empty_deque(deque))
    {
        printf("双端队列为空，无法删除前端元素\n");
        return -1;
    }
    struct DequeNode *temp = deque->front;
    int data = temp->data;
    deque->front = deque->front->next;
    if (deque->front == NULL)
    {
        deque->rear = NULL;
    }
    else
    {
        deque->front->prev = NULL;
    }
    free(temp);
    return data;
}

int delete_rear(struct Deque *deque)
{
    if (is_empty_deque(deque))
    {
        printf("双端队列为空，无法删除后端元素\n");
        return -1;
    }
    struct DequeNode *temp = deque->rear;
    int data = temp->data;
    deque->rear = deque->rear->prev;
    if (deque->rear == NULL)
    {
        deque->front = NULL;
    }
    else
    {
        deque->rear->next = NULL;
    }
    free(temp);
    return data;
}

void deque_example()
{
    printf("\n示例9：链式双端队列（Deque）的实现\n");
    struct Deque *deque = create_deque();

    insert_front(deque, 10);
    insert_rear(deque, 20);
    insert_front(deque, 5);
    insert_rear(deque, 30);

    printf("删除前端: %d\n", delete_front(deque));
    printf("删除后端: %d\n", delete_rear(deque));

    free(deque);
}

// 示例10：优先队列（基于数组）的实现
struct PriorityQueue
{
    int *array;
    int capacity;
    int size;
};

struct PriorityQueue *create_priority_queue(int capacity)
{
    struct PriorityQueue *pq = (struct PriorityQueue *)malloc(sizeof(struct PriorityQueue));
    pq->array = (int *)malloc(capacity * sizeof(int));
    pq->capacity = capacity;
    pq->size = 0;
    return pq;
}

void insert_priority_queue(struct PriorityQueue *pq, int data)
{
    if (pq->size == pq->capacity)
    {
        printf("优先队列已满，无法插入元素\n");
        return;
    }
    int i = pq->size - 1;
    while (i >= 0 && pq->array[i] > data)
    {
        pq->array[i + 1] = pq->array[i];
        i--;
    }
    pq->array[i + 1] = data;
    pq->size++;
    printf("插入优先队列: %d\n", data);
}

int delete_min_priority_queue(struct PriorityQueue *pq)
{
    if (pq->size == 0)
    {
        printf("优先队列为空，无法删除元素\n");
        return -1;
    }
    return pq->array[--pq->size];
}

void priority_queue_example()
{
    printf("\n示例10：优先队列的实现（基于数组）\n");
    struct PriorityQueue *pq = create_priority_queue(5);

    insert_priority_queue(pq, 30);
    insert_priority_queue(pq, 10);
    insert_priority_queue(pq, 20);

    printf("删除最小元素: %d\n", delete_min_priority_queue(pq));
    printf("删除最小元素: %d\n", delete_min_priority_queue(pq));

    free(pq->array);
    free(pq);
}

// 示例11：动态内存分配的二叉树实现
struct TreeNode
{
    int data;
    struct TreeNode *left, *right;
};

struct TreeNode *create_node(int data)
{
    struct TreeNode *node = (struct TreeNode *)malloc(sizeof(struct TreeNode));
    node->data = data;
    node->left = node->right = NULL;
    return node;
}

void inorder_traversal(struct TreeNode *root)
{
    if (root == NULL)
        return;
    inorder_traversal(root->left);
    printf("%d ", root->data);
    inorder_traversal(root->right);
}

void binary_tree_example()
{
    printf("\n示例11：二叉树的实现与遍历\n");
    struct TreeNode *root = create_node(1);
    root->left = create_node(2);
    root->right = create_node(3);
    root->left->left = create_node(4);
    root->left->right = create_node(5);

    printf("二叉树的中序遍历: ");
    inorder_traversal(root);
    printf("\n");

    // 释放内存
    free(root->left->left);
    free(root->left->right);
    free(root->left);
    free(root->right);
    free(root);
}

// 示例12：最小堆的实现
struct MinHeap
{
    int *array;
    int capacity;
    int size;
};

struct MinHeap *create_min_heap(int capacity)
{
    struct MinHeap *heap = (struct MinHeap *)malloc(sizeof(struct MinHeap));
    heap->capacity = capacity;
    heap->size = 0;
    heap->array = (int *)malloc(capacity * sizeof(int));
    return heap;
}

void heapify_down(struct MinHeap *heap, int idx)
{
    int smallest = idx;
    int left = 2 * idx + 1;
    int right = 2 * idx + 2;

    if (left < heap->size && heap->array[left] < heap->array[smallest])
    {
        smallest = left;
    }
    if (right < heap->size && heap->array[right] < heap->array[smallest])
    {
        smallest = right;
    }
    if (smallest != idx)
    {
        int temp = heap->array[idx];
        heap->array[idx] = heap->array[smallest];
        heap->array[smallest] = temp;
        heapify_down(heap, smallest);
    }
}

void insert_min_heap(struct MinHeap *heap, int data)
{
    if (heap->size == heap->capacity)
    {
        printf("最小堆已满，无法插入元素\n");
        return;
    }
    heap->size++;
    int i = heap->size - 1;
    heap->array[i] = data;

    while (i != 0 && heap->array[(i - 1) / 2] > heap->array[i])
    {
        int temp = heap->array[i];
        heap->array[i] = heap->array[(i - 1) / 2];
        heap->array[(i - 1) / 2] = temp;
        i = (i - 1) / 2;
    }
}

int extract_min(struct MinHeap *heap)
{
    if (heap->size == 0)
    {
        printf("最小堆为空，无法提取元素\n");
        return -1;
    }
    if (heap->size == 1)
    {
        heap->size--;
        return heap->array[0];
    }
    int root = heap->array[0];
    heap->array[0] = heap->array[heap->size - 1];
    heap->size--;
    heapify_down(heap, 0);
    return root;
}

void min_heap_example()
{
    printf("\n示例12：最小堆的实现\n");
    struct MinHeap *heap = create_min_heap(10);

    insert_min_heap(heap, 3);
    insert_min_heap(heap, 1);
    insert_min_heap(heap, 6);
    insert_min_heap(heap, 5);
    insert_min_heap(heap, 9);
    insert_min_heap(heap, 8);

    printf("提取最小元素: %d\n", extract_min(heap));
    printf("提取最小元素: %d\n", extract_min(heap));

    free(heap->array);
    free(heap);
}

int main()
{
    deque_example();
    priority_queue_example();
    binary_tree_example();
    min_heap_example();

    return 0;
}

//----------------------------------------------------------------------