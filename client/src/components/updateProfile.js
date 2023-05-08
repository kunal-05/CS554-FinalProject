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
    await userRef
        .set(data, { merge: true })
        .then(() => {
            window.alert("Document successfully written/updated!");
            //add a redirect here
        })
        .catch((error) => {
            window.alert("Error writing/updating document: ", error);
        });
}

export default UpdateProfile;
