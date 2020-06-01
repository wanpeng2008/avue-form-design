<template>
  <div>
    <p>widgetFormPreview: {{ widgetFormPreview }}</p>
    <p>widgetModels: {{ widgetModels }}</p>
    <!--  -->
    <avue-form
      ref="form"
      class="preview-form"
      :option="widgetFormPreview"
      v-model="widgetModels"
      @submit="handleSubmit"
      @reset-change="handleCancel"
    >
      <!-- <template v-for="(item, index) in widgetFormPreview.column"> -->
      <!-- <template slot="1590434760660_82767Type" slot-scope="{ item }">
        <p>adsfsdf</p>
        <avue-crud
          :data="crudData"
          :option="crudOption"
          v-model="crudObj"
        ></avue-crud>
        <span>{{ item }}</span>
      </template> -->
      <!-- </template> -->
    </avue-form>
  </div>
</template>
<script>
export default {
  name: "widget-form-preview",
  props: ["widgetFormPreview", "widgetModels"],
  data() {
    return {
      selectWidget: this.select,
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
      crudOption: {
        title: "表格的标题",
        page: false,
        align: "center",
        menuAlign: "center",
        column: [
          {
            label: "姓名",
            prop: "name",
          },
          {
            label: "性别",
            prop: "sex",
          },
          {
            label: "日期",
            prop: "date",
            type: "date",
            format: "yyyy-MM-dd hh:mm:ss",
            valueFormat: "yyyy-MM-dd hh:mm:ss",
          },
        ],
      },
    };
  },
  methods: {
    validate(_) {
      return this.$refs.form.validate(_);
    },
    resetForm() {
      this.$refs.form.resetForm();
    },
    handleSubmit(form) {
      this.$emit("submit", form);
    },
    handleCancel() {
      this.$emit("cancel");
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
