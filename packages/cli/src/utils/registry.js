import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'
import { z } from 'zod'

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
export async function getRegistry() {
  const registryPath = path.join(__dirname, '../../registry/index.json')
  const registryContent = await fs.readJSON(registryPath)
  return registrySchema.parse(registryContent)
}
export async function getComponent(name) {
  const registry = await getRegistry()
  return registry.components.find((c) => c.name === name)
}
export async function getComponentsByCategory(category) {
  const registry = await getRegistry()
  return registry.components.filter((c) => c.category === category)
}
export async function getAllComponents() {
  const registry = await getRegistry()
  return registry.components
}
//# sourceMappingURL=registry.js.map
