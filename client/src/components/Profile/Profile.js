import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../firebase/Auth";
import EditProfile from "./EditProfile";
import AddProfile from "./AddProfile";
import firebaseApp from "../../firebase/Firebase";

function Profile() {
    const { currentUser } = useContext(AuthContext);
    // console.log("Current Profile", currentUser);
    const [res, setRes] = useState('');
    useEffect(()=>{
        check();
        async function check(){
            const userID = currentUser.uid;
            const userRef = firebaseApp.firestore().collection("users").doc(userID);
            const userSnapshot = await userRef.get();
            //console.log(userSnapshot);
            if(userSnapshot.exists){
                setRes(true);
            }
            else{
                setRes(false);
            }
        }
    },[])
    
    return <div>{res ? <EditProfile /> : <AddProfile />}</div>;
    // return <div>{ <AddProfile />}</div>;
}

export default Profile;
