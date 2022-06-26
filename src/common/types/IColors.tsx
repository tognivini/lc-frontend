const colors = {
  darkGray: '#303030',
  gray: '#C1C1C1',
  backgroundLight: '#fdfdfd',
  tertiary: '#C1C1C1',
  lightGray: '#EAF6F4',
  white: '#FFFFFF',
  navyBlue: '#162056',
  blue: '#01339B',
  lightBlue: '#1ABCFE',
  blueGreenLight: '#12bbad',
  red: '#CB2E34',
  secundary: '#CB2E34',
  lightRed: '#F05359',
  orange: '#FF8A00',
  beige: '#FBEAD1',
  darkGreen: '#006D44',
  green: '#008A5A',
  primary: '#008A5A',
  lightGreen: '#00cb53',
  cyan: '#09A68A',
  black: '#272727',
  crmBackgroudColor: '#fafafa',
  backgroundGray: '#eaeaea ',
  borderColor: 'rgba(0, 0, 0, 0.25)'
}

export interface IColors {
  color:
    | 'darkGray'
    | 'gray'
    | 'lightGray'
    | 'white'
    | 'navyBlue'
    | 'blue'
    | 'lightBlue'
    | 'blueGreenLight'
    | 'red'
    | 'lightRed'
    | 'orange'
    | 'beige'
    | 'darkGreen'
    | 'green'
    | 'lightGreen'
    | 'cyan'
    | 'tertiary'
    | 'secundary'
    | 'primary'
    | 'black'
    | 'backgroundLight'
    | 'crmBackgroudColor'
    | 'backgroundGray'
}

export { colors }
