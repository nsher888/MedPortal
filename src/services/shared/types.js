import instance from '../axios';

export const getTypes = async () => {
  const { data } = await instance.get('api/types');
  return data;
};
