<template>
  <el-card>
      <el-form  label-width="80px" :inline="true" class="from">
          <el-form-item label="职位搜索">
            <el-input  placeholder="请你输入搜索职位关键字" v-model="keyword" ></el-input>
          </el-form-item>
          <el-form-item label="">
              <el-button type="primary" :disabled="keyword.trim().length>0?false:true"  @click="search">搜索</el-button>
              <el-button  @click="reset">重置</el-button>
          </el-form-item>
      </el-form>
  </el-card>

  <el-card style="margin-top: 20px;width:98%">
      <el-button type="primary" icon="Plus" @click="addRole">添加职位</el-button>
      <!-- //表格展示用户的信息 -->
      <el-table border="true" style="margin-top: 20px;width:98%" :data="allRole">
          <el-table-column header-align="center"  show-overflow-tooltip   type="index" align="center"  label="#" width="80px">
          </el-table-column>
          <el-table-column header-align="center"  show-overflow-tooltip align="center" prop="id" label="ID" >
          </el-table-column>
          <el-table-column header-align="center" show-overflow-tooltip  align="center" prop="roleName" label="角色名称" >
          </el-table-column>
          <el-table-column header-align="center"  show-overflow-tooltip align="center" prop="createTime" label="创建时间" >
          </el-table-column>
          <el-table-column header-align="center"  show-overflow-tooltip align="center" prop="updateTime" label="更新时间" >
          </el-table-column>
          <el-table-column header-align="center"   align="center" prop="prop" label="操作" width="330px" fixed="right">
            <template #="{row}">
              <div>
                <el-button @click="setPermession(row)" type="primary" icon="User" size="small">分配权限</el-button>
                <el-button @click="updateRole(row)" type="primary" icon="Edit" size="small">编辑</el-button>
                <el-button @click="deleteRole(row)" type="primary" icon="Delete" size="small">删除</el-button>
              </div>
            </template>
          </el-table-column>
      </el-table>

      <el-pagination  style="margin: 20px 0; width:99%" background="true"
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10,20,30,40]"
      layout="prev, pager, next,->,sizes,total"
      :total="pageTotal"
      @size-change="getDate"
      @current-change="getDate"
   		 />       
  </el-card>


  <!-- 添加职位与更新职位的对话框 -->
  <el-dialog :title="RoleParams.id?'更新职位':'添加职位'" v-model="dialogVisible" width="500px">
      <el-form :model="RoleParams" :rules="rules" ref="From"> 
          <el-form-item label="职位名称" prop="roleName">
              <el-input placeholder="请你输入职位名称" v-model="RoleParams.roleName" ></el-input>
          </el-form-item>
      </el-form>
          <template #footer>
              <div style="flex: auto">
                <el-button @click="cancelClick">取消</el-button>
                <el-button type="primary" @click="confirmClick">确定</el-button>
              </div>
          </template>
  </el-dialog>

<!-- 抽屉组件，用来分配用户的菜单权限与按钮的权限 -->
  <el-drawer v-model="drawer" :direction="direction">
    <template #header>
      <h4>分配权限</h4>
    </template>
    <template #default>
      <div>
        <!-- 树形控件 -->
          <el-tree
            style="max-width: 600px"
            :data="menuArr"
            show-checkbox
            node-key="id"
            :default-expand-all="true"
            :default-checked-keys="selectArr"
            :props="defaultProps"
            ref="tree"
          />        
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelDrawer">取消</el-button>
        <el-button type="primary" @click="confirmDrawer">确认</el-button>
      </div>
    </template>
  </el-drawer>



</template>

<script lang="ts" setup>
import { ref,onMounted,nextTick } from 'vue'
import { reqAllRoleList ,reqAddOrUpdateRole,reqAllMenuList,reqSetPermission,reqRemoveRole} from '../../../api/acl/role/index'
import { ElMessage } from 'element-plus'
//分页器
let pageNo=ref(1)
let pageSize=ref(10)
let pageTotal=ref(0)
//关键词
let keyword=ref('')
//存储全部已有的职位
let allRole=ref([])
//控制对话框的显示和隐藏
let dialogVisible=ref(false)
//收集新增岗位的数据
let RoleParams=ref({
  roleName:''
})
//获取表单这一个实例
let From=ref()
//抽屉的响应式数据
let drawer=ref(false)
//存储用户的权限
let menuArr=ref([])
//数组用于存储勾选的节点的ID
let selectArr=ref<any>([])
//获取树形控件的实例
let tree=ref()



