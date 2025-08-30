Sometimes adding and multiplying 2 numbers gives surprising results (because sum of 2 numbers can't be represented within computer's word size)
- Unsigned
	- `X + Y`: if X and Y are both less than `2^w` the sum can require up to w + 1 bits (simply handled by cutting off bits to get down to `w`)
		- This means in the case of overflow, the program computes a modulo (the computer outputs `sum - 2^w`) (Note: 3 mod 5 = 2 )
		- Detection: see if result is less than X or Y
	- Multiplication: The product may require up to `2w` bits to represent but the program uses modulo `2^w` (product - `2^w`) to get it down to `w`
- Two's Complement
	- `X + Y`: normally just works like addition but in the case of overflow:
		1. Positive Overflow: The sum exceeds the maximum representable positive value, and `2^w` is subtracted from the sum
		2. Negative Overflow: The sum is below the minimum representable negative value, and `2^w` is added to the sum
		- Detection: if X and Y have a different sign than their sum 
	- Negation: The inverse of X is just whatever number is added to it to result in 0 (ie. for 4, the inverse is -4)
		- Note: the minimum value's (-23342...) negation is itself (-23342...) because adding those 2 together overflows to 0
	- Multiplication: same as unsigned multiplication but the program interprets the result as 2's complement 
		- Note: 2's complement product = unsigned product when overflowed
- Constants (both unsigned and two's complement)
	- Multiplication instructions are slower than shifts and additions so some compilers optimize by replacing it (especially for powers of 2)
		- Multiplying unsigned int x by `2^k` = shifting x left by k positions
		- Effect of shifting leads to same overflow as normal multiplication
		- Techniques:
			- Power of 2: `x * 8 = (x << 3)`
			- More Complex: `x * 14 = (x << 3) + (x << 2) + (x << 1)`
	- Dividing instructions can also be replace with shifts: `u/(2^k) = u >> k`
		- Unsigned: Use logical shift (and truncate to get nearest whole number)
		- Signed: Use arithmetic shift (and truncate)
			Ex. `-12340 >> 1 = -6170`
	