export class OrderModel {
    constructor(oCode, date, cusId, cusName, tot, subTot, discount, cash, balance){
        this.oCode = oCode;
        this.date = date;
        this.cusId = cusId;
        this.cusName = cusName;
        this.tot = tot;
        this.subTot = subTot;
        this.discount = discount;
        this.cash = cash;
        this.balance = balance;
    }
}
