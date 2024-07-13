import instance from '../axios';

export const getResults = async (page = 1, perPage = 10, search) => {
  const { data } = await instance.get('/api/test-results', {
    params: {
      page,
      per_page: perPage,
      search,
    },
  });
  return data.data;
};

export const deleteResult = async (id) => {
  const { data } = await instance.delete(`api/test-results/${id}`);
  return data;
};

export const showResult = async (id) => {
  const { data } = await instance.get(`api/test-results/${id}`);
  return data;
};

export const updateResult = async (result) => {
  const { data } = await instance.post(`api/test-results/${result.id}`, result);
  return data;
};

export const getResultsSuggestions = async (search) => {
  const response = await instance.get('api/test-results/suggestions', {
    params: {
      search,
    },
  });
  return response.data;
};
