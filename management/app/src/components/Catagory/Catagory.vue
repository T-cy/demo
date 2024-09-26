<template>
<el-card style="width: 98%;">
    <el-form :inline="true">
        <el-form-item label="一级分类" >
            <el-select style="width: 240px" v-model="c1id" @change="getC2(c1id)" :disabled="prpps.showDiasble?false:true||prpps.SPU_show?false:true">
                <el-option v-for="item in labe1" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
            <el-select style="width: 240px" v-model="c2id" @change="getC3(c2id)" :disabled="prpps.showDiasble?false:true||prpps.SPU_show?false:true">
                <el-option v-for="item2 in labe2" :key="item2.id" :label="item2.name" :value="item2.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="三级分类" >
            <el-select style="width: 240px" v-model="c3id" @change="getc" :disabled="prpps.showDiasble?false:true||prpps.SPU_show?false:true">
                <el-option v-for="item3 in labe3" :key="item3.id" :label="item3.name" :value="item3.id">
                </el-option>
            </el-select>
        </el-form-item>
    </el-form>
</el-card>
</template>

<script setup lang="ts">
import { reqC1,reqC2,reqC3,reqAttr } from '../../api/product/attr/index'
import { onMounted ,ref,defineEmits,watch} from 'vue'

let labe1=ref([])
let c1id=ref<number|string>('')
let labe2=ref([])
let c2id=ref('')
let labe3=ref([])
let c3id=ref('')

let disable=ref(true)

// 属性值接口
let paramsArr=ref([])


//接收父亲发送的数据
let prpps=defineProps(['showDiasble','upload','SPU_show'])



//自定义事件
let emit=defineEmits(['send-all','send-paramsArr','send-c3id','send-c2id','send-c1id'])

let ALL=()=>{
    if(c1id.value&&c2id.value&&c3id.value){
        disable.value=false
    }
    else{
        disable.value=true
    }
}


let getC1=async()=>{
    let res=await reqC1()
    // console.log(res); 
    if (res.code==200) {
        labe1.value=res.data
    } 
}

//下拉菜单发生变化的时候发送路由请求
let getC2=async(id:any)=>{
    let res=await reqC2(id)
    // console.log(res);
    labe2.value=res.data
    //当第二次修改数据的时候，需要将二级、三级的数据清空
    c2id.value=''
    c3id.value=''
    ALL()
}
let getC3=async(id:any)=>{
    
    let res=await reqC3(id)
    // console.log(res);
    labe3.value=res.data
    c3id.value=''
    ALL()
}
let getc=()=>{
    ALL()
}

onMounted(() => {
    getC1()
    
})

//监视多个数据变化
watch([()=>{return disable.value},()=>{return c3id.value},()=>{return prpps.upload}],()=>{
    paramsArr.value=[]
    // 向父亲发数据
    emit('send-all',disable.value)   
    emit('send-c3id',c3id.value)
    emit('send-c2id',c2id.value)
    emit('send-c1id',c1id.value)
    reqParams(c1id.value,c2id.value,c3id.value)
    
    
    
})


let reqParams=async(id1:any,id2:any,id3:any)=>{
    let res=await reqAttr(id1,id2,id3)
    // console.log(res);
    if(res.code==200){
        paramsArr.value=res.data
    }    
    // 向父亲发数据
    emit('send-paramsArr',paramsArr.value)
}

</script>

<style scoped lang="scss">

</style>