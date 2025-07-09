import { z } from 'zod'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const componentSchema = z.object({
  name: z.string(),
  description: z.string(),
  files: z.array(z.string()),
  events: z.array(z.string()),
  category: z.string(),
})

const registrySchema = z.object({
  components: z.array(componentSchema),
})

export type Component = z.infer<typeof componentSchema>
export type Registry = z.infer<typeof registrySchema>

export async function getRegistry(): Promise<Registry> {
  const registryPath = path.join(__dirname, '../../registry/index.json')
  const registryContent = await fs.readJSON(registryPath)
  return registrySchema.parse(registryContent)
}

export async function getComponent(name: string): Promise<Component | undefined> {
  const registry = await getRegistry()
  return registry.components.find((c) => c.name === name)
}

export async function getComponentsByCategory(category: string): Promise<Component[]> {
  const registry = await getRegistry()
  return registry.components.filter((c) => c.category === category)
}

export async function getAllComponents(): Promise<Component[]> {
  const registry = await getRegistry()
  return registry.components
}