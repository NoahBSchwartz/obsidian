Programming Language: way to express computation
- Syntax is super different but semantics is very subtly different (what goes on under the hood is most important!) [[Scala]]
[[Grammars -> Inductive Data Types -> Building PL's]]
[[Semantics]]
[[Recursion]]
[[Understanding Languages Through Lettuce (Let-Bindings)]]
[[Garbage Collection, Memory Management]]
[[Continuations, Trampolines]]
[[Object Oriented]]
# Expression Oriented Programming
Style of programming where every single part of program should evaluate to an expression (in Scala any statement can be an expression) Don't use returns! (they are expressions but they bail out of control flow)
	Ex.`10` is an expression, `if x == 3: 10` is an expression, you can use expressions to build larger expressions
Rules:
1. `expression1; expression2; expression3`: Semicolon statements always return last expression (expression1, expression2 are "side-effects")
2. Every expression has a value `println({if(x == 0){10}})` prints "Unit" (ie. void)
3. If you ever write "IF" make sure there is an "ELSE" otherwise scala may add semicolons weirdly
```Scala
if (x<=10){15} {45} //imagine you forget an elese
if (x<=10){15}; {45} //this is what the compiler sees (return {45})

def foo(x: Int) = {if (x<=10){15} else {}} //println(foo(12)) prints Unit
```
Note: if returns aren't included, you must think about semicolons!
# Functional Programming
#### Tail Recursion
- Our goal is to use recursion!
	1. Bad recursion bc recursive stack will blow up!
	```scala
	def sum_of_list(lst : List[Int]) : List(Int) = {
		if (lst == Nil) { 0 }
		else {lst.head + sum_of_list(lst.tail)}
	}
	```
	2. Tail/lBenign Recursion
		- Tail Call = return func(x), Not a Tail Call = return 1 + func(x)
		- Tail Call Optimization: if you're just using tail calls then you can return the end value ALL the way to the front of the stack (stack frame doesn't have to grow at all!)
```Scala
@tailrec //tells compiler to treat as tail recursive function
def sum_of_list(lst:List[Int], sum:Int=0) : Int = {  //make the arguments of the function carry the data!
	if (lst == Nil){sum}
	else {sum_of_list(lst.tail, lst.head+sum)}
}
```
- Wherever there is an "IF" there should be an "ELSE"
### Purity
Purely functional programming has no side effects. Functions always return same output for same input, No global state changes occur, Evaluation order doesn't matter
- Side Effects: mutable variables (can change state), I/O operations (read files) (escape the scope of computation so that when function gets called again it doesn't return same value)
```scala
// Not purely functional!!
def modify_x(val : x) {
let x = NewRef(10) in 
let y = DeRef(x) + 1 in 
let z = AssignRef(x, y) in 
return z
}
```
#### Functors
Allows us to manipulate lists of objects and maps'
1. Background: Anonymous Functions (Lambda Expressions): functions defined without a name (good for when pass a function as an argument to another function)
```scala
val f: (Int => Int) = (x) => (x * 2) //takes in Int and returns Int, takes in x and returns x * 2
val f2: (Int => Int) = _ * 2 //knows that we only take in one arg so we don't need to name argument
```
2. Map, Filter, Fold (Reduce) Operations 
	- Map: apply function f to every member of a (list, array, map...) and return a new (list, array, map...)
	- Filter: remove all elements that do not satisfy a predicate
	- Fold: gather all data during computation
		- foldLeft means fun(l1, fun(l2, fun(...))) first->last
		- foldRight means fun(fun(fun(...), ln-2), ln-1) last->first
```scala
//Map Exaple
def squareEachElt(l: List[Int]) : List[Int] = l.map((x: Int) => (x * x)) // apply anon function "x => x * x" to every list elem
//Filter Example
def retaintAllMultiplesOfThree(l: List[Int]): List[Int] = l.filter((x:Int) => (x % 3 == 0))
//Fold Example
def sumListLeft(l: list[Int]): Int = l.foldLeft (0) ((acc, x) => acc + x)
def sumListRight(l: list[Int]): Int = l.foldRight (0) ((x, acc) => x + acc)
def reverseList(l: List[Int]): Int = l.foldLeft (Nil) ((listSoFar: List[Int], elt:Int) => {elt::listSoFar})
//Complex Example
def twoParts(lst: List[Int]) : (List[Int], List[Int]) =
{
	val (lst1, lst2, _) = lst.foldLeft((List[Int](), List[Int](), 0))
		{
			case((acc1, acc2, i), elem) => {
				if (i % 2 == 0)
				{
				(elem::acc1, acc2, i + 1)
				}
				else
				{
				(acc1, elem::acc2, i + 1)
				}
			}
		}
	(lst1.reverse, lst2.reverse)
}
//Zip Example
val result = iter.zip(iter1)
```
# Type Systems
Each language has a type system (strongly typed, weakly typed, untyped)
- Cool History: People asking questions about foundations of math (they thought sets were foundational) but you can define a set that's self-contradictory (Russel's Paradox) and people were very scared base was hollow. So we'll define levels that different object can have (types)
1. Python is superficially untyped (x + y = z, but "hello" * 2 = "hellohello")
	- Runtime Typed: python only checks types at runtime (no compile)
	- Statically Typed (compile time): every time a function is defined we have to say the type of the argument (if not we will get caught at compile time)
	- Strongly Typed vs. Weakly Typed: how do we manage type conversions 
		- (C lets you convert between nearly any type to the point of even looking at the memory slots of a struct to convert back to chars)
		- (Scala does not let you typecast at all, you need to write functions yourself to convert)
2. Vocab
	- Union Type: (`Int || Boolean`) this casting works in python but not Scala!
Does not stop you from writing certain bad programs (like division by 0, never halting)! And it will keep you from writing otherwise great programs!
# Gotchas
1. Make sure to use `case` when implementing grammars so that the compiler will implement the equals method
2. "`object MyNil() extends MyList`" use object whenever your terminal doesn't  have an argument 
3. `case MyCons(_, MyListsd) => {last_element{inner_lst}}` compiler matches MyCons to case MyCons so don't need vals (or even names)
4. Recursive lists need return types for some reason 
5. Much faster to prepend element (using `::`) to list than to append element (and then reverse when done)
	- You can append by: `result :+ currentDigits`
6. Not tail recursive! We have to wait for the inner g() to complete before calling the outer g()
```Scala
def g(x: Int, y : Int ): Int = { 
if (x <= 1) { y + 1 } 
else { g(x-2, g(x-1, x + y - 2)) } } 
```
7. Can't end the grammar sequence if there are any non-terminals left! 
8. This is also a valid (and maybe better) way to unwrap
```scala
def checkSingleAssignment(assign: Statement, declVars: Set[String]): Boolean = {
	assign match
	case assign(s1, e1) => {
		checkExpr(e1, declVars)
	}
}
```
9. ANDs evaluate 1st term and if false, don't evaluate second expression 
10. Need to be careful of out of scope (here, Z is out of scope)
```scala
let y = (let z = 15 in z * z)
in z + 100 //z is out of scope!
```
11. dont be dumb
```scala
var x = 5
x + 10
print(x) //prints 5
```
12. Scala thinks this program is recursive and would fail here (even though it works in lettuce)
```scala
let x = 15 in x = x //fails!
```
13. Even this easy scenario is called shadowing
```scala
int i;
int foo(int i) // local var i shadows global var i
{
	i + 1
}
```
14. d
```scala
//scopes are like nested eggs (so we can use y in the inner scope with no problems!)
val y = 10
def foo(x: Int) = {
	println(x + y)
}
```
15.  `(y + z) in environment [ z -> 15, y -> true, x -> 20 ]`
16. Cases are so useful! Use them whenever you need to unwrap any value or anything?
```scala
case ((accValues, currentStore), (fieldName, expr)) =>

val (v, newStore) = eval(expr, env, currentStore)

(accValues :+ v, newStore) // Append to maintain order
```
15. For `foo (45)(2)`, two function calls are made because outer inner
16. For closures, you need to pass in entire context of full environment
17. Scala is call by value! (you have to pass a val into a function, cannot be a var because var is just a pointer which might get changed)
	- < 1 byte: Call by value = each function takes in value of variable (a function can never change the variable!!)
	- >1 byte: In Python and Scala, for really big things (bigger than byte) we need pass around references (but we call it "call by value" and the value is just the reference to the class)
		Note: In C, reference is always passed around
```python
# Have to use deepcopy to maintain original list 
original_list = [[1, 2], [3, 4]]
deep_copied_list = copy.deepcopy(original_list) 
function(deep_copied_list)
```
