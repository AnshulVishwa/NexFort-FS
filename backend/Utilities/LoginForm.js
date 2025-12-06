export const LoginFormHTML = `
    <html>
        <body>
        <h1> Login Form </h1>
            <form method="POST" action="/user/login">
                <input type="text" name="username">
                <input type="text" name="number">
                <input type="text" name="password">
                <button type="submit">Login</button>
            </form>
        </body>
    </html>
`