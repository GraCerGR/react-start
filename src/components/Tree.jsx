import React, { useState } from 'react';

const TreeComponent = () => {
  const [tree, setTree] = useState([]);

//-------------------------Создание папок с правильным путём--------------------------------

  const addFolder = (parentId) => {
    const childrenOfParent = tree.filter(folder => folder.id.startsWith(parentId + '.') && folder.id !== parentId && folder.id.split('.').length === parentId.split('.').length + 1);
    const lastChildIndex = childrenOfParent.length > 0 ? Math.max(...childrenOfParent.map(folder => parseInt(folder.id.split('.').pop(), 10))) : 0;
    const newFolder = {
      id: parentId === 'root' ? `${parentId}.${lastChildIndex + 1}` : `${parentId}.${lastChildIndex + 1}`,
      name: parentId === 'root' ? `${parentId}.${lastChildIndex + 1}` : `${parentId}.${lastChildIndex + 1}`
    };
    const updatedTree = [...tree, newFolder].sort((a, b) => {
        return a.id.localeCompare(b.id);
      });
  
      setTree(updatedTree);
    console.log(tree);
  };

//---------------------------------------------------------

  return (
    <div>
      <button onClick={() => addFolder('root')}>Добавить папку</button>
      {tree.map(folder => (
        <div key={folder.id}>
          <span>{folder.name}</span>
          <button onClick={() => addFolder(folder.id)}>Добавить подпапку</button>
          {folder.children && folder.children.map(child => (
            <div key={child.id}>
              <span>{child.name}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TreeComponent;