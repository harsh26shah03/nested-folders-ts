import FileManager from './components/FileManager'

function App() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%'
      }}
    >
      <h4 style={{ marginLeft: 20 }}>File Manager</h4>
      {/* Main Component from where entire structure is rendered. */}
      <FileManager/>
    </div>
  )
}

export default App
