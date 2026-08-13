import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth_token';

/**
 * Frontend-only auth state for now.
 *
 * NOTE: This is a temporary stand-in until the Spring Boot backend
 * issues real JWTs. Once that exists, `login()` should be called with
 * the token returned by POST /api/auth/login, and every protected
 * HTTP call should send it via an HTTP interceptor (Authorization: Bearer <token>).
 * The backend must still validate the token on every protected
 * endpoint — this guard only controls what the Angular router shows;
 * it is not a substitute for backend authorization.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
}
