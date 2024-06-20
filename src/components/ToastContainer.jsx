import { ToastContainer } from 'react-toastify';

import { toastConfig } from '../config/toastConfig';

const CustomToastContainer = () => {
  return <ToastContainer {...toastConfig} />;
};

export default CustomToastContainer;
