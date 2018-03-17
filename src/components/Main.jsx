import classNames from 'classnames'
import React from 'react'

import HistoryList from './HistoryList'
import RandomList from './RandomList'
import ReloadButton from './ReloadButton'

function Main () {
  return (
    <main>
      <article>
        <RandomList/>
        <ReloadButton/>
      </article>
      <aside>
        <HistoryList/>
      </aside>
    </main>
  )
}
export default Main
