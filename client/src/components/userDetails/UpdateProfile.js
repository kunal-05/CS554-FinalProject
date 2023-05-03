import app from "../../firebase/Firebase";

async function UpdateProfile(
    userInfo,
    workExperience,
    education,
    portfolio,
    skills,
    employment
) {
    const userID = "ee0f933b-ac4f-497a-9403-97fbda392155";
    const userRef = app.firestore().collection("users").doc(userID);

    console.log("userInfo: ", userInfo);
    console.log("workExperience: ", workExperience);
    console.log("education: ", education);
    console.log("portfolio: ", portfolio);
    console.log("skills: ", skills);
    console.log("employment: ", employment);

    const data = {
        userInfo: userInfo,
        workExperience: workExperience,
        education: education,
        skills: skills,
        employment: employment,
    };

    if (portfolio) {
        data.portfolio = portfolio;
    }

    await userRef
        .set(data, { merge: true })
        .then(() => {
            console.log("Document successfully written/updated!");
        })
        .catch((error) => {
            console.error("Error writing/updating document: ", error);
        });
}

export default UpdateProfile;
