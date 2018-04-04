import qs from 'qs'
import React from 'react'

import * as style from './Header.scss'

import LogoSvg from './logo.svg'
import TwitterSvg from './twitter.svg'

function Header () {
  return (
    <header className={style.header}>
      <Logo/>
      <TwitterButton/>
      <PopupDescription/>
    </header>
  )
}
export default Header

function Logo () {
  return (
    <a className={style.logo} title='LGTM-HUB' href=''>
      <LogoSvg width={144} height={22}/>
    </a>
  )
}

function TwitterButton () {
  return (
    <a
      className={style.twitter}
      target='_blank'
      href={`https://twitter.com/intent/tweet?${qs.stringify({
        text: `LGTM-HUB ${location.href}`
      })}`}
    >
      <TwitterSvg width={40} height={40}/>
    </a>
  )
}

function PopupDescription () {
  return (
    <div className={style.popupContainer}>
      <div className={style.popup}>
        Choose a image to get a LGTM Markdown text 🤗
      </div>
    </div>
  )
}
