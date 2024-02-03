export default function timeDisplay(createdat) {
    var time = Date.now() - Date.parse(createdat);
    var timedisplay;
    if (time < 60 * 1000) {
        timedisplay = `${Math.floor(time / 1000)} seconds ago`
    } else if (time < 60 * 60 * 1000) {
        timedisplay = `${Math.floor(time / (60 * 1000))} minutes ago`
    } else if (time < 24 * 60 * 60 * 1000) {
        timedisplay = `${Math.floor(time / (60 * 60 * 1000))} hours ago`
    } else if (time < 7 * 24 * 60 * 60 * 1000) {
        timedisplay = `${Math.floor(time / (24 * 60 * 60 * 1000))} days ago`
    } else {
        timedisplay = `${Math.floor(time / (7 * 24 * 60 * 60 * 1000))} weeks ago`
    }
    return timedisplay;
}