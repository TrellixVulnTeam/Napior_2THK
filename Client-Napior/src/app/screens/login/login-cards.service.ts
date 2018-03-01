import { Injectable } from '@angular/core';

@Injectable()
export class LoginCardsService {
    
    public currentCard:string ;

  constructor() {
      this.currentCard = 'login';
  }
  
  createAccountCard() {
    this.currentCard = 'createAccount';

  }

  loginCard() {
    this.currentCard = 'login';
  }

}
