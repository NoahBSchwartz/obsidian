We've been studying x86-64 but for example we'll consider y86-64 which has fewer parts 
- Processing 1 instruction (this will happen 2 billion times a second)
	1. Program Counter: its only job is to keep the address of the next instruction to be processed
	2. valP: stores the size of the instruction so the program counter knows how much to increment by
- Syntax
	- Each register is set to a symbol ![[Screenshot 2024-03-06 at 4.07.36 PM.png]]
	- Each command is set to a sequence ![[Screenshot 2024-03-06 at 4.16.10 PM.png]]
		- rrmovq = register to register move
		- irmovq = 
		- rmmovq = register to memory move
		- mrmovq = ![[Screenshot 2024-03-11 at 3.51.41 PM.png]]
- Ex. "0x040: 61 89" 0x040 is the address of the program counter, so this means the next instruction to execute is 61 89
	1. Fetch
		- Consult the table: 6 is at byte 0 and 1 is at byte 1 so we have a subq
		- 8 is one argument and 9 is the next so we're using %r8 and %r9
	2. Decode
		- valA = Program gets the value stored in %r8
		- valB = Program gets the value stored in %r9
	3. Execute (ALU's job)
		- valE = valA - valB 
	4. Memory (N/A)
	5. Write Back
		- Write valE back to %r9
	6. PC Update: increment program counter by valP![[Screenshot 2024-03-06 at 4.20.34 PM 1.png]]
- Ex. "0x040 50 89 14 00 00 00 00 00 00 00" (Trailing 0's because valC is passed as `offset + 14`) (Note: 0's trailing because of little endian)
	1. Fetch:
		- 5     0 and 8   9 are decoded same as before (mov from %r8 to %r9)
		-  valC = 0x14
	2. Decode
		- valB = %r9
	3. Execute (ALU does this step)
		- `valE =` `valB + valC` because it's a move command (ie. `REG[%r9] + 0x14`)
	4. Memory
		- Go to `M[valE]` and extract its data
	5. Write Back
		- Write `M[valE]` back to `valA`
	6. PC Update: increment program counter by valP
