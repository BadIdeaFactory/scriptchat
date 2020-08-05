/**
 * Reverse the fountain.js process! Takes JS tokens and rebuilds a text file
 * in the Fountain spec so that it can be saved / exported and used elsewhere.
 */

export function buildFountainTextFormat (tokens) {
  let title_page = []
  let lines = []

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]

    switch (token.type) {
      case 'title':
        title_page.push('Title: ' + token.text)
        break
      case 'credit':
        title_page.push('Credit: ' + token.text)
        break
      case 'author':
        title_page.push('Author: ' + token.text)
        break
      case 'authors':
        title_page.push('Authors: ' + token.text)
        break
      case 'source':
        title_page.push('Source: ' + token.text)
        break
      case 'notes':
        title_page.push('Notes: ' + token.text)
        break
      case 'draft_date':
        title_page.push('Draft date: ' + token.text)
        break
      case 'date':
        title_page.push('Date: ' + token.text)
        break
      case 'contact':
        title_page.push('Contact: ' + token.text)
        break
      case 'copyright':
        title_page.push('Copyright: ' + token.text)
        break

      case 'scene_heading':
        lines.push(token.text + '\n')
        break
      case 'transition':
        lines.push(token.text + '\n')
        break
      case 'dual_dialogue_begin':
        break
      case 'dialogue_begin':
        break
      case 'character':
        lines.push(token.text)
        break
      case 'parenthetical':
        lines.push(token.text)
        break
      case 'dialogue':
        lines.push(token.text)
        break
      case 'dialogue_end':
        lines.push('')
        break
      case 'dual_dialogue_end':
        lines.push('')
        break

      case 'section':
        lines.push(new Array(token.depth).fill('#').join('') + ' ' + token.text)
        break
      case 'synopsis':
        lines.push('= ' + token.text)
        break

      case 'note':
        lines.push('\n[[' + token.text + ']]\n')
        break
      case 'boneyard_begin':
        lines.push('/*')
        break
      case 'boneyard_end':
        lines.push('*/')
        break

      case 'action':
        lines.push(token.text)
        lines.push('')
        break
      case 'centered':
        lines.push('> ' + token.text + ' <')
        break

      case 'page_break':
        lines.push('\n===\n')
        break
      case 'line_break':
        lines.push('\n')
        break
    }
  }

  return title_page.join('\n') + '\n\n' + lines.join('\n')
}
