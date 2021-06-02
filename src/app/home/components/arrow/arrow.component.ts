import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-arrow',
  templateUrl: './arrow.component.html',
  styleUrls: ['./arrow.component.css']
})
export class ArrowComponent {
  _arrowVisible: boolean;
  _arrowType: string;

  @Input() set arrowVisible(visible: boolean) {
    this._arrowVisible = visible;
  }
  @Input() set arrowType(type: string) {
    this._arrowType = type;
  }

  @Output() changeTypeEmmiter = new EventEmitter<string>();

  constructor() { }

  changeOrderType() {
    this._arrowType = this._arrowType === 'ASC' ? 'DESC' : 'ASC';
    this.changeTypeEmmiter.emit(this._arrowType);
  }
}
