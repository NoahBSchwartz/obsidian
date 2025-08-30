- Source Code: the text file that the programmer creates, stored as a sequence of bits (grouped into chunks of 8 called bytes)
	-  Byte: each grouping of 8 bits, corresponds to 1 ascii character
	- Word: a grouping of bytes (usually either 4 bytes or 8 bytes aka 32 bit or 64 bit)
	- Text File: the source program that the coder sees
	- Binary File: all other files (machine readable). All info on a system is stored as bits
- From Source Program -> Executable (what happens when this command is run: `gcc -o hello hello.c`)
	1. Preprocessing Phase: modifies the C program for all lines containing `#`
		Ex. `#include <stdio.h>` inserts header file into the program
	2. Compilation Phase: translates the text file into an assembly language program
		Ex. `main: subq $8, %rsp...`
	3. Assembly Phase: translates the assembly file into machine-language instructions (called an object file)
		Ex. `00101001 01010010 01010001`
	4. Linking Phase: Every function in the original program (ie. `printf`) has its own object file. The linker merges all of these into the original source object file (called an executable which is also in binary)
		Ex. run with the command: `./hello`
	Note: this process is very OS dependent so binary code is almost never portable
![[Screenshot 2024-02-09 at 2.22.21 PM.png]]
![[Screenshot 2024-03-13 at 4.06.40 PM.png]]![[Screenshot 2024-04-12 at 2.26.23 PM.png]]16-way Associate Set means there are 16 blocks per set
![[Screenshot 2024-04-01 at 3.48.29 PM.png]]
![[Screenshot 2024-04-12 at 2.32.36 PM.jpg]] 
![[Screenshot 2024-04-12 at 2.36.20 PM.png]]
![[Screenshot 2024-04-12 at 2.52.57 PM.png]]
[[Screenshot 2024-02-19 at 5.00.00 PM.png]]
![[Screenshot 2024-02-07 at 4.08.06 PM 2.png]]
![[Screenshot 2024-03-07 at 6.22.57 PM.png]]![[Screenshot 2024-03-07 at 6.08.43 PM.png]]
![[Screenshot 2024-02-13 at 11.06.41 AM.png]]
![[Screenshot 2024-02-14 at 3.44.36 PM.png]]
![[Screenshot 2024-02-14 at 4.19.10 PM.png]]
 
#main
[[C++]]
[[C Exceptions]]
[[Hardware]]
[[Run-Time]]
[[Number Bases]]
[[Architecture and Assembly]]