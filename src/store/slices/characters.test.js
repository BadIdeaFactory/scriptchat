/* eslint-env jest */
import characters, { storeCharacterData } from './characters'

describe('characters reducer', () => {
  const initialState = {
    characters: {}
  }

  it('should handle initial state', () => {
    expect(characters(undefined, {})).toEqual(initialState)
  })

  it('should handle storeCharacterData()', () => {
    expect(
      characters(
        initialState,
        storeCharacterData({
          foo: 1,
          bar: 2
        })
      )
    ).toEqual({
      characters: {
        foo: 1,
        bar: 2
      }
    })
  })
})
