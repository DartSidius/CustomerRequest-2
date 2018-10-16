/**
 * Created by Vladyslav Lyfar on 16.10.2018.
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
    copyKanbanColumn: function(component) {
        let copyKanbanColumnEvent = component.getEvent("CopyKanbanColumnEvent");
        copyKanbanColumnEvent.setParams({
            "NewKanbanColumnBoardId": component.find('selectBoard').get('v.value')
        });
        copyKanbanColumnEvent.fire();
        this.hideForm(component);
    },
    hideForm: function(component) {
        this.togglePopover(component.getSuper());
    }
})