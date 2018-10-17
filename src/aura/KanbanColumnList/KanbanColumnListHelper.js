/**
 * Created by Vladyslav Lyfar on 11.10.2018.
 */
({
    handleCreateNewColumnEvent: function(component, event) {
        let action = component.get("c.createNewKanbanColumn");
        let kanbanColumn = event.getParam("KanbanColumn");
        kanbanColumn.KanbanBoard__c = component.get("v.kanbanBoardId");
        action.setParams({
            "kanbanColumn": kanbanColumn
        });
        action.setCallback(this, (response) => {
            let state = response.getState();
            if(state === "SUCCESS") {
                let kanbanColumns = component.get("v.kanbanColumnList");
                kanbanColumns.push(response.getReturnValue());
                component.set("v.kanbanColumnList", kanbanColumns);
            }
        });

        $A.enqueueAction(action);
    },
    removeDeletedColumnFromList: function(component, event) {
        let kanbanColumns = component.get("v.kanbanColumnList");
        let columnToDelete = event.getParam("DeletedKanbanColumn");
        let cardIndex = kanbanColumns.findIndex((element, index, array) => {
            return element.Id === columnToDelete.Id;
        });
        kanbanColumns.splice(cardIndex, 1);
        component.set("v.kanbanColumnList", kanbanColumns);
    },
    insertNewColumnToList: function(component, event) {
        let currentBoardId = component.get("v.kanbanBoardId");
        let copiedKanbanColumn = event.getParam("CopiedKanbanColumn");
        if(copiedKanbanColumn.KanbanBoard__c === currentBoardId) {
            let kanbanColumns = component.get("v.kanbanColumnList");
            kanbanColumns.push(copiedKanbanColumn);
            component.set("v.kanbanColumnList", kanbanColumns);
        }
    },
    moveColumnToOtherBoard: function(component, event) {
        let currentBoardId = component.get("v.kanbanBoardId");
        let movedKanbanColumn = event.getParam("MovedKanbanColumn");
        if(movedKanbanColumn.KanbanBoard__c !== currentBoardId) {
            let kanbanColumns = component.get("v.kanbanColumnList");
            let cardIndex = kanbanColumns.findIndex((element, index, array) => {
                return element.Id === movedKanbanColumn.Id;
            });
            kanbanColumns.splice(cardIndex, 1);
            component.set("v.kanbanColumnList", kanbanColumns);
        }
    }
})