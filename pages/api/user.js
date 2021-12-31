import { getLoginSession } from '../../lib/auth'

export default async function user(req, res) {
  const session = await getLoginSession(req)
  //TODO: Fetch the user from the database rather than returning
  //      the raw session payload
  res.status(200).json({ user: session || null })
}
