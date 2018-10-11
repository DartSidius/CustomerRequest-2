/**
 * Created by Vladyslav Lyfar on 11.10.2018.
 */
({
    renameKanbanCard: function(component) {
        let createNewCardEvent = component.getEvent("CreateNewCardEvent");
        createNewCardEvent.setParams({
            "KanbanCard": component.get("v.kanbanCard")
        });
        createNewCardEvent.fire();
    }
})