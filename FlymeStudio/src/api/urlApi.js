export const accountApi = {
  // post
  signInUrl: () => 'FlymeStudio/Account/login',
  // post
  signUpUrl: () => 'FlymeStudio/Account/register',
  // post
  signOutUrl: () => 'FlymeStudio/Account/logout',
  // post
  retrieveUrl: () => 'FlymeStudio/Account/retrieve'
}

export const informationApi = {
  // put
  modifyUrl: () => 'FlymeStudio/Information/info',
  // put
  replyMsgUrl: () => 'FlymeStudio/Information/message'
}

export const teamworkApi = {
  // get
  getTeamInfoUrl: () => 'FlymeStudio/Teamwork/team/all',
  // get
  viewTeamsUrl: () => 'FlymeStudio/Teamwork/teams/my',
  // get
  searchUserUrl: () => 'FlymeStudio/Teamwork/user/all',
  // post
  inviteUrl: () => 'FlymeStudio/Teamwork/user/all',
  // delete
  disbandUrl: () => 'FlymeStudio/Teamwork/team/my',
  // get
  viewMemberProjectsUrl: () => 'FlymeStudio/Teamwork/projects/member',
  // get
  viewMemberSummariesUrl: () => 'FlymeStudio/Teamwork/summaries/member',
  // put
  setPermissionUrl: () => 'FlymeStudio/Teamwork/permission/member',
  // delete
  removeUrl: () => 'FlymeStudio/Teamwork/team/member',
  // get
  searchTeamUrl: () => 'FlymeStudio/Teamwork/teams/all',
  // post
  joinUrl: () => 'FlymeStudio/Teamwork/team/all',
  // post
  createUrl: () => 'FlymeStudio/Teamwork/team/my'
}

export const projectApi = {
  // get
  getUrl: () => 'FlymeStudio/Project/projects/all',
  // post
  createUrl: () => 'FlymeStudio/Project/project/my',
  // delete
  deleteUrl: () => 'FlymeStudio/Project/project/my',
  // get
  searchUrl: () => 'FlymeStudio/Project/projects/my',
  // put
  modifyUrl: () => 'FlymeStudio/Project/project/my'
}

export const summaryApi = {
  // get
  getUrl: () => 'FlymeStudio/Summary/summaries/all',
  // post
  createUrl: () => 'FlymeStudio/Summary/summary/my',
  // put
  modifyUrl: () => 'FlymeStudio/Summary/summary/my',
  // get
  searchUrl: () => 'FlymeStudio/Summary/summaries/my',
  // delete
  deleteUrl: () => 'FlymeStudio/Summary/summary/my'
}
