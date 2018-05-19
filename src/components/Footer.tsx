import React from 'react'

import Contributors from './Contributors'
import Donation from './Donation'

import * as style from './Footer.scss'

function Footer () {
  return (
    <footer className={style.footer}>
      <span>
        Images from <a href='http://www.lgtm.in/' target='_blank' rel='noopenner' className={style.link}>LGTM.in</a>
      </span>
      <Contributors/>
      <hr/>
      <Donation/>
    </footer>
  )
}
export default Footer

