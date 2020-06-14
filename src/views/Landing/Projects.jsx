import React, { useState, useEffect, Component } from 'react'

import * as style from './style.js'
import anime from 'animejs/lib/anime.es.js'

const langs = {
  react: { color: '#61dbfb', name: 'React' },
  redux: { color: '#764bbc', name: 'Redux' },
  js: { color: '#f1e05a', name: 'JavaScript' }
}

export default class Github extends Component {
  hide(cb) {

  }

  render() {
    return (
      <div style={style.content}>
        
      </div>
    )
  }
}

function GitCard ({ language, title, description, stars, i }) {
  useEffect(() => {
    anime.timeline({loop: false})
      .add({
        targets: `#gitCard${i}`,
        opacity: [0,1],
        translateY: [-48,0],
        easing: "easeOutQuint",
        duration: 1000,
        delay: 200 + (75 * (i+1))
      })
  }, [])

  return (
    <div style={style.gitCard} className={'gitCard'} id={`gitCard${i}`}>
      <h3 style={{ margin: 0 }}>{title}</h3>
      <p style={{ margin: 0, opacity: 0.77, lineHeight: 1.1, marginBottom: 12 }}>{description}</p>
      <div style={{ flex: 1 }}/>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Language {...langs[language]} />
        <Stars count={stars} />
      </div>
    </div>
  )
}

function Language ({ color, name }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ height: 12, width: 12, borderRadius: 6, background: color }} />
      <span style={{ marginLeft: 4, opacity: 0.66, lineHeight: 0, fontSize: 14 }}>{name}</span>
    </div>
  )
}

function Stars({ count }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ opacity: 0.66, lineHeight: 0, fontSize: 14 }}>{count}</span>
      <i style={{ marginLeft: 4, opacity: 0.77, lineHeight: 0, fontSize: 14 }} className={'icon ion-ios-star'} />
    </div>
  )
}