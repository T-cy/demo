<template>
  <el-card style="height: 80px;width:98%">
      <el-form label-width="80px" :inline="true" class="from">
          <el-form-item label="用户名">
              <el-input  placeholder="请输入用户名" v-model="keyword"></el-input>
          </el-form-item>
          <el-form-item label="" >
              <el-button type="primary" :disabled="keyword?false:true" @click="searchUser">搜索</el-button>
              <el-button @click="resect">重置</el-button>
          </el-form-item>
      </el-form>
  </el-card>

  <el-card style="margin-top: 20px;width:98%">
      <el-button type="primary" @click="addUser">添加用户</el-button>
      <el-button type="danger" @click="deleteAllUser" :disabled="selectIdArr.length>=1?false:true">批量删除</el-button>

      <!-- //表格展示用户的信息 -->
      <el-table border="true" style="margin-top: 20px;width:98%" :data="UserArr" @selection-change="selectChange">
          <el-table-column type="selection" width="60px">
          </el-table-column>
          <el-table-column header-align="center"  show-overflow-tooltip   type="index" align="center"  label="#" width="80px">
          </el-table-column>
          <el-table-column header-align="center"  show-overflow-tooltip align="center" prop="id" label="ID" width="80px">
          </el-table-column>
          <el-table-column header-align="center" show-overflow-tooltip  align="center" prop="username" label="用户名字" width="120px">
          </el-table-column>
          <el-table-column header-align="center"  show-overflow-tooltip align="center" prop="name" label="用户昵称" width="120px">
          </el-table-column>
          <el-table-column header-align="center" show-overflow-tooltip align="center" prop="roleName" label="用户角色" width="120px">
          </el-table-column>
          <el-table-column header-align="center"  show-overflow-tooltip align="center" prop="createTime" label="创建时间" width="120px">
          </el-table-column>
          <el-table-column header-align="center"  show-overflow-tooltip align="center" prop="updateTime" label="更新时间" width="120px">
          </el-table-column>
          <el-table-column header-align="center"   align="center" prop="prop" label="操作" width="330px" fixed="right">
            <template #="{row}">
              <div>
                <el-button @click="setRole(row)" type="primary" icon="User" size="small">分配角色</el-button>
                <el-button @click="updateUser(row)" type="primary" icon="Edit" size="small">编辑角色</el-button>
                <el-button @click="deleteUser(row)" type="primary" icon="Delete" size="small">删除角色</el-button>
              </div>
            </template>
          </el-table-column>
      </el-table>

      <el-pagination  style="margin: 20px 0; width:99%" background="true"
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[5,7,9,11]"
      layout="prev, pager, next,->,sizes,total"
      :total="pageTotal"
      @size-change="getDate"
      @current-change="getDate"
   		 />       
  </el-card>


