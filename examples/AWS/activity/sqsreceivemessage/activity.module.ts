import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SQSReceiveMessageActivityContributionHandler} from "./activity";
import { WiServiceContribution} from "wi-studio/app/contrib/wi-contrib";
 
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ],
  providers: [
    {
       provide: WiServiceContribution,
       useClass: SQSReceiveMessageActivityContributionHandler
     }
  ]
})
 
export default class ConcatActivityModule {
 
}
