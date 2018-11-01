/**
 * Created by Vladyslav Lyfar on 11.10.2018.
 */
({
    getAllKanbanBoardColumns: function(component) {
        const action = component.get("c.getAllKanbanBoardColumns");
        action.setParams({
            "currentId": component.get("v.kanbanBoardId")
        });
        this.executeAction(component, action).then(
            $A.getCallback((response) => {
                let kanbanColumnList = response;
                component.set("v.kanbanColumnList", kanbanColumnList);

                let shareKanbanColumnsEvent = $A.get("e.c:ShareKanbanColumnsEvent");
                shareKanbanColumnsEvent.setParams({
                      "KanbanColumns": kanbanColumnList
                });
                shareKanbanColumnsEvent.fire();
            })
        )
            .catch(
                $A.getCallback((error) => {
                    alert('An error occurred : ' + error.message);
                })
            );
    },

    handleCreateNewColumnEvent: function(component, event) {
        let action = component.get("c.createNewKanbanColumn");
        let kanbanColumn = event.getParam("KanbanColumn");
        kanbanColumn.KanbanBoard__c = component.get("v.kanbanBoardId");
        action.setParams({
            "kanbanColumn": kanbanColumn
        });
        this.executeAction(component, action).then(
            $A.getCallback((response) => {
                let kanbanColumns = component.get("v.kanbanColumnList");
                kanbanColumns.push(response);
                component.set("v.kanbanColumnList", kanbanColumns);
            })
        )
            .catch(
                $A.getCallback((error) => {
                    alert('An error occurred : ' + error.message);
                })
            );
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
            let columnIndex = kanbanColumns.findIndex((element, index, array) => {
                return element.Id === movedKanbanColumn.Id;
            });
            kanbanColumns.splice(columnIndex, 1);
            component.set("v.kanbanColumnList", kanbanColumns);
        }
    },

    appendCardsToColumn: function(component, kanbanCards) {
        let kanbanColumns = component.find("kanbanColumn");
        kanbanColumns.forEach(e => {
            e.appendCardsToColumn(kanbanCards);
        })
    },

    shareKanbanColumns: function(component) {
        let shareKanbanColumnsEvent = $A.get("e.c:ShareKanbanColumnsEvent");
        shareKanbanColumnsEvent.setParams({
            "KanbanColumns": component.get("v.kanbanColumnList")
        });
        shareKanbanColumnsEvent.fire();
    },

    executeAction: function(component, action, callback) {
        return new Promise((resolve, reject) => {
                action.setCallback(this, (response) => {
                    let state = response.getState();
                    if(state === "SUCCESS") {
                        let result = response.getReturnValue();
                        resolve(result);
                    } else if(state === "ERROR") {
                        let errors = response.getError();
                        if(errors) {
                            if(errors[0] && errors[0].message) {
                                reject(Error("Error message: " + errors[0].message));
                            }
                        } else{
                            reject(Error("Unknown error"));
                        }
                    }
                });
            $A.enqueueAction(action);
            });
    }
})