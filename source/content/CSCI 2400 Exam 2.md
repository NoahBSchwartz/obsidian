### Import all diagrams from last test

- Remember to flip cmp statement
	Ex. `cmpq %rsi, %rdi` = `if (%rdi > %rsi)`
- Remember: `M[x]` refers to the value of memory at address`x`, and `Reg[x]` refers to the value of register `x
	- `addq $0x11 , (%rax)` means `Mem[Reg[rax]] = 17 + Mem[Reg[rax]]` (because of parantheses)
- Remember to flip subtract: 
	`subq %rsi, %rax` means `%rax = %rax - %rsi`
- `imulq` is multiplication 
- Know `foo` and `.L2`
-  You must reverse any address you write when trying to overflow because of little endian 
- Outputs a zero (anything xored with itself = 0): 
	`xorl %eax, %eax`
- `testl %edi, %edi      je .L2` jumps if edi != 0
- `setg %al` = set if greater than
```
foo: 
	movl $1, %eax 
.L2: 
	imulq %rdi, %rax 
	subq $1, %rdi 
	cmpq $1, %rdi 
	jg .L2 ret
```
Og code:
```long foo(long n){ 
long result = 1; 
do{ 
result = result * n; 
n = n-1; 
} while(n>1); 
return result; 
}
```
![[Screenshot 2024-02-19 at 5.00.00 PM.png]]
- 2D arrays are organized by row major ordering (you should already know this)
- When working with buffer overflow problems, remember that if you input 1234 to a buffer, it will be stored to the stack as 31 32 33 34 (because of ASCII)
	- Note: you need to consider things like little endian and the fact that there will be null byte (00) added to the end when trying to perform an overflow
- For x = 0x01234567
	- Big Endian Addresses = 4000 4001 4002 4003
			Big Endian Value =       01     23     45    67,
		Little Endian Addresses = 4000 4001 4002 4003
			Little Endian Value =    67.     45.     23.    01
- The size of the lowest buffer in a move instruction determines its suffix. Example: `movw (%eax), %dx`
![[Screenshot 2024-02-07 at 4.08.06 PM 2.png]]
- MAKE SURE YOU KNOW DIFFERENCE BETWEEN LEA AND MOV
- what does sarl and imull commands do?
- testl %edi, %edi is always followed by je 
- Difference between sarq, shrq, sarl, shrl (arithmetic, logical and used with either q or int)
	- Ints are arithmetic because they are signed (logical is unsigned)
- Make sure when working with datums, you take into account where the next datum is allowed to start
##### Do while loop executes the condition first and then jumps whereas
# Practice Problems
- Determine the appropriate instruction suffix based on the operands: `mov_ (%rsp, %rdx, 8), %edx`
- What does this command mean? `addl 16(%rbp),%ecx`
	Ans: `Reg[ecx] = Reg[ecx] + Mem[Reg[rbp] + 16]`
- The function takes four arguments passed in registers **%edi, %esi, %edx and %rcx**. Convert function to C
```
func:
	movl	%edi, %eax
.L3:
	movslq	%eax, %rdi
	cmpl	%esi, (%rcx,%rdi,4)
	je	.L2
	addl	$1, %eax
	cmpl	%edx, %eax
	jl	.L3
	movl	$-1, %eax
.L2:
	ret
```
		Note: once .L3 is done executing, .L2 will be called (if it hasn't already)
- Array is declared `int A[5][3][6];` Assume that the starting address of A is 400. What is `&A[4][2][5]`. Answer: `6 columns * 3 rows * 4 bytes = 72 bytes per page`
		`72 * 4 per page + 24 * 2 cols + 5 * 4 bytes` + `400` = 756
- What do you do if restarts correctly for char but then the double slot positioning is incorrect? See below![[Screenshot 2024-03-03 at 10.48.00 AM.png]]
###### shrl is used for unsigned int. So in the fill in the blank problem, you know that x must be unsigned int. imulq is used for unsigned
- ![[Screenshot 2024-03-05 at 1.51.39 PM.png]]