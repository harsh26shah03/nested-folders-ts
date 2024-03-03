import { useState } from 'react'
import data from '../api/data.json'
import { useReducer } from 'react'
import FileExplorer from './FileExplorer'
import ContextMenu from './ContextMenu'
import Notification from './Notification'
import { FolderData } from '../type'

type FileManagerState = {
  openedFile: string | null
  contextMenuOpen: boolean
  contextMenuPosition: { x: number; y: number }
  contextMenuDestination: string
  contextMenuType: string
  contextMenuNotification: boolean
}

export type FileManagerAction = {
  type: string
  payload?: FileManagerActionPayload | string | boolean | null
}

type FileManagerActionPayload = {
  open: boolean
  position: { x: number; y: number }
  destination: string
}

const FileManager = () => {
  // We can use conventional fetch instead of import when actual API is available
  const [files] = useState(data)

  // Using reducer to manage state of opened file so we don't have to do prop drilling

  const reducer = 
    (state: FileManagerState, action: FileManagerAction):FileManagerState => {
      switch (action.type) {
        case 'openFile':
          return { ...state, openedFile: action.payload as string }
        case 'contextMenuOpen':
          return {
            ...state,
            contextMenuOpen: (action?.payload as FileManagerActionPayload)?.open,
            contextMenuPosition: (action?.payload as FileManagerActionPayload)?.position,
            contextMenuDestination: (action?.payload as FileManagerActionPayload)?.destination
          }
        case 'contextMenuClose':
          return {
            ...state,
            contextMenuOpen: false,
            contextMenuPosition: { x: 0, y: 0 }
          }
        case 'contextMenuType':
          return { ...state, contextMenuType: action?.payload as string }
        case 'contextMenuTypeClear':
          return { ...state, contextMenuType: '' }
        case 'contextMenuDestination':
          return { ...state, contextMenuDestination: action?.payload as string }
        case 'contextMenuDestinationClear':
          return { ...state, contextMenuDestination: '' }
        case 'contextMenuNotification':
          return { ...state, contextMenuNotification: action?.payload as boolean }
        default:
          return state
      }
    }
  
  const [state, dispatch] = useReducer(
    reducer,
    {
      openedFile: null,
      contextMenuOpen: false,
      contextMenuPosition: { x: 0, y: 0 },
      contextMenuDestination: '',
      contextMenuType: '',
      contextMenuNotification: false
    }
  )

  return (
    <div
      style={{ display: 'flex', width: '100%', gap: 20, position: 'relative' }}
      onClick={() => {
        dispatch({ type: 'contextMenuClose' })
      }}
    >
      {/* Inflection point of recursion, starting point, it can be file or folder */}
      <ContextMenu
        position={state.contextMenuPosition}
        folder={state.contextMenuDestination}
        dispatch={dispatch}
        open={state.contextMenuOpen}
      />
      <Notification
        open={state.contextMenuNotification}
        destination={state.contextMenuDestination}
        type={state.contextMenuType}
      />
      <div
        style={{
          width: '20%',
          display: 'flex',
          flexDirection: 'column',
          gap: 20
        }}
      >
        <FileExplorer dispatch={dispatch} files={files as FolderData} />
      </div>

      {/* Preview of file opened. */}
      {state?.openedFile ? (
        <div
          style={{
            width: '80%',
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'center',
            flexDirection: 'column',
            margin: 30,
            height: '100%',
            marginTop: 0
          }}
        >
          <h4
            style={{
              margin: 0
            }}
          >
            {state?.openedFile}
          </h4>
          <div
            style={{
              height: '200px',
              width: 'calc(100% - 20px)',
              border: '1px solid white',
              borderRadius: 5,
              margin: 30,
              flexGrow: 1
            }}
          >
            {}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default FileManager
