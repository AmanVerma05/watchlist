import React from 'react'
const Welcome = () => {
  return (
    <div class="h-auto w-auto  rounded-md border-red-500 border-2 bg-red-50 px-10 py-6 flex flex-col">  
        <h1 class="text-gray-950 text-5xl font-semibold">
            Welcome to <span class="text-red-500 ">Watchlists</span> 
        </h1>
        <div>
        <p class="pt-6 text-lg">
            Browse movies, add them to watchlists and share them with friends.
            <br/> 
            Just click the saved icon to add a movie, the poster to see more details and to mark the movie as watched.
        </p>
        </div>
    </div>
  )
}

export default Welcome