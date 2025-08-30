#### Github File Process
- `git clone https://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@github.com/cu-csci-2275-fall-2023/assignment-1-NoahBSchwartz`
- `cd build; cmake ..; make; ./run_tests`
- Modify functions.cpp in code_1, main.cpp in app_1
- Repeat until complete: `make; ./run_tests_1; make; ./run_tests_1; make;` 
- `git status; git add app_1/main_1.cpp; git add code_1/functions.cpp;  git commit -m “2nd commit”; git push
#### Git Commands
- `git rebase`: when there are changes in main that we want to reflect and bring our branch to the same state as main (create new commits for every commit in the OG branch)
- `git fetch`: pulls all newly added branches from main so that they can be in local repo
	- `git checkout`: navigate between the branches created by git fetch
- `git rm`: remove files that have been staged for commit but are no longer needed (will remove from staging area and working directory)
	- `git rm --cached` (will only remove from staging area)
- `git stash`: store/save your current changes safely in one place (stash stack) so that you can work on something else and come back to project
	- `git stash -u:` use this one by default, stashes untracked files too
	- `git stash pop`: come back and resume saved work
	- `git stash list:` list all stashes (most recent on top)
- `git log`:  view the history of committed changes within a git repository
	- `git log -p`: view differences between commits
- `git revert`: create new commit that undoes the effects of previous commits
  [[Version Control]]
  