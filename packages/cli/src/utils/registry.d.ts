import type { z } from 'zod'
declare const componentSchema: z.ZodObject<
  {
    name: z.ZodString
    description: z.ZodString
    files: z.ZodArray<z.ZodString, 'many'>
    events: z.ZodArray<z.ZodString, 'many'>
    category: z.ZodString
  },
  'strip',
  z.ZodTypeAny,
  {
    name: string
    files: string[]
    description: string
    events: string[]
    category: string
  },
  {
    name: string
    files: string[]
    description: string
    events: string[]
    category: string
  }
>
declare const registrySchema: z.ZodObject<
  {
    components: z.ZodArray<
      z.ZodObject<
        {
          name: z.ZodString
          description: z.ZodString
          files: z.ZodArray<z.ZodString, 'many'>
          events: z.ZodArray<z.ZodString, 'many'>
          category: z.ZodString
        },
        'strip',
        z.ZodTypeAny,
        {
          name: string
          files: string[]
          description: string
          events: string[]
          category: string
        },
        {
          name: string
          files: string[]
          description: string
          events: string[]
          category: string
        }
      >,
      'many'
    >
  },
  'strip',
  z.ZodTypeAny,
  {
    components: {
      name: string
      files: string[]
      description: string
      events: string[]
      category: string
    }[]
  },
  {
    components: {
      name: string
      files: string[]
      description: string
      events: string[]
      category: string
    }[]
  }
>
export type Component = z.infer<typeof componentSchema>
export type Registry = z.infer<typeof registrySchema>
export declare function getRegistry(): Promise<Registry>
export declare function getComponent(name: string): Promise<Component | undefined>
export declare function getComponentsByCategory(category: string): Promise<Component[]>
export declare function getAllComponents(): Promise<Component[]>
//# sourceMappingURL=registry.d.ts.map
