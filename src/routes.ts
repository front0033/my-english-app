const routes = {
  main: () => '/',
  auth: () => '/auth',
  signIn: () => '/sign-in',
  signUp: () => '/sign-up',
  profile: () => '/profile',
  topic: () => '/topic',
  word: () => '/word',
  topics: () => '/topics',
  editTopic: (id = ':topicId') => `/topics/${id}`,
  words: () => '/words',
  editWord: (id = ':wordId') => `/words/${id}`,
  currentPage: (page: string) => `/${page}`,
  about: () => '/about',
};

export default routes;
