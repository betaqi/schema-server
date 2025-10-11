const tree = [
  {
    id: 1,
    children: [
      {
        id: 2,
        children: [
          {
            id: 6
          },
          {
            id: 7
          }
        ]
      },
      { id: 3, children: [] },
      { id: 4, children: [] },


    ]
  },
  {
    id: 11,
    children: [
      { id: 22, children: [{ id: 333 }, { id: 44 }] }
    ]
  }
]

function find(tree, id) {
  for (const item of tree) {
    if (item.id === id) {
      return item
    }
    if (item.children) {
     return  find(item.children, id)
    }
  }
}

console.log(find(tree, 44));
