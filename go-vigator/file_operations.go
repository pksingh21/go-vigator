package main

import (
	"fmt"
	"os/exec"
	"path/filepath"
	"runtime"

	// "syscall"
	"os"
)

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
		// uuid := extraFileInfo.Sys().(*syscall.Stat_t).Uid
		// uuid_string := fmt.Sprint(uuid)
		// userName, _ := user.LookupId(uuid_string)
		// groupName, _ := user.LookupGroupId(fmt.Sprint(extraFileInfo.Sys().(*syscall.Stat_t).Gid))
		file := CustomFile{
			IsDirectory: fileInfo.IsDir(),
			IsFile:      !fileInfo.IsDir(),
			Name:        fileInfo.Name(),
			// Owner:       userName.Name,
			// Group:       groupName.Name,
			LatestTime: extraFileInfo.ModTime().String(),
			Size:       convertiKBorMB(extraFileInfo.Size()),
		}
		filesAndDirectories = append(filesAndDirectories, file)
	}

	return filesAndDirectories
}

func (a *App) OpenFile(filePath string) error {
	// exec handled by OS and not by a separate go routine or thread
	// it is async as well so we can add a cursor rotation if we want while it is opening
	fmt.Println(filePath)
	var cmd *exec.Cmd
	// cmd = exec.Command("start", filePath)
	switch runtime.GOOS {
	case "darwin":
		// macOS
		cmd = exec.Command("open", filePath)
	case "linux":
		// Linux
		cmd = exec.Command("xdg-open", filePath)
	case "windows":
		// Windows
		cmd = exec.Command("cmd.exe", "/C", "start", filePath)
	default:
		return fmt.Errorf("unsupported operating system")
	}

	// Execute the command to open the file.
	if err := cmd.Run(); err != nil {
		return err
	}

	return nil
}

func (a *App) DeleteFolder(path string, folderName string) bool {
	// Construct the full path to the folder to be deleted
	folderPath := filepath.Join(path, folderName)

	// Use os.RemoveAll to delete the folder and its contents
	err := os.RemoveAll(folderPath)
	if err != nil {
		// Handle the error, e.g., log it or return false
		return false
	}

	// Folder deletion was successful
	return true
}

func (a *App) CreateNewFolder(path string, folderName string) bool {
	// Create the full path by combining the provided path and folder name
	fullPath := filepath.Join(path, folderName)

	// Check if the folder already exists
	if _, err := os.Stat(fullPath); os.IsNotExist(err) {
		// Folder does not exist, so create it
		err := os.MkdirAll(fullPath, os.ModePerm)
		if err != nil {
			fmt.Printf("Error creating folder: %v\n", err)
			return false
		}
		fmt.Printf("Folder '%s' created successfully at '%s'\n", folderName, fullPath)
		return true
	} else if err != nil {
		fmt.Printf("Error checking folder: %v\n", err)
		return false
	} else {
		fmt.Printf("Folder '%s' already exists at '%s'\n", folderName, fullPath)
		return false
	}
}

func (a *App) CreateNewFile(path, fileName string) bool {
	// Ensure the path exists, create it if it doesn't
	if err := os.MkdirAll(path, os.ModePerm); err != nil {
		// Handle the error if needed
		return false
	}

	// Join the path and file name to get the complete file path
	filePath := filepath.Join(path, fileName)

	// Create a new file
	file, err := os.Create(filePath)
	if err != nil {
		// Handle the error if needed
		return false
	}
	defer file.Close()

	// File created successfully
	return true
}
