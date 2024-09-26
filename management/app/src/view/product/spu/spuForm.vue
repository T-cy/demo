<template>
  <!-- 场景1：添加新的spu和修改已有的spu -->
  <el-form :model="Spu1Params">
      <el-form-item label="SPU名称" label-width="120px">
        <el-input  placeholder="请输入SPU名称" v-model="Spu1Params.spuName"></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌" label-width="120px">
        <el-select  placeholder="请选择品牌" style="width: 200px;" v-model="Spu1Params.tmId">
            <el-option v-for="item in Spu1_TrademarkList" :key="item.id" :label="item.tmName" :value="item.id">
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述" label-width="120px" >
        <el-input type="textarea" placeholder="请输入描述" v-model="Spu1Params.description"></el-input>
      </el-form-item>
      <el-form-item label="SPU照片" label-width="120px">
          <template #="{row}">
                <el-upload
                  v-model:file-list="Spu1_ImageList"
                  action="/api/admin/product/fileUpload"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                >
                  <el-icon><Plus /></el-icon>
                </el-upload>

                <el-dialog v-model="dialogVisible">
                  <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>     
          </template>
      </el-form-item>
      <el-form-item label="SPU销售属性" label-width="120px">
            <el-select  placeholder="请选择品牌" style="width: 200px;" v-model="addSaleAttrValueName">
                <el-option v-for="item in Spu1_AllSpu" :key="item.id" :label="item.name" :value="`${item.id}:${item.name}`">
                </el-option>
            </el-select>
            <el-button :disabled="addSaleAttrValueName?false:true" type="primary" icon="Plus" style="margin-left: 10px;"  @click="addSaleAttr">添加属性值</el-button> 
            <el-table :data="Spu1_SaleList" :border="true" style="width: 98%;margin-top: 10px;">
                      <el-table-column prop="prop" label="序号" width="80px" align="center" type="index">
                      </el-table-column> 
                      <el-table-column prop="saleAttrName" label="属性名" align="center" width="240px">
                      </el-table-column>
                      <el-table-column  label="属性值" >
                        <template  #="{row}">
                              <el-tag  @close="removevaluelist(row.spuSaleAttrValueList,index)" v-for="tag,index in row.spuSaleAttrValueList" :key="tag.id" closable style="margin: 0 5px;" >
                                {{ tag.saleAttrValueName }}
                              </el-tag>     
                              <el-input v-model="row.newAddValue" v-if="row.flag==true"  @blur="tolook(row)"  placeholder="请你输入新增属性值" size="small"></el-input>
                              
                              <el-button @click="changeclick(row)" v-else type="primary" icon="Plus" size="small" style="margin: 0 5px;"></el-button>     
                        </template>
                      </el-table-column>
                      <el-table-column label="操作" align="center" width="120px">
                          <template #="{row,$index}">
                            <div>
                              <el-button type="primary" icon="Delete" @click="Spu1_SaleList.splice($index,1)"></el-button>
                            </div>
                          </template>
                      </el-table-column>
            </el-table>                 
      </el-form-item>
      <el-form-item style="margin: 10px 0;" label-width="120px">
              <el-button type="primary" @click="save">保存</el-button>  
              <el-button type="plain" @click="cancle">取消</el-button>
      </el-form-item>
      
  </el-form>
</template>

<script lang="ts" setup>
import { ref} from 'vue'
import { onMounted,computed } from 'vue'
import { reqAllTrademark,reqImageList, reqSpuHasSaleAttr,reqAllSaleAttr,reqAddOrUpdate} from '../../../api/product/spu/index'
import { type spuSaleAttrValueList, type TradeMark,type SpuImage,type HasSaleAttrResponData } from '../../../api/product/spu/index'



//自定义事件
const emit =  defineEmits(['changeScence1','update0'])
//取消新增，返回场景0
let cancle=()=>{
  emit('changeScence1',0)
  initSpu()
}
//父亲组件传数据给儿子
let props=defineProps(['Spu0Arr','init','c3id'])


//收到来自父组件的spu数据
let Spu1=ref<spuSaleAttrValueList>()
Spu1.value=props.Spu0Arr
//所有品牌的列表
let Spu1_TrademarkList=ref<TradeMark>([])
//照片墙
let Spu1_ImageList=ref<SpuImage>()
//已有属性的销售属性
let Spu1_SaleList=ref([])
//全部spu属性
let Spu1_AllSpu=ref<HasSaleAttrResponData>()

//定义一个大数组，里面放置已有spu的全部信息
let Spu1Params=ref({
  //三级分类的id
  category3Id:'',
  //spu的名字
  spuName:'',
  //描述
  description:'',
  //品牌的id
  tmId:'',
  //照片墙
  spuImageList:[],
  //销售属性
  spuSaleAttrList:[]
})

//照片墙
//控制照片框的显示和隐藏
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

// 点击图片放大预览
const handleRemove= (uploadFile:any, uploadFiles:any) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview= (uploadFile:any) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}


