import { createSlice } from '@reduxjs/toolkit'
import md5 from 'md5'

const scriptSlice = createSlice({
  name: 'script',
  initialState: {
    title: null,
    author: null,
    source: null,
    transcript: null,
    hash: null,
    fountain: null
  },

  reducers: {
    setTitle (state, action) {
      state.title = action.payload
    },

    setAuthor (state, action) {
      state.author = action.payload
    },

    setSource (state, action) {
      state.source = action.payload
    },

    storeRawTranscript (state, action) {
      state.transcript = action.payload
      state.hash = md5(JSON.stringify(action.payload))
    },

    storeFountainResult (state, action) {
      state.fountain = action.payload

      if (state.fountain.title) {
        state.title = state.fountain.title
      }
    }
  }
})

export const {
  setTitle,
  setAuthor,
  setSource,
  storeRawTranscript,
  storeFountainResult
} = scriptSlice.actions

export default scriptSlice.reducer
