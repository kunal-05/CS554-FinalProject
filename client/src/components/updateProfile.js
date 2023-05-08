import app from "../firebase/Firebase";

async function UpdateProfile(
    userInfo,
    workExperience,
    education,
    portfolio,
    employment
) {
    const userID = "ee0f933b-ac4f-497a-9403-97fbda392155";
    const userRef = app.firestore().collection("users").doc(userID);

    const data = {
        userInfo: userInfo,
        workExperience: workExperience,
        education: education,
        portfolio: portfolio,
        employment: employment,
    };

    console.log("data: ", data);

    // if (portfolio) {
    //     data.portfolio = portfolio;
    // }

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
