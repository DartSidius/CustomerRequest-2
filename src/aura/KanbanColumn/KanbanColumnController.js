/**
 * Created by Vladyslav Lyfar on 08.10.2018.
 */
({
    doInit: function(component, event, helper) {
        let action = component.get("c.getAllKanbanCards");
        action.setParams({
            "currentId": component.get("v.kanbanColumn").Id
        });
        action.setCallback(this, (response) => {
            let state = response.getState();
            if (state === "SUCCESS") {
                let kanbanCardList = response.getReturnValue();
                component.set("v.kanbanCards", kanbanCardList);
            }
        });

        $A.enqueueAction(action);
    }
})