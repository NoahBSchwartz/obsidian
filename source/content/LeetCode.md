1. Binary Search
```python
# Any binary search
def searchBST(self, root: Optional[TreeNode], val: int):
	if not root:
		return None
	if root.val==val:
		return root
	elif root.val>val:
		return self.searchBST(root.left,val)
	else:
		return self.searchBST(root.right,val)
# Binary Search on array		
def check(mid, target):
	return target >= arr[mid]
def binarySearch(arr, target):
    start = 0
    end = len(arr)
    while start + 1 < end:
        mid = (start+end)//2
        if check(mid, target):
            start = mid
        else:
            end = mid
    return start if check(start) else -1
```
2. Use start_pointer, end_pointer
3. You can add to the initial function definition like this
```python
def guessNumber(self, n, s=1):
```
4. 