//路由请求获取全部数据
let getDate=async(pager=1)=>{
pageNo.value=pager
let res=await reqAllRoleList(pageNo.value,pageSize.value,keyword.value) 
if(res.code==200){
  pageTotal.value=res.data.total
  allRole.value=res.data.records
}
}

//点击搜索的回调
let search=()=>{
  getDate()
}
//重置按钮
let reset=()=>{
  keyword.value=''
  getDate()
}
//添加职位
let addRole=()=>{
  dialogVisible.value=true
   //清空数据
 Object.assign(RoleParams.value,{
    roleName:''
  })
  nextTick(()=>{
    From.value.clearValidate()
  })
}
//添加职位取消
let cancelClick=()=>{
dialogVisible.value=false
 //清空数据
 Object.assign(RoleParams.value,{
    roleName:'',
    id:0
  })
}
//添加职位确定
let confirmClick=async()=>{
      //表单校验
    await From.value.validate();
    let res=await reqAddOrUpdateRole(RoleParams.value)
    if(res.code==200){
      ElMessage({
        type:'success',
        message:RoleParams.value.id?'更新成功':'添加成功'
      })
  }
   else{
      ElMessage({
        type:'error',
        message:RoleParams.value.id?'更新失败':'添加失败'
      })
 }
 getDate(RoleParams.value.id?pageNo.value:1)
 //清空数据
 Object.assign(RoleParams.value,{
    roleName:'',
    id:0
  })
  dialogVisible.value=false
  
}
//添加或者更新表单校验的验证
const validateRolename = (_: any, value: any, callback: any) => {  
  //输入内容不为空且长度大于2，放行
  if (value.trim().length>=2) {
    callback()
  } else {
    callback(new Error('职位名称不能少于2位'))
  }
}
let rules={
  roleName:[{required:true,trigger:'blur',validator:validateRolename}]
}

//更新已有职位的回调
let updateRole=(row:any)=>{
  dialogVisible.value=true
  Object.assign(RoleParams.value,row)
}


//筛选出原本属性中勾选
let filterSelectArr=(allDatae:any,initArr:any)=>
{
  // console.log(allDatae);
  
  allDatae.forEach((item:any) => {
    if(item.select&&item.level==4){
       initArr.push(item.id)
    } 
    if(item.children&&item.children.length>0){
      filterSelectArr(item.children,initArr)
    }
    // console.log(initArr);
    
  });
  return initArr
}

//分配权限
let setPermession=async(row:any)=>{
  drawer.value=true
  Object.assign(RoleParams.value,row)
  let res=await reqAllMenuList(row.id)
  // console.log(res);
  if(res.code==200){
    menuArr.value=res.data
    // console.log(filterSelectArr(menuArr.value,[]));
    //勾选已有的数据
    selectArr.value=filterSelectArr(menuArr.value,[])
}}


//分配权限取消
let cancelDrawer=()=>{
  drawer.value=false
}
//分配权限确定
let confirmDrawer=async()=>{
  //选中权限的id
  const roleId=RoleParams.value.id
  //选中子节点的id
  let arr=tree.value.getCheckedKeys()
  //半选的id
  let arr1=tree.value.getHalfCheckedKeys()
  // console.log(roleId,arr,arr1);
  //合并全部数据
  let permissionId=arr.concat(arr1)
  let res=await reqSetPermission(roleId,permissionId)
  if(res.code==200){
  ElMessage({
    type:'success',
    message:'分配成功'
  })
}
else{
  ElMessage({
    type:'error',
    message:'分配失败'
  })
}
  drawer.value=false
}

// 树形控件内容
const defaultProps = {
  children: 'children',
  label: 'name',
}

//删除职位
let deleteRole=async(row)=>{
  
let res=await reqRemoveRole(row.id)
console.log(res);

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



onMounted(()=>{
  getDate()
})

</script>


<style scoped lang="scss">
.from{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}

</style>