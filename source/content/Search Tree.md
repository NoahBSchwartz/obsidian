# Search Tree Definitions

- Tree: Arrays and linked lists traverse from left to right (these are linear data structures) while trees traverse up to down or down to up (hierarchical data structure). This allows searching to be much more efficient
- Search Tree: Can't have cycles unlike linked lists
	- Top Node is Root -> Parents -> Children
		- Child can only have a single parent, parent can have many children
- Binary Tree: every parent can have between 0 (null value) and 2 children
- Binary Search Tree: nodes on the left have key values less than parent, nodes on the right have key values greater than or equal to parent. 
	- height = # of levels, N = # of nodes, `O(logN)` comparisons per search
	- `N = 2^h - 1` (because there's one root node and then 2 nodes per parent)
	- Therefore: `h = log2​(n+1)−1`
# Search Tree Actions

- Traversal: for a binary tree with 3 nodes (root, left right), the possibilities are:
	1. Pre-order (root, left, right -> useful for creating copies of tree)
	2. In-order (left, root, right -> useful for sorting)
	3. Post-order (left, right, root -> useful for destructing tree)
```cpp
void preorder(Node* root) { 
if (root == nullptr) 
	return;
std::cout << root->data << " "; 
inorder(root->left);
inorder(root->right); 
}
void inorder(Node* root) { 
if (root == nullptr) 
	return;
inorder(root->left);
std::cout << root->data << " "; 
inorder(root->right); 
}
void postorder(Node* root) { 
if (root == nullptr) 
	return;
postorder(root->left);
postorder(root->right); 
std::cout << root->data << " "; 
}
```
- Application: for trees of any size, these algorithms apply recursively 
		- Ex. Root, left (left becomes root), left child, right child, right (right become root), left child, right child
```cpp
struct Node{
	int key;
	Node *left;
	Node *right;
}

//insertion
void insert(int data) { //kicks off recursion establishes variables 
	root = insertHelper(root, data); }
Node * insertHelper(Node* currNode, int data) {//recursive function
	if(currNode == nullptr) //Base case
		return createNode(data); 
	else if(currNode->key <= data) //Case 1
		currNode->right = insertHelper(currNode->right, data);
	else if(currNode->key > data) //Case 2
		currNode->left = insertHelper(currNode->left, data);
	return currNode; 
}

//searching
bool search(int key) { //kicks off recursion establishes variables 
    return searchHelper(root, key); }
bool searchHelper(Node* currNode, int key) {
    if (currNode == nullptr) // Base cases
        return false; // Key not found
    else if (currNode->key == key) {
        return true; // Key is found
    }
    if (currNode->key < key) { //Case 1
        return searchHelper(currNode->right, key);
    }
    return searchHelper(currNode->left, key); //Case 2
}
```
- Deletion: There are 3 possibilities
	1. Node has no children: 
		- Go from root node, go to child node, go to child node... until node to delete is found, Set it to nullptr
		- Because it's recursive, each preceding branch (deleted -> child, child -> child, child -> parent) is climbed back up before ending back at root
	2. Node has right or left child:
		- Go from root node, go to child node, go to child node... until node to delete is found, Set it to nullptr
		- Point the parent node (of delete node) to the child node (of delete node)
		- Each preceding branch  is climbed back up before ending back at root
	3. Node has 2 children:
		-  Go from root node, go to child node, go to child node... until node to delete is found
		- Find minimum of its right subtree 
		- a. (delete by just copying data over)
			- Set the deleted node's key value to the value of the minimum
			- Delete the minimum node (won't have children because it's the min)
			- Each preceding branch  is climbed back up before ending back at root
		- b. (delete by actually swapping nodes)
			- Set the minimum node's parent to point to the node's child (or nullptr if there's no child) 
			- Set the deleted node's parent to point to the minimum node
			- Set the minimum node to point to the deleted node's children
	![[Pasted image 20231020140838.png]]
```cpp
void deleteValue(int value){ 
	root = deleteNode(root, value); }
Node* deleteNode(Node* node, int value) {
	if (!node)
		return nullptr;
	if (value < node->value) {
		node->left = deleteNode(node->left, value);
	} 
	else if (value > node->value) {
		node->right = deleteNode(node->right, value);
	} 
	else {
		// Case 1: No children
		if (!node->left && !node->right) {
			delete node;
			return nullptr;
		}
		// Case 2: One child
		else if (!node->left) {
			Node* temp = node->right;
			delete node;
			return temp;
		} 
		else if (!node->right) {
			Node* temp = node->left;
			delete node;
			return temp;
		}
		// Case 3: Two children
		else {
			Node* minNode = getMin(node->right);
			node->value = minNode->value;
			node->left = deleteNode(node->left, minNode->value);
		}
	}
	return node;
}

//delete entire sub-tree (using post-order algorithm)
void destroySubTree(Node *currNode)
{
	if (currNode != nullptr) {
		destroySubTree(currNode->left);
		destroySubTree(currNode->right);
		delete currNode;
	}
}
```
# Self Balancing: 
- Leverages parent pointers for better balancing
	- Amortization: occasionally rebalance the tree after enough data has been added
	- Randomization: if the data is already randomly distributed
	- Dynamic Self Balancing: every time a node is added, the tree will check whether it is complete (no branch of a tree can be more than twice as long as a current branch) and rebalance if not
```cpp
struct Node{
	int key;
	Node *left;
	Node *right;
	Node *parent;
}
//Insertion: exact same as normal insertion but create parent pointers when traversing downwards
...
	else if(currNode->key <= data){ //Case 1
		currNode->right = insertHelper(currNode->right, data);
		currNode->left->parent = currNode;
	}
	else if(currNode->key > data){ //Case 2
		currNode->left = insertHelper(currNode->left, data);
		currNode->left->parent = currNode;
	}
	return currNode;
...
```
# Red Black Tree
- Each node is either red or black. Each color has a set of rules that the nodes must follow. If any rule gets violated, the tree must be repaired
- Rules
		1. Root node is black
		2. If a node is red, both of its children must be black 
		3. For every node in the tree, all paths to a descendant leaf node must pass through the same number of black nodes
								![[Screenshot 2023-10-18 at 2.06.28 PM 1.png]]
- Left/ Right Rotation: The mechanism to fix the red black tree. First rotate, then recolor the nodes accordingly
							![[Pasted image 20231018141002.png]]
- Insertion: algorithm not implemented in this class
	- Uncle Nodes: the uncle of node x is the sibling of its parents 
													 ![[Screenshot 2023-10-20 at 1.41.02 PM.png]]
[[Trie (Dictionary)]]
	