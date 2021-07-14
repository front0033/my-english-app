const routes = {
  main: () => '/',
  auth: () => '/auth',
  topic: () => '/topic',
  word: () => '/word',
  topics: () => '/topics',
  editTopic: (id = ':topicId') => `/topics/${id}`,
  words: () => '/words',
  editWord: (id = ':wordId') => `/words/${id}`,
};

export default routes;
