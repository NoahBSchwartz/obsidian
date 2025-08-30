- and = `&&` or = `||`, no colons for loops, put `end` after if-else and loops
```julia
languages = ["Julia", "Python", "R"]
for lang = languages 
	println(lang)
end

for letter = "Julia" 
	println(letter) 
end
```
- Install packages
```julia
using Pkg 
Pkg.add("DataFrames") 
Pkg.add("CSV")
using DataFrames 
using CSV
```
- Work with dataframes
```julia
diamonds = DataFrame(CSV.File("data/diamonds.csv"))
first(diamonds, 7) #print 7 rows
diamonds[:, :rock][begin:10] #get first 10 rows in the "rock" column
diamonds[1:5, [:carat, :cut, :price]] #get first 5 rows of the cut, carat, price column
sorted_diamonds = sort(diamonds, :price) #sort data frame
```