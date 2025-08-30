==3B1B's Biggest Takeaway: Never forget that matrix multiplication is applying 1 transformation and then another. Think about this EVERY time you see a matrix==
# Setup
- Scalar: Number that is multiplying (scaling) a vector
- Basis Vectors: Think of vector like 2 unit vectors (of length 1) that are scaled up or down
	- Linear Combination: when you scale basis vectors and use them for a new (normal) vector 
	- Span: the set of all points a vector (aka linear combination) made of the basis vector could reach
		1. Linearly Dependent: when the basis vectors are in-line with each-other, limits the span to be 1D (or 2D if we're thinking in 3D and so on)
		2. Linearly Independent: when each vector adds another dimension to the span
	- Basis: set of linearly independent vectors which spans space
# General
- [[Determinants]]
- [[Linear Transformations]]
- [[Linear Systems of Equations]]
- [[Dot Product]]
- [[Cross Product]]
- [[Change of Basis]]
- [[Vector Spaces]]
- Anytime you see a simple vector, interpret it as a transformation of the basis vectors
- Anytime you see a simple matrix, interpret it as a transformation of space (all vectors)
- Linear Algebra is broadly useful in the real world because it helps mathematicians/ scientists solve systems of equations 
	- =="You can hold in your head a really complicated idea of multiple variables interacting by just think of stretching and squishing space"==
# Questions
1. Can we think of a neural net as stretching and squishing space non-linearly
2. What is a linear probe vs non linear probe in this context
3. Why is it so important for interpretability that things are linear or non-linear
4. Proofs involving matrices? Maybe Paul's proposal will make more sense after watching this course 
5. Multivariate Calculus is related to this because we're using vectors to define shapes and then one of the ways to solve the area problem for a hard shape is to execute a linear transformation into a better position where we can better solve for the volume (can this concept be applied to solving other difficult problems in math... ie can you perform a transformation on proof which uses matrices to make it simpler? Can a neural net be used to perform this transformation?) (Can you transform a NN into a space which makes it look simpler? Is this what superposition of NN's is talking about [[AI Interpretability]])
6. Can you treat NN as a non-linear transformation and take determinant in different areas to see what it's doing to it's input data
7. To-Do: Look back at paul christiano [[Formalizing Explanations of Neural Network Behaviors (Christiano)]] lecture to see the example he gave about 0 matrix
8. Is column space used with inverse transformation when solving system of linear equations?
9. I don't understand why we had to have a full video on change of basis. Can't you just set this up as a linear system of equations to solve? What am I missing?
#main