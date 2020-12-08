<template>
  <div id="category">
    <el-button type="danger" @click="addFirst({type:'add_first'})">添加一级分类</el-button>
    <div class="hr-line"></div>
    <div class="category-body">
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category-warp">
            <div class="category" v-for="item in categoryList.item" :key="item.id">
              <h4>
                <span class="iconfont handle_icon icon-jiahao"></span>
                {{item.name}}
                <div class="button-group">
                  <el-button type="danger" size="mini" round @click="editFirstCate({data:item,type:'edit_first'})">编辑</el-button>
                  <el-button type="success" size="mini" round
                    >添加子类</el-button
                  >
                  <el-button size="mini" round @click="delCategory(item.id)">删除</el-button>
                </div>
              </h4>
              <ul v-if="item.child">
                <li v-for="ch_item in item.child" :key="ch_item.id">
                  {{ch_item.name}}
                  <div class="button-group">
                    <el-button type="danger" size="mini" round>编辑</el-button>
                    <el-button size="mini" round @click="delCategory">删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="menu-title">一级分类添加</div>
          <el-form label-width="142px" ref="categoryFrom">
            <el-form-item
              label="一级分类名称："
              class="w400 m15"
              v-if="category_first_input"
            >
              <el-input
                type="text"
                v-model="ruleForm.categoryName"
                autocomplete="off"
                :disabled="category_first_disabled"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="二级分类名称："
              class="w400 m15"
              v-if="category_child_input"
            >
              <el-input
                type="text"
                v-model="ruleForm.seccategoryName"
                autocomplete="off"
                :disabled="category_child_disabled"
              ></el-input>
            </el-form-item>
            <el-form-item class="w400 m15">
              <el-button type="danger" :disabled="sumbit_button_disabled" @click="submit" :loading="submit_button_loading">确定</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { AddFirstCate , DelCate , getCateList , editCate } from "@/api/news";
import { onMounted, reactive, ref, toRefs , filter} from "@vue/composition-api";
import { Message } from 'element-ui';
import { global } from "@/utils/global_3";
export default {
  name: "IndexCategory",
  setup(props, { root }) {

    const ruleForm = reactive({
      categoryName: "",
      seccategoryName: "",
    });
    const fromData = reactive({
      category_first_input: true,
      category_child_input: true,
      category_first_disabled: true,
      category_child_disabled: true,
      sumbit_button_disabled:true,
      submit_button_loading:false,
      deleteId:'',
      submit_button_type:'',
    });
    const fromDatas = toRefs(fromData);

  
    const categoryList=reactive({
      item:[],
      current:[],
    });

    const submit=()=>{
       let type=fromData.submit_button_type;
       console.log(type);
        if(type == 'add_first'){
          addFirstCategory();
        }

        if(type == 'edit_first'){
          editFirstCategory();
        }
    }
    const addFirst=(parmas)=>{
        fromData.submit_button_type=parmas.type;
        fromData.category_first_input=true;
        fromData.category_child_input=false;
        fromData.category_first_disabled=false;
        fromData.sumbit_button_disabled=false;
    }
    const addFirstCategory=()=>{
        fromData.submit_button_loading=true;
        AddFirstCate({name:ruleForm.categoryName}).then(response=>{
          const data=response.data;
          root.$message.success(data.message);
          categoryList.item.push(data.data);
            fromData.submit_button_loading=false;
            ruleForm.categoryName=" ";
            ruleForm.seccategoryName=" ";
        }).catch(error=>{
           fromData.submit_button_loading=false;
            ruleForm.categoryName=" ";
            ruleForm.seccategoryName=" ";
       })
    }
    const editFirstCate=(parmas)=>{
        ruleForm.categoryName=parmas.data.name;
        fromData.submit_button_type=parmas.type;
        fromData.category_first_input=true;
        fromData.category_child_input=false;
        fromData.category_first_disabled=false;
        fromData.sumbit_button_disabled=false;

        //存储对象
        categoryList.current=parmas.data;
    }
    const editFirstCategory=()=>{
        if(categoryList.current.length == 0){
           root.$message.error("未选择分类!");
           return false;
        }
        
        fromData.submit_button_loading=true;
        let data={
          id:categoryList.current.id,
          pid:categoryList.current.pid,
          name:ruleForm.categoryName,
        }
        editCate(data).then(response=>{
          const res=response.data;
          root.$message.success(res.message);
          categoryList.current.name=res.data.name;
          fromData.submit_button_loading=false;
            ruleForm.categoryName='';
          categoryList.current=[];
        }).then(error=>{
          fromData.submit_button_loading=false;
          ruleForm.categoryName='';
          categoryList.current=[];
        })
    }
    
    const { confirm } = global();
    const delCategory=(cateId)=>{
       fromData.deleteId=cateId;
       confirm({   //3.0 注册方法
          content: "确认删除已选中的信息？",
          type: "warning",
          fn: delCategoryData,
          catchFn:()=>{
            fromData.deleteId='';
          },
       });
    }

    const delCategoryData=(()=>{
        let cateId=fromData.deleteId;
        DelCate({id:cateId}).then(response=>{
          const data=response.data;
          root.$message.success(data.message);
          let newData=categoryList.item.filter(item=>item.id != fromData.deleteId);
          categoryList.item = newData;
        }).then(error=>{

        })
    })
    const getCatelist=()=>{
          getCateList({}).then(response=>{
          let data=response.data.data;
          categoryList.item=data;
       }).catch(error=>{

       })
    }
 //生命周期  挂载完 再dom渲染
    onMounted(()=>{
      getCatelist();
    })

    return {
      ruleForm,
      ...fromDatas,categoryList,
      addFirst,delCategory,submit,editFirstCate
      
    };
  },
};
</script>

<style lang="scss" scope>
@import "@/styles/icons.scss";
@import "@/styles/main.scss";
.category-warp {
  .category:first-child() {
    &:before {
      top: 20px;
    }
  }
  .category:last-child() {
    &:before {
      top: 21px;
    }
  }
}
.menu-title {
  line-height: 44px;
  padding-left: 22px;
  background-color: #f1f1f1;
}
.category {
  line-height: 44px;
  position: relative;
  cursor: pointer;
  &:before {
    content: " ";
    position: absolute;
    width: 10px;
    border-left: 1px dashed #888;
    left: 20px;
    top: 0;
    bottom: 0;
  }
  h4 {
    padding-left: 40px;
  }
  .handle_icon {
    position: absolute;
    left: 12px;
  }
  ul li {
    padding-left: 40px;
    margin-left: 20px;
    position: relative;
    &:before {
      content: " ";
      position: absolute;
      width: 32px;
      border-bottom: 1px dashed #323232;
      left: 2px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  h4,
  li {
    transition: 0.4s ease;
    &:hover {
      background-color: #f1f1f1;
      border-radius: 4px;
      padding-left: 48px;
    }
  }
}
.button-group {
  position: absolute;
  z-index: 2;
  right: 11px;
  top: -1px;
  button {
    font-size: 12px;
  }
}

.hr-line {
  widows: 100%;
  background-color: #f1f1f1;
  margin-top: 30px;
  margin-bottom: 30px;
  height: 2px;
}
</style>