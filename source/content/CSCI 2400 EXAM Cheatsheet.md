# Architecture
- Instruction Set Architecture (ISA): abstract model of computer, describes instructions supported by computer
- Buses: wires running throughout designed to carry byte chunks
- Main Memory: temporary storage that holds program (and any data it manipulates) while its being executed by the processor
- Processor (CPU): the engine that executes object file
	- Register: smallest data holding element built into processor
	- Program Counter: register holds address to next instruction
- Cache Memories (caches): stores small amounts of data so that future requests for that data can be served faster
- Memory Hierarchy: top devices faster, smaller, pricier than lower
	- Registers, L1 cache, L2 cache, RAM, Disks, Remote Storage
- Run-Time
	1. Processor read the instructions sent from the register
	2. It either Loads (copy main memory -> register), Stores (copy register -> main memory), Operates (copy 2 registers -> ALU, perform arithmetic operation, store result in register), Jumps (extracts byte from the instruction itself and copy -> program counter)
		- Arithmetic/Logic Unit (ALU): computes new data
	3. Updates program counter to point to next instruction
- Virtual Address Space: virtual memory + addresses. Used to allocate all memory (pointers store where things are in this space). Storage capacity =  `(2^w) - 1` (w = word size = 64bit)
	- Ex. for int x, if &x (pointer to x) at 0x100 then the addresses of its bits are: 0x100, 0x101, 0x102, and 0x103
- Source Code: text file that coder creates, stored in bits
	- Text File: the source program that the coder sees
	- Binary File: all other files (machine readable). All info in bits
- From Source Program -> Executable
	1. Preprocessing Phase: inserts headers (`#`) into program
	2. Compilation Phase: text file -> assembly file
	3. Assembly Phase: assembly file -> object file (binary)
	4. Linking Phase: Every function in og program has its own object file which linker merges into 1 (binary) executable
	![[Screenshot 2024-02-09 at 1.11.18 PM 2.png]]

# Things to Check For
- Normal Logical Operations (`&&, ||, !`): different behavior from bit level, treat any nonzero argument as true and argument 0 as false
- Denormalized has no implicit leading 1 while normalized does
- Make sure nothing causes an overflow (ex. `(1e20 * 1e10) * 1e-20` = ?)
- Make sure the exponent is always in biased form (missed when doing 13.0->binary)
- If you need to do any work with negative numbers, first use their positives, flip and add 1. (Always add and subtract with binary, then convert to decimal)
- Pay special attention to whether they saw signed or unsigned on exam =
- Pay special attention to how many bits your answer should be
- TMax = 0111111111111..., TMin = 100000000000...
- Exclusive Or: `p ^ q`
# Unsigned and Signed (Two's Complement)
1. Unsigned Encodings: Add a `u` suffix to declare (12345U or 0x1A2Bu)
2. two's-complement -> unsigned 
	If two's complement is negative, you add `2^2w` to it ( `w` is word size). If positive, it remains the same
3. unsigned -> two's-complement
	 If unsigned is less than the maximum of two's-complement it remains the same. If greater, then `2^2w` is subtracted from it
4. Make a number negative: start with the positive version and invert every bit, then add one
5. Arithmetic
	 - `0xb01dface << 8` becomes `0xb01dfa` (because each char is 4 bits)
	- More Complex: `x * 14 = (x << 3) + (x << 2) + (x << 1)`
	- Dividing instructions can also be replace with shifts
		- Unsigned: Use logical shift (and truncate to get nearest whole number)
		- Signed: Use arithmetic shift (and truncate)
# Floating Point
- Place between bit 23 and bit 24 is known as the "binary point"
- `(–1)^s * M * 2^E` 
- Bias = 2^(k-1) - 1
- new = e = unbiased exponent = (the value of the exp section in binary) 
- og = E = the biased exponent = (the value of the exp in decimal)
- Mantissa: includes the leading 0 or leading 1: ie. 1.11010 or 0.10101
	![[Screenshot 2024-02-09 at 2.24.19 PM.png]]
- Infinity: Exp is all 1's but fractional is 0 (can be positive or negative)
- NaN: Exp is all 1's and fractional has value other than 0
- Rounding With Nearest Even: round normally but tie breaker is round to the nearest even (whichever number has 0 as least significant digit)
	Ex. No Tie Breaker: Round `2 + 3/32` = `2`
	Ex. Tie Breaker: Round `2 + 7/8`. Could either go to `2 + 3/4 (10.11)` or `3 (11.00)`. Answer = `3`
- Floating Point Arithmetic: an operation on 2 floating point numbers will yield a rounded value. `x + y = round(x + y)`
# Changing Bases
- Convert 10100110101 to binary: Start from LSB (right side) and make groupings of 4
![[Screenshot 2024-02-09 at 2.22.21 PM.png]]
# Understand
- Files are abstractions for I/O devices, virtual memory is an abstraction for both the main memory and disk I/O devices, and processes are abstractions for the processor, main memory, and I/O devices.
- Is it the same method for handling overflow in multiplication and addition