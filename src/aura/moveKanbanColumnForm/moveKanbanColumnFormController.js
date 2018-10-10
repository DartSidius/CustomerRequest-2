/**
 * Created by Vladyslav Lyfar on 10.10.2018.
 */
({
    doInit: function(component, event, helper) {
        let action = component.get("c.getAllKanbanBoards");
        action.setCallback(this, (response) => {
            let state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.kanbanBoards", response.getReturnValue());
            }
        });

        $A.enqueueAction(action);
    },
    updateKanbanColumnBoard: function(component, event) {
        let updateKanbanColumnBoardEvent = component.getEvent("UpdateKanbanColumnBoardEvent");
        updateKanbanColumnBoardEvent.setParams({
            "NewKanbanColumnBoardId": component.find('selectBoard').get('v.value')
        });
        updateKanbanColumnBoardEvent.fire();
    }
})