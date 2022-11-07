import { httpService } from './http.service.js'

const BASE_URL = `board/`

export const boardService = {
  query,
  getById,
  save,
  remove,
  getBoardForDisplay,
}

async function query(filterBy) {
  return httpService.get(BASE_URL, filterBy)
}

async function getById(boardId) {
  return httpService.get(BASE_URL + boardId)
}

async function remove(boardId) {
  return httpService.delete(BASE_URL + boardId)
}

async function save(board) {
  if (board._id) {
    return httpService.put(BASE_URL + board._id, board)
  } else {
    return httpService.post(BASE_URL, board)
  }
}

function getBoardForDisplay(board, filter) {
  // FILTER STRUCTURE
  // filter = {
  //   txt: '',
  //   member: {
  //     includeNoMembers: false,
  //     memberIds: []
  //   },
  //   label: {
  //     includeNoLabels: false,
  //     labelIds : []
  //   }
  // }
  let filteredBoard = structuredClone(board)

  if (filter.txt) {
    const regex = new RegExp(filter.txt, 'i')
    filteredBoard.groups = filteredBoard.groups.map((group) => ({
      ...group,
      tasks: group.tasks.filter((task) => regex.test(task.title)),
    }))
  }
  if (filter.member) {
    if (filter.member.memberIds?.length && filter.member.includeNoMembers) {
      filteredBoard.groups = filteredBoard.groups.map((group) => ({
        ...group,
        tasks: group.tasks.filter(
          (task) =>
            !task.memberIds?.length ||
            filter.member.memberIds.some((memberId) =>
              task.memberIds?.includes(memberId)
            )
        ),
      }))
    } else if (filter.member.memberIds?.length) {
      filteredBoard.groups = filteredBoard.groups.map((group) => ({
        ...group,
        tasks: group.tasks.filter((task) =>
          filter.member.memberIds.some((memberId) =>
            task.memberIds?.includes(memberId)
          )
        ),
      }))
    } else if (filter.member.includeNoMembers) {
      filteredBoard.groups = filteredBoard.groups.map((group) => ({
        ...group,
        tasks: group.tasks.filter((task) => !task.memberIds?.length),
      }))
    }
  }
  if (filter.label) {
    if (filter.label.labelIds?.length && filter.label.includeNoLabels) {
      filteredBoard.groups = filteredBoard.groups.map((group) => ({
        ...group,
        tasks: group.tasks.filter(
          (task) =>
            !task.labelIds?.length ||
            filter.label.labelIds.some((labelId) =>
              task.labelIds?.includes(labelId)
            )
        ),
      }))
    } else if (filter.label.labelIds?.length) {
      filteredBoard.groups = filteredBoard.groups.map((group) => ({
        ...group,
        tasks: group.tasks.filter((task) =>
          filter.label.labelIds.some((labelId) =>
            task.labelIds?.includes(labelId)
          )
        ),
      }))
    } else if (filter.label.includeNoLabels) {
      filteredBoard.groups = filteredBoard.groups.map((group) => ({
        ...group,
        tasks: group.tasks.filter((task) => !task.labelIds?.length),
      }))
    }
  }
  return filteredBoard
}
