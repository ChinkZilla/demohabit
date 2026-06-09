import type { User } from "../utils/DataBaseTypes";

export default async function getUserInfo(userid: string): Promise<User> {
    // implement fetch request to get user info from backend
    const response = await fetch(`http://localhost:8080/users/${encodeURIComponent(userid)}`);
    const userInfo: User = await response.json();
    return userInfo; 
}