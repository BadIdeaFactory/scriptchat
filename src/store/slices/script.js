import { createSlice } from '@reduxjs/toolkit'

const scriptSlice = createSlice({
  name: 'script',
  initialState: {
    title: null,
    author: null,
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

    storeRawTranscript (state, action) {
      state.transcript = action.payload
    },

    storeFountainResult (state, action) {
      const fountain = action.payload

      let author
      for (let i = 0; i < fountain.tokens.length; i++) {
        if (fountain.tokens[i].type === 'author') {
          author = fountain.tokens[i].text
        }
      }

      state.fountain = fountain
      if (fountain.title) {
        state.title = fountain.title
      }
      if (author) {
        state.author = author
      }
    }
  }
})

export const {
  setTitle,
  setAuthor,
  storeRawTranscript,
  storeFountainResult
} = scriptSlice.actions

export default scriptSlice.reducer
