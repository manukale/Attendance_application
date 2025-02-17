import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() title : string = ''
  @Output() closed = new EventEmitter<void>()
  
  close(){
    this.closed.emit()
  }
}
