- Components of the virtual address (VA) 
	- VPO: Virtual page offset 
	- VPN: Virtual page number 
- Components of the physical address (PA)
	- PPO: Physical page offset (same as VPO) 
	- PPN: Physical page number
- Address Translation: processor sends virtual address to MMU (memory management unit), MMU requests PTE, Cache sends PTE...
	- Cache Hit: if page is valid the MMU sends the physical address to the cache, the cache sends the data to the processor  
	- Cache Miss: MMU triggers page fault exception, Exception handler identifies victim (
		- Dirty = data has been modified in memory, but not updated to disk yet 
			- Write page out to disk 
			- Retrieve new page and replace evicted 
		- Not-dirty = memory and disk data match 
			- Just retrieve page from disk
		- Handler pages in new page and updates PTE in memory, Handler returns to original process, restarting faulting instruction
- There's a problem: Every time the CPU generates a VA, the MMU must refer to the page table
- Solution: Translation Lookaside Buffer (TLB) Small set-associative hardware cache in MMU, Virtually addressed, Maps virtual page numbers to physical page numbers, Contains complete page table entries for small number of pages
![[Screenshot 2024-04-24 at 4.04.22 PM.png]]
- Metadata needed = `(total memory / page size) * Page Table Entry Size`. Metadata begins to add up, we need a solution
	- Multi-Level page table: in level 1 each PTE (page table entry) points to page table, in level 2 each PTE points to a page





- Dynamic Memory Allocators (malloc): programmers use to acquire more virtual memory at run time. They manage the heap 
	- Explicit Allocators: application allocates and frees space
	- Implicit Allocators: applications allocates but doesn't free space
```c
void *malloc(size_t size) //returns pointer to a memory block of "size" bytes
void *calloc(size_t n, size_t size) //returns "n" memory blocks and "size" bytes
void *realloc(void* ptr, size_t size) //returns a resized block
```
- Internal fragmentation: if what you want to store in the block is smaller than the block returned by malloc 
- How it works:
	1. Header Field: keep the length of a block in the word preceding the block ![[IMG_2118.jpg]]
	2. Keep Track of Free Blocks (using an allocated bit): 
	3. Look at the header field of all free blocks: The program can use this header field to jump to the next block in memory 
		- Implicit List: 
			1. First Fit: Search list from beginning, choose first free block that fits (if block is way too big for data, this algorithm might waste space)
			2. Next Fit: Like first fit, but search list starting where previous search finished (to avoid rescans of blocks which are probably already allocated)
			3. Best Fit: Search the list, choose the best free blocks (where data fits with fewest bytes left over)
			- Splitting: since space needed might be smaller than free space, we want to split the block 
				- For alignment reasons: allocate an even number of bits for data storage (and then split the rest into its own block)
			- Freeing a Block: use `*p = *p & -2` (get at least significant bit for a memory block which start at p and flip it to 0)
			- Coalescing (Correct for fragmentation): when block is freed, you may need to merge blocks that are side by side. To do this, update the header field to be freed block 1 + freed block 2 (so that when program is jumping, it will treat it as a single block)
				- Bidirecional Coalescing: when a block is freed, check both in front of it and behind it to coalesce 
		- Explicit Free List: all we care about are the free blocks so only maintain a list of free blocks (still a linked list but blocks have pointers to any block they want not just consecutive). Uses the payload section of blocks for pointers
			- Splitting: even easier to implement with this method 
			- Coalescing: to coalesce, change the pointers of the list
		- Segregated Free List: there's different lists of blocks by size (list for 2 bytes, 4 bytes, 6 bytes...) which makes search way quicker
		- Blocks Sorted by Size: Can use a red-black tree (using the pointers in the list) to make search performance even better
- Garbage Collection: automatic reclamation of heap-allocated storage. (Compare this to past: we used explicit memory management where the user had to manually allocate and deallocate dynamic memory)
	- How to know what memory to free at what time: if there are no pointers to certain memory blocks then they can be trashed
	- Think of it like a graph: there are nodes that the user can reach (using pointers) and some nodes that aren't connected back to user
	- Process
		1. Use malloc normally until you run out of space
		2. Mark the blocks that are reachable (modifying malloc algorithm). Reachable means follow the chain of blocks 
		3. Sweep for the unreachable blocks and clean them out
[[Computer Systems]]
