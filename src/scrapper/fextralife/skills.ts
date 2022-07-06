import type { Cheerio } from 'cheerio'
import { load } from 'cheerio'
import type { Skill } from '../../types'
import { textParse } from '../util/funcs'

const levelsParse = (el: Cheerio<any>) =>
  parseInt(textParse(el).split(' ')?.[0] || '1')

export function parseSkills(html: string): Skill[] {
  const $ = load(html)
  return $('.wiki_table tbody tr').map((_, row) => {
    const [name, /* description */, levels/* , progression */] = $('td', row).map((_, it) => $(it)).toArray()
    return {
      name: textParse(name),
      max_level: levelsParse(levels),
    }
  }).toArray()
}
