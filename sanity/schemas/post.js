import { GrDocument as icon } from 'react-icons/gr';

export default {
    name: 'post',
    title: 'Новини',
    type: 'document',
    icon,
    fields: [
        {
            name: 'title',
            title: 'Назва',
            type: 'string',
            description: 'Назва новини',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 100,
            }
        },
        {
            name: 'image',
            title: 'Фото',
            type: 'image',
            options: {
                 hotspot: true,
            }
        },
        {
            name: 'body',
            title: 'Текст',
            type: 'text',
            description: 'Текс новини',
        },
        {
            name: 'categories',
            title: 'Категорії',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [
                        {type: 'category'},
                    ]
                }
            ]
        },
    ],
    preview: {
        select: {
            title: 'title',
            media: 'image',
            category0: 'categories.0.title',
            category1: 'categories.1.title',
            category2: 'categories.2.title',

        },
        prepare: ({title,media, ... categories }) => {

            const catList = Object.values(categories).filter((res) => res !== undefined )
            console.log('catlist', catList)
            return {
                title,
                media,
                subtitle: catList.join(', '),
            }
        }
    }
}