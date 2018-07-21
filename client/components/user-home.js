import React from 'react'

const UserHome = ({user, userVotes}) => {
  return (
    <div>
      <h3>Hello, {user.email}!</h3>
      <h3>Your Voting History</h3>
      <p>You can change your vote after 24 hours but only your most recent vote will count against the overall framework totals</p>
      <ul>
        { userVotes.length > 0 &&
          userVotes.map((vote) => {
            return (
              <li key={vote.submitted}>
                {vote.framework} - {vote.submitted}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default UserHome
