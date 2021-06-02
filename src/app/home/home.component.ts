import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeService } from './services/home.service';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  dataSource: CustomStore;

  constructor(homeService: HomeService) {
    // Create form search
    this.dataSource = new CustomStore({
      key: 'ProductID',
      load: function (loadOptions: any) {
        return homeService.loadClients(loadOptions);
      }
    });
  }

}
