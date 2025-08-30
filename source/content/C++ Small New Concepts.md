- File Input:
```cpp
# include <fstream>
ifstream inStream;
inStream.open("test.txt"); 
int x; 
string y;
string z[10];
while(inStream >> x); //for ints, assumes white space delimiter, writes to x
while(getline(inStream, y)); //for strings, assumes data on newline, writes to y
getline(inStream, z[i], ','); //for strings, custom delimiter, writes to z[i]
```
- When code is run from command line, arguments can be passed in: `./a.out firstArg secondArg thirdArg`
```cpp
int main(int argc, char* argv[]) //argc is # of arguments, argv is array of arguments
{
cout << "Executable name: " << argv[0] << endl; //first arg is ./a.out
cout << "First argument: " << argv[1] << endl; 
}
```
- Switch statement: alternative to cascading if/else if statements (used for things like UI's because there are a discrete set of options)
```cpp
int choice; 
cout << "Enter a 1, 3, or 5: " << endl; 
cin >> choice; 
switch (choice){ 
	case 1: 
		cout << "It's a one" << endl; //prints out if choice = 1
	case 5: cout << "It's a 5" << endl; 
		break; 
	default: //prints out if neither a 1 or a 5
		cout << "Follow directions" << endl; 
		break; 
	}
return 0;
```
- Do While: exactly like while but loops before it checks whether to keep going
```cpp
count = 0;
do { // Loops first
	cout << "Hi ";
	count++; 
   } while (count < 3); // Then checks loop condition (notice the end semicolon)
```
- Structs define a lot of different variables together in a single group. Like class but only defining variables, not taking any actions. It's always *public*, can be used everywhere in code.
	- Most useful for arrays of structs because combo of homogenous and non-homogenous data types(ie. a list of people, each with ages, heights, names, and male/female)
```cpp
struct Chair  
{  
string color;  
int numLegs;  //define all variables 
bool itSpins;  
};
Chair myFaveChair; //instantiate a chair group
myFaveChair.color = "black"; //use '.' to access each variable
myFaveChair.numLegs = 3;
myFaveChair.itSpins = true; 
Chair wooden {"brown", 4, false}; //here's a shorter method for instantiation
```
- Vector Class: works generically on any type (ints, strings, custom...) 
```cpp
//Initalization
vector<int> v0;
vector<int> v2(5); //initialize vector with 5 elements 
vector<int> v2(5, 3); //vector with 5 elements, all equaling 3
struct Student {
    string name;
    int age;
};
vector<Student> students; //initialized with 0 elements 
Student tempStudent;
students[0] = tempStudent; //illegal
students.push_back(tempStudent); //legal

//Actions
if(v0.empty())
for (int i = 0; i < v2.size(); i++)
	v2[i] = i * 2;
v2[6] = 7; //vector not long enough, raises segmentation fault
v2.push_back(7); //correct way to add values

vector<int*> vecPtrs(5); //Vector of Pointers 
int *p0 = new int[3];
p0[0] = 2;
p0[1] = 7;
cout << vecPtrs[0]; //prints 0x001
cout << *vecPtrs[0]; //prints 2
```
