import Queue from './队列.js'
function hotPotato(elementList, num) {
    const queue = new Queue();
    const elimitatedList = [];

    for (let i = 0; i < elementList.length; i++) {
        queue.enqueue(elementList[i]);
    }
    
    while (queue.size() > 1) {
        for (let j = 0; j < num; j++) {
            queue.enqueue(queue.dequeue());
        }
        elimitatedList.push(queue.dequeue())
    }

    return { 
        elimitated: elimitatedList,
        winner: queue.dequeue()
    }
}

const names = ["Jack", "Bob", "Tomas", "yang", "Lucy"]
let result = hotPotato(names, 7);
console.log(result);

result.elimitated.forEach(element => {
    console.log(`${element}被淘汰了`);
});

console.log(`获胜者是${result.winner}`);