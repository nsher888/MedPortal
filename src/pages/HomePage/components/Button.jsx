import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Button = ({ text, icon, className, route }) => {
  return (
    <Link
      to={route}
      className={`bg-customBlue text-white px-8 py-5 font-medium rounded-xl hover:bg-customBlueHover transition duration-300 ease-in-out cursor-pointer ${className}`}
    >
      {text}
      {icon && <BsArrowRight className='inline ml-2' size='2em' />}
    </Link>
  );
};

export default Button;
