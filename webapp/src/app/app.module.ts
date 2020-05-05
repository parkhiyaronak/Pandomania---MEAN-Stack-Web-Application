import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TokenInterceptor, ErrorInterceptor } from './services/token.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { NewsComponent } from './news/news.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { ListOfCountryComponent } from './home/list-of-country/list-of-country.component';
import { GraphOfCountryComponent } from './home/graph-of-country/graph-of-country.component';
import { OrderByPipe } from './shared/order-by.pipe';
import { FilterPipe } from './shared/filter.pipe';
import { LandingComponent } from './components/landing/landing.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RouterModule, CanActivate } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AuthEffects } from './store/effects/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { reducers } from './store/app.states';
import { StoreModule } from '@ngrx/store';
import { MapComponent } from './home/map/map.component';
import {HighchartsChartModule} from 'highcharts-angular';

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";

import { DonationsComponent } from './donations/donations.component';
import { DonationslandingComponent } from './donationslanding/donationslanding.component';
import {Donationsapi} from './services/donation.service';
import { DonationstableComponent } from './donationslanding/donationstable/donationstable.component';
import { SafetyTipsComponent } from './safety-tips/safety-tips.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChatbotComponent } from './chatbot/chatbot.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MenuComponent,
    NewsComponent,
    HomeComponent,
    ListOfCountryComponent,
    OrderByPipe,
    FilterPipe,
    LandingComponent,
    SignUpComponent,
    LogInComponent,
    GraphOfCountryComponent,
    MapComponent,
    DonationsComponent,
    DonationslandingComponent,
    DonationstableComponent,
    SafetyTipsComponent,
    ChatbotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects]),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HighchartsChartModule,
    RouterModule.forRoot([
      { path: 'log-in', component: LogInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'login/signup', component: LandingComponent },
      { path: '**', redirectTo: '/' }
    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    Donationsapi,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
