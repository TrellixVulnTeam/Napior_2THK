export class UsgsData {
        public latitude: number;
        public longitude: number;
        public ss:number;
        public s1:number;
        public fa:number;
        public fv:number;
        public sds:number;
        public sd1:number;
        public isLoading: boolean;

        constructor(
            Latitude: number,
            Longitude: number,
            Ss: number,
            S1: number,
            Fa: number,
            Fv: number,
            Sds: number,
            Sd1: number,
            IsLoading: boolean
        ){
            this.latitude = Latitude;
            this.longitude = Longitude;
            this.ss = Ss;
            this.s1 = S1;
            this.fa = Fa;
            this.fv = Fv;
            this.sds = Sds;
            this.sd1 = Sd1;
            this.isLoading = IsLoading;
        }
}