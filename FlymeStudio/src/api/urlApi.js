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
  modifyUrl: () => 'FlymeStudio/Information/information',
  // put
  replyMsgUrl: () => 'FlymeStudio/Information/msg'
}

export const teamworkApi = {
  // get
  getTeamInfoUrl: () => 'FlymeStudio/Teamwork/teamInfo',
  // get
  viewTeamsUrl: () => 'FlymeStudio/Teamwork/myTeams',
  // get
  searchUserUrl: () => 'FlymeStudio/Teamwork/user',
  // post
  inviteUrl: () => 'FlymeStudio/Teamwork/user',
  // delete
  disbandUrl: () => 'FlymeStudio/Teamwork/team',
  // get
  viewMemberProjectsUrl: () => 'FlymeStudio/Teamwork/memberProjects',
  // get
  viewMemberSummariesUrl: () => 'FlymeStudio/Teamwork/memberSummaries',
  // put
  setPermissionUrl: () => 'FlymeStudio/Teamwork/permission',
  // delete
  removeUrl: () => 'FlymeStudio/Teamwork/member',
  // get
  searchTeamUrl: () => 'FlymeStudio/Teamwork/teams',
  // put
  joinUrl: () => 'FlymeStudio/Teamwork/team',
  // post
  createUrl: () => 'FlymeStudio/Teamwork/team'
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
  getUrl: () => '',
  createUrl: () => '',
  modifyUrl: () => '',
  searchUrl: () => '',
  deleteUrl: () => ''
}
