export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  env: {
    supabaseUrl: process.env.NUXT_APP_SUPABASE_URL,
    supabaseKey: process.env.NUXT_APP_ANNON_KEY,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'auth-supabase-nuxt',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100;8..144,400;8..144,700&display=swap',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/supabase.client.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      'nuxt-supabase',
      {
        supabaseUrl: process.env.NUXT_APP_SUPABASE_URL,
        supabaseKey: process.env.NUXT_APP_ANNON_KEY,
      },
    ],
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};

// NMf0UVRlkH4IARyc
