import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAsyncFn } from 'react-use';
import { httpRegister } from '../../services/auth';
import RegisterForm from '../../components/auth/RegisterForm';
import { RegisterRequest } from '../../model/register';
import { AxiosError } from 'axios';

const LoginFeature = () => {

  const [{error, value, loading}, register] = useAsyncFn(httpRegister)
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);

  const registerLogin = async (registerRequest: RegisterRequest) => {
    await register(registerRequest)
  }

  useEffect(() => {
    if (loading) {
      return;
    }
    const _error = error as AxiosError;
    if (_error) {
      if (typeof _error?.response?.data?.message === 'string') {
        setErrors([_error?.response?.data?.message])
      } else {
        setErrors(_error?.response?.data?.message)
      }
      return;
    }
    if(value){
      navigate('/auth/login')
    }
  }, [loading])

  return (
    <RegisterForm errors={errors} onRegister={registerLogin}/>
  )
}

export default LoginFeature;
