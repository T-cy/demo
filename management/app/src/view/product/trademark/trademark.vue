<template>
 <el-card style="width: 98%;overflow-y:auto; ">
    <!-- 添加按钮 -->
    <el-button type="primary"icon="plus" style="margin-bottom: 10px;" @click="addTrade">添加品牌</el-button>
    <!-- 表格组件 -->
    <el-table  style="width: 100%" border :data="trademarkARR" >
        <el-table-column width="80px" label="序号" align="center" type="index" >
        </el-table-column>
        <el-table-column  label="品牌名称" align="center"  prop="tmName">
        </el-table-column>
        <el-table-column  label="品牌LOGO"  align="center" prop="logoUrl">
          <template #="{row}">
            <img :src="row.logoUrl" alt="" style="width: 100px;height:100px">
          </template>
        </el-table-column>
        <el-table-column  label="品牌操作" align="center">
          <template #="{row}">
            <el-button type="primary" icon="Edit" size="small"  @click="updateTrade(row)"></el-button>
            
              <!-- 气泡框 -->
                <el-popover  placement="top" :width="250">
                  <p>你确定要删除这一个品牌吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="small" text >取消</el-button>
                    <el-button size="small" type="primary" @click="removeTrade(row.id)">
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
    <!-- 分页器 -->
    <!-- current-page当前页数
    page-size设置每一页数据展示数据的条数
    page-sizes	每页显示个数选择器的选项设置 -->

      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[3,5,7,9]"
        :background="true"
        layout="prev,pager,next,jumper,->,sizes, total"
        :total="total"
        @current-change="changeCurrent"
        @size-change="changeSize"
       />
  </el-card>


<!-- 对话框 -->
<!-- v-model决定着对话框是显示还是隐藏 -->
<el-dialog v-model="dialogFormVisible" :title="trademarkParams.id?'修改品牌':'添加品牌'" width="600">
  <el-form ref="form" style="width: 80%;"  :model="trademarkParams" :rules="rules" Ref="ruleFormRef">
      <el-form-item label="品牌名称" label-width="100px"   prop="tmName">
        <el-input  placeholder="请输入品牌的名称" v-model="trademarkParams.tmName" ></el-input>
      </el-form-item>

      <el-form-item label="品牌LOGO" label-width="100px" prop="logUrl">
        <!-- upload是上传文件的组件，其中action是图片上传的路径（也就是图片上传到的地址），需要携带/api 
        before-upload	上传文件之前的钩子，参数为上传的文件， 若返回false或者返回 Promise 且被 reject，则停止上传。在 before-upload 钩子中限制用户上传文件的格式和大小。
      -->
         <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          >
          <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
  </el-form-item>
  </el-form>
  <template #footer>
    <el-button type="primary" @click="cancel">取消</el-button>
    <el-button type="primary" @click="confirm">确认</el-button>
  </template>
</el-dialog>



</template>

<script setup lang="ts">
import { ref,onMounted,reactive,nextTick } from 'vue'
import { reqHasTrademark,reqAddOrUpdateTrademark,reqDeleteTrademark } from '../../../api/product/trademark/index'
import { type Records} from '../../../api/product/trademark/type'


//当前页面
let pageNo=ref<number>(1)
// 每一页展示多少条数据
let limit=ref<number>(3)
//总共的数据
let total=ref<number>(0)

//存储已有品牌的数据
let trademarkARR=ref<Records>([])

//分页器页码发生变化
let changeCurrent=()=>{
  //当页码发生变化的时候，再次发送路由请求获取新的数据展示
   HasTrademark()
}
//分页器页数发生变化
let changeSize=()=>{
  HasTrademark()
}

// 对话框的显示与隐藏
let dialogFormVisible=ref<boolean>(false)

//添加品牌
let addTrade=()=>{
  dialogFormVisible.value=true
}


// 新增品牌收集的数据
let trademarkParams= reactive({
  tmName:'',
  logoUrl:'',
})

