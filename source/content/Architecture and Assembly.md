- General
	- Instruction Set Architecture (ISA): abstract model of the computer which describes the instructions supported by computer (made so coders can ignore implementation). It gives guidelines of the registers that must be available to programmers
		Ex. RISC, x86, CISC...
	- Encoding Assembly: AT&T/ GAS syntax used in this course (source -> destination order)
- Data Types
	- Integer Data: 1, 2, 4, 8 bytes store both values and addresses (eg. pointers are stored as ints)
	  - No arrays or structs
  - Operations
	  1. Arithmetic: use on memory/ on register data
	  2. Transfer Data: register<->register or register<->memory
	  3. Control: Jump to different procedures, allows for loops and branches
- Scope: No local variables in assembly, just one fixed set of registers shared among entire program
- Specifics
	- Integer Registers: store data and memory addresses
		- Registers within registers lets you write smaller bits of information. For x86-64, they're 64 bits long with portions which represent 32 bit, 6 bit, 8 bit![[Screenshot 2024-02-07 at 4.08.06 PM 2.png]]
- There are registers for arguments (1-6) of a function and the (1) return value of a function

[[GDB Debugger]]
[[Move Commands]]
[[Misc Commands]]
[[C code to Assembly]]
[[Memory Layout and Buffer Overflow]]
