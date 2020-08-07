import seedrandom from 'seedrandom'
import { buildFountainHTML } from './output-html'

const charactersMentionedAlready = {}

/**
 * Turns a Slack ID into a name to display
 *
 * @param {string} id - Slack ID
 */
function getCharacterName (id, characters) {
  const character = (characters?.[id]?.firstName) || id
  return character
}

function clearCharactersMentionedAlready () {
  Object.keys(charactersMentionedAlready).forEach((key) => {
    delete charactersMentionedAlready[key]
  })
}

function getCharacterNameForAction (id, characters) {
  let name = getCharacterName(id, characters)
  if (charactersMentionedAlready[id] !== true) {
    name = name.toUpperCase()
    charactersMentionedAlready[id] = true
  }
  return name
}

/**
 * Tests if a string is all uppercase, or predominantly uppercase.
 * You can set a "threshold" of uppercaseness with the second argument,
 * a value between 0 - 1 (a percentage of the alphabetical characters).
 * 1 means all alphabetical characters must be uppercase. 0 means no
 * alphabetical characters must be uppercase and this function will still
 * return true. For exanple, you can use a value of 0.84 (84% of alphabetical
 * characters), and this can be adjusted based on what feels better.
 *
 * The default return value of this function is `false`. An empty string,
 * null value, or a string with no alphabetical characters returns `false`.
 * `minChars` is the minimum number of alphabetical characters that must
 * be present to return `true`. The default value is 2.
 *
 * @param {String} string
 * @param {Number} threshold
 * @param {Number} minChars
 * @returns {Boolean}
 */
function isUpperCase (string, threshold = 1, minChars = 2) {
  if (!string || typeof string !== 'string') return false

  const chars = string.split('')

  // Only check characters that are caseable. Given the string, check
  // each character, and filter it out if the uppercase of that character
  // is the same as the lowercase of that character.
  const caseableChars = chars.filter(
    (char) => char.toUpperCase() !== char.toLowerCase()
  )

  if (caseableChars.length < minChars) return false

  const uppercaseChars = caseableChars.filter(
    (char) => char === char.toUpperCase()
  )

  if (uppercaseChars.length / caseableChars.length >= threshold) return true

  return false
}

/**
 * Process a line of text from Slack
 *
 * @param {string} text - the line of text from Slack
 */
function processText (text, characters) {
  // Trim the beginning and end of text
  text = text.trim()

  // Replace user names in text
  text = text.replace(/<@([A-Z0-9]+)>/g, (match, id) => {
    return getCharacterName(id, characters)
  })

  // Replace all other instances of brackets so that they don't parsed as HTML
  text = text.replace(/(<|>)/g, '')

  // Replace multiple whitespace characters with a single whitespace
  text = text.replace(/\s+/g, ' ')

  // TODO: Match and log all emoji

  return text
}

/**
 * Sentence cases a string. Adds a final punctuation mark, if not present.
 *
 * @param {String} text
 * @param {Boolean} forceLowerCase - if true, force conversation to lower case before sentence casing.
 * @returns {String}
 */
function sentencify (text, forceLowerCase = false) {
  // Capitalize the first letter of each sentence
  // Split on punctuation: question marks, exclamation marks, periods, and periods followed by quotation mark.
  let string = text.split(/([!?.](\s*))/g).map(sentence => {
    if (forceLowerCase) {
      return sentence.charAt(0).toUpperCase() + sentence.substr(1).toLowerCase().replace(/i /g, 'I ').replace(/i'm /g, 'I\'m ').replace(/i'd /g, 'I\'d ').replace(/i've /g, 'I\'ve ')
    }

    return sentence.charAt(0).toUpperCase() + sentence.substr(1)
  }).join('')

  // If the last character of the message is not a punctuation mark, add a period.
  const lastCharacter = string.substr(-1)
  if (lastCharacter.match(/[?!.'":]/) === null) {
    string += '.'
  }

  return string
}

function pickRandom (array, seedGenerator) {
  return array[Math.floor(seedGenerator() * array.length)]
}

const PARENTHETICALS = {
  LOUD: [
    'loud',
    'excited',
    'yelling',
    'shouting',
    'screaming',
    'raised voice',
    'loudly'
  ],
  RETURN_TO_NORMAL: [
    'back to normal volume',
    'back to normal',
    'normal voice',
    'normal volume'
  ]
}

export function proofOfConceptScriptFormatting (json, meta) {
  const seedGenerator = seedrandom(meta.hash)
  const tokens = []
  const title = (meta.title || 'Untitled Screenplay').toUpperCase()

  tokens.push({
    type: 'title',
    text: title
  })

  tokens.push({
    type: 'credit',
    text: 'written by'
  })

  tokens.push({
    type: 'author',
    text: (meta.author || 'Anonymous Writer')
  })

  tokens.push({
    type: 'source',
    text: meta.source
      ? `based on a Slack transcript from ${meta.source}`
      : 'based on a Slack transcript'
  })

  tokens.push({
    type: 'action',
    text: 'FADE IN:'
  })

  const characters = meta.characters
  let previousCharacter
  let dialogueOpen = false
  let prevLoud = false

  json.forEach((line) => {
    // For each line, get a random number. This can be used to create variety
    // in generated text.
    const random = seedGenerator()

    if (line.type === 'message') {
      // Close an open dialogue if a dialogue is open, and the the user changes
      let currentCharacter = line.user || previousCharacter
      if (dialogueOpen && currentCharacter !== previousCharacter) {
        tokens.push({
          type: 'dialogue_end'
        })
        previousCharacter = ''
        dialogueOpen = false
      }

      switch (line.subtype) {
        case 'channel_join':
          tokens.push({
            type: 'action',
            text: `${getCharacterNameForAction(line.user, characters)} enters.`
          })
          break
        case 'channel_leave':
          tokens.push({
            type: 'action',
            text: `${getCharacterNameForAction(line.user, characters)} leaves.`
          })
          break
        // Normal dialogue
        default: {
          if (previousCharacter !== currentCharacter) {
            tokens.push({
              type: 'dialogue_begin'
            })
            tokens.push({
              type: 'character',
              text: getCharacterName(line.user, characters).toUpperCase()
            })
            dialogueOpen = true
            previousCharacter = currentCharacter
          }
          if (dialogueOpen) {
            const text = processText(line.text, characters)
            const isLoud = isUpperCase(text)
            if (isLoud) {
              if (!prevLoud) {
                tokens.push({
                  type: 'parenthetical',
                  text: `(${pickRandom(PARENTHETICALS.LOUD, seedGenerator)})`
                })
                prevLoud = true
              }

              tokens.push({
                type: 'dialogue',
                text: sentencify(text, true)
              })
            } else {
              if (prevLoud) {
                tokens.push({
                  type: 'parenthetical',
                  text: `(${pickRandom(PARENTHETICALS.RETURN_TO_NORMAL, seedGenerator)})`
                })
              }
              prevLoud = false

              tokens.push({
                type: 'dialogue',
                text: sentencify(text)
              })
            }
          }
          break
        }
      }
    }
  })

  clearCharactersMentionedAlready()

  return {
    title,
    html: buildFountainHTML(tokens),
    tokens
  }
}
