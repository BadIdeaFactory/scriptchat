import { createSlice } from '@reduxjs/toolkit'
import localforage from 'localforage'

const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    characters: {}
  },

  reducers: {
    storeCharacterData (state, action) {
      state.characters = action.payload

      try {
        localforage.setItem('characters', action.payload)
      } catch (err) {
        console.log(err)
      }
    },

    clearCharacterData (state, action) {
      state.characters = {}

      try {
        localforage.removeItem('characters')
      } catch (err) {
        console.log(err)
      }
    }
  }
})

export const { storeCharacterData, clearCharacterData } = charactersSlice.actions

export default charactersSlice.reducer
