import React from 'react'
import useUser from '@states/user'

export default function UserBadge () {
  const [user, setUser] = useUser()

  const login = () => setUser({
    loggedIn: true,
    name: 'John'
  })

  if(!user.loggedIn) return (
    <div>
      <button onClick={login}>Log In</button>
    </div>
  )

  return (
    <div>
      <span>Welcome {user.name}</span>
    </div>
  )
}
