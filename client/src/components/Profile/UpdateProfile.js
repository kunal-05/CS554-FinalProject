import firebaseApp from "../../firebase/Firebase";

async function UpdateProfile(
    userID,
    userInfo,
    workExperience,
    education,
    portfolio,
    employment
) {
    const userRef = firebaseApp.firestore().collection("users").doc(userID);
    console.log(userRef);

    const userSnapshot = await userRef.get();
    if (userSnapshot.exists) {
        console.log("User exists, updating data");
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
                console.log("success");
                // add a redirect here
            })
            .catch((error) => {
                window.alert("Error writing/updating document: ", error);
                console.log("failed");
            });
    } else {
        console.log("User does not exist, creating new document");
        const data = {
            userInfo: userInfo,
            workExperience: workExperience,
            education: education,
            portfolio: portfolio,
            employment: employment,
            photoURL: "",
        };
        await userRef
            .set(data)
            .then(() => {
                window.alert("New document created!");
                console.log("success");
                // add a redirect here
            })
            .catch((error) => {
                window.alert("Error creating document: ", error);
                console.log("failed");
            });
    }
}

export default UpdateProfile;
