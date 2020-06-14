import React, { useState, useEffect } from 'react'

import * as style from './style.js'
import anime from 'animejs/lib/anime.es.js'

import Background from './Background.jsx'

import copyTextToClipboard from './Clipboard'

export default function Landing() {
  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Background style={style.background} />
      <Content />
    </div>
  )
}

function Content () {
  const mountRef = React.createRef()
  const [discord, setDiscord] = useState(0)
  const [bouncing, setBounce] = useState(false)

  useEffect(() => {
    var textWrapper = document.querySelector('.anim1')
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter' style='opacity: 0; display: inline-block; transform: scale(0); will-change: transform, opacity;'>$&</span>")

    anime.timeline({loop: false})
      .add({
        targets: '.anim1 .letter',
        opacity: [0,1],
        scale: [0.5,1],
        translateY: [48,0],
        easing: "easeOutQuint",
        duration: 1000,
        delay: (el, i) => 500 + (75 * (i+1))
      })

    anime.timeline({loop: false})
      .add({
        targets: '.anim2 button',
        opacity: [0,1],
        translateY: [-14,0],
        easing: "easeOutQuad",
        duration: 550,
        delay: (el, i) => 600 + (100 * (i+1))
      })
      .add({
        targets: '.anim2 button',
        transition: ['','transform 0.3s, color 0.2s'],
        duration: 1
      })

    anime.timeline({loop: false})
      .add({
        targets: '.anim3 p',
        opacity: [0,1],
        translateY: [-14,0],
        easing: "easeOutQuad",
        duration: 750,
        delay: 800
      })
  }, [])

  const goto = (dest) => {
    anime.timeline({loop: false})
      .add({
        targets: '.anim1 .letter',
        opacity: [1,0],
        scale: [1,0.5],
        translateY: [0,48],
        easing: "easeInQuint",
        duration: 1000,
        delay: (el, i) => 200 + (40 * (i+1))
      })
    anime.timeline({loop: false})
      .add({
        targets: '.anim2 button',
        opacity: [1,0],
        translateY: [0, -14],
        easing: "easeInQuad",
        duration: 550,
        delay: (el, i) => (100 * (i+1))
      })
    anime.timeline({loop: false})
      .add({
        targets: '.anim3 p',
        opacity: [1,0],
        translateY: [0,-18],
        easing: "easeInQuad",
        duration: 750,
        delay: 400
      })

    dest = ({
      github: 'https://github.com/leahlundqvist',
      twitter: 'https://twitter.com/leahlundqvist'
    })[dest]

    setTimeout(_ => window.location = dest, 1200)
  }

  const bounce = () => {
    if (bouncing) return;
    setBounce(true)
    setTimeout(() => setBounce(false), 1200)
    anime.timeline({loop: false})
      .add({
        targets: '.anim1 .letter',
        scale: [1, 0.5],
        opacity: [1, 0],
        translateY: [0,-48],
        easing: "easeInQuint",
        duration: 600,
        delay: (el, i) =>  (40 * (i+1))
      })
      .add({
        targets: '.anim1 .letter',
        scale: [0.5, 1],
        opacity: [0, 1],
        translateY: [48,0],
        easing: "easeOutQuint",
        duration: 600,
        delay: (el, i) => (40 * (i+1))
      })
  }

  return (
    <div style={style.container(false, mountRef && mountRef.clientHeight ? mountRef.clientHeight : 0)}>
      <h1 className={"anim1"} style={style.name} onClick={bounce}>Leah L.</h1>
      <div className={"anim2"} style={style.links}>
        <button
          className={"hoverFloat"}
          style={style.button}
          onClick={() => goto('github')}
        >
          github.
        </button>
        <button
          className={"hoverFloat"}
          style={style.button}
          onClick={() => goto('twitter')}
        >
          twitter.
        </button>
        <button
          className={"hoverFloat"}
          style={style.button}
          onMouseEnter={() => setDiscord(1)}
          onMouseLeave={() => setDiscord(0)}
          onClick={() => {
            setDiscord(2)
            copyTextToClipboard('meme#0001')
          }}
        >
          <div style={{position: 'relative'}}>
            <span style={{...style.ticker(discord), position: 'relative'}}>discord.</span>
            <span style={style.ticker(discord-1)}>meme#0001</span>
            <span style={style.ticker(discord-2)}>copied.</span>
          </div>
        </button>
      </div>
      <div className={"anim3"} style={style.links}>
        <p style={style.desc}>My name is Leah Lundqvist. I make websites, usually in React. Sometimes, when nobody else is there to hold my hand, i write servers for those sites in either Node or Python. Oh, and on rare occations i poke at apps with SwiftUI too.</p>
      </div>
    </div>
  )
}
