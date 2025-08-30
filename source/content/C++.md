# Details
- **Object Oriented Language**: Unlike languages like C, it supports Object-Oriented Programming (OOP).
- **Implicit Memory Management**: You don't have to explicitly manage memory, although you can if you want to.
- **Compiled Language**: You can't run the code directly; you have to compile it into Assembly language first and then execute it.
- **Function Prototypes**: Extra file with .hpp or .h extension contains function prototypes to tell the C++ compiler is a function call is valid. It specifies each function's name, parameters, and return type. 
```cpp
int my_function(double x);
double my_function2(string a, double b);
```
- **Statically Typed Language:** variables are defined at compile time and can't change type during execution 
# IED
#### - Locally Created File 
- Right click on filename -> save -> open in integrated terminal
- Compile file: `g++ -std=c++17 helloWorld.cpp -o test_out` 
	- `g++` is name of compiler
	- `-std=c++17` flag says using v17
	- `-o test_out` outputs any file to test_out
- Run file: `./a.out`
#### - Github File Process
- `git clone https://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@github.com/cu-csci-2275-fall-2023/assignment-1-NoahBSchwartz`
- `cd build; cmake ..; make; ./run_tests`
- Modify functions.cpp in code_1, main.cpp in app_1
- Repeat until complete: `make; ./run_tests_1; make; ./run_tests_1; make;` 
- `git status; git add app_1/main_1.cpp; git add code_1/functions.cpp;  git commit -m “2nd commit”; git push
- paste the directory link into ingenious
#### -Multiple Files
- In C++, it's typical to organize code into multiple files. Header file (.hpp) just contains function declarations, Definitions file (.cpp) contains all functions other than main, Driver file (.cpp) only contains main
	1. Include .hpp file at top of both Driver and Definitions file
	```cpp
#include "headerFile.hpp"
```
	2. Then compile both .cpp files: `g++ -std=c++17 driver.cpp definitions.cpp -o test_out`
	3. 3 Files is the minimum for multi-file compilation
# Syntax
#### - General
- always include semicolons
- always include "return 0"  for main method
- always use: `#include <iostream>;` `#include <string>;` `using namespace std;` 
#### - Basic
```cpp
#include <iostream> //Import library for input/output
using namespace std; //Allows code to use standard libraries without specifying namespace (std::cout << "Hello World" << std::endl;)
int a = 1; 
bool b = true; //Keywords: bool, char, float, double, string 
bool x = (a + b) == 2;
int addTwo(int num); //Function declaration (always outside of main)
int main() //Entry point, will return int value
{
    cout << "Hello World" << endl; //prints Hello World
    cout << a << endl; //prints 1
    if(a == 1 || b == 1)
	    cout << b << endl; //prints 1
    else if(x && b)
    {
    cout << a + b << "is good";
    }
    int addTwo(int num) {
	    int modified = num + 2; 
		return modified; 
	}
    return 0; //Says program executed successfully.
}
```
- `cout` (console output)
- `<<` (insertion operator) arrows pointing in the direction of data flow
- `endl` (end line) moves cursor to the next line just like '/n'. Unlike '/n', it flushes the output buffer, printing to terminal immediately instead of printing all at once at the end of program

#### - Complex 
```cpp
#include <iostream>
#include <string>
#inclue <fstream>
using namespace std;

string array_c[4] = {"Volvo", "BMW", "Ford", "Mazda"};
int x, y = 0, z;
std::cout << "Enter a number: "; //prompts for user input
std::cin >> x; //save user input to x
array_c[0] = {"Mercedes"};

int main()
{
	ifstream readFile;  
	if(readFile.is_open()) //always make sure file opened correctly
	{
		readFile.open("test1.txt"); //this sets readFile = "test1.txt"
		string fileLine;  
		while(getline(readFile, fileLine)) //getline will read lines until done
		{  
			cout << fileLine << endl;  
		}
	}
	readFile.close(); //always close file when your done reading
	ofstream writeFile; 
	writeFile.open("test2.txt"); 
	int length = sizeof(myArray) / sizeof(myArray[0]); //sizeof returns the memory used by the array. Divide it by the memory per term to find array length 
	for (int i = 0; i < length; i++) 
	{  
	    std::cout << array_c[i] << std::endl;
	    if (array_c[i] == 5)
		    break;
	    else
	    {
			writeFile << "Add this new line to the file!" << endl; 
	    }
	}
	Student s1(2025);
	s1.studentName = "pat"; //set variables in classes just like structs
	s1.major("electrical"); //or set variables like this
	s1.setIdNumber(11112);
	cout << s1.getIdNumber(); //prints 11112
	cout << s1.graduatingYear; //prints 2027
}

class Student //classes are just like java, basically a struct with methods
{
	public: //public means all data can be accessed outside class
		string studentName;
		string major;
		int graduatingYear;
	private:
		int idNumber; //idNumber is private because only this class needs to access it
	public: //must define methods as public or private
		void setIdNumber(int x) //method
		{
			idNumber = x;
		}
		int getIdNumber()
		{
			return idNumber;
		}
		Student(int requestedYear) //constructor, called whenever a new object is setup
		{
			graduatingYear = requestedYear;
		}
}
```
# Links
- [[Concepts Shared Between Languages]], [[Data Structures]],  [[C++ Memory Management]], [[C++ Exceptions]], [[C++ Pointers]],  [[Good Programming Practices]], [[C++ Small New Concepts]], [[C++ Classes]], 
- #main
# In progress
- `std::vector` class 
- wordRecord* newArray = new wordRecord[arrayLength * 2];
	 delete[] originalArray;
	 copy(originalArray, originalArray + arrayLength, newArray);
- for (int i = 0; text[i] != '\0'; i++)
- Just use "return;" to exit a function, don't use "exit;"
- don't do: while (finder->next != nullptr && finder != nullptr)
	do: while (finder != nullptr && finder->next != nullptr)