# Rules
1. Must initialize your variables (`val x` not allowed). Must initialize your lists too (val mixed_list= [] not allowed)
2. Must declare whether immutable or mutable
3. Cannot automatically convert between error types
4. Auto Garbage-Collection (No "delete")
5. Scala tries hardest to avoid nullptrs by returning "None" if you do something wrong (ie. `m.get(-1209)`)
# Terminology
1. Attributes 
	- Public Immutable String (ie. `val Name`)
	- Private Mutable Integer (ie. `private var idx = 0`)
	- Public Member Function (ie. `def bark() = {}`)
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
val s = "hello"
s.substring(1, s.length - 1) // gets "ell"
s.charAt(i) //returns value of character at position i
s.updated(i, c) //update char at position i with c
r = [12, 4, 3]
r._2 // returns '4' (2nd component of tuple)

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

object MichaelJackson { //with the "object" keyword, only one object of that type can exist in code (no arguments allowed)
	val songs: List[String] = List("Bad") 
	def sing(x: String): String = {
		return x
	}
}
extension(self: Cat) //add more classes to Cat
{
	def curiosity() = {self.numLives = self.numLives - 1} 
}
enum Habitat:
	case Forest, Grassland, Wetland, Desert, Tundra, Mountain, Urban, Cave
	
override def toString() : String = {s"$genus $species $habitats, $aClass"}
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

def collectReachable(map : Map[String, String], start : String, step_num : Int) = {
	var x = 0
	var reachable_places = new Array[String](step_num+1)
	reachable_places(x) = start
	var y = map.get(start)
	while (y.isDefined && x < step_num) do
	{
		x += 1
		reachable_places(x) = y.get
		y = map.get(y.get)
	}
	val r = reachable_places.take(x + 1)
	r.toList
}

def add(x: Int)(y: Int) = {x + y} // curried function
def sum_k[T](m: Int, n:Int, k:Int=>T): T //make function return generic type
```
# Gotchas 
```Scala
var i = 0 //global scope
for (i <- 0 to 10){ //local scope
	println(i) //"to" is inclusive so this executes 11 times (0->10)
}
// use for (i <- 0 until 10) to execute 10 times (0->9)
println(i) //prints 0

def find(l: List[Int], elt: Int): Boolean = {
	for(x <- l){
		if (x == elt){ //don't have to use then if you use paranthesese!
			return true //not allowed!! because scala thinks of for loops as functions (so which function do we return from?)
		}// always have to put an else after an if! (if we have a return type for the function) or else compiler throws error
	}
}

val x = "Hello" //remember that vals are immutable!
val y = 10
val z = x + y //totally fine because Scala implicitly converts int to string like python
println(z) //prints Hello10

  

def calculateYear(daysSinceEpoch: Int): (Int, Int) = {
	while (days > 365)
	{
		if (days > 366) //leads to infinite loop, must always have else 
		{	
		days -= 366;
		year += 1;
		}
	}
}

def searchBST(x: Int, bst: BST): Option[Int] = bst match { //Option corresponds to None or Some (just so we don't return Null)
if (isEmpty)
	None
else
	Some(value)
}

//scopes are like nested eggs (so we can use y in the inner scope with no problems!)
val y = 10
def foo(x: Int) = {
	println(x + y)
}
```