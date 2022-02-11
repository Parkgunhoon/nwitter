import { authService, dbService } from "fbase";
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";

const Profile = ({userObj, refreshUser}) => {
    const history = useNavigate();
    const [newDisplayName, setNweDisplayName] = useState(userObj.displaName);

    const onLogOutClick = () => {
        authService.signOut();
        history("/");
    };

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNweDisplayName(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        if(userObj.displaName !== newDisplayName){
            await userObj.updateProfile({ displayName: newDisplayName });
            refreshUser();
        }
    }

    /* 파이어스토어 쿼리 조건문 예제
    const getMyNweets = async () => {
        const nweets = await dbService
            .collection("nweets")
            .where("creatorId", "==", userObj.uid)
            .orderBy("createdAt", "asc")
            .get();

            console.log(nweets.docs.map((doc) => doc.data()));
    };

    useEffect(() => {
        getMyNweets();
    }, []);
    */

    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input onChange={onChange} type="text" placeholder="Display name" value={newDisplayName} autoFocus className="formInput" />
                <input type="submit" value="Update Profile" className="formBtn" style={{marginTop: 10,}} />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>Log Out</span>
        </div>
    );
};

export default Profile;