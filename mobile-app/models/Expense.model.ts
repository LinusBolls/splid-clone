import uuid from 'react-native-uuid';

// profiteers
// payer

export default class Expense {
  readonly id: string;

  private parent?: Expense;

  private title: string;

  private children: Expense[];

  private amount: number;

  constructor() {
    this.children = [];

    this.title = '';

    this.amount = 0;

    this.id = uuid.v4();
  }
  static deserialize(json: unknown) {}

  serialize(): unknown {
    return {};
  }
  getAmount(): number {
    if (this.children.length) {
      const sumOfChildren = this.children.reduce(
        (sum, i) => sum + (i.getAmount() ?? 0),
        0
      );

      return sumOfChildren;
    }
    return this.amount;
  }
  setAmount(amount: number) {
    this.amount = amount;
  }
  getTitle() {
    return this.title;
  }
  setTitle(value: string) {
    this.title = value;
  }
  getChildren() {
    return this.children;
  }
  addChild(child: Expense) {
    child.setParent(this);

    this.children.push(child);

    return child;
  }
  removeChild(child: Expense) {
    this.children = this.children.filter((i) => i.id !== child.id);
  }
  setParent(parent: Expense) {
    this.parent = parent;
  }
  getPercentage(): number {
    if (!this.parent) return 100;

    return 100 / (this.parent.getAmount() / this.getAmount());
  }
}
