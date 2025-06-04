

const SignUp = () => {

    return (
        <>
        <form>
            <label htmlFor="username">Username</label>
            <input id="username"></input>
            <button>Verify Username</button>
            <label htmlFor="password">Password</label>
            <input id="password"></input>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input id="confirm-password"></input>
            <label htmlFor="email">Email</label>
            <input id="email"></input>
            <label htmlFor="confirm-email">Confirm Email</label>
            <input id="confirm-email"></input>
            <button type="submit">Create Account</button>
        </form>
        </>
    )
}

export default SignUp