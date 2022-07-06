import type { Armor, Decoration, Skill } from '../types'
import * as fextralife from './fextralife'

function notImplemented(_url: string): any {
  throw new Error('Not implemented')
}

export function getArmorParser(provider: string): (html: string, type: Armor['type']) => Armor[] {
  switch (provider) {
    case 'fextralife': return fextralife.parseArmors
    default: return notImplemented
  }
}

export function getSkillsParser(provider: string): (html: string) => Skill[] {
  switch (provider) {
    case 'fextralife': return fextralife.parseSkills
    default: return notImplemented
  }
}

export function getDecorationsParser(provider: string): (html: string) => Decoration[] {
  switch (provider) {
    case 'fextralife': return fextralife.parseDecorations
    default: return notImplemented
  }
}