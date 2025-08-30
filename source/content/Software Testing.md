1. Unit Testing: works well with modular (lot of functions) code, where each function has a unit test. 
	- Tests look for expected and unexpected inputs
	- Automated Testing: most often used, be sure to have a testing framework, have expected value for every function, 
1. Integration Testing: individual units are combined and tested as a group
2. Regression Testing: re-execute all tests to see if anything is impacted by code changes (before pushing to production)
3. Use Case Testing: tests based on the use cases of the app (test out for different kinds of users)
4. User Acceptance Testing: like a focus group to see if the system is intuitive and good for real people
	- Have an outline of testing strategy
	- Have a log of what happened
	- Collect a user sign off (indicate that they're satisfied)
5. Performance Testing: establish the benchmark behavior of system
	- Load testing/ volume testing/ endurance testing: testing sustainability of system under continuous load
	- Stress testing: make sure if system fails, nothing catastrophic will happen
6. Waterfall Testing Practices: there is a sequence of stages in which the output of each stage becomes the input for the next
### Development
1. Test Driven Development: write your tests before you write your functions
2. Behavior Driven Development: extension of TDD where test cases are written in natural language for technical and nontechnical stakeholders 
	- In the form of: given, when, then
		Ex. given: user navigates to home page, when: user clicks search, then: user sees search results
3. Continuous Integration: integrate and build the system several times a day to make sure everything's working. Every time a person pushes their code to the repository, automated integration testing runs