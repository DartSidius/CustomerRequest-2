/**
 * Created by Vladyslav Lyfar on 08.10.2018.
 */
({
    showDescriptionForm: function(component) {
        let isDescriptionFormOpened = component.get("v.isDescriptionFormOpened");
        isDescriptionFormOpened = !isDescriptionFormOpened;
        component.set("v.isDescriptionFormOpened", isDescriptionFormOpened);
    },
    showDateTimeForm: function(component) {
        let isDateTimeFormOpened = component.get("v.isDateTimeFormOpened");
        isDateTimeFormOpened = !isDateTimeFormOpened;
        component.set("v.isDateTimeFormOpened", isDateTimeFormOpened);
    },
    saveKanbanCard: function(component, event, helper) {
        let action = component.get("c.updateKanbanCard");
        action.setParams({
            "kanbanCard": component.get("v.kanbanCard")
        });
        action.setCallback(this, (response) => {
            let state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.kanbanCard", response.getReturnValue());
            }
        });

        $A.enqueueAction(action);

    }
})