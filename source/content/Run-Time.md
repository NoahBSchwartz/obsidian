1. The processor read the instructions sent from the register. At startup, these are the shell instructions. The shell program waits until something is typed in terminal
2. The shell reads each letter typed into a register (Ex. `./hello`)
3. When the enter key is hit, the shell program goes through the steps needed to copy the data in the `hello` object file from disk to main memory
	- The processor read the instructions sent from the register (mandating what the shell should do in a given scenarion)
	- Then it takes a certain action (depending on the instructions):
		- Load: Copy a byte from main memory into a register, overwriting the previous contents
		- Store: Copy a byte from a register to a location in main memory, overwriting the previous contents
		- Operate: Copy the contents of two registers to the ALU, perform an arithmetic operation on them, and store the result in a register
			- Arithmetic/Logic Unit (ALU): computes new data and address values
		- Jump: Extract a byte from the instruction itself and copy that word into the program counter (PC), overwriting previous val
	- It updates the program counter to point to the next instruction
4. The processor begins executing the machine-language instructions in the `hello` program’s main routine
[[Info Storage With Addressing]]
[[Call Stack]]
[[Exceptional Control Flow]]
