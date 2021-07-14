const routes = {
  main: () => '/',
  auth: () => '/auth',
  topic: () => '/topic',
  word: () => '/word',
  topics: () => '/topics',
  editTopic: (id = ':topicId') => `/topics/${id}`,
  words: () => '/words',
  editWord: (id = ':wordId') => `/words/${id}`,
  currentPage: (page: string) => `/${page}`,
};

export default routes;
