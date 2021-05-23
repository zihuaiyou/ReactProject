import { Nodes, defaultEquals } from './modules/linked-list-models.js';

class LinkedList {
    constructor(equalsFn = defaultEquals) {
        this.count = 0;
        this.head = undefined;
        this.equalsFn = equalsFn;
    }

    // 向链表尾部添加元素
    push(element) {
        //Nodes 链表内的节点,含有元素及对下一元素的引用
        const node = new Nodes(element);
        let current;
        if (this.head == null) this.head = node;
        else {
            current = this.head;
            //获取最后一项
            while (current.next != undefined) {
                current = current.next;
            }
            current.next = node;
        }
        this.count++;
    }

    //移除链表指定位置的元素
    removeAt(index) {
        //判断index是否合法
        if (index >= 0 && index < this.count) {
            let current = this.head;
            //移除第一项 
            if (index === 0) this.head = this.head.next;
            else {
                let previous;
                //移除中间项或最后一项
                for (let i = 0; i < index; i++) {
                    //循环至current(第index项),previous(第index-1项)
                    previous = current;
                    current = current.next;
                }
                //删除第index项(将第index项的下一项与第index-1项的下一项绑定起来;)
                previous.next = current.next;
            }
            this.count--;
        }
        return undefined;
    }
}

let linkedlist = new LinkedList();
linkedlist.push("qwe");
linkedlist.push("123");
linkedlist.removeAt(1);
console.log(linkedlist);
