package main

import (
	"context"
	"fmt"
	"os"
	"os/user"
	"syscall"
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

func convertiKBorMB(size int64) string {
	// function to convert the given 64 byte size to KB or MB and add KB or MB to the end of the size
	// if size is less than 1024 then return size + KB
	// if size is greater than 1024 then return size / 1024 + MB
	if size >= 1024*1024 {
		return fmt.Sprint(size/(1024*1024)) + "MB"
	} else if size >= 1024 {
		return fmt.Sprint(size/1024) + "KB"
	} else {
		return fmt.Sprint(size) + "B"
	}
}
func GetFilesAndDirectories(path string) []CustomFile {
	var filesAndDirectories []CustomFile
	fileInfos, err := os.ReadDir(path)
	if err != nil {
		return nil
	}

	for _, fileInfo := range fileInfos {
		if fileInfo.Name() == "." || fileInfo.Name() == ".." {
			continue
		}
		extraFileInfo, _ := os.Stat(path + "/" + fileInfo.Name())
		uuid := extraFileInfo.Sys().(*syscall.Stat_t).Uid
		uuid_string := fmt.Sprint(uuid)
		userName, _ := user.LookupId(uuid_string)
		groupName, _ := user.LookupGroupId(fmt.Sprint(extraFileInfo.Sys().(*syscall.Stat_t).Gid))
		file := CustomFile{
			IsDirectory: fileInfo.IsDir(),
			IsFile:      !fileInfo.IsDir(),
			Name:        fileInfo.Name(),
			Owner:       userName.Name,
			Group:       groupName.Name,
			LatestTime:  extraFileInfo.ModTime().String(),
			Size:        convertiKBorMB(extraFileInfo.Size()),
		}
		filesAndDirectories = append(filesAndDirectories, file)
	}

	return filesAndDirectories
}

func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) GetFiles(path string) []CustomFile {
	var allFiles =  GetFilesAndDirectories(path)
	return allFiles
}

func (a *App) GetCurrentDirectory() string {
	currentDirectory, _ := os.Getwd()
	return currentDirectory
}
