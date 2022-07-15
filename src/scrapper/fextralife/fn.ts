import type { Cheerio } from 'cheerio'
import type { Armor } from '../../types'
import { execAll } from '../util/execAll'
import { textParse } from '../util/funcs'

const FIX_SKILL_NAMES: Record<string, string> = {
  'Quick Sheath': 'Quick Sheathe',
  'Fire Resistance Skill': 'Fire Resistance',
  'Water Resistance Skill': 'Water Resistance',
  'Thunder Resistance Skill': 'Thunder Resistance',
  'Ice Resistance Skill': 'Ice Resistance',
  'Dragon Resistance Skill': 'Dragon Resistance',
  'Aim Booster': 'Ballistics',
}
export const fixSkillName = (name: string) => {
  name = name
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9() ]/gui, '')
  return FIX_SKILL_NAMES[name] || name
}

export const skillsParse = (el: Cheerio<any>): Armor['skills'] =>
  (/x[ \xA0]?\d/.test(el.text())
    ? [...execAll<'skill_name' | 'levels'>(textParse(el), /(?<skill_name>.+?)[ \xA0]?x[ \xA0]?(?<levels>\d+)/g)]
        .map(({ groups: { skill_name, levels } }) => ({
          skill_name: fixSkillName(skill_name).trim(),
          levels: parseInt(levels),
        }))
    : [{ skill_name: fixSkillName(textParse(el)), levels: 1 }])
    .filter(it => !['', 'None'].includes(it.skill_name))
