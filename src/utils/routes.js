const ROUTES = {
    home: '/',
    login: '/login',
    signin: '/signin',
    articles: '/articles',
    magazines: '/magazines',
    videos: '/videos',
    books: '/books',
    guide: '/guide',
    blogs: '/blogs',
    resetPassword: '/reset/password',
    signup: '/signup',
    getArticleUrl: '/article/:id',
    createArticleUrl: '/articles/new',
    editArticleUrl: '/article/:slug/edit',
    signinWithEmail: '/signin/email',
    verify: '/verify/:token',
    getProfile: '/profile/:username',
    updateProfile: '/profile/:username/edit',
    profile: '/profile',
  };
  
  export default ROUTES;