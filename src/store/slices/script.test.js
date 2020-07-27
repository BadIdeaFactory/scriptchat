/* eslint-env jest */
import script, {
  setTitle,
  setAuthor,
  storeRawTranscript,
  storeFountainResult
} from './script'

describe('script reducer', () => {
  const initialState = {
    title: null,
    author: null,
    transcript: null,
    fountain: null
  }

  it('should handle initial state', () => {
    expect(script(undefined, {})).toEqual(initialState)
  })

  it('should handle setTitle()', () => {
    expect(script(initialState, setTitle('foo'))).toEqual({
      title: 'foo',
      author: null,
      transcript: null,
      fountain: null
    })
  })

  it('should handle setAuthor()', () => {
    expect(script(initialState, setAuthor('foo'))).toEqual({
      title: null,
      author: 'foo',
      transcript: null,
      fountain: null
    })
  })

  it('should handle storeRawTranscript()', () => {
    expect(script(initialState, storeRawTranscript('foo'))).toEqual({
      title: null,
      author: null,
      transcript: 'foo',
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
        title: 'foo',
        author: 'bar',
        transcript: null,
        fountain: mockFountainObject
      })
    })

    it('does not clear a title or author if fountain does not provide one', () => {
      const mockFountainObject = {
        html: {},
        title: null,
        tokens: []
      }

      expect(
        script(
          {
            title: 'foo',
            author: 'bar',
            transcript: null,
            fountain: null
          },
          storeFountainResult(mockFountainObject)
        )
      ).toEqual({
        title: 'foo',
        author: 'bar',
        transcript: null,
        fountain: mockFountainObject
      })
    })

    it('overwrites an author if fountain provides it', () => {
      const mockFountainObject = {
        html: {},
        title: null,
        tokens: [{ type: 'author', text: 'baz' }]
      }

      expect(
        script(
          {
            title: 'foo',
            author: 'bar',
            transcript: null,
            fountain: null
          },
          storeFountainResult(mockFountainObject)
        )
      ).toEqual({
        title: 'foo',
        author: 'baz',
        transcript: null,
        fountain: mockFountainObject
      })
    })
  })
})
