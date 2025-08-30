- Classes are like structs with methods
```cpp
class Student //classes are just like java, basically a struct with methods
{
	public: //public means all data can be accessed outside class
		string studentName;
	private:
		int idNumber; //idNumber is private because only this class needs to access it
	public: //must define methods as public or private
		void setIdNumber(int x) //method
		{
			idNumber = x;
		}
}
```
- Overloading: when a method is defined multiple times to be able to take in different kinds or numbers of variables
```cpp
int foo(int x)
{
return x * 2;
}
int foo(int * x)
{
return *x * 2;
}
int foo(int x, double y)
{
return (double)x * y
}
```
- Constructor: method with the same name as their class, run when object is created
- Programming with methods usually uses 3 files:
										`timeClass.hpp`
```cpp
class time12
{
public:
    time12(int h, int m);
    int getHour();
    int getMinute();
private:
    int hour;
    int minute;
};
```
																		timeClass.cpp
```cpp
#include "timeClass.hpp"
time12::time12(int h, int m) //Constructor
{
	h = 0;
	m = 0;
}

int time12::getHour() //Methods can be defined outside of class 
{
    return hour;
}

int time12::getMinute()
{
    return minute;
}
```
																			driver.cpp
```cpp
#include "timeClass.hpp"
int main()
{
    time12 time(11, 30);
	std::cout << time.getHour() << time.getMinute() << std::endl;
    return 0;
}
```
