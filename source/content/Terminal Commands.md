# General 
- Click on up arrow to get back history
- Press tab to autocomplete line
- Type `man <command>` to access the manual for a specific command
# Simple Syntax 
- Prints out all files in directory: `ls`
- Prints all current running processes: `ps`
	- `ps aux grep "bash"`
- Transport to directory: `cd`
- Clear terminal: `clear
- Go back a directory: `cd ..` (to go back multiple: `cd ../../..`)
- To relocate a file: `mv ./folder1/sample.txt ../folder2`
- Print out working directory: `pwd`
- Create a file: `touch`
	- Create a directory: `mkdir`
- Compile file into executable: `g++ file.cpp`
- Delete a file: `rm`
	- Delete directory: `rm -r folder1`
- Change file: `sudo nano file.cpp`
- Search for a phrase in file: `grep "test" file.txt`
- `./program &` run program as a background process (use `ps` to view all running processes)
	- `kill <pid>` to terminate
# Complex Syntax
- Piping: if you want to pass output of one command to another command ie. `grep "test" file.txt | tee output.txt` (tee is write command)
  - Print contents of file: `cat file.cpp`
	- Print contents in user-friendly way: `more file.c` or `less file.c`
	- Print head of file: `head`
	- Print tail of file: `tail`
	- Count # of lines, words, characters in file: `wc`
	- Write to file: `echo "Hello World" > sample.txt` (overwrites)
		- Append to file: `echo "Hello World" >> sample.txt`
- Vim: another way to modify file
	- Create file: `vi sample.txt`
	- When in file, press `i` to start typing (press esc to exit insert mode)
	- Exit file: `:q` or `:wq` (write and quit to save file before exiting) 
- Change file permission to make it executable: `chmod +x file.sh`
# Virtual Environments
- Create venv: `python3 -m venv fprime-venv`
- Open venv: `source fprime-venv/bin/activate`
- Close venv: `deactivate`
# Tools
- Valgrind (memory leak detection): `g++ -g leak.cpp -o test_out; 
	`valgrind --tool=memcheck --leak-check=yes ./test_out;`
	- Make sure to include `-g` flag
[[Git]]
[[Regex]]
[[Jupyter Notebook]]
[[Markdown]]

