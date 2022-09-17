import { utilService } from './services/util.service'

//prettier-ignore
export var board = {
  _id: 'b101',
  title: 'Demo Data',
  archivedAt: 1589983468418,
  createdAt: 1589983468418,
  isStarred: true,
  createdBy: {
    _id: 'u101',
    fullname: 'Abi Abambi',
    imgUrl: 'http://some-img',
  },
  style: {
    background:
      'url("https://techcrunch.com/wp-content/uploads/2020/11/GettyImages-1150039017.jpg?w=1390&crop=1")',
  },
  labels: [
    {
      id: 'l101',
      title: 'Done',
      color: '#61bd4f',
    },
    {
      id: 'l102',
      title: 'Progress',
      color: '#61bd33',
    },
  ],
  members: [
    {
      _id: 'u101',
      fullname: 'Tal Tarablus',
      imgUrl:
        'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.football.org.il%2FImageServer%2FGetImage.ashx%3Ftype%3D2%26id%3D209197%26width%3D240%26height%3D305&imgrefurl=https%3A%2F%2Fwww.football.org.il%2Fen%2Fplayers%2Fplayer%2F%3Fplayer_id%3D169688%26season_id%3D19&tbnid=BpqbpdiO9xGzoM&vet=12ahUKEwiy1Yary5v6AhUNGRoKHZq8BjsQMygNegQIARBz..i&docid=LLq3P-ffKBxVRM&w=240&h=305&itg=1&q=bar%20ohayon&ved=2ahUKEwiy1Yary5v6AhUNGRoKHZq8BjsQMygNegQIARBz',
    },
    {
      _id: 'u102',
      fullname: 'Yasmin Gudha',
      imgUrl:
        'https://www.google.com/imgres?imgurl=https%3A%2F%2Fp16-sign-va.tiktokcdn.com%2Ftos-maliva-avt-0068%2Fad2b7cf288ab1db21422839f361955fd~c5_720x720.jpeg%3Fx-expires%3D1656914400%26x-signature%3DkVLseCTERUkwZ5LbiTE0hQXffkU%253D&imgrefurl=https%3A%2F%2Fwww.tiktok.com%2Fdiscover%2Fwaicha20%3Flang%3Den&tbnid=l7ZmLhn3S7Ci3M&vet=12ahUKEwiMlv-Vy5v6AhUMvBoKHTbSBCYQMygQegQIARBJ..i&docid=uuP4NTDUs0rASM&w=583&h=583&itg=1&q=yasmin%20gudha&ved=2ahUKEwiMlv-Vy5v6AhUMvBoKHTbSBCYQMygQegQIARBJ',
    },
    {
      _id: 'u103',
      fullname: 'Lee Sharon',
      imgUrl: 'https://globalzonetoday.com/sharon-lee/',
    },
  ],
  groups: [
    {
      id: 'g101',
      title: 'Backlog-Server',
      archivedAt: 1589983468418,
      tasks: [
        {
          id: 'c101',
          title: 'Create a server with express',
          attachments: [],
          style: {
            bgColor: '#FFAF3F',
          },
          memberIds: ['u101'],
        },
        {
          id: 'c102',
          title: 'Create backend services',
          attachments: [],
          style: {
            bgColor: '#EF7664',
          },
          memberIds: ['u102'],
        },
        {
          id: utilService.makeId(),
          title: 'Open routing directory',
          attachments: [],
        },
        {
          id: 'c104',
          title: 'Data model approval',
          attachments: [{ id: 'aa101', name: 'Attachment Image', createdAt: Date.now(), url: "https://images.unsplash.com/photo-1526253038957-bce54e05968e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" }],
        },
        {
          id: 'c105',
          title: 'Database implementation',
          attachments: [],
        },
      ],
      style: {},
    },
    {
      id: 'g102',
      title: 'Backlog-Client',
      tasks: [
        {
          id: utilService.makeId(),
          title: 'Planning the component tree and folder structure',
          archivedAt: 1589983468418,
          attachments: [],
        },
        {
          id: 'c1002',
          title: 'Create front services',
          status: 'in-progress',
          description: 'description',
          attachments: [
            {
              id: 'aa101',
              name: 'Attachment Image',
              createdAt: Date.now(),
              url: 'https://trello.com/1/cards/6321cbc1e641a404ee3f1eb6/attachments/6321cd334f784b036ea3c662/download/images.jpeg',
            },
          ],
          comments: [
            {
              id: 'ZdPnm',
              txt: 'also @yaronb please CR this',
              createdAt: 1590999817436.0,
              byMember: {
                _id: 'u101',
                fullname: 'Tal Tarablus',
                imgUrl:
                  'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
            },
          ],
          checklists: [
            {
              id: 'YEhmF',
              title: 'Checklist',
              todos: [
                {
                  id: '212jX',
                  title: 'To Do 1',
                  isDone: false,
                },
              ],
            },
          ],
          memberIds: ['u101'],
          labelIds: ['l101', 'l102'],
          createdAt: 1590999730348,
          dueDate: 16156215211,
          byMember: {
            _id: 'u101',
            username: 'Tal',
            fullname: 'Tal Tarablus',
            imgUrl:
              'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
          },
          style: {
            bgColor: '#FFAF3F',
          },
        },
        {
          id: 't1003',
          title: 'Build basic CRUD',
          archivedAt: 1589983468418,
          attachments: [],
          memberIds: ['u102'],
        },
      ],
      style: {},
    },
    {
      id: 'g103',
      title: 'In development',
      tasks: [
        {
          id: utilService.makeId(),
          title: 'Sanity test for new component',
          archivedAt: 1589983468418,
          attachments: [],
          memberIds: ['u103'],
        },
        {
          id: 'c2',
          title: 'functional testing for app header',
          status: 'in-progress',
          description: 'description',
          attachments: [],
          comments: [
            {
              id: 'ZdPnm',
              txt: 'also @yaronb please CR this',
              createdAt: 1590999817436.0,
              byMember: {
                _id: 'u101',
                fullname: 'Tal Tarablus',
                imgUrl:
                  'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
            },
          ],
          checklists: [
            {
              id: 'YEhmF',
              title: 'Checklist',
              todos: [
                {
                  id: '212jX',
                  title: 'To Do 1',
                  isDone: false,
                },
              ],
            },
          ],
          memberIds: ['u101'],
          labelIds: ['l101', 'l102'],
          createdAt: 1590999730348,
          dueDate: 16156215211,
          byMember: {
            _id: 'u101',
            username: 'Tal',
            fullname: 'Tal Tarablus',
            imgUrl:
              'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
          },
          style: {
            bgColor: '#F5DE29',
          },
        },
        {
          id: 'c3',
          title: 'connecting to PWA',
          status: 'in-progress',
          description: 'description',
          attachments: [{ id: 'aa10122', name: 'Attachment Image', createdAt: Date.now(), url: "https://sevaa.com/app/uploads/2018/09/featured-image-PWA.png" }],
          comments: [
            {
              id: 'ZdPnm',
              txt: 'also @yaronb please CR this',
              createdAt: 1590999817436.0,
              byMember: {
                _id: 'u101',
                fullname: 'Tal Tarablus',
                imgUrl:
                  'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
            },
          ],
          checklists: [
            {
              id: 'YEhmF',
              title: 'Checklist',
              todos: [
                {
                  id: '212jX',
                  title: 'To Do 1',
                  isDone: false,
                },
              ],
            },
          ],
          memberIds: ['u101'],
          labelIds: ['l101', 'l102'],
          createdAt: 1590999730348,
          dueDate: 16156215211,
          byMember: {
            _id: 'u101',
            username: 'Tal',
            fullname: 'Tal Tarablus',
            imgUrl:
              'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
          },
          style: {
            bgColor: '#F5DE29',
          },
        },
      ],
      style: {
        bgColor: '#CC0200',
      },
    },
    {
      id: 'g104',
      title: 'Done',
      tasks: [
        {
          id: utilService.makeId(),
          title: 'SASS architecture',
          archivedAt: 1589983468418,
          attachments: [],
        },
        {
          id: 'c22',
          title: 'https://www.npmjs.com/package/react-beautiful-dnd',
          status: 'in-progress',
          description: 'description',
          comments: [
            {
              id: 'ZdPnm',
              txt: 'also @yaronb please CR this',
              createdAt: 1590999817436.0,
              byMember: {
                _id: 'u101',
                fullname: 'Tal Tarablus',
                imgUrl:
                  'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
            },
          ],
          checklists: [
            {
              id: 'YEhmF',
              title: 'Checklist',
              todos: [
                {
                  id: '212jX',
                  title: 'To Do 1',
                  isDone: false,
                },
              ],
            },
          ],
          memberIds: ['u101'],
          labelIds: ['l101', 'l102'],
          createdAt: 1590999730348,
          dueDate: 16156215211,
          byMember: {
            _id: 'u101',
            username: 'Tal',
            fullname: 'Tal Tarablus',
            imgUrl:
              'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
          },
          style: {
            bgColor: '#26de81',
          },
        },
        {
          id: utilService.makeId(),
          title: 'Add node.js modules',
          archivedAt: 1589983468418,
          attachments: [{ id: 'aa101', name: 'Attachment Image', createdAt: Date.now(), url: "https://pluralsight2.imgix.net/paths/images/nodejs-45adbe594d.png" }],
          style: { coverImg: 'https://pluralsight2.imgix.net/paths/images/nodejs-45adbe594d.png'}
        },
      ],
      style: {},
    },
    {
      id: 'g105',
      title: 'QA',
      tasks: [
        {
          id: 'tt1',
          title: 'Meeting with head manager for planning the code progress',
          archivedAt: 1589983468418,
          attachments: [],
          style: {
            bgColor: '#172A4D',
          },
        },
        {
          id: 'tt2',
          title: 'Bug search',
          description: 'description',
          attachments: [{ id: 'bb102', name: 'Attachment Image', createdAt: Date.now(), url: "https://st2.depositphotos.com/47577860/45954/v/1600/depositphotos_459542140-stock-illustration-bug-bug-search-development-icon.jpg"}],
          style: { coverImg: 'https://st2.depositphotos.com/47577860/45954/v/1600/depositphotos_459542140-stock-illustration-bug-bug-search-development-icon.jpg'},
          comments: [
            {
              id: 'ZdPnm',
              txt: 'also @yaronb please CR this',
              createdAt: 1590999817436.0,
              byMember: {
                _id: 'u101',
                fullname: 'Tal Tarablus',
                imgUrl:
                  'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
            },
          ],
          checklists: [
            {
              id: 'YEhmF',
              title: 'Checklist',
              todos: [
                {
                  id: '212jX',
                  title: 'To Do 1',
                  isDone: false,
                },
              ],
            },
          ],
          memberIds: ['u101'],
          labelIds: ['l101', 'l102'],
          createdAt: 1590999730348,
          dueDate: 16156215211,
          byMember: {
            _id: 'u101',
            username: 'Tal',
            fullname: 'Tal Tarablus',
            imgUrl:
              'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
          },
        },
        {
          id: 'tt3',
          title: 'End day CR wihh devs and team leader',
          archivedAt: 1589983468418,
          attachments: [],
          style: {
            bgColor: '#CD8DE5',
          },
        },
        {
          id: 'tt4',
          title: 'Automation tests',
          archivedAt: 1589983468418,
          attachments: [],
        },
      ],
      style: {},
    },
    {
      id: 'g106',
      title: 'Ready for production',
      tasks: [
        {
          id: utilService.makeId(),
          title: 'Create a database with mongo',
          archivedAt: 1589983468418,
          attachments: [],
        },
        {
          id: 'tt2',
          title: 'Finish making more customization options',
          status: 'in-progress',
          description: 'description',
          attachments: [],
          comments: [
            {
              id: 'ZdPnm',
              txt: 'also @yaronb please CR this',
              createdAt: 1590999817436.0,
              byMember: {
                _id: 'u101',
                fullname: 'Tal Tarablus',
                imgUrl:
                  'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
            },
          ],
          checklists: [
            {
              id: 'YEhmF',
              title: 'Checklist',
              todos: [
                {
                  id: '212jX',
                  title: 'To Do 1',
                  isDone: false,
                },
              ],
            },
          ],
          memberIds: ['u101'],
          labelIds: ['l101', 'l102'],
          createdAt: 1590999730348,
          dueDate: 16156215211,
          byMember: {
            _id: 'u101',
            username: 'Tal',
            fullname: 'Tal Tarablus',
            imgUrl:
              'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
          },
          style: {
            bgColor: '#26de81',
          },
        },
        {
          id: 'tt3',
          title: 'Make a login system',
          archivedAt: 1589983468418,
          attachments: [],
        },
      ],
      style: {},
    },
  ],
  activities: [
    {
      id: 'a101',
      txt: 'Changed Color',
      createdAt: 154514,
      byMember: {
        _id: 'u101',
        fullname: 'Abi Abambi',
        imgUrl: 'http://some-img',
      },
      task: {
        id: 'c101',
        title: 'Replace Logo',
      },
    },
  ],
}
