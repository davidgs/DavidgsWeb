#!/bin/bash

BASE="content/posts/category/iot/"
DIRS=`ls $BASE`
# echo $DIRS
for d in $DIRS
do
  #echo $d
  FILES=`ls $BASE/$d | grep '.md' | grep -v 'index'`
  for fl in $FILES
  do
    if [ -f $BASE/$d/$fl ]
    then
      pt=`echo $fl | awk -F'.' '{print $1}'`
      echo $BASE/$d/$pt
      mkdir $BASE/$d/$pt
      mkdir $BASE/$d/$pt/images
      mv $BASE/$d/$fl $BASE/$d/$pt/index.en.md
    fi
  done
done
