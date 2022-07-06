import type { Cheerio } from 'cheerio'
import { load } from 'cheerio'
import type { Armor } from '../../types'
import { numberParse, textParse } from '../util/funcs'
import { skillsParse } from './fn'

const socketsParse = (el: Cheerio<any>): Armor['sockets'] =>
  Object.fromEntries(
    el.find('img').toArray()
      .map(img => img.attribs.src)
      .map(it => /level_(?<level>\d+)_icon/.exec(it)?.groups?.level)
      .filter((it): it is string => !!it)
      .map(it => parseInt(it))
      .reduce((acc, val) => {
        const lvl = val - 1
        if (!isNaN(lvl))
          acc[lvl] += 1
        return acc
      }, [0, 0, 0, 0])
      .map((it, idx) => ([`slot${idx + 1}`, it])),
  ) as any

export function parseArmors(html: string, armor_type: Armor['armor_type']): Armor[] {
  const $ = load(html)
  return $('.wiki_table tbody tr').map((_, row) => {
    const [name, skills, sockets, rarity, defense, fireRes, waterRes, lightningRes, iceRes, dragonRes] = $('td', row).map((_, it) => $(it)).toArray()

    // .map((i, col) => columnSpecific[i]($(col), $))
    // .toArray();
    return <Armor>{
      armor_type,
      name: textParse(name),

      rarity: numberParse(rarity),
      defense: numberParse(defense),
      fire_res: numberParse(fireRes),
      water_res: numberParse(waterRes),
      lightning_res: numberParse(lightningRes),
      ice_res: numberParse(iceRes),
      dragon_res: numberParse(dragonRes),

      skills: skillsParse(skills),

      sockets: socketsParse(sockets),
    }
  }).toArray()
}
