import { configureStore } from '@reduxjs/toolkit'
import wordReducer from './features/word-slice'
import { useSelector,TypedUseSelectorHook } from 'react-redux'


export const store = configureStore({
  reducer: {
    wordReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useWordSelector:TypedUseSelectorHook<RootState> = useSelector