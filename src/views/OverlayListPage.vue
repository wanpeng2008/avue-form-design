<template>
  <div>
    <!-- <h4 class="widget-form-group__head" v-show="column.label">
      <i
        :class="column.icon"
        v-show="column.icon"
        style="margin-right: 10px;"
      ></i
      >{{ column.label }}
    </h4> -->
    <avue-crud
      :data="list"
      :option="option"
      :page="page"
      @row-save="handleRowSave"
      @row-del="handleRowDelete"
      @row-update="handleRowUpdate"
    >
      <template slot-scope="scope" slot="menu">
        <el-button
          type="text"
          icon="el-icon-setting"
          size="small"
          @click="handleRowConfig(scope.row)"
          >设计</el-button
        >
      </template>
    </avue-crud>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "overlay-list-page",
  created() {
    this.loadData();
  },
  destroyed() {},

  data() {
    return {
      list: [],
      option: {
        title: "表格的标题",
        page: true,
        selection: true,
        align: "center",
        menuAlign: "center",
        leftButtons: [],
        column: [
          {
            label: "标题",
            prop: "title",
          },
        ],
      },
      page: {
        total: 10,
        pageSize: 20,
      },
    };
  },
  methods: {
    async loadData() {
      this.list = await this.fetchData(this.page);
      console.log("list", this.list);
    },

    // 增加按钮
    async handleRowSave(row, done, loading) {
      await this.add(row);
      done(); // 关闭表单
      loading(); // 按钮停止加载
      this.loadData();
    },
    // 修改按钮
    async handleRowUpdate(row, index, done, loading) {
      await this.update(row, index);
      done(); // 关闭表单
      loading(); // 按钮停止加载
      this.loadData();
    },
    // 删除按钮
    // eslint-disable-next-line no-unused-vars
    handleRowDelete(row, index) {
      this.$confirm("是否删除该条信息？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.delete(row, index);
        this.loadData();
      });
    },
    handleRowConfig(row) {
      console.log("handleRowConfig", row);
      this.$router.push({ name: "overlayDesign", params: { id: row.id } });
    },
    async fetchData() {
      let overlays = localStorage.getItem("overlays");
      if (overlays) {
        let data = JSON.parse(overlays);
        if (data && data.length) return data;
      }
      let { data } = await axios.get("/mock/overlays.json");
      localStorage.setItem("overlays", JSON.stringify(data));
      return data;
    },
    add(newItem) {
      this.list.unshift(newItem);
      localStorage.setItem("overlays", JSON.stringify(this.list));
      this.loadData();
    },
    update(updated, index) {
      this.list.splice(index, 1, updated);

      localStorage.setItem("overlays", JSON.stringify(this.list));
      this.loadData();
    },
    delete(deleted, index) {
      this.list.splice(index, 1);

      localStorage.setItem("overlays", JSON.stringify(this.list));
      this.loadData();
    },
  },
};
</script>
