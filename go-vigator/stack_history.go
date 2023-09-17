package main

import (
	"fmt"
)

type DirectoryNode struct {
	Path string
	Next *DirectoryNode
	Prev *DirectoryNode
}

type DirectoryHistory struct {
	Current *DirectoryNode
}

func NewDirectoryHistory() *DirectoryHistory {
	return &DirectoryHistory{}
}

func (dh *DirectoryHistory) Push(path string) {
	// we are assuming that if the node link in front of the current node will be automatically reclaimed by garbage collection
	newNode := &DirectoryNode{Path: path, Next: nil, Prev: dh.Current}
	if dh.Current != nil {
		dh.Current.Next = newNode
	}
	dh.Current = newNode
}

func (dh *DirectoryHistory) GoBack() (string, error) {
	if dh.Current == nil {
		return "", fmt.Errorf("history is empty")
	}

	if dh.Current.Prev != nil {
		dh.Current = dh.Current.Prev
		return dh.Current.Path, nil
	}

	return "", fmt.Errorf("cannot go back further")
}

func (dh *DirectoryHistory) GoForward() (string, error) {
	if dh.Current == nil {
		return "", fmt.Errorf("history is empty")
	}

	if dh.Current.Next != nil {
		dh.Current = dh.Current.Next
		return dh.Current.Path, nil
	}

	return "", fmt.Errorf("cannot go forward further")
}

// func main() {
//     history := NewDirectoryHistory()

//     // Simulate navigating through directories
//     history.Push("/home/user/documents")
//     history.Push("/home/user/downloads")
//     history.Push("/home/user/music")

//     // Go back and forward
//     if dir, err := history.GoBack(); err == nil {
//         fmt.Printf("Went back to: %s\n", dir)
//     }

//     if dir, err := history.GoForward(); err == nil {
//         fmt.Printf("Went forward to: %s\n", dir)
//     }

//     // Print the current directory
//     fmt.Printf("Current directory: %s\n", history.Current.Path)
// }
