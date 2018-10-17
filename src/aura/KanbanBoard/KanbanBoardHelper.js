/**
 * Created by Vladyslav Lyfar on 11.10.2018.
 */
({
    doInit: function(component) {
        let action = component.get("c.getAllKanbanBoardColumns");
        action.setParams({
            "currentId": component.get("v.recordId")
        });
        action.setCallback(this, (response) => {
            let state = response.getState();
            if(state === "SUCCESS") {
                let kanbanColumnList = response.getReturnValue();
                component.set("v.kanbanColumnList", kanbanColumnList);
                let shareKanbanColumnsEvent = $A.get("e.c:ShareKanbanColumnsEvent");
                shareKanbanColumnsEvent.setParams({
                    "KanbanColumns": kanbanColumnList
                });
                shareKanbanColumnsEvent.fire();
            }
        });

        $A.enqueueAction(action);
    },
    renameKanbanBoard: function(component, event) {
        component.set("v.simpleRecord", event.getParam("KanbanBoard"));
        this.saveKanbanBoardRecord(component);
    },
    saveKanbanBoardRecord: function(component) {
        component.find("record").saveRecord($A.getCallback((saveResult) => {
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                console.log("saved successfully");
            }
        }));
    }
})