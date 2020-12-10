import React, { useState, useEffect} from "react";
import { getAccessTokenApi } from "../../../api/auth";
import { getUsersActiveApi } from "../../../api/user";
import ListUsers from "../../../components/Admin/Users/ListUsers";

export default function Users(){
    const [usersActive, setUsersActive] = useState([]);
    const [usersInactive, setUsersInactive] = useState([]);
    const token = getAccessTokenApi();
    useEffect(() => {
        getUsersActiveApi(token, true).then(response => {
            setUsersActive(response.users);
        });
    }, [token]);

    useEffect(() => {
        getUsersActiveApi(token, false).then(response => {
            setUsersInactive(response.users);
        });
    }, [token]);

    return (
        <div>
            <h1>Lista Users</h1>
            <ListUsers userActive={usersActive} usersInactive={usersInactive} />
        </div>
    );
}