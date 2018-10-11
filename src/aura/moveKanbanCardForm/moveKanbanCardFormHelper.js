/**
 * Created by Vladyslav Lyfar on 11.10.2018.
 */
({
    doInit: function(component) {
        let action = component.get("c.getAllKanbanBoards");
        action.setCallback(this, (response) => {
            let state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.kanbanBoards", response.getReturnValue());
            }
        });

        $A.enqueueAction(action);
    },
    selectKanbanBoard: function(component) {
        let action = component.get("c.getAllKanbanBoardColumns");
        action.setParams({
            "currentId": component.find("selectBoard").get("v.value")
        });
        action.setCallback(this, (response) => {
            let state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.kanbanColumns", response.getReturnValue());
            }
        });

        $A.enqueueAction(action);
    },
    updateKanbanCardColumn: function(component) {
        let updateKanbanCardColumnEvent = component.getEvent("UpdateKanbanCardColumnEvent");
        updateKanbanCardColumnEvent.setParams({
            "NewKanbanCardColumnId": component.find('selectColumn').get('v.value')
        });
        updateKanbanCardColumnEvent.fire();
    }
})