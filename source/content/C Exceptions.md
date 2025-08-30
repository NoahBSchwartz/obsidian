- *make a note of "exclusive or" somewhere*
- printf doesn't use type information so be careful not to mix up %u (unsigned integer) and %d (signed integer)
- when a signed and an unsigned integer are used in an operation, the signed integer is implicitly cast to unsigned
		ex. Comparing -1 < 5u becomes 4294967295U < 5u (u = unsigned)