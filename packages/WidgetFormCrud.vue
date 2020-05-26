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
    <p>{{ column }}</p>
    <p>{{ data }}</p>
    <!-- column.funcs.fetchData(page) -->
    <avue-crud
      :data="column.funcs.fetchData(page)"
      :option="column.options"
      :page="page"
      v-model="crudObj"
      :before-close="beforeOpen"
    >
      <template slot="menuLeft">
        <draggable
          class="widget-form-crud__body"
          style="display:inline-flex;vertical-align:middle;min-width: 5em;
    line-height: 1;"
          :list="column.children.column"
          :group="{ name: 'form' }"
          ghost-class="ghost"
          :animation="200"
          @add="handleWidgetGroupAdd($event, column)"
        >
          <template v-for="(item, groupIndex) in column.children.column">
            <el-col
              :key="groupIndex"
              :md="item.span || 12"
              :xs="24"
              :offset="item.offset || 0"
              style="margin:0"
            >
              <el-form-item
                class="widget-form-crud__item"
                :label="item.label"
                :prop="item.prop"
                :class="{
                  active: selectWidget.prop == item.prop,
                  required: item.required,
                }"
                style="margin:0"
                @click.native.stop="handleWidgetTableSelect(item)"
              >
                <el-button
                  v-if="item.type == 'button'"
                  @click="handleBtnClick(item)"
                  >{{ item.label }}</el-button
                >
                <widget-form-item
                  v-else
                  :item="item"
                  :params="column.params"
                ></widget-form-item>
                <el-button
                  title="删除"
                  @click.stop="handleWidgetTableDelete(column, crudIndex)"
                  class="widget-form-crud__item--delete"
                  v-if="selectWidget.prop == item.prop"
                  circle
                  plain
                  type="danger"
                >
                  <i class="iconfont icon-delete"></i>
                </el-button>
                <el-button
                  title="复制"
                  @click.stop="handleWidgetTableClone(column, crudIndex)"
                  class="widget-form-crud__item--clone"
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
      </template>
    </avue-crud>
  </div>
</template>
<script>
import WidgetFormItem from "./WidgetFormItem";
import WidgetFormTable from "./WidgetFormTable";
import { EventBus } from "./utils/event-bus";
export default {
  name: "widget-form-crud",
  props: ["data", "column", "select", "index"],
  // eslint-disable-next-line vue/no-unused-components
  components: { WidgetFormItem, WidgetFormTable },
  created() {
    console.log("column", this.column);
  },
  data() {
    return {
      selectWidget: this.select,
      page: {
        total: 10,
        pageSize: 20,
      },
      crudObj: {},
      crudData: [
        {
          name: "张三",
          sex: "男",
          date: "1994-02-23 00:00:00",
        },
        {
          name: "李四",
          sex: "女",
          date: "1994-02-23 00:00:00",
        },
        {
          name: "王五",
          sex: "女",
          date: "1994-02-23 00:00:00",
        },
        {
          name: "赵六",
          sex: "男",
          date: "1994-02-23 00:00:00",
        },
      ],
      crudOption: {},
    };
  },
  methods: {
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
      this.$set(column.children.column, column.children.column.length, {
        ...data,
      });
      this.$nextTick(() => {
        this.selectWidget =
          column.children.column[column.children.column.length - 1];
      });
    },
    handleWidgetTableDelete(column, index) {
      if (column.children.column.length - 1 == index) {
        if (index == 0) this.selectWidget = column;
        else this.selectWidget = column.children.column[index - 1];
      } else this.selectWidget = column.children.column[index + 1];
      this.$nextTick(() => {
        column.children.column.splice(index, 1);
      });
    },
    handleWidgetGroupAdd(evt, column) {
      let newIndex = evt.newIndex;
      const item = evt.item;

      if (newIndex == 1 && newIndex > column.children.column.length - 1)
        newIndex = 0;
      if (["分组"].includes(item.textContent)) {
        column.children.column.splice(newIndex, 1);
        return;
      }

      const data = this.deepClone(column.children.column[newIndex]);
      if (!data.prop)
        data.prop = Date.now() + "_" + Math.ceil(Math.random() * 99999);
      delete data.icon;
      if (data.type == "dynamic") data.span = 24;
      else data.span = 12;
      this.$set(column.children.column, newIndex, { ...data });
      this.selectWidget = column.children.column[newIndex];
    },
    handleBtnClick(evt) {
      console.log("emit");
      EventBus.$emit("on-btn-click", evt);
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
