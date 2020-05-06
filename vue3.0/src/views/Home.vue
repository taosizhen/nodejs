/* eslint-disable vue/no-parsing-error */
<template>
  <div class="home">
    <Table border :columns="columns" :data="tableData">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(row)">修改</Button>
        <Button type="warning" size="small" style="margin-right: 5px" @click="deleteRow(row)">删除</Button>
      </template>
    </Table>
    <Modal v-model="modal" title="修改用户" @on-ok="submit" @on-cancel="cancel">
      <Form ref="formInline" :model="formInline" :label-width="80">
        <FormItem prop="user">
          <i-input type="text" v-model="formInline.name" placeholder="Username">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </i-input>
        </FormItem>
        <FormItem prop="password" label="密码">
          <i-input type="password" v-model="formInline.passward" placeholder="Password">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </i-input>
        </FormItem>
        <FormItem prop="phone" label="电话号">
          <i-input type="text" v-model="formInline.phone" placeholder="电话号">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </i-input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Home extends Vue {
  public columns = [
    {
      title: '姓名',
      key: 'name'
    },
    {
      title: '电话号',
      key: 'phone'
    },
    {
      title: '创建时间',
      key: 'created_date'
    },
    {
      title: '操作',
      slot: 'action',
      width: 150,
      align: 'center'
    }
  ]
  tableData: Array<object> = []
  modal = false
  formInline = {
    name: '',
    password: '',
    status: '1',
    phone: ''
  }
  mounted() {
    this.init()
  }
  private init() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this
    axios.get('http://192.168.0.106:3000/user').then((response: any) => {
      console.log(89, response)
      _this.tableData = response.data
    })
  }
  private show(row: object) {
    this.modal = true
    this.formInline = JSON.parse(JSON.stringify(row))
  }
  private submit() {
    const obj = this.$qs.stringify(this.formInline)
    axios
      .put('http://192.168.0.106:3000/user/' + this.formInline._id, obj)
      .then(() => {
        this.init()
      })
  }
  private cancel() {
    this.$Message.info('取消')
  }
  private deleteRow(row) {
    axios
      .delete('http://192.168.0.106:3000/user/' + row._id)
      .then(() => {
        this.init()
      })
  }
}
</script>
<style scoped>
.home {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
