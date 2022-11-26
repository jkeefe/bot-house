import * as fs from 'fs'
import dayjs from 'dayjs';
//  in case of module not found errors, try adding .js to end of filenames below
import updateLocale from 'dayjs/plugin/updateLocale.js';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

// set up the as-of date
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("America/New_York");
dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
    monthsShort: [
        "Jan.",
        "Feb.",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug.",
        "Sept.",
        "Oct.",
        "Nov.",
        "Dec."
    ],
    meridiem: (hour, minute, isLowercase) => (hour >= 12 ? "pm" : "am")
});

const getHour = time => {
    return dayjs
        .unix(time)
        .tz("America/New_York")
        .format("h a");
};


/// operational functions 


const getData = async (filename) => {

    let rawdata = fs.readFileSync(filename);
    const data = JSON.parse(rawdata)
    return data

}

const formatData = (body) => {

    const wxdata = {
        current: {
            sky: body.currently.summary,
            summary: body.minutely.summary,
            temperature: Math.round(body.currently.temperature),
            feels_like: Math.round(body.currently.apparentTemperature),
            wind: `${Math.round(body.currently.windSpeed)} mph with ${Math.round(
                body.currently.windGust
            )} mph gusts`,
            icon: body.currently.icon
        },
        alerts: body.alerts ? body.alerts : []
    };

    // build the hourly deets
    let today = [];
    let counter = 0;
    for (let i = 1; i < body.hourly.data.length; i += 2) {
        counter++;

        if (counter > 12) {
            break;
        }

        const hour = {
            hour_id: `hour-${counter}`,
            time: getHour(body.hourly.data[i].time),
            icon: body.hourly.data[i].icon,
            summary: body.hourly.data[i].summary.replace("Possible", "Poss"),
            temperature: Math.round(body.hourly.data[i].temperature),
            feels_like: Math.round(body.hourly.data[i].apparentTemperature)
        };

        today.push(hour);
    }

    wxdata.today = today;

    return wxdata;
}

const writeData = (data) => {
    console.log(JSON.stringify(data, null, 2))
    fs.writeFileSync('data/latest.json', JSON.stringify(data));
    return true
}

const main = () => {

    getData("tmp/download.json")
        .then(formatData)
        .then(writeData)
        .catch(err => {
            console.error(err)
        })


}

main()