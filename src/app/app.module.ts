/**Modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { appRoutes } from './app.router';

/**Components */
import { AppComponent } from './app.component';
import { ErrorComponent } from './error-component/error-component.component';

/** Services */
import { ServicFactoryService } from './service/servic-factory.service';
import { CustomerRepresentativePortalComponent } from './customer-representative-portal/customer-representative-portal.component';




@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    CustomerRepresentativePortalComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ServicFactoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
