- `int x = 7;` -> `movl $0x7, %eax`. When a new int is created, assembly will move `7` into the registry `eax`
	- `%` is register, `$` is constant, `movl` is a command
- `int *p = 15;` -> `movb $0xf, (%rax)`. Take the value in `rax`, treat it as an address, and write `0xf` to that place in memory
	- `()` around the register indicates dereferencing of a memory address (finding what `%rax` contains)
	- `movb` writes data to somewhere in memory
	- `movq` writes data from one register to another
	- `ret` writes data to return register![[Screenshot 2024-02-05 at 4.24.39 PM.png]]
	- Note: can't move memory -> memory (b/c of hardware)
			Ex. `movq (%rax), (%rbx)` is invalid
- Complex Addressing Mode: `movq -12(%rdx,%rcx,4), %rax` when an array's information needs to be accessed ie. `array[i - 3]`
	- Source: `-12(%rdx,%rcx,4)` is in the form `D(Rb,Ri,S)`
		- Decode Source: `Mem[Reg[Rb] + S*[Reg[Ri]] + D]`
		- `Mem` = dereference `Reg` = take value out of register
				Ex. `Mem[Reg[rdx] + 4 * Reg[rex] - 12]` = `Mem[0x30]`
	- Destination: `%rax`
	- Relation to C Code: consider `array[i - 3]` 
		- `rdx` = array, `rcx` =  i, `4`= number of bytes needed for int, `-12` = go back 4 steps (b/c of i - 3)![[Screenshot 2024-02-13 at 11.06.41 AM.png]]
			Ex. `movq 0x18(%rbx, %rax, 4), %rdx`
- Special Cases:
	- By default, D = 0 and S = 1
		Ex. Only `(Rb, Ri)` -> `Mem[Reg[Rb] + [Reg[Ri]]]` D= 0, S = 1
- movb, movw, movl, movq
	- Note: the destination size determines the suffix to use![[Screenshot 2024-02-12 at 4.21.44 PM.png]]
- Array Indexing: mov (%rdx, %rax, 4), %rax
- String Indexing: mov (%rdx, %rax, 1), %rax