BOT_NAME:=bot_name_goes_here

all: initialize download-nws nws-data

initialize:
	-mkdir data
	-mkdir tmp

download:
	curl "https://api.darksky.net/forecast/$$DARK_SKY_KEY/$$MY_LAT,$$MY_LON" -o tmp/download.json

download-nws:
	curl --user-agent "Little Weather Box, john@reallygoodsmarts.nyc" \
	"https://digital.mdl.nws.noaa.gov/xml/sample_products/browser_interface/ndfdXMLclient.php?lat=40.87&lon=-73.92&product=time-series&maxt=maxt&mint=mint&temp=temp&appt=appt&wspd=wspd&wgust=wgust&icons=icons" \
	-o tmp/nws.xml

nws-data:
	node process-nws-data.js

newdata:
	node process-data.js

#### --- Below are commands that are intended to run locally and manually --- ####

clean:
# delete tmp and public directories for simulating initial state locally
	-rm -rf tmp
	-rm -rf data