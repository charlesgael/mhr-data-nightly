import type { Armor } from '../types'
import { parseArmors } from './fextralife/armor'
import { parseSkills } from './fextralife/skills'

function notImplemented(_url: string): Armor[] {
  throw new Error('Not implemented')
}

export function getArmorParser(provider: string) {
  switch (provider) {
    case 'fextralife': return parseArmors
    default: return notImplemented
  }
}

export function getSkillsParser(provider: string) {
  switch (provider) {
    case 'fextralife': return parseSkills
    default: return notImplemented
  }
}
