Programs define and reference symbols (global vars, static vars, and functions) 
->
Symbol definitions are stored in object file (by assembler) in the symbol table. Object files are collections of blocks of bytes containing program code, program data, and data structures.
-> 
The Linker: concatenates the blocks together, decides on run-time locations, modifies locations within the code and data blocks 
- ELF Object File Format (Executable and Linkable Format)
1. Symbol Resolution: each module (function) has a symbols table. Global Symbols = symbols defined by a module that can be referenced in other modules, External Symbols = global symbols referenced by a module but defined in a different module, Local Symbols: symbols that are defined and referenced exclusively by a module
	- Needed Because: Strong (procedures and initialized globals) vs Weak (uninitialized globals) ![[Screenshot 2024-04-29 at 4.05.52 PM.png]]
		- Link time error: occurs if 2 strong symbols conflict (ie. function is defined twice in 2 different modules)![[Screenshot 2024-04-29 at 4.08.57 PM.png]]
			- Reason: if `x` and `y` are adjacent in memory, and `x` is a double while `y` is an int, writing a double to `x` could overwrite `y` due to the larger size of a double.
		Ex. The below code prints out: `1, 2, 3, 4`![[Screenshot 2024-04-29 at 4.03.12 PM.png]]
2. Relocation: Combine relocatable object files (ie. t.o, main.o, print.o) -> into -> a single executable object file
	- Shared Libraries (Dynamic Linking): Object files that contain code and data that are loaded and linked into an application dynamically, at either load-time or run-time
	1. Object file gets created
	2. Linker tries to link but sees that there are libraries that need to be linked
	3. Linker makes a note of this and then returns the partially linked file
	4. When the program is run, the Loader then uses its own libraries stored in its system to fill in the blanks 