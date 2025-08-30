- Login: `ssh nosc1301[@login.rc.colorado.edu](<mailto:username@login.rc.colorado.edu>)`
- `suuser nosc1301 365` see how many service units I used in the past year
- `levelfs nosc1301` tells me how much priority is given to my job
- Git clone: **`eval "$(ssh-agent -s)", ssh-add ~/.ssh/id_rsa, ssh -T git@github.com, git clone...`**
- Venv
    1. run `acompile`
    2. `module load anaconda`
    3. `sbatch job_script.sh`
    4. `conda activate yoyodyne-venv2`
    5. `sacct` get all currently running jobs
    6. `scancel <Job ID>` cancel a currently running job
- For downloading a file off server: `scp [nosc1301@login.rc.colorado.edu](<mailto:nosc1301@login.rc.colorado.edu>):/projects/nosc1301/permutation-clm-data-augmentation/data-augmentation-and-masked-clm/yoyodyne-test.7369546.out /Users/noahschwartz/Desktop`
    - Then use `python3 spider_eval/parse_adam.py` to get data to graph