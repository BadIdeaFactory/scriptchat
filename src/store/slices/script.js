import { createSlice } from '@reduxjs/toolkit'

const scriptSlice = createSlice({
  name: 'script',
  initialState: {
    title: null,
    author: null,
    source: null,
    transcript: null,
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
