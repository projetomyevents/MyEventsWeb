export class CEP {
  constructor(public local: string, public distribution: string) {
  }
}

CEP.prototype.toString = function () {
  return this.local + this.distribution;
};
