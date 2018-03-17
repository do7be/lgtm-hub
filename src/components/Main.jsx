import classNames from 'classnames'
import React from 'react'

import HistoryList from './HistoryList'
import RandomList from './RandomList'

import * as style from './Main.scss'

function Main () {
  return (
    <main>
      <article className={style.randomListContainer}>
        <RandomList/>
      </article>
      <aside>
        <HistoryList/>
      </aside>
    </main>
  )
}
export default Main
