- Boolean Operations: just do them as expected ie. 0001 & 0011 = 0001
- Representing Finite Sets: Put a 1 wherever the # is part of the set ie.  `a = [01101001] is the set A = {0, 3, 5, 6}`
	- Boolean operations `|` and `&` correspond to set union and intersection
- Bit Level Operations (`&, |, ~`): boolean logic that works with bytes
	ie. `[0110 1001] & [0101 0101]`
	- Masking operations: bit patterns can indicate a selected set of bits within a word
		Ex. x & 00000001 = least significant byte with all other bytes = 0
- Normal Logical Operations (`&&, ||, !`): different behavior from bit level, treat any nonzero argument as true and argument 0 as false
	- don't evaluate their second argument if the result of the expression can be determined by evaluating the first argument
		 Ex. `0001 && 0000 = 0` but `0001 && 1001 = 1`
		 Ex. `!0x00 = 0x01`
- Shift Operations (`<<` or `>>`): shifting bit patterns to the left and to the right
	- Logical: right shift fills the left end with zeros
	- Arithmetic: right shift fills the left end with k repetitions of the most significant bit
		Ex. `10010101 >> 3`: logical = `00001001`, arithmetic = `11111001`
		Ex. Change 2nd to last byte to `0xbd`: 
			`(0xb01dface & (~(0xff << 8))) | (0xbd << 8)`
[[Symbolic Logic]]
