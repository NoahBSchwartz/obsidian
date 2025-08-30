- Abstract Data Type: A collection of member data and the allowed operations on that data
	- Abstract, because the user (i.e. the programmer using the class), only has info about the inputs, the outputs, and the explanation of the actions. 
	- Ex. A linked list setter and getter wrapped in a class that the programmer uses like an api (all of the below are Abstract Data Types)
- Algorithm Complexity: To choose which algorithm to use in a situation:
	- Time: Sometimes, you can simply time the code but this often varies
	- Big-O: Look at how an algorithm scales with N (number of iterations)
		- Array: insert/search array, time scales linearly with number of terms O(N). For array access, time won't scale at all O(1)
		- Linked List: insert time O(1). Search/access scales linearly O(N)
# Storage
#### Unlimited Access
- Array of structs: combination of homogenous and non-homogenous data types(ie. a list of people, each with ages, heights, names, and male/female)
- [[Linked List]] (Array of Structs): It's like an array but you can add and insert elements at will by simply changing the pointer of the preceding element.
- Graph Data Structure: A bunch of elements in a set, each containing pointers to other elements
	- Useful for things like google maps and street names and linked datasets
	- Easy to search using traversal algorithms      
- [[Graphs]]: a data structure that can traverse up to down or down to up
- [[Hash Table]]: Table that holds a key and its index. O(1) search time (no traversal needed)
#### Limited Access 
- Stack Data Structure: Can only add to the top (push), can only remove from the top (pop), has a hard limit on max size (depending on implementation). Very efficient when implemented with linked list
	- Useful for: Call stacks, adding undo functionality to an app (all past actions are stored on the top of stack)
		- private: top element, max size, current # of elements
		- public: initialize, bool isFull, bool isEmpty, peek (prints value of top of stack), push (insert), pop (remove), disp (display stack data)
	- Process: Allocate new node, make new node point to old top node, set top pointer to new node
```cpp
#include<iostream>
class Stack {
private:
    static const int MAX_SIZE = 100;
    int arr[MAX_SIZE];
    int top;
public:
    Stack() {
        top = -1;
    }
    bool isEmpty() {
        return (top == -1);
    }
    bool isFull() {
        return (top == MAX_SIZE - 1);
    }
    void push(int x) {
        arr[++top] = x;
    }
    int pop() {
        return arr[top--];
    }
    int peek() {
        return arr[top];
    }
};
```
- Queue Data Structure: Stores elements in a First-In-First-Out (FIFO) manner. Like a real-life queue where people line up for a service—the person who arrives first is served first.
	- Standard Queue:
		- Enqueue: Add item to back of the queue
		- Dequeue: Remove and return the item from the front of the queue
		- Front/Peek: Looks at the item at the front of the queue
		- Head: points to the first element added to queue
		- Tail: points to the last element added to the queue
	- Circular Array Queue: when the tail and head are both free to move
```cpp
void circular_enque(string newItem){
	if (!isFull()){
		 a[tail] = newItem;
		 queSize++;
		 if (tail == MAX_SIZE - 1) //if queue fills up
			 tail = 0; //wrap tail back to the 0th element
		 else
			 tail++;
	}
}
string circular_deque(){
	string output;
	if (!isEmpty()){
		output = a[head];
		queSize--;
		if (head == MAX_SIZE - 1) //if the head gets to end of queue
			head = 0; //wrap head back to the 0th element
		else
			head++;
	}
}
```
# Sorting 
- Bubble Sort Algorithm: super inefficient but super easy to code
	1. Traverse from left to right and compare adjacent elements 
	2. The higher one is placed at the right side 
	3. The largest element is moved to the rightmost end at first 
	4. Repeat to find the second largest and place it and so on until the data is sorted
```cpp
for(int i = 0; i < length; i++)
{
	for(int x = 0; x < length; x++)
	{
		if (arr[x] > arr[x + 1])
		{
			swap(arr[j], arr[j + 1]);
		}
	}
}
```