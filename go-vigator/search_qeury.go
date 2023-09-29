package main

import (
	"compress/gzip"
	"encoding/gob"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"time"

	"github.com/lithammer/fuzzysearch/fuzzy"
	"github.com/pksingh21/go-vigator/filesystemsearch"
)

func ExecuteSearchQuery(query string, path string) (fuzzy.Ranks, error) {
	// open the treeNew1.bin.gz file

	start := time.Now()
	var rootFolder *filesystemsearch.Folder
	var Head *filesystemsearch.Folder
	file, err := os.Open("treeNew1.bin.gz")
	if err != nil {
		fmt.Println("Error opening file:", err)
		rootFolde := filesystemsearch.BuildTree()
		elapsed := time.Since(start)
		fmt.Println("building tree done in ", elapsed.Abs().Minutes(), " minutes")
		rootFolder = rootFolde
	}
	defer file.Close()
	start = time.Now()
	file, _ = os.Open("treeNew1.bin.gz")
	gzipReader, err := gzip.NewReader(file)
	if err != nil {
		fmt.Println("Error reading file:", err)
		return fuzzy.Ranks{}, err
	}
	elapsed := time.Since(start)
	defer gzipReader.Close()
	decoder := gob.NewDecoder(gzipReader)
	err = decoder.Decode(&rootFolder)
	if err != nil {
		fmt.Println("Error decoding binary data")
		return fuzzy.Ranks{}, err
	}
	fmt.Println("Decoded tree in ", elapsed.Abs().Seconds(), " seconds")
	Head = rootFolder
	fmt.Println("Head", Head)
	segments := strings.Split(path, string(filepath.Separator))

	for i, segment := range segments {
		if i >= 1 && len(segment) > 0 {
			fmt.Println(segment)
			rootFolder = rootFolder.Folders[segment]
		}
	}
	fmt.Println("Head after traversal ", Head)
	go filesystemsearch.Watch(Head)

	filesystemsearch.Path = []string{}
	rootFolder.String("", 0)
	start = time.Now()
	wordx := fuzzy.RankFindFold(query, filesystemsearch.Path)
	fmt.Println("Path Array built with length ", len(filesystemsearch.Path))
	elapsed = time.Since(start)
	fmt.Println("Rank Find", elapsed)

	start = time.Now()
	sort.Sort(wordx)
	elapsed = time.Since(start)
	fmt.Println("Sort Time ", elapsed)
	// fmt.Println("Search results generated in ", elapsed.Abs().Seconds(), " seconds")
	if len(wordx) > 200 {
		wordx = wordx[:200]
	}
	start = time.Now()
	filesystemsearch.Encode(Head)
	elapsed = time.Since(start)
	fmt.Println("Encoded tree in ", elapsed.Abs().Seconds(), " seconds")
	return wordx, nil
}
