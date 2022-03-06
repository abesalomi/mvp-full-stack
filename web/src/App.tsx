import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './page/login/LoginPage';
import MachinePage from './page/machine/MachinePage';
import RegisterPage from './page/register/RegisterPage';
import NavigateToLogin from './feature/login/NavigateToLogin';
import { useAuth } from './auth/Auth';


function App() {


  const {loading} = useAuth();

  return (
    <div className="App">
      <NavigateToLogin/>
      {
        loading ? 'loading...' : (
          <>
            <Routes>
              <Route path="/" element={<MachinePage/>}/>
              <Route path="auth">
                <Route path="login" element={<LoginPage/>}/>
                <Route path="register" element={<RegisterPage/>}/>
              </Route>
            </Routes>
          </>
        )
      }
    </div>
  );
}

export default App;
