
# GO-VIGATOR

A File Explorer for Windows with  fast searching capabilities and essential functionalities 


## How to Install

To Install this project run

### Step 1
Clone the project locally in your system
```bash
    git clone github.com/pksingh21/go-vigator
```

### Step 2
Create a Virtual Environment Python script
```bash
    python -v venv .env
```

### Step 3
Install the dependencies for the Python files which can be found in the filesystem search folder in the repo ( which is an independent Golang package in itself. ) 
```bash
    pip install -r requirement.txt
```

### Step 4
Open up the Project or you could run your Wails dev server 
```bash
    open govigator.exe
```

### Step 5
Run the Python script to get the logs for file system changes to update the cache which can be found in your C:\Users\{UserName}
```bash
    python filesystemWatcher.py
```



## ROADMAP of Working

1. Native APIs are written in Go and GUI in React using Wails.
2. APIs written use Golang system independent APIs like fetching file information inside directories while their icons are fetched using native windows apis. 
3. We are also keeping track of their history in the backend using a simple Linked List approach called on each update path request.
4. In order to Implement the fast searching we are caching all the paths in the system in treenew1.bin.gz, so for the first search it will take time about 1-2 minutes to build the cache.
5. To update the cache afterwards we have written a Python script that will log the updates in the file system in realTime and whenever you make a search request we read these logs and update the cache.
6. Over the cache built we have applied a fuzzy search algorithm.

## BenchMark
for this array of fileNames, the time taken to search from the array of path is 
```bash
searchFiles := []string{"531-rebuilds-with-cache.zip",
		"go.mod.tmpl",
		"__init__.pyc",
		"C_IS2022.DLL",
		"amd64_microsoft-windows-s..subsystem.resources_31bf3856ad364e35_10.0.22621.1_en-gb_4dd2e2d1170109f9.manifest",
		"IMG_0810.HEIC",
		"jar_obj.png",
		"gcard_frame_pathfinder_season02_epic_01(01).rpak",
		"4eb0f8cc4755f8b28a52d6cc22a52aeb0a4948ed-12",
		"Rangoon"}
```
### Metrics
| File Number | Search Time |
|-------------|-------------|
| 0th file    | 2.7603966s  |
| 1st file    | 2.1872565s  |
| 2nd file    | 2.4812174s  |
| 3rd file    | 2.5870516s  |
| 4th file    | 3.7700409s  |
| 5th file    | 2.1797018s  |
| 6th file    | 2.2011883s  |
| 7th file    | 2.8188027s  |
| 8th file    | 2.7556473s  |
| 9th file    | 1.9807644s  |

### SystemState
With TreeBin size of `5900 KB`
With a Storage Size of `around 800GB`

# FutureWork
1. Implement the Go routine Watch Properly so that it is not invoked more than once. (currently called for every search query)
2. Search in an array can be done parallelly currently done linearly
3. Some GUI fixes like on search sometimes file won't open
