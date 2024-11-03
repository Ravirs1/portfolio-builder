import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth-service/auth.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  authForm: FormGroup;
  isLoginMode = true;

  constructor(private fb: FormBuilder, private authService : AuthService) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''] // Only required for signup
    });
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    if (this.isLoginMode) {
      this.authForm.removeControl('confirmPassword');
    } else {
      this.authForm.addControl(
        'confirmPassword',
        this.fb.control('', [Validators.required, Validators.minLength(6)])
      );
    }
  }

  onSubmit(e: any) {
    if (this.authForm.invalid) return;
    
    if (this.isLoginMode) {
      console.log('Login:', this.authForm.value);
      // Login logic
      this.signInWithEmail(e);
    } else {
      console.log('Signup:', this.authForm.value);
      // Signup logic
      this.signUpWithEmail(e);
    }
  }

  onGoogleSignIn() {
    console.log('Google Sign-In initiated');
    // Implement Google sign-in logic here
  }

  signUpWithEmail(e:any) {
    e.preventDefault();
  this.authService.signUpWithEmail();
}

// Example of logging in
signInWithEmail(e:any) {
  e.preventDefault();
this.authService.signInWithEmail(this.authForm.value.email, this.authForm.value.password);
}


// Example of logging out
logout() {
this.authService.logout();
}

forgotPassword(email:string) {
  this.authService.forgotPassword('email');
}


}
