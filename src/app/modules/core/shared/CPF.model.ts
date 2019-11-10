export class CPF {
  constructor(public group1: string, public group2: string, public group3: string, public cv: string) {
  }
}

CPF.prototype.toString = function() {
  return this.group1 + this.group2 + this.group3 + this.cv;
};
