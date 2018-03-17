import React from 'react'

import * as style from './Footer.scss'

function Footer () {
  return (
    <footer className={style.footer}>
      Images from <a href='http://www.lgtm.in/' target='_blank' rel='noopenner' className={style.link}>LGTM.in</a>
    </footer>
  )
}
export default Footer

