- Casting with C++
```cpp
double x;
string y = "5";
string b("hello"); //you can also define strings like you would a class
int z;
x = 1 / 2; //x = 0 because both 1 and 2 are ints (so they'll be truncated)
x = 1.0 / 2; //x = 0.5 because one value is a double
x = 1 / 2 / 2.0; //x = 0 because int 1 / int 2 = 0 -> 0 / 2.0 = 0
x = double(1 / 2); //x = 0.0 because double(1 / 2 = 0) -> double(0) = 0.0
x = int(x) //x is still a double because c++ is statically typed
x = double(1) / 2 //x = 0.5 because one value is a double
x = static_cast<double>(1) / 2; //x = 0.5, different syntax but same result
x = stod(y); //x = 5.0. May use stof = float, stol = long, stold = long double...
z = stoi(y); //z = 5
y = to_string(x); //y = "5.0"
char q = (char)51; //q = 'a', char transforms int to ASCII
```
- Strings aren't variables, they're a class so you must import them
```cpp
#include <string> //include commands don't end with semicolons
string myWord = "hello"; //instantiate string as an object of the string class
endWord = myWord + " man"; // the class supports normal string operations
string test = 'nope'; //can't use single quotes for strings
char h = 'h'; //must use single quotes for chars
char h = myWord[0];
char* argv[] //left over from the C era, it's the way strings used to be stored
```
- Special math symbols
```cpp
volume = 4/3*M_PI*pow(radius,3); //M_PI = pi, use pow to compute radius^3 not '^'
```
- Local versus global information 
```cpp
int my_function(int my_array);
int my_array[] = {1, 2, 3};
my_function(my_array);
int my_function(int my_array)
{
	int num  = 0; //can only use num within the function 
 	sizeof(my_array); //sizeof just returns the amount of memory the pointer to      the variable takes up, not the actual variable when passed to a function 
}
```
- Arrays can't be extended or reassigned after initialization
```cpp
int myArray[4];
int tempArray[] = {1, 2, 3};;
myArray = {2, 0, 1, 8}; //can't assign array like this after initialization 
myArray[0] = 2; //assign values this way instead
myArray[7] = 0; //can't change array size after compilation
```
- Dynamic Allocation
```cpp
int *ptr;
ptr = new int[5]; //store the address of an array in the heap
delete [] ptr; //when deallocating, you must specify that it's an array
void ageStudent(Student** arr) //** means pointer to an array

struct Student{
	string name;
	int age;
}
int main(){
	Student *s0;
	s0 = new Student; //put a struct on heap
	(*s0).name = "Pit"; //resets name
	s0->name = "Dan"; //another way of resetting name
	delete s0;
}
```
- Pointers
```cpp
int  * a, b;  // Invalid 
int * a, * b; // Use this instead
int* ptr = nullptr; // Create a null pointer
std::cout << *ptr << '\n'; // Dereferencing a null pointer crashes the program

int val = 0;  
int *ptr;
ptr = &val; //Assigns the pointer to a local variable
val++;  
delete ptr; //Deleting pointer crashes code because you can't delete a local variable 
```
- Linked List
```cpp
Node *temp = head;
Node *prev = nullptr;
if (temp != nullptr) //always check you're not accessing nullptr
{
	while (temp->next != nullptr) {
		prev = temp;
		temp = temp->next;
		delete prev; 
	}
	delete temp;
	head = nullptr; //always reassign head to nullptr when list is deleted
```
