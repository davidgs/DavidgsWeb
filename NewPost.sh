#!/bin/bash

echo -n "Enter Blog Post Title: "
read title
echo -n "Enter Category Path:   "
read category
echo -n "Add other categories:  "
read cats

#echo $title
#echo $category
lower=`echo "$title" | tr '[:upper:]' '[:lower:]'`
#echo $lower
slug=`echo "${lower// /-}"`
date=$(date '+%Y-%m-%d')
#echo $date

newPostDir=content/posts/category/$category/$slug
mkdir $newPostDir
mkdir $newPostDir/images
echo "---" > $newPostDir/index.en.md
echo "Title: \"$title\"" >> $newPostDir/index.en.md
echo "Date: $date" >> $newPostDir/index.en.md
echo "Category: $cats" >> $newPostDir/index.en.md
echo "Slug: $slug" >> $newPostDir/index.en.md
echo "hero: " >> $newPostDir/index.en.md
echo "---" >> $newPostDir/index.en.md
echo " " >> $newPostDir/index.en.md
#---
#title: "Swagger API access with Camunda Platform"
#Date: 2021-03-10
#Author: davidgs
#Category: Camunda, BPMN, DevRel
#Slug: swagger-api-access-with-camunda-platform
#hero: images/mimi-thian-VEKWzpQu-5M-unsplash-2.jpg
#---