/* eslint-env jest */
import script, {
  setTitle,
  setAuthor,
  setSource,
  storeRawTranscript,
  storeFountainResult
} from './script'

describe('script reducer', () => {
  const initialState = {
    title: null,
    author: null,
    source: null,
    transcript: null,
    hash: null,
    fountain: null
  }

  it('should handle initial state', () => {
    expect(script(undefined, {})).toEqual(initialState)
  })

  it('should handle setTitle()', () => {
    expect(script(initialState, setTitle('foo'))).toEqual({
      title: 'foo',
      author: null,
      source: null,
      transcript: null,
      hash: null,
      fountain: null
    })
  })

  it('should handle setAuthor()', () => {
    expect(script(initialState, setAuthor('foo'))).toEqual({
      title: null,
      author: 'foo',
      source: null,
      transcript: null,
      hash: null,
      fountain: null
    })
  })

  it('should handle setSource()', () => {
    expect(script(initialState, setSource('foo'))).toEqual({
      title: null,
      author: null,
      source: 'foo',
      transcript: null,
      hash: null,
      fountain: null
    })
  })

  it('should handle storeRawTranscript()', () => {
    expect(script(initialState, storeRawTranscript('foo'))).toEqual({
      title: null,
      author: null,
      source: null,
      transcript: 'foo',
      hash: '0dba520e335c06ba9240a978e9455878',
      fountain: null
    })
  })

  describe('storeFountainResult()', () => {
    it('should handle storeFountainResult()', () => {
      const mockFountainObject = {
        html: {},
        title: 'foo',
        tokens: [{ type: 'author', text: 'bar' }]
      }

      expect(
        script(initialState, storeFountainResult(mockFountainObject))
      ).toEqual({
        // Note:
        // The current implementation of the parser injects a placeholder string for
        // the title, author, source etc. We don't want the placeholder data to replace
        // user input, so don't update the input state.
        title: null,
        author: null,
        source: null,
        transcript: null,
        hash: null,
        fountain: mockFountainObject
      })
    })
  })
})
