import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => {
      Router.push('/');
    },
  });

  const onEmailChangeHander = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <div id="form-wrap">
      <form onSubmit={onSubmit}>
        <h1>Sign In</h1>
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
        {errors}
        <button className="btn btn-primary">Sign In</button>
      </form>
    </div>
  );
};

export default signup;
