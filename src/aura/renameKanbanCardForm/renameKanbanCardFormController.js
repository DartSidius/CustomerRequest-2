/**
 * Created by Vladyslav Lyfar on 10.10.2018.
 */
({
    renameKanbanCard: function(component, event) {
        let createNewCardEvent = component.getEvent("CreateNewCardEvent");
        createNewCardEvent.setParams({
            "KanbanCard": component.get("v.kanbanCard")
        });
        createNewCardEvent.fire();
    }
})