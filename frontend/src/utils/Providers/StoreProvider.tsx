import React, { FC } from 'react'
import { Provider } from 'react-redux'
import { store } from '../../redux/store'


type Props = {
    children : React.ReactNode
}

const StoreProvider: FC<Props> = ({children}) => {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}

export default StoreProvider