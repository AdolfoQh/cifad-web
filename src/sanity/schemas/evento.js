import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'evento',
  title: 'Evento',
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
      name: 'fechaInicio',
      title: 'Fecha de inicio',
      type: 'datetime',
      validation: R => R.required(),
    }),
    defineField({
      name: 'fechaFin',
      title: 'Fecha de fin',
      type: 'datetime',
      description: 'Opcional — completar si el evento dura más de un día',
    }),
    defineField({
      name: 'lugar',
      title: 'Lugar',
      type: 'string',
    }),
    defineField({
      name: 'autores',
      title: 'Organizador/es',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'imagen',
      title: 'Imagen destacada',
      type: 'image',
      options: { hotspot: true },
      description: 'Tamaño recomendado: 800 × 420 px — JPG o PNG. Se muestra como portada del evento.',
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
    defineField({
      name: 'urlInscripcion',
      title: 'URL de inscripción',
      type: 'url',
      description: 'Opcional',
    }),
  ],
  preview: {
    select: { title: 'titulo', subtitle: 'lugar', media: 'imagen' },
  },
})
