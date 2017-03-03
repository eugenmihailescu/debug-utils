#!/bin/bash
SRC=$(dirname "$0")
DST=/tmp/debug_utils_example

function fecho {
	echo -e "\e[1m\e[$1m$2\e[0m"
}
function echoy {
	fecho 93 "$1"
}
function edone {
	fecho 97 "Done\n"
}

echoy "Removing existing destination directory..."
rm -rf ${DST}
edone

echoy "Preparing the demo public directory..."
#create the public directory
mkdir -p "${DST}"

# copy our source includes
cp -P ${SRC}/../src/DebugConsoleUtils.js ${DST}
cp -P ${SRC}/index.html ${DST}

echoy "Starting the local PHP webserver..."
php -S localhost:3000 -t "${DST}"
