package main

import (
	"context"
	"fmt"
	"github.com/pksingh21/go-vigator/filesystemsearch"
	"os"

	"github.com/lithammer/fuzzysearch/fuzzy"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name

type CustomFile struct {
	IsDirectory bool
	IsFile      bool
	Name        string
	Owner       string
	Group       string
	// add a time field for last modified
	// add a size field for size of file
	LatestTime string
	Size       string
}

func (a *App) GetCurrentDirectory() string {
	currentDirectory, _ := os.Getwd()
	return currentDirectory
}

var history = NewDirectoryHistory()

func (a *App) GoForward() (string, error) {
	// call the go forward method from the history stack
	if dir, err := history.GoForward(); err == nil {
		fmt.Printf("Went forward to: %s\n", dir)
		return dir, nil
	}
	return "", fmt.Errorf("cannot go forward further")
}

func (a *App) GoBackward() (string, error) {
	if dir, err := history.GoBack(); err == nil {
		fmt.Printf("Went backward to: %s\n", dir)
		return dir, nil
	}
	return "", fmt.Errorf("cannot go back further")
}

func (a *App) PushToHistory(path string) {
	history.Push(path)
}

func (a *App) GetFiles(path string) []CustomFile {
	return GetFilesAndDirectories(path)
}

func (a *App) ExecuteSearchQueryWrapper(path string) (fuzzy.Ranks, error) {
	return ExecuteSearchQuery(path)
}
func (a *App) WriteToDisk(ctx context.Context) {
	filesystemsearch.OnExit()
}
