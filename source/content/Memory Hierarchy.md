![[Screenshot 2024-04-01 at 3.48.29 PM.png]]
- SRAM (Static RAM): much faster and more expensive because it's using registers
- DRAM (Dynamic RAM): denser and slower, used in main memory (must be refreshed ie. data must be rewritten every once in a while b/c it uses capacitors)
- Nonvolatile Memory: retain value even if powered off
	- Read Only Memory (ROM): programmed during production
		- Programmable ROM (PROM)
		- Electrically Erasable PROM (EEPROM): can be electronically erased
	Ex. Operation: `movq A, %rax`
	1. CPU places address on the memory bus
	2. Main memory reads from A, retrieves word and places it on bus
	3. CPU reads word x and copies to register `%rax`
- Hard Drives
	- Capacity =  `(# bytes/sector) x (avg. # sectors/track) x (# tracks/surface) x (# surfaces/platter) x (# platters/disk)`
	- Read Time = Seek Time (time to move arm) + Rotational Delay (time to find info) + Sector Transfer Time (time to spin disk to sector)
- Principle of Locality: Programs tend to use data and instructions with addresses near or equal to those that they just used
### Cache Memories
Small, Fast SRAM-based memories managed automatically in hardware. Caches take advantage of locality to save memories that the system thinks will be needed the most 
- Direct Cache (only 1 block per set): faster because don't need to compare tags but more susceptible to misses
- Associative (2 blocks or more): slower and more expensive but more reliable
1. CPU looks for data in cache
2. Data is placed in registers
- Cache Hit: what you're looking for is in cache. Cache Miss: what you're looking for is not in cache
	- Cache Miss is used for metric because 3% miss vs 1% miss matters a lot![[Screenshot 2024-04-03 at 3.58.47 PM.png]]
	Ex. Take a direct mapped cache (where there's only 1 line per set). 
		Valid Bit | T-bits, S-bits                                 | data bits 
		1             | tag of address, which set its in.   | 01010101010110
	Ex. B = 2 bytes /block, S = 4 sets, E = 1 block/set ![[Screenshot 2024-04-03 at 4.13.03 PM.png]]
	S-bits = 2^s -> there are 4 rows so 2^s means s = 2
	B-bits = 2^b -> there are bytes per block means b = 1
	Tag-bits = needs to encompass both so t = m - b -s = 1
- Write-Hit: Address is available in cache but once we write the data, we will have inconsistent data across our caches (ie. movq %rdi, (%rbx))
	- Occurs because of stacking caches (where Main Memory -> Cache 3 -> Cache 2 -> Cache 1)
	- Write-Through: update all levels when a write-hit occurs (lots of traffic)
	- Write-Back (Write-deferred): Defer write to memory until eviction replacement of line
- Write-Miss: 
	- Write-allocate: load into cache, update line in cache
	- No-write-allocate: writes straight to memory, does not load into cache