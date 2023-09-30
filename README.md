
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
