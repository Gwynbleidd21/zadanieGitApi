import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductComponent } from './product/product.component';
import { UserDetailsComponent } from './user-details/user-details.component';


const appRoutes: Routes = [
  {
    path: 'users',
    component: ProductComponent,
    data: { title: 'Product List' }
  },
  {
    path: 'user-details/:name',
    component: UserDetailsComponent,
    data: { title : 'das'}
  },
  { path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  }

];

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    UserDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserModule,
    MatGridListModule,
    MatCardModule,
    MatTableModule,
    HttpClientModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
