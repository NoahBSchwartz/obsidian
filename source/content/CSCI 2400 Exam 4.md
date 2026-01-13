![[Screenshot 2024-05-06 at 1.35.48 PM.png]]
- Creates 4 children running infinitely, then pause all of them to make zombies, then terminate them with "waitpid"
-  Recall that kill(pid,signal) sends a signal to process pid if pid>0 or to process group pid if pid<0 or to all processes in the current process group if `pid==0.`
- `if (!fork()) is equivalent to if (fork() == 0)`
- for `for i < 10: fork` answer is `2^10`
```C
signal (SIGUSR1, baz); //map SIGUSR1 to call baz when triggered
signal (SIGCHLD, bar); //map SIGCHLD to call bar when triggered 
if (fork() == 0)
	signal(SIGUSR1, foo); //child sets up it's own mapping for SIGUSR1 to call foo
	kill(pid, SIGUSR1); //only thing that actually sends signal (foo is called)
kill(pid, SIGUSR1); //now baz is called
```
- Note: log2(x) = lnx/ln2![[Screenshot 2024-04-19 at 9.57.24 PM.png]]
- Retake [Reading quiz on 9.1-9.6](https://moodle.cs.colorado.edu/mod/quiz/view.php?id=59556 "Quiz") questions 3,4,5,6![[Screenshot 2024-05-06 at 1.36.18 PM.png]]
- int y = 0; also counts as undefined![[Screenshot 2024-05-03 at 4.04.56 PM.png]]
- Remember: you need to define the function header in the chart too (using .text). Remember: any actual local variables are undefined just dashes![[Screenshot 2024-05-01 at 11.30.33 PM.png]]![[Screenshot 2024-04-29 at 4.39.50 PM.png]]
- if one of your answers looks like 0 0001 0010, ignore the left bit and just right 0xce ![[Screenshot 2024-05-02 at 5.46.50 PM.png]]
- In first one, '1' and '2' can be printed in any order. In second one, '2' follow '1' (if print(2) were above wait though we'd still have same problem) (Note: wait only suspends into child process dies so if there are multiple children it might get confused)

- Wait is parents way of reaping children but if child spawns other children, those won't be reaped 
- Fork(): This is a system call that creates a new child process that is an exact copy of the parent process.
- Exit(): This call terminates the calling process immediately.
- Exec(): This family of functions replaces the current process image with a new process
- Wait(): Suspends the calling process until any one of its child processes ends.
![[Screenshot 2024-05-02 at 6.09.58 PM.png]]MMU -› handles memory and caching operations associated with the CPU
Input: Virtual Address. CPU MMU gets PTE from TLB 
MMU translate virtual address to physical address
Output: Physical address to retrieve data from memory
![[Screenshot 2024-05-03 at 1.19.41 PM.png]]![[Screenshot 2024-05-03 at 2.21.58 PM.png]]
![[Screenshot 2024-05-04 at 10.46.07 PM.png]]
- Mark & sweep garbage collectors are called conservative if they treat everything that looks like a pointer as a pointer
- Multi-level page tables reduce the overhead of virtual memory, are used to implement large address spaces
- The TLB is accessed on each memory reference, acts as a cache for page table entries
- All the actions that occur when a **fork()** system call is performed:  data structures are created for the new process, copies of the **mm_struct** are made
- When using a computer WITHOUT virtual memory, all processes can always access the memory of other processes since there is only one address space shared between all processes
- When using a computer with virtual memory no process may access the memory of another process, but it is possible to share the memory of another process
- The virtual address can be larger or smaller than the physical address space BUT a given virtual page is the same size as the corresponding virtual page
- A page hit occurs when the valid bit on the page table entry is set
![[Screenshot 2024-05-06 at 1.22.04 PM.png]]