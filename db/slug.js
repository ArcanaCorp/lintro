import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconLocation, IconMail, IconPhone } from "@tabler/icons-react";

import avatarAAPRODEH from '@/public/logo-AAPRODEH.png'
import bannerAAPRODEH from '@/public/banner-AAPRODEH.avif'

export const users = [
    {
        slug: 'AAPRODEH',
        link: 'https://lintro.link/AAPRODEH',
        name: 'AAPRODEH',
        fullname: 'Asociación de Abogados Pro Derechos Humanos',
        avatar: avatarAAPRODEH,
        banner: bannerAAPRODEH, // Aquí debes importar o asignar la imagen banner de fondo
        mail: 'aaprodeh@gmail.com',
        phone: '908503474',
        colors: {
            primary: '#181818',
            accent: '#FFFFFF'
        },
        contacts: [
            {
                link: 'tel:+51908503474',
                icon: <IconPhone size={24} strokeWidth={1.2} stroke={'#FFFFFF'} />
            },
            {
                link: 'https://mail.google.com/mail/?view=cm&to=aaprodeh@gmail.com',
                icon: <IconMail size={24} strokeWidth={1.2} stroke={'#FFFFFF'} />
            },
            {
                link: 'https://maps.app.goo.gl/9MCmV4X6JiRbp8Sw6',
                icon: <IconLocation size={24} strokeWidth={1.2} stroke={'#FFFFFF'} />
            }
        ],
        networks: [
            {
                icon: <IconBrandFacebook size={24} strokeWidth={1.2} stroke={'#FFFFFF'} />,
                link: '',
            },
            {
                icon: <IconBrandInstagram size={24} strokeWidth={1.2} stroke={'#FFFFFF'} />,
                link: '',
            },
            {
                icon: <IconBrandLinkedin size={24} strokeWidth={1.2} stroke={'#FFFFFF'} />,
                link: '',
            },
        ],
        tit: 'Nuestras especialidades',
        services: [
            {
                txt: 'Derecho Administrativo'
            },
            {
                txt: 'Derecho Pesquero'
            },
            {
                txt: 'Derecho Registral'
            },
            {
                txt: 'Derecho Penal'
            },
            {
                txt: 'Derecho Constitucional'
            },
            {
                txt: 'Derecho Civil'
            },
            {
                txt: 'Derecho Tributario'
            }
        ]
    }  
]