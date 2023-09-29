package main

import (
	"bytes"
	"context"
	"encoding/base64"
	"fmt"
	"image/png"
	"os"
	"os/user"
	"path/filepath"
	"sync"
	"syscall"
	"unsafe"

	"github.com/lithammer/fuzzysearch/fuzzy"
	"github.com/lxn/walk"
	"github.com/lxn/win"
	"github.com/pksingh21/go-vigator/filesystemsearch"
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
	UserName    string
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

func (a *App) ExecuteSearchQueryWrapper(path string, filename string) (fuzzy.Ranks, error) {
	return ExecuteSearchQuery(path, filename)
}
func (a *App) WriteToDisk(ctx context.Context) {
	filesystemsearch.OnExit()
}

func (a *App) GetUser() string {
	userName, err := user.Current()
	if err != nil {
		return "error"
	}

	fmt.Println(userName.HomeDir)
	return userName.HomeDir
}

// SHFILEINFO struct from Windows API

// func (a *App) GetIcon(filePath string, flags uint32) (string, error) {

// 	psfi := &win.SHFILEINFO{}
// 	fileInfoFlags := win.SHGFI_ICON | win.SHGFI_DISPLAYNAME
// 	// Convert the Go string to a UTF-16 encoded string
// 	pszPath, err := syscall.UTF16PtrFromString(filePath)
// 	if err != nil {
// 		fmt.Println("Error:", err)
// 	}

// 	ret := win.SHGetFileInfo(
// 		pszPath,
// 		0,
// 		psfi,
// 		uint32(unsafe.Sizeof(psfi)),
// 		uint32(fileInfoFlags),
// 	)
// 	fmt.Println(ret)
// 	// icon := uintptr(psfi.HIcon)
// 	// You can use the icon handle for various purposes, e.g., displaying it in your GUI.

// 	// shfi.DisplayName contains the display name of the file or folder
// 	displayName := syscall.UTF16ToString(psfi.SzDisplayName[:])

// 	// Close the icon handle when you're done with it
// 	defer win.DestroyIcon(psfi.HIcon)

// 	// Print the display name
// 	println("Display Name:", displayName)

// 	// iconBytes := make([]byte, 0)
// 	// for _, b := range *(*[4096]byte)() {
// 	// 	if b == 0 {
// 	// 		break
// 	// 	}
// 	// 	iconBytes = append(iconBytes, b)
// 	// }
// 	// iconBase64 := base64.StdEncoding.EncodeToString(iconBytes)

// 	return "iconBase64", nil
// }

var mu sync.Mutex

func (a *App) GetIcon(folderPath string, fileName string) (string, error) {
	mu.Lock()
	defer mu.Unlock()

	fullpath := filepath.Join(folderPath, fileName)
	psfi := &win.SHFILEINFO{}
	fileInfoFlags := win.SHGFI_ICON | win.SHGFI_DISPLAYNAME
	pszPath, err := syscall.UTF16PtrFromString(fullpath)
	if err != nil {
		return "", err
	}

	ret := win.SHGetFileInfo(
		pszPath,
		0,
		psfi,
		uint32(unsafe.Sizeof(psfi)),
		uint32(fileInfoFlags),
	)

	if ret == 0 {
		return "", fmt.Errorf("SHGetFileInfo failed")
	}

	icon := uintptr(psfi.HIcon)
	defer win.DestroyIcon(win.HICON(icon)) // Clean up the icon resource when the function exits.

	image1, err := walk.NewIconFromHICONForDPI(win.HICON(icon), 96)
	if err != nil {
		return "", err
	}

	bitmap, err := walk.NewBitmapFromIconForDPI(image1, image1.Size(), 96)
	if err != nil {
		return "", err
	}

	image2, err := bitmap.ToImage()
	if err != nil {
		return "", err
	}

	var buf bytes.Buffer

	// Encode the image as PNG to the buffer
	err = png.Encode(&buf, image2)
	if err != nil {
		return "", err
	}

	// Encode the buffer content as a base64 string
	encodedStr := base64.StdEncoding.EncodeToString(buf.Bytes())

	return encodedStr, nil
}
