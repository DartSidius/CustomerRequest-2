/**
 * Created by Vladyslav Lyfar on 08.10.2018.
 */
({
    doInit: function(component, event, helper) {
        let action = component.get("c.getAllKanbanBoardColumns");
        action.setParams({
            "currentId": component.get("v.recordId")
        });
        action.setCallback(this, (response) => {
            let state = response.getState();
            if(state === "SUCCESS") {
                let kanbanColumnList = response.getReturnValue();
                component.set("v.kanbanColumnList", kanbanColumnList);
            }
        });

        $A.enqueueAction(action);
    }
})