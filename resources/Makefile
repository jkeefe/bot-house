BOT_NAME:=bot_name_goes_here

all: initialize download timestamp newdata maps upload

initialize:
	npm install --no-package-lock
	-mkdir data
	-mkdir tmp

download:
	# grab any files you'll need. Example:
	# curl "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson" -o tmp/download.json

timestamp:
	# add a timestamp to the latest data download
	# on local macs, this requires jq ... brew install jq
	cat ./tmp/download.json | jq -c --arg date "$$( date -u +%s)" '. + {"as_of": $$date}' > ./data/latest.json

newdata:
	# PROCESS YOUR DATA HERE!
	# this is where you process your data into something new for the NYT
	# can also add subdirectories, etc.
	# usually this ends by running a nodejs file that handles various processing

maps:
	# were we build maps, usually with mapshaper
	# access mapshaper using ../../node_modules/.bin/mapshaper
	# Example: 
	# ./node_modules/.bin/mapshaper -i ./tmp/example.shp \
	# -o format=geojson precision=0.001 ./data/example.json

archive:
	cp ./data/latest.json ./data/archive/`date +"%Y%m%d_%H%M"`.json


alerts:
	# optional spot for running a script that sends slack messages
	# ... if not handled in the data processing step


#### --- Below are commands that are intended to run locally and manually --- ####

clean:
# delete tmp and public directories for simulating initial state locally
	-rm -rf tmp
	-rm -rf data