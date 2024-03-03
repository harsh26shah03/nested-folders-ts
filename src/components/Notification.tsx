type NotificationProps = {
  open: boolean
  type: string
  destination: string
}

const Notification = ({ open, type, destination }: NotificationProps) => {
  return open ? (
    <div className="notification">
      {destination} {type}
    </div>
  ) : null
}

export default Notification
