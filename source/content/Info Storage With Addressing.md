Computers use several different binary representations to encode numeric values
- Virtual Address Space
	- How a machine-level program views memory: virtual memory, address (added up make up the virtual address space)
		- allocating memory performed in virtual address space (pointers store where things are in this space)
		-  Machines scaled up to 64 bit recently to increase the size of the virtual address space because word size heavily affects size of virtual address space: `(2^w) - 1`
			- Backwards Compatibility: Most 64-bit machines can also run programs compiled for use on 32-bit machines
			- Computer and Compilers have different instructions for manipulating different word sizes: 1 byte, 2 bytes, 4 bytes, 8 bytes
				- Reason for difference is because of signed and unsigned and different types (int, float, long, double)
- Addressing and Byte Ordering
	- Storing Objects (variables, etc): establish start address and how bytes are ordered
		Ex. for int x, if &x (pointer to x) at 0x100 then addresses are: 0x100, 0x101, 0x102, and 0x103
		- If the objects are rly long, it's the same principle bit they're stored as a sequence of bytes (instead of bits). It can either be stored forward or reversed depending on machine
			- When sending data between machines, this choice to reverse could be an issue (so network traffic is standardized)
		- Strings: encoded as array of characters terminated by null character (each char represented by a byte)
			Ex. "12345" = 31 32 33 34 35 00 in hex (00 is stopping char)
	 Note: To make programs portable from 32 bit to 64 bit, C sets a minimum number of bytes that each variable has to be but gives no maximum
[[Types of Encodings (and Casting)]]
