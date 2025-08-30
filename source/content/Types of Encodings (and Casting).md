Order of Memory Usage is char, short, int, long, float, double
1. Unsigned Encodings: only represent nonnegative numbers and one that can represent negative, zero, and positive numbers. Add a `u` or `U` suffix to declare (12345U or 0x1A2Bu)
	- Have different ranges depending on signed/ unsigned and 32/64 bit (standardized minimum ranges across machines though)
		Ex. signed int: minimum is −2,147,483,648 maximum is 2,147,483,647
	- Casting From Signed to Unsigned: keep the bit values identical but change how these bits are interpreted (ie. the numeric value changes but the underlying bits don't). The sum of a number and its unsigned equivalent is equal to `2^2w` (w = word size: usually 32 bit or 64 bit)
		Ex. (unsigned short) -12345 = 53191
		- For large unsigned values (where most significant bit is needed), the signed form just becomes -1
2. Two’s-complement encodings: This is the standard. Method for representing positive and negative integers in binary form. To represent a negative number, start with the positive version and invert every bit, then add one. If the left most bit is 1, the number's negative. 0 for positive
		Ex. 1001 = -8 + 0 + 0 + 1
	- `T2Uw` two's-complement -> unsigned
			If two's complement is negative, you add `2^2w` to it ( `w` is word size). If positive, it remains the same
	- `U2Tw` unsigned -> two's-complement
			If unsigned is less than the maximum of two's-complement it remains the same. If greater, then `2^2w` is subtracted from it
		Note: Conversions can be explicit (through casting) or implicit (assigning values of 1 variable to another)
	- overflow looks like: 123e10 + 2432e10 = -1232e10 (associative)
3.  Floating-point encodings
	- overflow looks like: (not associative depends on order)
		Ex. 10^20 + 3.14 - 10^20 = 0
- C-Specific Details
	- C language gives a variety of ways to order key words:  
		`unsigned long = unsigned long int = long unsigned...`
	- In C, when a signed and an unsigned integer are used in an operation, the signed integer is implicitly cast to unsigned
		- In most cases, just don't use unsigned to avoid any errors
- Expanding the Bit Representation of a Number: int w/ small word size-> int w/ large word size 
	- Unsigned-> Larger: use Zero Extension, add leading 0's (preserves numeric value)
		Ex. Convert `53191u` (short int) to long int. `cf c7` -> `00 00 cf c7` aka `53191`
	- Two's Complement-> Larger: use Sign Extension, add copies of the most significant bit onto the end 
		Ex. Convert `-4` to unsigned. `1110` -> `11111110` aka `-4 -> -4`
- Truncating: reduce the number of bits used to represent a number by discarding all of the higher order bits (remove bits from left-> right).  Same thing as a mod `%` operation
	- Unsigned -> Short Int: discard the higher bits 
	- Two's Complement -> Short int: after discarding higher bits , convert the most significant bit into a sign bit (may flip positive to negative) 
