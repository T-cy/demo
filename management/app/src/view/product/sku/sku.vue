<template>  
	<el-card>
		<el-table  style="width: 100%"  border :data="SkuArr">
				<el-table-column prop="prop"  type="index" label="序号" width="80px" align="center">
				</el-table-column>
				<el-table-column 	header-align="center" show-overflow-tooltip="true" label="名称" prop="skuName" width="200px">
				</el-table-column>
				<el-table-column header-align="center" show-overflow-tooltip="true" label="描述" prop="skuDesc" width="200px">
				</el-table-column>
				<el-table-column header-align="center" label="默认图片" prop="prop" width="150px" align="center">
					<template #="{row}">
						<div style="width:120px;height:120px">
							<img :src="row.skuDefaultImg" alt="" style="width: 100%;height:100%">
						</div>
					</template>
				</el-table-column>
				<el-table-column header-align="center" label="重量（g）" prop="weight" width="150px" align="center"> 
				</el-table-column>
				<el-table-column header-align="center" label="价格（元）" prop="price" width="150px" align="center">
				</el-table-column>
				<el-table-column header-align="center" label="操作" prop="prop" width="300px" fixed="right">
					<template #="{row}">
						<div>
							<el-button  @click="updateSale(row)" :type="row.isSale==1?'primary':'info'" :icon="row.isSale==1?'Bottom':'Top'"></el-button>
							<el-button @click="editSale" type="warning" icon="Edit"></el-button>
							<el-button @click="lookSale(row)" type="info" icon="infoFilled"></el-button>
							<el-popconfirm title="你确定要删除这一个属性吗?" @confirm="removeSku(row)">
								<template #reference>
									<el-button type="delete" icon="Delete"></el-button>
								</template>
							</el-popconfirm> 
						</div>
					</template>
				</el-table-column>
		</el-table>

		  <el-pagination  style="margin: 20px 0; width:99%" background="true"
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 15, 20, 25]"
      layout="prev, pager, next,->,sizes,total"
      :total="pageTotal"
      @size-change="getDate()"
      @current-change="handleCurrentChange"
   		 />


  <el-dialog
    v-model="centerDialogVisible"
    title="商品详情"
    width="600"
    align-center
  >
	<template #default>
		<div class="dialog_div">
			<el-row >
				<el-col :span="3">名称</el-col>
				<el-col :span="21">{{ dialogArr.skuName }}</el-col>
			</el-row>
		</div>
		<div class="dialog_div">
			<el-row >
				<el-col :span="3">描述</el-col>
				<el-col :span="21">{{dialogArr.skuDesc}}</el-col>
			</el-row>
		</div>
		<div class="dialog_div">
			<el-row >
				<el-col :span="3">价格</el-col>
				<el-col :span="21">{{dialogArr.price}}</el-col>
			</el-row>
		</div>
		<div class="dialog_div">
			<el-row >
				<el-col :span="3">平台属性</el-col>
				<el-col :span="21">
					<el-tag type="success" v-for="item in dialog_info.skuAttrValueList" style="margin:5px;">
						{{ item.attrName }}
					</el-tag>
				</el-col>
			</el-row>
		</div>
		<div class="dialog_div">
			<el-row >
				<el-col :span="3">销售属性</el-col>
				<el-col :span="21">
					<el-tag type="success" v-for="item in dialog_info.skuAttrValueList" style="margin:5px;">
						{{ item.valueName }}
					</el-tag>
				</el-col>
			</el-row>
		</div>
		<div class="dialog_div">
			<el-row >
				<el-col :span="3">商品图片</el-col>
			</el-row>
			<div>
				<el-carousel   :interval="4000" type="card" height="100px"  style="">
					<el-carousel-item v-for="item in dialog_info.skuImageList" :key="item">
						<!-- <div style="width: 100px;" > -->
							<img :src="item.imgUrl" alt="" style="height:100%">
						<!-- </div> -->
					</el-carousel-item>
				</el-carousel>
			</div>
		</div>				
	</template>
</el-dialog>




	</el-card>
</template>

<script setup lang="ts">
import { ref ,onMounted} from 'vue'
import { reqSkuList,reqSkuSaleUp,reqSkuSaleCancel,reqSkuInfo,reqDeleteSku } from '../../../api/product/sku/index'
import type { SkuResponData } from '../../../api/product/sku/type'


//分页器数据
let pageNo=ref(1)
let pageSize=ref(10)
let pageTotal=ref()

//sku数组用来存放接口返回的数据
let SkuArr=ref<any>()

//路由请求
let getDate=async(pager=1)=>{
	//当前分页器的页码
	pageNo.value=pager
	let res:SkuResponData=await reqSkuList(pageNo.value,pageSize.value)
	// console.log(res);
	if(res.code==200){
		pageTotal.value=res.data.total
		SkuArr.value=res.data.records
	}
}

//分页器回调,实际上不用写，因为插件自动会刷新
let handleCurrentChange=(currentClickPage:number)=>{
	pageNo.value=currentClickPage
	getDate(pageNo.value)
}


//商品的上架和下架，这里的接口一直为201
let updateSale=async(row:any)=>{
	//row.isSale==1就是上架状态
	//当前商品是下架的，点击就上架
	if(row.isSale==0){
		row.isSale=1
		await reqSkuSaleUp(row.id)
	}
	//当前商品是上架的，点击就下架
	else if(row.isSale==1){
		row.isSale=0
		await reqSkuSaleCancel(row.id)
	}
}
import { ElMessage } from 'element-plus'
//修改sku 
let editSale=()=>{
	ElMessage({
		type:'warning',
		message:'正在努力开发中'
	})
}

//查看sku详情（对话框形式出现）
let centerDialogVisible=ref<boolean>(false)
let dialogArr=ref([])//对框内容收集
let dialog_info=ref({})
let lookSale=async(row:any)=>{
	dialogArr.value=row
	centerDialogVisible.value=true
	let res=await reqSkuInfo(row.id)
	// console.log(res);
	if(res.code==200){
		dialog_info.value=res.data
	}
	console.log(dialog_info.value);
	
	
	// console.log(dialogArr.value);
	
}

//删除sku数据
let removeSku=async(row:any)=>{
	let res=await reqDeleteSku(row.id)
	console.log(res);
	ElMessage({
		type:'success',
		message:'删除成功'
	})

	getDate(SkuArr.value.length>1?pageNo.value:pageNo.value-1)
}


//组件挂载发数据
onMounted(()=>{
	getDate()
})

</script>

<style scoped lang="scss">
.dialog_div{
	margin: 10px 15px;
}
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>