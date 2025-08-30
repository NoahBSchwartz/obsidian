Popular way to implement dictionary ADT (Abstract Data Type). Randomized data type which decouples the data or order of data from the performance
- Table that holds a key and its index. O(1) search time (no traversal needed), does not depend on key size
	- The hash function generates a unique code which corresponds to a valid array index (must be repeatable) for every key	![[Screenshot 2024-11-14 at 9.44.53 AM.png]]
- Clustering: some table sizes can result in bad clustering (when keys are concentrated in a small range of indices)
- Dynamic Hash Table Doubling (List Doubling): Specify a threshold, when n > threshold double the size of table
	- This helps keep runtime complexity and size complexity low
		Amortized (Average) Analysis: Doubles each time: $1 + 2 + 4 + 8 + 16 + ... + 2^k$ so for n items, $2^k = n$ aka $k = logn$ 
		Complexity = $\Theta(2n-1)$
- Collision Resolution (Open Addressing): when 2 keys put through a hash function generate the same index
	- Linear Probing: If a collision occurs, simply insert one of the keys at the next ![[Screenshot 2024-11-14 at 9.47.15 AM.png]]available index
		- Prone to clustering if collisions happen a lot
	- Quadratic Probing:  If a collision occurs, insert one of the keys at the next available index (0^2). When the next collision occurs, insert key at next index + 1 (1^2). Then insert at next index + 4 (2^2)...
	- Double Hashing:  If a collision occurs, insert one of the keys at index hash * hash 2. Requires to functions to be kept in code
	- Linked List: If a collision occurs, insert the key into the linked list stored at index
```cpp
struct node { //Imlementing Linked-List Collision Resolution
    int key;
    struct node* next;
};
class HashTable {
private:
    int tablesize; 
    node* *table;
    node* createNode(int key, node* next);
    int hashFunction(int key);
public:
    HashTable(int bsize);
    bool insertItem(int key);
    node* searchItem(int key);
};
```
- Search: When retrieving, undo the collision resolution algorithm
```cpp
//Undo Linked-List collision resolution algorithm
node* HashTable::searchItem(int key){
    int index = hashFunction(key);
    node* head = table[index];
    while(head != NULL){
        if(head->key == key)
            return head;
        head = head->next;
    }
    return NULL;
}
```
- Bloom Filters: use multiple hashes to set bits of information in an array (ie. hash1("H"), hash2("E"), hash3("Y")). Useful for very fast retrieval, some false positives but never false negatives (good for checking if a username exists)
# Universal/Uniform Hashing 
Universal Hashing is important because it gives performance guarantees 
- Division Hash Function: index = Key mod L. Useful for integer keys. Use modulo to ensure indexes never overflow table size
	- For strings: convert string to ascii
	- To choose table size:  `range = maxKey - minKey`, Pick prime number near range (to avoid clustering)
```cpp
int hashDivision(int key, int tableSize)
	return key%tableSize;

int hashDivision(string key, int tableSize) {
	sum = 0;
	for (i = 0; i < key.size()-1; i++)
		sum = sum + key[i];
	return sum%tableSize; }
```
- Multiplicative Hash Function: L * (K * A mod 1)
```cpp
int multiplicativeHash(string key, int tableSize) {
	float decimal = key * 13/32; //multiply by any fraction
	f = fract(decimal); //make decimal into valid index
	return f * tableSize;
}
```
# Run-time Complexity
- Dictionary Operator (Abstract away the underlying data type): Built with Linked List `A` or Self-Balanced Binary Search Tree `A`
	1. Add/Insert(A, x, v) `A[h(x)] = v` (Linked List = O(1), BST = O(logn))
	2. Remove/Delete(A, x)`return A[h(x)]`(need to find item before deleting) (Linked List = O(n), BST = O(logn))
	3. Find/Search(A, x) `A[h(x)] = NULL` (Linked List = O(n), BST = O(logn))
- Perfect Hashing (aka Direct-Address Hashing): if the number of table location is small and you can store different items at different locations 
	- Has found-time complexity of O(1+1) but not space-efficient
- Chained Hashing (practical hashing): can store multiple items in the same table location (use linked list for each table slot). Helps limit number of locations in table
	- Has add-time complexity of O(1) but found-time complexity of `O(A[h(x)].length)` and delete of `O(A[h(x)].length)`
- Uniform Hashing Assumption: any key is equally likely to hash to any of L slots `P(h(x) = i) = 1/L for all x`
	- For n items and L locations: Worst Case: O(n), Best Case: O(1+n/L) (occurs when keys are evenly distributed in hash table)
		Note: a = n/L is called the load factor
		- Useful because you can look at the average performance (ie. insert is O(1 + 1), remove is based on load factor O(1+a), find is based on load factor O(1+a). But it's difficult to design a hash function to satisfy this assumption because we don't know input, has function must be deterministic
		- Dynamic Aspects: how the locations are populated (there's a tradeoff between space and time efficiency for hash tables)
			1. Space Efficiency of Uniform Hashing: see when every location will be taken 
			2. Time Efficiency: determined by collisions (how many keys you can store before seeing first collision)

Ex. Birthday Paradox: L = days in the year, n = number of people, collision if 2 people born on same day. Given 2 people, what's the probability that 2 people have same birthday?
	1. Uniform hashing says P(collision) = 1/L
	2. Average number of collisions for 1 case E(collision) = `1*1/L + 0*(L-1)/L`
	3. Average number of collisions for all cases ![[Screenshot 2024-11-12 at 3.50.06 PM.png]]
	4. Set average number of collisions to >= 1. Find n = 28. You only need 28 people to have overlapping birthday!![[Screenshot 2024-11-12 at 3.53.05 PM.png]]
Ex. Coupon Collection Problem: L = number of distinct coupons, n = number of coupons collected, $n_i$ = number of coupons collected to have ith new distinct coupons (ie. $n_2$ could be 1 or 2). How many coupons do you have to collect to get the first collision?
	 1. Once you have i distinct coupons the probability of getting i+1 distinct coupons next time is P(i+1th distinct coupons) = (L-i)/L
	 2. $E(n_{i+1})$ = 1/P(i+1th distinct coupons) = L/(L-i)
	 3. Geometric Distribution: ![[Screenshot 2024-11-12 at 4.02.15 PM.png]]
	 4. Need to collect n = L log L coupons