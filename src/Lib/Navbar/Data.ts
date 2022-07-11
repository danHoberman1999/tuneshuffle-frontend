interface HeaderItemsProps {
  title: string
  url: string
  name: string
}

export const HeaderItems: HeaderItemsProps[] = [
  {
    title: 'Home',
    url: '#',
    name: 'nav-links',
  },
  {
    title: 'Github',
    url: 'https://github.com/danHoberman1999/randify-frontend',
    name: 'nav-links',
  },
  {
    title: 'Contact Us',
    url: '#',
    name: 'nav-links',
  },
]

export const BUTTON_STYLES: string[] = ['btn-primary', 'btn--outline']

export const BUTTON_SIZES: string[] = ['btn--medium', 'btn--large']
