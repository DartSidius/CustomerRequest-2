/**
 * Created by Vladyslav Lyfar on 11.10.2018.
 */
({
    init: function(component) {
        let action = component.get("c.getAllKanbanBoards");
        action.setCallback(this, (response) => {
            let state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.kanbanBoards", response.getReturnValue());
            } else {
                console.log("Error occured" + state.getError());
            }
        });

        $A.enqueueAction(action);
    },
    hideForm: function(component) {
        this.togglePopover(component.getSuper());
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
            } else {
                console.log("Error occured" + state.getError());
            }
        });

        $A.enqueueAction(action);
    },
    copyKanbanCard: function(component) {
        let copyKanbanCardEvent = component.getEvent("CopyKanbanCardEvent");
        copyKanbanCardEvent.setParams({
            "NewKanbanCardColumnId": component.find('selectColumn').get('v.value')
        });
        copyKanbanCardEvent.fire();
        this.hideForm(component);
    }
})