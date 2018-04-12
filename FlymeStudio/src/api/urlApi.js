export const baseApi = {
  baseUrl: () => 'http://localhost:8080/FlymeStudio/'
}

export const accountApi = {
  // [post]
  // {
  //   result: true,
  //   data: {
  //     id: 0,
  //     num: '12345',
  //     tel: '13608089849',
  //     name: '曾宇',
  //     email: '1213814232@qq.com',
  //     password: '123456',
  //     messages: [
  //       {
  //         messageId: 0,
  //         type: 0,
  //         senderNum: '54321',
  //         senderName: '张三',
  //         teamId: 0,
  //         teamName: '测试组'
  //       }
  //     ]
  //   }
  // }
  signInUrl: () => '/Account/login',
  // [post]
  // {
  //   result: true
  // }
  signUpUrl: () => '/Account/register',
  // [post]
  // {
  //   result: true
  // }
  signOutUrl: () => '/Account/logout',
  // [post]
  retrieveUrl: () => '/Account/retrieve'
}

export const informationApi = {
  // [put]
  // {
  //   result: true
  // }
  modifyUrl: () => '/Information/info',
  // [put]
  // {
  //   result: true
  // }
  replyUrl: () => '/Information/message'
}

export const teamworkApi = {
  // [get]
  // {
  //   result: true,
  //   data: {
  //     count: 1,
  //     administratorName: '曾宇',
  //     administratorNum: '12345'
  //   }
  // }
  getTeamInfoUrl: () => '/Teamwork/team/all',
  // [get]
  // {
  //   result: true,
  //   data: {
  //     managedTeams: [
  //       {
  //         name: '测试组',
  //         id: 1,
  //         administratorId: '54321',
  //         administratorName: '张三',
  //         members: [
  //           id: 1,
  //           num: '',
  //           tel: '',
  //           name: '',
  //           email: '',
  //           permission: 0
  //         ]
  //       }
  //     ],
  //     joinedTeams: [
  //     ]
  //   }
  // }
  viewTeamsUrl: () => '/Teamwork/teams/my',
  // [get]
  // {
  //   result: true,
  //   data: {
  //     id: 0,
  //     num: '12345',
  //     tel: '13608089849',
  //     name: '曾宇',
  //     email: '1213814232@qq.com'
  //   }
  // }
  searchUserUrl: () => '/Teamwork/user/all',
  // [post]
  // {
  //   result: true
  // }
  inviteUrl: () => '/Teamwork/user/all',
  // [delete]
  // {
  //   result: true
  // }
  disbandUrl: () => '/Teamwork/team/my',
  // [get]
  // {
  //   result: true,
  //   data: [
  //     {
  //       id: 100,
  //       type: 1,
  //       percent: 0,
  //       date: 1523430139047,
  //       title: '测试标题',
  //       content: '测试内容',
  //       plans: [
  //         {
  //           id: 1523430257047,
  //           percent: 60,
  //           tag: '测试tag',
  //           goal: '测试goal'
  //         }
  //       ]
  //     }
  //   ]
  // }
  viewMemberProjectsUrl: () => '/Teamwork/projects/member',
  // [get]
  viewMemberSummariesUrl: () => '/Teamwork/summaries/member',
  // [put]
  // {
  //   result: true
  // }
  setPermissionUrl: () => '/Teamwork/permission/member',
  // [delete]
  // {
  //   result: true
  // }
  removeUrl: () => '/Teamwork/team/member',
  // [get]
  // {
  //   result: true,
  //   data: [
  //     {
  //       id: 1,
  //       name: '测试组',
  //       administrator: '张三'
  //     }
  //   ]
  // }
  searchTeamUrl: () => '/Teamwork/teams/all',
  // [post]
  // {
  //   result: true
  // }
  joinUrl: () => '/Teamwork/team/all',
  // [post]
  // {
  //   result: true
  // }
  createUrl: () => '/Teamwork/team/my'
}

export const projectApi = {
  // [get]
  // {
  //   result: true,
  //   data: [
  //     {
  //       id: 100,
  //       type: 1,
  //       percent: 0,
  //       date: 1523430139047,
  //       title: '测试标题',
  //       content: '测试内容',
  //       plans: [
  //         {
  //           id: 1523430257047,
  //           percent: 60,
  //           tag: '测试tag',
  //           goal: '测试goal'
  //         }
  //       ]
  //     }
  //   ]
  // }
  getUrl: () => '/Project/projects/all',
  // [post]
  // {
  //   result: true
  // }
  createUrl: () => '/Project/project/my',
  // [delete]
  // {
  //   result: true
  // }
  deleteUrl: () => '/Project/project/my',
  // [put]
  // {
  //   result: true
  // }
  modifyUrl: () => '/Project/project/my'
}

export const summaryApi = {
  // [get]
  getUrl: () => '/Summary/summaries/all',
  // [post]
  createUrl: () => '/Summary/summary/my',
  // [put]
  modifyUrl: () => '/Summary/summary/my',
  // [delete]
  deleteUrl: () => '/Summary/summary/my'
}
