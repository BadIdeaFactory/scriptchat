import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import localforage from 'localforage'
import md5 from 'md5'

// These actions also update the browser catche via localforage, which is an
// async process. For this reason, we make these thunks (plus, updating cache)
// is a side-effect and would not be appropriate for a reducer. It works, but
// it's discouraged. Furthermore, while we currently fail silently if there is
// an error (failing does not affect the experience) this makes it easier to
// handle errors if we need to.
export const setTitle = createAsyncThunk(
  'script/setTitle',
  async (title, thunkAPI) => {
    try {
      localforage.setItem('title', title)
    } catch (err) {
      console.log(err)
    }

    return title
  }
)

export const setAuthor = createAsyncThunk(
  'script/setAuthor',
  async (author, thunkAPI) => {
    try {
      localforage.setItem('author', author)
    } catch (err) {
      console.log(err)
    }

    return author
  }
)

export const setSource = createAsyncThunk(
  'script/setSource',
  async (source, thunkAPI) => {
    try {
      localforage.setItem('source', source)
    } catch (err) {
      console.log(err)
    }

    return source
  }
)

export const storeRawTranscript = createAsyncThunk(
  'script/storeRawTranscript',
  async (transcript, thunkAPI) => {
    try {
      localforage.setItem('transcript', transcript)
    } catch (err) {
      console.log(err)
    }

    return transcript
  }
)

export const clearScriptData = createAsyncThunk(
  'script/clearScriptData',
  async (arg, thunkAPI) => {
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

export const { storeFountainResult } = scriptSlice.actions

export default scriptSlice.reducer
