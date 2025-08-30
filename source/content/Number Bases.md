- Hexadecimal (aka. char data type): Makes for a compact representation of binary (16 digits so that one character = 4 bits ie. F = 1111)
	- Binary-> Hex: look at groupings of 4 and use the table to convert
									![[Hexadecimal-To-Binary-Conversion-Table.jpg]]
	- Hex-> Decimal:  multiply each of the hex digits by corresponding power of 16
		- Ex. `0x7AF -> 7 * 162 + 10 * 16 + 15` = 245
	- Decimal-> Hex: Divide by 16 and mark down remainder (all the way down until you get to ex. 13/16 where you'll mark down D as the most significant bit)
- Binary: 
	- Binary -> Decimal: use `2^0, 2^1, 2^2, 2^3...` trick
	- Decimal-> Binary: Divide by 2 and mark down remainder (all the way down until you get to 1/2 where you'll mark down 1 as the most significant bit of the binary). Pad w/ 0's on the left if needed ie. 00001
[[Computer Logic]]
[[Interger Arithmetic]]
[[Floating point]]
