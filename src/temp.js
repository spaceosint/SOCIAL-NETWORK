let a={
    name: 'test',
    test: ['1', '2', '3'],
    classroom: {
        name: 'name',
        age: 19,
    }
}

let b ={...a}

b.name = ['hi']
b.classroom.name ='Fname'

console.log(a, b)