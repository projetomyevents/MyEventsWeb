export class Phone {
  constructor(public area: string, public exchange: string, public subscriber: string) {
  }
}

Phone.prototype.toString = function () {
  return this.area + this.exchange + this.subscriber;
};
