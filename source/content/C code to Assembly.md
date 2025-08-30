- Do While
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
```c
long foo(long n){ 
long result = 1; 
do{ 
result = result * n; 
n = n-1; 
} while(n>1); 
return result; 
}
```
- Switch Statement: the compiler will use a jump table
```
	ja .L8 # Use default 
	jmp *.L4(,%rdi,8) #go to first pointer of .L4 
.L4: 
	.quad .L8 # x = 0, makes processor jump to .L8
	.quad .L3 # x = 1 
	.quad .L5 # x = 2 
	.quad .L9 # x = 3 
	.quad .L8 # x = 4
	.quad .L7 # x = 5 
	.quad .L7 # x = 6
```
- Recursion
```python
long pcount(unsigned long x) 
{ 
	if (x == 0) return 0; 
	else return (x & 1) + pcount(x >> 1); 
}
```
```
movl $0, %eax 
testq %rdi, %rdi 
je .L6 
pushq %rbx 
movq %rdi, %rbx 
andl $1, %ebx 
shrq %rdi 
call pcount //this will be the address pushed to the stack              //everytime that the recursion happens
addq %rbx, %rax //these adds will start to stack up with                     //each recursion
popq %rbx 
.L6: 
rep; ret
```
- Arrays: if the array is bigger than 5 ints long, it won't fit into a register. To solve, think of an array as a bunch of pointers 
		Ex. Start address = 3000, the 4th element is `3000 + 4*4`= 3016
	- 2D Arrays: organized by Row-Major Ordering. 
		EX. `A[0][0]` is adjacent in memory to `A[0][1]`
	- 3D Arrays: same layout `A[0][0][0]` -> `A[0][0][1]`... -> `A[0][1][0]->A[0][1][1]`...`A[]
- Structs
	- The compiler assigns struct variables to memory locations![[Screenshot 2024-02-26 at 3.56.29 PM.png]]
	- Alignment: the objects might not be adjacent to each other. Instead the compiler will leave certain gaps between data to specify datatype. The rule is: object of X bytes must have an address that is a multiple of X. ![[Screenshot 2024-02-26 at 3.56.48 PM.png]]
	- Example 1:
```C
struct S0
{ 
	int i[2]; //i[0] addr = 0x0
	char c[6]; //c[0] addr = i[0](4 bytes) + i[1](4 bytes) + 1 = 0x9 (no alignment needed because char has size 1)
			   //c[3] addr = 0x8 + c[1](1 byte) + c[2](1 byte) + 1 = 0xB (11)
	double d; //d addr = c[3]addr + c[4](1 byte) + c[5](1 byte) + empty space(2 bytes) + 1 = 0x10 (16)
}datum;
```
	   - Example 2: for an array of structs, the array must also follow the alignment rules (notice the 7 bytes tacked onto end)

![[Screenshot 2024-02-26 at 4.10.02 PM 2.png]]
- Unions: allow an object to be referenced using several different types. Useful to save memory. Same layout as struct but rather than having the different fields reference different blocks of memory, they all reference the same block.
	- The overall size of a union equals the maximum size of any of its fields
		Ex. it could be used to store the values of both left and right nodes in a tree
```c
union U3 {
    char c;
    int i[2];
    double v; 
};
```
- Pointers
```C
int *ip; //pointer to an int
char **cpp; //pointer to a pointer to an int
int fun(int x, int *p);
int (*fp)(int, int *); //store a functions as a pointer
fp  = fun;
int y = 1;
int result = fp(3, &y); //invoke function using the pointer
```
[[Compiler Optimization]]
[[Linkers and Object Files]]
