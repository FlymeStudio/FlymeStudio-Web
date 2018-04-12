export const baseApi = {
  baseUrl: () => 'http://localhost:8080/FlymeStudio/'
}

export const accountApi = {
  // post
  signInUrl: () => '/Account/login',
  // post
  signUpUrl: () => '/Account/register',
  // post
  signOutUrl: () => '/Account/logout',
  // post
  retrieveUrl: () => '/Account/retrieve'
}

export const informationApi = {
  // put
  modifyUrl: () => '/Information/info',
  // put
  replyUrl: () => '/Information/message'
}

export const teamworkApi = {
  // get
  getTeamInfoUrl: () => '/Teamwork/team/all',
  // get
  viewTeamsUrl: () => '/Teamwork/teams/my',
  // get
  searchUserUrl: () => '/Teamwork/user/all',
  // post
  inviteUrl: () => '/Teamwork/user/all',
  // delete
  disbandUrl: () => '/Teamwork/team/my',
  // get
  viewMemberProjectsUrl: () => '/Teamwork/projects/member',
  // get
  viewMemberSummariesUrl: () => '/Teamwork/summaries/member',
  // put
  setPermissionUrl: () => '/Teamwork/permission/member',
  // delete
  removeUrl: () => '/Teamwork/team/member',
  // get
  searchTeamUrl: () => '/Teamwork/teams/all',
  // post
  joinUrl: () => '/Teamwork/team/all',
  // post
  createUrl: () => '/Teamwork/team/my'
}

export const projectApi = {
  // get
  getUrl: () => '/Project/projects/all',
  // post
  createUrl: () => '/Project/project/my',
  // delete
  deleteUrl: () => '/Project/project/my',
  // put
  modifyUrl: () => '/Project/project/my'
}

export const summaryApi = {
  // get
  getUrl: () => '/Summary/summaries/all',
  // post
  createUrl: () => '/Summary/summary/my',
  // put
  modifyUrl: () => '/Summary/summary/my',
  // delete
  deleteUrl: () => '/Summary/summary/my'
}
