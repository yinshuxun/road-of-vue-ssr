#!/usr/bin/env bash
#set message

set -e
echo "Enter message: "
read MESSAGE

echo "Pushing $MESSAGE ..."
# commit
git add -A
git commit -m "$MESSAGE"

# push
git push