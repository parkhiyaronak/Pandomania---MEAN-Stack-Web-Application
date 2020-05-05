import { NgModule } from '@angular/core';
import { Routes, RouterModule,CanActivate } from '@angular/router';
import { NewsComponent } from './news/news.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import {GraphOfCountryComponent} from './home/graph-of-country/graph-of-country.component';
import { DonationslandingComponent } from './donationslanding/donationslanding.component';
import { DonationsComponent } from './donations/donations.component';
import {SafetyTipsComponent} from './safety-tips/safety-tips.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { ChatbotComponent } from './chatbot/chatbot.component';


const routes: Routes = [
  {path : 'news', component : NewsComponent},
  { path : 'home',
    component : HomeComponent,
    children: [
      {path: '', component: GraphOfCountryComponent}
    ]},
      {path : 'login/signup', component : LandingComponent},
      {path: 'donations', component:DonationslandingComponent},
      {path: 'newdonations', component:DonationsComponent},
      {path: 'safetytips', component : SafetyTipsComponent},
      {path: 'chatbot', component : ChatbotComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
