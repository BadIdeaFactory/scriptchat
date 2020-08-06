import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import localforage from 'localforage'

export const storeCharacterData = createAsyncThunk(
  'characters/storeCharacterData',
  async (characters, thunkAPI) => {
    try {
      localforage.setItem('characters', characters)
    } catch (err) {
      console.log(err)
    }

    return characters
  }
)

export const clearCharacterData = createAsyncThunk(
  'characters/clearCharacterData',
  async (characters, thunkAPI) => {
    try {
      localforage.removeItem('characters')
    } catch (err) {
      console.log(err)
    }

    return
  }
)

const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    characters: {}
  },

  reducers: {},

  extraReducers: {
    [storeCharacterData.fulfilled]: (state, action) => {
      state.characters = action.payload
    },

    [clearCharacterData.fulfilled]: (state, action) => {
      state.characters = {}
    },
  },
})

export default charactersSlice.reducer
