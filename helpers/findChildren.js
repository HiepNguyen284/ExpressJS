const findChildren = (records, parent_id) => {
  let tree = [];

  records.forEach(record => {
    if(record.parent_id === parent_id) {
      const parent = record;
      const child = findChildren(records, parent.id);
      if(child.length > 0) {
        parent.children = child;
      }
      tree.push(parent);
    }
  })

  return tree;
}

module.exports = findChildren;