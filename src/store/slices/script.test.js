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
        title: 'foo',
        author: null,
        source: null,
        transcript: null,
        hash: null,
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
            source: null,
            transcript: null,
            hash: null,
            fountain: null
          },
          storeFountainResult(mockFountainObject)
        )
      ).toEqual({
        title: 'foo',
        author: 'bar',
        source: null,
        transcript: null,
        hash: null,
        fountain: mockFountainObject
      })
    })

    // Skipped because currently Slack transcripts will not be parsed to have an author
    // And the current implementation of the parser injects a placeholder string for
    // the renderer, but we don't want that to be in the input box.
    it.skip('overwrites an author if fountain provides it', () => {
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
            source: null,
            transcript: null,
            hash: null,
            fountain: null
          },
          storeFountainResult(mockFountainObject)
        )
      ).toEqual({
        title: 'foo',
        author: 'baz',
        source: null,
        transcript: null,
        hash: null,
        fountain: mockFountainObject
      })
    })
  })
})
