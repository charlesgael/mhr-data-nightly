import fs from 'fs/promises'
import process from 'process'
import axios from 'axios'
import { getArmorParser, getSkillsParser } from './src/scrapper/provider'
import urls from './src/urls.json'

async function main() {
  const skills_page = await axios.get<string>(urls.skills.url)
  const skills = await getSkillsParser(urls.skills.provider)(skills_page.data)
  const armors = (await Promise.all(urls.armors.map(async (it) => {
    const page = await axios.get<string>(it.url)
    return getArmorParser(it.provider)(page.data, it.type as any)
  })))
    .flatMap(it => it)

  fs.writeFile('data.json', JSON.stringify({
    skills,
    armors,
  }, null, 2))
}

main()
  .catch((err) => {
    console.error('An error happened', err)
    process.exit(-1)
  })
