import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import localforage from 'localforage'
import md5 from 'md5'
import { updateFountain } from '../../scripts/update'

// These actions also update the browser catche via localforage, which is an
// async process. For this reason, we make these thunks (plus, updating cache)
// is a side-effect and would not be appropriate for a reducer. It works, but
// it's discouraged. Furthermore, while we currently fail silently if there is
// an error (failing does not affect the experience) this makes it easier to
// handle errors if we need to.
export const setTitle = createAsyncThunk(
  'script/setTitle',
  async (title, { getState, dispatch }) => {
    try {
      localforage.setItem('title', title)
    } catch (err) {
      console.log(err)
    }

    updateFountain({ title }, getState, dispatch)

    return title
  }
)

export const setAuthor = createAsyncThunk(
  'script/setAuthor',
  async (author, { getState, dispatch }) => {
    try {
      localforage.setItem('author', author)
    } catch (err) {
      console.log(err)
    }

    updateFountain({ author }, getState, dispatch)

    return author
  }
)

export const setSource = createAsyncThunk(
  'script/setSource',
  async (source, { getState, dispatch }) => {
    try {
      localforage.setItem('source', source)
    } catch (err) {
      console.log(err)
    }

    updateFountain({ source }, getState, dispatch)

    return source
  }
)

export const storeRawTranscript = createAsyncThunk(
  'script/storeRawTranscript',
  async (transcript, { getState, dispatch }) => {
    try {
      localforage.setItem('transcript', transcript)
    } catch (err) {
      console.log(err)
    }

    updateFountain({ transcript }, getState, dispatch)

    return transcript
  }
)

export const clearScriptData = createAsyncThunk(
  'script/clearScriptData',
  async (arg, { getState, dispatch }) => {
    try {
      localforage.removeItem('title')
      localforage.removeItem('author')
      localforage.removeItem('source')
      localforage.removeItem('transcript')
    } catch (err) {
      console.log(err)
    }

    return
  }
)

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
    // This sets arbitrary data on the state (used on init to repopulate
    // store from cache) - it does not send info back to cache.
    setScriptData (state, action) {
      return {
        ...state,
        ...action.payload
      }
    },

    storeFountainResult (state, action) {
      state.fountain = action.payload
    },
  },

  extraReducers: {
    [setTitle.fulfilled]: (state, action) => {
      state.title = action.payload
    },

    [setAuthor.fulfilled]: (state, action) => {
      state.author = action.payload
    },

    [setSource.fulfilled]: (state, action) => {
      state.source = action.payload
    },

    [storeRawTranscript.fulfilled]: (state, action) => {
      state.transcript = action.payload
      state.hash = md5(JSON.stringify(action.payload))
    },

    [clearScriptData.fulfilled]: (state, action) => {
      state.title = null
      state.author = null
      state.source = null
      state.transcript = null
      state.hash = null
      state.fountain = null
    },
  }
})

export const { setScriptData, storeFountainResult } = scriptSlice.actions

export default scriptSlice.reducer
