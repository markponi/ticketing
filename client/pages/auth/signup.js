import { useState } from 'react';
import axios from 'axios';

const signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const onEmailChangeHander = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/users/signup', {
        email,
        password,
      });

      console.log(response.data);
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  };

  const showErrors = (
    <div className="alert alert-danger">
      <h4>Ooops...</h4>
      <ul className="my-0">
        {errors.map((err) => (
          <li key={err.message}>{err.message}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div id="form-wrap">
      <form onSubmit={onSubmit}>
        <h1>Sign up</h1>
        <div className="form-group">
          <label>Email Address</label>
          <input
            value={email}
            onChange={onEmailChangeHander}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            value={password}
            onChange={onPasswordChangeHandler}
            type="password"
            className="form-control"
          />
        </div>
        {errors.length > 0 && showErrors}
        <button className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
};

export default signup;
