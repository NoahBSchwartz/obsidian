- Convert Binary to hex, hex to binary, decimal to binary, hex to decimal...
				- Fill in the rest w/ 0's. Example below would be 00001101![[Screenshot 2024-01-21 at 3.09.21 PM.png]]
- In binary the bit # is from right to left. (ie. rightmost bit is bit 0, next is bit 1, and so on)
- For speed: 0 -> 0000, 1 -> 0001, 2 -> 0010, 3 -> 0011, 4 -> 0100, 5 -> 0101, 6 -> 0110, 7 -> 0111, 8 -> 1000, 9 -> 1001, A -> 1010, B -> 1011, C -> 1100, D -> 1101, E -> 1110, F -> 1111
- Memorize:
								![[Hexadecimal-To-Binary-Conversion-Table 1.jpg]]
- Order of Memory Usage is char, short, int, long, float, double
	- char, short, int, long represent integers
	- float, double, long double represent real number 
- Remember: `!00010101` = `00000000` but `~00010101` = `11101010`
	- Also remember (&&, ||, !) is different from (&, |, ~)
		Ex. `0x69 && 0x55 = 0x01`
	- Remember: `~x + 1 = -x`
- Memorize? 
								![[Screenshot 2024-01-22 at 5.05.34 PM.png]]
- Two’s-complement encodings: start with the positive version and invert every bit, then add one. If the left most bit is 1, the number's negative. 0 for positive
	- This is the standard, don't get confused and use unsigned
	- The function B2T means binary 2 two's complement
- For an n-bit number the binary range is `[-2^(n-1), 2^(n-1) - 1]`
	- ie. for a 3 bit number the range is `[-4, 3]`
- Remember the difference between arithmetic and logical (arithmetic used for signed integers, logical used for unsigned)
	- `0xb01dface << 8` becomes `0xb01dfa` (because each char is 4 bits)
- Remember what `w` is, know how to plug it in for questions like this: "in the case of overflow compute `sum` - `2^2w`"
- Is it the same method for handling overflow in multiplication and addition? 
- Look back over this (Some parts are wrong)
	 Real Number -> Floating Point: Ex. convert 0.40625
	`0.4625 * 2 -> 0.8125 * 2 -> (1.625 - 1) * 2 -> (1.25 -1) * 2 -> (1.5 - 1) * 2`
	 Fractional =` 0.01101`
	`1.01 * 2^-2` -> E = exp - bias(aka `2^k-1 - 1`) = 
	13 -> `001101001`
	 
# Memorization
- For dealing with overflow in addition and multiplication remember `- 2^w`
- Subtract `1101 - 1010` in binary
- Add `0111 + 0111` in binary, the answer must also be 4-bits
- There is an implicit leading 1 for normalized vs no implicit leading 1 for denormalized  (M has a leading 1 vs a leading 0)
- When representing .00120220 in binary divide like normal but then you put all the binary bits together backwards
- converting int to a float = converting double to float because both are rounded in the same way
- Remember how 2's complement works
# Practice Problems
- Write a C function **overflow** that returns true if the sum of the two unsigned long arguments would overflow when using unsigned 64-bit arithmetic
  - Represent 2400.045 in binary 
  - `(1e20 * 1e10) * 1e-20` = ? (remember overflow)
![[Screenshot 2024-02-05 at 6.23.41 PM.png]]
- Question will either ask you to round by truncation or to round to nearest even
- Convert 13 to a float
- Convert 45F (base 16) to binary
- Add -7 + -9 in binary with signed values
# Review Session
### Notes
1. Pay special attention to whether they say signed or unsigned on the exam. The lowest signed number is 1000... lowest unsigned = 0000...
2. Pay special attention to what size the question asks for (6-bit, 7bit...)
3. Signed and unsigned are different from floating point numbers
4. Convert -12 to a 6 bit binary value: put 1 in the first spot and then you know the next spots have to equal 20
5. Hex to binary:  2^4 = 16 meaning 4 bits of binary = 1 bit of hex 
	- Ex. Convert 453 (base 16) to binary: 
		4 = 01000, 5 = 0101, 3 = 0011 -> 0100001010011
	 - Ex. Convert 453 (base 8) to binary:
		 5 = 100, 5 = 101, 3 = 011 -> 100101011
	- Ex. Convert 10100110101 to octal
		 Start from LSB (right side) and make groupings of 3: 
		 010 = 4, 100 = 4, 110 = 6, 101 = 5 -> 4465
6.  Remember that XOR is ^, remember the difference between & and &&
7. Always do the calculations with 2 binary numbers instead of with 2 decimals, then converting the result to binary (because of overflow)
8. e is the unbiased exponent (the value of the exp section in binary) = new og = E the biased exponent 
9. Remember to study how to round
10. Study the one chart she showed of infinities and stuff. How to know if a number equals infinity?
11. If there's a subtraction problem, remember that you can use 2's complement.
12. Remember to add a 1 when working with normalized
13. Write down what a "mantissa" is (mantissa includes the leading 0 or leading 1: ie. 1.11010 or 0.10101)
14. When going from decimal to unsigned, if you find out it's unsigned, just write the full # as fraction bits
15. 1_0000_000 is just 0 (you got this wrong because you didn't multiply the mantissa = 0 in for the final answer)