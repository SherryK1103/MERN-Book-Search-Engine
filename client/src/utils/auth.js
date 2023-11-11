// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    return decode(this.getToken());
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    // Authorization header for GraphQL requests
    // this.setAuthHeader(idToken);
    window.location.assign('/');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // Remove authorization header for GraphQL requests
    // this.removeAuthHeadder();
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }


  // Set authorization header for Graph QL requests
  // setAuthHeader(token) {
  //   const headers = new Headers();
  //   headers.append('Authorization', `Bearer ${token}`);
  //   // set headers globally for all requests
  //   fetchOptions.headers = headers;
  // }


  // // remove the authorization header for GraphQL requests
  // removeAuthHeadder() {
  //   // remove authorzatio header
  //   fetchOptions.headers.delete('Authorization');
  // }
}

export default new AuthService();
