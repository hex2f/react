import React, { useState, useEffect } from 'react'
import UserBadge from '@components/User/Badge'

export default function Landing () {
  const [seconds, setSeconds] = useState(0)

  // Same as componentDidMount
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds + 1)
    }, 1000)

    // what you return here will get run on componentWillUnmount
    return () => clearInterval(interval)
  })

  return (
    <div>
      <UserBadge />
      <p>Seconds Passed: {seconds}</p>
    </div>
  )
}
