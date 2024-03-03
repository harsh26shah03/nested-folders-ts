import Folder from './Folder'
import File from './File'
import { FileManagerAction } from './FileManager'
import { FolderData } from '../type'

type FileExplorerProps = {
  dispatch: React.Dispatch<FileManagerAction>
  files: FolderData
}

const FileExplorer = 
  ({dispatch, files}:FileExplorerProps) => {
    if (files.type === 'file') {
      return <File name={files.name} dispatch={dispatch} />
    } else if (files.type === 'folder') {
      return <Folder data={files.data} name={files.name} dispatch={dispatch} />
    }
}

export default FileExplorer