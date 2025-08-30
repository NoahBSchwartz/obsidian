Computers need to be able to represent real numbers (numbers w/ decimals)
- Note: place between bit 23 and bit 24 is known as the "binary point"
	Ex. `1011.101 = 2^3 + 2^1 + 2^0 + 2^-1 + 2^-3 = 11.625`
- Types of Representations
	1. Denormalized: if the 8 exponential bits are 0
	2. Special: if the 8 exponential bits are all 1's
	3. Normalized: if neither of other 2, it's normalized. Ie there's a leading 1 and the rest are fractional![[Screenshot 2024-01-29 at 4.00.03 PM.png]]
- Process: `(–1)^s * M * 2^E` (s is sign bit) (M fractional value between 1 and 2 ) (E weights value by power of two)
	- E is the actual exponent, exp is the exponent that will be stored in the binary 
	- Bias = 2^(k-1) - 1 where k is the length of the exponent section (8 in most cases)
![[Screenshot 2024-01-30 at 11.24.57 AM.png]]
- Normalized
![[Screenshot 2024-01-30 at 11.26.57 AM.png]]
	 E = 13, exp = 140, fractional = 1.11011010101, 
	 M = .11011010101, S = 1
- Denormalized
![[Screenshot 2024-01-30 at 11.26.20 AM.png]]
- Special Cases
	- Infinity: Exp is all 1's but fractional is 0 (can be positive or negative)
	- NaN: Exp is all 1's and fractional has value other than 0
	- Double means double precision (64 bit version of float)
- Rounding Modes:
	- Human Used: Towards zero (5.9 = 5), Round down (5.9 = 5), Round Up (5.2 = 6)
	- Computer Used: Nearest Even (5.9 = 6, 5.2 = 5, 5.5 = 6) round normally. Then when a number is between 2 whole #'s (3.5, 4.5...) round to the nearest even number (2, 4, 6...)
		- For fractions, round to "even." Even in binary whichever number has 0 as least significant digit
			Ex. No Tie Breaker: Round `2 + 3/32` = `2`
			Ex. Tie Breaker: Round `2 + 7/8`. Could either go to `2 + 3/4 (10.11)` or `3 (11.00)`. Answer = `3`
- Floating Point Arithmetic: an operation on 2 floating point numbers will yield a rounded value. `x + y = round(x + y)`
	Ex. `3.14 + 1e10` = `1e10'
- Real Number -> Floating Point: Ex. convert 0.40625
	`0.4625 * 2 -> 0.8125 * 2 -> (1.625 - 1) * 2 -> (1.25 -1) * 2 -> (1.5 - 1) * 2`
	 Fractional =` 0.01101`
	`1.01 * 2^-2` -> E = exp - bias(aka `2^k-1 - 1`) = 
	13 -> `001101001`
	 