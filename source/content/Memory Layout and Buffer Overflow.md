- Memory Layout
	- All global variables go in data
	- All local variables and return addresses are stored in the stack
	- All code is stored in text section
	- There is an overlap between heap and stack, as stack increases it grows downward into the heap's memory usage (minus when you want to put something on stack, plus when you take away)![[Screenshot 2024-02-27 at 1.21.28 PM.png]]`
- The code below has weird things going on when different values are passed to it. This is because the values being written to the array overflow into the function's return instruction
	- Note: This happens because C doesn't have any bounds checking in place
	- Attack: it's possible to write a value to a function's return address to get the program to jump to other spots in the code
```C
struct struct_t {
    int a[2];
    double d;
};
double fun(int i) {
    struct struct_t s;
    s.d = 3.14;
    s.a[i] = 1073741824;
    return s.d;
}
//fun(0) = 3.14, fun(1) = 3.14, fun(2) = 3.139999, fun(3) = 2.0000, fun(4) = 3.14, fun(6) = seg fault
```
- Buffer Overflow: think of a buffer like an array on the call stack
	- When a function is called:
		1. The stack's `rsp` pointer is decreased by 8 bytes
		2. The return address is written to where the `rsp` points
	- When a buffer is allocated:
		1. Decrement `rsp` by amount allocated ie. `Buffer[24]` = move `$rsp` 3 spots down
		2. When `Gets()` is called, values are written into the 3 empty spots onto stack (remember that it will end in '`\0`')
		3. When `Buffer[24]` is called again, move `$rsp` back up by 3 spots
	- To get buffer overflow, just give more data to Gets() and get it to write to return value
		- Note: you must reverse any address you write when trying to overflow because of little endian
			Ex. consider x = 0x01234567
			Big Endian Addresses = 4000 4001 4002 4003
				Big Endian Value =       01     23     45    67,
			Little Endian Addresses = 4000 4001 4002 4003
				Little Endian Value =    67.     45.     23.    01
- Avoiding Buffer Overflow Attacks:
	- Use `fgets` instead of `gets` to cap the length of entered string. 
	- Use `strncpy` instead of `strcpy` to copy a portion of string instead of whole thing. 
	- Make sure you're considering execute permissions when writing program (only some parts of the code can be executed)
	- Canary: a special value is placed on the stack right before buffer. If it gets corrupted, the code knows buffer overflow has taken place
	- Randomized stack offsets: randomize what address the stack starts at so its harder to predict buffer location
- Gadgets: find a benign command in the code and then use its address in your buffer overflow as a way to preform some sort of operation ![[Screenshot 2024-03-04 at 3.56.30 PM.png]]
	- You can use the table above to find the right mov instruction you need. Then you can just take the address and use it in a buffer overflow
[[Memory Hierarchy]]
