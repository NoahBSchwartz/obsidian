Object = data type (can be methods, functions, lists). Class = description of object (has methods, data...). Great because we're hiding the details of how we're storing the data from the people accessing it!
1. Constructor: creates instance of object (instances are a single copy of the object)
	- Factory Pattern can also be used!
```scala
class Person(val age: Int, val name: String, val id: Int) {
	val extraField: Int = id * 2 //extra field not inside of class
	overrride def toString: String = name + birthday //constructor
	def getAge: Int = age
	def setAge: (new_age: Int) : Unit = {
		this.age = new_age //specify "this" to make sure we're using the object's age (not necessary tho)
		new Person(new_age, name, id) // alternate way, create new object
	}
}
// Factory Pattern: creates new objects (companion object)
object Person { //outside method, don't need a constructor
	def createPerson(day: Int, month: Int, year: Int, name: String, id: Int): Person = {
		new Person((month, day, year), name, id)
	}
}
val p = new Person((12, 15, 1958), "Joe Joseph", 100) //use constructor
Person.createPerson(10, 14, 25, "name", 200) //use factory
print(p.extraField)
```
2. Inheritance: helps with code reuse and readability (Diagram: base class at top, derived class at bottom, arrows point up)
	- Listkov Principal: you can always pass in a child where a parent is needed (pass in "Cat" where animal is needed). but the child's  
```scala
//Upcasting
val a1: Animal = new Cat // a1 gives cat behavior first and then animal behavior (dynamic dispatch)
//Normal Instantiation
val c: Cat = new Cat //c gives cat behavior first and then animal behavior (dynamic dispatch)
```
	Note: you can never make an Animal into a Cat bc it will be missing methods (only Cat->Animal)
		UNLESS you have first upcasted cat to animal, then you can downcast animal to cat
2. Traits and Classes
	- Classes: methods that the child class must implement
	- Trait: a collection of methods to be used in objects (either encompassed in trait class or encompassed in parent object)
		- Multiple Inheritance: one object can inherit from multiple parent objects (but bad because of dreaded diamond: if you implement the same method from A in both B and C, what should D inherit?): ![[Screenshot 2025-12-02 at 1.10.51 PM.png]]
			- Solve with mixin: take some functionality from Bat and  every trait of Car = Batmobile
				- Note: the order of mixin determines which method gets picked (in the case of diamond)
	```scala
	trait DebugPrinter {
		val debug: Boolean
		def debugPrint(s: String) = if (debug) println("Debug: " + s)
	}
	trait Ordering[T] { //takes generic type parameter 
	
	}
	
	class Car {
		def wheels: String = "round"
	}
	
	class BatMobile extends Car with Bat with SelfDriving with SuperHero with DebugPrinter{
		override def wheels: String = "black and spiky"
		def hook: String = "sick"
	}
	```
	Note: abstract classes can leave some traits unfilled whereas `class` must fill all traits
	Type Safety: means that if the original class doesn't have a method implemented, functions operating on the class can't assume anything
# Takeaways
1. Figure out what super does!!!