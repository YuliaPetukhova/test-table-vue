<template>
  <div>
    <DxDataGrid
      id="gridContainer"
      :data-source="employees"
      key-expr="ID"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :show-borders="true"
      :on-row-inserted="onRowInserted"
      :height="440"
      :repaint-changes-only="true"
    >
      <DxRowDragging
        :allow-reordering="true"
        :on-reorder="onReorder"
        :show-drag-icons="showDragIcons"
      />
      <DxSorting mode="none" />
      <DxEditing
        mode="row"
        :allow-adding="true"
        :allow-updating="true"
        :allow-deleting="true"
        :confirm-delete="false"
        :use-icons="true"
        :new-row-position="newRowPosition"
        :changes="changes"
        :edit-row-key="editRowKey"
      />
      <DxColumnFixing :enabled="true" />
      <DxColumn
        :width="90"
        data-field="OrderNumber"
        caption=""
        :allow-hiding="false"
        :allow-editing="false"
      />
      <DxColumn
        :width="80"
        data-field="Действие"
        :allow-editing="false"
        :allow-hiding="false"
      ></DxColumn>
      <DxColumn
        :width="230"
        data-field="NameItem"
        caption="Наименование единицы"
        :allow-hiding="true"
      >
        <DxLookup
          :data-source="nameItems"
          display-expr="Name"
          value-expr="ID"
        />
      </DxColumn>
      <DxColumn
        data-field="Price"
        :allow-hiding="true"
        caption="Цена"
      ></DxColumn>
      <DxColumn
        data-field="Quantity"
        :allow-hiding="true"
        caption="Кол-во"
      ></DxColumn>
      <DxColumn
        data-field="ProductName"
        :allow-hiding="true"
        caption="Название товара"
      >
        <DxLookup
          :data-source="productNames"
          display-expr="Name"
          value-expr="ID"
        />
      </DxColumn>
      <DxColumn
        data-field="TotalAmount"
        :allow-hiding="true"
        caption="Итого"
        format="currency"
      ></DxColumn>

      <DxColumnChooser :enabled="true" :mode="mode">
        <DxPosition
          my="right top"
          at="right bottom"
          of=".dx-datagrid-column-chooser-button"
        />

        <DxColumnChooserSearch
          :enabled="searchEnabled"
          :editor-options="editorOptions"
        />
        <DxColumnChooserSelection :allow-select-all="allowSelectAll" />
      </DxColumnChooser>

      <DxSummary :recalculate-while-editing="true">
        <DxTotalItem
          column="TotalAmount"
          summary-type="sum"
          value-format="currency"
        />
        <DxTotalItem column="OrderNumber" summary-type="count" />
      </DxSummary>
    </DxDataGrid>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

import {
  DxDataGrid,
  DxColumn,
  DxColumnChooser,
  DxColumnFixing,
  DxEditing,
  DxDataGridTypes,
  DxRowDragging,
  DxSorting,
  DxLookup,
  DxColumnChooserSearch,
  DxColumnChooserSelection,
  DxPosition,
  DxSummary,
  DxTotalItem,
} from "devextreme-vue/data-grid";
import { DxTextBoxTypes } from "devextreme-vue/text-box";

import {
  employees as defaultEmployees,
  Employee,
  nameItems,
  productNames,
} from "./data";

const newRowPosition = ref("pageBottom");
const changes = ref<DxDataGridTypes.DataChange[]>([]);
const editRowKey = ref<string | null>(null);

const onRowInserted = (e: DxDataGridTypes.RowInsertedEvent) => {
  e.component.navigateToRow(e.key);
};

const showDragIcons = ref(true);

const employees = ref<Employee[]>(defaultEmployees);

const onReorder = (e: DxDataGridTypes.RowDraggingReorderEvent) => {
  const visibleRows = e.component.getVisibleRows();
  const toIndex = employees.value.findIndex(
    (item) => item.ID === visibleRows[e.toIndex].data.ID
  );
  const fromIndex = employees.value.findIndex(
    (item) => item.ID === e.itemData.ID
  );
  const newTasks = [...employees.value];

  newTasks.splice(fromIndex, 1);
  newTasks.splice(toIndex, 0, e.itemData);

  newTasks.forEach((value, index) => {
    value.OrderNumber = ++index;
  });

  employees.value = newTasks;
};

const mode = ref("select");
const searchEnabled = ref(true);
const allowSelectAll = ref(true);
const editorOptions: DxTextBoxTypes.Properties = {
  placeholder: "Поиск колонки",
};
</script>

<style scoped>
#gridContainer {
  height: 440px;
}

.option > span {
  position: relative;
  margin-right: 10px;
}
</style>
