import React from 'react';
import { FaHashtag as icon } from 'react-icons/fa';
import { GiEuropeanFlag, GiUsaFlag } from 'react-icons/gi';

export  default  {
    name: 'category',
    title: 'Категорії',
    type: 'document',
    icon,
    fields: [
        {
            name: 'title',
            title: 'Назва',
            type: 'string',
            description: '(Назва категорії)',
        },
        {
            name: 'europe',
            title: 'Europe',
            type: 'boolean',
            option: {
                layout: 'checkbox'
            }
        },
        {
            name: 'use',
            title: 'Use',
            type: 'boolean',
            option: {
                layout: 'checkbox'
            }
        }
    ],
    preview: {
        select: {
            name: 'title',
            europe: 'europe'
        },
        prepare: ({props, name, europe}) => {
            console.log('props >> ', props);
            return {
                title: `${name}`,
                media: <span style={{ fontStyle: '20px', display: 'flex', alignItems: 'center' }}> {europe ? <GiEuropeanFlag /> : <GiUsaFlag /> } </span>
            }
        }
    }
}