import { utilService } from "./util.service"

export const activityService = {
  addActivity
}

function addActivity(txt, task, user, board) {
  const miniUser = user ? user : {
    fullname: 'Guest',
    imgUrl: 'http://res.cloudinary.com/frello/image/upload/v1663584273/u9nkwkywyxv8mogk9q2b.jpg',
  }

  const miniTask = task ? {
    id: task.id,
    title: task.title
  } : null

  const activity = {
    id: utilService.makeId(),
    txt,
    createdAt: Date.now(),
    byMember: miniUser,
    task: miniTask
  }

  if (board.activities) board.activities.unshift(activity)
  else board.activities = [activity]

  return board
}