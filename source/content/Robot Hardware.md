1. Microcontroller: microcomputer integrated into a single computer chip
	- Details: could be 8-bit 16-bit 32-bit 64-bit
		- Max Clock Frequency (CPU speed): 8MHz – Up to 700MHz
		- Flash Memory: 4k to 2M bytes, Size of RAM: 1k to 1M Bytes
		- I/O Pins: pins act as Input/Output (can send 0/1 signals or detect 0/1 signals)
		- Operating voltage
		- Interface Type: different communication protocols used to interface controller w other things
			- I2C (Inter-Integrate-Circuit) (serial communication, half duplex, slow and low cost): handle 128 sensors/actutators
				Serial bus uses 2 pins: SDA (slave data address) and SCL (slave clock)
				1. Beginning of data transfer is indicated by a signal to SCL
				2. Next 7 bits sent correspond to address of the subordinate device
				3. Next 8 bits are the data sent
			- SPI (Serial Peripheral Interface) (fast 8 MBs, full duplex): Single master, multiple slaves
				SCLK (Serial Clock) sends out pulse, MOSI (Master Out Slave In) data output from master, MISO (Master In Slave Out) data output from slave, CS/SS (Chip/Slave Select) selects which slave to communicate with
			- UART (Universal Asynchronous Reception and Transmission): Simple serial communication protocol between two UARTs (asynchronous transmission = no clock)
				- Emitter converts parallel data into serial data, Receiver converts serial data into parallel data, Data Bus sends data
				-  Baud Rate: emitter adds a start bit then data bits and stop bit according to baud rate, receiver decodes these according to baud rate 
2. PLCs: Programmable Logic Controllers: Industrial digital computer used for control of manufacturing processes
3. Single-board Computer (SBC): full computer on single circuit board (needed for high-end sensors)
	ARM Architecture typically: More powerful than microcontroller but still compact and low energy 
4. Mini Computer: similar to PCs and laptops (x86 or x86-64), based on ARM (needed in things like self driving cars)
	Intel NUC
5. Cloud Computing: Benefits =  Offering a global library (ie. images or maps), Massively-parallel computation (motion planning task planning multi-robot collaboration), Robot sharing (share knowledge gained), Human sharing (open source code), human guidance (ie. error recovery), Augmented human-robot interaction (siri)
	- Cons: slower, network faults could be catastrophic
# Middleware
Manages the complexity of the hardware
1. Robot Operating System (ROS): ALL ABOUT CODE REUSE -> provides hardware abstraction (tools and libraries across robot system)
	Thin as possible (to integrate w other things), works w many languages, built-in unit tests so you can add features (scalable)
	1. ROS Communication Infrastructure: loosely couple ROS processes together
		- Synchronous RPC-style: links services of robot, Asynchronous streaming: links data between topics, parameter server: stores data 
	2. Nodes: individual (independent) processes in the robot that can be coupled together
		- Steps: register with the ROS Master node (provides naming and registration services), ROS nodes can now locate one another, master keeps track of nodes executed
		- Messages: string, Int, float, etc shared between nodes
		- Topics: one node can *publish* info that can be received by other nodes (categorized by topic name and message type), other nodes can *subscribe* to a certain topic
		- Services (call and response): like simply calling a specific function from code (call node and wait for it to return value)
	3. Packages: many nodes grouped together (to share between researchers using repositories)
		- ROS1 = not realtime, ROS2 = realtime
		- Launchers: XML files that specify how to launch the nodes of the package