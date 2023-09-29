package main

import (
	"compress/gzip"
	"encoding/gob"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"

	"github.com/lithammer/fuzzysearch/fuzzy"
	"github.com/pksingh21/go-vigator/filesystemsearch"
)

func ExecuteSearchQuery(query string, path string) (fuzzy.Ranks, error) {
	// open the treeNew1.bin.gz file
	var rootFolder *filesystemsearch.Folder
	file, err := os.Open("treeNew1.bin.gz")
	if err != nil {
		fmt.Println("Error opening file:", err)
		rootFolde := filesystemsearch.BuildTree()
		fmt.Println("building tree done")
		rootFolder = rootFolde
	}
	defer file.Close()
	file, _ = os.Open("treeNew1.bin.gz")
	gzipReader, err := gzip.NewReader(file)
	if err != nil {
		fmt.Println("Error reading file:", err)
		return fuzzy.Ranks{}, err
	}
	defer gzipReader.Close()
	decoder := gob.NewDecoder(gzipReader)
	err = decoder.Decode(&rootFolder)
	if err != nil {
		fmt.Println("Error decoding binary data")
		return fuzzy.Ranks{}, err
	}

	segments := strings.Split(path, string(filepath.Separator))
	fmt.Println(segments)

	for i, segment := range segments {
		if i >= 1 && len(segment) > 0 {
			fmt.Println(segment)
			rootFolder = rootFolder.Folders[segment]
		}
	}
	// rootFolder = rootFolder.Folders["Users"].Folders["Ankit"].Folders["Downloads"]
	// fmt.Println(rootFolder.Files)
	// rootFolder = rootFolder.Folders["Users"].Folders["Ankit"].Folders["Downloads"]
	// fmt.Println(rootFolder.Folders)

	go filesystemsearch.Watch(rootFolder)
	filesystemsearch.Path = []string{}
	rootFolder.String("", 0)
	wordx := fuzzy.RankFindFold(query, filesystemsearch.Path)
	fmt.Println("Path Array built with length ", len(filesystemsearch.Path))
	sort.Sort(wordx)
	if len(wordx) > 200 {
		wordx = wordx[:200]
	}
	filesystemsearch.Encode(rootFolder)
	return wordx, nil
}
