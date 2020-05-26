<template>
  <div>
    <el-form-item label="行数据主键字段">
      <el-input
        v-model="data.options.rowkey"
        placeholder="请输入主键"
      ></el-input>
    </el-form-item>
    <!-- <el-form-item label="是否提示">
      <el-switch v-model="data.options.addBtn"></el-switch>
    </el-form-item> -->
    <el-form-item label="显示边框">
      <el-switch v-model="data.options.border"></el-switch>
    </el-form-item>

    <el-form-item label="是否显示序号">
      <el-switch v-model="data.options.index"></el-switch>
    </el-form-item>
    <el-form-item label="支持可选">
      <el-switch v-model="data.options.selection"></el-switch>
    </el-form-item>
    <!-- <el-form-item label="支持多选">
      <el-switch v-model="data.options.multiple"></el-switch>
    </el-form-item> -->
    <el-form-item label="展开折叠行">
      <el-switch v-model="data.options.expand"></el-switch>
    </el-form-item>

    <el-form-item label="单元格对齐">
      <el-select v-model="data.options.align" placeholder="请选择">
        <el-option label="居左" value="left"></el-option>
        <el-option label="居中" value="center"></el-option>
        <el-option label="居右" value="right"></el-option>
      </el-select>
    </el-form-item>
    <!-- <el-form-item label="表头对齐">
      <el-select v-model="data.options.headerAlign" placeholder="请选择">
        <el-option label="居左" value="left"></el-option>
        <el-option label="居中" value="center"></el-option>
        <el-option label="居右" value="right"></el-option>
      </el-select>
    </el-form-item> -->
    <!-- <el-form-item label="行内新增按钮">
      <el-switch v-model="data.options.addRowBtn"></el-switch>
    </el-form-item> -->
    <!-- <el-form-item label="按钮宽度">
      <el-input-number
        v-model="data.placeholder"
        placeholder="请输入操作按钮宽度"
      ></el-input-number>
    </el-form-item> -->
    <!-- <el-form-item label="对齐方式">
      <el-select
        v-model="data.options.align"
        placeholder="请选择操作按钮对齐方式"
      >
        <el-option label="居左" value="left"></el-option>
        <el-option label="居中" value="center"></el-option>
        <el-option label="居右" value="right"></el-option>
      </el-select>
    </el-form-item> -->

    <el-form-item label="弹框宽度">
      <el-input-number
        v-model="data.options.dialogWidth"
        placeholder="弹出表单的弹窗宽度"
      ></el-input-number>
    </el-form-item>
    <el-form-item label="弹框高度">
      <el-input-number
        v-model="data.options.dialogHeight"
        placeholder="弹出表单的弹窗高度"
      ></el-input-number>
    </el-form-item>
    <!-- <el-form-item label="弹框类型">
      <el-select v-model="data.options.align" placeholder="请选择窗口弹出类型">
        <el-option label="弹窗" value="modal"></el-option>
        <el-option label="抽屉" value="drawer"></el-option>
      </el-select>
    </el-form-item> -->
    <el-form-item label="弹框全屏">
      <el-switch v-model="data.options.dialogFullscreen"></el-switch>
    </el-form-item>

    <el-form-item label="按ESC关闭">
      <el-switch v-model="data.options.dialogEscape"></el-switch>
    </el-form-item>
    <el-form-item label="显示遮罩">
      <el-switch v-model="data.options.dialogModal"></el-switch>
    </el-form-item>

    <el-form-item label="点击框外关闭">
      <el-switch v-model="data.options.dialogClickModal"></el-switch>
    </el-form-item>

    <el-form-item label="弹窗显示关闭按钮">
      <el-switch v-model="data.options.dialogCloseBtn"></el-switch>
    </el-form-item>

    <el-form-item label="显示新增按钮">
      <el-switch v-model="data.options.addBtn"></el-switch>
    </el-form-item>
    <el-form-item label="行内菜单类型">
      <el-select
        v-model="data.options.menuType"
        placeholder="请选择行内菜单类型"
      >
        <el-option label="按钮" value="button"></el-option>
        <el-option label="图标" value="icon"></el-option>
        <el-option label="文字" value="text"></el-option>
        <el-option label="菜单" value="menu"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="行内编辑按钮">
      <el-switch v-model="data.options.editBtn"></el-switch>
    </el-form-item>
    <el-form-item label="行内查看按钮">
      <el-switch v-model="data.options.viewBtn"></el-switch>
    </el-form-item>
    <el-form-item label="行内删除按钮">
      <el-switch v-model="data.options.delBtn"></el-switch>
    </el-form-item>
    <!-- <el-form-item label="显示保存按钮">
      <el-switch v-model="data.options.addBtn"></el-switch>
    </el-form-item> -->
    <!-- <el-form-item label="保存按钮">
      <el-input
        v-model="data.options.saveBtnTitle"
        placeholder="保存按钮标题"
      ></el-input>
    </el-form-item> -->
    <!-- <el-form-item label="显示更新按钮">
      <el-switch v-model="data.options.addBtn"></el-switch>
    </el-form-item> -->
    <!-- <el-form-item label="更新按钮">
      <el-input
        v-model="data.updateBtnTitle"
        placeholder="更新按钮标题"
      ></el-input>
    </el-form-item> -->
    <!-- <el-form-item label="显示取消按钮">
      <el-switch v-model="data.options.addBtn"></el-switch>
    </el-form-item> -->
    <!-- <el-form-item label="取消按钮">
      <el-input
        v-model="data.options.cancelBtnTitle"
        placeholder="取消按钮标题"
      ></el-input>
    </el-form-item> -->

    <el-form-item label="显示搜索按钮">
      <el-switch v-model="data.options.searchBtn"></el-switch>
    </el-form-item>
    <!-- <el-form-item label="显示刷新按钮">
      <el-switch v-model="data.options.refreshBtn"></el-switch>
    </el-form-item> -->
    <el-form-item label="显示过滤按钮">
      <el-switch v-model="data.options.filterBtn"></el-switch>
    </el-form-item>
    <el-form-item label="显示打印按钮">
      <el-switch v-model="data.options.printBtn"></el-switch>
    </el-form-item>
    <!-- <el-form-item label="显示导出按钮">
      <el-switch v-model="data.options.addBtn"></el-switch>
    </el-form-item> -->
    <el-form-item label="显示列显隐按钮">
      <el-switch v-model="data.options.columnBtn"></el-switch>
    </el-form-item>
    <el-form-item label="显示日期组件">
      <el-switch v-model="data.options.dateBtn"></el-switch>
    </el-form-item>

    <!-- <el-form-item label="添加按钮">
      <el-switch v-model="data.options.addBtn"></el-switch>
    </el-form-item>
    <el-form-item label="删除按钮">
      <el-switch v-model="data.options.delBtn"></el-switch>
    </el-form-item>
    <el-form-item label="是否只读">
      <el-switch v-model="data.options.viewBtn"></el-switch>
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="data.disabled"></el-switch>
    </el-form-item>
    <el-form-item label="是否可见">
      <el-switch v-model="data.display"></el-switch>
    </el-form-item> -->
    <el-row>表格字段控制</el-row>

    <draggable
      class="syllable_ul"
      element="ul"
      :list="column"
      :options="{ group: 'title', animation: 150 }"
      :no-transition-on-drag="true"
      @change="change"
      @start="start"
      @end="end"
      :move="move"
    >
      <transition-group
        type="transition"
        :name="!drag ? 'syll_li' : null"
        :css="true"
      >
        <li v-for="item in column" :key="item.prop">
          <el-col :span="10" class="fieldSection"
            ><el-input v-model="item.label" disabled></el-input
          ></el-col>
          <el-col :span="10" class="fieldSection"
            ><el-input v-model="item.prop" disabled></el-input
          ></el-col>
          <el-col :span="4" class="fieldSection">
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(index)"
              circle
              icon="el-icon-minus"
            ></el-button
          ></el-col>
        </li>
      </transition-group>
    </draggable>
    <el-row>
      <el-col :span="10" class="fieldSection"
        ><el-input v-model="newItem.label" placeholder="请输入列名"></el-input
      ></el-col>
      <el-col :span="10" class="fieldSection"
        ><el-input v-model="newItem.prop" placeholder="请输入字段名"></el-input
      ></el-col>
      <el-col :span="4" class="fieldSection">
        <el-button
          type="success"
          size="mini"
          @click="handleAdd(newItem)"
          circle
          icon="el-icon-plus"
        ></el-button
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import lodash from "lodash";
export default {
  name: "config-crud",
  props: ["data"],
  data: () => ({
    newItem: {},
  }),
  methods: {
    handleAdd(newItem) {
      if (
        this.column.some(
          (item) => item.label == newItem.label || item.prop == newItem.prop
        )
      ) {
        alert("列名字段不能重复");
        return;
      }
      this.column.push(lodash.clone(newItem));
      this.newItem = {};
    },
    handleDelete(index) {
      this.column.splice(index, 1);
    },
    //evt里面有两个值，一个evt.added 和evt.removed  可以分别知道移动元素的ID和删除元素的ID
    change(evt) {
      console.log(evt, "change...");
    },
    //start ,end ,add,update, sort, remove 得到的都差不多
    start(evt) {
      this.drag = true;
      console.log(evt, "start...");
    },
    end(evt) {
      console.log(evt, "end....");
      this.drag = true;
      evt.item; //可以知道拖动的本身
      evt.to; // 可以知道拖动的目标列表
      evt.from; // 可以知道之前的列表
      evt.oldIndex; // 可以知道拖动前的位置
      evt.newIndex; // 可以知道拖动后的位置
    },
    move(evt, originalEvent) {
      console.log(evt, "move");
      console.log(originalEvent); //鼠标位置
    },
  },
  computed: {
    column() {
      return this.data.options.column;
    },
  },
};
</script>
<style lang="scss" scoped>
.fieldSection {
  padding: 4px 4px;
}
</style>
