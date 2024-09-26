<template>  
  <!-- 顶部导航栏 -->
  <Catagory :SPU_show="disable"  @send-c3id="receieveC3id"   @send-c2id="receieveC2id"  @send-c1id="receieveC1id"/>

  <!-- 底下的card -->
  <el-card style="margin-top: 10px;width:98%">

      <!-- 场景0：页面一开始的显示 -->

      <!-- v-if="scence==0?true:false" -->
      <div  v-if="scence==0?true:false">
            <!-- 按钮 -->
            <el-button @click="addSpu" type="primary" icon="Plus" :disabled="c3id?false:true">添加SPU</el-button>
            <!-- 表格 -->
            <el-table border style="width: 100%;margin-top: 10px;" :data="Record">
                      <el-table-column  label="序号" type="index" width="80" align="center" />

                      <el-table-column prop="spuName" label="SPU名称" width="120" />

                      <el-table-column prop="description" label="SPU描述"   >
                          
                      </el-table-column>

                      <el-table-column  label="SPU操作" width="240"  >
                            <template #="{row}">
                              <el-button  @click="addSku(row)"  type="primary" icon="Plus" size="small" ></el-button>
                              <el-button  @click="updateSpu(row)" type="primary" icon="Edit" size="small" ></el-button>
                              <el-button  @click="findSku(row)" type="primary" icon="Odometer" size="small" ></el-button>
                                <!-- 气泡框 -->
                              <el-popover  placement="top" :width="250">
                                    <p>你确定要删除这一个属性吗？</p>
                                    <div style="text-align: right; margin: 0">
                                      <el-button size="small" text >取消</el-button>
                                      <el-button  @click="deleteSpu(row)" size="small" type="primary">
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
            <!-- 底部分页器 -->
            <el-pagination  style="margin-top: 20px"
              v-model:current-page="pageNo"
              v-model:page-size="pagesize"
              :page-sizes="[3,5,7,9]"
              :background="true"
              layout=" prev, pager, next, ->,sizes,total"
              :total="pagetotal"
              @size-change="getData()"
              @current-change="getData()"
            />    
      </div>

      <!-- 场景1：添加新的spu和修改已有的spu -->
      <spuForm :c3id="c3id" :init="init" v-else-if="scence==1?true:false" @changeScence1="changeScence1"   :Spu0Arr="Spu0"  ></spuForm>

      <!-- 场景2：添加新的sku的结构 -->
        <skuForm  v-else :c1id="c1id"  :c2id="c2id" :c3id="c3id" :Spu2Arr="Spu2"  :req_flag2="Flag2_req" @changeScence2="changeScence2"></skuForm>

        <!-- 对话框 -->
        <el-dialog title="SKU列表" v-model="show">
          <el-table :data="skuArr" style="width: 100%" border>
              <el-table-column prop="skuName" label="sku名字" width="width">
              </el-table-column>
              <el-table-column prop="price" label="sku价格" width="width">
              </el-table-column>
              <el-table-column prop="weight" label="sku重量" width="width">
              </el-table-column>
              <el-table-column prop="prop" label="sku照片" width="width">
                <template #="{row}">
                  <div style="width: 100px;height:100px">
                    <img :src="row.skuDefaultImg" alt="" style="width:100%;height:100%">
                  </div>
                </template>
              </el-table-column>
          </el-table>

        </el-dialog>

  </el-card>





</template>

<script setup lang="ts">
import Catagory from '../../../components/Catagory/Catagory.vue'
import { ref,watch,onMounted } from 'vue'
import { reqHasSpu,reqDeletSpu,reqSkuList } from '../../../api/product/spu/index'
import { type HasSpu,type Records,type SpuData} from '../../../api/product/spu/type'
import spuForm from './spuForm.vue'
import skuForm from './skuForm.vue'


//spu子组件初始化
let init=ref(false)




//三级联动的禁用
let disable=ref(false)

// 场景的数据
// 场景0：显示已有的spu，场景1：添加或者修改已有的spu，场景2：添加sku的结构
let scence = ref(0);

//切换场景1，将已有的spu数据携带给场景1
let Spu0=ref({})

// 分页器数据
let pageNo=ref(1)
let pagesize=ref(3)
let pagetotal=ref(0)

//接收三级分类的id
let c3id=ref('')
let receieveC3id=(value:any)=>{
  c3id.value=value
}
let c2id=ref('')
let receieveC2id=(value:any)=>{
  c2id.value=value
}
let c1id=ref('')
let receieveC1id=(value:any)=>{
  c1id.value=value
}



//接收网络请求回来的数据(已有的spu数据)
let Record=ref<Records>([])

//网络请求
let getData=async()=>{
  if(!c3id.value){
    Record.value=[]
    return
  } 
  let res:HasSpu=await reqHasSpu(pageNo.value,pagesize.value,c3id.value)
  if(res.code==200){
    Record.value=res.data.records
    pagetotal.value=res.data.total
  }  
}


//添加spu
let addSpu=()=>{
  //场景切换，切换到场景1
  scence.value=1
  //告诉儿子初始化
  init.value=!init.value
}
//自定义事件，切换回场景1
let changeScence1=(value:number)=>{
  scence.value=value
}
//修改spu
let updateSpu=(row:SpuData)=>{
  //场景切换，切换到场景1
  scence.value=1
  Spu0.value=row
  // console.log(11111,Spu0.value);
  
  
}
import { ElMessage } from 'element-plus'
//删除spu
let deleteSpu=async(row:any)=>{
  let res=await reqDeletSpu(row.id)
  if(res.code==200){
    ElMessage({
      type:'success',
      message:'删除成功'
    })
    getData()
  }

  
}

onMounted(()=>{
getData()
})


//向场景2发一个标志位，场景二监视标志位的变化来发请求
let Flag2_req=ref(false) 

//点击添加sku将对应数据发送过去
let Spu2=ref({})



//添加sku，切换场景2
let addSku=(row:any)=>{
  scence.value=2
  Spu2.value=row
  
}
//自定义事件，切换场景2
let changeScence2=(value:number)=>{
  scence.value=value
}

//保存查看sku的数据
let skuArr=ref([])
//sku对话框的显示与隐藏
let show=ref(false)

//查看sku，切换场景3
let findSku=async(row:any)=>{
  let res:any=await reqSkuList(row.id)
  if(res.code==200){
    skuArr.value=res.data
    show.value=true 
  }
  console.log(skuArr.value);

}





//监视数据变化
watch([()=>{return c3id.value},()=>{return scence.value}],async()=>{
  if(scence.value==2){
     Flag2_req.value=!Flag2_req.value
  }
 
  getData()

  // console.log(c1id.value,c2id.value,c3id.value);
  

})


</script>

<style scoped lang="scss">

</style>