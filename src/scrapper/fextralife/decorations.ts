import type { Cheerio } from 'cheerio'
import { load } from 'cheerio'
import type { Decoration } from '../../types'
import { textParse } from '../util/funcs'
import { skillsParse } from './fn'

const jewelParse = (el: Cheerio<any>): number => parseInt(/\((?<level>\d+)\)/.exec(textParse(el))?.groups?.level || '1')

export function parseDecorations(html: string): Decoration[] {
  const $ = load(html)

  return $('.wiki_table:first tbody tr').map((_, row) => {
    const [name, slotLevel, /* rarity */, skill/* , description, maxLvl, crafting */] = $('td', row).map((_, it) => $(it)).toArray()
    const skills = skillsParse(skill)[0]

    return {
      size: jewelParse(slotLevel),
      name: textParse(name),
      skill_name: skills.skill_name,
      levels: skills.levels,
    }
  }).toArray()
}
