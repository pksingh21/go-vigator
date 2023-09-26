package main

import (
	"compress/gzip"
	"encoding/gob"
	"fmt"
	"github.com/lithammer/fuzzysearch/fuzzy"
	"github.com/pksingh21/go-vigator/filesystemsearch"
	"os"
	"sort"
)

func ExecuteSearchQuery(query string) (fuzzy.Ranks, error) {
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
	go filesystemsearch.Watch(rootFolder)
	filesystemsearch.Path = []string{}
	rootFolder.String("")
	fmt.Println("Path Array built with length ", len(filesystemsearch.Path))
	wordx := fuzzy.RankFindFold(query, filesystemsearch.Path)
	sort.Sort(wordx)
	if len(wordx) > 50 {
		wordx = wordx[:50]
	}
	return wordx, nil
}