// 网络请求
let AllTrademark=async()=>{
  Spu1Params.value=Spu1.value
  //获取全部品牌
  let res_all=await reqAllTrademark()
  if(res_all.code==200){
    Spu1_TrademarkList.value=res_all.data
  }
  //获取照片墙
  let res_img=await reqImageList(Spu1.value.id)
  if(res_img.code==200){
    //因为照片墙的参数和接口的数据不一样
    Spu1_ImageList.value=res_img.data.map((item)=>{
      return {
        name:item.imgName,
        url:item.imgUrl
      }
    })
  }
  //获取已有属性的销售属性
  let res_sale=await reqSpuHasSaleAttr(Spu1.value.id)
  if(res_sale.code==200){
    Spu1_SaleList.value=res_sale.data
  }
  //获取整个项目的spu销售属性
  let res_allSpu=await reqAllSaleAttr()
  if(res_allSpu.code==200){
    Spu1_AllSpu.value=res_allSpu.data
  }

}


let UnSelectItem=[]
//计算出当前Spu未拥有的销售属性（全部的销售属性有三个）
UnSelectItem=computed(()=>{
  //filter 方法如果该函数对于某个元素返回 true，则该元素会被包含在返回的新数组中
  let unSelect=Spu1_AllSpu.value.filter((item1:any)=>{
    return Spu1_SaleList.value.every((item2:any)=>{
      //遍历全部属性三个数组，遍历spu已有的属性数组
      //将两个数组遍历出来的数据进行核对，找到不匹配的，返回true
      // 此时的true返回给外层的filter，然后找到对应的item1
      return item2.saleAttrName!=item1.name
    })
  })
  return unSelect
})
import { ElMessage } from 'element-plus'
//将来添加的新的属性值
let addSaleAttrValueName=ref('')
//添加属性的回调
let addSaleAttr=()=>{
  let [baseSaleAttrId,saleAttrName]=addSaleAttrValueName.value.split(':')

  let newsaleattr={
   baseSaleAttrId:baseSaleAttrId,
   saleAttrName,
   spuSaleAttrValueList:[]
  }
  //追加到数组当中
      ElMessage({
          message: '添加成功',
          type: 'success',
          plain: true,
        })
      Spu1_SaleList.value.push(newsaleattr)   
    //清空输入框
    addSaleAttrValueName.value=''
}

//新增属性显示与隐藏输入框
let changeclick=(row)=>{
  // console.log(row);
  row.flag=true
  //点击后新增新的属性用来手机输入框内容
  row.newAddValue=''
}

//输入框失去焦点
let tolook=(row)=>{

  const {baseSaleAttrId,newAddValue}=row
  
  let newSalevalueList={
    baseSaleAttrId:baseSaleAttrId,
    saleAttrValueName:newAddValue
  }
  // console.log(newSalevalueList);
  if(newSalevalueList.saleAttrValueName.trim()=='') {
    ElMessage({
      type:'error',
      message:'属性值不能为空'
    })
    return
  }
  // 属性值不能重复
  let repeat=row.spuSaleAttrValueList.find(item=>{
    return item.saleAttrValueName==newSalevalueList.saleAttrValueName
  })
  if(repeat){
        ElMessage({
          type:'error',
          message:'属性值不能重复'
        })
    return 
  }
  
  row.spuSaleAttrValueList.push(newSalevalueList)
    row.flag=false
}

//点击标签删除
let removevaluelist=(item,index)=>{
  item.splice(index,1)
}


//点击保存
let save=async()=>{
  //整理参数，把全部参数合并
  // 1、照片墙数据,注意参数要重新处理参数
  Spu1Params.value.spuImageList=Spu1_ImageList.value.map(item=>{
    return{
      imgName:item.name,
      //如果是新增属性，那么图片为新增的地址，否则为原本图片的地址
      imgUrl:(item.response&&item.response.data)||item.url
    }      
  })
  //2、销售属性
  Spu1Params.value.spuSaleAttrList=Spu1_SaleList.value
  //发请求
  
  let res=await reqAddOrUpdate(Spu1Params.value)
  if(res.code==200){
    //返回场景0
    emit('changeScence1',0)

    ElMessage({
      type:'success',
      message:Spu1Params.value.id?'修改成功':'添加成功'
    })
    initSpu()
  }
  else{
    ElMessage({
      type:'errror',
      message:Spu1Params.value.id?'修改失败':'添加失败'
    })
  }
  
}


//点击添加新的spu初始化
let initSpu=async()=>{
  //获取所有的品牌数据
    //获取全部品牌
    //清空数组

  Object.assign(Spu1Params.value,{
          //三级分类的id
          category3Id:'',
          //spu的名字
          spuName:'',
          //描述
          description:'',
          //品牌的id
          tmId:'',
          //照片墙
          spuImageList:[],
          //销售属性
          spuSaleAttrList:[]
    })
    Spu1Params.value.id=null
  Spu1Params.value.category3Id=props.c3id
  Spu1_ImageList.value=[]
  Spu1_SaleList.value=[]
  let res_all=await reqAllTrademark()
  if(res_all.code==200){
    Spu1_TrademarkList.value=res_all.data
  }
 
  //获取整个项目的spu销售属性
  let res_allSpu=await reqAllSaleAttr()
  if(res_allSpu.code==200){
    Spu1_AllSpu.value=res_allSpu.data
  }
  // console.log(1111111111, Spu1Params.value.category3Id);
  
}


onMounted(() => {
  initSpu()
  AllTrademark()
  Spu1_ImageList.value=[]
  Spu1_SaleList.value=[]
  // initSpu()
  Spu1Params.value.category3Id=props.c3id

})



</script>

<style scoped lang="scss">

</style>