- An ordered tree with parent/child ordering. Unlike BST, only organized by parent child relationship. This means it auto-balances (Big O for sorting is `O(nlogn)` which is best possible)
	- Height difference between branches never be greater than 1 (bottom layer can be incomplete with nodes starting from left)
		- So: `leftChild(index) = 2*index + 1, rightChild(index) = 2*index + 2
		- So: `parent(index) = floor((index - 1) / 2)`
	- Min Heap: root stores the smallest value
	- Max Heap: root stores the largest value
												![[Pasted image 20231113134715.png]]
- Implementation: restricted data type
	- Insert by appending, retrieve by popping, view by peeking, store in an array 
```cpp
private:
    vector<int> heap;
    int parent(int i) { return (i - 1) / 2; }
    int leftChild(int i) { return (2 * i + 1); }
    int rightChild(int i) { return (2 * i + 2); }
    void heapifyDown(int i) {  //Heapify the tree
        int left = leftChild(i);
        int right = rightChild(i);
        int smallest = i;
        if (left < heap.size() && heap[left] < heap[i])
            smallest = left;
        if (right < heap.size() && heap[right] < heap[smallest])
            smallest = right;
        if (smallest != i) {
            swap(heap[i], heap[smallest]);
            heapifyDown(smallest);
        }
    }
    void heapifyUp(int i) { //Function to insert a new node to the heap
        if (i && heap[parent(i)] > heap[i]) {
            swap(heap[i], heap[parent(i)]);
            heapifyUp(parent(i));
        }
    }
public:
    void push(int key) { //Insert a new element
        heap.push_back(key); 
        int index = heap.size() - 1;
        heapifyUp(index);
    }
    void pop() { //Delete the minimum element from the heap
        if (heap.size() == 0)
            return;
        heap[0] = heap.back();
        heap.pop_back();
        heapifyDown(0);
    }
```
