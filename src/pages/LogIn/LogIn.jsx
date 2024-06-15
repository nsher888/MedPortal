import TextInput from '../../components/TextInput';
import useLogIn from '../../hooks/useLogIn';

const LogIn = () => {
  const { register, handleSubmit, errors, onSubmit } = useLogIn();

  return (
    <div className='min-h-full'>
      <div className='flex justify-center flex-1 w-full md:min-h-[800px]'>
        <div className='relative flex-1 hidden w-0 lg:block'>
          <img
            className='absolute inset-0 object-cover w-full h-full'
            src='https://media.istockphoto.com/id/1088180004/photo/female-scientist-working-in-the-laboratory.jpg?s=1024x1024&w=is&k=20&c=6vAO-Uroyi9VALrEXUHqccoWS770_HaNHtYWuf863S0='
            alt='Scientist working with machine'
          />
        </div>
        <div className='flex flex-col flex-1 px-4 py-2 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
          <div className='w-full max-w-sm mx-auto lg:w-96'>
            <div>
              <h2 className='mt-8 text-3xl font-bold leading-9 tracking-tight text-gray-900'>
                Sign in to your account
              </h2>
            </div>

            <div className='mt-10'>
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextInput
                    label='Email address'
                    name='email'
                    type='email'
                    errorMessage={errors.email?.message}
                    placeholder={'Enter your email adress'}
                    register={register('email', {
                      required: "This field can't be empty",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: 'Invalid email address',
                      },
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

                  <div className='mb-10'>
                    <a
                      href='#'
                      className='font-semibold text-customBlue hover:text-customBlueHover'
                    >
                      Forgot password?
                    </a>
                  </div>

                  <div>
                    <button
                      type='submit'
                      className='flex w-full justify-center rounded-md bg-customBlue transition duration-300 ease-in-out  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-customBlueHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customBlue'
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
