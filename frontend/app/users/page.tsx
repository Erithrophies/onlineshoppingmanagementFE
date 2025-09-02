import Link from "next/link";

export default function Users()
{
    return (
        <>
        <h1>Users</h1>
        <Link href="users/1"> User 1</Link><br/>
        <a href="users/2"> User 2</a><br/>
        <a href="users/3"> User 3</a><br/>
        <a href="users/4"> User 4</a><br/>
        <a href="users/5"> User 5</a><br/>
        </>
    )
}