export default class Deque {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }
  //向对列尾部添加元素
  addBack(element) {
    this.items[this.count] = element;
    this.count++;
  }
  //向对列尾部添加元素
  addFont(element) {
    if (this.isEmpty()) this.addBack(element);
    else if (this.lowestCount > 0) {
      this.items[this.lowestCount - 1] = element;
      this.lowestCount--;
    } else {
      for (i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }
      this.items[0] = element;
      this.lowestCount = 0;
      this.count++;
    }
  }
  //删除对列头部元素
  removeFont() {
    if (this.isEmpty()) return undefined;
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }
  removeBack() {
    this.count--
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }
  //判断对列是否为空
  isEmpty() {
    return this.count - this.lowestCount === 0;
  }
  //返回对列中第一个元素
  peekFont() {
    return this.items[this.lowestCount];
  }
  peekBack() {
    return this.items[this.count - 1];
  }
  //返回对列包含的元素个数
  size() {
    return this.count - this.lowestCount;
  }
  //
  toString() {
    if (this.isEmpty()) return "";
    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
  //清空对列
  clear() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }
}

// let deque = new Deque();
// deque.addBack("hello");
// deque.addBack("world");
// deque.addBack("Jack");
// deque.removeFont();
// deque.addFont("Bob");
// deque.removeBack();
// console.log(deque.toString());
// console.log(deque.size());
