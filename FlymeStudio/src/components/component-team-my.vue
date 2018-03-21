<template>
<div>
  <Collapse>
    <Panel name="Manage">
      <span class="div-count" style="color:#19be6b;"> Manage ({{ managedTeams.length }})</span>

      <div class="div-members" slot="content" v-for="team in managedTeams" :key="team.id">
        <Card>
          <p slot="title">
            <Icon class="icon-item" type="ios-people" size="18"></Icon>
            <span>{{ team.name }}</span>
          </p>
          <div style="margin:10px;">
            <Icon class="icon-item" type="pound" size="18"></Icon>
            <span>{{ team.id }}</span>
          </div>
          <div style="margin:10px;">
            <Icon class="icon-item" type="star" size="18"></Icon>
            <span>{{ team.manager }}</span>
          </div>

          <Collapse>
            <Panel name="ManagedMembers">
              <span class="div-count"><Icon class="icon-item" type="chatbubbles" size="18"></Icon> Member ({{ team.members.length }})</span>

              <div class="div-members" slot="content">
                <div class="div-member" v-for="member in team.members" :key="member.tel">
                  <Icon class="icon-member" type="person" size="18"></Icon>
                  <span class="span-name">{{ member.name }}</span>
                  <Icon class="icon-member" type="ios-telephone" size="18"></Icon>
                  <span class="span-tel">{{ member.tel }}</span>
                  <div class="btns">
                    <Button class="btn-member" size="small" type="info" shape="circle" icon="clipboard"></Button>
                    <Button class="btn-member" size="small" type="info" shape="circle" icon="document-text"></Button>
                    <Button class="btn-member" size="small" style="margin-left:10px;" type="error" shape="circle" icon="close-round"></Button>
                  </div>
                </div>
              </div>
            </Panel>
          </Collapse>
        </Card>
      </div>
    </Panel>

    <Panel name="Join">
      <span class="div-count" style="color:#ff9900;"> Join ({{ joinedTeams.length }})</span>

      <div class="div-members" slot="content" v-for="team in joinedTeams" :key="team.id">

      </div>
    </Panel>
  </Collapse>
</div>
</template>

<script>
export default {
  name: 'component-team-my',
  created () {
    this.getInfo()
  },
  data () {
    return {
      managedTeams: [
        {
          id: '00001',
          name: 'System support',
          manager: '李永达',
          members: [
            {
              tel: '13608089849',
              name: '曾宇'
            },
            {
              tel: '13612345678',
              name: '刘卓旻'
            }
          ]
        }
      ],
      joinedTeams: [
        {
          id: '00002',
          name: 'Overseas firmware',
          manager: '段启智',
          members: [
            {
              tel: '13412345678',
              name: '余学海'
            }
          ]
        }
      ]
    }
  },
  methods: {
    getInfo () {

    }
  }
}
</script>

<style scoped>
.div-count {
  font-size  : 14px;
  margin-left: 10px;
  font-weight: bold;
}

.div-members {
  height       : auto;
  width        : auto;
  padding      : 3px;
  border-radius: 5px;
}

.div-member {
  height       : auto;
  width        : 100%;
  padding      : 5px;
  margin-bottom: 15px;
  display      : flex;
  border-bottom: 1px solid #ccc;
  align-items  : center;
}

.icon-member {
  width       : 18px;
  text-align  : center;
  margin-left : 0;
  margin-right: 3px;
  float       : left;
}

.span-name {
  width    : 80px;
  float    : left;
  font-size: 16px;
  display  : inline-block;
}

.span-tel {
  width    : 120px;
  float    : left;
  font-size: 16px;
  display  : inline-block;
}

.btns {
  width      : auto;
  height     : auto;
  display    : flex;
  align-items: center;
  margin-left: auto;
  float      : right;
}

.btn-member {
  margin-right: 10px;
}
</style>
