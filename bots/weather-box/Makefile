BOT_NAME:=bot_name_goes_here

all: initialize download newdata

initialize:
	npm install --no-package-lock
	-mkdir data
	-mkdir tmp

download:
	curl "https://api.darksky.net/forecast/$$DARK_SKY_KEY/$$MY_LAT,$$MY_LON" -o tmp/download.json

newdata:
	node process-data.js

#### --- Below are commands that are intended to run locally and manually --- ####

clean:
# delete tmp and public directories for simulating initial state locally
	-rm -rf tmp
	-rm -rf data