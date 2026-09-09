import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = false;
  errorMessage = '';

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  onSubmit(): void {

    // 1. Validar formulario
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    // 2. Obtener los datos del formulario
    const credentials = this.loginForm.getRawValue();

    // 3. Consumir API
    this.authService.login(credentials).subscribe({
      next: (response) => {

        console.log('Login exitoso:', response);

        // 4. Obtener el usuario
        const user = response.user;

        // 5. Redireccionar según el rol
        switch (user.role) {

          case 'admin':
            this.router.navigate(['/admin']);
            break;

          case 'agent':
            this.router.navigate(['/agent']);
            break;

          case 'client':
            this.router.navigate(['/client']);
            break;

          default:
            this.errorMessage = 'Rol de usuario no válido.';
        }

        this.loading = false;
      },

      error: (error) => {

        console.error('Error de login:', error);

        this.loading = false;

        if (error.status === 401) {
          this.errorMessage = 'Correo o contraseña incorrectos.';
        } else {
          this.errorMessage = 'Ocurrió un error al iniciar sesión.';
        }
      }
    });
  }

}
