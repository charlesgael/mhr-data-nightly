export interface Skill {
  name: string
  max_level: number
}

export interface Decoration {
  size: number
  name: string
  skill_name: string
  levels: number
}

type armorType = 'Helm' | 'Chest' | 'Arms' | 'Waist' | 'Legs'

export interface Armor {
  armor_type: armorType
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
