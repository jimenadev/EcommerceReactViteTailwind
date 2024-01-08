import Layout from '../../components/Layout/'
import { Link } from 'react-router-dom'


function SignIn() {

    return (
      <Layout>
        <h1 className='font-mdium text-xl text-center mb-6 w-80'>Welcome</h1>
        <div className='flex flex-col w-80'>
            <p>
              <span className='font-light text-sm'>Email: </span>
              <span>contact@shopi.com</span>
            </p>
            <p>
              <span className='font-light text-sm'>Password: </span>
              <span>*******</span>
            </p>
            <Link to="/">
              <button
                  className='bg-black disabled:bg-black/40 text-white w-full rounded-lg py-3 mt-4 mb-2'>
              Log in      
              </button>              
            </Link>
            <div className='text-center'>
              <a className='font-light text-xs underline underline-offset-4' >Forgot myb password</a>
            </div>
            <button
              className='border border-black disabled:text-black/40 disabled:border-black/40'>
              Sign up</button>
        </div>
      </Layout>
    )
  }
  
  export default SignIn