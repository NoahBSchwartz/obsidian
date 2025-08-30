# Concepts
- A variable that stores a memory address and specifies what data type is stored at that address
```cpp
int * p1; //* is used in declaration (a is not an int, it's an int pointer) 
double * p2; //this pointer can only store double addresses (it's empty rn)
char * p3;

int x;
p1 = &x; // Use the address-of operator '&' to get address of variable. P is now pointing to x in memory (ie. p = 0x1110)
char c;  
p3 = &c;
double y = 23.0; 
p2 = &y  
cout << p2 << endl; //prints 0x0100 (hexadecimal value of where y is stored)
cout << &p2 << endl; //prints 0x0102 (hexadecimal value where p2 is stored)
```
- Dereferencing a pointer: when a pointer is used to access the value of its parent variable
```cpp
*p2 = 7.0; //Dereferencing: the pointer overrides y = 23.0 and makes it 7.0
double z;
z = *p2; //Dereferencing: the pointer sets z = 7.0
z = *p2 * *p1 //multiply p2 and p1 together
p1 = p2 //both pointers have same info (ie. p1 = 0x0100, p2 = 0x0100)
```
- Pointer arithmetic: arrays are stored as a list of integers so adding 1 to the memory will get the next integer in line
```cpp
//pointer arithmetic
int arr[] = {5,7}
int * p = nullptr; //initialize empty pointer
p = arr;
cout << p[0] << "," << p[1]; //prints 5,7
cout << *p << endl; //prints 5
cout << *(p+1) << endl; //prints 7 (arr[1]) because it adds one to the memory slot
```

# Uses
- Pass-by-value: in the past, we had just this option to pass only the data of a variable to a function
- Pass-by-reference: passes the location in memory of the data (between pass-by-value and pass-by-reference)
```cpp
//new feature, pass by reference (never uses pointers but accomplishes the same thing)
int main(){
	int a = 2;  
	myPBV(a); //changes a to -7
}
void myPBV(int &x){ //'x' is an int type because it's an alias to 'a'
	x =-7; //x is referring to a, and can change a
}
```
- Pass-by-pointer: passes the variable which stores the location in memory of the data
```cpp
void change(int * x); //function definition
int main() {  
	int y = 8; 
	change(&y); //normally, passing a value to a void function can't change value
	cout << y; //however, y can now be changed to 0
	return 0;  
}  
void change(int * x){  
	*x = 0; //the pointer uses the address it recieves to changes y
}
```
- Pass-by-array: unlike other functions, passing arrays to void functions changes them without needing pointers. This is because arrays are simply a list of pointers under the hood
```cpp
cout << &p << "," << &arr << endl; // prints: 1000,1000 (proves array is pointer)
cout << &(p + 1) << "," << &(arr + 1); //prints 1004,1004 (arrays have 4 bytes per slot so moving to the second will start at 1004)
int main(){
	int arr[] = {5,7};
	myPBA(arr); //changes array to {-7,7}
	myPBA(int * arr) // changes array to {-7,7} (same result)
}
void myPBA(int arr_local[]) //interchangable with void myPBA(int * arr_local[])
{
	arr_local[0] = -7
}
```
# Complex Examples 
```cpp
struct Student {
	string name;
	int age;
	Student * next; //notice that the student struct contains a pointer to itself
}
int main()
{
	Student bob {"Bob", 20};
	Student* ptrToBob = &bob; //creates a pointer to a struct
	cout << bob.name << "," << ptrToBob->name << endl; //prints bob,bob
	Student* arr[3]; //builds a pointer to an array of students
	Student mary {"Mary", 15};
	arr[0] = &bob;
	arr[1] = &mary;
	ageStudent(arr); //pass the arr

	Student * s0, * s1; 
	s0 = new Student;  
	s1 = new Student;
	s0->next = s1; 
	s1->next = nullptr;
}
void ageStudent(Student** arr) //** means pointer to an array
{   //the pointer must be unwrapped twice to access elements
	Student * array1 = *(arr); 
	Student * array2 = array1;
	(*array2).age += 100;
	array2->name = "Bib";
	(*(array2 + 1)).age += 100;
}
```