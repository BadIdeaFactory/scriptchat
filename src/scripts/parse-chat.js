import store from '../store'
import { buildFountainHTML } from './output-html'

const charactersMentionedAlready = {}

/**
 * Turns a Slack ID into a name to display
 *
 * @param {string} id - Slack ID
 */
function getCharacterName (id) {
  const characters = store.getState().characters.characters
  const character = (characters[id] && characters[id].firstName) || id
  return character
}

function clearCharactersMentionedAlready () {
  Object.keys(charactersMentionedAlready).forEach((key) => {
    delete charactersMentionedAlready[key]
  })
}

function getCharacterNameForAction (id) {
  let name = getCharacterName(id)
  if (charactersMentionedAlready[id] !== true) {
    name = name.toUpperCase()
    charactersMentionedAlready[id] = true
  }
  return name
}

/**
 * Process a line of text from Slack
 *
 * @param {string} text - the line of text from Slack
 */
function processText (text) {
  // Replace user names in text
  text = text.replace(/<@([A-Z0-9]+)>/g, (match, id) => {
    return getCharacterName(id)
  })

  // Replace all other instances of brackets so that they don't parsed as HTML
  text = text.replace(/(<|>)/g, '')

  // Capitalize the first letter of each message
  text = text.charAt(0).toUpperCase() + text.substr(1)

  // If the last character of the message is not a punctuation mark, add a period.
  const lastCharacter = text.substr(-1)
  if (lastCharacter.match(/[?!.'":]/) === null) {
    text += '.'
  }

  return text
}

export function proofOfConceptScriptFormatting (json, meta, seedGenerator) {
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

  let previousCharacter
  let dialogueOpen = false

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
            text: `${getCharacterNameForAction(line.user)} enters.`
          })
          break
        case 'channel_leave':
          tokens.push({
            type: 'action',
            text: `${getCharacterNameForAction(line.user)} leaves.`
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
              text: getCharacterName(line.user).toUpperCase()
            })
            dialogueOpen = true
            previousCharacter = currentCharacter
          }
          if (dialogueOpen) {
            tokens.push({
              type: 'dialogue',
              text: processText(line.text)
            })
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
