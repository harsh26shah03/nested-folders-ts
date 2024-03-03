import { FileManagerAction } from "./FileManager";

type ContextMenuProps = {
  position: { x: number; y: number }
  folder: string
  dispatch: React.Dispatch<FileManagerAction>
  open: boolean
}

const ContextMenu = ({ position, folder, dispatch, open }:ContextMenuProps) => {
  const handleClick = (e:React.MouseEvent<HTMLDivElement, MouseEvent>, event:string) => {
    e.preventDefault()
    dispatch({ type: 'contextMenuClose' })
    dispatch({ type: 'contextMenuType', payload: event })
    dispatch({ type: 'contextMenuDestination', payload: folder })
    setTimeout(() => {
      dispatch({ type: 'contextMenuNotification', payload: true })
      setTimeout(() => {
        dispatch({ type: 'contextMenuNotification', payload: false })
      }, 2000)
    }, 100)
  }

  return open ? (
    <div
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        background: 'white',
        border: '1px solid black',
        color: 'black'
      }}
      className="context-menu"
    >
      <div onClick={(e) => handleClick(e, 'cut')} className="context-menu-item">
        Cut
      </div>
      <div
        onClick={(e) => handleClick(e, 'copy')}
        className="context-menu-item"
      >
        Copy
      </div>
      <div
        onClick={(e) => handleClick(e, 'rename')}
        className="context-menu-item"
      >
        Rename
      </div>
      <div
        onClick={(e) => handleClick(e, 'delete')}
        className="context-menu-item"
      >
        Delete
      </div>
    </div>
  ) : null
}

export default ContextMenu
