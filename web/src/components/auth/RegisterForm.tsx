import Logo from '../../asset/logo.png';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { ChangeEvent, useState } from 'react';
import { partial } from 'lodash';
import { Link } from 'react-router-dom';
import { RegisterRequest } from '../../model/register';
import { AuthRole } from '../../model/auth';

interface Props {
  onRegister: (loginRequest: RegisterRequest) => void,
  errors: string[]
}

interface RegisterFormData {
  username: string;
  password1: string;
  password2: string;
  roles: AuthRole[]
}


const RegisterForm = ({onRegister, errors}: Props) => {

  const [data, setData] = useState<RegisterFormData>({
    username: '',
    password1: '',
    password2: '',
    roles: [],
  });

  const [formErrors, setFormErrors] = useState<string[]>([]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const _errors = [];

    if (data.password1 !== data.password2) {
      _errors.push('Passwords does not matched.');
    }

    setFormErrors(_errors);
    if(_errors.length) {
      return _errors;
    }

    onRegister({
      username: data.username,
      password: data.password1,
      roles: data.roles,
    });
  }

  const handleChange = (name: keyof RegisterFormData, e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [name]: e.target.value,
    })
  }
  const handleRolesChange = (role: AuthRole) => {
    setData({
      ...data,
      roles: [role],
    })
  }


  return (
    <div className="card-body p-md-5 mx-md-4">

      <div className="text-center">
        <img src={Logo}
             style={{width: 185}} alt="logo"/>
        <h4 className="mt-1 mb-5 pb-1">Neighbourhood Vending Machine</h4>
      </div>

      <Form onSubmit={handleSubmit} autoComplete="off">

        <ul>
          {formErrors.map((e, i) => (<li key={`form-${i}`} className="text-danger">{e}</li>))}
          {errors.map((e, i) => (<li key={`server-${i}`} className="text-danger">{e}</li>))}
        </ul>

        <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
          <Form.Control required type="text" placeholder="Username" minLength={4}
                        onChange={partial(handleChange, 'username')}/>
        </FloatingLabel>

        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
          <Form.Control required type="password" placeholder="Password" minLength={8}
                        onChange={partial(handleChange, 'password1')}/>
        </FloatingLabel>

        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
          <Form.Control required type="password" placeholder="Password" minLength={8}
                        onChange={partial(handleChange, 'password2')}/>
        </FloatingLabel>

        <Form.Check
          inline required
          onChange={() => handleRolesChange('BUYER')}
          label="Buyer"
          name="role"
          type="radio"
          id="BUYER"
        />
        <Form.Check
          inline required
          onChange={() => handleRolesChange('SELLER')}
          label="Seller"
          name="role"
          type="radio"
          id="SELLER"
        />
        <div className="text-center pt-3 mb-5 pb-1">
          <Button className="w-100" variant="primary" type="submit">Register</Button>
        </div>

        <div className="d-flex align-items-center justify-content-center pb-4">
          <p className="mb-0 me-2">Have an account?</p>
          <Link to="/auth/login">
            <Button variant="outline-success">Back to Login</Button>
          </Link>
        </div>

      </Form>

    </div>
  )

}

export default RegisterForm;
