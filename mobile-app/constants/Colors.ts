const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

const Colors = {
  light: {
    error: {
      strong: '#EB475C',
      medium: '#e8aaa7',
      weak: '#F7E1E0',
    },
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    error: {
      strong: '#EB475C',
    },
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
} as const;
export default Colors;
