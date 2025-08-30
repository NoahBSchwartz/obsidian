- Trie: A tree (not binary) data structure where each node corresponds to a single ascii character. Useful for things like autocompletion. 
	- Instead of having 2 children like a BST, a Trie node can have as many children as characters in the alphabet (26)
	- The root node is always empty
	- A series of nodes is connected by pointers to form a word (a chain of characters). Some nodes have true bool value to indicate if they form a complete word
	- Implementation
		- `Index = char - 97` (this will make A = 0, B = 1...)
											![[Pasted image 20231204134025.png]]
- Big-O: Good because length of the key determines complexity, not the length of the dictionary. `insert = O(key_length), search = O(key_length)
```cpp
//Iterates through each character of `key` checks if character is already a child of the current node, and if not, creates a new node. After processing all characters, it marks the last node as the end of a word.
void insert(string key) {
    TrieNode *node = root;
    for (int i = 0; i < key.length(); i++) {
        char c = key[i];
        if (node->children.find(c) == node->children.end()) {
            node->children[c] = new TrieNode();
        }
        node = node->children[c];
    }
    node->isEndOfWord = true;
}
//Follows the characters of the key through the nodes of the trie. If it reaches the end of the key and finds that the last node is marked as the end of a word, the function returns `true'. Otherwise, it returns `false`.
bool search(string key) {
    TrieNode* node = root;
    for (int i = 0; i < key.length(); i++) {
        char c = key[i];
        if (node->children.find(c) == node->children.end()) {
            return false;
        }
        node = node->children[c];
    }
    return node != nullptr && node->isEndOfWord;
}
```

