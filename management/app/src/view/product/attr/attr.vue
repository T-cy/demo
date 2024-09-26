<template>
<Catagory @send-all="reaceieveAll" @send-paramsArr="receieveParamsArr" @send-c3id="receieveC3id"  :showDiasble="screen"    :upload="upload" ></Catagory>

<el-card style="margin-top: 20px;width: 98%;"  >
  <div   v-if="screen==true">
      <el-button type="primary" icon="Plus" @click="showChange" :disabled="disable">添加属性(下面接口请求速度超级慢)</el-button>

      <el-table border style="width: 100%;margin-top: 10px;" :data="paramsArr">
          <el-table-column prop="date" label="序号" type="index" width="80" align="center" />

          <el-table-column prop="attrName" label="属性名称" width="120" align="center"/>

          <el-table-column prop="address" label="属性值名称"  align="center" >
              <template #="{row}">
                <el-tag style="margin: 2px 5px;" v-for="item in row.attrValueList" :key="item.id">{{ item.valueName }}</el-tag>
              </template>
          </el-table-column>

          <el-table-column prop="address" label="操作" width="120" align="center" >
                <template #="{row,$index}">
                  <el-button type="primary" icon="Edit" size="small"  @click="updateAttr(row)"></el-button>
                    <!-- 气泡框 -->
                  <el-popover  placement="top" :width="250">
                        <p>你确定要删除这一个属性吗？</p>
                        <div style="text-align: right; margin: 0">
                          <el-button size="small" text >取消</el-button>
                          <el-button size="small" type="primary" @click="removeAttr(row.id)">
                            确认
                          </el-button>
                        </div>
                        <template #reference>
                          <el-button type="primary" icon="Delete" size="small"   ></el-button>
                        </template>
                  </el-popover>     
                </template>

            </el-table-column>
      </el-table>
  </div>
  <div v-else>
    <el-form :inline="true" label-width="80px" :model="attrParams">
        <el-form-item label="属性名称">
            <el-input placeholder="请输入属性名" v-model="attrParams.attrName"></el-input>
        </el-form-item>
    </el-form>
    <el-button type="primary" icon="Plus" @click="AddParams" :disabled="attrParams.attrName?false:true">添加属性</el-button>
    <el-button type="primary" @click="CancleAdd">取消</el-button>
    <el-table  border="true" style="width: 98%;margin:10px 10px;" :data="attrParams.attrValueList">
        <el-table-column type="index" label="序号" width="80px" align="center">
        </el-table-column>
        <el-table-column label="属性值名称" align="center">
            <template #="{row,$index}">
              <el-input   v-if="row.flag"  v-model="row.valueName"  placeholder="请你输入新增的属性值"  @blur="InputBulr(row.valueName,$index)"></el-input>
              <div  @click="showInput($index)"  v-else> {{ row.valueName }} </div>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="120px" align="center">
            <template #="{row}">
                <el-button type="primary" icon="Delete"  @click="deleteInput(row)"></el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-button type="primary" @click="saveParams" :disabled="saveflag">保存</el-button>
    <el-button type="primary" @click="CancleAdd">取消</el-button>
</div>
</el-card>


</template>

<script setup lang="ts">
import { ref } from 'vue'
import { reqAddOrUpdateAttr,reqDeleteAttr } from '../../../api/product/attr/index'

let cid1=ref('')
let cid2=ref('')
let cid3=ref('')


//组件间的通信
let disable=ref('true')
let paramsArr=ref([])
let reaceieveAll=(value:any)=>{
  disable.value=value
}
let receieveParamsArr=(value:any)=>{
  paramsArr.value=value
  // console.log(1111111,paramsArr.value);
}
let receieveC3id=(value:any)=>{
  attrParams.value.categoryId=value
}

let upload=ref(false)




// 组件的显示与隐藏

let saveflag=ref(true)

let screen=ref(true)

let showInput=(index)=>{
  attrParams.value.attrValueList[index].flag=true
}


let InputBulr=(value,index)=>{
  if(value.trim()==''){
    ElMessage({
      type:'error',
      message:'输入属性值不能为空'
    })
    saveflag.value=true
    return 
  }
  else{
    saveflag.value=false
    attrParams.value.attrValueList[index].flag=false
  }
  
}



// 收集添加的属性
let attrParams=ref({
  attrName:'',//新增属性名
  attrValueList:[],//新增属性值数组
  categoryId:'',//三级分类的id
  categoryLevel:3,//代表的是三级分类
})


//页面切换
let showChange=()=>{
  screen.value=false
}

//添加属性
let AddParams=()=>{
  //向新增属性数组添加内容
  attrParams.value.attrValueList.push({
    valueName:'',
    flag:true
  })
}

import { ElMessage } from 'element-plus'

//保存新增属性
let saveParams=async()=>{
  if(attrParams.value.attrName.trim()==''){
    saveflag.value=true
    return 
  }
  let res = await reqAddOrUpdateAttr(attrParams.value)
  // console.log(res);
  if(res.code==200){
    screen.value=true
    ElMessage({
      type:'success',
      message:attrParams.value.id?'修改成功':'添加成功'
    })
    attrParams.value.attrName=''
    attrParams.value.attrValueList=[]
    // 这里要重新发路由请求，父亲做标记，传给儿子，当儿子检测到父亲发生变化，立马发请求
    upload.value=!upload.value

  }
  
}
//删除添加
let deleteInput=(row)=>{
  attrParams.value.attrValueList.splice(row,1)
}

//取消添加
let CancleAdd=()=>{
screen.value=true
attrParams.value.attrName=''
attrParams.value.attrValueList=[]
}

//修改品牌属性
let updateAttr=(row)=>{
  screen.value=false
  console.log(row);
  
  //对象合并，获取已有属性的内容
  Object.assign(attrParams.value,JSON.parse(JSON.stringify(row)))
  console.log(row);
}

//删除已有属性
let removeAttr=async(id:number)=>{
  let res=await reqDeleteAttr(id)
  console.log(res);
  if(res.code==200){
    ElMessage({
      type:'success',
      message:'删除成功'
    })
    //重新发路由请求
  upload.value=!upload.value
  }
  else{
    ElMessage({
      type:'error',
      message:'删除失败'
    })
  }
  
}



</script>

<style scoped lang="scss">

</style>