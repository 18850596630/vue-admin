<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for="">类型：</label>
          <div class="wrap-content">
            <el-select v-model="value" style="width: 100%">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="label-wrap date">
          <label for="">日期：</label>
          <div class="wrap-content">
            <el-date-picker
              style="width: 100%"
              v-model="timeDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="label-wrap search_word">
          <label for="">关键字：</label>
          <div class="wrap-content">
            <el-select v-model="search_key" style="width: 100%">
              <el-option
                v-for="item in searchOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <el-input
          v-model="search_word"
          placeholder="请输入内容"
          style="width: 100%"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="warning" style="width: 100%">搜索</el-button>
      </el-col>
      <el-col :span="3">&nbsp;</el-col>
      <el-col :span="2">
        <el-button type="danger" class="fl-right" style="width: 100%" @click="dialogInfo=true"
          >添加</el-button
        >
      </el-col>
    </el-row>

    <div class="black-space-30"></div>
    <!-- 表格数据 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="title" label="标题" width="750"> </el-table-column>
      <el-table-column
        prop="category"
        label="类别"
        width="130"
      ></el-table-column>
      <el-table-column prop="date" label="日期" width="137"> </el-table-column>
      <el-table-column prop="admin" label="管理员" width="115">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 底部分页 -->
    <div class="black-space-30"></div>
    <el-row>
      <el-col :span="12">
        <el-button type="danger" plain>批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          class="fl-right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="150"
        >
        </el-pagination>
      </el-col>
    </el-row>

    <!-- 弹窗 -->
    <el-dialog title="收货地址" :visible.sync="dialogInfo">
     csfdfdv
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/composition-api";
export default {
  name: "Infoindex",
  setup(content, { root }) {
    const value = ref("");
    const formInline = ref("left");
    const timeDate = ref("");

    const search_key = ref("id");
    const search_word = ref("");
    const dialogInfo=ref(false);

    const searchOptions = reactive([
      { value: "id", label: "ID" },
      { value: "title", label: "标题" },
    ]);
    const options = reactive([
      {
        value: 1,
        label: "国际信息",
      },
      {
        value: 2,
        label: "国内信息",
      },
      {
        value: 3,
        label: "行业信息",
      },
    ]);
    const tableData = reactive([
      {
        title: "首先在vm里面新建虚拟机，直接选择典型，然后下一步。",
        date: "2016-05-02",
        admin: "王小虎",
        category: "信息",
      },
      {
        title: "上海市普陀区金沙江路 1518 弄",
        date: "2016-05-02",
        admin: "王小虎",
        category: "信息",
      },
      {
        title:
          "选择中间的安装程序光盘镜像文件，然后去文件里面找你自己下载的镜像",
        date: "2016-05-02",
        admin: "王小虎",
        category: "信息",
      },
      {
        title:
          "给虚拟机选择磁盘大小。意思就是说，你虚拟机里面的硬盘要多少，就像Windows里面CDE盘都是多大",
        date: "2016-05-02",
        admin: "王小虎",
        category: "信息",
      },
    ]);

    const handleSizeChange = (val) => {
      console.log(val);
    };
    const handleCurrentChange = (val) => {
      console.log(val);
    };

    return {
      value,
      formInline,
      search_key,
      search_word,
      dialogInfo,
      timeDate,
      tableData,
      options,
      searchOptions,
      handleSizeChange,
      handleCurrentChange,
    };
  },
};
</script>

<style lang="scss" scope>
@import "@/styles/config.scss";
@import "@/styles/main.scss";
.label-wrap {
  color: #4d4d4d;
  &.category {
    @include labelDom(left, 60, 40);
  }
  &.date {
    @include labelDom(left, 60, 40);
  }
  &.search_word {
    @include labelDom(left, 90, 40);
  }
}
</style>