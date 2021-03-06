<template>
  <div>
    <h4 class="widget-form-group__head" v-show="column.label">
      <i
        :class="column.icon"
        v-show="column.icon"
        style="margin-right: 10px;"
      ></i
      >{{ column.label }}
    </h4>
    <!-- <p>{{ data }}</p>-->
    <!-- <p>{{ column }}</p> -->

    <draggable
      class="widget-form-group__body"
      :list="formFieldList"
      :group="{ name: 'form' }"
      ghost-class="ghost"
      :animation="200"
      @add="handleWidgetGroupAdd($event, column)"
    >
      <template v-for="(item, groupIndex) in formFieldList">
        <div
          class="widget-form-table"
          v-if="item.type == 'dynamic'"
          :key="groupIndex"
          :class="{ active: selectWidget.prop == item.prop }"
          @click.stop="handleWidgetTableSelect(item)"
        >
          <widget-form-table
            :data="column.children"
            :column="item"
            :index="groupIndex"
            :select.sync="selectWidget"
          ></widget-form-table>
        </div>
        <el-col
          v-else
          :key="groupIndex"
          :md="item.span || 12"
          :xs="24"
          :offset="item.offset || 0"
        >
          <el-form-item
            class="widget-form-group__item"
            :label="item.label"
            :prop="item.prop"
            :class="{
              active: selectWidget.prop == item.prop,
              required: item.required,
            }"
            @click.native.stop="handleWidgetTableSelect(item)"
          >
            <widget-form-item
              :item="item"
              :params="column.params"
            ></widget-form-item>
            <el-button
              title="删除"
              @click.stop="handleWidgetTableDelete(column, groupIndex)"
              class="widget-form-group__item--delete"
              v-if="selectWidget.prop == item.prop"
              circle
              plain
              type="danger"
            >
              <i class="iconfont icon-delete"></i>
            </el-button>
            <el-button
              title="复制"
              @click.stop="handleWidgetTableClone(column, groupIndex)"
              class="widget-form-group__item--clone"
              v-if="selectWidget.prop == item.prop"
              circle
              plain
              type="primary"
            >
              <i class="iconfont icon-copy"></i>
            </el-button>
          </el-form-item>
        </el-col>
      </template>
    </draggable>
    <el-button
      title="删除"
      @click.stop="handleWidgetDelete(index)"
      class="widget-action-delete"
      v-if="selectWidget.prop == column.prop"
      circle
      plain
      size="small"
      type="danger"
    >
      <i class="iconfont icon-delete"></i>
    </el-button>
    <el-button
      title="清空"
      @click.stop="handleWidgetClear(index)"
      class="widget-action-clear"
      v-if="selectWidget.prop == column.prop"
      circle
      plain
      size="small"
      type="warning"
    >
      <i class="iconfont icon-clear"></i>
    </el-button>
    <el-button
      title="复制"
      @click.stop="handleWidgetCloneTable(index)"
      class="widget-action-clone"
      v-if="selectWidget.prop == column.prop"
      circle
      plain
      size="small"
      type="primary"
    >
      <i class="iconfont icon-copy"></i>
    </el-button>
    <el-dialog
      class="cus-dialog-container"
      :title="column.label"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      append-to-body
      center
      width="600px"
    >
      <slot>
        <avue-form ref="form" v-model="form" :option="column.children">
          <template slot="menuForm">
            <el-button icon="el-icon-close" @click="handleReset"
              >关 闭</el-button
            >
            <el-button type="primary" icon="el-icon-check" @click="handleSubmit"
              >提 交</el-button
            >
          </template>
        </avue-form>
      </slot>
    </el-dialog>
  </div>
</template>
<script>
import WidgetFormItem from "./WidgetFormItem";
import WidgetFormTable from "./WidgetFormTable";

import { EventBus } from "./utils/event-bus";

