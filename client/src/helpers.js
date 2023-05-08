function checkString(str, title) {
    if (!str) throw `Error: You must supply a ${title}.`;
    if (typeof str !== "string")
        throw `Error: ${title} must be of type  string.`;
    str = str.trim();
    if (str.length === 0) throw `Error: ${title} must not be empty.`;
}

function checkEmail(str) {
    if (!str) throw `Error: You must supply an email address.`;
    if (!str.includes("@")) throw `Error: Input must be a valid email address.`;
    if (typeof str !== "string") throw `Error: Input must be of type  string.`;
    str = str.trim();
    if (str.length === 0) throw `Error: Input must not be empty.`;
}

function checkNumber(num, title) {
    if (!num) throw `Error: You must supply a ${title}.`;
    if (num < 0) throw `Error: ${title} must be a positive number.`;
}

function checkZipCode(zipCode) {
    if (!zipCode) throw "Error: You must supply a zip code.";

    const validZipCodeRegex = /^\d{5}$/;
    if (!validZipCodeRegex.test(zipCode))
        throw "Error: Invalid zip code format.";

    if (zipCode < 0) throw `Error: Zip Code must be a positive number.`;
}

function checkSelection(selection, title) {
    if (!selection) throw `Error: You must choose a ${title}.`;
}

function checkDate(date, title) {
    if (!date) throw `Error: You must supply a ${title}.`;
    let currentdate = new Date().toISOString().split("T")[0];
    if (
        date > currentdate &&
        (title === "Date of Birth" || title === "Start Date")
    )
        throw `Error: ${title} must be before ${currentdate}.`;

    // Check if the title is "Date of Birth" and the age is at least 18 years
    if (title === "Date of Birth") {
        let dob = new Date(date);
        let ageDiffMs = Date.now() - dob.getTime();
        let ageDate = new Date(ageDiffMs);
        let age = Math.abs(ageDate.getUTCFullYear() - 1970);

        if (age < 16) throw `Error: You must be at least 16 years.`;
    }
}

function checkUrl(url, title) {
    if (!url) throw `Error: You must supply a ${title}.`;
    if (typeof url !== "string") throw `Error: ${title} must be a valid link.`;
    url = url.trim();
    if (url.length === 0) throw `Error: ${title} must not be empty.`;

    const urlRegex =
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!urlRegex.test(url)) throw `Error: Invalid ${title} format`;
}

function compareDate(startDate, endDate, title) {
    if (startDate > endDate)
        throw `Error: ${title} Start date must be before end date.`;
}

module.exports = {
    checkString,
    checkEmail,
    checkNumber,
    checkZipCode,
    checkSelection,
    checkDate,
    checkUrl,
    compareDate,
};
