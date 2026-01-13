How we define the syntax of a language!
# Grammars 
Production rules (non-terminals are on left of arrow, terminals are on right of arrow)
- Non-terminal: ie. List
- Terminals: ie. nil, cons
- Kleene Star: `Plus(Expr*)` means any number of expressions allowed (ie. Plus(), Plus(Expr), Plus(Expr, Expr))
```
Nonterminals = {A,B}. Terminals = {a, b(.)}. Start: A
A -> a
A -> b(B)
B -> b(A)
```
	Apply the rule in all possible ways until you can't anymore (ie. no more non-terminals)
	Start at A. You can produce: {a, b(b(a)), b(b(b(b(a))))...}, called terms. Note: you cannot produce {b(a), B, A...}
	Note: this is to define Abstract Syntax Context-Free Grammars 
```
Ex. 1: Nonterminals = {Expr}. Terminals = {x, y, 0, 1, 2, plus, star}
Expr -> x | y | 0 | 1 | 2
Expr -> plus(Expr, Expr)
Expr -> star(Expr, Expr)

Ex. 2: Non-Terminal: Tree, Terminals = leaf, Node()
Tree -> leaf
Tree -> Node(Int, Tree, Tree)
Int -> ...-2, -1, 0, 1, 2...
```
Useful to write down programming concepts (abstract syntax tree! AST)
```
((x+2) * 3 - 4) * y gets treeified by scala into AST represented as a grammar:
Expr => Const(Int)
Expr => Var(String)
Expr => Plus(Expr, Expr)
Expr => Minus(Expr, Expr)
Expr => Log(Expr)
Expr => Let(...)
CondEXpr => True
	 => False
	 => Log(Expr, Expr)
	 => Geq(Expr, Expr)
	 => Eq(Expr, Expr)
	 => And(CondExpr, CondExpr)
	 => Or()
	 => Not(CondExpr)
fun(x)
	 
```
```Scala
val t1 = Plus(Const(0), Const(2))
val c1 = Leq(Var("x"), Const(45))
```
# Inductive Data Types (translate grammars into Scala)
- nonterminals become traits (abstract class in Scala)
- write a line for every rule
```
Number => Z
Number => Succ(Number)
non-terminal -> Number
terminals -> Z and succ 
```
```Scala
trait Number
class Z() extends Number
class Succ(val n: Number) extends Number
val n1 = Succ(Succ(Z())) //example statement
```

```
MyList => MyNil
MyLisr => MyCons(int, MyList)
```
```Scala
trait MyList
// if you don't want to have to use brackets and you want to treat equal objects as the same object: 
case object MyNil() extends MyList//MyList => MyNil (object lets us have no args and treat all nils as same)
case class MyCons(val j: Int, val l: MyList) extends MyList// compiler implements equals method with cases to make equals work
val l2 = MyCons(10, MyNil())
val MyCons(x1: Int, y1: MyList) = l2 //you can unpack case classes! 
println(x1) //prints 10
println(x2) //prints MyNil


//grammar functions (other languaged use visitor pattern matching inside classes/objects, we'll use case pattern matching)
sealed trait MyList //compiler checks for us that all cases are covered
val list = MyCons(2, MyCons(-1, MyCons(3, MyCons(5, MyNil))))
def lst_length(lst: MyList) : Int = lst match {
case MyNil => { 0 } // this would have appeared as function in MyNil but here we say it's a case
case MyCons(n, inner_list) => { //case for MyCons (don't need to put "vals" bc MyCons already defined) n=x1, inner_list=x2
	lst_length(inner_list, len+1)
}
case _ => { -1 } //if first 2 aren't satisfied
}
def totalSum(lst: MyList, sum: Int = 0) : Int = lst match {
case MyNil => { sum }
case MyCons(n1: Int, inner_lst: MyList) => { totalSum(inner_lst, sum+n1)} //tail recursion
}
def last_element(lst: MyList) : Int = lst match {
case MyNil => {throw new IllegalArgumentException("bad")}
case MyCons(n, MyNil) => { n } //case where MyCons has argument MyNil 
case MyCons(n, MyNil) if n > 4 => { n } //case where MyCons has argument MyNil and n > 4
case MyCons(_, inner_lst: MyList) => {last_element{inner_lst}}
}
def insertBST(x: Int, bst: BST): BST = bst match { //"= bst means" all case are in reference to "bst"
case Emp => {Tree(x, Emp, Emp)}
case Tree(key, left, right) =>
	if (x < key) {Tree(key, insertBST(x, left), right}
	else if (x > key){Tree(key, left, insertBST(x, right))}
	else {bst}
}
```
# Building Programming Languages
- Concrete Syntax = the actual expression made out of the grammar
- Abstract Syntax Tree = the expression gets made into a tree so that the compiler processes it![[Screenshot 2025-09-16 at 12.45.33 PM.png]]
- Define your grammar with inductive data types. Then implement an eval function
```scala
def eval(e: Expr, env: Map[String, Double]): Double = e match {
	case Const(d) => d
	case Var(name) => {
		if (env.contains(name)){
			env(name)
		} else {
			throw new IllegalArgumentException(s"Did not find variable $name ")		
		}
	}
	case Plus(e1: Expr, e2: Expr) => {
		binaryOp(e1, e2 (v1, v2)) => v1 + v2
	}
	case Log(e1: Expr) => {
		val v = eval(e1, env)
		math.log(v)
	}
}
val e = Log(Star(Minus(Plus("x", Const(2.0)), Const(1.0)), Const(3.0)))
val env = Map("x" -> 2.0, "y" -> 3.0, "z" -> 1.0, "zzzz" -> 1.5)
eval(e, env)
```
