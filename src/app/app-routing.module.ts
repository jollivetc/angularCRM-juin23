import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationGuard } from './login/authentication.guard';
import { ConsumerListComponent } from './consumer/consumer-list/consumer-list.component';
import { ConsumerFicheComponent } from './consumer/consumer-fiche/consumer-fiche.component';

const routes: Routes = [

  {path:'login', component:LoginComponent},
  {path:'home', component:HomeComponent, canActivate:[AuthenticationGuard]},
  {path:'consumers', component:ConsumerListComponent, canActivate:[AuthenticationGuard]},
  {path:'consumers/new', component:ConsumerFicheComponent, canActivate:[AuthenticationGuard]},
  {path:'consumers/:id', component:ConsumerFicheComponent, canActivate:[AuthenticationGuard]},
  {path:'**', redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
