/**
 * Created by Vladyslav Lyfar on 11.10.2018.
 */
({
    showRenameForm: function(component) {
        let isRenameFormOpened = component.get("v.isRenameFormOpened");
        isRenameFormOpened = !isRenameFormOpened;
        component.set("v.isRenameFormOpened", isRenameFormOpened);
    },

    renameKanbanBoard: function(component) {
        let renameKanbanBoardEvent = component.getEvent("RenameKanbanBoardEvent");
        renameKanbanBoardEvent.setParams({
            "KanbanBoard": component.get("v.kanbanBoard")
        });
        renameKanbanBoardEvent.fire();
        this.showRenameForm(component);
    }
})