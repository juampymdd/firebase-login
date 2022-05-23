import React, {useState} from 'react'
import { useAuth } from '../context/authContext'
import { useNavigate, Link } from 'react-router-dom'
import { Alert } from './Alert'
const Login = () => {
    const { login, googleLogin } = useAuth()
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const handleChange = ({target:{name, value}}) => setUser({...user, [name]: value})
    
    const handleSubmit = async (e) => {
        console.log(user)
        e.preventDefault()
        try{
            await login(user.email, user.password)
            navigate('/')
        }catch(error){
            console.log(error.message)
            setError(error.message)
        }
    }
    const handleGoogleLogin = async () => {
        try{
            await googleLogin()
            navigate('/')
        }catch(error){
            console.log(error.message)
            setError(error.message)
        }
    }

return (
    <div className='w-full max-w-xs m-auto text-black'>
        {error && <Alert message={error}/>}
        <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pb-8 pt-6 mb-4'>
            <div className="mb-4">
                <label className='block text-gray-700 text-sm font-fold mb-2' htmlFor="email">email</label>
                <input type="text" name='email' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' onChange={handleChange} placeholder="username"/>
            </div>
            <div className="mb-4">
                <label className='block text-gray-700 text-sm font-fold mb-2' htmlFor="password">password</label>
                <input type="password"  name='password' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' onChange={handleChange} placeholder="password"/>
            </div>
            <button className='bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>Login</button>
        </form>
        <p className='my-4 text-sm flex justify-between px-3'>Don't have an Account 
        <Link to='/register'>Register</Link>
        </p>
        <button type='button' className='bg-slate-50 hover: bg-slate-100 text-black shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full' onClick={handleGoogleLogin}>Google Login</button>
    </div>
)
}


export default Login
