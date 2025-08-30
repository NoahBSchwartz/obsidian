 - Linked List (Chain of structs): It's like an array but you can add and insert elements at will by simply changing the pointer of the preceding element. The disadvantage is that finding `linked[1000]` requires the programmer to start at the beginning and follow the chain of pointers 1000 times.
	- Singly Linked: All structs in the chain only point to the struct directly in front of them (makes traversing slower)
	- Doubly Linked: All structs in the chain point to the struct in front and behind them (quicker traversal, but uses more memory)
```cpp
struct Node {
	int key;
	Node * next; //notice that the Node struct contains a pointer to itself
}
int main(){
	int arr[] = {5, 12, 14, 17};
	int N = 4;
	//Initialize linked list with the first value of the array
	Node *head, *temp, *prev;
	head = new Node;
	head-›key = arr [0]; 
	head-›next = nullptr;
	prev = head; //'prev' will keep track of the last node in the list
	for (int i = 1; i‹N; i++)
	{
		temp = new Node;
		temp-›key = arr[i];
		temp-›next = nullptr;
		prev-›next = temp; //Point previous node to the new node (singly linked)
		prev = temp; //Move the 'prev' pointer to the new node
	}
	return 0;
}
```
- Traversing, Inserting, and Deleting in Linked Lists: Start with first node, move through list until key is found
```cpp
//Traversal
Node * craweler = head; //assume head is predefined pointer 
while (crawler != nullptr && crawler.key != searchKey)
{
	crawler = crawler.next;
}
return crawler;

//Insertion
int previous = 5
Node * inserter = head; //assume head is predefined pointer 
if (!inserter) {
	inserter = new Node(data);
	return;
}
else {
	while (inserter->next && inserter->data != previous) {
		inserter = inserter->next;
	}
	if (temp) { //always check you're not accessing nullptr 
		newNode->next = inserter->next; 
		inserter->next = newNode; 
	} 
	else { 
		cout << previous << " not found in the list"; 
	}
}

//Deletion
Node *crawler = head;
Node *nodeToDelete;
while (crawler->next != nodeToDelete)
{
	crawler = crawler->next;
}
crawler->next = crawler->next->next;
delete nodeToDelete;
head = nullptr;
```
