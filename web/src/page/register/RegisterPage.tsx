import LoginCover from '../../asset/login-cover.jpeg';
import RegisterFeature from '../../feature/register/RegisterFeature';

const RegisterPage = () => {

  return (
    <section className="h-100 bg-light">
      <div className="container py-5">
        <div className="card rounded-3 text-black">
          <div className="row g-0">
            <div className="col-lg-6 d-lg-block d-none" style={{
              backgroundImage: `url(${LoginCover})`,
              backgroundSize: 'cover',
            }}/>
            <div className="col-lg-6 ">
              <RegisterFeature />
            </div>
          </div>
        </div>
      </div>
    </section>
)
}

export default RegisterPage;
