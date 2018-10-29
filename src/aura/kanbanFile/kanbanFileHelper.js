/**
 * Created by Vladyslav Lyfar on 29.10.2018.
 */
({
    deleteAttachment: function(component, event) {
        let action = component.get("c.deleteKanbanFile");
        action.setParams({
            "kanbanFile": component.get("v.file")
        });
        action.setCallback(this, (response) => {
            let state = response.getState();
            if(state === "SUCCESS") {
                console.log(response.getReturnValue());
                let onDeleteKanbanFileEvent = component.getEvent("OnDeleteKanbanFileEvent");
                onDeleteKanbanFileEvent.setParams({
                    "DeletedKanbanFile": response.getReturnValue()
                });
                onDeleteKanbanFileEvent.fire();
            } else {
                console.log(state);
            }
        });

        $A.enqueueAction(action);
    },
})