import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'proyecto',
  title: 'Proyecto',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título *',
      type: 'string',
      validation: R => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL) *',
      type: 'slug',
      options: { source: 'titulo', maxLength: 96 },
      description: 'Hacé clic en "Generate" para generarlo automáticamente desde el título.',
      validation: R => R.required(),
    }),
    defineField({
      name: 'lab',
      title: 'Laboratorio *',
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
      name: 'estado',
      title: 'Estado *',
      type: 'string',
      options: {
        list: [
          { title: 'En curso', value: 'en_curso' },
          { title: 'Finalizado', value: 'finalizado' },
        ],
        layout: 'radio',
      },
      initialValue: 'en_curso',
      validation: R => R.required(),
    }),
    defineField({
      name: 'fechaInicio',
      title: 'Fecha de inicio *',
      type: 'date',
      validation: R => R.required(),
    }),
    defineField({
      name: 'fechaFin',
      title: 'Fecha de fin',
      type: 'date',
      description: 'Opcional — completar si el proyecto ya finalizó',
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
      description: 'Tamaño recomendado: 800 × 420 px — JPG o PNG. Se usa como portada del proyecto.',
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
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
      description: 'Podés insertar imágenes entre párrafos usando el botón de imagen del editor. Tamaño recomendado: 1200 × 800 px.',
    }),
  ],
  preview: {
    select: { title: 'titulo', subtitle: 'estado', media: 'imagen' },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle === 'en_curso' ? 'En curso' : 'Finalizado',
        media,
      }
    },
  },
})
