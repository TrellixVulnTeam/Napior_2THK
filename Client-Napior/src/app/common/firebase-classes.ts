export interface UserI {
    companyId: number,
    email: string,
    name: string,
    signedIn: boolean,
}

export class UserInfo implements UserI {
    constructor(
        public companyId: number,
        public email: string,
        public name: string,
        public signedIn: boolean,
        public created: number
    ){
        this.companyId = companyId;
        this.email = email;
        this.name = name;
        this.signedIn = signedIn;
        this.created = created;
    }
}

export class CompanyInfo {
    constructor(
        public name: string,
        public trialLength: number,
        public seats: number,
        public stripeId: string,
        public stripeSubscriptionId: string,
        public plan:string,
        public subscriptionFee: number,
        public paid: boolean,
        public lastBilled: number,
        public nextBill: number,
    ){}
}