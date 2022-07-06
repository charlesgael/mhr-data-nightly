import type { Cheerio } from 'cheerio'
import type { Armor } from '../../types'
import { execAll } from '../util/execAll'

const FIX_SKILL_NAMES: Record<string, string> = {
  'Quick Sheath': 'Quick Sheathe',
  'Fire Resistance Skill': 'Fire Resistance',
  'Water Resistance Skill': 'Water Resistance',
  'Thunder Resistance Skill': 'Thunder Resistance',
  'Ice Resistance Skill': 'Ice Resistance',
  'Dragon Resistance Skill': 'Dragon Resistance',
}
export const fixSkillName = (name: string) => FIX_SKILL_NAMES[name] || name

export const skillsParse = (el: Cheerio<any>): Armor['skills'] =>
  /x\d/.test(el.text())
    ? [...execAll<'skill_name' | 'levels'>(el.text().trim(), /(?<skill_name>.*?)x(?<levels>\d+)/g)]
        .map(({ groups: { skill_name, levels } }) => ({
          skill_name: fixSkillName(skill_name).trim(),
          levels: parseInt(levels),
        }))
    : [{ skill_name: fixSkillName(el.text().trim()), levels: 1 }]
