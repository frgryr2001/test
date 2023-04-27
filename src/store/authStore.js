import { observable, action, computed, makeObservable } from 'mobx';

import axios from 'axios';

class AuthStore {
  user = null;
  token = null;
  errors = null;
  loading = false;

  constructor() {
    makeObservable(this, {
      user: observable,
      token: observable,
      errors: observable,
      loading: observable,
      setUser: action,
      userProfile: action,
      setToken: action,
      login: action,
      register: action,
      logout: action,
      isLoggedIn: computed,
    });
  }

  setUser = (decodedToken) => {
    this.user = decodedToken;
  };

  setToken = (token) => {
    console.log(token);
    this.token = token;
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  login = async (userData, navigate) => {
    try {
      const { email, password } = userData;
      const res = await axios.post('https://api.beecrm.click/api/login', {
        email,
        password,
      });

      if (res.data.access_token) {
        this.setToken(res.data.access_token);
        this.userProfile();
        navigate('/ecommerce');
      } else {
        this.errors = "Email or Password doesn't match";
      }
    } catch (err) {
      console.log(err);
    }
  };

  register = async (userData, navigate) => {
    const { name, email, password, c_password } = userData;
    try {
      const res = await axios.post('https://api.beecrm.click/api/register', {
        name,
        email,
        password,
        c_password,
      });

      this.setUser(res.data.success.name);
      this.setToken(res.data.success.token);
      this.userProfile();
      navigate('/ecommerce');
    } catch (err) {
      console.log(err);
      console.error(err.response.data);
      this.errors = err.response.data;
    }
  };
  userProfile = async () => {
    try {
      const res = await axios.get('https://api.beecrm.click/api/user');
      this.setUser(res.data);
      console.log(res.data);
      // return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  logout = async (navigate) => {
    try {
      const res = await axios.post('https://api.beecrm.click/api/logout');

      if (res.status === 200) {
        this.user = null;
        this.token = null;
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  get isLoggedIn() {
    return !!this.user;
  }
  get getToken() {
    return this.token;
  }
  get getUser() {
    return this.user;
  }
}

const authStore = new AuthStore();

export default authStore;
