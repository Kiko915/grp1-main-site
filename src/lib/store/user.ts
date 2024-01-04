import { writable } from "svelte/store";
import { browser } from "$app/environment";

// Try to get the auth state from localStorage
const storedAuth = browser ? localStorage.getItem('auth') : null;
const initialAuth = storedAuth ? JSON.parse(storedAuth) : { user: null, isAuthenticated: false };

// Create a writable store with the initial state
const auth = writable(initialAuth);

// Subscribe to changes and store in localStorage if available
auth.subscribe(($auth) => {
  if (browser) {
    localStorage.setItem('auth', JSON.stringify($auth));
  }
});
export default auth;