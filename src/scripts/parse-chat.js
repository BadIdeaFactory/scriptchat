import store from '../store'

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
  Object.keys(charactersMentionedAlready).forEach((key) => { delete charactersMentionedAlready[key] })
}

function getCharacterNameForAction (id) {
  let name = getCharacterName(id)
  console.log(JSON.parse(JSON.stringify(charactersMentionedAlready)))
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

export function proofOfConceptScriptFormatting (json) {
  const tokens = []

  tokens.push({
    type: 'action',
    text: '<span class="bold">FADE IN:</span>'
  })

  json.forEach(line => {
    if (line.type === 'message') {
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
        default:
          tokens.push({
            type: 'dialogue_begin'
          })
          tokens.push({
            type: 'character',
            text: getCharacterName(line.user).toUpperCase()
          })
          tokens.push({
            type: 'dialogue',
            text: processText(line.text)
          })
          tokens.push({
            type: 'dialogue_end'
          })
          break
      }
    }
  })

  clearCharactersMentionedAlready()

  // fountain.js works backward
  tokens.reverse()

  /* eslint-disable */
  var regex = {
    title_page: /^((?:title|credit|author[s]?|source|notes|draft date|date|contact|copyright)\:)/gim,

    scene_heading: /^((?:\*{0,3}_?)?(?:(?:int|ext|est|i\/e)[. ]).+)|^(?:\.(?!\.+))(.+)/i,
    scene_number: /( *#(.+)# *)/,

    transition: /^((?:FADE (?:TO BLACK|OUT)|CUT TO BLACK)\.|.+ TO\:)|^(?:> *)(.+)/,

    dialogue: /^([A-Z*_]+[0-9A-Z (._\-')]*)(\^?)?(?:\n(?!\n+))([\s\S]+)/,
    parenthetical: /^(\(.+\))$/,

    action: /^(.+)/g,
    centered: /^(?:> *)(.+)(?: *<)(\n.+)*/g,

    section: /^(#+)(?: *)(.*)/,
    synopsis: /^(?:\=(?!\=+) *)(.*)/,

    note: /^(?:\[{2}(?!\[+))(.+)(?:\]{2}(?!\[+))$/,
    note_inline: /(?:\[{2}(?!\[+))([\s\S]+?)(?:\]{2}(?!\[+))/g,
    boneyard: /(^\/\*|^\*\/)$/g,

    page_break: /^\={3,}$/,
    line_break: /^ {2}$/,

    emphasis: /(_|\*{1,3}|_\*{1,3}|\*{1,3}_)(.+)(_|\*{1,3}|_\*{1,3}|\*{1,3}_)/g,
    bold_italic_underline: /(_{1}\*{3}(?=.+\*{3}_{1})|\*{3}_{1}(?=.+_{1}\*{3}))(.+?)(\*{3}_{1}|_{1}\*{3})/g,
    bold_underline: /(_{1}\*{2}(?=.+\*{2}_{1})|\*{2}_{1}(?=.+_{1}\*{2}))(.+?)(\*{2}_{1}|_{1}\*{2})/g,
    italic_underline: /(?:_{1}\*{1}(?=.+\*{1}_{1})|\*{1}_{1}(?=.+_{1}\*{1}))(.+?)(\*{1}_{1}|_{1}\*{1})/g,
    bold_italic: /(\*{3}(?=.+\*{3}))(.+?)(\*{3})/g,
    bold: /(\*{2}(?=.+\*{2}))(.+?)(\*{2})/g,
    italic: /(\*{1}(?=.+\*{1}))(.+?)(\*{1})/g,
    underline: /(_{1}(?=.+_{1}))(.+?)(_{1})/g,

    splitter: /\n{2,}/g,
    cleaner: /^\n+|\n+$/,
    standardizer: /\r\n|\r/g,
    whitespacer: /^\t+|^ {3,}/gm
  };

  var inline = {
    note: '<!-- $1 -->',

    line_break: '<br />',

    bold_italic_underline: '<span class=\"bold italic underline\">$2</span>',
    bold_underline: '<span class=\"bold underline\">$2</span>',
    italic_underline: '<span class=\"italic underline\">$2</span>',
    bold_italic: '<span class=\"bold italic\">$2</span>',
    bold: '<span class=\"bold\">$2</span>',
    italic: '<span class=\"italic\">$2</span>',
    underline: '<span class=\"underline\">$2</span>'
  };

  inline.lexer = function (s) {
    if (!s) {
      return;
    }

    var styles = [ 'underline', 'italic', 'bold', 'bold_italic', 'italic_underline', 'bold_underline', 'bold_italic_underline' ]
           , i = styles.length, style, match;

    s = s.replace(regex.note_inline, inline.note).replace(/\\\*/g, '[star]').replace(/\\_/g, '[underline]').replace(/\n/g, inline.line_break);

   // if (regex.emphasis.test(s)) {                         // this was causing only every other occurence of an emphasis syntax to be parsed
      while (i--) {
        style = styles[i];
        match = regex[style];

        if (match.test(s)) {
          s = s.replace(match, inline[style]);
        }
      }
   // }

    return s.replace(/\[star\]/g, '*').replace(/\[underline\]/g, '_').trim();
  };

  var i      = tokens.length, token
  var title, title_page = [], html = [], output;

  while (i--) {
    token = tokens[i];
    token.text = inline.lexer(token.text);

    switch (token.type) {
      case 'title': title_page.push('<h1>' + token.text + '</h1>'); title = token.text.replace('<br />', ' ').replace(/<(?:.|\n)*?>/g, ''); break;
      case 'credit': title_page.push('<p class=\"credit\">' + token.text + '</p>'); break;
      case 'author': title_page.push('<p class=\"authors\">' + token.text + '</p>'); break;
      case 'authors': title_page.push('<p class=\"authors\">' + token.text + '</p>'); break;
      case 'source': title_page.push('<p class=\"source\">' + token.text + '</p>'); break;
      case 'notes': title_page.push('<p class=\"notes\">' + token.text + '</p>'); break;
      case 'draft_date': title_page.push('<p class=\"draft-date\">' + token.text + '</p>'); break;
      case 'date': title_page.push('<p class=\"date\">' + token.text + '</p>'); break;
      case 'contact': title_page.push('<p class=\"contact\">' + token.text + '</p>'); break;
      case 'copyright': title_page.push('<p class=\"copyright\">' + token.text + '</p>'); break;

      case 'scene_heading': html.push('<h3' + (token.scene_number ? ' id=\"' + token.scene_number + '\">' : '>') + token.text + '</h3>'); break;
      case 'transition': html.push('<h2>' + token.text + '</h2>'); break;

      case 'dual_dialogue_begin': html.push('<div class=\"dual-dialogue\">'); break;
      case 'dialogue_begin': html.push('<div class=\"dialogue' + (token.dual ? ' ' + token.dual : '') + '\">'); break;
      case 'character': html.push('<h4>' + token.text + '</h4>'); break;
      case 'parenthetical': html.push('<p class=\"parenthetical\">' + token.text + '</p>'); break;
      case 'dialogue': html.push('<p>' + token.text + '</p>'); break;
      case 'dialogue_end': html.push('</div> '); break;
      case 'dual_dialogue_end': html.push('</div> '); break;

      case 'section': html.push('<p class=\"section\" data-depth=\"' + token.depth + '\">' + token.text + '</p>'); break;
      case 'synopsis': html.push('<p class=\"synopsis\">' + token.text + '</p>'); break;

      case 'note': html.push('<!-- ' + token.text + '-->'); break;
      case 'boneyard_begin': html.push('<!-- '); break;
      case 'boneyard_end': html.push(' -->'); break;

      case 'action': html.push('<p>' + token.text + '</p>'); break;
      case 'centered': html.push('<p class=\"centered\">' + token.text + '</p>'); break;

      case 'page_break': html.push('<hr />'); break;
      case 'line_break': html.push('<br />'); break;
    }
  }

  output = { title: title, html: { title_page: title_page.join(''), script: html.join('') }, tokens: tokens.reverse() };
  return output
  /* eslint-enable */
}
