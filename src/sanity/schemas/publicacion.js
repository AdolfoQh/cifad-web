import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'publicacion',
  title: 'Publicación',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: R => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'titulo', maxLength: 96 },
      validation: R => R.required(),
    }),
    defineField({
      name: 'lab',
      title: 'Laboratorio',
      type: 'string',
      options: {
        list: [
          { title: 'General CIFAD', value: 'general' },
          { title: 'Lab. de Color', value: 'color' },
          { title: 'Lab. de Biomateriales', value: 'biomateriales' },
          { title: 'Lab. de Morfología', value: 'morfologia' },
          { title: 'Lab. de IA Aplicada al Diseño', value: 'ia' },
          { title: 'Lab. de Mecatrónica', value: 'mecatronica' },
          { title: 'Lab. Audiovisual', value: 'audiovisual' },
        ],
      },
      validation: R => R.required(),
    }),
    defineField({
      name: 'fecha',
      title: 'Fecha de publicación',
      type: 'date',
      validation: R => R.required(),
    }),
    defineField({
      name: 'autores',
      title: 'Autor/es',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'resumen',
      title: 'Resumen / Abstract',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'doi',
      title: 'DOI',
      type: 'string',
      description: 'Opcional — ej: 10.1000/xyz123',
    }),
    defineField({
      name: 'url',
      title: 'URL de la publicación',
      type: 'url',
      description: 'Opcional — enlace a la publicación completa',
    }),
    defineField({
      name: 'imagen',
      title: 'Imagen de portada',
      type: 'image',
      options: { hotspot: true },
      description: 'Opcional — Tamaño recomendado: 800 × 420 px, JPG o PNG.',
    }),
    defineField({
      name: 'cuerpo',
      title: 'Contenido adicional',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Epígrafe',
              description: 'Texto descriptivo debajo de la imagen (opcional)',
            },
          ],
        },
      ],
      description: 'Opcional — Podés agregar texto extendido e imágenes complementarias. Tamaño recomendado para imágenes: 1200 × 800 px.',
    }),
  ],
  preview: {
    select: { title: 'titulo', subtitle: 'lab', media: 'imagen' },
  },
})
