import {useState} from 'react'

const Menu = () => {

    const [user, setUser] = useState({
        username: "default_user",
        firstName: "first",
        lastName: "last"
    })

  return (
    <div className='w-96 p-6 flex flex-col items-center bg-neutral-700 rounded-xl'>
        <h2>{user.username}</h2>
        <p>{user.firstName} {user.lastName} </p>
    </div>
  )
}

export default Menu