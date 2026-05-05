import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'novedad',
  title: 'Novedad',
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
      title: 'Fecha',
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
      name: 'imagen',
      title: 'Imagen destacada',
      type: 'image',
      options: { hotspot: true },
      description: 'Tamaño recomendado: 1200 × 630 px — JPG o PNG. Se usa como portada de la noticia.',
    }),
    defineField({
      name: 'resumen',
      title: 'Resumen',
      type: 'text',
      rows: 3,
      description: 'Texto corto para la card en el sitio (máx. 200 caracteres)',
    }),
    defineField({
      name: 'cuerpo',
      title: 'Texto completo',
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
      description: 'Podés insertar imágenes entre párrafos usando el botón de imagen del editor. Tamaño recomendado para imágenes de cuerpo: 1200 × 800 px.',
    }),
  ],
  preview: {
    select: { title: 'titulo', subtitle: 'lab', media: 'imagen' },
  },
})
