export default class Queue {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }
  //向对列尾部添加元素
  enqueue(element) {
    this.items[this.count] = element;
    this.count++;
  }
  //删除对列头部元素
  dequeue() {
    if (this.isEmpty()) return undefined;
    let result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }
  //判断对列是否为空
  isEmpty() {
    return this.count - this.lowestCount === 0;
  }
  //返回对列中第一个元素
  peek() {
    return this.items[this.lowestCount];
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


// let queue = new Queue();
// queue.enqueue("hello");
// queue.enqueue("world");
// queue.dequeue();
// queue.enqueue("everyone");
// console.log(queue.toString());
// console.log(queue.size());


