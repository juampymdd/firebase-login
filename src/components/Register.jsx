import React, {useState} from 'react'
import { useAuth } from '../context/authContext'
import { Link, useNavigate } from 'react-router-dom'
import { Alert } from './Alert'
const Register = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState('')
    
    const { signup } = useAuth()

    const navigate = useNavigate()

    const handleChange = ({target:{name, value} }) => {
        setUser({...user, [name]: value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await   signup(user.email,user.password)
            navigate('/')
        }catch(error){
            console.log(error.message)
            setError(error.message)
        setTimeout(() => setError(''),5000)
        }
    }

    return (
        <div className='w-full max-w-xs m-auto text-black'>
            {error && <Alert message={error}/>}
            <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pb-8 pt-6 mb-4'>
                <div className="mb-4">
                    <label htmlFor="email" className='block text-gray-700 text-sm font-fold mb-2'>Email</label>
                    <input type="text" name='email' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='email' onChange={handleChange}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" >password</label>
                    <input type="password" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name='password' placeholder='password' onChange={handleChange}/>
                </div>

                <button className='bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' >Register</button>
            </form>

            <p className='my-4 text-sm flex justify-between px-3'>
                Already have an account? 
                <Link to='/login'>Login</Link>
        </p>
        </div>
    )
}

export default Register