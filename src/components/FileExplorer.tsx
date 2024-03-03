import Folder from './Folder'
import File from './File'

const FileExplorer = 
  ({dispatch, files}) => {
    if (files.type === 'file') {
      return <File name={files.name} dispatch={dispatch} />
    } else if (files.type === 'folder') {
      return <Folder data={files.data} name={files.name} dispatch={dispatch} />
    }
}

export default FileExplorer