Custom Malloc: At runtime you create (allocate) your own memory and delete (deallocate) memory. Garbage-Collected Languages (scala, python, java) do this for you
	- Syntactic Garbage (unreachable memory): all the memory references to objects that go out of scope (ie. we define x and then use it once and are done) (if x points to a whole linked list `x = new(new(new(new(45))))` and goes out of scope then delete whole list)
	- Semantic Garbage: when we tell interpreter the garbage (ie. x = newAddr(5), x = None)
- Solution: We can freeze-frame interpreter and run garbage collector occasionally:
	1. Mark and Sweep: graph has some entry nodes (env, program, roots) and we do a graph traversal to find all cells we can reach
	2. Reference Counting (continuous garbage collection): in every cell in your store you have an extra counter which counts how many pointers from program can reach cell directly (if count is 0 then we garbage collect it) (the way smart pointers work)
		- Note: if you have a cyclic set of references it will never be collected (bc there's always 1 reference)
# Call by Value, Call by Reference
1. Scala is call by value! (you have to pass a val into a function, cannot be a var because var is just a pointer which might get changed)
	- < 1 byte: Call by value = each function takes in value of variable (a function can never change the variable!!)
	- >1 byte: In Python and Scala, for really big things (bigger than byte) we need pass around references (but we call it "call by value" and the value is just the reference to the class)
```python
# Have to use deepcopy to maintain original list 
original_list = [[1, 2], [3, 4]]
deep_copied_list = copy.deepcopy(original_list) 
function(deep_copied_list)
```
```scala
class MyClass(var x: Int, var y: Int)
def swap(c: MyClass) {
	val tmp = c.x
	c.x = c.y
	c.y = tmp
}
val c1: MyClass = new MyClass(10,15)
swap(c1)
```
		Note: In C, reference is always passed around
