import PuzzleSetSettings from './PuzzleSetSettings'

export default function SetListItem(props) {
  let set = props.set.set
  return (
    <div className="p-2 rounded-lg my-2 bg-dark text-light">
      <div className="flex flex-row justify-between">
        <p className="text-lg font-bold">
          {set.setName} - {set.rounds.length}/8
        </p>
        <p>
          <PuzzleSetSettings
            setId={props.set.id}
            updateList={props.updateList}
          />
        </p>
      </div>
      <p>
        Finished {set.rounds[set.rounds.length - 1].completed} of {set.setSize}{' '}
        puzzles (
        {percentOf(
          set.rounds[set.rounds.length - 1].correct,
          set.rounds[set.rounds.length - 1].completed
        )}{' '}
        Accuracy)
      </p>
      <p>
        Round Time: {secondsToTime(set.rounds[set.rounds.length - 1].timeSpent)}
      </p>
      <div className="flex flex-row justify-between">
        <button
          onClick={props.onSelect}
          className="py-2 px-4 rounded bg-accent-dark hover:bg-accent-light text-dark font-bold"
        >
          Train Set
        </button>
      </div>
    </div>
  )
}

function secondsToTime(seconds) {
  let time = new Date(1000 * seconds).toISOString().substr(11, 8)
  return time
}

function percentOf(a, b) {
  // if (b == 0) return '100%'
  if (a == 0 || b == 0) return '0%'

  let p = Math.round((a / b) * 100)
  return p + '%'
}
