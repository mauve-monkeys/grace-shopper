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
      <div className="loading-text" />
    </section>
  )
}

export default Loading
