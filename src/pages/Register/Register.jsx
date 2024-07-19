import useRegister from '@/hooks/useRegister';

import TextInput from '../../components/TextInput';
import usePageTitle from '../../hooks/usePageTitle';

const Register = () => {
  const { register, handleSubmit, errors, backendError, onSubmit, watch } =
    useRegister();

  usePageTitle('Sign Up');

  return (
    <div className='min-h-full'>
      <div className='flex justify-center flex-1 w-full'>
        <div className='flex flex-col flex-1 px-4 py-2 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
          <div className='w-full max-w-sm mx-auto lg:w-96'>
            <div>
              <h2 className='mt-8 text-3xl font-bold leading-9 tracking-tight text-gray-900'>
                Create your account
              </h2>
            </div>

            <div className='mt-10'>
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {backendError && (
                    <div className='mb-4 text-red-600'>{backendError}</div>
                  )}

                  <TextInput
                    label='Name'
                    name='name'
                    type='text'
                    errorMessage={errors.name?.message}
                    placeholder={'Enter your name'}
                    register={register('name', {
                      required: "This field can't be empty",
                    })}
                  />

                  <TextInput
                    label='Surname'
                    name='surname'
                    type='text'
                    errorMessage={errors.surname?.message}
                    placeholder={'Enter your surname'}
                    register={register('surname', {
                      required: "This field can't be empty",
                    })}
                  />

                  <TextInput
                    label={'Email'}
                    name={'email'}
                    type={'email'}
                    errorMessage={errors.email?.message}
                    placeholder={'Enter your email'}
                    register={register('email', {
                      required: "This field can't be empty",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                  />

                  <TextInput
                    label='ID Number'
                    name='idNumber'
                    type='text'
                    errorMessage={errors.idNumber?.message}
                    placeholder={'Enter your ID number'}
                    register={register('idNumber', {
                      required: "This field can't be empty",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'ID number should contain only digits',
                      },
                    })}
                  />

                  <TextInput
                    label='Date of Birth'
                    name='dateOfBirth'
                    type='date'
                    errorMessage={errors.dateOfBirth?.message}
                    placeholder={'Enter your date of birth'}
                    register={register('dateOfBirth', {
                      required: "This field can't be empty",
                    })}
                  />

                  <TextInput
                    label='Password'
                    name='password'
                    type='password'
                    errorMessage={errors.password?.message}
                    placeholder={'Enter your password'}
                    register={register('password', {
                      required: "This field can't be empty",
                      minLength: {
                        value: 8,
                        message: 'Password should have at least 8 characters',
                      },
                    })}
                  />

                  <TextInput
                    label='Repeat Password'
                    name='repeatPassword'
                    type='password'
                    errorMessage={errors.repeatPassword?.message}
                    placeholder={'Repeat your password'}
                    register={register('repeatPassword', {
                      required: "This field can't be empty",
                      validate: (value) =>
                        value === watch('password') || 'Passwords do not match',
                    })}
                  />

                  <div className='mt-6'>
                    <button
                      type='submit'
                      className='flex w-full justify-center rounded-md bg-customBlue transition duration-300 ease-in-out  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-customBlueHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customBlue'
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='relative flex-1 hidden w-0 lg:block'>
          <img
            className='absolute inset-0 object-cover w-full h-full'
            src='https://as2.ftcdn.net/v2/jpg/02/47/06/67/1000_F_247066771_6RWYi7bOE7t6JccsXHb6u1pkVqOTHFLE.jpg'
            alt='Scientist working with machine'
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
