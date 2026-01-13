### Semantics
the meaning of the program. Syntax doesn't matter it's all about semantics. This is the underlying machinery that effects everything (ie. if something goes wrong, do we keep going or stop right where we are)
- Operational Semantics: what do I get when I execute a program
	- Big Step Semantics: 
			Example of Sequent Notation: IF (e1 = v1) and (e2 = v2) THEN plus(e1, e2) = v1 + v2
	```
	ARITHMETIC EXPRESSIONS
	// Plus Sequent Notation
	eval(e1, env) = v1, v1 /in R, eval(e2, env) = v2, v2 /in R             eval(e1, env) = error || eval(e2, env) = error
	------------------------------------------------                       -----------------------------------------------  
	          eval(Plus(e1, e2), env) = v1 + v2                                      eval(Plus(e1, e2), env) = error
	
	//Eval Sequent Notation
	x in domain(env), v = env(x)                                                             x notin domain(env)
	----------------------------                                                          ------------------------
	eval(var(x), env) = v                                                                  eval(var(x), env) = 0.0
	```
	- Short-Circuit Semantics: if first expression returns an error -> short circuit and return error. 
		If first expression of AND is false -> short circuit and return false
	```
	BOOLEAN EXPRESSIONS (ie. Expr => Leq(Expr, Expr) | And(Expr, Expr) | ...)
	//Leq Sequent Notation (enforce that both inputs are int and out is bool)
	   eval(e1, env) = v1, v1 \in R, eval(e2, env) = v2, v2 \in R
	 --------------------------------------------------------------                                    
	  eval(Leq(e1, e2), env) = {true if v1 <= v2, false if v1 > v2}
	  
	//And Sequent Notation
	eval(e1, env) = v1, v1 \in Boolean, eval(e2, env) = v2, v2 \in Boolean                   eval(e1, env) = false
	----------------------------------------------------------------------              -----------------------------
	                 eval(And(e1, e2), env) = (v1 & v2)                                 eval(And(e1, e2), env) = false
	```
		Note: env gives values to variables (ie. env defines that e1 can be a number, bool, string)
	- Denotational Semantics: what do different parts of a program mean
### Eval ([[Understanding Languages Through Lettuce (Let-Bindings)]])
1. Let-Bindings: how programs grow in variables
	- (ML family of languages) = OCaml, SML-NJ, F#, ELM
	- Simplest Form: let var = expr in expr (ie. `Let(String, Expr, Expr))
```scala 
// Theoretical                 //Scala                                             //Abstract Syntax
let x = 15 in                {val x = 15                 Let("x", Const(15), Let("y", Const(25), Plus(Var(x), Var(y)))
	let y = 25 in    ---->    val y = 25       ----> 
		x + y                 x + y}
		
let x = (let y = 10 in        val x = { val y = 10 // Be careful of scope! y is only defined within x let function
			y + 5) in   ---->       y + 5} 
				x + 10                 x + 10
```
	 	You use `let` to update your environment before executing `in` (using env_o). Below we add 'name' to env
```
eval(e1, env) = v1, v1 != error, env2 = env_o {name -> v1} 
----------------------------------------------------------
	eval(Let(name, e1, e2), env) = eval(e2, env2)
```
2. Execution Flow 
```scala
eval(let x = 25                       eval(let y = 42
		in let y = 42           --->      in let x = 15
			in let x = 15                       in x - y, θ{x->25})
				in x - y, θ)
```
	You need to remember variable shadowing (inner var has same name as outer var). But compiler handles situation like above fine 
3. Scala scoping: use curly braces to replace let/in
```scala
{
	val x = {
		val x = 15
		x + 15
	}
	x + 5
	println(x) //valid
}
println(x) //not valid
```
4. Static vs Dynamic Scoping: if you capture value at compile time its static, if capture it at runtime then dynamic
	- Static: If the y in the function below takes on value 10 then its static (most common)
		- Allows for callbacks: one function can return another functions object
	- Dynamic: if the y value is 20 then its dynamic scoping
```scala
{
	val y : Int = 10
	def foo(z: Int) = {z + y}
	{
		val y: Int = 20
		foo(30) 
	}
}

//callbacks
def hello(x:String): (() => Int) = {
	val msg = "How are you"
	def greeter():Int = {
		println(s"Hello $x, $msg")
	}
	greeter 
}
val foo = hello("Noah")
foo() //call hello which calls greeter which prints "Hello Noah, How are you"
```
