- `2^3` = `2 ** 3`
- Floor Division = `2 // 3` (division operation that returns the largest integer that is less than or equal to the result of the division)
- Slicing: ending index is exclusive, but the beginning index is inclusive 
	- `my_list[1:3]` (from 1 to 3), `my_list[2:]` (cut off first 2 things), `my_list[-2]` (get 2nd to last thing), `my_list[-3:]` (get last 3 things)
- Dictionaries
```python
my_dict = {
    'key1': 'value1',
    'key2': 'value2'
}
my_dict['key3'] = 'porcupine'
print(my_dict.keys())
print(my_dict.values())
```
- Loops
```python
for i in range(5):
    print(i)
list(range(5)) # or this works too
anotherex = [y for y in range(5)] # list comprehension (take less room)
newlist = [x for x in fruits if "a" in x]
suits = ['D', 'H', 'C', 'S'], ranks = ['1', '2'...], deck = [s+r for s in suits for r in ranks] #assemble a deck of cards
```
- Built-In Functions
```python
abs(5), max(2, -3, 4, -5)
type(2) #prints "int"
help(my_func) #prints the description defined inside of the function (ie. """desc""")
```
- Built-In Methods and Attributes
```python
bits = x.bit_length() #A method is a function associated with a specific object
my_list.__len__() #Attributes are variables that belong to an object
dir(my_list) #See all attributes and methods associated with an object
```
#main
[[Jupyter Notebook]]
[[Numpy]]
[[Pandas]]
