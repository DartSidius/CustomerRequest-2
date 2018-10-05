/**
 * Created by Vladyslav Lyfar on 05.10.2018.
 */
({
    handleCreateNewColumnEvent: function(component, event) {
        let kanbanColumns = component.get("v.kanbanColumnList");
        kanbanColumns.push(event.getParam("KanbanColumn"));
        component.set("v.kanbanColumnList", kanbanColumns);
    }
})