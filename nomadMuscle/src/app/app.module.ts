import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TestService } from './test.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterUSerComponent } from './register-user/register-user.component';
import { RegisterRoomComponent } from './register-room/register-room.component';
import { MyRoomComponent } from './my-room/my-room.component';
import { FindRoomComponent } from './find-room/find-room.component';
import { MyTransactionComponent } from './my-transaction/my-transaction.component';
import { MyAccountComponent } from './my-account/my-account.component';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'connexion', component: LoginComponent},
  {path: 'inscription', component:RegisterUSerComponent},
  {path: 'login', component: LoginComponent},
  {path: 'enregistrer-salle', component: RegisterRoomComponent},
  {path: 'mes-salles', component: MyRoomComponent},
  {path: 'trouver-une-salle', component: FindRoomComponent},
  {path: 'transactions', component: MyTransactionComponent},
  {path: 'mon-compte', component: MyAccountComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterUSerComponent,
    RegisterRoomComponent,
    MyRoomComponent,
    FindRoomComponent,
    MyTransactionComponent,
    MyAccountComponent
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


