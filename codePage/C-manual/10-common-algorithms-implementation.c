#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 示例1：冒泡排序算法
void bubble_sort(int arr[], int n)
{
    printf("示例1：冒泡排序算法\n");
    for (int i = 0; i < n - 1; i++)
    {
        for (int j = 0; j < n - i - 1; j++)
        {
            if (arr[j] > arr[j + 1])
            {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    for (int i = 0; i < n; i++)
    {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

// 示例2：选择排序算法
void selection_sort(int arr[], int n)
{
    printf("\n示例2：选择排序算法\n");
    for (int i = 0; i < n - 1; i++)
    {
        int min_index = i;
        for (int j = i + 1; j < n; j++)
        {
            if (arr[j] < arr[min_index])
            {
                min_index = j;
            }
        }
        int temp = arr[min_index];
        arr[min_index] = arr[i];
        arr[i] = temp;
    }
    for (int i = 0; i < n; i++)
    {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

// 示例3：插入排序算法
void insertion_sort(int arr[], int n)
{
    printf("\n示例3：插入排序算法\n");
    for (int i = 1; i < n; i++)
    {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key)
        {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
    for (int i = 0; i < n; i++)
    {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

// 示例4：快速排序算法
void quick_sort(int arr[], int low, int high)
{
    if (low < high)
    {
        int pivot = arr[high];
        int i = (low - 1);
        for (int j = low; j <= high - 1; j++)
        {
            if (arr[j] < pivot)
            {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        int pi = i + 1;
        quick_sort(arr, low, pi - 1);
        quick_sort(arr, pi + 1, high);
    }
}

void quick_sort_example(int arr[], int n)
{
    printf("\n示例4：快速排序算法\n");
    quick_sort(arr, 0, n - 1);
    for (int i = 0; i < n; i++)
    {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

// 示例5：归并排序算法
void merge(int arr[], int l, int m, int r)
{
    int i, j, k;
    int n1 = m - l + 1;
    int n2 = r - m;

    int L[n1], R[n2];

    for (i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];

    i = 0;
    j = 0;
    k = l;
    while (i < n1 && j < n2)
    {
        if (L[i] <= R[j])
        {
            arr[k] = L[i];
            i++;
        }
        else
        {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    while (i < n1)
    {
        arr[k] = L[i];
        i++;
        k++;
    }

    while (j < n2)
    {
        arr[k] = R[j];
        j++;
        k++;
    }
}

void merge_sort(int arr[], int l, int r)
{
    if (l < r)
    {
        int m = l + (r - l) / 2;
        merge_sort(arr, l, m);
        merge_sort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

void merge_sort_example(int arr[], int n)
{
    printf("\n示例5：归并排序算法\n");
    merge_sort(arr, 0, n - 1);
    for (int i = 0; i < n; i++)
    {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

// 示例6：线性查找算法
int linear_search(int arr[], int n, int x)
{
    for (int i = 0; i < n; i++)
    {
        if (arr[i] == x)
            return i;
    }
    return -1;
}

void linear_search_example(int arr[], int n, int x)
{
    printf("\n示例6：线性查找算法\n");
    int result = linear_search(arr, n, x);
    if (result != -1)
    {
        printf("元素 %d 在索引 %d 处找到\n", x, result);
    }
    else
    {
        printf("元素 %d 未找到\n", x);
    }
}

// 示例7：二分查找算法
int binary_search(int arr[], int l, int r, int x)
{
    if (r >= l)
    {
        int mid = l + (r - l) / 2;
        if (arr[mid] == x)
            return mid;
        if (arr[mid] > x)
            return binary_search(arr, l, mid - 1, x);
        return binary_search(arr, mid + 1, r, x);
    }
    return -1;
}

void binary_search_example(int arr[], int n, int x)
{
    printf("\n示例7：二分查找算法\n");
    int result = binary_search(arr, 0, n - 1, x);
    if (result != -1)
    {
        printf("元素 %d 在索引 %d 处找到\n", x, result);
    }
    else
    {
        printf("元素 %d 未找到\n", x);
    }
}

// 示例8：Dijkstra 最短路径算法
#define V 9
int min_distance(int dist[], int spt_set[])
{
    int min = __INT_MAX__, min_index;
    for (int v = 0; v < V; v++)
    {
        if (spt_set[v] == 0 && dist[v] <= min)
        {
            min = dist[v], min_index = v;
        }
    }
    return min_index;
}

void dijkstra(int graph[V][V], int src)
{
    printf("\n示例8：Dijkstra 最短路径算法\n");
    int dist[V], spt_set[V];
    for (int i = 0; i < V; i++)
    {
        dist[i] = __INT_MAX__, spt_set[i] = 0;
    }
    dist[src] = 0;
    for (int count = 0; count < V - 1; count++)
    {
        int u = min_distance(dist, spt_set);
        spt_set[u] = 1;
        for (int v = 0; v < V; v++)
        {
            if (!spt_set[v] && graph[u][v] && dist[u] != __INT_MAX__ && dist[u] + graph[u][v] < dist[v])
            {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }
    for (int i = 0; i < V; i++)
    {
        printf("节点 %d 到节点 %d 的最短距离: %d\n", src, i, dist[i]);
    }
}

void dijkstra_example()
{
    int graph[V][V] = {{0, 4, 0, 0, 0, 0, 0, 8, 0},
                       {4, 0, 8, 0, 0, 0, 0, 11, 0},
                       {0, 8, 0, 7, 0, 4, 0, 0, 2},
                       {0, 0, 7, 0, 9, 14, 0, 0, 0},
                       {0, 0, 0, 9, 0, 10, 0, 0, 0},
                       {0, 0, 4, 14, 10, 0, 2, 0, 0},
                       {0, 0, 0, 0, 0, 2, 0, 1, 6},
                       {8, 11, 0, 0, 0, 0, 1, 0, 7},
                       {0, 0, 2, 0, 0, 0, 6, 7, 0}};
    dijkstra(graph, 0);
}

int main()
{
    int arr1[] = {64, 34, 25, 12, 22, 11, 90};
    int n1 = sizeof(arr1) / sizeof(arr1[0]);
    bubble_sort(arr1, n1);

    int arr2[] = {64, 25, 12, 22, 11, 90};
    int n2 = sizeof(arr2) / sizeof(arr2[0]);
    selection_sort(arr2, n2);

    int arr3[] = {12, 11, 13, 5, 6};
    int n3 = sizeof(arr3) / sizeof(arr3[0]);
    insertion_sort(arr3, n3);

    int arr4[] = {10, 7, 8, 9, 1, 5};
    int n4 = sizeof(arr4) / sizeof(arr4[0]);
    quick_sort_example(arr4, n4);

    int arr5[] = {12, 11, 13, 5, 6, 7};
    int n5 = sizeof(arr5) / sizeof(arr5[0]);
    merge_sort_example(arr5, n5);

    int arr6[] = {2, 3, 4, 10, 40};
    int x = 10;
    linear_search_example(arr6, 5, x);

    int arr7[] = {2, 3, 4, 10, 40};
    int y = 10;
    binary_search_example(arr7, 5, y);

    dijkstra_example();

    return 0;
}

//---------------------------------------------------------------------------
#include <stdio.h>
#include <limits.h>

// 示例9：KMP字符串匹配算法
void compute_lps_array(char *pattern, int m, int *lps)
{
    int length = 0;
    lps[0] = 0; // 第一个 lps 值总是 0
    int i = 1;
    while (i < m)
    {
        if (pattern[i] == pattern[length])
        {
            length++;
            lps[i] = length;
            i++;
        }
        else
        {
            if (length != 0)
            {
                length = lps[length - 1]; // 回退
            }
            else
            {
                lps[i] = 0;
                i++;
            }
        }
    }
}

void kmp_search(char *text, char *pattern)
{
    printf("\n示例9：KMP字符串匹配算法\n");
    int n = strlen(text);
    int m = strlen(pattern);
    int lps[m];

    compute_lps_array(pattern, m, lps);

    int i = 0, j = 0; // i 是 text 的索引，j 是 pattern 的索引
    while (i < n)
    {
        if (pattern[j] == text[i])
        {
            i++;
            j++;
        }
        if (j == m)
        {
            printf("找到模式串 %s 的匹配，位置: %d\n", pattern, i - j);
            j = lps[j - 1];
        }
        else if (i < n && pattern[j] != text[i])
        {
            if (j != 0)
            {
                j = lps[j - 1];
            }
            else
            {
                i++;
            }
        }
    }
}

void kmp_example()
{
    char text[] = "ABABDABACDABABCABAB";
    char pattern[] = "ABABCABAB";
    kmp_search(text, pattern);
}

// 示例10：Floyd-Warshall 最短路径算法
#define V 4
#define INF 99999

void floyd_warshall(int graph[V][V])
{
    printf("\n示例10：Floyd-Warshall 最短路径算法\n");
    int dist[V][V];

    for (int i = 0; i < V; i++)
        for (int j = 0; j < V; j++)
            dist[i][j] = graph[i][j];

    for (int k = 0; k < V; k++)
    {
        for (int i = 0; i < V; i++)
        {
            for (int j = 0; j < V; j++)
            {
                if (dist[i][k] + dist[k][j] < dist[i][j])
                    dist[i][j] = dist[i][k] + dist[k][j];
            }
        }
    }

    printf("最短路径矩阵:\n");
    for (int i = 0; i < V; i++)
    {
        for (int j = 0; j < V; j++)
        {
            if (dist[i][j] == INF)
                printf("%7s", "INF");
            else
                printf("%7d", dist[i][j]);
        }
        printf("\n");
    }
}

void floyd_warshall_example()
{
    int graph[V][V] = {{0, 5, INF, 10},
                       {INF, 0, 3, INF},
                       {INF, INF, 0, 1},
                       {INF, INF, INF, 0}};
    floyd_warshall(graph);
}

// 示例11：Prim最小生成树算法
int min_key(int key[], int mst_set[], int n)
{
    int min = INT_MAX, min_index;
    for (int v = 0; v < n; v++)
    {
        if (mst_set[v] == 0 && key[v] < min)
        {
            min = key[v];
            min_index = v;
        }
    }
    return min_index;
}

void print_mst(int parent[], int n, int graph[n][n])
{
    printf("\n示例11：Prim最小生成树算法\n");
    printf("边 \t权重\n");
    for (int i = 1; i < n; i++)
        printf("%d - %d \t%d \n", parent[i], i, graph[i][parent[i]]);
}

void prim_mst(int graph[5][5], int n)
{
    int parent[n], key[n], mst_set[n];
    for (int i = 0; i < n; i++)
    {
        key[i] = INT_MAX;
        mst_set[i] = 0;
    }

    key[0] = 0;
    parent[0] = -1;

    for (int count = 0; count < n - 1; count++)
    {
        int u = min_key(key, mst_set, n);
        mst_set[u] = 1;

        for (int v = 0; v < n; v++)
        {
            if (graph[u][v] && mst_set[v] == 0 && graph[u][v] < key[v])
            {
                parent[v] = u;
                key[v] = graph[u][v];
            }
        }
    }

    print_mst(parent, n, graph);
}

void prim_example()
{
    int graph[5][5] = {{0, 2, 0, 6, 0},
                       {2, 0, 3, 8, 5},
                       {0, 3, 0, 0, 7},
                       {6, 8, 0, 0, 9},
                       {0, 5, 7, 9, 0}};
    prim_mst(graph, 5);
}

// 示例12：Kruskal最小生成树算法
struct Edge
{
    int src, dest, weight;
};

struct Graph
{
    int V, E;
    struct Edge *edge;
};

struct Subset
{
    int parent;
    int rank;
};

struct Graph *create_graph(int V, int E)
{
    struct Graph *graph = (struct Graph *)malloc(sizeof(struct Graph));
    graph->V = V;
    graph->E = E;
    graph->edge = (struct Edge *)malloc(E * sizeof(struct Edge));
    return graph;
}

int find(struct Subset subsets[], int i)
{
    if (subsets[i].parent != i)
        subsets[i].parent = find(subsets, subsets[i].parent);
    return subsets[i].parent;
}

void union_subsets(struct Subset subsets[], int x, int y)
{
    int root_x = find(subsets, x);
    int root_y = find(subsets, y);

    if (subsets[root_x].rank < subsets[root_y].rank)
        subsets[root_x].parent = root_y;
    else if (subsets[root_x].rank > subsets[root_y].rank)
        subsets[root_y].parent = root_x;
    else
    {
        subsets[root_y].parent = root_x;
        subsets[root_x].rank++;
    }
}

int compare_edges(const void *a, const void *b)
{
    struct Edge *a1 = (struct Edge *)a;
    struct Edge *b1 = (struct Edge *)b;
    return a1->weight > b1->weight;
}

void kruskal_mst(struct Graph *graph)
{
    printf("\n示例12：Kruskal最小生成树算法\n");
    int V = graph->V;
    struct Edge result[V];
    int e = 0, i = 0;

    qsort(graph->edge, graph->E, sizeof(graph->edge[0]), compare_edges);

    struct Subset *subsets = (struct Subset *)malloc(V * sizeof(struct Subset));
    for (int v = 0; v < V; ++v)
    {
        subsets[v].parent = v;
        subsets[v].rank = 0;
    }

    while (e < V - 1 && i < graph->E)
    {
        struct Edge next_edge = graph->edge[i++];
        int x = find(subsets, next_edge.src);
        int y = find(subsets, next_edge.dest);

        if (x != y)
        {
            result[e++] = next_edge;
            union_subsets(subsets, x, y);
        }
    }

    printf("构建的最小生成树的边:\n");
    for (i = 0; i < e; ++i)
        printf("%d -- %d == %d\n", result[i].src, result[i].dest, result[i].weight);

    free(subsets);
}

void kruskal_example()
{
    int V = 4;
    int E = 5;
    struct Graph *graph = create_graph(V, E);

    graph->edge[0].src = 0;
    graph->edge[0].dest = 1;
    graph->edge[0].weight = 10;

    graph->edge[1].src = 0;
    graph->edge[1].dest = 2;
    graph->edge[1].weight = 6;

    graph->edge[2].src = 0;
    graph->edge[2].dest = 3;
    graph->edge[2].weight = 5;

    graph->edge[3].src = 1;
    graph->edge[3].dest = 3;
    graph->edge[3].weight = 15;

    graph->edge[4].src = 2;
    graph->edge[4].dest = 3;
    graph->edge[4].weight = 4;

    kruskal_mst(graph);
    free(graph->edge);
    free(graph);
}

int main()
{
    kmp_example();
    floyd_warshall_example();
    prim_example();
    kruskal_example();

    return 0;
}

//-------------------------------------------------------------------------------
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

// 示例13：分治法——归并排序
void merge(int arr[], int left, int mid, int right)
{
    int i, j, k;
    int n1 = mid - left + 1;
    int n2 = right - mid;

    int L[n1], R[n2];

    for (i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];

    i = 0;
    j = 0;
    k = left;
    while (i < n1 && j < n2)
    {
        if (L[i] <= R[j])
        {
            arr[k] = L[i];
            i++;
        }
        else
        {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    while (i < n1)
    {
        arr[k] = L[i];
        i++;
        k++;
    }

    while (j < n2)
    {
        arr[k] = R[j];
        j++;
        k++;
    }
}

void merge_sort(int arr[], int left, int right)
{
    if (left < right)
    {
        int mid = left + (right - left) / 2;

        merge_sort(arr, left, mid);
        merge_sort(arr, mid + 1, right);

        merge(arr, left, mid, right);
    }
}

void merge_sort_example()
{
    printf("\n示例13：分治法——归并排序\n");
    int arr[] = {12, 11, 13, 5, 6, 7};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("排序前的数组: ");
    for (int i = 0; i < n; i++)
    {
        printf("%d ", arr[i]);
    }
    printf("\n");

    merge_sort(arr, 0, n - 1);

    printf("排序后的数组: ");
    for (int i = 0; i < n; i++)
    {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

// 示例14：动态规划——最长公共子序列（LCS）
int lcs(char *X, char *Y, int m, int n)
{
    int L[m + 1][n + 1];

    for (int i = 0; i <= m; i++)
    {
        for (int j = 0; j <= n; j++)
        {
            if (i == 0 || j == 0)
            {
                L[i][j] = 0;
            }
            else if (X[i - 1] == Y[j - 1])
            {
                L[i][j] = L[i - 1][j - 1] + 1;
            }
            else
            {
                L[i][j] = fmax(L[i - 1][j], L[i][j - 1]);
            }
        }
    }
    return L[m][n];
}

void lcs_example()
{
    printf("\n示例14：动态规划——最长公共子序列（LCS）\n");
    char X[] = "AGGTAB";
    char Y[] = "GXTXAYB";

    int m = strlen(X);
    int n = strlen(Y);

    printf("字符串 X: %s\n", X);
    printf("字符串 Y: %s\n", Y);

    printf("最长公共子序列的长度是 %d\n", lcs(X, Y, m, n));
}

// 示例15：回溯法——N皇后问题
#define N 4

int is_safe(int board[N][N], int row, int col)
{
    int i, j;

    for (i = 0; i < col; i++)
        if (board[row][i])
            return 0;

    for (i = row, j = col; i >= 0 && j >= 0; i--, j--)
        if (board[i][j])
            return 0;

    for (i = row, j = col; j >= 0 && i < N; i++, j--)
        if (board[i][j])
            return 0;

    return 1;
}

int solve_nqueens_util(int board[N][N], int col)
{
    if (col >= N)
        return 1;

    for (int i = 0; i < N; i++)
    {
        if (is_safe(board, i, col))
        {
            board[i][col] = 1;

            if (solve_nqueens_util(board, col + 1))
                return 1;

            board[i][col] = 0; // 回溯
        }
    }

    return 0;
}

void print_solution(int board[N][N])
{
    for (int i = 0; i < N; i++)
    {
        for (int j = 0; j < N; j++)
        {
            printf(" %d ", board[i][j]);
        }
        printf("\n");
    }
}

void nqueens_example()
{
    printf("\n示例15：回溯法——N皇后问题\n");
    int board[N][N] = {{0, 0, 0, 0},
                       {0, 0, 0, 0},
                       {0, 0, 0, 0},
                       {0, 0, 0, 0}};

    if (!solve_nqueens_util(board, 0))
    {
        printf("解决方案不存在\n");
        return;
    }

    print_solution(board);
}

// 示例16：贪心算法——活动选择问题
void activity_selection(int start[], int finish[], int n)
{
    printf("\n示例16：贪心算法——活动选择问题\n");
    printf("选中的活动:\n");

    int i = 0;
    printf("活动 %d ", i);

    for (int j = 1; j < n; j++)
    {
        if (start[j] >= finish[i])
        {
            printf("活动 %d ", j);
            i = j;
        }
    }
    printf("\n");
}

void activity_selection_example()
{
    int start[] = {1, 3, 0, 5, 8, 5};
    int finish[] = {2, 4, 6, 7, 9, 9};
    int n = sizeof(start) / sizeof(start[0]);

    activity_selection(start, finish, n);
}

// 示例17：分治法——快速幂算法
int power(int x, unsigned int y)
{
    int result = 1;
    while (y > 0)
    {
        if (y & 1)
        {
            result = result * x;
        }
        y = y >> 1;
        x = x * x;
    }
    return result;
}

void fast_power_example()
{
    printf("\n示例17：分治法——快速幂算法\n");
    int x = 2;
    unsigned int y = 10;

    printf("%d 的 %d 次幂是 %d\n", x, y, power(x, y));
}

// 示例18：动态规划——背包问题
int max(int a, int b)
{
    return (a > b) ? a : b;
}

int knapsack(int W, int wt[], int val[], int n)
{
    int K[n + 1][W + 1];

    for (int i = 0; i <= n; i++)
    {
        for (int w = 0; w <= W; w++)
        {
            if (i == 0 || w == 0)
            {
                K[i][w] = 0;
            }
            else if (wt[i - 1] <= w)
            {
                K[i][w] = max(val[i - 1] + K[i - 1][w - wt[i - 1]], K[i - 1][w]);
            }
            else
            {
                K[i][w] = K[i - 1][w];
            }
        }
    }

    return K[n][W];
}

void knapsack_example()
{
    printf("\n示例18：动态规划——背包问题\n");
    int val[] = {60, 100, 120};
    int wt[] = {10, 20, 30};
    int W = 50;
    int n = sizeof(val) / sizeof(val[0]);

    printf("最大价值是: %d\n", knapsack(W, wt, val, n));
}

int main()
{
    merge_sort_example();
    lcs_example();
    nqueens_example();
    activity_selection_example();
    fast_power_example();
    knapsack_example();

    return 0;
}
