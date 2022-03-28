import middleware from "../../middleware/middleware"
import nextConnect from "next-connect"
import fs from "fs"
import Chess from "../../lib/chess"

const handler = nextConnect()
handler.use(middleware)

handler.post(async (req, res) => {
  try {
    let setFile = req.files.setFile[0]
    if (setFile.originalFilename.split(".").pop() != "json") {
      res.status(400).send("Incorrect File Format")
      return
    }
    fs.readFile(setFile.path, "utf8", (err, jsonString) => {
      if (err) {
        res.status(500).send(err.message)
        return
      }
      let set = JSON.parse(jsonString)

      // Validation of set structure
      if (
        Object.keys(set).length != 2 ||
        Object.keys(set).includes("puzzles") == false ||
        Object.keys(set).includes("setName") == false
      ) {
        res.status(400).send("Invalid Set Format")
        return
      }

      // validation of puzzles
      if (set.puzzles.length > 1000) {
        res.status(400).send("Too many puzzles. Must not exceed 1000 puzzles.")
        return
      }

      const validateFields = [
        "fen",
        "moves",
        "puzzleid",
        "ratingdeviation",
        "rating",
        "themes",
      ]
      const chess = new Chess()
      for (let puzzle of set.puzzles) {
        // Check for required fields
        if (
          Object.keys(puzzle).includes("fen") == false ||
          Object.keys(puzzle).includes("moves") == false
        ) {
          res.status(400).send("Invalid Puzzle Format")
          return
        }

        // Check for no extra fields
        for (let key of Object.keys(puzzle)) {
          if (validateFields.includes(key) == false) {
            res.status(400).send("Invalid Puzzle Format")
            return
          }
        }

        if (chess.load(puzzle.fen) == false) {
          res.status(400).send("Invalid FEN in puzzle")
          return
        }

        // Check all moves in puzzle are valid
        for (let mv in puzzle.moves) {
          if (chess.move(puzzle.moves[mv], { sloppy: true }) === null) {
            res.status(400).send("Invalid move in puzzle")
            return
          }
        }
      }

      res.status(200).send(set)
    })
  } catch (err) {
    res.status(500).send(err.message)
  }
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler
