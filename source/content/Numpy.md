Forces all numbers in array to be one single type which speeds everything up a ton (using vectorization)
- Vectorization: operations are done in a lower level language (like C) to increase speed
```python
near_twenty = np.e**np.pi - np.pi #this is the best way to work with "weird" #s
arr = np.array([1,2,3, 4, 5]) #makes an array like normal but now you can use it with numpy
arr.shape #prints (5,)
np.zeros(5) #[0., 0., 0., 0., 0.]
np.arange(0, 10, 2) #[0, 2, 4, 6, 8] arange(start, stop, step)
np.arange(10000) #[0, 1, 2, 3, ... 9998, 9999]
np.linspace(0, 5, 11) #[0. , 0.5, 1. , 1.5, 2. , 2.5, 3. , 3.5, 4. , 4.5, 5. ] linspace(start,end,num)

np.array([1, 2, 3]) + np.array([4, 5, 6]) #Adds elements to get [5, 7, 9] (unlike normal array which appends 2nd array onto 1st)
np.array([2, 10, 100]) / np.array([2, 5, 25]) #[1. 2. 4.]
3 * np.array([2, 3, 4]) #[6, 9, 12]
k = np.arange(101)
all_probs = special.comb(100, k) * (.26**k) * ((1-.26)**(100-k)) # all_probs is an array of 100 elements 
ar3 = np.ones(100)*3 #make array with 100 different number 3's in it
np.sqrt(arr) #[1., 1.41421356, 1.73205081, 2., 2.23606798]
freq_high = np.mean(activations_in_nap[high_loss_mask], axis=0) # axis=0 means "average across rows" (across samples)

np.sum(arr), arr.sum() #many things in Numpy are implemented as both functions and methods
```
- Simulation
```python
coin = np.array(["H","T"])
biased_flips = np.random.choice(coin, p=[0.75, 0.25], size=10) # simulate 10 flips of a biased coin
sum(biased_flips == 'H') # now see how many heads we got
running_prob = [sum(flips[:ii+1] == "H") /(ii+1) for ii in range(n)] #graph how prob changes as we try more and more trials
x = np.random.binomial(75, .10, 15) #sample 15 trials from 75 total with 10 percent chance of success (returns: [4, 6, 5, ...] meaning we have average of 5 successes)

```