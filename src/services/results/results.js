import instance from '../axios';

export const getResults = async () => {
  const { data } = await instance.get('api/test-results');
  return data;
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
