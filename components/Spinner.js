import { RefreshIcon } from '@heroicons/react/outline'

export default function Spinner(props) {
  return (
    <div className="flex flex-row items-center space-x-4">
      <RefreshIcon className="h-5 w-5 animate-spin" />
      <div>{props.text}</div>
    </div>
  )
}