export default {
  name: "widget-modal",
  props: ["data", "column", "select", "index"],
  components: { WidgetFormItem, WidgetFormTable },
  data() {
    return {
      form: {},
      selectWidget: this.select,
      isListenning: false,
      dialogVisible: false,
    };
  },
  created() {
    if (!this.isListenning) {
      EventBus.$on("on-btn-click", this.invoked);
      this.isListenning = true;
    }
  },
  destroyed() {
    EventBus.$off("on-btn-click");
  },
  methods: {
    invoked(event) {
      console.log("on-btn-click", event);

      console.log("data", this.data);
      console.log("column", this.column);
      this.dialogVisible = true;
    },
    handleSubmit() {
      this.$refs.form.validate((vaild) => {
        if (vaild) {
          let mappedForm = Object.entries(this.form)
            .map((entry) => {
              let [assignedProp, value] = entry;
              let formFieldName = this.getFormFieldName(assignedProp);
              return { [formFieldName]: value };
            })
            .reduce((pre, cur) => ({
              ...pre,
              ...cur,
            }));
          EventBus.$emit("on-btn-click-confirm", mappedForm);
          this.dialogVisible = false;
          this.$refs.form.resetForm();
        }
      });
    },
    getFormFieldName(assignedProp) {
      let matchedItem = this.fieldMappings.find(
        (fieldMapping) => fieldMapping.assignedProp == assignedProp
      );
      return matchedItem ? matchedItem.formFieldName : assignedProp;
    },
    handleReset() {
      this.$refs.form.resetForm();
      this.dialogVisible = false;
    },
    handleSelectWidget(index) {
      this.selectWidget = this.data.column[index];
    },
    handleWidgetClear(index) {
      this.data.column[index].children.column = [];
      this.selectWidget = this.data.column[index];
    },
    handleWidgetDelete(index) {
      if (this.data.column.length - 1 === index) {
        if (index === 0) this.selectWidget = {};
        else this.handleSelectWidget(index - 1);
      } else this.handleSelectWidget(index + 1);

      this.$nextTick(() => {
        this.data.column.splice(index, 1);
      });
    },
    handleWidgetCloneTable(index) {
      let cloneData = this.deepClone(this.data.column[index]);
      cloneData.prop = Date.now() + "_" + Math.ceil(Math.random() * 99999);
      cloneData.children.column.forEach((t) => {
        t.prop = Date.now() + "_" + Math.ceil(Math.random() * 99999);
      });
      this.data.column.splice(index, 0, cloneData);
      this.$nextTick(() => {
        this.handleSelectWidget(index + 1);
      });
    },
    handleWidgetTableSelect(data) {
      this.selectWidget = data;
    },
    handleWidgetTableClone(column, item) {
      const data = this.deepClone(item);
      data.prop = Date.now() + "_" + Math.ceil(Math.random() * 99999);
      this.$set(this.formFieldList, this.formFieldList.length, {
        ...data,
      });
      this.$nextTick(() => {
        this.selectWidget = this.formFieldList[this.formFieldList.length - 1];
      });
    },
    handleWidgetTableDelete(column, index) {
      if (this.formFieldList.length - 1 == index) {
        if (index == 0) this.selectWidget = column;
        else this.selectWidget = this.formFieldList[index - 1];
      } else this.selectWidget = this.formFieldList[index + 1];
      this.$nextTick(() => {
        this.formFieldList.splice(index, 1);
      });
    },
    // eslint-disable-next-line no-unused-vars
    handleWidgetGroupAdd(evt, column) {
      let newIndex = evt.newIndex;
      const item = evt.item;

      if (newIndex == 1 && newIndex > this.formFieldList.length - 1)
        newIndex = 0;
      if (["分组"].includes(item.textContent)) {
        this.formFieldList.splice(newIndex, 1);
        return;
      }

      const data = this.deepClone(this.formFieldList[newIndex]);
      if (!data.prop)
        data.prop = Date.now() + "_" + Math.ceil(Math.random() * 99999);
      delete data.icon;
      if (data.type == "dynamic") data.span = 24;
      else data.span = 12;
      this.$set(this.formFieldList, newIndex, { ...data });
      this.selectWidget = this.formFieldList[newIndex];
    },
  },
  computed: {
    formFieldList() {
      return this.column.children.column;
    },
    fieldMappings() {
      return this.column.options.fieldMappings;
    },
  },
  watch: {
    select(val) {
      this.selectWidget = val;
    },
    selectWidget: {
      handler(val) {
        this.$emit("update:select", val);
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.widget-form-modal__head {
  margin: 10px;
}
.widget-form-modal__body {
  min-height: 150px;
  height: 100%;
  outline: 1px dashed #ccc;
  outline-offset: -1px;
  overflow: hidden;
  padding-bottom: 15px;
}
</style>
