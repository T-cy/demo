<template>

<el-form label-width="120px">
  
  <el-form-item label="SKU名称" >
    <el-input placeholder="SKU名称" v-model="skuParams.skuName"></el-input>
  </el-form-item >

  <el-form-item  label="价格（元）">
    <el-input placeholder="价格（元）"  type="number" v-model="skuParams.price"></el-input>
  </el-form-item>

  <el-form-item  label="总量（克）">
    <el-input placeholder="总量（克）"  type="number" v-model="skuParams.weight"></el-input>
  </el-form-item>  

  <el-form-item  label="SKU描述">
    <el-input type="textarea" placeholder="SKU描述" v-model="skuParams.skuDesc"></el-input>
  </el-form-item>  

<!-- 销售属性的id和销售属性值的id是要传给服务器的，而且这两个值只能够在下拉框里面收集，
在el-option标签里面的:value来收集，还有的就是要想真正获取这两个值,只能在v-select标签里面的v-model='xxx'，这个xxx才是最终收集到需要的属性的地方 -->
  <el-form-item label="平台属性" >
    <el-form :inline="true"  class="form_flex" label-width="80px">
        <el-form-item :label="item.attrName" v-for="item in attrArr" :key="item.id">
          <el-select  :placeholder="item.attrName"  style="width:200px;" v-model="item.attrIdANDValueId">
              <el-option  :label="item1.valueName" v-for="item1 in item.attrValueList" :key="item1.id" :value="`${item.id}:${item1.id}`" >
              </el-option>
          </el-select>          
        </el-form-item>  
    </el-form>
  </el-form-item>

  <el-form-item label="销售属性" >
        <el-form :inline="true"  class="form_flex" label-width="80px">
        <el-form-item :label="item.saleAttrName" v-for="item in saleArr" :key="item.id">
          <el-select  :placeholder="item.saleAttrName"  style="width:200px;"  v-model="item.saleIdANDValueId">
              <el-option  :label="item1.saleAttrValueName" v-for="item1 in item.spuSaleAttrValueList" :key="item1.id" :value="`${item.id}:${item1.id}`" >
              </el-option>
          </el-select>          
        </el-form-item>  
    </el-form>
  </el-form-item>
 
  <el-form-item label="图片名称">
    <el-table  style="width: 100%" border :data="imgArr" ref="table">
        <el-table-column prop="prop" type="selection" width="80px" align="center">
        </el-table-column>
        <el-table-column  label="图片" header-align="center" align="center">
            <template #="{row}">
              <div style="width: 100px;height:100px">
                  <img :src="row.imgUrl" alt="" style="width: 100%;height:100%">
              </div>
            </template>
        </el-table-column>
        <el-table-column prop="imgName" label="名称" header-align="center">
        </el-table-column>        
        <el-table-column prop="prop" label="操作" width="180px" align="center">
            <template #="{row}">
              <div>
                <el-button type="primary" icon="Edit" @click="handler(row)" >设置默认</el-button>
              </div>
            </template>          
        </el-table-column>      
    </el-table>
  </el-form-item>
  
  <el-form-item style="margin: 10px 0;" label-width="120px">
          <el-button type="primary" @click="save" >保存</el-button>  
          <el-button type="plain" @click="changeScence">取消</el-button>
  </el-form-item>  
</el-form>


</template>

<script lang="ts" setup>
import { ref,onMounted} from 'vue'
import { reqAttr } from '../../../api/product/attr/index'
import {reqImageList, reqSpuHasSaleAttr,reqAddSku} from '../../../api/product/spu/index'
import { type SkuData } from '../../../api/product/spu/type'

// import { reqSpuHasSaleAttr} from '../../../api/product/spu/index'
//自定义事件
const emit =  defineEmits(['changeScence2'])
//父亲组件通信
const props=defineProps(['req_flag2','Spu2Arr','c3id','c2id','c1id'])

//接收父亲传过来的spu数据
let Spu2=ref()
Spu2.value=props.Spu2Arr

//导航栏的id
let c3id=ref()
c3id.value=props.c3id
let c2id=ref()
c2id.value=props.c2id
let c1id=ref()
c1id.value=props.c1id

//收集sku的参数
let skuParams=ref<SkuData>({
    category3Id: '',//三级分类id
    spuId: '',//已有的spu的id
    tmId: '',//品牌的id
    skuName: '',//新增的sku的名字
    price: '',//新增的sku价格
    weight: '',//新增sku的重量
    skuDesc: '',//新增sku的描述
    skuAttrValueList: [],//平台属性
    skuSaleAttrValueList: [],//销售属性
    skuDefaultImg: '',//sku图片的地址
})




//取消按钮的回调
let changeScence=()=>{
  emit('changeScence2',0)
}

//接收网络请求回来的数据
//平台属性
let attrArr=ref<any>([])
//商品的销售属性
let saleArr=ref<any>([])
//商品照片墙
let imgArr=ref<any>([])



//收集数据
let getSkuData=()=>{
  skuParams.value.category3Id=Spu2.value.category3Id
  skuParams.value.spuId=Spu2.value.id
  skuParams.value.tmId=Spu2.value.tmId
}


//初始化收集数据 
let init=async()=>{
//收集数据
 getSkuData()

//网络请求  
//分类下商品的属性
let res_params:any=await reqAttr(c1id.value,c2id.value,c3id.value)
if(res_params.code==200){
  attrArr.value=res_params.data
}
//某个商品的属性
let res_sale=await reqSpuHasSaleAttr(Spu2.value.id)
if(res_sale.code==200){
  saleArr.value=res_sale.data
}
//照片墙
let res_img=await reqImageList(Spu2.value.id)
if(res_img.code==200){
  imgArr.value=res_img.data
}
}

//获取照片table组件
let table=ref<any>()

//设置默认图片方法的回调
let handler=(row:any)=>{
  // console.log(table.value);
  //只能选一个，不能选全部，排他
  imgArr.value.map(()=>{
    table.value.clearSelection()
  })
  //复选框选中
  table.value.toggleRowSelection(row,true)
  skuParams.value.skuDefaultImg=row.imgUrl
  
}

//保存按钮,整合数据发路由请求
//平台属性合并
let attrCombine=()=>{
  skuParams.value.skuAttrValueList=attrArr.value.map((item:any)=>{
    //如果attrIdANDValueId存在
    if(item.attrIdANDValueId){
      let [attrId,valueId]=item.attrIdANDValueId.split(":")
      return {
        attrId,
        valueId
      }
    }
  })
}
// 销售属性合并
let saleCombine=()=>{
  skuParams.value.skuSaleAttrValueList=saleArr.value.map((item:any)=>{
    //如果attrIdANDValueId存在
    if(item.saleIdANDValueId){
      let [saleAttrId,saleAttrValueId]=item.saleIdANDValueId.split(":")
      return {
        saleAttrId,
        saleAttrValueId,
      }
    }
  })
}
import { ElMessage } from 'element-plus'

let save=async()=>{
  //整理参数
  //平台属性
  attrCombine()
  //销售属性
  saleCombine()
   console.log(skuParams.value);
  

  //发路由请求
  let res=await reqAddSku(skuParams.value)
  //这里接口一直是201，不知道为什么
  if (res.code==200) {
    ElMessage({
      type:'success',
      message:'添加成功'
    })

  }
  // else{
  //   ElMessage({
  //     type:'error',
  //     message:'添加失败'
  //   })
  // }
      //返回场景0
  emit('changeScence2',0)
  console.log(res);
  
}





onMounted(()=>{
    init()
})




</script>

<style scoped lang="scss">

</style>