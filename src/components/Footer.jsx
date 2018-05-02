import React from 'react'

import Contributors from './Contributors'

import * as style from './Footer.scss'

function Footer () {
  return (
    <footer className={style.footer}>
      <span>
        Images from <a href='http://www.lgtm.in/' target='_blank' rel='noopenner' className={style.link}>LGTM.in</a>
      </span>
      <Contributors/>
    </footer>
  )
}
export default Footer

