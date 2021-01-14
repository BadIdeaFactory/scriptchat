/* eslint-env jest */
import characters, { storeCharacterData, clearCharacterData } from './characters'

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
        storeCharacterData.fulfilled({
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

  it('should handle clearCharacterData()', () => {
    const currentState = {
      characters: {
        foo: 'bar'
      }
    }

    expect(
      characters(
        currentState,
        clearCharacterData.fulfilled
    )).toEqual(initialState)
  })
})
