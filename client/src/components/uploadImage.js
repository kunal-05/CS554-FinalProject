import React from "react";
import { useState } from "react";
import axios from "axios";
import app from "../firebase/Firebase";
import { Grid, Box } from "@mui/material";

function UploadImage(props) {
    const [userId, setUserId] = useState();
    setUserId(props.userId);
    async function UpdateImage(e) {
        e.preventDefault();
        let formData = new FormData();
        if (!e.target.file) {
            alert("Please select a file");
            return;
        }
        if (
            e.target.file.type !== "image/jpeg" &&
            e.target.file.type !== "image/png"
        ) {
            alert("Please select a jpeg or png file");
            return;
        }
        formData.append("file", e.target.file);
        try {
            const res = await axios.post("/photo", formData, {
                headers: {
                    "Content-Type": "blob",
                },
            });
            HandleUploadDB(res.data);
        } catch (e) {
            console.log(e);
        }
    }
    async function HandleUploadDB(image) {
        const storageRef = app.storage().ref();
        const fileRef = storageRef.child(`${userId}/${image.name}`);
        fileRef
            .put(image)
            .then((snapshot) => {
                console.log("Image uploaded successfully!");
                // Get the image URL after successful upload
                return snapshot.ref.getDownloadURL();
            })
            .then((imageUrl) => {
                // Update the user profile with the image URL
                const userRef = app.firestore().collection("users").doc(userId);
                userRef.set({ imageUrl: imageUrl }, { merge: true });
                console.log("User profile updated with image URL");
            })
            .catch((error) => {
                console.error("Error uploading image:", error);
            });
    }
    return (
        <React.Fragment>
            <Box>
                <Grid>
                    <Grid item xs={12} sm={6}>
                        <form onSubmit={UpdateImage}>
                            <input type="file" name="file" />
                            <button type="submit">Upload</button>
                        </form>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );
}
export default UploadImage;
