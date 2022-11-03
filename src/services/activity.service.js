import { userService } from './user.service'
import { utilService } from './util.service'

export const activityService = {
  addActivity,
}

function addActivity(txt, task, board, comment, user) {
  const miniUser = user || userService.getLoggedInUser()

  const miniTask = task ? { id: task.id, title: task.title,} : null

  const activity = {
    id: utilService.makeId(),
    txt,
    createdAt: Date.now(),
    byMember: miniUser,
    task: miniTask,
  }

  if (comment) activity.comment = comment

  if (board.activities) board.activities.unshift(activity)
  else board.activities = [activity]

  return board
}
