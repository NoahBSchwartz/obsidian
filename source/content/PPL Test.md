1. `let f = function (g) function (x) g(x) in f(20)` When you see this notice that `f` expects `g` to be a function (since it's applied to x). This is ill-typed!
2. `def foo(x: Int): String = if (x == 0) { "hello" }` no else which means the function returns Unit type if x != 0. So this is ill-typed! (but this would be totally fine if the type was inferred and not explicitly declared)
3. numvalue was added most recently so takes priority
   ```scala
   Extend( "x", NumValue(30), 
   Extend( "y", Reference(0), 
     Extend ( "z", Reference(1), 
       Extend ( "x", Reference(2), EmptyEnv ))))
   ```
4. `(x < y) && 3` when the first statement evaluates to True in an AND just return false (don't return error)
5. Always check that Ifs have an Else and Else-Ifs have an Else too
6. FoldLeft  = go in order (and end accidentally reversed). FoldRight = go in reverse order (but actually end normal)
```scala
foldLeft(initialValue)((accumulator, element) => ...)
foldRight(initialValue)((element, accumulator) => ...)
```
