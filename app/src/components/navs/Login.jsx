import SignIn from "./login/SignIn";

function Login({users, setUsers}){

   
    return (

        <div className="content">
            <SignIn users={users} />
        </div>
    )
}

export default Login;