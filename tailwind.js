module.exports = {
  purge: [],
  theme: {
    extend: {
      fontFamily : {
        'raleway' : ['Raleway','sans-serif'],
        'montserrat' : ['Montserrat','sans-serif'],
      },
      colors: {
        background: {
          primary : 'var(--bg-background-primary)',
          'primary-hover' : 'var(--bg-background-primary-hover)',
          secondary : 'var(--bg-background-secondary)',
          ternary : 'var(--bg-background-ternary)',
        },
        //Text colors
        copy : {
          primary : 'var(--text-copy-primary)',
          secondary : 'var(--text-copy-secondary)',
          ternary : 'var(--text-copy-ternary)',
        },
        //Border
        boundary : {
          primary : 'var(--border-boundary-primary)'
        }
      },
    },
  },
  variants: {},
  plugins: [],
};
