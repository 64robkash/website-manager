@echo off
echo Initializing Git repository...
git init

echo Adding all files...
git add .

echo Creating initial commit...
git commit -m "Initial commit: TaskFlow project with Firebase integration"

echo Setting up main branch...
git branch -M main

echo Adding remote repository...
git remote add origin https://github.com/64robkash/website-manager.git

echo Pushing code to GitHub...
git push -u origin main

echo Done! Press any key to exit.
pause 