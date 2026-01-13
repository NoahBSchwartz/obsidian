### Parts
Boolean, algebraic expression, let/in, functions, error, closure. Lettuce is untyped
- Functions
```scala
//Grammar
Expr => 
	// Vanilla
	| Var(string)
	| Plus...
	| Let...
	//Functions
	| FunDef(String, Expr) 
	| FunCall(Expr, Expr)
	//Recursion
	| LetRec(String, String, Expr, Expr)
	| ExtendRec(f, x, e, σ)
	//Explicit
	| New(Expr)
	| Deref(Expr) 
	| Assignref(Expr)
	//Implicit
	| LetVar(String, Expr, Expr) //let id = e1 in e2
	| Assign(String, Expr)
//Abstract Application
let f = fun(x) {x + 5} in f(15) ----AST---> Let("f", FunDef("x", Plus(Var(x), Const(5))), FunCall(Var("f"), Const(15)))  
// Scala Syntax
((x: Int) => {x + 5})(15)  
```
- Closure/ Closure Capture (all info you need to know about function to execute it): To evaluate function you need to know what name of the param is (x), the action to execute (x + 1), the environment it was created in (z = -10)
	`Closure(name of param (id), body Expr, Environment)`
	- Values that arise when program is executed: error, bool, numbers (see [[Semantics]]) and now Closure
```scala
let f = fun(x){x + 1 + z} in let z = -10 in f(10)

val z = 10
{ // Inner Scope 1
	def foo(x: Int) = {x + z}
	{ // Inner Scope 2
		val z = -10
		foo(10)
	}
}

let f = function(x){x + 5}     ------>     Closure("x", x + 5, NIL)
f(15)                          ------>     eval(x + 5, NIl o {"x" -> 15})
```

