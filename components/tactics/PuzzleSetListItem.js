import PuzzleSetSettings from "./PuzzleSetSettings"
import { percentOf, secondsToTime } from "../../lib/utils"

export default function SetListItem(props) {
  let set = props.set.set
  return (
    <div className="px-12 py-6 space-y-2 my-2 bg-dark text-light max-w-md">
      <h3 className="text-2xl font-bold">
        {set.setName} - {set.rounds.length}/8
      </h3>
      <p>
        Finished {set.rounds[set.rounds.length - 1].completed} of {set.setSize}{" "}
        puzzles (
        {percentOf(
          set.rounds[set.rounds.length - 1].correct,
          set.rounds[set.rounds.length - 1].completed
        )}{" "}
        Accuracy)
      </p>
      <p>
        Round Time: {secondsToTime(set.rounds[set.rounds.length - 1].timeSpent)}
      </p>
      <div className="flex flex-row gap-6 pt-6">
        <button
          onClick={props.onSelect}
          className="px-4 py-2 bg-primary text-light hover:bg-accent-light hover:text-dark transition duration-200"
        >
          Train Set
        </button>

        <PuzzleSetSettings set={props.set} updateList={props.updateList} />
      </div>
    </div>
  )
}
