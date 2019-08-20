# astrostore-firefox-extension
Companion to the astrostore.io web app. Use this extension to quickly add new bookmarks to your personal collection! 


## Build environment
- Node: >=10.16.3
- yarn: >=1.17.3


## Build Steps
- Clone repo to your local computer
- You will see that a "build" folder and build.zip exist. If you want to compile from the original source code, delete these. Otherwise jump down to "Test in Firefox"
- From the command line, run "yarn install" in the main directory to install the necessary dependencies as indicated in the package.json and yarn.lock files
- Once the depencies have been succesfully install, enter "yarn run build" in the command line to execute the build script. This will generate a new directory called "build"
- Open the new "build" directory and compress all of the contained files into a single zip archive
- I will refer to this archive as "build.zip" in the next set of directions


## Test in Firefox
- In Firefox, go to "about:debugging"
- Choose "Load Temporary Add-On..." and select the the "build.zip" archive included in this repository

If all goes well, a little space man should appear in your browser toolbar :)
