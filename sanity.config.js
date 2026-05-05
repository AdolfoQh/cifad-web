import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'

export default defineConfig({
  name: 'cifad',
  title: 'CIFAD — Studio',
  projectId: '4kthhbvz',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            S.listItem().title('Novedades').child(
              S.documentTypeList('novedad').title('Novedades')
            ),
            S.listItem().title('Proyectos').child(
              S.documentTypeList('proyecto').title('Proyectos')
            ),
            S.listItem().title('Publicaciones').child(
              S.documentTypeList('publicacion').title('Publicaciones')
            ),
            S.listItem().title('Eventos').child(
              S.documentTypeList('evento').title('Eventos')
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
})
