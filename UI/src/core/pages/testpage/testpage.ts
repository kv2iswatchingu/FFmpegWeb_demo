import { Component } from '@angular/core';
import { Button } from '../../components/button/button';
import { Dialog } from '../../components/dialog/dialog';


@Component({
  selector: 'testpage',
  imports: [Button, Dialog],
  templateUrl: './testpage.html',
  styleUrl: './testpage.scss'
})
export class Testpage {
  onClose(){
    console.log('Dialog closed');
  }
  onConfirm(){
    console.log('Dialog confirmed');
  }

  
}
