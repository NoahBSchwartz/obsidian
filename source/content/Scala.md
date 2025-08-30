# Rules
1. Must initialize your variables (`val x` not allowed). Must initialize your lists too (val mixed_list= [] not allowed)
2. Must declare whether immutable or mutable
3. Cannot automatically convert between error types
4. Auto Garbage-Collection (No "delete")
5. Scala tries hardest to avoid nullptrs by returning "None" if you do something wrong (ie. `m.get(-1209)`)
# Syntax

```scala
println("Hello")
val x = 10 //declare a CONSTANT (don't need to specify int)
val x: Int = 10 //you can specify int if you want to
val z: Float = 10 //results in 10.0f 
var y = 20 // declare variable you can modify
val x = "298393892".toInt // convert between datatypes!
val x = "298393892".toDouble.toFloat.toString // convert between datatypes!
println(s"x = $x ") //String interpolation
println("hello" * 10) // prints "hello" 10 times
```

```scala
def repeat(name: String) : String = { //takes in String (must define this), returns String
	return name
}
repeated = repeat("Noah")

def fun2(x: Int, y: String) : Int = { //return type declared as int
	return x + y.length //then we can use a return statement
}
def fun = {1} //simpler, implicitly returns 1. Don't need parantheses if no inputs!

fun2(x: Int) //returns x not x + 1!

class Cat(val color: String, val name: String, val breed: String, var age: Int){
	var num_lives: Int = 9
	def happyBirthday : Unit = { //no return
		age = age + 1                                                                                                      
	}
}
val c: Cat = new Cat("gray", "seuss", "mixed", 8) //immutable Cat object (can't change object type), but has mutable inside (age)
c.age = c.age + 1
c.happyBirthday //Not allowed to use parantheses because we didn't define function w parans!
print(c.age) //adds 2 to age

extension(self: Cat) //add more classes to Cat
{
	def curiosity() = {self.numLives = self.numLives - 1} 
}
```

```Scala
val l : List[Int] = List(1, 2, 3, 4, 5) //all lists are singly linked (and always immutable!) O(1)
val l2 = List(1, 2, 3, 4, 5) //equivalent to above
val l3 = l ++ l2,  //adds to back fo stack: l3 = (1, 2, 3, 4, 5, 1, 2, 3, 4, 5) O(n)
val l5 = -15 :: l //adds to stack: l5 = (-15, 1, 2, 3, 4, 5) O(1)
val tl = l.tail //pops off stack: tl = (2, 3, 4, 5) O(1)
val mixed_lis = List(1, 2, 3, "hello")
val m: Map[Int, String] = Map((1, "dog"), (2, "world"), (3 -> "car")) // like a dict! immutable! (arrows just syntactic sugar)
println(m.get(1) + m.contains(-1209) + l2(1)) // prints helloFalse2
```

```scala
for (i <- (0 to 10)){ //syntax: i <- "some iterator" (ie. list, range ...)
	println(i) //Note: this prints 11 numbers, 0 TO 10!
}
def sumUp(l: List[Int]): Int = {
	var sum = 0
	val n = l.length
	for (i <- 0 until n) { //O(n^2) because of linked-list. Horrible! 
		sum = sum + l(i)
	}
	for(x <- l){ //only O(n) because we're going slot by slot!
		sum = sum + x
	}
	return sum
}
```
# Gotchas 
```Scala
var i = 0 //global scope
fpr (i <- 0 to 10){ //local scope
	println(i)
}
println(i) //prints 0

def find(l: List[Int], elt: Int): Boolean = {
	for(x <- l){
		if (x == elt){
			return true //not allowed!! because scala thinks of for loops as functions (so which function do we return from?)
		}
	}
}
```