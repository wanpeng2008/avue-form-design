<template>
  <div>
    <el-row>字段映射关系</el-row>
    <draggable
      class="syllable_ul"
      element="ul"
      :list="fieldMappings"
      :options="{ group: 'formFieldName', animation: 150 }"
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
        <li v-for="(item, index) in fieldMappings" :key="index">
          <el-col :span="10" class="fieldSection"
            ><el-input v-model="item.assignedProp" disabled></el-input
          ></el-col>
          <el-col :span="10" class="fieldSection"
            ><el-input v-model="item.formFieldName" disabled></el-input
          ></el-col>
          <el-col :span="4" class="fieldSection">
            <el-button
              type="danger"
              size="mini"
              @click="handleDeleteFieldMapping(index)"
              circle
              icon="el-icon-minus"
            ></el-button
          ></el-col>
        </li>
      </transition-group>
    </draggable>
    <el-row>
      <el-col :span="10" class="fieldSection"
        ><el-input
          v-model="newFieldMapping.assignedProp"
          placeholder="控件属性值"
        ></el-input
      ></el-col>
      <el-col :span="10" class="fieldSection"
        ><el-input
          v-model="newFieldMapping.formFieldName"
          placeholder="表单字段名"
        ></el-input
      ></el-col>
      <el-col :span="4" class="fieldSection">
        <el-button
          type="success"
          size="mini"
          @click="handleAddFieldMapping(newFieldMapping)"
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
  name: "config-modal",
  props: ["data"],
  data() {
    return {
      newFieldMapping: {},
    };
  },
  methods: {
    handleAddFieldMapping(newFieldMapping) {
      if (
        this.fieldMappings.some(
          (item) =>
            item.assignedProp == newFieldMapping.assignedProp ||
            item.formFieldName == newFieldMapping.formFieldName
        )
      ) {
        alert("属性名或字段名不能重复");
        return;
      }
      this.fieldMappings.push(lodash.clone(newFieldMapping));
      this.newFieldMapping = {};
    },
    handleDeleteFieldMapping(index) {
      this.fieldMappings.splice(index, 1);
    },
  },
  computed: {
    fieldMappings() {
      return this.data.options.fieldMappings;
    },
  },
  watch: {
    "data.required": function(val) {
      if (val)
        this.validator.required = {
          required: true,
          message: `${this.data.label}必须填写`,
        };
      else this.validator.required = null;

      this.generateRule();
    },
  },
};
</script>
<style lang="scss" scoped>
.fieldSection {
  padding: 4px 4px;
}
</style>
