function checkString(str, title) {
    if (!str) throw new Error(` You must supply a ${title}.`);
    if (typeof str !== "string")
        throw new Error(` ${title} must be of type  string.`);
    str = str.trim();
    if (str.length === 0) throw new Error(` ${title} must not be empty.`);
}

function checkEmail(str) {
    if (!str) throw new Error(` You must supply an email address.`);
    if (!str.includes("@"))
        throw new Error(` Input must be a valid email address.`);
    if (typeof str !== "string")
        throw new Error(` Input must be of type  string.`);
    str = str.trim();
    if (str.length === 0) throw new Error(` Input must not be empty.`);
}

function checkNumber(num, title) {
    if (!num) throw new Error(` You must supply a ${title}.`);
    if (num < 0) throw new Error(` ${title} must be a positive number.`);
}

function checkZipCode(zipCode) {
    if (!zipCode) throw new Error(` You must supply a zip code.`);

    const validZipCodeRegex = /^\d{5}$/;
    if (!validZipCodeRegex.test(zipCode))
        throw new Error(` Invalid zip code format.`);

    if (zipCode < 0) throw new Error(` Zip Code must be a positive number.`);
}

function checkSelection(selection, title) {
    if (!selection) throw new Error(` You must choose a ${title}.`);
}

function checkDate(date, title) {
    if (!date) throw new Error(` You must supply a ${title}.`);
    let currentdate = new Date().toISOString().split("T")[0];
    if (
        date > currentdate &&
        (title === "Date of Birth" || title === "Start Date")
    )
        throw new Error(` ${title} must be before ${currentdate}.`);

    // Check if the title is "Date of Birth" and the age is at least 18 years
    if (title === "Date of Birth") {
        let dob = new Date(date);
        let ageDiffMs = Date.now() - dob.getTime();
        let ageDate = new Date(ageDiffMs);
        let age = Math.abs(ageDate.getUTCFullYear() - 1970);

        if (age < 16) throw new Error(` You must be at least 16 years.`);
    }
}

function checkUrl(url, title) {
    if (!url) throw new Error(` You must supply a ${title}.`);
    if (typeof url !== "string")
        throw new Error(` ${title} must be a valid link.`);
    url = url.trim();
    if (url.length === 0) throw new Error(` ${title} must not be empty.`);

    const urlRegex =
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!urlRegex.test(url)) throw new Error(` Invalid ${title} format`);
}

function compareDate(startDate, endDate, title) {
    if (startDate > endDate)
        throw new Error(` ${title} Start date must be before end date.`);
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
