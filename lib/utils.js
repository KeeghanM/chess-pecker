import { firestore } from "./firebase"
import { collection, addDoc, Timestamp } from "firebase/firestore"

export function secondsToTime(seconds) {
  let time = new Date(1000 * seconds).toISOString().substr(11, 8)
  return time
}

export function percentOf(a, b) {
  // if (b == 0) return '100%'
  if (a == 0 || b == 0) return "0%"

  let p = Math.round((a / b) * 100)
  return p + "%"
}

export function difficultyAdjuster(d) {
  return d == 0 ? 0.8 : d == 1 ? 1 : 1.2
}

export function createSet(name, puzzles, uid) {
  let set = {
    setName: name,
    setSize: puzzles.length,
    creationDate: Timestamp.fromDate(new Date()),
    rounds: [
      {
        completed: 0,
        correct: 0,
        timeSpent: 0,
      },
    ],
    puzzles,
  }

  addDoc(collection(firestore, "users", uid, "tactics-sets"), set).catch(
    (err) => console.log(err.message)
  )
}
