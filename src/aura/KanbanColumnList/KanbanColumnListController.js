/**
 * Created by Vladyslav Lyfar on 05.10.2018.
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
    }
})