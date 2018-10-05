/**
 * Created by Vladyslav Lyfar on 05.10.2018.
 */
({
    showCreateColumnForm: function (component, event) {
        let isCreateColumnFormOpened = component.get("v.isCreateColumnFormOpened");
        isCreateColumnFormOpened = !isCreateColumnFormOpened;
        component.set("v.isCreateColumnFormOpened", isCreateColumnFormOpened);
    },
    createNewColumn: function(component, event) {
        let createNewColumnEvent = component.getEvent("CreateNewColumnEvent");
        let newKanbanColumn = component.get("v.newKanbanColumn");

        createNewColumnEvent.setParams({
            "KanbanColumn": newKanbanColumn
        });

        component.set("v.newKanbanColumn", {'sobjectType': 'KanbanColumn__c', 'Name': '' });
        createNewColumnEvent.fire();
    }
})