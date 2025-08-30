# Computer Vision
#### Traditional Method
1. Image Acquisition
2. Image Preprocessing
	- Image Filtering
		1. Low Pass: eliminates high frequency noise to remove details
		2. High Pass: emphasize high frequency noise to emphasize details
		3. Bilinear Interpolation: if turning an image the pixels may not end up perfectly so interpolate
		4. Directional: "take the 1st derivative" to find the changes in an image which correspond to edges
		5. Laplacian: edge detector that computes the second derivatives of an image
	- Segmentation
		1. Non-contextual thresholding: each pixel classified based solely on its intensity value (without considering neighbors)
		2. Contextual thresholding: considers surrounding pixel values to determine thresholds
		3. Texture segmentation: divide image into regions based on texture patterns
	- Fourier Transform: represent the image in the Fourier (frequency) domain (useful for filtering and compression)
3. Image Understanding
	- Descriptors: elementary features in the image (interpret the histogram of the image w HOG, SIFT, SURF)
		1. Break down image into parts by looking at where the image changes (gradients)
		2. Classify objects based on shape, color, texture...
			- Random Forest (tree which contains many properties of image, choose branch at each step, end up at an image class), Ada Boost, Support Vector Machine, Neural Networks
4. Decision Making
#### Current Method (Deep Learning)
Just directly process the raw images, all 4 steps can be automated!
# Speech Recognition
#### Traditional
1. Audio Acquisition
2. Sound Pre-Processing: segregate the voiced region from the unvoiced part of the signal
	- Short-term Power: assume speech components of waveform is louder compared to background noise
	- Signal-to-Noise Ratio: way to normalize power (filter background noise)
	- Zero-crossing Rate: rate of signal changes from positive to zero to negative (higher in unvoiced segments)
	- Long-term Signal Variability: measures sound-wave entropy (lower for voiced parts vs unvoiced)
	- Formant structure (resonance): look at the peaks of waveforms to identify similar/same words
3. Acoustic Model: put in audio signal and get back phonemes
	1. Featurize raw waveforms: use 25ms sliding window frames spaced 10ms apart, transform into vector-valued quantities that model can deal with
	2. Acoustic Model: recognize sounds from vectors
		- Mel-Frequency Cepstral Coefficients: apply Discrete Fourier Transform to get power of speech at each frequency, give probability that a certain segment is a certain phoneme
	3. Lexicon: glue sounds into words (using a large database)
4. Language Model: model trained to predict the next word, handles mistakes that come from the acoustic model
	- N-Gram Model: Markov model trained to predict next word given N previous words
#### Current Method (Deep Learning)
Just directly process the raw audio, all 4 steps can be automated!