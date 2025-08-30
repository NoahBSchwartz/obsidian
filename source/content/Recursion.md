- Recursive algorithm: a function that calls itself
	- Must have base case: allows the function to return
```cpp
void printRecursive
{
	if(n == 0)
		return; //base case 
	cout << "n = " << n << endl;
	printRecursive(n-1);
}
int main()
{
	printRecursive(3);
	return 0;
}
```
# Process
1. Establish the base case to end the algorithm
2. Break the problem into its smallest parts (ie. if you have an algorithm to sum up all numbers in array: `return arr[current] + sum(arr[current + 1])`)
3. To think through program flow: keep drilling down until base case is reached. Once it's reached, climb back up the recursive ladder