Optimization performed by the compiler (don't pre-optimize, compiler will take care of it)
- Example
	Non-optimized.                                                                            Optimized by Compiler![[Screenshot 2024-03-18 at 4.15.33 PM.jpg]]
### Optimization Blockers: 
To effectively work with compile remove all optimization blockers
- Memory Aliasing: when two pointers may designate the same memory location. The compiler must assume this could be the case when making its optimizations so it's often considered a big blocker
```cpp
void fooA(int *array, int *num)
{
	array[i] = *num * array[i]; //the compiler doesn't know whether it should treat num as a variable or array
}
//Solution 
void fooA(int *array, int *num)
{
	int temp = *num;
	array[i] = temp * array[i]; //the compiler doesn't know whether it should treat num as a variable or array
}
```
- Array Locality: `i[5]j[5] maybe more efficient than j[5]i[5]` because of how the program needs to jump to the next term (make sure it's arranged sequentially)
- Procedure Calls: if you have a for loop that calls a function, the compiler can't optimize around it
### Optimization
- Loop Unrolling: make a for loop into simply a series of statements
- Strength reduction: replace expensive operation with cheaper one (ie. sub out multiply for shifts)
- Machine independent optimization: compiler optimizations that don't rely on the machine architecture (ie. dead code removal)
- Parallel accumulators: divide the dataset among multiple processors (or threads) where each processor sums up its portion of the data and then everything is combined
- Common subexpression elimination: If a particular computation (e.g., `a * b`) occurs multiple times within a block of code, this will compute the value once and reuse it
- Inlining: the compiler replaces a function call with the actual body of the function. This eliminates the overhead associated with function calls
- Instruction pipelining: Performed in CPU, the execution of an instruction is divided into stages (fetch, decode, execute, memory access, write-back), and each stage is performed by a different part of the processor