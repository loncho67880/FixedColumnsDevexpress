import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-column-header',
  templateUrl: './columnHeader.component.html',
  styleUrls: ['./columnHeader.component.css']
})
export class ColumnHeaderComponent {
  columnVisible: boolean;
  columnType: string;
  columnName = '';
  columnTooltip: string;
  columnTranslate = '';
  @Input() set columnTooltipSet(name: string) {
    this.columnTooltip = name;
  }
  @Input() set columnNameSet(name: string) {
    this.columnName = name;
    this.translate.get('homepage.table.' + this.columnName).subscribe(text => {
      this.columnTranslate = text;
    });
  }
  @Input() set columnVisivisbleSet(visible: boolean) {
    this.columnVisible = visible;
  }
  @Input() set columnTypeSet(type: string) {
    this.columnType = type;
  }

  @Output() changeVisibleColumnOrderEmmiter = new EventEmitter<string>();
  @Output() changeTypeEmmiter = new EventEmitter<string>();
  @Output() clickFilterEmmiter = new EventEmitter<string>();

  listFilter: {
    'filter 1',
    'filter 2',
    'filter 3',
    'filter 4'
  };

  filterSelected: string;

  constructor(private translate: TranslateService) {
  }

  changeOrderType() {
    this.columnType = this.columnType === 'ASC' ? 'DESC' : 'ASC';
    this.changeTypeEmmiter.emit(this.columnType);
  }

  clickFilter(columnName: string) {
    this.clickFilterEmmiter.emit(columnName);
  }

  changeVisibleColumnOrder(columnName: string) {
    this.changeVisibleColumnOrderEmmiter.emit(columnName);
  }
}
