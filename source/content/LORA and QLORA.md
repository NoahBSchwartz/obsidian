### LORA
1. Stores the set of weights that need to be updated in an adapter (ΔW)
2. Assume these weights have a lot of redundancy and eliminate this redundancy by ΔW = (r x d) x (d x r), the 2 smaller matrices multiply to produce an approximation of ΔW. (Note: ΔW is a d x d matrix and r is much smaller than d)
3. Apply (r x d) x (d x r) to original model for every inference step![[Screenshot 2024-05-29 at 11.24.22 AM.png]]
- rank = how small r is (ie. how much will the LORA fine-tune change the base model, larger r means more change and also more computing power needed). 256 is usually highest you want to go
- alpha = how much you scale the LORA weights that you apply at inference (alpha = 2 is like yelling at your model really loud
### QLORA 
1. Quantize the pretrained model (store weights that would take 32 bits as only 4 bits of info ie. FP32 -> NF4)
2. Preform LORA training on the model but in 32-bit precision (FP32). This will allow the model to be in 4-bit but have the adapter keep the precision (picking up as much info as possible from the training set you gave it)
	- To make this work, we pick only the weights of the model that LORA needs at each training step and convert them to FP32 (ie. 0.2 -> 0.2000)
	- To cache the weights well, paged optimizers are used (See: [[Memory of Page Tables]])
3. At inference time: convert the parts of the model that LORA updates into FP32