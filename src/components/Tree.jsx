import React, { useState } from 'react';

const TreeComponent = () => {
    const initialTreeState = [];
    const initialRenamingFolderIdState = null;
    const initialNewFolderNameState = '';

    const [tree, setTree] = useState(initialTreeState); //  массив папок
    const [renamingFolderId, setRenamingFolderId] = useState(initialRenamingFolderIdState); // для переименования
    const [newFolderName, setNewFolderName] = useState(initialNewFolderNameState); // для переименования

    //-------------------------Создание папок с правильным путём--------------------------------

    const addFolder = (parentId) => {
        const childrenOfParent = tree.filter(folder => folder.id.startsWith(parentId + '.') && folder.id !== parentId && folder.id.split('.').length === parentId.split('.').length + 1);
        const lastChildIndex = childrenOfParent.length > 0 ? Math.max(...childrenOfParent.map(folder => parseInt(folder.id.split('.').pop(), 10))) : 0;
        const newFolder = {
            id: parentId === 'root' ? `${parentId}.${lastChildIndex + 1}` : `${parentId}.${lastChildIndex + 1}`,
            name: parentId === 'root' ? `${parentId}.${lastChildIndex + 1}` : `${parentId}.${lastChildIndex + 1}`
        };

        //----------------------Сортировка массива-----------------------------------
        const updatedTree = [...tree, newFolder].sort((a, b) => a.id.localeCompare(b.id));
        setTree(updatedTree);
    };

    //----------------------Удаление папки (и дочерних)-----------------------------------
    const deleteFolder = (folderId) => {
        const updatedTree = tree.filter(folder => !folder.id.startsWith(folderId));
        setTree(updatedTree);
    };

    //----------------------Переименование папки-----------------------------------
    const renameFolder = (folderId) => {
        setRenamingFolderId(folderId);
    };

    const fildRename = () => {
        const updatedTree = tree.map(folder => {
            if (folder.id === renamingFolderId) {
                return { ...folder, name: newFolderName };
            }
            return folder;
        });
        setTree(updatedTree);
        setRenamingFolderId(null);
        setNewFolderName('');
    };


    //----------------------Сброс до начального-----------------------------------
    const resetState = () => {
        setTree(initialTreeState);
        setRenamingFolderId(initialRenamingFolderIdState);
        setNewFolderName(initialNewFolderNameState);
    };

    //---------------------------------------------------------

    return (
        <div>
            <button onClick={() => addFolder('root')}>Add a folder</button>
            <button onClick={resetState}>Reset</button>
            {tree.map(folder => (
                <div key={folder.id}>
                    {renamingFolderId === folder.id ? (
                        <div>
                            <input
                                type="text"
                                value={newFolderName}
                                onChange={(e) => setNewFolderName(e.target.value)}
                            />
                            <button onClick={fildRename}>Сохранить</button>
                        </div>
                    ) : (
                        <div>
                            <span>{folder.name}</span>
                            <button onClick={() => addFolder(folder.id)}>Add a subfolder</button>
                            <button onClick={() => deleteFolder(folder.id)}>Delete</button>
                            <button onClick={() => renameFolder(folder.id)}>Rename</button>
                        </div>
                    )}
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