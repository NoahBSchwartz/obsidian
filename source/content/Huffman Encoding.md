If you zip a file and then unzip the file, how do you know it's the exact same file that it was before (ensure lossless compression)? Pick the elements of least frequency that appear in the file and use those for our algorithm
### Background
1. Fixed Length Encoding: store all pieces of information in smaller bit-length strings
		ie. normally a char might be stored as 8 bits, but if there are only a few characters in a file we can cut this down to 3
	- Cons: with a ton of characters this approach will break, the best-case would be to change the length of bits
2. Variable Length Encoding (Greedy Approach): give the most frequent piece of information the shortest bit-length encoding
### Huffman Encoding
How do we encode characters with variable length encoding without having repetitions? 
- Huffman Encoding 
	- Prefix Tree: the encoding of a character is not the prefix of the encoding of any other character (ex. A = 0, then E can't be 00)
		1. Go through the text to find the frequency of each unique character, sort in ascending order
		2. Pick 2 least frequent characters, merge the 2 characters into a tree, the sum of their frequencies is the frequency of the merged tree (lower frequency on left, higher frequency on right)
		3. Push the merged tree back into the list. Repeat the process until you have a single merged tree in your list
		Note: In practice, this is made of a priority queue with elements `[char, freq]` (priority queue is why it's a [[Greedy Algorithm]])
		Note: Always do lower frequency on left, higher frequency on right, even when merging subtrees
	- Encoding (works because our characters are only ever leaf nodes)
		1. Start from root
		2. Give left subtree an encoding of 0, Give right subtree an encoding of 1
		3. Stop when leaf is reached 
		Ie. A = 001
		Note: if the characters are nodes other than leaf nodes, we get a prefix code instead 
- Compression Ration = ((FL - VL) / FL) * 100 
	- Fixed Length (FL): how many total bits you need in fixed length encoding (total number of characters * number of bits needed per character)
	- Variable Length (VL): total number of bits used in variable encoding (just add them all up)