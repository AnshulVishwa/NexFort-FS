export const Form = `
<html>
  <body>
    <form action="/file/upload" method="POST" enctype="multipart/form-data">
      <input type="text" name="username" placeholder="username" required />
      <input type="text" name="number" placeholder="number" required />
      <input type="file" name="file" required />
      <button type="submit">Submit</button>
    </form>
    <button><a href="/login">Login</a></button>    
    <button><a href="/signup" >Signup</a></button>    
    <button><a href="/isFile" >Check for Files</a></button>    
    <button><a href="/download" >Download Files</a></button>  
  </body>
</html>
`;
