The region of memory managed with stack discipline
- Stack Pointer: hold address of the top of the call stack
	- As we add an item to the stack, the address stored in the stack pointer (%rsp) decreases 
- `pushq %rbp
```
subq $8, %rsp //increase stack height by 1
movq %rbp, (%rsp) //write rbp to top of stack
```
- `pop %rax`
```
movq (%rsp), %rax //move top of stack into rax
addq $8, %rsp //decrease stack height by 1
```
- `call myFunc`
```
push <return adress> //Decrease rsp by 8 bytes 
					//Save the address of the next instruction to be called in rsp
jmp myFunc
```
- `ret myFunc`
```
popq %tmp //Pop address from stack into temporary register
jmp %tmp //Jump to address
		//increase rsp by 8
```
- Example: notice how the pointer and line reference are stored in the stack while long is stored in a register![[Screenshot 2024-02-21 at 4.17.00 PM.png]]
	- Attacking: if the return address `%rdi` could be modified right before the function call, the `ret` would jump to the wrong line
- Saving Data: either the caller saves data or the callee saves it
	- Caller Saved: Caller saves temporary values to its own stack frame before it calls the function 
		- ie. All function arguments, return value, r10, and r11
	- Callee Saved: When it's called, the callee saves temporary values to it's own stack frame (and then restores them before returning to the caller)
		- ie. `rbx`, `r12`, `r13`, `r14`, `rbp`, `rsp` (but must save and restore contents if using)
```
callq incr
pushq %rbx
//do some action
popq %rbx
ret
```
- Example 2
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