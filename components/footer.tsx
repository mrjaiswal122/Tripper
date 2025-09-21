import React from 'react'

type Props = {}

function Footer({}: Props) {
  return (
    <footer className='bg-[#757B66] w-screen h-[50vh] pt-10 '>
      <div>
        <h1>Sikkim Yatra</h1>
        <h2>Preserving Culture, Experiencing Spirituality</h2>
        <img src="fullLogo.png" alt="full logo" className='h-10 w-40'/>
        <p>“A Project to Preserve the Spiritual Heritage of Sikkim”</p>
      </div>
      <div></div>
    </footer>
  )
}

export default Footer