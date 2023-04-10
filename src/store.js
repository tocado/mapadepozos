import { configureStore } from '@reduxjs/toolkit'
import RfiltroPozos from './reducers/RfiltroPozos'

export default configureStore({
  reducer: {
    RfiltroPozos: RfiltroPozos,
  },
})
