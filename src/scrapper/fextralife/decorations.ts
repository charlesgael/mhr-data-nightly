import type { Cheerio } from 'cheerio'
import { load } from 'cheerio'
import type { Decoration } from '../../types'
import { textParse } from '../util/funcs'
import { fixSkillName, skillsParse } from './fn'

const jewelParse = (el: Cheerio<any>): string => `Jwl${/\((?<level>\d+)\)/.exec(textParse(el))?.groups?.level || 1}`

export function parseDecorations(html: string): Decoration[] {
  const $ = load(html)

  return $('.wiki_table tbody tr').map((_, row) => {
    const [name, slotLevel, /* rarity */, skill/* , description, maxLvl, crafting */] = $('td', row).map((_, it) => $(it)).toArray()

    const type = jewelParse(slotLevel)
    const skills = skillsParse(skill)[0]

    if (!skills)
      console.log($(skill).text(), skills)

    return {
      [type]: [
        textParse(name),
        fixSkillName(skills.skill_name),
        skills.levels,
      ],
    } as any
  }).toArray()
}
