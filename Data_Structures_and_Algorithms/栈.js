class Stack {
  constructor() {
    this.count = 0;
    this.items = {};
  }
  //向栈尾部添加元素
  push(element) {
    this.items[this.count] = element;
    this.count++;
  }
  //删除栈顶元素
  pop() {
    if (this.isEmpty()) return undefined;
    delete this.items[this.count - 1];
    this.count--;
  }
  //判断栈是否为空
  isEmpty() {
    return this.count === 0;
  }
  //返回栈顶元素
  peek() {
    return this.items[this.count - 1];
  }
  //返回对列包含的元素个数
  size() {
    return this.count;
  }
  //
  toString() {
    if (this.isEmpty()) return "";
    let objString = `${this.items[0]}`;
    for (let i = 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
  //清空对列
  clear() {
    this.count = 0;
    this.items = {};
  }
}

let stack = new Stack();
stack.push("hello");
stack.push("world");
stack.push("everyone")
stack.pop();
console.log(stack.toString());
console.log(stack.size());
