import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionService } from './session.service';
import { UserDto } from '../../interfaces/user-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private apiUrl = `${environment.baseUrl}/api/Authentication`; // Replace with your API URL

  constructor(
    private http: HttpClient,
    private router: Router,
    private sessionService: SessionService
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(this.getUserFromCookie());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
  register(registrationData: UserDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Register`, registrationData);
  }
  // login(email: string, password: string): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/Login`, { email, password }, { observe: 'response' })
  //     .pipe(
  //       map((response: { body: any; }) => {
  //         const user = response.body;
  //         if (user && user.token) {
  //           this.setTokenCookie(user);
  //           this.sessionService.getCurrentUser().subscribe({
  //             next: (user) => console.log('Current user:', user),
  //             error: (error) => console.error('Error fetching current user:', error)
  //           });
  //           this.currentUserSubject.next(user);
  //         }
  //         return user;
  //       }),
  //       catchError(error => {
  //         console.error('Login error:', error);
  //         if (error.status === 400) {
  //           console.error('Bad Request. Payload:', { email, password });
  //           console.error('Response:', error.error);
  //         }
  //         return throwError(() => new Error(error.error?.message || 'Login failed'));
  //       })
  //     );
  // }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Login`, { email, password }, { observe: 'response' })
      .pipe(
        map((response: { body: any; }) => {
          const user = response.body;
          if (user && user.token) {
            this.setTokenCookie(user);
            this.sessionService.getCurrentUser().subscribe({
              next: (user) => console.log('Current user:', user),
              error: (error) => console.error('Error fetching current user:', error)
            });
            this.currentUserSubject.next(user);
          }
          return user;
        }),
        catchError(error => {
          console.error('Login error:', error);
          if (error.status === 400) {
            console.error('Bad Request. Payload:', { email, password });
            console.error('Response:', error.error);
          }
          return throwError(() => new Error(error.error?.message || 'Login failed'));
        })
      );
  }
  

  logout(): void {
    this.removeTokenCookie();
    this.currentUserSubject.next(null);
    this.sessionService.clearSession();
    this.router.navigate(['/account/login']);
  }

  // resetPassword(resetPassword: ResetPassword): Observable<any> {
  //   const headers = this.getHttpOptions();
    
  //   // Ensure we have a userId
  //   if (!resetPassword.userId) {
  //     return throwError(() => new Error('User ID is required'));
  //   }
  
  //   // Set the token from cookie
  //   resetPassword.token = this.getTokenFromCookie() || '';
    
  //   // Ensure we have a token
  //   if (!resetPassword.token) {
  //     return throwError(() => new Error('Authentication token is required'));
  //   }
  
  //   return this.http
  //     .post<any>(
  //       `${this.apiUrl}/ResetPassword`,
  //       resetPassword,
  //       headers
  //     )
  //     .pipe(
  //       catchError(error => {
  //         console.error('Reset password error:', error);
          
  //         if (error.error?.errors?.Token) {
  //           this.logout(); // Force logout on token error
  //           return throwError(() => new Error('Authentication required. Please login again.'));
  //         }
          
  //         if (error.error?.errors) {
  //           const errorMessage = Object.values(error.error.errors)
  //             .flat()
  //             .join(', ');
  //           return throwError(() => new Error(errorMessage));
  //         }
          
  //         return throwError(() => new Error(error.error?.message || 'Failed to reset password'));
  //       })
  //     );
  // }
  
  private getHttpOptions() {
    const token = this.getTokenFromCookie();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }
  // Method for AuthGuard
  isAuthenticated(): boolean {
    const currentUser = this.currentUserValue;
    if (currentUser && currentUser.token) {
      // You might want to add token expiration check here
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }


  handleAuthenticationRedirect(): void {
    this.router.navigate(['/account/login']);
  }

  handleLoginRedirect(): void {
    this.router.navigate(['/coupon-history']); 
  }

  private setTokenCookie(user: any): void {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    document.cookie = `dentistAuth_token=${user.token}; expires=${expirationDate.toUTCString()}; userName=${user.userName}; path=/; SameSite=Strict; Secure`;
  }

  private removeTokenCookie(): void {
    document.cookie = 'dentistAuth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; Secure';
  }

  private getUserFromCookie(): any {
    const token = this.getTokenFromCookie();
    if (token) {
      return { token };
    }
    return null;
  }

   getTokenFromCookie(): string | null {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'dentistAuth_token') {
        return value;
      }
    }
    return null;
  }
}
