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
      :remote-operations="true"
      :on-row-inserted="onRowInserted"
      :height="440"
    >
      <DxRowDragging
        :allow-reordering="true"
        :on-reorder="onReorder"
        :show-drag-icons="showDragIcons"
      />
      <DxSorting mode="none" />
      <DxScrolling mode="virtual" />
      <DxScrolling :mode="scrollingMode" />
      <DxEditing
        mode="row"
        :allow-adding="true"
        :allow-deleting="true"
        :allow-updating="true"
        :confirm-delete="false"
        :use-icons="true"
        :new-row-position="newRowPosition"
        :changes="changes"
        :edit-row-key="editRowKey"
      />
      <DxColumnChooser :enabled="true" />
      <DxColumnFixing :enabled="true" />
      <DxColumn :width="80" data-field="Действие"></DxColumn>
      <DxColumn :width="230" data-field="NameItem"></DxColumn>
      <DxColumn data-field="Price"></DxColumn>
      <DxColumn data-field="Quantity"></DxColumn>
      <DxColumn data-field="ProductName"></DxColumn>
      <DxColumn data-field="TotalAmount"></DxColumn>
      <DxColumn type="buttons">
        <DxButton
          icon="add"
          @click="onAddButtonClick"
          :visible="isAddButtonVisible"
        />
        <DxButton name="delete" />
        <DxButton name="save" />
        <DxButton name="cancel" />
      </DxColumn>

      <DxToolbar>
        <DxItem name="addRowButton" show-text="always"></DxItem>
      </DxToolbar>
    </DxDataGrid>
    <div class="options">
      <div class="caption">Опции</div>
      <div class="option-container">
        <div class="option">
          <span>Место добавления новой строки</span>
          <DxSelectBox
            id="newRowPositionSelectBox"
            :input-attr="{ 'aria-label': 'Position' }"
            v-model:value="newRowPosition"
            :items="newRowPositionOptions"
          />
          <DxCheckBox v-model:value="showDragIcons" text="Show Drag Icons" />
        </div>
        <div class="option">
          <span>Scrolling Mode</span>
          <DxSelectBox
            id="scrollingModeSelectBox"
            v-model:value="scrollingMode"
            :input-attr="{ 'aria-label': 'Scrolling Mode' }"
            :items="scrollingModeOptions"
          />
        </div>
      </div>
    </div>
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
  DxButton,
  DxToolbar,
  DxItem,
  DxScrolling,
  DxDataGridTypes,
  DxRowDragging,
  DxSorting,
} from "devextreme-vue/data-grid";
import DxSelectBox from "devextreme-vue/select-box";
import Guid from "devextreme/core/guid";

import DxCheckBox from "devextreme-vue/check-box";
import { employees as defaultEmployees, Employee } from "./data";

const newRowPositionOptions = [
  "first",
  "last",
  "pageTop",
  "pageBottom",
  "viewportTop",
  "viewportBottom",
];
const scrollingModeOptions = ["standard", "virtual"];

const newRowPosition = ref("viewportTop");
const scrollingMode = ref("standard");
const changes = ref<DxDataGridTypes.DataChange[]>([]);
const editRowKey = ref<string | null>(null);

const onAddButtonClick = (e: DxDataGridTypes.ColumnButtonClickEvent) => {
  const key = new Guid().toString();

  changes.value = [
    {
      key,
      type: "insert",
      data: {},
      insertAfterKey: e.row?.key,
    },
  ];
  editRowKey.value = key;
};

const isAddButtonVisible = (e: { row: DxDataGridTypes.Row }) =>
  !e.row.isEditing;

const onRowInserted = (e: DxDataGridTypes.RowInsertedEvent) => {
  e.component.navigateToRow(e.key);
};
// function calculateCellValue(data: Employee) {
//   return [data.Title].join(" ");
// }

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

  employees.value = newTasks;
};
</script>

<style scoped>
#gridContainer {
  height: 440px;
}
.options {
  margin-top: 20px;
  padding: 20px;
  background-color: rgba(191, 191, 191, 0.15);
  position: relative;
}

.caption {
  font-size: 18px;
  font-weight: 500;
}

.option-container {
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
}

.option {
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.option-caption {
  white-space: nowrap;
  margin: 0 8px;
}

.option > span {
  position: relative;
  margin-right: 10px;
}

#newRowPositionSelectBox {
  width: 150px;
}

#scrollingModeSelectBox {
  width: 150px;
}
.caption {
  font-size: 18px;
  font-weight: 500;
}
</style>
