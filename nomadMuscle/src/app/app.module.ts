import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TestService } from './test.service';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterUSerComponent } from './register-user/register-user.component';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: '', component: HomeComponent},
  {path: 'connexion', component: LoginComponent},
  {path: 'inscription', component:RegisterUSerComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterUSerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [TestService],
  bootstrap: [AppComponent]
})


export class AppModule { }


