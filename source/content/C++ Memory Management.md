# Variables
- char -> 1 byte
- bool -> 1 byte
- short int -> 2 bytes (-32,768 to 32,767)
- int  -> 4 bytes ( -2,147,483,648 to +2,147,483,647)
- float -> 4 bytes  (7 decimal digits of precision)
- long int -> 8 bytes
- double  -> 8 bytes  (15 decimal digits of precision)
- long double -> 10 bytes (19 digits of precision)
# Commands
- endl -> uses more memory than saving all program output and printing to terminal in one block
- sizeof -> returns memory used by a variable
# Memory Safety
- Memory is subdivided into 2 areas:
	1. Compile-Time Memory Allocation:
	- The Stack (Static Memory): stores all local variables. **At compilation**, it automatically sets up frames for each function and pushes the variables to the frames. During runtime, once a function is run, it's frame is emptied (the memory is deallocated)
		- Automatic Variables: the local variables which the compiler deallocates for you 
		- Arrays: on the stack, arrays are not allowed to change size during runtime
	```cpp
int main()
{
	int x[] = returnArray(); //bad idea
}
int * returnArray()
{
	int x[] = {7, 10, 21, 4, 5, 6}; //tries to return a pointer to the array.   However as soon as the function is run, the memory space containing int x[] is deallocated making the pointer useless 
	return x;
}
```
	2. Run-Time Memory Allocation: 
	- The Heap (Dynamic Memory): At **run-time**, we can create an empty pointer variable in the stack. Then, we call `new` to set the pointer variable in the stack to an address of a variable in the heap. The heap is like rented storage, it must be deallocated explicitly by the programmer with `delete`
		- Nameless Variables: the slots created in the heap
```cpp
int *p1; //create an empty pointer stored in the stack
p1 = new int; //set it to the address of a slot in the heap (the slot can store 4 bytes in the case of an int)
*p1 = 6; //insert '6' into the heap
int x = *p1; //dereference the pointer to read '6' from the heap
delete p1; //deallocate the memory slot when you're done using it 

int *ptr; //this can be done with arrays too
ptr = new int[5]; 
delete [] ptr; //make sure to specify that it's an array when deallocating 

int **pp = new int*; // 'pp' is a pointer to a pointer (on the heap) to an int
*pp = new int; // Now, 'pp' is pointing to a memory location (on the heap) that holds the address of an int (also on the heap)
**pp = -3; // Dereferences 'pp' twice to access the int that '*pp' points to
delete *pp; // Free the memory allocated for the int on the heap
delete pp; // Free the memory allocated for the pointer to the int on the heap

int *myArray = new int[5]; // Create an array in the heap with 5 elements
int *tempArray = new int[10]; // Create a temp array in the heap with 10 elements
myArray = tempArray; //Copy the address of the tempArray pointer to myArray
delete [] myArray; //Delete the old array data
cout << myArray[0]; //We've now effectively doubled myArray
```
- The Destructor: gets called when the function finishes execution. If not defined, the compiler will generate a default destructor. When dealing with dynamic memory, programmer needs to define their own destructor to free memory used
	- Ex. For linked lists, set the destructor = to the head of the list and move the destructor along the list, deleting each element
```cpp
class SLL{
	private:
		int x = 0;
	public:
		SLL();
		~SLL(); //destructor
}
```

