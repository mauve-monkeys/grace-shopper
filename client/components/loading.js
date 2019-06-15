import React from 'react'

const Loading = () => {
  return (
    <section id="loading-spinner">
      <div id="loading-container">
        <div className="loading-ball" />
        <div className="loading-ball" />
        <div className="loading-ball" />
        <div className="loading-ball" />
      </div>
      <p>Loading...</p>
    </section>
  )
}

export default Loading
