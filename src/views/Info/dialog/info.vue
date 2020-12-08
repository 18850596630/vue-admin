<template>
  <el-dialog
    title="新增"
    :visible.sync="dialogInfo"
    @close="close"
    width="580px"
  >
    <el-form :model="form">
      <el-form-item label="分类：" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择分类">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题：" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="概况：" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.name" autocomplete="off" placeholder="请输入概况"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
import { reactive, ref, toRefs , watch } from "@vue/composition-api";
export default {
  name: "dialogInfo",
  props: {
    //单项数据值  不能反向修改
    flag: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { root ,emit }) {
    const dialogInfo = ref(false);
    const formLabelWidth = ref("80px");
    const data = reactive({
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    });
    const Data = toRefs(data);

    const close = () => {
      dialogInfo.value = false;
      emit("update:flag", false);
    };

    watch(()=>dialogInfo.value=props.flag);

    return {
      dialogInfo, formLabelWidth,
      ...Data,
      close,
    };
  }
};
</script>
<style scoped>
</style>