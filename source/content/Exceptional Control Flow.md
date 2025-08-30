Control Flow: From startup to shutdown, a CPU simply reads and executes over and over
- To change Control Flow: Use jumps and branches, Use call and return. But these both make it difficult to react to changes in system state (ie. user hits ctrl-C on keyboard, or data arrives...)
- Exceptional Control Flow
	1. Exception: transfer of control to the OS kernel in response to some event
	2. Handle Exception
	3. Return to current instruction, Return to next instruction, Abort
		- Exception table: the jump table which tells processor what to do. Each type of event has a unique exception number k (aka interrupt vector)
- Asynchronous Exception: caused by events external to processor. The processor's interrupt pin is triggered and then returns to current instruction 
- Synchronous Exceptions: events that occur as result of executing an instruction
	- Traps (intentional): things like system class
		- System Calls: Can invoke a system call directly from a C program via the syscall function![[Screenshot 2024-04-10 at 4.08.13 PM.png]]
		Ex. User calls open(filename, options) -> Assembly:    mov 0x2, rax 
													 syscall (and rax contains syscall numbe )
	- Faults: unintentional but recoverable 
		- Page Fault: user writes to memory location, that portion is currently on disc not memory. So page fault is called and then disc is copied to memory
		- Invalid Memory Reference: User tries to write to an out-of-bounds array index. Page fault is triggered, detect invalid address, send error to user
	- Aborts: Unintentional and unrecoverable
- Process: instance of a running program (not the same as "program"). Useful because it provides us with 2 abstractions
	1. Logical Control Flow: Each program seems to have exclusive use of the CPU 
		- Context Switching: Control flow can pass from one process to another by switching contexts
		- Each process has a unique ID, status, and parent ID
	2. Private Address Space: Each program seems to have exclusive use of main memory
	- Concurrency: One processor can give this illusion using multiprocessing. Process A runs for a bit, then B, then C...
	- Sequential: Breaks the illusion: processor needs to wait for program to finish
	- Background Process: process that's running but that user can't see
- Functions
	1. Fork: function is called once but returns twice. The parent process creates a new running child process by calling fork
		- Return child's PID to parent process
		- Child gets an identical copy of the parents address space and file descriptors (ie. same variables and state) but has different PID
			- By default: child process will run as a background process in a shell (it looks like no processes are running until you type `ps`)
		- Race Condition: when you fail to anticipate the fact that forks work in random orders and your code relies on a "race"
			- `wait()`: fixes race condition by making parent wait for child to finish
			- `waitpid()`: user can specify which child to wait for (based on its id). Wait for a zombie child to appear and reap them
		- Zombie: when a process terminates, it doesn't get removed from the system immediately (still consumes resources)
			- Reaping: performed by the parent when the child sends message saying it's done with its job (to avoid zombies)
```c
int main(){
	pid = fork();
	x = 1;
	if (pid == 0)
	{
		x++;
		print(". I am the child: " + x);
		exit(0);
	}
	print(". I am the parent: " + x);
	exit(0); 
	// prints ". I am the child: 2. I am the parent: 1"
	// or prints ". I am the parent: 1. I am the child: 2"
}
```
![[Screenshot 2024-04-15 at 3.59.49 PM.png]]
2. Signals
	- Send: kernel sends a signal to a destination process by updating some state in the context of the destination process
		1. Will happen because something has happened with child
		2. Will happen because another process has told the kernel to send the message
	- Receive: A destination process receives a signal when it is forced by the kernel to react in some way to the delivery of the signal
		1. Can ignore signal 
		2. Can terminate process
		3. Can catch the signal by reacting
	- Pending: A signal is pending if sent but not yet received
		- A process can block the receipt of certain signals
	- Method
		- Every process belongs to exactly one process group, and signals can send to entire process group or a single process (ie. child belongs to parents group)
	- If you want to circumvent the default action, use a signal handler to specify how a process should react to getting a sigint 
![[905410.jpg]]
	- Note: Kill just means pausing (turning a live process into a zombie)
	Example
		![[Screenshot 2024-04-17 at 4.22.29 PM.png]]- Notice that the sigint function is never called in main but it might still get executed if a signal comes in (this is why using a signal handler is important to override defaults)
3. Setjmp/ Longjmp: controlled way to break the procedure call/ return discipline. Useful for error recovery and signal handling
	1. Setjmp: identifies a return site for longjmp (returns 0 first time)
	2. Longjmp: jumps back to setjmp (setjmp returns whatever's passed into longjmp)
	Example
```c
setjmp(buf) //return's 1 first time
//do some stuff
if error()
	longjmp(buf, 2) //now go back to line 1, setjmp will return 2
```