// 添加品牌名的自定义表单校验
const tmNamePass = (_:any, value: any, callback: any) => {
  if (value) {
    callback()
  } else {
   callback(new Error('输入内容不能为空'))
  }
}
// 添加品牌照片的自定义表单校验
const logUrlPass = (_:any, value: any, callback: any) => {
  if (value) {
    callback()
  } else {
   callback(new Error('必须上传图片文件'))
  }
}

//获取from表单的组件实例
let ruleFormRef=ref({
  tmName:'',
  logUrl:''
})


//表单校验
let rules={
  tmName:[{
    required: true,
    trigger: 'blur',
    validator: tmNamePass,
  }],
  logUrl:[{
    required: true,
    trigger: 'blur',
    validator: logUrlPass,
  }]
}




//修改品牌
let updateTrade=(row:any)=>{
    // nextTick(()=>{
    //   ruleFormRef.value.clearValidate('tmName')
    //   ruleFormRef.value.clearValidate('logUrl')
    // }) 
  dialogFormVisible.value=true
  //展示已有品牌的数据
  trademarkParams.tmName=row.tmName
  trademarkParams.logoUrl=row.logoUrl
  trademarkParams.id=row.id
  //  HasTrademark()
}



import { ElMessage, type UploadProps } from 'element-plus'
//上传图片限制，这个钩子是在图片上传成功之前触发的
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
//  console.log(rawFile);
 //图片一定是图片的格式
 if(rawFile.type=='image/jpeg'||rawFile.type=='image/png'||rawFile.type=='image/gif'){
  // 大小限制，小于5m才能上传
  if(rawFile.size/1024/1024<5){
      return true
    }
    else{
       ElMessage({
        type:'error',
        message:'上传的文件大小不能超过5mb'
      })
      return false
    }
 }
 else{
  ElMessage({
    type:'error',
    message:'上传的文件只能是图片.jpeg、.png、.gif的格式'
  })
  return false
 }
}

//图片上传成功的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response,uploadFile) => {
  // console.log(response);
  // 收集上传照片的地址
  trademarkParams.logoUrl=response.data
}


//对话框隐藏,点击上传取消
let cancel=()=>{

      //清空数据
    trademarkParams.tmName=''
    trademarkParams.logoUrl=''
     trademarkParams.id=0
  dialogFormVisible.value=false
}
//上传确认
let confirm=async()=>{
  try {
    
    
    //在发路由请求之前，对表单进行校验,只有校验通过才能够发请求
  // await ruleFormRef.value.validate()
    
  let res=await reqAddOrUpdateTrademark(trademarkParams)
  // console.log(res);
  // console.log(111111111,res);
  
  if (res.code==200) {
    ElMessage({
      type:'success',
      message:trademarkParams.id?'修改成功':'添加成功'
    })
    dialogFormVisible.value=false
    //清空数据
    trademarkParams.tmName=''
    trademarkParams.logoUrl=''
    trademarkParams.id=0
    //添加成功，再次发路由请求，获取新的已有品牌的数据
    HasTrademark()
  }else{
    ElMessage({
    type:'error',
    message:trademarkParams.id?'修改失败':'添加失败'
  })
    dialogFormVisible.value=false
  }
  } catch (error:any) {
    console.log(error.message);
    
    ElMessage({
    type:'error',
    message:"添加失败"
  })
  }
}


// 气泡框
// const visible = ref(false)

//删除已有商品
let removeTrade=async(id:number)=>{
let res=await reqDeleteTrademark(id)
if (res.code==200) {
  ElMessage({
    type:'success',
    message:"删除成功"
  })
  HasTrademark()
}else{
  ElMessage({
    type:'error',
    message:"删除失败"
  })
}

}




const HasTrademark:any=async()=>{
  let res=await reqHasTrademark(pageNo.value,limit.value)
  // console.log(res);
  if(res.code==200){
    total.value=res.data.total
    trademarkARR.value=res.data.records
  }
}

onMounted(() => {
  HasTrademark()
})
</script>

<style scoped lang="scss">

.avatar-uploader-icon{
  border:1px dashed #ccc
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>