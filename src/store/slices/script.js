import { createSlice } from '@reduxjs/toolkit'
import localforage from 'localforage'
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

      try {
        localforage.setItem('title', action.payload)
      } catch (err) {
        console.log(err)
      }
    },

    setAuthor (state, action) {
      state.author = action.payload

      try {
        localforage.setItem('author', action.payload)
      } catch (err) {
        console.log(err)
      }
    },

    setSource (state, action) {
      state.source = action.payload

      try {
        localforage.setItem('source', action.payload)
      } catch (err) {
        console.log(err)
      }
    },

    storeRawTranscript (state, action) {
      state.transcript = action.payload
      state.hash = md5(JSON.stringify(action.payload))

      try {
        localforage.setItem('transcript', action.payload)
      } catch (err) {
        console.log(err)
      }
    },

    storeFountainResult (state, action) {
      state.fountain = action.payload
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
