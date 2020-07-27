import { createSlice } from '@reduxjs/toolkit'

const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    characters: {}
  },

  reducers: {
    storeCharacterData (state, action) {
      state.characters = action.payload
    }
  }
})

export const { storeCharacterData } = charactersSlice.actions

export default charactersSlice.reducer
