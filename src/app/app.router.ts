import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error-component/error-component.component';
import { CustomerRepresentativePortalComponent } from './customer-representative-portal/customer-representative-portal.component';

export const appRoutes: Routes = [
    { path: 'representativePortal', component: CustomerRepresentativePortalComponent},
    { path: '',
      redirectTo: '/representativePortal',
      pathMatch: 'full'
    },{
      path : '404', component : ErrorComponent
    },
    {path: '**', redirectTo: '/404'}    
  ];

  