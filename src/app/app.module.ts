import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbComponent } from './navb/navb.component';
import { UsersessionComponent } from './usersession/usersession.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { NewproductComponent } from './newproduct/newproduct.component';
import {RouterModule, Routes} from '@angular/router';
import { LogComponent } from './log/log.component';
import { UserComponent } from './user/user.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AddUserComponent } from './add-user/add-user.component';
import {UseGuardService} from "./use-guard.service";
import { InfosComponent } from './infos/infos.component';
import { OneprodviewComponent } from './oneprodview/oneprodview.component';
import {QrCodeModule} from "ng-qrcode";
import { PoseurListComponent } from './poseur-list/poseur-list.component';
import { VitreurListComponent } from './vitreur-list/vitreur-list.component';
import { ProjetsListComponent } from './projets-list/projets-list.component';
import { VitragesListComponent } from './vitrages-list/vitrages-list.component';

import { AluListComponent } from './alu-list/alu-list.component';
import { PVviewComponent } from './pvview/pvview.component';
import { AVviewComponent } from './avview/avview.component';
import { PrintComponent } from './print/print.component';
import {NgxPrintModule} from "ngx-print";
import {QRCodeModule} from "angularx-qrcode";
import { SproductComponent } from './sproduct/sproduct.component';
import { AssembComponent } from './assemb/assemb.component';



const AppRoutes: Routes = [
  {path : '' , redirectTo: '/Home', pathMatch: 'full'},

  {path : 'Home' ,canActivate:[UseGuardService], component : HomeComponent},
  {path : 'Log' , component : LogComponent},
  {path : 'Products',canActivate:[UseGuardService] , component : ProductsListComponent},
  {path : 'User' ,canActivate:[UseGuardService] , component : UserComponent},
  {path : 'Add' , component : AddUserComponent},
  {path : 'Vitreurs' ,canActivate:[UseGuardService], component : VitreurListComponent},
  {path : 'Vitrages' ,canActivate:[UseGuardService], component : VitragesListComponent},
  {path : 'Assembleurs' ,canActivate:[UseGuardService], component : AssembComponent},
  {path : 'Poseurs' ,canActivate:[UseGuardService], component : PoseurListComponent},
  {path : 'Aluminium' ,canActivate:[UseGuardService], component : AluListComponent},
  {path : 'Projets',canActivate:[UseGuardService] , component : ProjetsListComponent},
  {path : 'Pos-Vitr' ,canActivate:[UseGuardService], component : PVviewComponent},
  {path : 'Alu-Vitr' ,canActivate:[UseGuardService], component : AVviewComponent},
  {path : 'product/:id' , component : OneprodviewComponent},
  {path : 'print/:id' ,canActivate:[UseGuardService], component : PrintComponent},
  {path : 'Sous-Produits' ,canActivate:[UseGuardService], component : SproductComponent},
  {path:"**",redirectTo : '/Home'}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbComponent,
    UsersessionComponent,
    ProductsListComponent,
    NewproductComponent,
    LogComponent,
    UserComponent,
    AddUserComponent,
    InfosComponent,
    OneprodviewComponent,
    PoseurListComponent,
    VitreurListComponent,
    ProjetsListComponent,
    VitragesListComponent,
    AluListComponent,

    PVviewComponent,
    AVviewComponent,
    PrintComponent,
    SproductComponent,
    AssembComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    QrCodeModule,
    NgxPrintModule,
    QRCodeModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
