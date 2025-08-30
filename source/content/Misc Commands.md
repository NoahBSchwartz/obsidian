- Parenthesis are used for dereferencing
- lea: `movq 0x18(%rbx), %rdx` moves the value after the operation is completed in `%rdx` while `lea 0x18(%rbx), %rdx` does the operation and then copies the address to `%rdx`
		Ex. `leaq (%rdx), %rsi` =  `movq %rdx, %rsi` (because of parentheses)
	- lea is mostly used for arithmetic nowadays
		Ex. Save a move instruction but using lea to add 3 numbers
						![[Screenshot 2024-02-14 at 4.10.47 PM.png]]
- `test b, a`: computes a&b (if the result is 0 then the sign flag isn't set, if 1 then the flag is set)
- `cmp b,a`: computes a -b (if the result is 0 then the sign flag isn't set, if 1 then the flag is set)
- Jump: relies on test b,a and cmp b,a for whether or not to jump![[Screenshot 2024-02-14 at 4.19.10 PM.png]]
	Ex. ![[Screenshot 2024-02-13 at 11.17.29 AM.png]]
	Ex. ![[Screenshot 2024-02-13 at 11.18.02 AM.png]]
- Arithmetic Operations:![[Screenshot 2024-02-14 at 3.44.36 PM.png]]
- Increment Operations: incq, decq, negq, notq
- Division
	1. `cqto`: sign-extend int in `rax` register into the 128-bit space in `rdx:rax` pair (prep inputs for idivq)
	2. `idivq`: divides the 128 bit integer by the value in `rax` (Note: this command only works with rax)
		- Result: remainder stored in rdx and quotient stored in rax