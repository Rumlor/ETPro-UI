export default function getAuthenticatedUserHeaderFromLocalStorage(){
    const user = localStorage.getItem("authenticatedUser");
    console.log('user in storage')
    console.log(user)
    return user != null  ? {"Authorization":"Bearer "+ user} : {};
}