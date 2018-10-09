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
    },
    saveKanbanColumn: function(component, event, helper) {
        let action = component.get("c.updateKanbanColumn");
        action.setParams({
            "kanbanColumn": component.get("v.kanbanColumn")
        });
        action.setCallback(this, (response) => {
            let state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.kanbanColumn", response.getReturnValue());
            }
        });

        $A.enqueueAction(action);
    },
    showRenameForm: function(component) {
        let isRenameFormOpened = component.get("v.isRenameFormOpened");
        isRenameFormOpened = !isRenameFormOpened;
        component.set("v.isRenameFormOpened", isRenameFormOpened);
    },
    selectAction: function(component, event) {
        let selectedMenu = event.detail.menuItem.get("v.value");
        switch (selectedMenu) {
            case "copyList":
                console.log("copyList");
                break;
            case "moveList":
                console.log("moveList");
                break;
            case "moveAllCards":
                console.log("copyList");
                break;
            case "sortBy":
                console.log("moveList");
                break;
        }
    }
})