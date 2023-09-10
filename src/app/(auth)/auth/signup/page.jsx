'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import UserIconLocal from '@/src/assets/icons/user-icon';
import useUserQuery from '@/hooks/query-hooks/useUserQuery';
import { useRouter } from 'next/navigation';

// ======= Icon imports -->
import EyeIconLocal from '@/src/assets/icons/eye-icon';
import EyeSlashIconLocal from '@/src/assets/icons/eye-slash-icon';
import { classNames } from '@/src/utils/classnames';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'individual',
    organization: {},
  });
  const { Query, localState: singupStatus } = useUserQuery(
    'user-sign-up',
    userData
  );
  const { data, isSuccess, isLoading, error, refetch } = Query;

  // ======= handle form change -->
  const handleFormChange = (e, field) => {
    setUserData((state) => ({ ...state, [field]: e.target.value }));
  };

  // ======= handle signup -->
  const handleSignup = (e) => {
    e.preventDefault();

    // ======= form check -->
    if (userData.password !== userData.confirmPassword)
      alert('Passwords do not match!');
    else {
      refetch();
    }
  };

  useEffect(() => {
    singupStatus === 'databaseSuccess' &&
      setTimeout(() => {
        router.push('/tool/dashboard');
      }, 1000);
  }, [singupStatus]);

  return (
    <div className='flex- w-full h-screen flex items-center justify-center overflow-hidden'>
      {/* -- SIgnup section */}
      <section className='w-full lg:w-3/5 h-full flex flex-col items-center justify-center relative'>
        <Link
          className='absolute top-5 left-5 font-bold text-lg text-violet-dark py-0.5 px-3 rounded-md border border-violet-main shadow-md lg:hidden'
          href='/'
        >
          NUBIA
        </Link>
        <form
          className='w-4/5 h-max py-5 bg-gren-400 flex flex-col items-center justify-center gap-4'
          onSubmit={handleSignup}
        >
          <p className='mb-5 text-4xl font-bold text-text-dark'>
            Create Account
          </p>
          {/* -- first name */}
          <div className='w-full sm:w-[60%] relative flex items-center'>
            <input
              type='text'
              required
              placeholder='First name'
              autoComplete='given-name'
              minLength={3}
              className='signup__form-input'
              value={userData.firstname}
              onChange={(e) => handleFormChange(e, 'firstname')}
            />
          </div>

          {/* -- last name */}
          <div className='w-full sm:w-[60%] relative flex items-center'>
            <input
              type='text'
              required
              placeholder='Last name'
              autoComplete='family-name'
              minLength={3}
              className='signup__form-input'
              value={userData.lastname}
              onChange={(e) => handleFormChange(e, 'lastname')}
            />
          </div>

          {/* -- email */}
          <div className='w-full sm:w-[60%] relative flex items-center'>
            <input
              type='email'
              placeholder='example@email.com'
              required
              autoComplete='email'
              className='signup__form-input'
              value={userData.email}
              onChange={(e) => handleFormChange(e, 'email')}
            />
          </div>

          {/* -- password */}
          <div className='w-full sm:w-[60%] relative flex items-center'>
            {
              {
                true: (
                  <EyeIconLocal
                    sx='absolute right-3 text-text-medium cursor-pointer'
                    action={() => setShowPassword(false)}
                  />
                ),
                false: (
                  <EyeSlashIconLocal
                    sx='absolute right-3 text-text-medium cursor-pointer'
                    action={() => setShowPassword(true)}
                  />
                ),
              }[showPassword]
            }
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              required
              minLength={6}
              className='signup__form-input'
              value={userData.password}
              onChange={(e) => handleFormChange(e, 'password')}
            />
          </div>

          {/* -- confirm password */}
          <div className='w-full sm:w-[60%] relative flex items-center'>
            {
              {
                true: (
                  <EyeIconLocal
                    sx='absolute right-3 text-text-medium cursor-pointer'
                    action={() => setShowPassword(false)}
                  />
                ),
                false: (
                  <EyeSlashIconLocal
                    sx='absolute right-3 text-text-medium cursor-pointer'
                    action={() => setShowPassword(true)}
                  />
                ),
              }[showPassword]
            }
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Confirm Password'
              required
              className='signup__form-input'
              value={userData.confirmPassword}
              onChange={(e) => handleFormChange(e, 'confirmPassword')}
            />
          </div>

          {/* -- Account type */}
          <div className='w-full sm:w-[60%] relative flex items-center'>
            <label htmlFor='account-type' className='w-1/3 font-medium text-lg'>
              Account type
            </label>
            <select
              className='w-2/3 bg-gray-200/60 text-base text-text-medium duration-300 transition-all ease-out focus:ring-violet-light outline-none focus:ring-1 border-none focus:bg-violet-50 focus:shadow-lg rounded-md'
              value={userData.accountType}
              onChange={(e) => handleFormChange(e, 'accountType')}
            >
              <option value='individual'>Individual (Personal)</option>
              <option value='organization'>Organization</option>
            </select>
          </div>

          <button
            type='submit'
            disabled={singupStatus}
            className={classNames(
              'w-full sm:w-[60%] py-2 rounded-md border shadow text-lg duration-300 ease-out transition-all mt-10 flex items-center justify-center gap-3',
              !singupStatus
                ? 'bg-violet-600 text-white-off font-medium hover:shadow-lg cursor-pointer hover:bg-violet-500'
                : singupStatus === 'error'
                ? 'border-red-main text-red-main'
                : 'bg-transparent text-violet-dark border-violet-dark font-bold cursor-not-allowed'
            )}
          >
            {
              {
                null: 'Sign me up!',
                firebaseLoading: (
                  <>
                    <lord-icon
                      src='https://cdn.lordicon.com/ukodqrxd.json'
                      trigger='loop'
                      colors='primary:#121331,secondary:#6d28d9'
                      style={{ width: '40px', height: '40px' }}
                    />
                    <p>Creating profile...</p>
                  </>
                ),
                firebaseSuccess: (
                  <>
                    <lord-icon
                      src='https://cdn.lordicon.com/jvihlqtw.json'
                      trigger='loop'
                      colors='primary:#121331,secondary:#6d28d9'
                      style={{ width: '40px', height: '40px' }}
                    />
                    <p>Profile created</p>
                  </>
                ),
                databaseLoading: (
                  <>
                    <lord-icon
                      src='https://cdn.lordicon.com/ukodqrxd.json'
                      trigger='loop'
                      colors='primary:#121331,secondary:#6d28d9'
                      style={{ width: '40px', height: '40px' }}
                    />
                    <p>Saving profile...</p>
                  </>
                ),
                databaseSuccess: (
                  <>
                    <lord-icon
                      src='https://cdn.lordicon.com/jvihlqtw.json'
                      trigger='loop'
                      colors='primary:#121331,secondary:#6d28d9'
                      style={{ width: '40px', height: '40px' }}
                    />
                    <p>Profile saved</p>
                  </>
                ),
                error: (
                  <>
                    <lord-icon
                      src='https://cdn.lordicon.com/tdrtiskw.json'
                      trigger='loop'
                      colors='primary:#121331,secondary:#d6460c'
                      style={{ width: '40px', height: '40px' }}
                    />
                    <p>An Error occured</p>
                  </>
                ),
              }[singupStatus]
            }
          </button>
        </form>
      </section>

      {/* -- Singin Section */}
      <section className='hidden w-2/5 bg-violet-600 h-full lg:flex relative items-center justify-center overflow-hidden'>
        {/* -- animated background blobs ## see below for object ## */}
        {blobData.map((blob) => (
          <AnimatedSVGBlob
            id={blob.id}
            sx={blob.sx}
            width={blob.width}
            key={blob.id}
          />
        ))}

        <div className='w-2/3 h-[75%] bg-white-off/80 rounded-xl shadow-lg z-20 flex flex-col items-center justify-center py-10 px-5 text-center gap-5 duration-300 ease-out transition-all hover:bg-white-off/90 hover:scale-[101%] hover:shadow-2xl relative'>
          <Link
            className='font-bold text-2xl absolute top-8 left-4 text-text-dark hover:text-violet-dark hover:border border-violet-main rounded-lg py-1 px-3 duration-300 ease-out transition-all hover:shadow-md'
            href='/'
          >
            NUBIA
          </Link>
          <p className='font-bold text-4xl text-text-dark'>
            Welcome&nbsp;<b className='text-violet-dark'>Back!</b>
          </p>
          <p className=' text-text-medium font-inter'>
            Do you have a NUBIA account? <br /> go to the sign in page to load
            your profile
          </p>
          <Link href='/auth' className='hero-link group px-20 mt-20'>
            Sign In
            <UserIconLocal sx='w-5 h-3 duration-300 ease-out -translate-x-5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 absolute right-8 group-hover:right-5' />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SignUp;

//=============================================>
// ======= MOVING SVG -->
//=============================================>
const blobData = [
  { id: 'blobSvg-1', sx: 'absolute -right-32 -bottom-[250px]', width: '100%' },
  { id: 'blobSvg-2', sx: 'absolute -left-20 -top-[100px]', width: '60%' },
  { id: 'blobSvg-3', sx: 'absolute right-10 top-[50px]', width: '30%' },
  { id: 'blobSvg-4', sx: 'absolute left-10 bottom-[50px]', width: '10%' },
];

const AnimatedSVGBlob = ({ sx, width, id }) => {
  return (
    <svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 500 500'
      width={width}
      id={id}
      style={{ opacity: 1 }}
      filter='blur(2.2px)'
      transform='rotate(-6)'
      className={sx}
    >
      <defs>
        <linearGradient id='gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
          <stop offset='0%' style={{ stopColor: 'rgb(225, 71, 184)' }}></stop>
          <stop offset='100%' style={{ stopColor: 'rgb(216, 65, 72)' }}></stop>
        </linearGradient>
      </defs>
      <path id='blob' fill='url(#gradient)' style={{ opacity: 0.38 }}>
        <animate
          attributeName='d'
          dur='10900ms'
          repeatCount='indefinite'
          values='M410.95278,296.31131Q377.83016,342.62262,346.59668,396.40799Q315.3632,450.19336,253.66275,438.70512Q191.9623,427.21687,143.72172,394.79004Q95.48115,362.3632,86.24057,306.1816Q77,250,74.51885,185.3632Q72.0377,120.72639,123.0377,68.91975Q174.0377,17.1131,239.88914,47.47163Q305.74057,77.83016,366.40332,99.75233Q427.06607,121.67451,435.57074,185.83725Q444.0754,250,410.95278,296.31131Z;M402.82336,294.74662Q372.52122,339.49324,339.45366,380.77461Q306.3861,422.05598,251.70463,416.9165Q197.02317,411.77702,159.66506,377.28619Q122.30695,342.79537,72.75579,296.39768Q23.20463,250,37.88851,178.24662Q52.57238,106.49324,117.0304,72.97924Q181.48842,39.46525,238.53957,73.79537Q295.59073,108.12549,332.49083,135.50917Q369.39092,162.89286,401.2582,206.44643Q433.12549,250,402.82336,294.74662Z;M424.84079,321.86371Q447.86386,393.72743,384.56836,431.15935Q321.27286,468.59128,248.86371,472.84107Q176.45457,477.09086,148.84107,410.1135Q121.22757,343.13614,67.95457,296.56807Q14.68157,250,76.45485,209.5685Q138.22813,169.13699,166.2505,123.59142Q194.27286,78.04585,249.70464,79.81828Q305.13643,81.59072,362.47721,103.93179Q419.818,126.27286,410.81786,188.13643Q401.81772,250,424.84079,321.86371Z;M437.48517,301.93698Q392.82947,353.87396,357.50371,413.21131Q322.17795,472.54867,247.51112,479.51159Q172.8443,486.47452,129.54819,427.64458Q86.25209,368.81464,81.57785,309.40732Q76.90361,250,83.86283,191.93327Q90.82205,133.86654,141.98146,104.152Q193.14087,74.43745,247.01483,83.88926Q300.88878,93.34106,355.51112,113.62234Q410.13346,133.90361,446.13717,191.95181Q482.14087,250,437.48517,301.93698Z;M469.34657,320.38487Q443.8468,390.76973,373.53877,402.1156Q303.23073,413.46147,238.88463,448.30757Q174.53853,483.15367,122.76833,431.6929Q70.99814,380.23213,76.84563,315.11607Q82.69313,250,78.9227,186.3071Q75.15227,122.6142,131.92223,91.73003Q188.6922,60.84587,253.2305,51.539Q317.7688,42.23213,359.5759,90.92433Q401.383,139.61653,448.11467,194.80827Q494.84633,250,469.34657,320.38487Z;M453.70516,317.0107Q433.36186,384.02139,362.52423,381.146Q291.6866,378.27061,242.8433,399.93801Q194,421.60541,117.08118,412.14317Q40.16237,402.68093,64.29201,326.34046Q88.42165,250,109.0107,206.32693Q129.59975,162.65387,148.64317,78.76495Q167.6866,-5.12397,241.8433,20.74072Q316,46.60541,350.8433,99.17023Q385.6866,151.73505,429.86753,200.86753Q474.04846,250,453.70516,317.0107Z;M410.95278,296.31131Q377.83016,342.62262,346.59668,396.40799Q315.3632,450.19336,253.66275,438.70512Q191.9623,427.21687,143.72172,394.79004Q95.48115,362.3632,86.24057,306.1816Q77,250,74.51885,185.3632Q72.0377,120.72639,123.0377,68.91975Q174.0377,17.1131,239.88914,47.47163Q305.74057,77.83016,366.40332,99.75233Q427.06607,121.67451,435.57074,185.83725Q444.0754,250,410.95278,296.31131Z'
        ></animate>
      </path>
      <path id='blob' fill='url(#gradient)' style={{ opacity: 0.38 }}>
        <animate
          attributeName='d'
          dur='10900ms'
          repeatCount='indefinite'
          values='M424.84079,321.86371Q447.86386,393.72743,384.56836,431.15935Q321.27286,468.59128,248.86371,472.84107Q176.45457,477.09086,148.84107,410.1135Q121.22757,343.13614,67.95457,296.56807Q14.68157,250,76.45485,209.5685Q138.22813,169.13699,166.2505,123.59142Q194.27286,78.04585,249.70464,79.81828Q305.13643,81.59072,362.47721,103.93179Q419.818,126.27286,410.81786,188.13643Q401.81772,250,424.84079,321.86371Z;M402.82336,294.74662Q372.52122,339.49324,339.45366,380.77461Q306.3861,422.05598,251.70463,416.9165Q197.02317,411.77702,159.66506,377.28619Q122.30695,342.79537,72.75579,296.39768Q23.20463,250,37.88851,178.24662Q52.57238,106.49324,117.0304,72.97924Q181.48842,39.46525,238.53957,73.79537Q295.59073,108.12549,332.49083,135.50917Q369.39092,162.89286,401.2582,206.44643Q433.12549,250,402.82336,294.74662Z;M428.88107,298.41731Q382.87896,346.83463,343.6411,381.94757Q304.40324,417.06052,249.73188,417.66327Q195.06052,418.26602,121.90324,407.33463Q48.74595,396.40324,42.90922,323.20162Q37.07249,250,50.04223,182.03624Q63.01197,114.07249,129.2076,98.49191Q195.40324,82.91133,251.0746,78.83673Q306.74595,74.76214,356.50598,105.64321Q406.26602,136.52427,440.5746,193.26214Q474.88318,250,428.88107,298.41731Z;M403.5,294Q372,338,343,393Q314,448,254,435.5Q194,423,138,397.5Q82,372,88,311Q94,250,86,187.5Q78,125,134,95.5Q190,66,253,57Q316,48,362,91.5Q408,135,421.5,192.5Q435,250,403.5,294Z;M439.43806,316.51312Q432.44085,383.02623,370.39398,407.14258Q308.3471,431.25893,240.13979,459.78516Q171.93248,488.31139,132.30301,426.26451Q92.67355,364.21763,63.21484,307.10882Q33.75613,250,44.06194,178.90151Q54.36774,107.80301,118.67355,75.31613Q182.97935,42.82924,240.60882,72.66602Q298.23828,102.50279,368.10882,107.87054Q437.97935,113.23828,442.20731,181.61914Q446.43527,250,439.43806,316.51312Z;M469.34657,320.38487Q443.8468,390.76973,373.53877,402.1156Q303.23073,413.46147,238.88463,448.30757Q174.53853,483.15367,122.76833,431.6929Q70.99814,380.23213,76.84563,315.11607Q82.69313,250,78.9227,186.3071Q75.15227,122.6142,131.92223,91.73003Q188.6922,60.84587,253.2305,51.539Q317.7688,42.23213,359.5759,90.92433Q401.383,139.61653,448.11467,194.80827Q494.84633,250,469.34657,320.38487Z;M424.84079,321.86371Q447.86386,393.72743,384.56836,431.15935Q321.27286,468.59128,248.86371,472.84107Q176.45457,477.09086,148.84107,410.1135Q121.22757,343.13614,67.95457,296.56807Q14.68157,250,76.45485,209.5685Q138.22813,169.13699,166.2505,123.59142Q194.27286,78.04585,249.70464,79.81828Q305.13643,81.59072,362.47721,103.93179Q419.818,126.27286,410.81786,188.13643Q401.81772,250,424.84079,321.86371Z'
        ></animate>
      </path>
      <path id='blob' fill='url(#gradient)' style={{ opacity: 0.38 }}>
        <animate
          attributeName='d'
          dur='10900ms'
          repeatCount='indefinite'
          values='M439.43806,316.51312Q432.44085,383.02623,370.39398,407.14258Q308.3471,431.25893,240.13979,459.78516Q171.93248,488.31139,132.30301,426.26451Q92.67355,364.21763,63.21484,307.10882Q33.75613,250,44.06194,178.90151Q54.36774,107.80301,118.67355,75.31613Q182.97935,42.82924,240.60882,72.66602Q298.23828,102.50279,368.10882,107.87054Q437.97935,113.23828,442.20731,181.61914Q446.43527,250,439.43806,316.51312Z;M437.48517,301.93698Q392.82947,353.87396,357.50371,413.21131Q322.17795,472.54867,247.51112,479.51159Q172.8443,486.47452,129.54819,427.64458Q86.25209,368.81464,81.57785,309.40732Q76.90361,250,83.86283,191.93327Q90.82205,133.86654,141.98146,104.152Q193.14087,74.43745,247.01483,83.88926Q300.88878,93.34106,355.51112,113.62234Q410.13346,133.90361,446.13717,191.95181Q482.14087,250,437.48517,301.93698Z;M424.84079,321.86371Q447.86386,393.72743,384.56836,431.15935Q321.27286,468.59128,248.86371,472.84107Q176.45457,477.09086,148.84107,410.1135Q121.22757,343.13614,67.95457,296.56807Q14.68157,250,76.45485,209.5685Q138.22813,169.13699,166.2505,123.59142Q194.27286,78.04585,249.70464,79.81828Q305.13643,81.59072,362.47721,103.93179Q419.818,126.27286,410.81786,188.13643Q401.81772,250,424.84079,321.86371Z;M402.82336,294.74662Q372.52122,339.49324,339.45366,380.77461Q306.3861,422.05598,251.70463,416.9165Q197.02317,411.77702,159.66506,377.28619Q122.30695,342.79537,72.75579,296.39768Q23.20463,250,37.88851,178.24662Q52.57238,106.49324,117.0304,72.97924Q181.48842,39.46525,238.53957,73.79537Q295.59073,108.12549,332.49083,135.50917Q369.39092,162.89286,401.2582,206.44643Q433.12549,250,402.82336,294.74662Z;M460.19079,314.81752Q429.48296,379.63503,366.74655,397.33779Q304.01014,415.04055,238.62673,450.6401Q173.24331,486.23965,141.80231,418.853Q110.3613,351.46635,87.51337,300.73317Q64.66545,250,86.56406,198.80231Q108.46268,147.60462,149.75669,107.39355Q191.05069,67.18248,258.9189,40.41566Q326.7871,13.64883,381.21107,64.45621Q435.63503,115.26359,463.26683,182.63179Q490.89862,250,460.19079,314.81752Z;M453.70516,317.0107Q433.36186,384.02139,362.52423,381.146Q291.6866,378.27061,242.8433,399.93801Q194,421.60541,117.08118,412.14317Q40.16237,402.68093,64.29201,326.34046Q88.42165,250,109.0107,206.32693Q129.59975,162.65387,148.64317,78.76495Q167.6866,-5.12397,241.8433,20.74072Q316,46.60541,350.8433,99.17023Q385.6866,151.73505,429.86753,200.86753Q474.04846,250,453.70516,317.0107Z;M439.43806,316.51312Q432.44085,383.02623,370.39398,407.14258Q308.3471,431.25893,240.13979,459.78516Q171.93248,488.31139,132.30301,426.26451Q92.67355,364.21763,63.21484,307.10882Q33.75613,250,44.06194,178.90151Q54.36774,107.80301,118.67355,75.31613Q182.97935,42.82924,240.60882,72.66602Q298.23828,102.50279,368.10882,107.87054Q437.97935,113.23828,442.20731,181.61914Q446.43527,250,439.43806,316.51312Z'
        ></animate>
      </path>
      <path id='blob' fill='url(#gradient)' style={{ opacity: 0.38 }}>
        <animate
          attributeName='d'
          dur='10900ms'
          repeatCount='indefinite'
          values='M460.19079,314.81752Q429.48296,379.63503,366.74655,397.33779Q304.01014,415.04055,238.62673,450.6401Q173.24331,486.23965,141.80231,418.853Q110.3613,351.46635,87.51337,300.73317Q64.66545,250,86.56406,198.80231Q108.46268,147.60462,149.75669,107.39355Q191.05069,67.18248,258.9189,40.41566Q326.7871,13.64883,381.21107,64.45621Q435.63503,115.26359,463.26683,182.63179Q490.89862,250,460.19079,314.81752Z;M453.70516,317.0107Q433.36186,384.02139,362.52423,381.146Q291.6866,378.27061,242.8433,399.93801Q194,421.60541,117.08118,412.14317Q40.16237,402.68093,64.29201,326.34046Q88.42165,250,109.0107,206.32693Q129.59975,162.65387,148.64317,78.76495Q167.6866,-5.12397,241.8433,20.74072Q316,46.60541,350.8433,99.17023Q385.6866,151.73505,429.86753,200.86753Q474.04846,250,453.70516,317.0107Z;M402.82336,294.74662Q372.52122,339.49324,339.45366,380.77461Q306.3861,422.05598,251.70463,416.9165Q197.02317,411.77702,159.66506,377.28619Q122.30695,342.79537,72.75579,296.39768Q23.20463,250,37.88851,178.24662Q52.57238,106.49324,117.0304,72.97924Q181.48842,39.46525,238.53957,73.79537Q295.59073,108.12549,332.49083,135.50917Q369.39092,162.89286,401.2582,206.44643Q433.12549,250,402.82336,294.74662Z;M469.34657,320.38487Q443.8468,390.76973,373.53877,402.1156Q303.23073,413.46147,238.88463,448.30757Q174.53853,483.15367,122.76833,431.6929Q70.99814,380.23213,76.84563,315.11607Q82.69313,250,78.9227,186.3071Q75.15227,122.6142,131.92223,91.73003Q188.6922,60.84587,253.2305,51.539Q317.7688,42.23213,359.5759,90.92433Q401.383,139.61653,448.11467,194.80827Q494.84633,250,469.34657,320.38487Z;M428.88107,298.41731Q382.87896,346.83463,343.6411,381.94757Q304.40324,417.06052,249.73188,417.66327Q195.06052,418.26602,121.90324,407.33463Q48.74595,396.40324,42.90922,323.20162Q37.07249,250,50.04223,182.03624Q63.01197,114.07249,129.2076,98.49191Q195.40324,82.91133,251.0746,78.83673Q306.74595,74.76214,356.50598,105.64321Q406.26602,136.52427,440.5746,193.26214Q474.88318,250,428.88107,298.41731Z;M410.95278,296.31131Q377.83016,342.62262,346.59668,396.40799Q315.3632,450.19336,253.66275,438.70512Q191.9623,427.21687,143.72172,394.79004Q95.48115,362.3632,86.24057,306.1816Q77,250,74.51885,185.3632Q72.0377,120.72639,123.0377,68.91975Q174.0377,17.1131,239.88914,47.47163Q305.74057,77.83016,366.40332,99.75233Q427.06607,121.67451,435.57074,185.83725Q444.0754,250,410.95278,296.31131Z;M460.19079,314.81752Q429.48296,379.63503,366.74655,397.33779Q304.01014,415.04055,238.62673,450.6401Q173.24331,486.23965,141.80231,418.853Q110.3613,351.46635,87.51337,300.73317Q64.66545,250,86.56406,198.80231Q108.46268,147.60462,149.75669,107.39355Q191.05069,67.18248,258.9189,40.41566Q326.7871,13.64883,381.21107,64.45621Q435.63503,115.26359,463.26683,182.63179Q490.89862,250,460.19079,314.81752Z'
        ></animate>
      </path>
    </svg>
  );
};
