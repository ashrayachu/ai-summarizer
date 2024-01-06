import React from 'react'
import Logo from '../assets/logo.svg'

function Hero() {
  return (
 <header className='w-full flex justify-center items-center flex-col mb-10'>
   <nav className='w-full flex justify-between align-center p-5 bg-slate-400 mb-5' >
    <img src={Logo} alt="Logo" />
    <button type='button' className='black_btn'
    onClick={()=>{window.open('https://github.com/ashrayachu')}}>Github</button>
   </nav>
   <h1 className='head_text'>
     Summarize<br className='max md:hidden lg:flex'/> Articles with  
     <span className='orange_gradient'> OpenAI GPT-4</span>
   </h1>
   <h2 className='desc'>
   AI Summarizer website utilizes the ChatGPT API to offer users a seamless and efficient article summarization experience.
   </h2>
 </header>
  )
}

export default Hero