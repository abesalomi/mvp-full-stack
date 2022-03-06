import Logo from '../../asset/logo.png';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { ChangeEvent, useState } from 'react';
import { LoginCredentials } from '../../model/login';
import { partial } from 'lodash';
import { Link } from 'react-router-dom';

interface Props {
  onLogin: (loginRequest: LoginCredentials) => void,
  error?: string
}

const LoginForm = ({onLogin, error}: Props) => {

  const [data, setData] = useState<LoginCredentials>({
    username: '',
    password: ''
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onLogin(data);
  }

  const handleChange = (name: keyof LoginCredentials, e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [name]: e.target.value
    })
  }


  return (
    <div className="card-body p-md-5 mx-md-4">

      <div className="text-center">
        <img src={Logo}
             style={{width: 185}} alt="logo"/>
        <h4 className="mt-1 mb-5 pb-1">Neighbourhood Vending Machine</h4>
      </div>

      <Form onSubmit={handleSubmit}>
        <p>Please login to your account</p>

        <p className="text-danger">{error}</p>

        <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
          <Form.Control required type="text" placeholder="Username" onChange={partial(handleChange, 'username')}/>
        </FloatingLabel>

        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control required type="password" placeholder="Password" onChange={partial(handleChange, 'password')}/>
        </FloatingLabel>

        <div className="text-center pt-3 mb-5 pb-1">
          <Button className="w-50" variant="primary" type="submit">Log in</Button>
        </div>

        <div className="d-flex align-items-center justify-content-center pb-4">
          <p className="mb-0 me-2">Don't have an account?</p>
          <Link to="/auth/register">
            <Button variant="outline-danger">Create new</Button>
          </Link>
        </div>

      </Form>

    </div>
  )

}

export default LoginForm;