<!-- 添加用户和修改用户的抽屉 -->
  <el-drawer v-model="drawer" >
      <template #header>
        <h4> {{ userParams.id?"更新用户":"添加用户" }} </h4>
      </template>
      <template #default>
        <div>
            <el-form label-width="80px" :model="userParams" :rules="rules" ref="fromRef">
              <el-form-item label="用户姓名" prop="username">
                  <el-input  placeholder="请输入用户姓名" v-model="userParams.username" ></el-input>
              </el-form-item>
              <el-form-item label="用户昵称" prop="name">
                  <el-input  placeholder="请输入用户昵称"  v-model="userParams.name" ></el-input>
              </el-form-item>
              <el-form-item label="用户密码" prop="password" >
                  <el-input  placeholder="请输入用户密码" v-model="userParams.password" ></el-input>
              </el-form-item>
            </el-form>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">确定</el-button>
        </div>
      </template>
  </el-drawer>


  <!-- 对已有的用户进行职位的分配抽屉 -->
  <el-drawer v-model="drawer2">
      <template #header>
        <h4> 分配角色用户 </h4>
      </template>
      <template #default>
        <div>
            <el-form label-width="80px" >
              <el-form-item label="用户姓名">
                  <el-input  v-model="userParams.username" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="职位列表" >
                <el-checkbox
                  v-model="checkAll"
                  @change="handleCheckAllChange"
                >
                  全选
                </el-checkbox>
                <el-checkbox-group
                  v-model="userRole"
                  @change="handleCheckedCitiesChange"
                >
                  <el-checkbox v-for="city in allRole" :key="city" :label="city" :value="city">
                    {{ city.roleName }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelDrawer2">取消</el-button>
          <el-button type="primary" @click="confirmDrawer2">确定</el-button>
        </div>
      </template>
  </el-drawer>


</template>

<script setup lang="ts">
import { reactive,ref,onMounted,nextTick } from 'vue'
import { reqAllUser ,reqAddOrUpdateUser,reqAllRole,reqSetUserRole,reqDeleteUser,reqDeleteAllUser} from '../../../api/acl/user/index'
import { User } from '../../../api/acl/user/type'
import { ElMessage } from 'element-plus'
//分页器
let pageNo=ref<number>(1)
let pageSize=ref<number>(5)
let pageTotal=ref<number>(0)
//存储用户的全部数组
let UserArr=ref([])
//抽屉数据
let drawer=ref(false)
//分配职位的抽屉
let drawer2=ref(false)

//全选框
let checkAll=ref(false)

//职位数组
let allRole=ref([])
//已选中的复选框
let userRole=ref([])

//收集添加或者更新用户的响应式数据(from表单收集的数据存到这里)
let userParams=ref<User>({
  username: '',
  password: '',
  name:'',
  id:0
})
//获取添加用户from组件实例
let fromRef=ref()

//表单的校验
// 用户名的校验方法
const validateUsername = (_: any, value: any, callback: any) => {  
  //输入内容不为空且长度大于5，放行
  if (value.trim().length>=5) {
    callback()
  } else {
    callback(new Error('用户名字不能少于5位'))
  }
}
// 用户昵称的校验方法
const validateName= (_: any, value: any, callback: any) => {
  //输入内容不为空且长度大于5，放行
  if (value.trim().length>=5) {
    callback()
  } else {
    callback(new Error('用户昵称不能少于5位'))
  }
}
// 用户密码的校验方法
const validatePassword= (_: any, value: any, callback: any) => {
  //输入内容不为空且长度大于5，放行
  if (value.trim().length>=6) {
    callback()
  } else {
    callback(new Error('用户密码不能少于6位'))
  }
}
//规则对象
const rules = reactive({
  username:[
    { required: true, message: '输入不能为空',trigger: 'blur'},
    { validator: validateUsername, trigger: 'blur'}
  ],
  name: [
     { required: true, message: '输入不能为空',trigger: 'blur'},
    { validator: validateName, trigger: 'blur'}
  ],
  password:[
     { required: true, message: '输入不能为空',trigger: 'blur'},
    { validator: validatePassword, trigger: 'blur'}
  ]  
})

//清空用户数据
let clearUser=()=>{
  //清除之前添加的信息
  Object.assign(userParams.value,{
    username: '',
    password: '',
    name:'',
    id:null,
    createTime:'',
    updateTime:''
  })
}

// 分配职位全选框
let handleCheckAllChange=(val:boolean)=>{
  userRole.value=val?allRole.value:[]
  // checkAll.value=true
}
let handleCheckedCitiesChange=()=>{
  checkAll.value=allRole.value.length==userRole.value.length
}



//添加用户
let addUser=()=>{  
  drawer.value=true
  if(userParams.value.id){
    Object.assign(userParams.value,{
    username: '',
    password: '',
    name:'',
    id:null
  })
  }
  else{
    Object.assign(userParams.value,{
    username: '',
    password: '',
    name:'',
  })
  }
  nextTick(()=>{
    fromRef.value.resetFields()
  })
}
//更新用户
let updateUser=(row:any)=>{
  drawer.value=true
  // console.log(row);
  Object.assign(userParams.value,row)
}

//抽屉点击确认添加或者更新
let confirmClick=async()=>{
  //点击保存前，确保验证通过才发请求否则不发请求
 await fromRef.value.validate()
 let res=await reqAddOrUpdateUser(userParams.value)
 if(res.code==200){
  ElMessage({
    type:'success',
    message:userParams.value.id?'更新成功':'添加成功'
  })
  //因为更新了用户，所以正在登录账号的要重新退出登录
  // window.location.reload()
   clearUser()
 }
 else{
  ElMessage({
    type:'error',
    message:userParams.value.id?'更新失败':'添加失败'
  })
  drawer.value=false
 }
 getDate(userParams.value.id?pageNo.value:1)
   //清除之前添加的信息
 
  drawer.value=false
    //添加成功，更新路由页面
  
  
}

//抽屉点击取消关闭
let cancelClick=()=>{
  drawer.value=false
  fromRef.value.resetFields()
  clearUser()
  userParams.value.id=0
}

//分配角色
let setRole=async(row:any)=>{
  drawer2.value=true
  Object.assign(userParams.value,row)
  // 获取全部职位的数组
  let res=await reqAllRole(row.id)
  // console.log(res);
  if(res.code==200){
    //获取全部职位
    allRole.value=res.data.allRolesList
    //获取已有职位
    userRole.value=res.data.assignRoles

  }
}
//删除单个用户
let deleteUser=async(row:any)=>{
  let res=await reqDeleteUser(row.id)
  if(res.code==200){
    ElMessage({
      type:'success',
      message:'删除成功'
    })
    
  }
  else{
    ElMessage({
      type:'error',
      message:'删除失败'
    })     
  }
  getDate(pageNo.value)  
}

//批量删除的id
let selectIdArr=ref<any>([])

//批量删除
let selectChange=(val:any)=>{
  selectIdArr.value=val
  // console.log(selectIdArr.value);
}
let deleteAllUser=async()=>{
  selectIdArr.value=selectIdArr.value.map((item:any)=>{
    return item.id
  })
  let res=await reqDeleteAllUser(selectIdArr.value)
    if(res.code==200){
    ElMessage({
      type:'success',
      message:'删除成功'
    })
    
  }
  else{
    ElMessage({
      type:'error',
      message:'删除失败'
    })     
  }
  getDate(pageNo.value)  
  

  
}


//抽屉2
let cancelDrawer2=()=>{
  drawer2.value=false
}
//抽屉2确认
let confirmDrawer2=async()=>{
  let data:any={
    userId:userParams.value.id,
    roleIdList:userRole.value.map((item:any)=>{
      return item.id
    })
  }
 let res=await reqSetUserRole(data)
  console.log(res);
  if(res.code==200){
    ElMessage({
      type:'success',
      message:'分配职务成功'
    })
    
  }
  else{
    ElMessage({
      type:'error',
      message:'分配职务失败'
    })  
    
  }
  getDate(pageNo.value)  
  
  drawer2.value=false
}

//用户搜索收集的数据
let keyword=ref('')
let searchUser=async()=>{
   getDate()
  //  keyword.value=''
}

//重置
let resect=()=>{
   keyword.value=''
   getDate()
}


//路由请求
let getDate=async(pager=1)=>{
  pageNo.value=pager
  let res:any=await reqAllUser(pageNo.value,pageSize.value,keyword.value)
  // console.log(res);
  if(res.code==200){
    pageTotal.value=res.data.total
    UserArr.value=res.data.records
  }
  // console.log(UserArr.value);
}



onMounted(()=>{
  getDate()
})

</script>

<style scoped lang="scss">
.from{
  display: flex;
  justify-content: space-between;
  align-items: center
}
</style>