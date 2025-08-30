# Definitions
Graph: A collection of vertices connected by edges
- Each vertex contains a key and a list of edges
	- Path: sequence of vertices such that each each adjacent pair is connected by an edge
	- Cycle: starts and ends at the same vertex and there are no repeated vertices  or edges other than the start and end vertex
		- To check: run through the graph and if you ever get back to the same node then there is a cycle
		- Odd Cycle: cycle with odd number of edges
- Can be either directed or undirected (whether graph has arrows or not)
	1. Directed Degree of a Vertex V
		- In-Degree: the number of edges coming into vertex V
		- Out-Degree: the number of edges going out of vertex V
	2. Undirected Degree of a Vertex V: number of vertices connected to V
	- Strongly Connected: A directed graph is strongly connected if there is a path from each vertex in the graph to every other vertex (undirected graphs are disqualified)
	Directed                                                                                                                                  Undirected, Weighted, w/ Adjacency Matrix: ![[Screenshot 2023-11-03 at 1.57.27 PM.jpg]]
- Weighted or Unweighted: whether each edge has a weight
- Connected Graph: there is a path between every pair of vertices in the graph.
- Different from [[Search Tree]], [[Binary Heap]] because it can have any number of organizations
	- Tree: special type of graph with no cycles. A tree with n vertices always has n − 1 edges.
	- Spanning Tree: Spans the vertices of the graph
		- Minimum Spanning Tree: a spanning tree that has the smallest possible sum of edge weights among all possible spanning trees of the graph. Found for weighted, undirected graphs (Kruskal’s Algorithm, Prim’s Algorithm)
- Forest: disjoint (unconnected) collection of trees
- Bipartite Graph: set of vertices can be divided into into two subsets A and B such that every edge in the graph connects a vertex from A to a vertex from B
	- Cycle: path starts and ends at same side of graph
# Math
- Adjacency Matrix: ![[Screenshot 2024-09-24 at 10.12.00 AM.png]]
	- Adjacency List: turn adjacency matrix into list, each list corresponds to a vertex and contains the vertices adjacent to it
- Depth First Search Complexity: In the worst-case, there's simply a chain of nodes (loop runs for n-1 times) O(n-1)
	1. For each iteration, search all nodes of the graph (look through all vertices V and edges E) = O(V + E)
- Breadth First Search Complexity: In the worst-case, there's simply a chain of nodes (loop runs for n-1 times) O(n-1)
	1. For each iteration, search all nodes of the graph (look through all vertices V and edges E) O(V + E)

# Search
- Unweighted Breadth-First Traversal: start at a vertex, visit all of its neighboring vertices (depth = 0), visit all of its neighbor's neighboring vertices (depth = 1), visit all...
	- This is the basis of many path finding algorithm and search engines because it returns the shortest path from one node to another node
	- Essentially turning a graph into a search tree:
																						![Breadth-First Search on Graph. The breadth-first search algorithm is… | by  Practicetrackerever | Medium](https://miro.medium.com/v2/resize:fit:679/0*OXJgetr0xmAQ-2_N.gif)
																							![Dijkstra's algorithm - Wikipedia](https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Dijkstra_Animation.gif/220px-Dijkstra_Animation.gif)
- Depth-First Traversal: Explore each branch of the graph until the end is reached before retreating and searching the next branch
																							![Depth-First Search | Skilled.dev](https://skilled.dev/images/dfs.gif)
# Shortest Path Algorithm
Find shortest path from starting node to ending node
1. Unweighted Undirected Graph G(V, E): think of going through a graph using BFS, it goes level by level so this will return the shortest path
2. Weighted Undirected Graph G(V, E, W): can't use normal BFS 

- Dijkstra's Algorithm (Weighted Breadth-First Traversal) = `Dijkstra's(G(V, E, W), S)`: Uses a Min Priority Queue (shorter distances in front)
![[Screenshot 2024-10-01 at 11.11.58 AM.png]]
- Kruskal's Algorithm: Different because it's trying to find a minimum spanning tree globally (instead of simply shortest path from one particular node)
	- Just start from one point and add the smallest edges and keep adding until all nodes are accounted for, if you run into an edge that you could add but it wouldn't add another node to the tree just don't add it
	- Stop when edges = (# of nodes)-1 (because kruskal's algorithm is building a tree)
									![[Screenshot 2024-10-03 at 12.11.45 PM.png]]
- Prim's Algorithm: Focussing more on the nodes, less on the edges.
	- First pick a random node, look at the edges connecting it to other nodes, pick the minimum one and add it to the tree
	- Now look at the edges connecting the tree to other nodes, pick min one and add it to the tree![[Screenshot 2024-10-03 at 12.16.30 PM.png]]
- Bellman Ford Algorithm (See [[Dynamic Programming]]): Algorithm for a graph where some weights are negative. 
	2 cases: 
	if there's a negative cycle then the shortest path has value -inf
	if there's no negative cycle then there is a shortest path with real val (proof: consider a cheapest path P that uses fewest edges, if P contains a cycle you can remove it without increasing cost (exchange arguments))
	1. Parameterize: Cost of shortest path that uses <= i edges
		Case 1: Cheapest path uses <= i - 1 edges
		Case 2: Cheapest path uses exactly i edges
			if (v, w) is first edge, then the algorithm uses (v,w) and then selects best path using <= i -1 edges
	2. Uses $\Theta(mn)$ time and $\Theta(n^2)$ space (Because the table requires $\Theta(n^2)$, each iteration $i$ takes $\Theta(m)$ time since we examine each edge once)
		- Space optimization: Maintain two 1D arrays instead of one 2D array (improve to $\Theta(n)$ space)
		- Running Time Optimization: If node W was not updated in iteration i-1 there is no reason to consider edges entering W in iteration i. 
	3. Finding Shortest Paths: maintain a successor list that points to the next node on cheapest path
	4. Properties
		- After the ith step the paths will be shorter or equal to the paths available at the i-1th step (proven with induction)
		- If the successor graph contains a directed cycle W then W is a negative cycle
	Applications: 
	 - Detecting negative cycles
	 - Think of each node as a router, edge as a communication link, cost of edge as delay of link