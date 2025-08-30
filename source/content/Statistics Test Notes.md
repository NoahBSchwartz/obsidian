- Properties in EDA (Exploratory Data Analysis):
	1. Structure = the “shape” of a data file
	2. Granularity = what does each record represent? (This is what primary keys are used to determine)
		- Fine-Grained: each record is data on an individual thing, Coarse-Grained: each record is data on an entire group 
			- Rollups: Sometimes data points are just summaries
			- Variable Feature Types what kind of data the variable stores (qualitative vs quantitative)
				- Quantitative = continuous/ discrete
				- Qualitative = ordinal (categories with levels `eg preferences`)/nominal (categories with no specific ordering `eg id #`)
					- Visualizing: use a bar chart to visualize (if this is a distribution (see [[Statistics]])) because easier to judge
		- What is the granularity of the dataset? You need to find an attribute that's unique for every element (eg. primary key)
	1. Scope = how (in)complete is the data
		- Will the data answer the question, Is the timeframe correct, Does the data cover too many things, Is the data misentered?
		- To deal with this: drop incorrect records,  keep as NaN, or infer the missing values
	1. Temporality = how is the data situated in time
	2. Faithfulness = how well does the data capture “reality”
![[Screenshot 2024-08-28 at 7.06.52 PM.png]]



