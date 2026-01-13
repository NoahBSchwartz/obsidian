- A collection of vertices connected by edges
- Each vertex contains a key and a list of edges
- Can be either directed or undirected (whether graph has arrows or not)
	- Strongly Connected: A directed graph is strongly connected if there is a path from each vertex in the graph to every other vertex (undirected graphs are disqualified)
- Can be either weighted or unweighted (whether each edge has a weight)
- Different from [[Search Tree]], [[Binary Heap]] because it can have any number of organizations
1. Directed                         2. Undirected, Weighted, w/ Adjacency Matrix: 
![[Screenshot 2023-11-03 at 1.57.27 PM.jpg]]
- Private: vertices, edges
- Public: insertVertex, deleteVertex, addEdge, deleteEdge, search
- Implementation: vertices must be stored as a list of pointers `vector<vertex*> vertices` so that if array is doubled, vertices aren't moved in memory 
```cpp
private:
	vector<vertex*> vertices; //list of pointers to vertices
	struct vertex {
		string key;
		vector{edge} adj; //every vertex has list of connections
		//vector{*v} adj; for unweighted graph, no edge struct
	}; 
	struct edge { //edges are a struct because graph is weighted
		vertex *v; //every edge has one vertex it's connected to
		int weight;
	};
public:
	void insertVertex(string n) {
		bool found = false //make sure no duplicates of n
		for (int i = 0; i < vertices.size(); i++) {
			if(vertices[i]->name == n)
				found = true;
		}
		if (!found) { //if no duplicates, make a new vertex
			vertex *v = new vertex;
			v->key = n;
			vertices.push_back(v);
		}
	}
	void addEdge(string v1, string v2, int _weight) {
		for(int i = 0; i < vertices.size(); i++) { //find v1, v2
			if (vertices[i]->name == v1) {
				for(int j = 0; j < vertices.size(); j++) {
					if (vertices[j]->name == v2 && i != j) {
						edge e0; //make new edge from v1->v2
						e0.v = vertices[j];
						e0.weight = _weight;
						vertices[i]->adj.push_back(e0);
						edge e1; //make new edge from v2->v1
						e1.v = vertices[i];
						e1.weight = _weight;
						vertices[j]->adj.push_back(e1);
					}
				}
			}
		}
	}
```
- Unweighted Breadth-First Traversal: start at a vertex, visit all of its neighboring vertices (depth = 0), visit all of its neighbor's neighboring vertices (depth = 1), visit all...
	- This is the basis of many path finding algorithm and search engines because it returns the shortest path from one node to another node
	- Essentially turning a graph into a search tree:
																![Breadth-First Search on Graph. The breadth-first search algorithm is… | by  Practicetrackerever | Medium](https://miro.medium.com/v2/resize:fit:679/0*OXJgetr0xmAQ-2_N.gif)![[Screenshot 2023-11-01 at 2.07.23 PM.png]]
```cpp
struct vertex {
	string key;
	vector{edge} adj; 
	bool visited = false; //whether vertex has been visited
	int distance = 0; //distance from starting vertex
}; 
void breadthFirstTraversal(vertex* start) {
    queue<vertex*> q;
    start->visited = true;  // Initialize starting vertex
    start->distance = 0;
    q.push(start);
    while (!q.empty()) {
        vertex* v = q.front();
        q.pop();
        cout << v->key;  // Process the vertex here (ie. print)
        for (edge& e : v->adj) { // Go through all adj vertices
            if (!e.to->visited) {
                e.to->visited = true; //Mark as visited
                e.to->distance = v->distance + 1;
                q.push(e.to); // Add to the queue for processing
            }
        }
    }
}
```
- Weighted Breadth-First Traversal:
	1. Assign a distance of zero to the source node and infinity to all other nodes.
	2. Keep track of visited (with known shortest distance) and unvisited nodes.
	3. For each unvisited neighbor of the current node, update its distance if a shorter path is found through the current node.
	4. Mark the current node as visited and remove it from the unvisited set.
	5. Choose the unvisited node with the smallest tentative distance as the new current node.
	6. Continue until all nodes are visited or the shortest path to a specific node is determined, ending if unreachable nodes remain.
							![Dijkstra's algorithm - Wikipedia](https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Dijkstra_Animation.gif/220px-Dijkstra_Animation.gif)
```cpp
void Graph::dijkstraTraverse(string sourceVertex){  
	vertex *vStart = search(sourceVertex);  
	if(!vStart){  
		cout << "Start not found" << endl;  
		return;  
	}  
	vStart->solved = true;//Create a list to store solved vertices 
	vStart->distDijk = 0;//Append Vstart to solved vertices
	vector<vertex*> solvedList; 
	solvedList.push_back(vStart);
	bool allSolved = false;  
	while(!allSolved){  
		int minDist = INT_MAX; 
		vertex *solvedV = nullptr;//pointer to solved node
		allSolved = true; 
		for(int i=0; i<solvedList.size(); i++){//loop solved verts
			vertex *s = solvedList[i]; 
			for(int j=0; j<s->adj.size(); j++){//loop adjacency list
				if(!s->adj[j].v->solved){    
					int dist = s->distDijk + s->adj[j].weight;
					if(dist<minDist){//find shortest dist to vStart
						solvedV = s->adj[j].v;  
						minDist = dist;  
					}  
					allSolved = false;  
				}  
			} 
		}  
		if(!allSolved){//iterate across list of solved vertices   
			solvedV->distDijk = minDist;  
			solvedV->solved = true;  
			solvedList.push_back(solvedV);  
		}
	}
}
```
- Depth-First Traversal: Explore each branch of the graph until the end is reached before retreating and searching the next branch
														![Depth-First Search | Skilled.dev](https://skilled.dev/images/dfs.gif)
```cpp
void depthFirstSearchHelper(vertex* v) {
	if (v->visited) return; // If already visited, do nothing
	v->visited = true; // Mark current node as visited
	cout << v->key << " ";
	for (auto &e : v->adj) { //Recur for all adjacent vertices
		depthFirstSearchHelper(e.v);
	}
}
void depthFirstSearch(const string& startKey) {
	vertex* startVertex = nullptr;
	for (auto &v : vertices) { // Find the start vertex
		if (v->key == startKey) {
			startVertex = v;
			break;
		}
	}
	if (startVertex == nullptr) {
		cout << "Start vertex not found!" << endl;
		return;
	}
	depthFirstSearchHelper(startVertex); // Call helper function
}
int main() {
    Graph g;
    g.depthFirstSearch("StartVertexKey");
    return 0;
}
```