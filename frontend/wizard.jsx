import React from 'react';
import ReactDOM from 'react-dom';
import AuthForm from './auth_form';

class Root extends React.Component {
  render() {
    return(
      <div className="home-wrapper">
        <AuthForm />
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Root/>, document.getElementById('root'));
});