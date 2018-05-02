import classNames from 'classnames'
import React from 'react'

import * as style from './Contributors.scss'

export default function Contributors () {
  return (
    <div className={style.contributors}>
      <a className={style.contributor} href='https://twitter.com/do7be' target='_blank' rel='noopenner'>
        <div className={classNames(style.icon, style.do7be)}/>
        <div className={style.text}>
          <p>Development by</p>
          <p className={style.account}>@do7be</p>
        </div>
      </a>
      <a className={style.contributor} href='https://twitter.com/yksk' target='_blank' rel='noopenner'>
        <div className={classNames(style.icon, style.yksk)}/>
        <div className={style.text}>
          <p>Designed by</p>
          <p className={style.account}>@yksk</p>
        </div>
      </a>
    </div>
  )
}
