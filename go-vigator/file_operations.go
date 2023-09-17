package main
import (
	"fmt"
	"os/exec"
	"runtime"
	"syscall"
	"os/user"
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


func (a *App) OpenFile(filePath string) error {
	// exec handled by OS and not by a separate go routine or thread 
	// it is async as well so we can add a cursor rotation if we want while it is opening
	var cmd *exec.Cmd
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