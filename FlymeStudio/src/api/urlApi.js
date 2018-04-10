export const accountApi = {
  // post
  signInUrl: () => 'FlymeStudio/Account/signIn',
  // post
  signUpUrl: () => 'FlymeStudio/Account/signUp',
  // post
  signOutUrl: () => 'FlymeStudio/Account/signOut',
  // post
  retrieveUrl: () => 'FlymeStudio/Account/retrieve'
}

export const informationApi = {
  // put
  modifyUrl: () => 'FlymeStudio/Information/info',
  // put
  replyMsgUrl: () => 'FlymeStudio/Information/msg'
}

export const teamworkApi = {
  // get
  getTeamInfoUrl: () => 'FlymeStudio/Teamwork/team',
  // get
  viewTeamsUrl: () => 'FlymeStudio/Teamwork/myteams',
  // get
  searchUserUrl: () => 'FlymeStudio/Teamwork/user',
  // post
  inviteUrl: () => 'FlymeStudio/Teamwork/user',
  // delete
  disbandUrl: () => 'FlymeStudio/Teamwork/myteam',
  // get
  viewMemberProjectsUrl: () => 'FlymeStudio/Teamwork/projects',
  // get
  viewMemberSummariesUrl: () => 'FlymeStudio/Teamwork/summaries',
  // put
  setPermissionUrl: () => 'FlymeStudio/Teamwork/permission',
  // delete
  removeUrl: () => 'FlymeStudio/Teamwork/member',
  // get
  searchTeamUrl: () => 'FlymeStudio/Teamwork/teams',
  // put
  joinUrl: () => 'FlymeStudio/Teamwork/team',
  // post
  createUrl: () => 'FlymeStudio/Teamwork/myteam'
}

export const projectApi = {
  // get
  getUrl: () => 'FlymeStudio/Project/projects',
  // post
  createUrl: () => 'FlymeStudio/Project/project',
  // put
  modifyUrl: () => 'FlymeStudio/Project/project',
  // get
  searchUrl: () => 'FlymeStudio/Project/project',
  // delete
  deleteUrl: () => 'FlymeStudio/Project/project'
}

export const summaryApi = {
  // get
  getUrl: () => 'FlymeStudio/Summary/summaries',
  // post
  createUrl: () => 'FlymeStudio/Summary/summary',
  // put
  modifyUrl: () => 'FlymeStudio/Summary/summary',
  // get
  searchUrl: () => 'FlymeStudio/Summary/summary',
  // delete
  deleteUrl: () => 'FlymeStudio/Summary/summary'
}