``` Semantics
FunDef (super simple): eval(FundDef(id, e), env) = Closure(id, e, env)

FunCall: check function to make sure closure is good, check to make sure arg is good, check to make sure body is good under the environment mapping arg to closure!
```
### Currying
Defining multi-argument functions as series of nested single parameter functions (because all functions in lettuce are single argument!)
```scala
// Example 1: get around the fact that lettuce doesn't allow for multiple inputs
let add = fun(z) {
	fun(y) {          --Scala Syntax--->    def add(x: Int) = { 
		y + z                                    return (y: int) => {x + y}
	}                                        } 
}                                            val f1 = add(5) //f1 is a higher order function
in (add(5))(4)                               f1(4)           

// Example 2: pass in function to get around single-input restrictions
let f = higher_order_fun(g) {
	g(10)
} in f(higher_order_fun(x){x + 5}) // returns 15
```
# Recursion
If we try to do recursion, we immediately go out of scope (because a function can't call itself yet)
1. We can translate [[Formal Systems]] into lettuce to get recursion
	- `I` = $\lambda x.x$ = `fun(x) x`
	- `K` = $\lambda x.\lambda y.x$ = `[fun(x)fun(y)x]`
	- `S` = `fun(x)fun(y)fun(z)`
2. We can translate arithmetic:
	- $\lambda$s $\lambda$z.z = 0
	- $\lambda$s $\lambda$z.s(z) = 1
	- $\lambda$s $\lambda$z.s(s(z)) = 2
	- 1 + 2 ---> sneak in an extra `s` to add numbers 
	- 1 * 2  ---> use Y-Combinator: Y.(F) = F(YF)
		Example: make a recursive factorial function
			Y(factorial)(n)
			factorial(Y factorial)(n)
			factorial(factorial(Y factorial))(n)
3. Solutions
	1. Almost functions: Create an "almost" version of a function that takes the recursive function as a parameter
		Normally, a recursive function needs to "know its own name" to call itself. But when we're defining the function, its name isn't available yet in the environment. So we need a way to pass the function to itself (and we do this simply by making a helper function)
		- Write a function which takes an input function and returns another function 
		- Have to use currying! Because we need to pass in both a function to recurse and the number to take factorial of
	```scala
	let rec factorial = function (n)              let almost_factorial = function (f)
		if (n == 0) then 1               ---->         function (n)
		else n * factorial(n-1)                             if (n == 0) then 1
		                                                    else n * f(f)(n-1)
			                                       let factorial = function (n) 
				                                       almost_factorial(almost_factorial)(n)
	```
	2. Circular Scopes: Introduce `ExtendRec(f, x, e, σ)` 
		Create "illusion of circularity" using environment itself. When you look up `f`, you get a closure whose environment is σ̂ itself. So recursive calls to `f` will find `f` defined in the environment (ie. for ExtendRec(f, x, e, σ)-----> σ(f) = Closure(x, e, ExtendRec(f, x, e, σ)))
		- ExtendRec(f, x, e, σ): creates new environment where for any identifier y ≠ f: σ̂(y) = σ(y) (looks up in the parent environment)
		- For identifier f: σ̂(f) = `Closure(x, e, σ̂)` — **notice it references itself!**
	3. Add Extra Key Language Features 
	
# Explicit References
Deref fetches value from cell, Assignref assigns value to cell (and this happens globally!!! because we're working w memory cells)
``` scala
let x = new(10) in // create x as a pointer (x = Ref(0x120))
	let y = deref(x) in //star operator in c++
		let z = assignref(x, deref(x) + 1) in //
			z + y //returns 21
			
let incr = function(x) { // here, x will be a memory address
	assignref(x, deref(x) + 1)
}
```
- Store: an array of addresses and values (global memory/heap) while environment is just local values (local memory/stack). Outlasts scopes
```scala
eval(expr, env, store) = (value, store) //pass in the store and value you want to store
```
	Note: persistent stores let you undo (they're like a tree which shows all operations throughout time)
```
Ex 1:
lookup(env, x) = v, v +- error
--------------------------------------
eval(Var(x), env, store) = (v, store)

Ex 2:
eval(e, env, s0) = (v, s1), v != error, s2 = newCell(s1, v)
------------------------------------------------------------    //here s0 and s1 are stores
eval(New(e), env, s0) = Reference(addr)

Ex 3:
eval(e, env, s0) = (v, s1), v = Reference(addr), v1 = getValue(s1, addr)
------------------------------------------------------------------------
eval(Deref(e), env, s0) = (v1, s1)
 
Note: for adding 2 store ops, we go left to right (eval first op to see if store changes, eval 2nd op, add togehter)
```
- Reason this works: (SIDE EFFECTS) mutable variables (can change state), I/O operations (read files)
```scala
case class Reference(j: Int) extends Value //new, allows mutable references
case class ImmutableStore(nCells: Int, storeMap: Map[Int, Value])
```
```
eval(expression, environment) = value
eval(expression, environment, store) = (value, newStore)
```

# Implicit References
In explicit sets you work with pointers. In implicit sets you work with vars (that get converted to explicit sets through semantics)
```scala
let var x = 10 in //add in var, allow x to be assigned to other values (automatically deref)
	let d = assign(x, 15) in
		let d1 = assign(x, x+1) in
			x

let var y = 10 in                                let yref = new(10) in                        
	let d = assign(y, 15) in --- to explicit-->      let d = assignref(y, 15)
		y                                                 deref(y)    
``` 
- New Steps:
	- For letvar: Val all args and save in v1, create new call in store and put v1 in it, return the address of this new cell
	- For Var(x): check if exists, check if its an address, return value at address (if it's not an address proceed as normal: return value of x)
		(Call by value, Call by reference)
# Typed/Untyped Lettuce
Use lambda calculus w either types or no types
1. Typed: everytime you compare something in lettuce you need to write down its type
```
Type => 
	  NumType
	| BoolType
	| FunType(Type (any), Type (ret))
	| TypeError
	
// Create new semantic rules
1. eval(expr, env) -> val    ------->      typeOf(expr, type_env) -> type, map: {x -> num}
	- typeOf(Const(v), env) = num
	- typeOf(Var(id), tenv) = tenv(id)
	- typeOf(Plus(e1, e2), tenv) = num
	- For typeOf(Let): check to make sure e1 and e2 are defined as correct typem then extend type environment
	- For typeOf(FunDef)
		      typeOf(e, tenv o {x->t1}) = t2
		-----------------------------------------
		typeOf(Fundef(x, t, e), tenv) = (t1 -> t2)
	- For typeOf(LetRec): to show that recursive function f is a function (num: num), assume f is a function (num: num). Circle!
	      T = FunType(T1, T2), typeOf(e1, tenv o {x->T1, f->T1=>T2}) = T2         //we're putting our assumption into T2
	  -----------------------------------------------------------------------
	  typeOf(LetRec(f, T, x, T1, e1, e2), env) = typeOf(e2, {x->T1, f->T1=>T2})
1. 
```
```scala
let x: num  = 0 in             ------>      Let('x', num, 0, {Let x: num = 5 in x})   
	let x: num = 5 in        
		x
// Curried function which casts between types: (num -> bool) -> ((num -> bool) -> bool)
let f(num -> bool) = 
	function(f1:num -> bool)
		function(f2:num -> bool)   ------>     FunDef(String, Type, Expr)   
			f1(25) == f2(42).     
// Ill-Typed:
let f(num -> num) = 
	function(x: num -> num)
		x > 10
// Recursive Function:
let rec f: num -> num =            ------>	   LetRec(String, Type, String, Type, Expr, Expr) // have to do circular reasoning
	function(x: num) {
		if (x <= 0) {1}
		else {x * f(x - 1)}
	}							   
```
2. Untyped: 
	- Well-Typed/Type-Checked: perfect! even though untyped (types are perfect, we could automatically type code if we wanted to)
```scala
let x = True in
	let f = function(y)
		(y > 10) && x
		in 
	let z = f(15) in
		(z && False)
```
	- Ill-Typed
```scala
25 + True 
```
# Takeaways
1. Be cafreful of shadowing
```scala
closure("w", expr, {"w" -> 10, "z" -> 45, "y" -> 42})   ---->  eval(Expr, {"w"->97, "z"->45, "y"->42})          
arg = 97
```
2. Lettuce is just lambda calculus (functions)
```scala
let x = 10 in x + 5 -----> (fun(x){x+5})(10)
```
