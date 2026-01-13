Any recursive function can be made tail recursive by telling it what to do with the result ("Play around with control flow"). We don't need to use the stack at all if we just tell the function where to return its value!!
- Event-Driven Programming: "Exception Handling" (use try, catch blocks to move control around program)
	- Setjump, Longjump, Callbacks
1. Continuation Passing Style: we don't care what function returns, continuation tells function what it should do with its value
```scala
def foo(x: Int, Cont: Int->Int): Int = { //every function must be written like this
	Cont(x + 10)
}
```
	You can dictate what the rest of computation will look like -> You can dictate control flow!
2. Add in continuation to vanilla tail recursive (essentially make a helper function at each step to handle dirty work)
	- Rather than growing the stack we are growing the continuation (kinda cheating)
	- Steps for conversion: never return blindly, always return as continuation, keep base case but replace w continuation, 
```scala
// vamilla
def fact(n) = {
	if(n <= 1){
		1
	}
	else 
	{
		val v = fact_k(n-1) 
		n * v
	}
}
// always add an extra parameter
@tailrec
def fact_k(n: Int, k:Int=>Int): Int = {
	if(n <= 1){
		k(1) // never return answer, always give it away
	}
	else 
	{
		def new_cont(v) = {k(n * v)} // prepare new continutation to do dirty work
		fact_k(n-1, new_cont) 
	}
}

//vanilla
def fibonacci(n: Int): Int = {
	if (n <= 1) {1}
	else {
		val v1 = fibonacci(n-1)
		val v2 = fibonacci(n-2)
		v1 + v2
	}
}
@tailrec
def fib_k(n: Int, k:Int => Int): Int = {
	if (n <= 1) {1}
	else {
		fib_k(n-1, v1 => {
			fib_k(n-2, v2 => {
				k(v1 + v2)
			})
		})
	}
}

// vanilla
def concatenateList[S](lst1: List[S], lst2: List[S]): List[S] = lst1 match { //generic type S (any kind of list)
	case Nil => lst2
	case hd::tail=>hd::concatenateList(tail, lst2)
}
def concatList_k[S, T](lst1: List[S], lst2: List[S], k: List[S] => T) : T = { //generic return T (anything)
	case Nil => k(lst2)
	case hd::tail => 
	{
		concatList_k(tail, lst2, v =>(hd::v))
	}
}
concatList_k("hello", v: Int => println(v))
```

# Trampolines
If your programming language doesn't do tail call optimization, how do you do it yourself. 
1. Tail call optimization: compiler reuses the current stack frame for a function call instead of creating a new one
2. Trampolining (Callback-Oriented Programming): dispatch loop
	- Create a dispatch loop which calls single function and gets smth back, then next function, then next function...
```scala
def fact_k[T](n:Int, k:Int => T): T = {
	if (n <= 0) {
		k(0)
	}
	else {
		fact_k(n-1, v =>k(n * v))
	}
}
def fact_tramp[T](n:Int, k:Int => T): T = {
	if (n <= 0) {
		() => k(1) //thunk (delayed computation, don't do it now but return for later)
	}
	else {
		() => {fact_tramp(n-1, v=> k(n*v))}
	}
}
```