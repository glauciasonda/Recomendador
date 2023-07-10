export  class Graph {

    constructor() {
        this.adjList = []
    } 

    addNode(node){
        if (this.adjList.indexOf(node) === -1){
            this.adjList.push(node)
        }
    }

    addEdge(node1, node2){
        const indexNode1 = this.adjList.indexOf(node1)
        const indexNode2 = this.adjList.indexOf(node2)
        this.adjList[indexNode1].relationship.push(node2.person.cpf)
        this.adjList[indexNode2].relationship.push(node1.person.cpf)
    }

    clear(){
        while (this.adjList.length > 0){
            this.adjList.pop()
        }
    }

    findRelationship(cpf){
        let i = 0;
        let isNode = false 
        let friends = []
        let network = []

        while (i < this.adjList.length && !isNode){
            if (this.adjList[i].person.cpf === cpf){
               friends = [...this.adjList[i].relationship] 
                isNode = true
            } else {
                i++
            }
        }
        for (i=0; i < this.adjList.length; i++){
            for(let j=0; j < friends.length; j++ ){
                if(this.adjList[i].person.cpf === friends[j]) {
                    network = network.concat(this.adjList[i].relationship)
                }
            }
        }
        return (network.filter((element) => element !== cpf))
    }
}