export default  async function getUsers () {
    let result = await fetch("https://jsonplaceholder.typicode.com/users");
    result = await result.json();
    return result;
}