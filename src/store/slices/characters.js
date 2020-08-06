import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import localforage from 'localforage'
import { updateFountain } from '../../scripts/update'

export const storeCharacterData = createAsyncThunk(
  'characters/storeCharacterData',
  async (characters, { getState, dispatch }) => {
    try {
      localforage.setItem('characters', characters)
    } catch (err) {
      console.log(err)
    }

    updateFountain({ characters }, getState, dispatch)

    return characters
  }
)

export const clearCharacterData = createAsyncThunk(
  'characters/clearCharacterData',
  async (characters, { getState, dispatch }) => {
    try {
      localforage.removeItem('characters')
    } catch (err) {
      console.log(err)
    }

    updateFountain({ characters: {} }, getState, dispatch)

    return
  }
)

const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    characters: {}
  },

  reducers: {
    // This sets arbitrary data on the state (used on init to repopulate
    // store from cache) - it does not send info back to cache.
    setCharacterData (state, action) {
      return {
        ...state,
        ...action.payload
      }
    },
  },

  extraReducers: {
    [storeCharacterData.fulfilled]: (state, action) => {
      state.characters = action.payload
    },

    [clearCharacterData.fulfilled]: (state, action) => {
      state.characters = {}
    },
  },
})

export const { setCharacterData } = charactersSlice.actions

export default charactersSlice.reducer
