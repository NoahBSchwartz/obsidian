- Superscalar Processor: Simple CPU's couldn't perform operations in parallel because they only had one arithmetic logic unit. We solved this by creating multiple ALU's with branch prediction, caching the results, and combining the results
- Optimize code for Superscalar: rewrite your code to allow parallelism
```
sub a,b
add a,b
//these 2 operations are dependent on each other so they can't run in parallel
```
- CPE (cycles per element): this is the number we use to check if we're optimizing right (how many cycles it takes to compute 1 vector operation)
	Ex. Compute: (`3 * 2 + 4 * 3`) First `3 * 2` takes 3 cycles to compute and `4 * 3` takes 3 cycles. `6 + 12`  takes 3 cycles. CPE = 9
		To improve this, add 2 ALU's. First `3 * 2` and `4 * 3` take 3 cycles. `6 + 12` takes 3 cycles. CPE = 6
### Actual Implementation
 - Split the ALU into stages (pipelined architecture). You can push the first operation on the first cycle, then first and second on next cycle...
	 - Loop Unrolling: this can help because it breaks down one instruction into multiple that can all be executed simultaneously
	 - Loop Unrolling with Separate Accumulators: 
		Ex. in a loop, combine all the odd elements and all the even elements. And add them together
		- Increase the number of accumulators as you increase your loop unrolling (for 10 elements, use 5 accumulators to process a lot of operations in parallel)
[[Pipelined Processor Architecture]]
[[Sequential Processor Architecture]]
