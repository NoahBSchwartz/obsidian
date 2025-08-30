1. Pneumatics: take energy from a compressor and transform it into mechanical energy
2. Hydraulics: take energy stored in oil reservoir and transform it into mechanical energy
3. Shape Memory Alloys: material changes its shape for a given temperature
4. Magneto Strictive Actuators: very slightly changes shape (for high precision applications)
	- Piezoelectric Actuators: uses piezoelectric effect to achieve high precision
# Manipulators
Think of a robot as a set of links (rigid element ie. forearm segment) connected in a chain through multiple joints (moving element ie. pivot point)
1. Unconstrained Motion: manipulator can freely move in workspace
2. Degree of Freedom: number of joints in robot (to move anywhere and orient anywhere in 3D you need 6 degrees of freedom)
3. Types of Joints: ![[Screenshot 2025-03-05 at 3.25.29 PM.png]]
# Forward Kinematics
Given a sequence of commands what is the final position of the robotic arm
- Just use trig to evaluate 1 joint after another![[Screenshot 2025-03-05 at 3.41.48 PM.png]]
# Inverse Kinematics
Given a desired position of the robotic arm what sequence of commands will bring it to that position![[Screenshot 2025-03-05 at 4.10.57 PM.png]]
