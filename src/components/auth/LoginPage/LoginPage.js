import React from 'react';
import { connect } from 'react-redux';
import T from 'prop-types';

import usePromise from '../../../hooks/usePromise';
import { login } from '../../../api/auth';
import { authLogin } from '../../../store/actions';
import LoginForm from './LoginForm';

function LoginPage({ location, history, handleLogin }) {
  const { isPending: isLoading, error, execute, resetError } = usePromise();

  const handleSubmit = credentials => {
    execute(login(credentials))
      .then(handleLogin)
      .then(() => {
        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
      });
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
      {isLoading && <p>...login in nodepop</p>}
      {error && (
        <div onClick={resetError} style={{ color: 'red' }}>
          {error.message}
        </div>
      )}
    </div>
  );
}

LoginPage.propTypes = {
  location: T.shape({ state: T.shape({ from: T.object.isRequired }) })
    .isRequired,
  history: T.shape({ replace: T.func.isRequired }).isRequired,
};

const mapDispatchToProps = dispatch => ({
  handleLogin: () => dispatch(authLogin()),
});

export default connect(null, mapDispatchToProps)(LoginPage);
