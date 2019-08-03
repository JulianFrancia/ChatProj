import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./components/login/login.component";
import { ErrorComponent } from "./components/error/error.component";

const appRoutes: Routes = [
  { path: "", component: LoginComponent },
  { path: "**", component: ErrorComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
