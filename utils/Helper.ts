// Packages imports
import { Alert, ToastAndroid, AlertButton, AlertOptions, Linking } from "react-native"
import dayjs from 'dayjs';
import dayOfYear from "dayjs/plugin/dayOfYear"

dayjs.extend(dayOfYear);

// Helper function to show toast
const ShowToast = (message: string, duration: number = 3000) => {
    ToastAndroid.show(message, duration)
}

// Helper function to show Alert boxes
const ShowAlert = (title: string, message?: string, buttons?: AlertButton[], options?: AlertOptions) => {
    Alert.alert(
        title,
        message,
        buttons,
        options
    );
}

// function to give otp from a message else null
function get_otp(message: string) {
    if (!message) return "";

    let otp = message.match(/\b\d{6}\b/);

    if (otp && otp.length > 0) return otp[0];

    return "";
}

// generate a random unique id
const GenerateUniqueID = () => {
    return Math.floor(Math.random() * Date.now()).toString();
}

// function to get mimeType from url
function get_file_type(url: string) {
    let imageExtensions = ["jpg", "jpeg", "png"];
    let videoExtensions = ["mp4", "mkv"];
    let audioExtensions = ["mp3", "wav", "mpeg", "m4a", "aac"];

    let extension = url.split(".").pop() ?? "";

    if (imageExtensions.includes(extension)) return "image";
    else if (videoExtensions.includes(extension)) return "video";
    else if (audioExtensions.includes(extension)) return "audio";
    else return null;
}

// get seconds in h:mm:ss format
const get_seconds_format = (duration: number) => {
    let sec_num = Math.round(duration);
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor(sec_num / 60) % 60;
    let seconds = sec_num % 60;

    return [hours, minutes, seconds]
        .map((v) => (v < 10 ? "0" + v : v))
        .filter((v, i) => v !== "00" || i > 0)
        .join(":");
};

// Get timestamp converted to a string with appropriate format
// For Ex - "1 day ago", "1 hour ago", "1 minute ago", "Yesterday"
// and after that it will return the date in the format "dd/mm/yyyy"
function get_time_ago(timestamp: string) {
    if (!timestamp) return "";

    if (typeof timestamp !== "string") return "";

    let date = new Date(timestamp);
    let now = new Date();
    let seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    if (seconds < 60) {
        return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
    } else if (minutes < 60) {
        return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    } else if (hours < 24) {
        return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else if (days < 3) {
        return days === 1 ? "Yesterday" : `${days} days ago`;
    } else {
        return date.toLocaleDateString();
    }
}

// function to abbreviate a string 
// 2500 becomes 2.5K
// 250000 becomes 2.5M
// 99 becomes 99
// 1500 becomes 1.5K
function abbreviate_number(number: number) {
    if (!number) return "0"

    if (number < 1000) return number;

    if (number < 1000000) {
        return `${(number / 1000).toFixed(0)}K`;
    } else {
        return `${(number / 1000000).toFixed(0)}M`;
    }
}

// open whatsapp
async function OpenWhatsApp(phone: string) {
    try {
        let mobile_number = `+91${phone}`;
        let whatsapp_url = `whatsapp://send?text=&phone=${mobile_number}`
        Linking.openURL(whatsapp_url);
    } catch (error) {
    }
}

// Get datetime in h:mm A format
function get_formatted_time(datetime: string) {
    const newDate = dayjs(datetime);
    return newDate.format("h:mm A");
}

const get_comment_count_words = (count: number) => {
    if (count === 0) {
        return "No comments";
    } else if (count === 1) {
        return `View ${count} comment`;
    } else {
        return `View all ${count} comments`;
    }
};

const get_likes_words = (likes: number) => {
    if (likes === 0) {
        return "No likes";
    } else if (likes === 1) {
        return `1 like`;
    } else {
        return `${likes} likes`;
    }
};

const get_time_diff = (DateTime: string) => {
    const postDate = dayjs(DateTime);
    const currentDate = dayjs();

    let secondsDiff = currentDate.diff(postDate, "seconds");

    if (secondsDiff < 60) {
        return `${secondsDiff} seconds ago`;
    } else if (secondsDiff < 3600) {
        return `${Math.floor(secondsDiff / 60)} minutes ago`;
    } else if (secondsDiff < 86400) {
        return `${Math.floor(secondsDiff / 3600)} hours ago`;
    } else if (secondsDiff < 604800) {
        return `${Math.floor(secondsDiff / 86400)} days ago`;
    } else {
        return postDate.format("MMM DD, YYYY");
    }

};

// get top date data
const get_top_date = (dateOne: string, dateTwo: string) => {
    // if day number of dateTwo is not same as day number of dateOne
    // then return dateTwo in formatted way
    // otherwise return an empty string

    if (!dateOne) return null;
    if (!dateTwo) return dayjs(dateOne).format("MMM DD, YYYY");

    let year_one = dayjs(dateOne).year();
    let year_two = dayjs(dateTwo).year();

    if (year_one - year_two > 0) return dayjs(dateOne).format("MMM DD, YYYY");

    let dayOfYear_one = dayjs(dateOne).dayOfYear();
    let dayOfYear_two = dayjs(dateTwo).dayOfYear();

    if (dayOfYear_one - dayOfYear_two > 0) return dayjs(dateOne).format("MMM DD, YYYY");

    return null;
};

// function to get mimeType from url
function get_mime_type(url: string) {
    let imageExtensions = ["jpg", "jpeg", "png"];
    let videoExtensions = ["mp4", "mkv"];
    let audioExtensions = ["mp3", "wav", "mpeg", "m4a", "aac"];

    let extension = url.split(".").pop() ?? "";

    if (imageExtensions.includes(extension)) return `image/${extension}`;
    else if (videoExtensions.includes(extension)) return `video/${extension}`;
    else if (audioExtensions.includes(extension)) return `audio/${extension}`;

    return null;
}

// function to get the file name part from url
function get_file_name(url: string) {
    let fileName = url.split("/").pop();
    return fileName;
}

// Exports
const Helper = {
    ShowToast,
    ShowAlert,
    GenerateUniqueID,
    get_file_type,
    get_time_ago,
    abbreviate_number,
    OpenWhatsApp,
    get_formatted_time,
    get_top_date,
    get_seconds_format,
    get_otp,
    get_comment_count_words,
    get_time_diff, get_likes_words,
    get_mime_type,
    get_file_name
}

export default Helper;