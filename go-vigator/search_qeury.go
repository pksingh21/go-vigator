package main

import (
	"compress/gzip"
	"encoding/gob"
	"fmt"
	"os"
	"sort"

	"github.com/lithammer/fuzzysearch/fuzzy"
	"github.com/pksingh21/go-vigator/filesystemsearch"
)

func ExecuteSearchQuery(query string) (fuzzy.Ranks, error) {
	// open the treeNew1.bin.gz file
	var rootFolder *filesystemsearch.Folder
	file, err := os.Open("treeNew1.bin.gz")
	if err != nil {
		fmt.Println("Error opening file:", err)
		rootFolde := filesystemsearch.BuildTree()
		rootFolder = rootFolde
	}
	defer file.Close()
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
	rootFolder.String("")
	wordx := fuzzy.RankFindFold(query, filesystemsearch.Path)
	sort.Sort(wordx)
	if len(wordx) > 50 {
		wordx = wordx[:50]
	}
	return wordx, nil
}
