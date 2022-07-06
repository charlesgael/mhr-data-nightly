export interface Skill {
  name: string
  max_level: number
}

export interface Decoration {
  name: string
  skill_name: string
}

type armorType = 'helm' | 'chest' | 'arms' | 'waist' | 'legs'

export interface Armor {
  type: armorType
  name: string
  skills: {
    skill_name: string
    levels: number
  }[]
  sockets: {
    slot1: number
    slot2: number
    slot3: number
    slot4: number
  }
  rarity: number
  defense: number
  fire_res: number
  water_res: number
  lightning_res: number
  ice_res: number
  dragon_res: number
}
